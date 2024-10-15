import React, { useState, useRef, useEffect } from "react";
import {
  getMonitoringPlans,
  getCheckedOutLocations,
} from "../../utils/api/monitoringPlansApi";
import {
  getQATestSummaryReviewSubmit,
  getQACertEventReviewSubmit,
  getQATeeReviewSubmit,
  getMatsBulkFilesReviewSubmit,
} from "../../utils/api/qaCertificationsAPI";
import { getEmissionsReviewSubmit } from "../../utils/api/emissionsApi";
import SubmissionModal from "../SubmissionModal/SubmissionModal";
import SubmissionAlertModal from "../SubmissionAlertModal/SubmissionAlertModal";
import { Button, Alert } from "@trussworks/react-uswds";
import { connect } from "react-redux";
import * as mpApi from "../../utils/api/monitoringPlansApi";
import { DatabaseContext } from "../../utils/constants/databaseContext";
import { validate } from "../../utils/api/easeyAuthApi";
import {
  submitData,
  triggerBulkEvaluation,
} from "../../utils/api/camdServices";
import { handleError } from "../../utils/api/apiUtils";
import LoadingModal from "../LoadingModal/LoadingModal";
import FilterForm from "./FilterForm/FilterForm";
import { EvaluateRefresh } from "./EvaluateRefresh";
import _ from "lodash";
import {
  monPlanColumns,
  qaTestSummaryColumns,
  emissionsColumns,
  qaCertEventColumns,
  qaTeeColumns,
  matsBulkFilesColumns,
} from "./ColumnMappings";
import { canSelectRow, getDropDownFacilities } from "./utils/functions";
import useGetContent from "./utils/useGetContent";
import { CategoryTable } from "./CategoryTable/CategoryTable";
import { v4 } from "uuid";
import { displayAppWarning } from "../../additional-functions/app-error";

