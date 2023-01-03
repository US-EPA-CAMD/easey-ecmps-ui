import React, { useState, useRef, useEffect } from "react";
import { getMonitoringPlans } from "../../utils/api/monitoringPlansApi";
import { getQATestSummaryReviewSubmit } from "../../utils/api/qaCertificationsAPI";
import { getEmissionsReviewSubmit } from "../../utils/api/emissionsApi";
import DataTables from "./DataTables/DataTables";
import SubmissionModal from "../SubmissionModal/SubmissionModal";
import MockPermissions from "./MockPermissions";
import { Button } from "@trussworks/react-uswds";
import { connect } from "react-redux";
import {
  isLocationCheckedOutByUser,
  updateCheckedOutLocationsOnTables,
} from "../../utils/functions";
import { submitData } from "../../utils/api/camdServices";
import { handleError } from "../../utils/api/apiUtils";
import LoadingModal from "../LoadingModal/LoadingModal";
import FilterForm from "./FilterForm/FilterForm";
import { triggerBulkEvaluation } from "../../utils/api/quartzApi";
import { EvaluateRefresh } from "./EvaluateRefresh";

const EvaluateAndSubmit = ({ checkedOutLocations, user, componentType }) => {
  const [title, setTitle] = useState("Submit");
  const [buttonText, setButtonText] = useState("Sign & Submit");

  const storedFilters = useRef(null);

  const [activityId, setActivityId] = useState("");
  const [excludeErrors, setExcludeErrors] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [numFilesSelected, setNumFilesSelected] = useState(0);
  const filesSelected = useRef(0);

  const [checkedOutLocationsMap, setCheckedOutLocationsMap] = useState(
    new Map()
  );

  const [qaTestSummary, setQaTestSummary] = useState([]);
  const qaTestSumRef = useRef([]);

  const [emissions, setEmissions] = useState([]);
  const emissionsRef = useRef([]);

  const [monPlans, setMonPlans] = useState([]);
  const monPlanRef = useRef([]);

  const [finalSubmitStage, setFinalSubmitStage] = useState(false);
  const { userId } = user;
  useEffect(() => {
    const checkedOutLocationsMPIdsMap = new Map();
    checkedOutLocations.forEach((el) => {
      checkedOutLocationsMPIdsMap.set(el.monPlanId, el);
    });
    setCheckedOutLocationsMap(checkedOutLocationsMPIdsMap);
    updateCheckedOutLocationsOnTables(
      checkedOutLocationsMPIdsMap,
      dataList,
      userId
    ); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedOutLocations]);

  useEffect(() => {
    if (finalSubmitStage && componentType === "Submission") {
      setTitle("Review & Submit");
    } else if (!finalSubmitStage && componentType === "Submission") {
      setTitle("Submit");
      setButtonText("Sign & Submit");
    } else {
      setTitle("Evaluate");
      setButtonText("Evaluate");
    }
  }, [finalSubmitStage, componentType]);

  const dataList = {
    monPlan: {
      ref: monPlanRef,
      state: monPlans,
      setState: setMonPlans,
      call: getMonitoringPlans,
      rowId: "monPlanId",
    },
    qaTest: {
      ref: qaTestSumRef,
      state: qaTestSummary,
      setState: setQaTestSummary,
      call: getQATestSummaryReviewSubmit,
      rowId: "testSumId",
    },
    emissions: {
      ref: emissionsRef,
      state: emissions,
      setState: setEmissions,
      call: getEmissionsReviewSubmit,
      rowId: "periodAbbreviation",
    },
  };

  const idToPermissionsMap = useRef([]);
  useEffect(() => {
    // Get permissions from user object here
    const permissions = MockPermissions;
    for (const p of permissions) {
      idToPermissionsMap.current[p.id] = p.permissions;
    } //eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(idToPermissionsMap);
  }, []);

  const filterClick = () => {
    if (componentType === "Submission") {
      setShowModal(true);
    } else {
      finalSubmission(triggerBulkEvaluation);
    }
  };

  const updateFilesSelected = (bool) => {
    if (bool) {
      filesSelected.current = filesSelected.current + 1;
    } else {
      filesSelected.current = filesSelected.current - 1;
    }
    setNumFilesSelected(filesSelected.current);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const submission = () => {
    closeModal();

    setFinalSubmitStage(true);

    for (const [key, value] of Object.entries(dataList)) {
      const { ref, setState } = value;
      ref.current = ref.current.filter((d) => d.selected);
      for (const item of ref.current) {
        item.viewOnly = true;
      }
      setState(ref.current);
    }
  };

  const finalSubmission = (callback) => {
    setSubmitting(true);
    const activeMPSet = new Set();
    // Compile one master set of monitor plan ids that are being submitted
    for (const [key, value] of Object.entries(dataList)) {
      const { ref } = value;
      for (const chunk of ref.current) {
        if (chunk.selected) {
          activeMPSet.add(chunk.monPlanId);
        }
      }
    }

    const payload = {};
    if (componentType === "Submission") {
      // Build submission payload
      payload.activityId = activityId;
    } else {
      // Build base evaluate payload
      payload.userId = user.userId;
      payload.userEmail = user.email;
    }

    payload.items = [];

    for (const monPlanId of activeMPSet) {
      const newItem = {};
      newItem.monPlanId = monPlanId;
      //First check the monitor plan to see if we should be submitting it
      if (
        monPlanRef.current.filter(
          (f) => f.monPlanId === monPlanId && f.selected
        ).length > 0
      ) {
        newItem.submitMonPlan = true;
      } else {
        newItem.submitMonPlan = false;
      }

      //Build QA datasets for payload
      newItem.testSumIds = qaTestSumRef.current
        .filter((f) => f.monPlanId === monPlanId && f.selected)
        .map((m) => {
          if (componentType === "Submission") {
            return {
              id: m.testSumId,
              quarter: m.periodAbbreviation,
            };
          }
          return m.testSumId;
        });
      newItem.qceIds = [];
      newItem.teeIds = [];

      //Final step to add emissions data for specific monPlan
      newItem.emissionsReportingPeriods = emissionsRef.current
        .filter((f) => f.monPlanId === monPlanId && f.selected)
        .map((m) => m.periodAbbreviation);

      // Add it to the result set of data sent to the back-end
      payload.items.push(newItem);
    }

    callback(payload)
      .then(() => {
        setSubmitting(false);
        window.location.reload(false);
      })
      .catch((e) => {
        handleError(e);
        setSubmitting(false);
      });
  };

  const applyFilter = async (orisCodes, monPlanIds, submissionPeriods) => {
    filesSelected.current = 0;
    setNumFilesSelected(filesSelected.current);

    storedFilters.current = {
      orisCodes: orisCodes,
      monPlanIds: monPlanIds,
      submissionPeriods: submissionPeriods,
    };

    //TODO: Refactor this to use DataList
    const dataToSetMap = {
      //Contains data fetch, state setter, and ref for each of the 5 categories
      MP: [getMonitoringPlans, setMonPlans, monPlanRef],
      QA_TEST_SUMMARY: [
        getQATestSummaryReviewSubmit,
        setQaTestSummary,
        qaTestSumRef,
      ],
      EMISSIONS: [getEmissionsReviewSubmit, setEmissions, emissionsRef],
    };

    let activePlans = new Set();
    for (const [key, value] of Object.entries(dataToSetMap)) {
      let data;

      if (key !== "MP") {
        //Filter emissions by quarter as well
        data = (await value[0](orisCodes, monPlanIds, submissionPeriods)).data;
      } else {
        data = (await value[0](orisCodes, monPlanIds)).data;
      }

      // Extra formatting to make all data sets uniform
      for (const r of data) {
        if (r["id"]) {
          r.monPlanId = r["id"];
        }

        if (r["submissionCode"]) {
          r.submissionAvailabilityCode = r["submissionCode"];
        }
      }

      data = data.map((chunk) => {
        //Add selector state variables
        const isLocationCheckedOut = checkedOutLocationsMap.has(
          chunk.monPlanId
        );
        return {
          selected: false,
          checkedOut: isLocationCheckedOut,
          userCheckedOut: isLocationCheckedOutByUser({
            userId,
            checkedOutLocationsMap,
            chunk,
            isLocationCheckedOut,
          }),
          viewOnly: false,
          ...chunk,
        };
      });

      if (key === "MP") {
        data = data.filter((mpd) => mpd.active);
        activePlans = new Set(data.map((d) => d.monPlanId));
      } else {
        data = data.filter((d) => activePlans.has(d.monPlanId));
      }

      if (excludeErrors) {
        data = data.filter((mpd) => mpd.evalStatusCode !== "ERR");
      }

      value[2].current = data; //Set ref and state [ref drives logic, state drives ui updates]
      value[1](data);
    }
  };

  const getSelectedMPIds = () => {
    const monPlanIds = new Set();
    for (const [key, value] of Object.entries(dataList)) {
      const { ref } = value;
      for (const chunk of ref.current) {
        if (chunk.selected) {
          monPlanIds.add(chunk.monPlanId);
        }
      }
    }

    return Array.from(monPlanIds);
  };

  return (
    <div className="react-transition fade-in padding-x-3">
      <div className="text-black margin-top-1 display-flex flex-row">
        <h2 className="flex-4 page-header margin-top-2">{title}</h2>
        {finalSubmitStage && (
          <Button
            className="flex-align-self-end flex-align-self-center flex-1 margin-right-5 maxw-mobile"
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
        <EvaluateRefresh dataList={dataList} storedFilters={storedFilters} />
      )}

      {!finalSubmitStage && (
        <FilterForm
          showModal={setShowModal}
          queryCallback={applyFilter}
          setExcludeErrors={setExcludeErrors}
          facilities={MockPermissions}
          filesSelected={numFilesSelected}
          buttonText={buttonText}
          filterClick={filterClick}
        />
      )}

      <DataTables
        monPlanState={monPlans}
        setMonPlanState={setMonPlans}
        monPlanRef={monPlanRef}
        qaTestSumState={qaTestSummary}
        setQaTestSumState={setQaTestSummary}
        qaTestSumRef={qaTestSumRef}
        emissionsState={emissions}
        setEmissionsState={setEmissions}
        emissionsRef={emissionsRef}
        permissions={idToPermissionsMap} //Map of oris codes to user permissions
        updateFilesSelected={updateFilesSelected}
        componentType={componentType}
      />

      <LoadingModal loading={submitting} />

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
      <div className=" grid-row">
        <div className="grid-col-10"></div>
        <div className="grid-col-2">
          <div className="display-flex flex-row flex-justify-end desktop:flex-justify-center margin-y-5 margin-right-2 float-left">
            <Button onClick={filterClick} disabled={numFilesSelected === 0}>
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
      <div className="text-black margin-top-1 display-flex flex-row margin-bottom-5">
        {finalSubmitStage && (
          <Button
            className="flex-align-self-end flex-align-self-center flex-1 margin-right-5 maxw-mobile"
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

export default connect(mapStateToProps, null)(EvaluateAndSubmit);
