import React, { useState, useRef, useEffect } from "react";
import {
  getMonitoringPlans,
  getCheckedOutLocations,
} from "../../utils/api/monitoringPlansApi";
import {
  getQATestSummaryReviewSubmit,
  getQACertEventReviewSubmit,
  getQATeeReviewSubmit,
} from "../../utils/api/qaCertificationsAPI";
import { getEmissionsReviewSubmit } from "../../utils/api/emissionsApi";
import DataTables from "./DataTables/DataTables";
import SubmissionModal from "../SubmissionModal/SubmissionModal";
import MockPermissions from "./MockPermissions";
import { Button } from "@trussworks/react-uswds";
import { connect } from "react-redux";
import { submitData } from "../../utils/api/camdServices";
import { handleError } from "../../utils/api/apiUtils";
import LoadingModal from "../LoadingModal/LoadingModal";
import FilterForm from "./FilterForm/FilterForm";
import { triggerBulkEvaluation } from "../../utils/api/quartzApi";
import { EvaluateRefresh } from "./EvaluateRefresh";
import _ from "lodash";
import {
  monPlanColumns,
  qaTestSummaryColumns,
  emissionsColumns,
  qaCertEventColumns,
  qaTeeColumns,
} from "./ColumnMappings";
import { checkoutAPI } from "../../additional-functions/checkout";

