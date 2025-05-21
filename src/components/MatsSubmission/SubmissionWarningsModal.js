import { Alert } from "@trussworks/react-uswds";
import React from "react";

import Modal from "../Modal/Modal";

export const SubmissionWarningsModal = ({
  onClose = () => {},
  onSave = () => {},
  warnings = [],
}) => {
  return (
    <Modal
      close={onClose}
      exitBtn="Continue"
      save={onSave}
      showDarkBg={true}
      showSave={true}
      title="Submission Warnings"
    >
      <p className="margin-top-0">
        There are one or more issues with your submission. Click "Cancel" to
        return to the submission page and correct the issues or "Continue" to
        submit the data as is.
      </p>
      {warnings.map((warning) => (
        <Alert key={warning} type="warning" slim noIcon headingLevel="h3">
          {warning}
        </Alert>
      ))}
    </Modal>
  );
};

export default SubmissionWarningsModal;
