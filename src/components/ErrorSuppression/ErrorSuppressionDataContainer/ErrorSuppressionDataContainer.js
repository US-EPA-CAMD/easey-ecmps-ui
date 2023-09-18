import React, { useEffect, useState, useContext, useCallback } from "react";
import { Button } from "@trussworks/react-uswds";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { AddErrorSupressionModal } from "../AddErrorSuppressionModal/AddErrorSuppressionModal";
import DataTable from "react-data-table-component";
import { getErrorSuppressionRecords } from "../../../utils/api/errorSuppressionApi";
import { ErrorSuppressionFiltersContext } from "../context/error-suppression-context";
import "./ErrorSuppressionDataContainer.scss";
import { formatDate, getQuarter } from "../../../utils/functions";
import { DeactivateNotificationModal } from "../DeactivateNotificationModal/DeactivateNotificationModal";
import { ArrowDownwardSharp } from "@material-ui/icons";
import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import { assignAriaSortHandlersToDatatable, assignAriaLabelsToDataTableColumns, removeAriaSortHandlersFromDatatable } from "../../../additional-functions/ensure-508"

export const ErrorSuppressionDataContainer = () => {
  const {
    checkType,
    checkNumber,
    checkResult,
    facility,
    locations,
    active,
    reasonCode,
    addDateAfter,
    addDateBefore,
  } = useContext(ErrorSuppressionFiltersContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCloneModal, setShowCloneModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedViewModalData, setSelectedViewModalData] = useState(null);

  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState([]);
  const getTableData = () => {
    if (!checkType || !checkNumber || !checkResult) return;
    // const params = { checkType:"LINEAR", checkNumber:'12', checkResult:'A', facility, locations, active, reason, addDateAfter, addDateBefore, }
    // const params = { checkType:"QUAL", checkNumber:'23', checkResult:'D', facility, locations, active, reason, addDateAfter, addDateBefore, }
    // const params = { checkType:"HOURGEN", checkNumber:'7', checkResult:'C', facility, locations, active, reason, addDateAfter, addDateBefore, }
    // const params = { checkType: "DAYCAL", checkNumber: '19', checkResult: 'E', facility, locations, active, reason, addDateAfter, addDateBefore, }
    const params = {
      checkType,
      checkNumber,
      checkResult,
      facility,
      locations,
      active,
      reasonCode,
      addDateAfter,
      addDateBefore,
    };
    setIsTableLoading(true);

    getErrorSuppressionRecords(params)
      .then(({ data }) => {
        data.forEach((d) => (d.selected = false));
        setTableData(data);
        setSelectedRows([]);
        assignAriaSortHandlersToDatatable()
        assignAriaLabelsToDataTableColumns()
      })
      .catch((err) => {
        console.log("error", err);
      })
      .finally(() => {
        setIsTableLoading(false);
      });
  };
  useEffect(() => {
    getTableData();
    return () => {
      setTableData([]);
      removeAriaSortHandlersFromDatatable()
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    checkType,
    checkNumber,
    checkResult,
    facility,
    locations,
    active,
    reasonCode,
    addDateAfter,
    addDateBefore,
  ]);

  const openViewModalHandler = useCallback(async (row, index, isCreate = false) => {
    const selectedData = { ...tableData[index] }


    selectedData.addDate = formatDateWithHoursMinutesSeconds(row.addDate)
    selectedData.updateDate = formatDateWithHoursMinutesSeconds(row.updateDate)
    selectedData.facNameAndId = `${row.facilityName} (${row.facilityId})`
    selectedData.status = row.active ? 'Active' : 'Inactive'
    selectedData.result = `${row.checkTypeCode}-${row.checkNumber}-${row.checkResultCode}`
    selectedData.criteria = "" + row.matchDataTypeCode + (row.matchDataValue ? ":" + row.matchDataValue : "")

    const mdmData = {}
    const prefilteredDataName = false
    const mainDropdownName = null
    const mainDropdownResult = []
    const hasMainDropdown = false;
    const prefilteredTotalName = null

    setSelectedViewModalData(
      modalViewData(
        selectedData,
        controlInputs,
        controlDatePickerInputs,
        isCreate,
        mdmData,
        prefilteredDataName ? mdmData[prefilteredDataName] : "",
        mainDropdownName,
        mainDropdownResult,
        hasMainDropdown,
        prefilteredTotalName,
        extraControlInputs
      )
    )
    setShowViewModal(true);
  }, [tableData])

  const getActions = useCallback((row, idx) => {
    return (
      <div>
        <input
          checked={row.selected}
          key={idx}
          data-testid={`select-cb-${idx}`}
          type="checkbox"
          className="usa-checkbox"
          aria-label={`select row for error suppression ${row.id}`}
          onChange={(e) => onRowSelection(row, e.target.checked)}
        />
        <Button
          type="button"
          epa-testid="btnView"
          id={`btnView-error-suppression-${row.id}`}
          className="cursor-pointer margin-left-2"
          aria-label={`view row for error suppression ${row.id}`}
          onClick={() => openViewModalHandler(row, idx)}
          outline
        >
          View
        </Button>
      </div>
    );
  }, [openViewModalHandler]);

  const onRowSelection = (row, checked) => {
    row.selected = checked;
    if (checked) {
      setSelectedRows((prev) => [...prev, row]);
    } else {
      setSelectedRows((prev) => prev.filter((r) => r.id !== row.id));
    }
  };

  const formatMatchTimeCriteriaCell = (row) => {
    let beginTime;
    let endTime;

    if (row.matchTimeTypeCode === null) {
      return "";
    }
    if (row.matchTimeTypeCode === "HISTIND") {
      return "Historical";
    }

    if (row.matchTimeTypeCode === "DATE") {
      if (row.matchTimeBeginValue)
        beginTime = formatDate(row.matchTimeBeginValue, "/");
      if (row.matchTimeEndValue) {
        endTime = formatDate(row.matchTimeEndValue, "/");
      }
    }

    if (row.matchTimeTypeCode === "HOUR") {
      if (row.matchTimeBeginValue) {
        const d = new Date(row.matchTimeBeginValue);
        beginTime = `${formatDate(
          row.matchTimeBeginValue,
          "/"
        )}  ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      }
      if (row.matchTimeEndValue) {
        const d = new Date(row.matchTimeEndValue);
        endTime = `${formatDate(
          row.matchTimeEndValue,
          "/"
        )}  ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      }
    }

    if (row.matchTimeTypeCode === "QUARTER") {
      if (row.matchTimeBeginValue) {
        const d = new Date(row.matchTimeBeginValue);
        beginTime = `${d.getFullYear()} Q${getQuarter(d, true)}`;
      }
      if (row.matchTimeEndValue) {
        const d = new Date(row.matchTimeEndValue);
        endTime = `${d.getFullYear()} Q${getQuarter(d, true)}`;
      }
    }

    if (!beginTime && !endTime) {
      return "";
    }

    return `${beginTime ?? ""} - ${endTime ?? ""}`;
  };

  const formatDateWithHoursMinutesSeconds = (dateString) => {

    if (!dateString)
      return "";

    const date = new Date(dateString);
    return `${formatDate(
      dateString,
      "/"
    )} ${date.getHours()}:${date.getMinutes()}:${date.getMinutes()}`;
  };

  const closeModal = () => {
    if (showAddModal) {
      const addBtn = document.getElementById("error-suppres-add-btn");
      addBtn?.focus();
    }
    setErrorMsgs([]);
    setShowAddModal(false);
    setShowCloneModal(false);
  };

  const columns = [
    {
      name: "Select",
      width: "150px",
      cell: (row, idx) => getActions(row, idx),
      sortable: true,
    },
    {
      name: "Severity",
      width: "200px",
      selector: (row) => row.severityCode,
      sortable: true,
    },
    {
      name: "Facility Name (ID)",
      width: "210px",
      selector: (row) =>
        (row.facilityName ? row.facilityName : "") +
        (row.orisCode ? " (" + row.orisCode + ")" : ""),
      sortable: true,
    },
    { name: "Locations", width: '200px', selector: (row) => row.locations, sortable: true },
    {
      name: "Match Data Criteria",
      width: "250px",
      selector: (row) =>
        "" +
        row.matchDataTypeCode +
        (row.matchDataValue ? ":" + row.matchDataValue : ""),
      sortable: true,
    },
    {
      name: "Match Time Criteria",
      width: "300px",
      selector: (row) => formatMatchTimeCriteriaCell(row),
      sortable: true,
    },
    {
      name: "Reason",
      width: "200px",
      maxWidth: "150px",
      selector: (row) => row.reasonCode,
      sortable: true,
    },
    {
      name: "Status",
      width: "150px",
      selector: (row) => (row.active ? "Active" : "Inactive"),
      sortable: true,
    },
    {
      name: "Note",
      width: "200px",
      maxWidth: "1000px",
      selector: (row) => row.note,
      sortable: true,
    },
    { name: "User", selector: (row) => row.userId, sortable: true, width: "150px" },
    {
      name: "Add Date & Hour",
      width: "200px",
      selector: (row) => formatDateWithHoursMinutesSeconds(row.addDate),
      sortable: true,
    },
    {
      name: "Update Date",
      width: "200px",
      selector: (row) => formatDateWithHoursMinutesSeconds(row.updateDate),
      sortable: true,
    },
    {
      name: "Record Id",
      width: "200px",
      selector: (row) => row.id,
      sortable: true,
    },
  ];

  return (
    <div>
      {showAddModal || showCloneModal ? (
        <AddErrorSupressionModal
          showAddModal={showAddModal || showCloneModal}
          values={showCloneModal ? selectedRows[0] : undefined}
          close={closeModal}
          isClone={showCloneModal}
          errorMsgs= {errorMsgs}
          setErrorMsgs={setErrorMsgs}
        />
      ) : null}
      {showDeactivateModal ? (
        <DeactivateNotificationModal
          showDeactivateModal={showDeactivateModal}
          close={() => setShowDeactivateModal(false)}
          selectedRowIds={selectedRows.map((r) => r.id)}
          refreshTable={getTableData}
        />
      ) : null}
      {showViewModal &&
        <Modal
          show={showViewModal}
          nonEditable={true}
          title={"Error Suppression"}
          exitBTN={"Close"}
          close={() => setShowViewModal(false)}
          showCancel
          showDarkBg
        >
          <ModalDetails
            data={selectedViewModalData}
            cols={3}
            viewOnly={true}
          />
        </Modal>
      }

      <div className="padding-left-0 margin-left-0 padding-right-0">
        <div className="grid-row row-width">
          <div className="grid-col-5">
            <span className="data-container-header">Add Suppression</span>
          </div>
          <div className="grid-col-2">
            <Button
              aria-label="Add"
              data-testid="es-add-btn"
              className="margin-left-1"
              onClick={() => setShowAddModal(true)}
              id="error-suppres-add-btn"
            >
              Add
            </Button>
          </div>
          <div className="grid-col-2">
            <Button
              aria-label="Clone"
              data-testid="es-clone-btn"
              disabled={selectedRows.length !== 1}
              onClick={() => {
                setShowCloneModal(true);
              }}
            >
              Clone
            </Button>
          </div>
          <div className="grid-col-2">
            <Button
              aria-label="Deactivate"
              data-testid="es-deactivate-btn"
              onClick={() => setShowDeactivateModal(true)}
              disabled={selectedRows.length === 0}
            >
              Deactivate
            </Button>
          </div>
        </div>
        <div className="es-datatable">
          {isTableLoading ? (
            <Preloader />
          ) : (
            <DataTable
              sortIcon={
                <ArrowDownwardSharp className="margin-left-2 text-primary" />
              }
              noHeader={true}
              fixedHeader={true}
              fixedHeaderScrollHeight="50vh"
              columns={columns}
              data={tableData}
              className={`data-display-table react-transition fade-in`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// fieldnames determined by selectedData passed to modalViewData in openViewModalHandler
// uses blank# control input for empty space padding
const controlInputs = {
  result: ["Result", "input", ""], // combination of checkTypeCode + checkNumber + checkResultCode
  severityCode: ["Severity", "input", ""],
  facNameAndId: ["Facility Name/ID", "input", ""],

  locations: ["Locations", "input", ""],
  criteria: ["Criteria", "input", ""],
  reasonCode: ["Reason", "input", ""],

  status: ["Status", "input", ""],
  blank1: [" ", "input", ""],
  blank2: [" ", "input", ""],

  userId: ["User", "input", ""],
  addDate: ["Add Date & Hour", "input", ""],
  updateDate: ["Update Date", "input", ""],
}

// put Note field into extraControlInputs so it expands full length of modal
const extraControlInputs = {
  note: ["Note", "input", ""],
}

const controlDatePickerInputs = {}
