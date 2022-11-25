import React, { useState, useRef, useEffect } from "react";
import { getMonitoringPlans } from "../../utils/api/monitoringPlansApi";
import ReviewAndSubmitForm from "./ReviewAndSubmitForm/ReviewAndSubmitForm";
import SubmissionModal from "../SubmissionModal/SubmissionModal";
import ReviewAndSubmitTables from "./ReviewAndSubmitTables/ReviewAndSubmitTables";
import MockPermissions from "./MockPermissions";

const ReviewAndSubmit = () => {
  const [excludeErrors, setExcludeErrors] = useState(true);

  const [showModal, setShowModal] = useState(false);
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
    console.log("Hello World");
    let monPlanData = (await getMonitoringPlans(orisCodes, monPlanIds)).data;
    monPlanData = monPlanData.filter((mpd) => mpd.active);

    if (excludeErrors) {
      monPlanData = monPlanData.filter((mpd) => mpd.evalStatusCd !== "ERR");
    }

    setMonPlans(monPlanData);
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
        />
      )}
    </div>
  );
};

export default ReviewAndSubmit;
