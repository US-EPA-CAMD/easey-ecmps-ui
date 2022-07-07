import { ButtonGroup, Modal, ModalFooter, ModalHeading, ModalToggleButton } from "@trussworks/react-uswds";
import React, { useRef } from "react";

const defaultHeading = 'Confirmation'
const defaultDescription = 'Please confirm your action'
const defaultConfirmText = 'Yes'
const defaultCancelText = 'Cancel'

const ConfirmActionButton = ({
  buttonText,
  heading = defaultHeading,
  description = defaultDescription,
  confirmText = defaultConfirmText,
  cancelText = defaultCancelText,
  onConfirmHandler,
  onCancelHandler,
}) => {
  const modalRef = useRef()
  return (
    <>
      <ModalToggleButton modalRef={modalRef} opener outline={true}>
        {buttonText}
      </ModalToggleButton>
      <Modal
        ref={modalRef}
        id="example-modal-1"
        aria-labelledby="modal-1-heading"
        aria-describedby="modal-1-description">
        <ModalHeading id="modal-1-heading">
          {heading}
        </ModalHeading>
        <div className="usa-prose" onClick={() => console.log(modalRef)}>
          <p id="modal-1-description">
            {description}
          </p>
        </div>
        <ModalFooter className="float-right">
          <ButtonGroup>
            <div onClick={onConfirmHandler}>
              <ModalToggleButton modalRef={modalRef} closer >
                {confirmText}
              </ModalToggleButton>
            </div>
            <div onClick={onCancelHandler}>
              <ModalToggleButton
                modalRef={modalRef}
                closer
                unstyled
                className="padding-105 text-center">
                {cancelText}
              </ModalToggleButton>
            </div>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ConfirmActionButton
