import React, { useState } from "react";
import { getMonitoringPlans } from "../../utils/api/monitoringPlansApi";
import ReviewAndSubmitForm from "./ReviewAndSubmitForm/ReviewAndSubmitForm";
import SubmissionModal from "../SubmissionModal/SubmissionModal";

const ReviewAndSubmit = () => {
  const [excludeErrors, setExcludeErrors] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [monPlans, setMonPlans] = useState([]);

  const closeModal = () => {
    setShowModal(false);
  };

  const submission = () => {
    closeModal();
  };

  const applyFilter = async (orisCodes, monPlanIds, submissionPeriods) => {
    let monPlanData = (await getMonitoringPlans(orisCodes, monPlanIds)).data;
    monPlanData = monPlanData.filter((mpd) => mpd.active);

    if (excludeErrors) {
      monPlanData = monPlanData.filter((mpd) => mpd.evalStatusCd !== "ERR");
    }

    setMonPlans(monPlanData);
  };

  return (
    <div>
      <ReviewAndSubmitForm
        showModal={setShowModal}
        queryCallback={applyFilter}
        setExcludeErrors={setExcludeErrors}
      />
      {showModal && (
        <SubmissionModal
          show={showModal}
          close={closeModal}
          submissionCallback={submission}
          monitorPlanIds={[
            "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
            "02183-7RSS-09C865120F7C4FD6AFB801E02773AEDB",
          ]}
        />
      )}
    </div>
  );
};

export default ReviewAndSubmit;
