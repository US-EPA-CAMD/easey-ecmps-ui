import React, { useRef } from "react";
import { Label, Textarea, Alert } from "@trussworks/react-uswds";
import Modal from "../../Modal/Modal";

export const QA_MAINTENANCE_MODAL_REQUIRE_RESUBMISSION = 'require-resubmission'
export const QA_MAINTENANCE_MODAL_DELETE = 'delete'

const QAMaintenanceModalPopout = ({
  showModal,
  closeModalHandler,
  action
}) => {

  let modalContent
  if (action === QA_MAINTENANCE_MODAL_REQUIRE_RESUBMISSION) {
    modalContent = <p>require resubmission modal content</p>
  } else if (action === QA_MAINTENANCE_MODAL_DELETE) {
    modalContent =
      <QAMaintenanceDeletePopout
        showModal={showModal}
        closeModalHandler={closeModalHandler}
      />
  }

  return (
    modalContent
  )
}

const QAMaintenanceDeletePopout = ({
  showModal,
  disableSaveBtn,
  closeModalHandler,
}) => {
  const inputRef = useRef('')

  const handleDelete = () => {
    console.log('ref value', inputRef.current.value);
  }

  return (
    <Modal
      showDarkBg
      show={showModal}
      save={handleDelete}
      exitBTN={"Delete"}
      showSave
      disableExitBtn={disableSaveBtn}
      title={"Delete QA/Cert Data"}
      close={closeModalHandler}
      width="40%"
      left="30%"
    >
      <h3>Are you sure you want to continue?</h3>

      <Alert type="error" slim>
        Are you sure you want to Delete? This action cannot be undone.
      </Alert>

      <ReasonForActionTextInput
        title='Reason to delete QA/Cert Data'
        action={QA_MAINTENANCE_MODAL_DELETE}
        inputRef={inputRef}
        className='margin-y-2'
      />

    </Modal >
  )
}

const ReasonForActionTextInput = ({ title, action, inputRef, className }) => {

  const reasonToAction = `reason-to-${action}`

  return (
    <div className={className}>
      <Label htmlFor={reasonToAction} id={`${reasonToAction}-label`}>{title}</Label>
      <Textarea
        className="maxw-full"
        id={reasonToAction}
        name={reasonToAction}
        type="text"
        epa-testid={reasonToAction}
        data-testid={reasonToAction}
        inputRef={inputRef}
      />
    </div>
  )
}

export default QAMaintenanceModalPopout
