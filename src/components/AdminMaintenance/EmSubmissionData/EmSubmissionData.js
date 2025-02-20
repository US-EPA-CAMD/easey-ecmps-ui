import React, { useCallback, useState, useEffect } from "react";
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
import { returnsFocusDatatableViewBTN } from "../../../additional-functions/ensure-508";
import MultiSelectCombobox from "../../MultiSelectCombobox/MultiSelectCombobox";
import { getMonitoringPlans } from "../../../utils/api/monitoringPlansApi";
import { exportToCSV } from "../../../utils/functions";

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
  const [selectedRowId, setSelectedRowId] = useState(null);
  // This array contains the rows that are selected in the table. Use this to do logic to disable/enable buttons
  //   const [selectedRows, setSelectedRows] = useState([]);

  const [selectedModalData, setSelectedModalData] = useState(null);

  const [disableApproveBtn, setDisableApproveBtn] = useState(false);

  // lower grid filters related

  const [currentFacility, setCurrentFacility] = useState([]);
  const [availableFacilityState, setAvailableFacilityState] = useState([]);

  const [currentConfiguration, setCurrentConfiguration] = useState([]);
  const [availableConfigurationState, setAvailableConfigurationState] = useState([]);
  
  const [currentStatus, setCurrentStatus] = useState([]);
  const [availableStatusState, setAvailableStatusState] = useState([]);

  const [currentReportingPeriod, setCurrentReportingPeriod] = useState([]);
  const [availableReportingPeriodState, setAvailableReportingPeriodState] = useState([]);

  // all the available statuses
  const [availStatus] = useState([
    { code: "Open", name: "Open" },
    { code: "Closed", name: "Closed" },
    { code: "Pending", name: "Pending Approval" },
    { code: "Cancelled", name: "Cancelled" },
    { code: "No_Window", name: "No Window" },
    { code: "Not_Yet_Open", name: "Not Yet Open" },
  ]);

  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const downloadFilteredDataIntoCSV = () => {

    // Extract only the displayed columns
    let columnMapping = {
      facilityName: "Facility Name/ID",
      orisCode: "Oris Code",
      locations: "Configuration",
      reportingPeriodAbbreviation: "Reporting Period",
      reportingFrequencyCode: "Reporting Frequency",
      submissionTypeCode: "Submission Type",
      status: "Status",
      openDate: "Open Date",
      closeDate: "Close Date",
      emissionStatusCode: "Emission Status",
      submissionAvailabilityCode: "Submission Availability",
      lastSubmissionId: "Last Submission ID",
      severityLevel: "Severity Level",
      id: "Record Id"
    };

    const facilityName = filteredData[0].facilityName;
    const orisCode = filteredData[0].orisCode
    const reportingPeriod = filteredData[0].reportingPeriodAbbreviation
  
    exportToCSV(filteredData, columnMapping, `EM_Submission_Access_${facilityName}(${orisCode})_${reportingPeriod}`)
    
  };

  // fetch and initialize options for lower grid filter(s)
  useEffect(() => {

    // reset facility filter
    const facilityList = Array.from(
      data.reduce((map, { facilityName, orisCode }) => {
        const id = parseInt(orisCode, 10); 
        if (!map.has(id)) {
          map.set(id, { label: `${facilityName} (${orisCode})`, id });
        }
        return map;
      }, new Map()).values() 
    ).sort((a, b) => a.id - b.id); 
    
    const availFacility = [];
    for (const fac of facilityList) {
      availFacility.push({
        id: fac.id,
        label: fac.label,
        selected: false,
        enabled: true,
      });
    }

    setCurrentFacility(availFacility);
    setAvailableFacilityState(availFacility);

    // reset configuration filter
    setCurrentConfiguration([]);
    setAvailableConfigurationState([]);

    // reset reporting period filter
    const reportingPeriodList = reportingPeriods?.map(item => item.periodAbbreviation) || [];
    const availReportingPeriod = [];
    for (const rp of reportingPeriodList) {
      availReportingPeriod.push({
        id: rp,
        label: rp,
        selected: false,
        enabled: true,
      });
    }

    setCurrentReportingPeriod(availReportingPeriod);
    setAvailableReportingPeriodState(availReportingPeriod);

    //reset status filter
    const statusList = [];
    for (const as of availStatus) {
      statusList.push({
        id: as.name,
        label: as.name,
        selected: false,
        enabled: true,
      });
    }

    setCurrentStatus(statusList)
    setAvailableStatusState(statusList) 

  }, [data, availStatus, reportingPeriods]);

  async function facilityFilterChange(id, action) {

    id = id.toString();

    const objectEntry = currentFacility.find((item) => item.id === id);
    objectEntry && (objectEntry.selected = action === "add");

    // initialize the options for configuration filter
    const selectedOrisCodes = currentFacility.filter(item => item.selected).map(item => item.id);

    const configurationData = selectedOrisCodes.length
      ? (await getMonitoringPlans(selectedOrisCodes)).data
      : [];

    const configNamesToMonPlan = [];
    for (const cd of configurationData) {
      if (cd.active) {
        const key = `${cd.facilityName} - ${cd.name}`;
        if (!configNamesToMonPlan[key]) {
          configNamesToMonPlan[key] = cd.id;
        }
      }
    }

    const availConfigs = [];
    for (const [name, monPlanId] of Object.entries(configNamesToMonPlan)) {
      //Remove existing configurations that not longer have a monitor plan associated, or keep current ones selected
      const existingEntry = currentConfiguration.filter((item) => {
        return item.selected && item.label === name;
      });
      let selected = false;
      if (existingEntry.length > 0) {
        selected = true;
      }
      availConfigs.push({
        id: name,
        label: name,
        selected: selected,
        enabled: true,
        monPlanId: monPlanId,
      });
    }

    setCurrentConfiguration(availConfigs);
    setAvailableConfigurationState(availConfigs);
  };

  //the selected facility/facilities will deternmine the avaliable configs to select
  const configurationFilterChange = (id, action) => {
    const objectEntry = currentConfiguration.find((item) => item.id === id);
    objectEntry && (objectEntry.selected = action === "add");
  };

  const statusFilterChange = (id, action) => {
    const objectEntry = currentStatus.find((item) => item.id === id);
    objectEntry && (objectEntry.selected = action === "add");
  };

  const reportingPeriodFilterChange = (id, action) => {
    const objectEntry = currentReportingPeriod.find((item) => item.id === id);
    objectEntry && (objectEntry.selected = action === "add");
  };

  const applyFilters = useCallback(() => {

    //get all the selected fac/config
    const selectedFacilities = currentFacility.filter(item => item.selected).map(item => item.id);
    const selectedConfigurations = currentConfiguration.filter(item => item.selected).map(item => item.monPlanId);

    //get all the selected reporting period
    const selectedReportingPeriodIds = currentReportingPeriod.filter(item => item.selected).map(item => item.id);

    //get all the selected status/statuses
    const selectedStatusIds = currentStatus.filter(item => item.selected).map(item => item.id.toLowerCase());

    //each time we filter data, it's a new filter based on the passed-in data set, NOT previous filtered data
    let updatedFilteredData = data

    if (selectedConfigurations?.length !== 0) {
      updatedFilteredData = updatedFilteredData.filter((it) => 
        selectedConfigurations.includes(it.monitorPlanId) 
      );
    } else if (selectedFacilities?.length !== 0){
      updatedFilteredData = updatedFilteredData.filter((it) => 
        selectedFacilities.includes(it.orisCode) 
      );
    }

    //filter for the selected reporting period
    if (selectedReportingPeriodIds?.length !== 0) {
      updatedFilteredData = updatedFilteredData.filter((it) => 
        selectedReportingPeriodIds.includes(it.reportingPeriodAbbreviation) 
      );
    }
      
    //filter for the selected status
    if (selectedStatusIds?.length !== 0) {
      updatedFilteredData = updatedFilteredData.filter((it) => 
        selectedStatusIds.includes(it.status.toLowerCase()) // Use some to match unitStack
      );
    }

    setFilteredData(updatedFilteredData);
  }, [data, filteredData, currentFacility, currentConfiguration, currentReportingPeriod, currentStatus]);


  const openViewEditModalHandler = useCallback(
    (row, index, isCreate = false) => {
      const selectedData = row;
      const { facilityName, facilityId } = selectedData;
      selectedData.facilityNameAndId = `${facilityName} (${facilityId})`;

      const mdmData = {};
      const prefilteredDataName = false;
      const mainDropdownName = null;
      const mainDropdownResult = [];
      const hasMainDropdown = false;
      const prefilteredTotalName = null;
      const extraControls = false;
      setSelectedRowId(row.id);

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
      );
      setShowViewEditModal(true);
    },
    []
  );

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
    return list.some((row) => row.status === closedTxt);
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
            aria-label={`select row for EM Submission Access record with id ${row.id}`}
            id={idx}
            key={idx}
            onChange={(e) => {
              onRowSelection(row, e.target.checked);
            }}
            onKeyUp={(event) => {
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
            id={`btnView-em-submission-${row.id}`}
            aria-label={`view row for EM Submission Access record with id ${row.id}`}
          >
            View
          </Button>
        </div>
      ),
    },
    {
      name: "Facility Name/ID",
      width: "210px",
      selector: (row) => `${row.facilityName} (${row.orisCode})`,
      sortable: true,
    },
    {
      name: "Configuration",
      width: "210px",
      selector: (row) => row.locations,
      sortable: true,
    },
    {
      name: "Reporting Period",
      width: "210px",
      selector: (row) => row.reportingPeriodAbbreviation,
      sortable: true,
    },
    {
      name: "Reporting Frequency",
      width: "230px",
      selector: (row) => row.reportingFrequencyCode,
      sortable: true,
    },
    {
      name: "Submission Type",
      width: "150px",
      selector: (row) => row.submissionTypeCode,
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
    {
      name: "Record Id",
      width: "160px",
      selector: (row) => row.id,
      sortable: true,
    },
  ];

  const closeModal = () => {

    if (showOpenModal) {
      const openBtn = document.getElementById("em-submission-open-btn");
      openBtn?.focus();
    } else if (showExtendModal) {
      const extendBtn = document.getElementById("em-submission-extend-btn");
      extendBtn?.focus();
    } else if (showCloseModal) {
      const closeBtn = document.getElementById(
        "em-submission-close-btn"
      );
      closeBtn?.focus();
    } else if (showApproveModal) {
      const approveBtn = document.getElementById(
        "em-submission-approve-btn"
      );
      approveBtn?.focus();
    } else if (showViewEditModal) {
      returnsFocusDatatableViewBTN("-em-submission-", selectedRowId, true);
    } 
    setShowOpenModal(false);
    setShowExtendModal(false);
    setShowCloseModal(false);
    setShowApproveModal(false);
    setShowViewEditModal(false);
  };

  return (
    <div>
      {(showOpenModal ||
        showExtendModal ||
        showCloseModal ||
        showApproveModal) && (
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
        )}
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
                    setShowOpenModal(true);
                  }}
                  id="em-submission-open-btn"
                  disabled={
                    data.length === 0 
                    || selectedRows.length !== 1 //we can only submit the open request for one record at a time
                    || selectedRows.some(row => row.status !== 'CLOSED' && row.status !== 'NO WINDOW')
                    || !selectedRows[0]?.isLatestRecord
                  } 
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
                  id="em-submission-extend-btn"
                  disabled={
                    data.length === 0 
                    || disableApproveBtn 
                    || selectedRows.length === 0 
                    || selectedRows.some(row => row.status !== 'OPEN')
                    || selectedRows.some(row => row.isLatestRecord === false)
                  } 
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
                  id="em-submission-close-btn"
                  disabled={
                    data.length === 0 
                    || selectedRows.length === 0 
                    || selectedRows.some(row => row.status !== 'OPEN')
                    || selectedRows.some(row => row.isLatestRecord === false)
                  }
                >
                  Cancel
                </Button>
              </div>
              <div className="grid-col-3">
                <Button
                  aria-label="Deactivate"
                  data-testid="es-deactivate"
                  className="usa-button usa-button--outline"
                  onClick={() => setShowApproveModal(true)}
                  id="em-submission-approve-btn"
                  disabled={
                    data.length === 0 
                    || disableApproveBtn 
                    || selectedRows.length === 0 
                    || selectedRows.some(row => row.status !== 'PENDING' && row.status !== 'CANCELLED')
                    || selectedRows.some(row => row.isLatestRecord === false)
                  }
                >
                  Approve
                </Button>
              </div>
            </div>
          </div>
        </div>
        <br/>
        {data?.length !== 0 && (
          <>
            <div className="grid-row row-width" style={{ display: 'flex' }}>
              <div className="grid-col-6">
                <div className="grid-col-8">
                  <MultiSelectCombobox
                    data-testid="facility-dropdown"
                    key={`facility-${availableFacilityState.length}`}
                    items={currentFacility}
                    entity={"facility"}
                    label={"Facility"}
                    searchBy="contains"
                    onChangeUpdate={facilityFilterChange}
                    autoFocus={false}
                    iconAlignRight={3}
                  />
                </div>
              </div>
              <div className="grid-col-6">
                <div className="grid-col-8" >
                  <MultiSelectCombobox
                    data-testid="configuration-dropdown"
                    key={`configuration-${availableConfigurationState.length}`}
                    items={currentConfiguration}
                    entity={"configuration"}
                    label={"Configuration"}
                    searchBy="contains"
                    onChangeUpdate={configurationFilterChange}
                    autoFocus={false}
                    iconAlignRight={3}
                  />
                </div>
              </div>
            </div>
            <div className="grid-row row-width" style={{ display: 'flex' }}>
              <div className="grid-col-6">
                <div className="grid-col-8">
                <MultiSelectCombobox
                  data-testid="reportingPeriod-dropdown"
                  key={`reportingPeriod-${availableReportingPeriodState.length}`}
                  items={currentReportingPeriod.slice().reverse()}
                  entity={"reporting period"}
                  label={"Reporting Period"}
                  searchBy="contains"
                  onChangeUpdate={reportingPeriodFilterChange}
                  autoFocus={false}
                  iconAlignRight={3}
                />
                </div>
              </div>
              <div className="grid-col-6">
                <div className="grid-col-8" >
                <MultiSelectCombobox
                  data-testid="status-dropdown"
                  key={`status-${availableStatusState.length}`}
                  items={currentStatus}
                  entity={"status"}
                  label={"Status"}
                  searchBy="contains"
                  onChangeUpdate={statusFilterChange}
                  autoFocus={false}
                  iconAlignRight={3}
                />
                </div>
              </div>
            </div>
            <div className="grid-row row-width" style={{ display: 'flex' }}>
              <div className="grid-col-6"></div>
              <div className="grid-col-6">
                <div className="grid-col-8 margin-top-2" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                      disabled={ false}
                      onClick={applyFilters}
                      outline={false}
                    >
                      Apply Filter(s)
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="es-datatable margin-top-5">
          <div className="grid-row" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="button"
                  data-testid={`em-submission-download-csv-button`}
                  title={"Download To CSV"}
                  onClick={downloadFilteredDataIntoCSV}
                  disabled={!filteredData || filteredData.length === 0}
                >
                  {"Download To CSV"}
                </Button>
            </div>
          <span data-aria-label={"Maintain EM Submission Access"}></span>
          {isLoading && <Preloader />}
          {!isLoading && (
            <DataTable
              sortIcon={
                <ArrowDownwardSharp className="margin-left-2 text-primary" />
              }
              noHeader={true}
              fixedHeader={false}
              columns={columns}
              data={filteredData}
              className={`data-display-table react-transition fade-in`}
              pagination={true}
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 25, 50]}
            />
          )}
        </div>
        {showViewEditModal && (
          <Modal
            title={"Maintain EM Submission Access"}
            show={showViewEditModal}
            close={closeModal}
            showDarkBg
            showCancel
          >
            <ModalDetails
              data={selectedModalData}
              cols={3}
              title="Maintain EM Submission Access"
              viewOnly={true}
            // create={createNewData}
            />
          </Modal>
        )}
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
};

const controlDatePickerInputs = {};
