import React, { useCallback, useState } from "react";
import DataTable from "react-data-table-component";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { Button, Checkbox } from "@trussworks/react-uswds";
import { ArrowDownwardSharp } from "@material-ui/icons";
import { submissionAccessTitle } from "../../../utils/constants/moduleTitles";
import { EmSubmissionModal } from "../EmSubmissionPopOut/EmSubmissionPopout";
import "./EmSubmissionData.scss";
import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";


export const EmSubmissionData = ({
  data = [],
  isLoading = false,
  setReloadTableData,
  selectedRows,
  setSelectedRows,
  reportingPeriods,
}) => {
  const closedTxt = "CLOSED";
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showViewEditModal, setShowViewEditModal] = useState(false);
  // This array contains the rows that are selected in the table. Use this to do logic to disable/enable buttons
  //   const [selectedRows, setSelectedRows] = useState([]);

  const [selectedModalData, setSelectedModalData] = useState(null);
  const [modalDataSelections, setModalDataSelections] = useState(null)

  const [disableApproveBtn, setDisableApproveBtn] = useState(false);
  const [disableOpenBtn, setDisableOpenBtn] = useState(false);


  const openViewEditModalHandler = useCallback((row, index, isCreate = false) => {
    const selectedData = data[index]
    const { facilityName, facilityId } = selectedData
    selectedData.facilityNameAndId = `${facilityName} (${facilityId})`

    const mdmData = {}
    const prefilteredDataName = false
    const mainDropdownName = null
    const mainDropdownResult = []
    const hasMainDropdown = false;
    const prefilteredTotalName = null
    const extraControls = false

    setSelectedModalData(
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
        extraControls
      )
    )
    setShowViewEditModal(true);
  }, [data])

  const onRowSelection = (row, checked) => {
    row.selected = checked;
    if (checked) {
      if (row.status === closedTxt) {
        setDisableApproveBtn(true);
      }

      setSelectedRows((prev) => [...prev, row]);
    } else {
      const currSelectedRows = selectedRows.filter((r) => r.id !== row.id);
      setDisableApproveBtn(checkClosedStatus(currSelectedRows));
      setSelectedRows(currSelectedRows);
    }
  };

  // returns true if any row in list has status of closed
  const checkClosedStatus = (list) => {
    return list.some(row => row.status === closedTxt)
  };

  const columns = [
    {
      name: "Select",
      width: "95px",
      cell: (row, idx) => (
        <div>
          <Checkbox
            data-testid={`select-cb-${idx}`}
            className="margin-bottom-5"
            id={idx}
            key={idx}
            onChange={(e) => {
              onRowSelection(row, e.target.checked);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                onRowSelection(row, !event.target.checked);
                event.target.checked = !event.target.checked;
              }
            }}
            defaultChecked={row.selected}
          />
        </div>
      ),
    },
    {
      name: "",
      width: "135px",
      cell: (row, idx) => (
        <div>
          <Button
            className=" usa-button usa-button--outline"
            onClick={() => openViewEditModalHandler(row, idx, false)}
          >
            View
          </Button>
        </div>
      ),
    },
    {
      name: "Facility Name / ID",
      width: "210px",
      // facilityName isn't in api response and will have to be added
      selector: (row) =>
        row.facilityName
          ? `${row.facilityName} (${row.orisCode})`
          : row.orisCode,
      sortable: true,
    },
    {
      name: "State",
      width: "150px",
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: "MP Location(s)",
      width: "200px",
      selector: (row) => row.locations,
      sortable: true,
    },
    {
      name: "Reporting Period",
      width: "210px",
      // We need to add reporting period to the api response.
      selector: (row) => row.reportingPeriodAbbreviation,
      sortable: true,
    },
    {
      name: "Reporting Frequency",
      width: "230px",
      // We need to add reporting period to the api response.
      selector: (row) => row.reportingFrequencyCode,
      sortable: true,
    },
    {
      name: "Status",
      width: "150px",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Open Date",
      width: "200px",
      selector: (row) => row.openDate,
      sortable: true,
    },
    {
      name: "Close Date",
      width: "200px",
      selector: (row) => row.closeDate,
      sortable: true,
    },
    {
      name: "Emission Status",
      width: "200px",
      selector: (row) => row.emissionStatusCode,
      sortable: true,
    },
    {
      name: "Submission Availability",
      width: "250px",
      selector: (row) => row.submissionAvailabilityCode,
      sortable: true,
    },
    {
      name: "Last Submission ID",
      width: "220px",
      selector: (row) => row.lastSubmissionId,
      sortable: true,
    },
    {
      name: "Severity Level",
      width: "200px",
      selector: (row) => row.severityLevel,
      sortable: true,
    },
  ];

  const closeModal = () => {
    setShowOpenModal(false);
    setShowExtendModal(false);
    setShowCloseModal(false);
    setShowApproveModal(false);
    setShowViewEditModal(false);
  };

  return (
    <div>
      {(showOpenModal || showExtendModal || showCloseModal || showApproveModal) &&
        <EmSubmissionModal
          showModal={
            showOpenModal ||
            showExtendModal ||
            showCloseModal ||
            showApproveModal
          }
          close={closeModal}
          isOpenModal={showOpenModal}
          isExtendModal={showExtendModal}
          isCloseModal={showCloseModal}
          isApproveModal={showApproveModal}
          selectedRows={selectedRows}
          setReloadTableData={setReloadTableData}
          reportingPeriods={reportingPeriods}
        />
      }
      <div className="padding-left-0 margin-left-0 padding-right-0">
        <div className="grid-row row-width">
          <div className="grid-col-4">
            <span className="data-container-header">
              {submissionAccessTitle}
            </span>
          </div>
          <div className="grid-col-8">
            <div className="grid-row margin-left-3 margin-top-2">
              <div className="grid-col-3">
                <Button
                  aria-label="Add"
                  data-testid="es-add"
                  className="usa-button usa-button--outline"
                  onClick={() => {
                    if (selectedRows.length === 1) {
                      setShowOpenModal(true);
                    }
                  }}
                  disabled={selectedRows.length !== 1}
                >
                  Open
                </Button>
              </div>
              <div className="grid-col-3">
                <Button
                  aria-label="Clone"
                  data-testid="es-clone"
                  className="usa-button usa-button--outline"
                  onClick={() => setShowExtendModal(true)}
                  disabled={disableApproveBtn || selectedRows.length === 0}
                >
                  Extend
                </Button>
              </div>
              <div className="grid-col-3">
                <Button
                  aria-label="Deactivate"
                  data-testid="es-deactivate"
                  className="usa-button usa-button--outline"
                  onClick={() => setShowCloseModal(true)}
                  disabled={selectedRows.length === 0}
                >
                  Close
                </Button>
              </div>
              <div className="grid-col-3">
                <Button
                  aria-label="Deactivate"
                  data-testid="es-deactivate"
                  disabled={disableApproveBtn || selectedRows.length === 0}
                  className="usa-button usa-button--outline"
                  onClick={() => setShowApproveModal(true)}
                >
                  Approve
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="es-datatable margin-top-5">
          {isLoading && <Preloader />}
          {!isLoading &&
            <DataTable
              sortIcon={
                <ArrowDownwardSharp className="margin-left-2 text-primary" />
              }
              noHeader={true}
              fixedHeader={true}
              fixedHeaderScrollHeight="50vh"
              columns={columns}
              data={data}
              className={`data-display-table react-transition fade-in`}
            />
          }
        </div>
        {showViewEditModal &&
          <Modal
            title={"Maintain EM Submission Access"}
            show={showViewEditModal}
            close={closeModal}
            showDarkBg
            showCancel
          >
            <ModalDetails
              modalData={modalDataSelections}
              data={selectedModalData}
              cols={3}
              title="Maintain EM Submission Access"
              viewOnly={true}
            // create={createNewData}
            />
          </Modal>
        }
      </div>
    </div>
  );
};

const controlInputs = {
  facilityNameAndId: ["Facility Name/ID", "input", ""],
  state: ["State", "input", ""],
  locations: ["MP Location(s)", "input", ""],
  reportingPeriodAbbreviation: ["Reporting Period", "input", ""],
  reportingFrequencyCode: ["Reporting Frequency", "input", ""],
  status: ["Status", "input", ""],
  openDate: ["Open Date", "date", ""],
  closeDate: ["Close Date", "date", ""],
  emissionStatusCode: ["Emission Status", "input", ""],
  submissionAvailabilityCode: ["Submission Availability", "input", ""],
  lastSubmissionId: ["Last Submission ID", "input", ""],
  submissionTypeDescription: ["Submission Type", "input", ""],
  severityLevel: ["Severity Level", "input", ""],
}

const controlDatePickerInputs = {}
