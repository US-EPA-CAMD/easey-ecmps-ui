import React, { useRef } from "react";
import { Label, Textarea, Alert } from "@trussworks/react-uswds";
import Modal from "../../Modal/Modal";
import {
  certEventLabel,
  testExtensionExemptionLabel,
  testSummaryLabel,
} from "../FilterFormAdmin/FilterFormAdmin";
import {
  updateQaCertEventMaintenanceRecords,
  updateQaExtensionExemptionMaintenanceRecords,
  updateQaTestMaintenanceRecords,
  deleteQaCertEventMaintenanceRecords,
  deleteQaTestMaintenanceRecords,
  deleteQaExtensionExemptionMaintenanceRecords,
} from "../../../utils/api/adminManagementApi";

export const QA_MAINTENANCE_MODAL_REQUIRE_RESUBMISSION = "require-resubmission";
export const QA_MAINTENANCE_MODAL_DELETE = "delete";

const QAMaintenanceModalPopout = ({
  showModal,
  closeModalHandler,
  action,
  typeSelection,
  selectedRows,
  setReloadTableData,
}) => {
  let modalContent;
  if (action === QA_MAINTENANCE_MODAL_REQUIRE_RESUBMISSION) {
    modalContent = (
      <QAMaintenanceRequireResubmissionPopout
        showModal={showModal}
        closeModalHandler={closeModalHandler}
        typeSelection={typeSelection}
        selectedRows={selectedRows}
        setReloadTableData={setReloadTableData}
      />
    );
  } else if (action === QA_MAINTENANCE_MODAL_DELETE) {
    modalContent = (
      <QAMaintenanceDeletePopout
        showModal={showModal}
        closeModalHandler={closeModalHandler}
        typeSelection={typeSelection}
        selectedRows={selectedRows}
        setReloadTableData={setReloadTableData}
      />
    );
  }

  return modalContent;
};

const getFunctionsAndIdentifiers = (typeSelection) => {
  let updateFunc;
  let deleteFunc;
  const identifier = "id";

  switch (typeSelection) {
    case testSummaryLabel:
      updateFunc = updateQaTestMaintenanceRecords;
      deleteFunc = deleteQaTestMaintenanceRecords;
      break;
    case certEventLabel:
      updateFunc = updateQaCertEventMaintenanceRecords;
      deleteFunc = deleteQaCertEventMaintenanceRecords;
      break;
    case testExtensionExemptionLabel:
      updateFunc = updateQaExtensionExemptionMaintenanceRecords;
      deleteFunc = deleteQaExtensionExemptionMaintenanceRecords;
      break;
    default:
      throw new Error(`type selection of ${typeSelection} does not exist`);
  }

  return {
    updateFunc,
    deleteFunc,
    identifier,
  };
};

const QAMaintenanceRequireResubmissionPopout = ({
  showModal,
  closeModalHandler,
  typeSelection,
  selectedRows,
  setReloadTableData,
}) => {
  const inputRef = useRef("");

  const handleSave = async () => {
    const { identifier, updateFunc } =
      getFunctionsAndIdentifiers(typeSelection);
    const selectedIds = selectedRows.map((row) => row[identifier]);

    try {
      const payload = {
        resubExplanation: inputRef.current.value,
      };
      const promises = selectedIds.map((id) => updateFunc(payload, id));
      await Promise.all(promises);
      setReloadTableData(true);
    } catch (e) {
      console.error(e);
    } finally {
      closeModalHandler();
    }
  };

  return (
    <Modal
      showDarkBg
      show={showModal}
      save={handleSave}
      exitBtn="Save and Close"
      showSave
      title="Require Resubmission"
      close={closeModalHandler}
      width="40%"
      left="30%"
      returnFocus={true}
    >
      <ReasonForActionTextInput
        title="Reason to require resubmission"
        action={QA_MAINTENANCE_MODAL_REQUIRE_RESUBMISSION}
        inputRef={inputRef}
        className="margin-y-2"
        disabled={false}
      />
    </Modal>
  );
};

const QAMaintenanceDeletePopout = ({
  showModal,
  closeModalHandler,
  typeSelection,
  selectedRows,
  setReloadTableData,
}) => {
  const handleSave = async () => {
    const { identifier, deleteFunc } =
      getFunctionsAndIdentifiers(typeSelection);
    const selectedIds = selectedRows.map((row) => row[identifier]);

    try {
      const promises = selectedIds.map((id) => deleteFunc(id));
      await Promise.all(promises);
      setReloadTableData(true);
    } catch (e) {
      console.error(e);
    } finally {
      closeModalHandler();
    }
  };

  return (
    <Modal
      showDarkBg
      show={showModal}
      save={handleSave}
      exitBtn={"Delete"}
      showSave
      title={"Delete QA/Cert Data"}
      close={closeModalHandler}
      width="40%"
      left="30%"
      returnFocus={true}
    >
      <h3>Are you sure you want to continue?</h3>

      <Alert headingLevel="h4" type="error" slim>
        Are you sure you want to Delete? This action cannot be undone.
      </Alert>
    </Modal>
  );
};

const ReasonForActionTextInput = ({
  title,
  action,
  inputRef,
  className,
  disabled = false,
}) => {
  const reasonToAction = `reason-to-${action}`;

  return (
    <div className={className}>
      <Label htmlFor={reasonToAction} id={`${reasonToAction}-label`}>
        {title}
      </Label>
      <Textarea
        className="maxw-full"
        id={reasonToAction}
        name={reasonToAction}
        type="text"
        epa-testid={reasonToAction}
        data-testid={reasonToAction}
        inputRef={inputRef}
        disabled={disabled}
      />
    </div>
  );
};

export default QAMaintenanceModalPopout;
