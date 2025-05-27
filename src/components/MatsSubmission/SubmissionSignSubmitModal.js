import React from "react";

import Modal from "../Modal/Modal";

export const SubmissionSignSubmitModal = ({
  onClose = () => {},
  onSave = () => {},
}) => {
  return (
    <Modal
      close={onClose}
      exitBtn="Sign & Submit"
      save={onSave}
      showDarkBg={true}
      showSave={true}
    />
  );
};

export default SubmissionSignSubmitModal;
