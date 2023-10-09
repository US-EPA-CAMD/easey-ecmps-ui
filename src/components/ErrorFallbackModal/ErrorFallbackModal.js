import React, { useRef } from "react";
import { Modal, ModalFooter, ModalHeading, Alert, Button } from "@trussworks/react-uswds";
import "./ErrorFallbackModal.scss";


const ErrorFallbackModal = (props) => {
  const { error, resetErrorBoundary, errorId } = props;
  const modalRef = useRef(null);

  const closeHandler = (evt) => {
    modalRef.current.toggleModal(evt, false);
    resetErrorBoundary();
  };

  return (
    <div id="error-boundary-fallback">
      <Modal
        ref={modalRef}
        id="error-fallback-modal"
        aria-labelledby="error-fallback-modal-heading"
        aria-describedby="error-fallback-modal-description"
        aria-live="polite"
        forceAction
        isInitiallyOpen
      >
        <ModalHeading id="error-fallback-modal-heading">
          Oops, something went wrong!
        </ModalHeading>
        <div>
          <Alert type="error" heading="Error Status" headingLevel="h4" className="text-wrap">
            {error.message}
          </Alert>
          <p id="error-fallback-modal-description">
            <b>Error Id: </b>{errorId}
            <br/> 
            <p>An error has occurred. If the problem persists, please contact the help desk.</p>
          </p>
        </div>
        <ModalFooter>
          <Button
            className="float-right"
            onClick={closeHandler}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
};

export default ErrorFallbackModal;
