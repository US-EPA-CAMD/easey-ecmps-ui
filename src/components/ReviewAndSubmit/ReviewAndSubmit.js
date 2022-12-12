import React, { useState, useRef, useEffect } from "react";
import { getMonitoringPlans } from "../../utils/api/monitoringPlansApi";
import { getQATestSummaryReviewSubmit } from "../../utils/api/qaCertificationsAPI";
import { getEmissionsReviewSubmit } from "../../utils/api/emissionsApi";
import ReviewAndSubmitForm from "./ReviewAndSubmitForm/ReviewAndSubmitForm";
import SubmissionModal from "../SubmissionModal/SubmissionModal";
import ReviewAndSubmitTables from "./ReviewAndSubmitTables/ReviewAndSubmitTables";
import MockPermissions from "./MockPermissions";
import { Button } from "@trussworks/react-uswds";
import { connect } from "react-redux";
import { updateCheckedOutLocationsOnTables } from "../../utils/functions";

const ReviewAndSubmit = ({checkedOutLocations}) => {
  const [activityId, setActivityId] = useState("");
  const [excludeErrors, setExcludeErrors] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [checkedOutLocationsMap, setCheckedOutLocationsMap] = useState(new Map());

  const [qaTestSummary, setQaTestSummary] = useState([]);
  const qaTestSumRef = useRef([]);

  const [emissions, setEmissions] = useState([]);
  const emissionsRef = useRef([]);

  const [monPlans, setMonPlans] = useState([]);
  const monPlanRef = useRef([]);

  const [finalSubmitStage, setFinalSubmitStage] = useState(false);

  useEffect(() => {
    const checkedOutLocationsMPIdsArray = checkedOutLocations.map(el => el.monPlanId);
    const checkedOutLocationsMPIdsMap = new Set(checkedOutLocationsMPIdsArray);
    console.log({checkedOutLocationsMPIdsArray, checkedOutLocationsMPIdsMap});
    setCheckedOutLocationsMap(checkedOutLocationsMPIdsMap);
    updateCheckedOutLocationsOnTables(checkedOutLocationsMPIdsMap, dataList);//eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedOutLocations]);

  const dataList = {
    monPlan: { ref: monPlanRef, state: monPlans, setState: setMonPlans },
    qaTest: {
      ref: qaTestSumRef,
      state: qaTestSummary,
      setState: setQaTestSummary,
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

  const applyFilter = async (orisCodes, monPlanIds, submissionPeriods) => {
    const dataToSetMap = {
      //Contains data fetch, state setter, and ref for each of the 5 categories
      MP: [getMonitoringPlans, setMonPlans, monPlanRef],
      QA_TEST_SUMMARY: [
        getQATestSummaryReviewSubmit,
        setQaTestSummary,
        qaTestSumRef,
      ],
      //EMISSIONS: [getEmissionsReviewSubmit, setEmissions, emissionsRef], TODO: Update with correct data
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
        return {
          selected: false,
          checkedOut: checkedOutLocationsMap.has(chunk.monPlanId),
          userCheckedOut: false,
          viewOnly: false,
          ...chunk,
        };
      });

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
        return {
          selected: false,
          checkedOut: checkedOutLocationsMap.has(chunk.monPlanId),
          userCheckedOut: false,
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
        <h2 className="flex-4 page-header margin-top-2">Review And Submit</h2>

        <div className=""></div>

        {finalSubmitStage && (
          <Button
            className="flex-align-self-end flex-align-self-center flex-1 margin-right-5 maxw-mobile"
            size="big"
          >
            Submit
          </Button>
        )}
      </div>
      {!finalSubmitStage && (
        <ReviewAndSubmitForm
          showModal={setShowModal}
          queryCallback={applyFilter}
          setExcludeErrors={setExcludeErrors}
          facilities={MockPermissions}
        />
      )}
      <ReviewAndSubmitTables
        monPlanState={monPlans}
        setMonPlanState={setMonPlans}
        monPlanRef={monPlanRef}
        qaTestSumState={qaTestSummary}
        setQaTestSumState={setQaTestSummary}
        qaTestSumRef={qaTestSumRef}
        permissions={idToPermissionsMap} //Map of oris codes to user permissions
      />

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
    </div>
  );
};

const mapStateToProps = (state) => ({checkedOutLocations: state.checkedOutLocations});

export default connect(mapStateToProps, null)(ReviewAndSubmit);