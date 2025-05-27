import React from "react";

import Modal from "../Modal/Modal";

export const SubmissionSignSubmitModal = ({
  onClose = () => {},
  onSave = () => {},
}) => {
  return (
    <Modal
      title={`MATS Data Submission Process`}
      close={onClose}
      exitBtn="Sign & Submit"
      save={onSave}
      showDarkBg={true}
      showSave={true}
    >
      {/* TODO: Need to improve the text; loading functionality; other details */}
      <div>
        You’re almost done. By selecting "Sign and Submit", you are submitting your data to the MATS process
      </div>
    </Modal>
  );
};

export default SubmissionSignSubmitModal;