export const EvaluateAndSubmit = ({
  checkedOutLocations,
  user,
  componentType,
}) => {
  const [title, setTitle] = useState("Submit");
  const [buttonText, setButtonText] = useState("Sign & Submit");

  const storedFilters = useRef(null);

  const evalClickedAtTime = useRef(0);

  const [activityId, setActivityId] = useState("");
  const [excludeErrors, setExcludeErrors] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [numFilesSelected, setNumFilesSelected] = useState(0);
  const filesSelected = useRef(0);

  const [qaTestSummary, setQaTestSummary] = useState([]);
  const qaTestSumRef = useRef([]);

  const [qaCertEvent, setQaCertEvent] = useState([]);
  const qaCertEventRef = useRef([]);

  const [qaTee, setQaTee] = useState([]);
  const qaTeeRef = useRef([]);

  const [emissions, setEmissions] = useState([]);
  const emissionsRef = useRef([]);

  const [monPlans, setMonPlans] = useState([]);
  const monPlanRef = useRef([]);

  const [finalSubmitStage, setFinalSubmitStage] = useState(false);
  const { userId } = user;

  const monitorPlanIdToSelectedMap = useRef(new Map()); // Map each monitor plan to a count of how many times it has been selected
  const userCheckedOutPlans = useRef(new Set());

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

  const dataList = [
    {
      columns: monPlanColumns,
      ref: monPlanRef,
      state: monPlans,
      setState: setMonPlans,
      call: getMonitoringPlans,
      rowId: "monPlanId",
      name: "Monitoring Plan",
      type: "MP",
    },
    {
      columns: qaTestSummaryColumns,
      ref: qaTestSumRef,
      state: qaTestSummary,
      setState: setQaTestSummary,
      call: getQATestSummaryReviewSubmit,
      rowId: "testSumId",
      name: "Test Data",
      type: "QA",
    },
    {
      columns: qaCertEventColumns,
      ref: qaCertEventRef,
      state: qaCertEvent,
      setState: setQaCertEvent,
      call: getQACertEventReviewSubmit,
      rowId: "qaCertEventIdentifier",
      name: "QA Certification Events",
      type: "QA",
    },
    {
      columns: qaTeeColumns,
      ref: qaTeeRef,
      state: qaTee,
      setState: setQaTee,
      call: getQATeeReviewSubmit,
      rowId: "testExtensionExemptionIdentifier",
      name: "Test Extension Exemptions Data",
      type: "QA",
    },
    {
      columns: emissionsColumns,
      ref: emissionsRef,
      state: emissions,
      setState: setEmissions,
      call: getEmissionsReviewSubmit,
      rowId: "periodAbbreviation",
      name: "Emissions",
      type: "EM",
    },
  ];

  const getUserPlans = async () => {
    const data = (await getCheckedOutLocations()).data;

    userCheckedOutPlans.current = new Set(
      data.filter((l) => l.checkedOutBy === userId).map((m) => m.monPlanId)
    );
  };

  const idToPermissionsMap = useRef([]);

  useEffect(() => {
    // Get permissions from user object here
    const permissions = MockPermissions;
    for (const p of permissions) {
      idToPermissionsMap.current[p.id] = p.permissions;
    }

    return () => {
      checkInAllCheckedOutLocations();
    };
  }, []);

  useEffect(() => {
    const planToOwnerCheckouts = new Map();
    for (const loc of checkedOutLocations) {
      planToOwnerCheckouts.set(loc.monPlanId, loc.checkedOutBy);
    }

    getUserPlans();

    for (const cat of dataList) {
      for (const chunk of cat.ref.current) {
        if (planToOwnerCheckouts.has(chunk.monPlanId)) {
          chunk.checkedOut = true;
          if (planToOwnerCheckouts.get(chunk.monPlanId) === userId) {
            chunk.userCheckedOut = true;
          }
        } else {
          chunk.checkedOut = false;
          chunk.userCheckedOut = false;
        }
      }
      cat.setState([...cat.ref.current]);
    }
  }, [checkedOutLocations, userId]);

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

    for (const value of dataList) {
      const { ref, setState } = value;
      ref.current = ref.current.filter((d) => d.selected);
      for (const item of ref.current) {
        item.viewOnly = true;
      }
      setState(ref.current);
    }
  };

  const finalSubmission = (callback) => {
    evalClickedAtTime.current = new Date().getTime();
    setSubmitting(true);
    const activeMPSet = new Set();
    // Compile one master set of monitor plan ids that are being submitted
    for (const value of dataList) {
      const { ref, setState } = value;
      for (const chunk of ref.current) {
        if (chunk.selected) {
          if (componentType === "Evaluate") {
            chunk.evalStatusCode = "INQ";
          }
          activeMPSet.add(chunk.monPlanId);
        }
      }
      if (componentType === "Evaluate") {
        setState(_.clone(ref.current));
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
      newItem.qceIds = qaCertEventRef.current
        .filter((f) => f.monPlanId === monPlanId && f.selected)
        .map((m) => {
          if (componentType === "Submission") {
            return {
              id: m.qaCertEventIdentifier,
              quarter: m.periodAbbreviation,
            };
          }
          return m.qaCertEventIdentifier;
        });
      newItem.teeIds = qaTeeRef.current
        .filter((f) => f.monPlanId === monPlanId && f.selected)
        .map((m) => {
          if (componentType === "Submission") {
            return {
              id: m.testExtensionExemptionIdentifier,
              quarter: m.periodAbbreviation,
            };
          }
          return m.testExtensionExemptionIdentifier;
        });

      //Final step to add emissions data for specific monPlan
      newItem.emissionsReportingPeriods = emissionsRef.current
        .filter((f) => f.monPlanId === monPlanId && f.selected)
        .map((m) => m.periodAbbreviation);

      // Add it to the result set of data sent to the back-end
      payload.items.push(newItem);
    }

    callback(payload)
      .then(() => {
        checkInAllCheckedOutLocations();
        setSubmitting(false);
        if (componentType === "Submission") {
          window.location.reload(false);
        }
      })
      .catch((e) => {
        handleError(e);
        setSubmitting(false);
      });
  };

  const checkInAllCheckedOutLocations = () => {
    for (let [key, value] of monitorPlanIdToSelectedMap.current) {
      if (value[1] > 0) {
        checkoutAPI(false, value[0], key);
      }
    }
  };

  const applyFilter = async (orisCodes, monPlanIds, submissionPeriods) => {
    checkInAllCheckedOutLocations();
    monitorPlanIdToSelectedMap.current = new Map();
    filesSelected.current = 0;
    setNumFilesSelected(filesSelected.current);

    // Pull latest checked out records
    const data = (await getCheckedOutLocations()).data;
    userCheckedOutPlans.current = new Set(
      data.filter((l) => l.checkedOutBy === userId).map((m) => m.monPlanId)
    );

    const totalCheckOuts = new Set(data.map((m) => m.monPlanId));

    storedFilters.current = {
      orisCodes: orisCodes,
      monPlanIds: monPlanIds,
      submissionPeriods: submissionPeriods,
    };

    let activePlans = new Set();
    for (const value of dataList) {
      const { ref, setState, call, type } = value;

      let data;

      if (type !== "MP") {
        //Filter emissions by quarter as well
        data = (await call(orisCodes, monPlanIds, submissionPeriods)).data;
      } else {
        data = (await call(orisCodes, monPlanIds)).data;
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
        return {
          selected: false,
          checkedOut: totalCheckOuts.has(chunk.monPlanId),
          userCheckedOut: userCheckedOutPlans.current.has(chunk.monPlanId),
          viewOnly: false,
          ...chunk,
        };
      });

      if (type === "MP") {
        data = data.filter((mpd) => mpd.active);
        activePlans = new Set(data.map((d) => d.monPlanId));
      } else {
        data = data.filter((d) => activePlans.has(d.monPlanId));
      }

      if (excludeErrors && componentType === "Submission") {
        //We don't care about errors on evaluations page
        data = data.filter((mpd) => mpd.evalStatusCode !== "ERR");
      }

      ref.current = data; //Set ref and state [ref drives logic, state drives ui updates]
      setState(data);
    }
  };

  const getSelectedMPIds = () => {
    const monPlanIds = new Set();
    for (const value of dataList) {
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
      <div className="text-black flex-justify margin-top-1 grid-row">
        <h2 className="grid-col-9 page-header margin-top-2">{title}</h2>
        {finalSubmitStage && (
          <Button
            className="grid-col-3 flex-align-self-center maxw-mobile margin-0"
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
        />
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
          componentType={componentType}
        />
      )}

      <DataTables
        dataList={dataList}
        permissions={idToPermissionsMap} //Map of oris codes to user permissions
        updateFilesSelected={updateFilesSelected}
        componentType={componentType}
        monitorPlanIdToSelectedMap={monitorPlanIdToSelectedMap}
        userCheckedOutPlans={userCheckedOutPlans}
      />

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
              <Button onClick={filterClick} disabled={numFilesSelected === 0}>
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="text-black flex-justify-end margin-top-1 grid-row">
        {finalSubmitStage && (
          <Button
            className="grid-col-3 flex-align-self-center maxw-mobile margin-0"
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
