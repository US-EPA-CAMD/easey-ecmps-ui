import React, { useRef } from "react";
import { getTableRowActionAriaLabel } from "../../utils/selectors/QACert/TestSummary";
import { ButtonGroup, Modal, ModalFooter, ModalHeading, ModalToggleButton } from "@trussworks/react-uswds";


const defaultHeading = 'Confirmation'
const defaultDescription = 'Please confirm your action'
const defaultConfirmText = 'Yes'
const defaultCancelText = 'Cancel'

const ConfirmActionModal = ({
  buttonText,
  heading = defaultHeading,
  description = defaultDescription,
  confirmText = defaultConfirmText,
  cancelText = defaultCancelText,
  onConfirm,
  onCancel,
  row,
  dataTableName
}) => {
  const modalRef = useRef()
  return (
    <>
      <ModalToggleButton 
        modalRef={modalRef} 
        opener outline={true} 
        aria-label={getTableRowActionAriaLabel(dataTableName, row, 'Remove')}
        data-testid="Remove"
      >
        {buttonText}
      </ModalToggleButton>
      <Modal
        ref={modalRef}
        id="confirmation-modal-1"
        aria-labelledby="modal-1-heading"
        aria-describedby="modal-1-description">
        <ModalHeading id="modal-1-heading">
          {heading}
        </ModalHeading>
        <div className="usa-prose">
          <p id="modal-1-description">
            {description}
          </p>
        </div>
        <ModalFooter className="float-right">
          <ButtonGroup>
            <div onClick={onConfirm}>
              <ModalToggleButton modalRef={modalRef} closer >
                {confirmText}
              </ModalToggleButton>
            </div>
            <div onClick={onCancel}>
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

export default ConfirmActionModal
