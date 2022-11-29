import React, { useState, useRef, useEffect } from "react";
import { getMonitoringPlans } from "../../utils/api/monitoringPlansApi";
import { getQATestSummaryReviewSubmit } from "../../utils/api/qaCertificationsAPI";
import ReviewAndSubmitForm from "./ReviewAndSubmitForm/ReviewAndSubmitForm";
import SubmissionModal from "../SubmissionModal/SubmissionModal";
import ReviewAndSubmitTables from "./ReviewAndSubmitTables/ReviewAndSubmitTables";
import MockPermissions from "./MockPermissions";

const ReviewAndSubmit = () => {
  const [activityId, setActivityId] = useState("");
  const [excludeErrors, setExcludeErrors] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [qaTestSummary, setQaTestSummarry] = useState([]);
  const [monPlans, setMonPlans] = useState([]);

  const selectedMonPlansRef = useRef();
  const idToPermissionsMap = [];
  useEffect(() => {
    // Get permissions from user object here
    const permissions = MockPermissions;
    for (const p of permissions) {
      idToPermissionsMap[p.id] = p.permissions;
    } //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const submission = () => {
    closeModal();
  };

  const applyFilter = async (orisCodes, monPlanIds, submissionPeriods) => {
    const dataToSetMap = {
      MP: [getMonitoringPlans, setMonPlans],
      QA_TEST_SUMMARY: [getQATestSummaryReviewSubmit, setQaTestSummarry],
    };

    for (const [key, value] of Object.entries(dataToSetMap)) {
      let data = (await value[0](orisCodes, monPlanIds)).data;

      if (key === "MP") {
        data = data.filter((mpd) => mpd.active);
      }

      if (excludeErrors) {
        data = data.filter((mpd) => mpd.evalStatusCd !== "ERR");
      }

      value[1](data);
    }
  };

  const getSelectedMPIds = () => {
    if (!selectedMonPlansRef.current) {
      return [];
    } else {
      return selectedMonPlansRef.current.selectedRows.map(
        (monPlan) => monPlan.id
      );
    }
  };

  return (
    <div className="react-transition fade-in padding-x-3">
      <ReviewAndSubmitForm
        showModal={setShowModal}
        queryCallback={applyFilter}
        setExcludeErrors={setExcludeErrors}
        facilities={MockPermissions}
      />
      {monPlans.length > 0 && (
        <ReviewAndSubmitTables
          monPlans={monPlans}
          selectedMonPlansRef={selectedMonPlansRef}
        />
      )}
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

export default ReviewAndSubmit;
