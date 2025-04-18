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
    >
      {warnings.map((warning) => (
        <Alert key={warning} type="warning" slim noIcon headingLevel="h3">
          {warning}
        </Alert>
      ))}
    </Modal>
  );
};

export default SubmissionWarningsModal;
