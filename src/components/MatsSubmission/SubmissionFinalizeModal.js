import { Alert } from "@trussworks/react-uswds";
import log from "loglevel";
import React, { useEffect, useState } from "react";

import { matsSubmissionProcess } from "../../utils/api/camdServices";
import { DataStatus } from "../../utils/constants/dataStatus";
import Modal from "../Modal/Modal";
import StatusContent from "../StatusContent/StatusContent";

export const SubmissionFinalizeModal = ({
  submissionId,
  onClose = () => {},
}) => {
  const [status, setStatus] = useState(DataStatus.IDLE);

  useEffect(() => {
    if (!submissionId) return;

    const user = JSON.parse(localStorage.getItem("ecmps_user"));
    const payload = {
      matsDataSubmissionId: parseInt(submissionId),
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      middleInitial: "",
      activityDescription: `ECMPS MATS Submission for ${user.userId}`,
    };

    setStatus(DataStatus.PENDING);
    matsSubmissionProcess(payload, false)
      .then(() => {
        setStatus(DataStatus.SUCCESS);
      })
      .catch((err) => {
        log.error("Error finalizing submission:", err);
        setStatus(DataStatus.ERROR);
      });
  }, [submissionId]);

  return (
    <Modal
      title="Finalize MATS Submission"
      close={onClose}
      exitBtn="Close"
      save={onClose}
      showDarkBg={true}
      showSave={status === DataStatus.SUCCESS}
    >
      <StatusContent status={status} errorMsg="Error submitting MATS data.">
        <Alert headingLevel="h3" noIcon slim type="success">
          Successfully submitted MATS data.
        </Alert>
      </StatusContent>
    </Modal>
  );
};

export default SubmissionFinalizeModal;