export const EvaluateAndSubmit = ({
  checkedOutLocations,
  user,
  componentType,
}) => {
  const { content: waitTimeData } = useGetContent(
    "/ecmps/workspace/evaluate-submit/wait-time.json"
  );
  const [title, setTitle] = useState("Submit");
  const [buttonText, setButtonText] = useState("Sign & Submit");

  const storedFilters = useRef(null);

  const [reloadTables, setReloadTables] = useState(false);

  const [selectable, setSelectable] = useState(true);

  const evalClickedAtTime = useRef(0);
  const [dropdownFacilities, setDropdownFacilities] = useState([]);
  const [activityId, setActivityId] = useState("");
  const [excludeErrors, setExcludeErrors] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hasClickedSubmit, setHasClickedSubmit] = useState(false);

  const [filesSelected, setFilesSelected] = useState(false);

  const qaTestSumRef = useRef([]);
  const qaCertEventRef = useRef([]);
  const qaTeeRef = useRef([]);
  const emissionsRef = useRef([]);
  const matsBulkFilesRef = useRef([]);
  const monPlanRef = useRef([]);

  const [showSuccesModal, setShowSuccessModal] = useState(false);
  const modalType = useRef("");
  const modalHeading = useRef("");
  const modalMessage = useRef("");

  const [finalSubmitStage, setFinalSubmitStage] = useState(false);
  const [shouldAutoSubmit, setShouldAutoSubmit] = useState(false);
  const [isForceReEvaluation, setIsForceReEvaluation] = useState(false);

  const { userId } = user;

  const monitorPlanIdToSelectedMap = useRef(new Map()); // Map each monitor plan to a count of how many times it has been selected

  useEffect(() => {
    if (finalSubmitStage && componentType === "Submission") {
      setTitle("Review & Submit");
    } else if (!finalSubmitStage && componentType === "Submission") {
      setTitle("Submit");
      setButtonText("Sign & Submit Selected Files");
    } else {
      setTitle("Evaluate");
      setButtonText("Evaluate");
    }
  }, [finalSubmitStage, componentType]);

  useEffect(() => {
    const mapping = new Map();
    for (const obj of checkedOutLocations) {
      mapping.set(obj.monPlanId, obj.checkedOutBy);
    }

    for (const list of dataList) {
      for (const curr of list.ref.current) {
        if (mapping.has(curr.monPlanId)) {
          curr.checkedOutBy = mapping.get(curr.monPlanId);
        } else {
          curr.checkedOutBy = "";
        }
      }
    }
    forceReloadTables();
  }, [checkedOutLocations]);

  let dataList = [
    {
      columns: monPlanColumns,
      ref: monPlanRef,
      call: getMonitoringPlans,
      rowId: "monPlanId",
      name: "Monitoring Plan",
      type: "MP",
      progressPending: useRef(false),
    },
    {
      columns: qaTestSummaryColumns,
      ref: qaTestSumRef,
      call: getQATestSummaryReviewSubmit,
      rowId: "testSumId",
      name: "Test Data",
      type: "QA",
      progressPending: useRef(false),
    },
    {
      columns: qaCertEventColumns,
      ref: qaCertEventRef,
      call: getQACertEventReviewSubmit,
      rowId: "qaCertEventIdentifier",
      name: "QA Certification Events",
      type: "QA",
      progressPending: useRef(false),
    },
    {
      columns: qaTeeColumns,
      ref: qaTeeRef,
      call: getQATeeReviewSubmit,
      rowId: "testExtensionExemptionIdentifier",
      name: "Test Extension Exemptions Data",
      type: "QA",
      progressPending: useRef(false),
    },
    {
      columns: emissionsColumns,
      ref: emissionsRef,
      call: getEmissionsReviewSubmit,
      rowId: "periodAbbreviation",
      name: "Emissions",
      type: "EM",
      progressPending: useRef(false),
    },
    {
      columns: matsBulkFilesColumns,
      ref: matsBulkFilesRef,
      call: getMatsBulkFilesReviewSubmit,
      rowId: "matsBulkFileIdentifier",
      name: "MATS Data",
      type: "QA",
      progressPending: useRef(false),
    },
  ];

  if (componentType !== "Submission") {
    dataList = dataList.filter((f) => f.rowId !== "matsBulkFileIdentifier");
  }

  const idToPermissionsMap = useRef(new Map());
  useEffect(() => {
    idToPermissionsMap.current = new Map();
    const userPermissions = user.facilities || null;
    if (userPermissions) {
      for (const p of userPermissions) {
        idToPermissionsMap.current.set(p.orisCode, p.permissions);
      } //eslint-disable-next-line
    } else {
      idToPermissionsMap.current = null;
    }
  });

  useEffect(() => {
    let isMounted = true; // Track the mounting status

    const fetchDropdownFacilities = async () => {
      const facilities = await getDropDownFacilities();
      if (isMounted) {
        setDropdownFacilities(facilities);
      }
    };

    fetchDropdownFacilities();

    return () => {
      isMounted = false; // Set false when the component unmounts
    };
  }, []);

  const filterClick = async () => {
    if (componentType === "Submission") {

      //passed-in user can be ecmps user object or false.
      if (user === false || !user.userId) {
        modalType.current = "error";  
        modalHeading.current = "ERROR";
        modalMessage.current = "Please login to ECMPS to submit! If you are already logged in, please logout and log back in. If you still see this message, please contact ECMPS support!";
        setShowSuccessModal(true);  
        return;
      }
      
      //construct payload to call auth-api/sign/validate endpoint
      const items = [];
      const payload = {
        userId: user.userId,
        items: items,
      };

      const activeMPSet = getSelectedMPIds();

      for (const monPlanId of activeMPSet) {
        const newItem = {};

        //add monitoring plan Id related info
        newItem.monPlanId = monPlanId;
        if (
          monPlanRef.current.filter(
            (f) => f.monPlanId === monPlanId && f.isSelected
          ).length > 0
        ) {
          newItem.submitMonPlan = true;
        } else {
          //did not select this monitoring plan to submit, so no need to validate this one
          newItem.submitMonPlan = false;
        }

        //get all qat ids associated with this mon plan id
        newItem.testSumIds = qaTestSumRef.current
        .filter((f) => f.monPlanId === monPlanId && f.isSelected)
        .map((m) => {
          return m.testSumId;
        });

        //get all qce ids associated with this mon plan id
        newItem.qceIds = qaCertEventRef.current
        .filter((f) => f.monPlanId === monPlanId && f.isSelected)
        .map((m) => {
          return m.qaCertEventIdentifier;
        });

        //get all tee ids associated with this mon plan id
        newItem.teeIds = qaTeeRef.current
        .filter((f) => f.monPlanId === monPlanId && f.isSelected)
        .map((m) => {
          return m.testExtensionExemptionIdentifier;
        });

        //get all em ids associated with this mon plan id
        newItem.emissionsReportingPeriods = emissionsRef.current
        .filter((f) => f.monPlanId === monPlanId && f.isSelected)
        .map((m) => {
          return m.periodAbbreviation;
        });

        // Add it to the result set of data sent to the back-end
        items.push(newItem);
      }

      //payload have the structure of EvaluationDTO in camdService, so this triggerPermissioAndFileValidation should exist in camd-services
      const validationResult = await validate({
        userId: payload.userId,
        items: payload.items,
      });

      if (validationResult.data.hasValidationError) {
        modalType.current = "error";  
        modalHeading.current = validationResult.data.validationErrorHeading;
        modalMessage.current = validationResult.data.validationErrorMessage;
        setShowSuccessModal(true);  
      } else {
        //passed all the validations
        //proceed to launch the submission modal
        setShowModal(true);
      }
      console.log("Submission Evaluation");
    } else {
      finalSubmission(triggerBulkEvaluation);
      console.log("Emission Evaluation");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (shouldAutoSubmit) {
      finalSubmission(submitData);
      setShouldAutoSubmit(false); // Reset the auto submit flag
    }
  }, [activityId, shouldAutoSubmit]);

  const submission = () => {
    closeModal();

    setFinalSubmitStage(true);

    for (const value of dataList) {
      value.ref.current = value.ref.current.filter((r) => r.isSelected);
    }

    setSelectable(false);

    forceReloadTables();

    //Submit the certifications, documents. Set the flag to and allow useEffect to process once activityId is available
    setShouldAutoSubmit(true);
  };

  const checkOutLocationsOrRollback = async () => {
    const checkedOutLocations = (await getCheckedOutLocations()).data;

    console.log(checkedOutLocations);

    const checkOutMapping = new Map(); //store the monPlanId as key and checkedOutBy (userId) as value
    for (const loc of checkedOutLocations) {
      checkOutMapping.set(loc.monPlanId, loc.checkedOutBy);
    }

    const mps = getSelectedMPIds();

    const promises = [];
    for (const mp of mps) {
      //Check for a different userId here and also prevent checking in or out
      if (checkOutMapping.has(mp) && checkOutMapping.get(mp) !== userId) {
        return false;
      } else if (!checkOutMapping.has(mp)) {
        promises.push(mpApi.postCheckoutMonitoringPlanConfiguration(mp, false));
      }
    }

    //Determine if we need to rollback the submission
    const promiseStatuses = await Promise.allSettled(promises);
    if (promiseStatuses.find((ps) => ps.status === "rejected")) {
      const successes = promiseStatuses.filter((f) => f.status === "fulfilled");
      for (const success of successes) {
        //Check back in the other records that succeeded
        mpApi.deleteCheckInMonitoringPlanConfiguration(
          success.value.data.monPlanId
        );
      }
      return false;
    }

    return true;
  };

  const finalSubmission = async (callback) => {
    if (!(await checkOutLocationsOrRollback())) {
      if (componentType === "Submission") {
        modalType.current = "warning";
        modalHeading.current = "Alert";
        modalMessage.current =
          "One or more of the locations you attempted to evaluate or submit has been checked out by a different user. None of the files were submitted / evaluated as a result. Please try again.";
        setShowSuccessModal(true);

        return;
      } else {
        window.scrollTo(0, 0);

        displayAppWarning(
          "One or more of the locations you attempted to evaluate or submit has been checked out by a different user. None of the files were submitted / evaluated as a result. Please try again."
        );

        //Rollback selections
        for (const list of dataList) {
          for (const current of list.ref.current) {
            current.isSelected = false;
          }
        }

        forceReloadTables();
        return;
      }
    }

    evalClickedAtTime.current = new Date().getTime();
    setSubmitting(true);
    const activeMPSet = new Set();
    // Compile one master set of monitor plan ids that are being submitted
    for (const value of dataList) {
      const { ref } = value;
      for (const chunk of ref.current) {
        if (chunk.isSelected) {
          if (componentType === "Evaluate") {
            chunk.evalStatusCode = "INQ";
            chunk.evalStatusCodeDescription = "In Queue";
          }
          activeMPSet.add(chunk.monPlanId);
        }
      }
      if (componentType === "Evaluate") {
        //Master state change
        forceReloadTables();
      }
    }

    const payload = {};
    if (componentType === "Submission") {
      // Build submission payload
      payload.activityId = activityId;
    }

    payload.userId = user.userId;
    payload.userEmail = user.email;

    payload.items = [];
    payload.hasCritErrors = false;

    for (const monPlanId of activeMPSet) {
      const newItem = {};
      newItem.monPlanId = monPlanId;
      //First check the monitor plan to see if we should be submitting it
      if (
        monPlanRef.current.filter(
          (f) => f.monPlanId === monPlanId && f.isSelected
        ).length > 0
      ) {
        const plan = monPlanRef.current.find(
          (f) => f.monPlanId === monPlanId && f.isSelected
        );

        if (plan.evalStatusCode === "ERR") {
          payload.hasCritErrors = true;
        }

        newItem.submitMonPlan = true;
      } else {
        newItem.submitMonPlan = false;
      }

      //Build QA datasets for payload
      newItem.testSumIds = qaTestSumRef.current
        .filter((f) => f.monPlanId === monPlanId && f.isSelected)
        .map((m) => {
          if (m.evalStatusCode === "ERR") {
            payload.hasCritErrors = true;
          }

          return m.testSumId;
        });
      newItem.qceIds = qaCertEventRef.current
        .filter((f) => f.monPlanId === monPlanId && f.isSelected)
        .map((m) => {
          if (m.evalStatusCode === "ERR") {
            payload.hasCritErrors = true;
          }

          return m.qaCertEventIdentifier;
        });
      newItem.teeIds = qaTeeRef.current
        .filter((f) => f.monPlanId === monPlanId && f.isSelected)
        .map((m) => {
          if (m.evalStatusCode === "ERR") {
            payload.hasCritErrors = true;
          }

          return m.testExtensionExemptionIdentifier;
        });

      //Final step to add emissions data for specific monPlan
      newItem.emissionsReportingPeriods = emissionsRef.current
        .filter((f) => f.monPlanId === monPlanId && f.isSelected)
        .map((m) => {
          if (m.evalStatusCode === "ERR") {
            payload.hasCritErrors = true;
          }
          return m.periodAbbreviation;
        });

      if (componentType === "Submission") {
        // Iterate MATs bulk files and append them to the submission payload
        newItem.matsBulkFiles = matsBulkFilesRef.current
          .filter((f) => f.monPlanId === monPlanId && f.isSelected)
          .map((m) => m.matsBulkFileIdentifier);
      }

      // Add it to the result set of data sent to the back-end
      payload.items.push(newItem);
    }

    try {
      await callback(payload);
      //checkInAllCheckedOutLocations();
      setSubmitting(false);
      if (componentType === "Submission") {
        setHasClickedSubmit(true);
        modalType.current = "success";
        modalHeading.current = "Success";
        modalMessage.current = "Successfully submitted files to the queue";
        setShowSuccessModal(true);
      } else {
        for (const value of dataList) {
          const { ref } = value;
          for (const chunk of ref.current) {
            chunk.isSelected = false;
            chunk.isDisabled = true;
          }
        }
        monitorPlanIdToSelectedMap.current = new Map();
        forceReloadTables();
      }
    } catch (e) {
      if (componentType === "Submission") {
        modalType.current = "error";
        modalHeading.current = "Error";
        modalMessage.current = e.message;
        setShowSuccessModal(true);
      } else {
        handleError(e);
      }
      setSubmitting(false);
    }
  };

  const forceReloadTables = () => {
    setReloadTables(v4());
  };

  const formatDataRows = (ref, rows, rowType, activeSet = null) => {
    for (const r of rows) {
      //Formatting to align names for easier reference [Ideally would change the back end to make all of these match, but these apis are being used in lots of locations, so conformity is best solution]
      if (r["id"]) {
        r.monPlanId = r["id"];
      }

      if (r["monPlanIdentifier"]) {
        r.monPlanId = r["monPlanIdentifier"];
      }

      if (r["submissionCode"]) {
        r.submissionAvailabilityCode = r["submissionCode"];
      }
    }

    let formattedData = rows.map((chunk) => {
      return {
        ...chunk,
        isSelected: false,
        isDisabled: isForceReEvaluation
          ? false
          : !canSelectRow(
              chunk,
              rowType,
              componentType,
              idToPermissionsMap,
              userId
            ), //Determine if a record is checked out [If not by user then disable and set isSelected to false]
        checkedOutBy: "",
        // TODO: Add an optional iCheckedOut Flag
      };
    });

    if (activeSet) {
      formattedData = formattedData.filter((d) => {
        return activeSet.has(d.monPlanId);
      });
    }

    if (excludeErrors && componentType === "Submission") {
      //We don't care about errors on evaluations page
      formattedData = formattedData.filter(
        (mpd) => mpd.evalStatusCode !== "ERR"
      );
    }

    ref.current = formattedData;
    forceReloadTables();
  };

  const retrieveAndFormatData = async (dataListIndex, activeSet) => {
    const data = (
      await dataList[dataListIndex].call(
        storedFilters.current.orisCodes,
        storedFilters.current.monPlanIds,
        storedFilters.current.submissionPeriods
      )
    ).data;

    formatDataRows(
      dataList[dataListIndex].ref,
      data,
      dataList[dataListIndex].type,
      activeSet
    );

    dataList[dataListIndex].progressPending.current = false;
    forceReloadTables();
  };

  const applyFilter = async (orisCodes, monPlanIds, submissionPeriods) => {
    storedFilters.current = {
      orisCodes: orisCodes,
      monPlanIds: monPlanIds,
      submissionPeriods: submissionPeriods,
    };

    // Reset all of the tables to a refreshing state
    for (const value of dataList) {
      //Iterate here to show the client tables are loading
      const { progressPending } = value;
      progressPending.current = true;
    }
    forceReloadTables();

    // We have to load monitor plans first to get all of the active locations
    const [{ data: officialMonitorPlans }, { data: workspaceMonitorPlans }] = await Promise.all([
      dataList[0].call(orisCodes, monPlanIds, DatabaseContext.OFFICIAL),
      dataList[0].call(orisCodes, monPlanIds, DatabaseContext.WORKSPACE),
    ]);
    // Filter to plans that are `active` in the workspace or that are `active` in official but `inactive` in the workspace (becoming inactive).
    const monitorPlans = workspaceMonitorPlans.filter((mp) => {
      return (
        mp.active ||
        officialMonitorPlans.some(
          (omp) => omp.monPlanId === mp.monPlanId && omp.active
        )
      );
    });
    const activePlanIdSet = new Set(monitorPlans.map((mp) => mp.id));
    formatDataRows(dataList[0].ref, monitorPlans, "MP");

    dataList[0].progressPending.current = false;
    forceReloadTables();

    const promises = [];
    for (let i = 1; i < dataList.length; i++) {
      //Iterate over other non monitor plan sets of data
      promises.push(retrieveAndFormatData(i, activePlanIdSet));
    }
    await Promise.all(promises);
  };

  const getSelectedMPIds = () => {
    const monPlanIds = new Set();
    for (const value of dataList) {
      const { ref } = value;
      for (const chunk of ref.current) {
        if (chunk.isSelected) {
          monPlanIds.add(chunk.monPlanId);
        }
      }
    }

    return Array.from(monPlanIds);
  };

  const populateSelectedFiles = () => {
    for (let i = 0; i < dataList.length; i++) {
      for (const row of dataList[i].ref.current) {
        if (row.isSelected) {
          setFilesSelected(true);
          return;
        }
      }
    }
    setFilesSelected(false);
  };

  const handleSelectionChange = (selectionEvent, type, index) => {
    //First select the ref values corresponding to the current table
    //Select all of the actual rows from the current table that an event was triggered on
    let hasRenderingChanges = false;

    const tableIdentifier = dataList[index].rowId;
    const selectedItems = new Set(
      selectionEvent.selectedRows.map((row) => row[tableIdentifier])
    );

    const oldValueOfTable = JSON.stringify(dataList[index].ref.current);

    for (const row of dataList[index].ref.current) {
      //Handle updating of the current dataList Ref
      if (
        selectedItems.has(row[tableIdentifier]) ||
        (row.isDisabled && row.isSelected)
      ) {
        row.isSelected = true;
      } else {
        row.isSelected = false;
      }

      if (
        !canSelectRow(row, type, componentType, idToPermissionsMap, userId) &&
        !isForceReEvaluation
      ) {
        row.isDisabled = true;
        row.isSelected = false;
      }
    }

    if (oldValueOfTable !== JSON.stringify(dataList[index].ref.current)) {
      //Only update this state when we have changes
      hasRenderingChanges = true;
    }

    if (index > 0) {
      //Iterate and get all of the external MP records that are selected
      const selectedMonitorPlans = new Set();
      const selectedMonitorPlansFromEmissions = new Set();
      for (let i = 1; i < dataList.length; i++) {
        if (dataList[i].rowId !== "matsBulkFileIdentifier") {
          //Treat mats seperately
          for (const row of dataList[i].ref.current) {
            if (row.isSelected) {
              selectedMonitorPlans.add(row.monPlanId);
              if (i === 4) {
                //For emissions create a sep set that drives the QA record selections
                selectedMonitorPlansFromEmissions.add(row.monPlanId);
              }
            }
          }
        }
      }

      const dataListLength = isForceReEvaluation ? dataList.length : 3;

      for (let i = 0; i < dataListLength; i++) {
        //Determine MP + QA Rerenders
        const oldVal = JSON.stringify(dataList[i].ref.current);
        //Force MP selections
        for (const row of dataList[i].ref.current) {
          //Handle updating of the current dataList Ref
          let setDisable = false;
          if (i === 0) {
            setDisable = selectedMonitorPlans.has(row.monPlanId);
          } else {
            setDisable = selectedMonitorPlansFromEmissions.has(row.monPlanId);
          }

          if (setDisable && !isForceReEvaluation) {
            row.isSelected = true;
            row.isDisabled = true;
          } else {
            row.isDisabled = false;
          }

          if (
            !canSelectRow(
              row,
              dataList[i].type,
              componentType,
              idToPermissionsMap,
              userId
            ) &&
            !isForceReEvaluation
          ) {
            row.isDisabled = true;
            row.isSelected = false;
          }
        }

        if (oldVal !== JSON.stringify(dataList[i].ref.current)) {
          hasRenderingChanges = true;
        }
      }
    }
    populateSelectedFiles();

    if (hasRenderingChanges) {
      //Determine if we need to rerender the tables in case any changed were processed
      forceReloadTables();
    }
  };

  return (
    <div className="react-transition fade-in padding-x-3">
      {showSuccesModal && (
        <SubmissionAlertModal
          type={modalType.current}
          heading={modalHeading.current}
          message={modalMessage.current}
          callback={() => {
            window.location.reload();
          }}
        ></SubmissionAlertModal>
      )}

      <div className="text-black flex-justify margin-top-1 grid-row flex-column">
        {waitTimeData?.displayAlert && (
          <Alert
            className="margin-y-2"
            type="info"
            heading={waitTimeData?.title}
            headingLevel="h4"
          >
            {waitTimeData?.content}
          </Alert>
        )}

        <h2
          data-testid="page-title"
          className="grid-col-9 page-header margin-top-2"
        >
          {title}
        </h2>
      </div>

      <div className="text-black flex-justify-end margin-top-1 grid-row">
        {finalSubmitStage && !hasClickedSubmit && (
          <Button
            className="grid-col-3 flex-align-self-center maxw-mobile margin-right-2"
            size="big"
            onClick={() => {
              finalSubmission(submitData);
            }}
          >
            Submit
          </Button>
        )}
      </div>

      {componentType !== "Submission" && (
        <EvaluateRefresh
          dataList={dataList}
          storedFilters={storedFilters}
          lastEvalTime={evalClickedAtTime}
          forceReloadTables={forceReloadTables}
        />
      )}

      {!finalSubmitStage && (
        <FilterForm
          showModal={setShowModal}
          queryCallback={applyFilter}
          setExcludeErrors={setExcludeErrors}
          facilities={dropdownFacilities}
          filesSelected={filesSelected}
          buttonText={buttonText}
          filterClick={filterClick}
          componentType={componentType}
          forceReEvaluation={(e) => setIsForceReEvaluation(e.target.checked)}
          isForceReEvaluation={isForceReEvaluation}
        />
      )}

      {reloadTables && <div />}

      {dataList.map((category, idx) => {
        return (
          <CategoryTable
            categoryTitle={category.name}
            columns={category.columns}
            data={category.ref.current}
            onChange={handleSelectionChange}
            type={category.type}
            rowId={category.rowId}
            index={idx}
            loading={category.progressPending.current}
            selectable={selectable}
            userId={userId}
          />
        );
      })}

      <LoadingModal type="Loading" loading={submitting} />

      {showModal && (
        <SubmissionModal
          show={showModal}
          close={closeModal}
          submissionCallback={submission}
          monitorPlanIds={getSelectedMPIds()}
          activityId={activityId}
          setActivityId={setActivityId}
        />
      )}

      {!finalSubmitStage && (
        <div className=" grid-row">
          <div className="grid-col-10"></div>
          <div className="grid-col-2">
            <div className="display-flex flex-row flex-justify-end desktop:flex-justify-center margin-y-5 margin-right-2 float-left">
              <Button onClick={filterClick} disabled={!filesSelected}>
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="text-black flex-justify-end margin-top-1 grid-row">
        {finalSubmitStage && !hasClickedSubmit && (
          <Button
            className="grid-col-3 flex-align-self-center maxw-mobile margin-right-2"
            size="big"
            onClick={() => {
              finalSubmission(submitData);
            }}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  checkedOutLocations: state.checkedOutLocations,
});

export default connect(mapStateToProps)(EvaluateAndSubmit);
