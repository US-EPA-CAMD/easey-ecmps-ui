import React, { useRef } from "react";
import { Label, Textarea, Alert } from "@trussworks/react-uswds";
import Modal from "../../Modal/Modal";
import { certEventLabel, testExtensionExemptionLabel, testSummaryLabel } from "../FilterFormAdmin/FilterFormAdmin";
import { updateQaCertEventMaintenanceRecords, updateQaExtensionExemptionMaintenanceRecords, updateQaTestMaintenanceRecords } from "../../../utils/api/adminManagementApi";

export const QA_MAINTENANCE_MODAL_REQUIRE_RESUBMISSION = 'require-resubmission'
export const QA_MAINTENANCE_MODAL_DELETE = 'delete'

const QAMaintenanceModalPopout = ({
  showModal,
  closeModalHandler,
  action,
  typeSelection,
  selectedRows,
  setReloadTableData,
}) => {

  let modalContent
  if (action === QA_MAINTENANCE_MODAL_REQUIRE_RESUBMISSION) {
    modalContent =
      <QAMaintenanceRequireResubmissionPopout
        showModal={showModal}
        closeModalHandler={closeModalHandler}
        typeSelection={typeSelection}
        selectedRows={selectedRows}
        setReloadTableData={setReloadTableData}
      />
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

const QAMaintenanceRequireResubmissionPopout = ({
  showModal,
  closeModalHandler,
  typeSelection,
  selectedRows,
  setReloadTableData
}) => {
  const inputRef = useRef('')

  const handleSave = async () => {
    console.log('reason to require resubmission', inputRef.current.value);

    let updateFunc
    let identifier // name of id field for each type
    switch (typeSelection) {
      case testSummaryLabel:
        identifier = 'testSumId'
        updateFunc = updateQaTestMaintenanceRecords
        break
      case certEventLabel:
        identifier = 'certEventId'
        updateFunc = updateQaCertEventMaintenanceRecords
        break
      case testExtensionExemptionLabel:
        identifier = 'testExtensionExemptionId'
        updateFunc = updateQaExtensionExemptionMaintenanceRecords
        break
      default:
        throw new Error(`type selection of ${typeSelection} does not exist`)
    }

    const selectedIds = selectedRows.map(row => row[identifier])

    try {
      // TODO: add require resubmission reason to payload, replace temp null value
      const promises = selectedIds.map(id => updateFunc(null, id))
      await Promise.all(promises)
      setReloadTableData(true)
    } catch (e) {
      console.error(e)
    } finally {
      closeModalHandler()
    }
  }

  return (
    <Modal
      showDarkBg
      show={showModal}
      save={handleSave}
      exitBTN='Save and Close'
      showSave
      title='Require Resubmission'
      close={closeModalHandler}
      width="40%"
      left="30%"
    >
      <ReasonForActionTextInput
        title='Reason to require resubmission'
        action={QA_MAINTENANCE_MODAL_REQUIRE_RESUBMISSION}
        inputRef={inputRef}
        className='margin-y-2'
      />
    </Modal >
  )
}

const QAMaintenanceDeletePopout = ({
  showModal,
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
