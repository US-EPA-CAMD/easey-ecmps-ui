import React, { useCallback, useEffect, useState } from 'react';
import { ArrowDownwardSharp } from '@material-ui/icons';
import { Button, Checkbox } from '@trussworks/react-uswds';
import { Preloader } from '@us-epa-camd/easey-design-system';
import DataTable from 'react-data-table-component';
import {
  certEventsCols,
  testExtensionExemptionCols,
  testSummaryCols,
} from './QAMaintenanceDataColumns';
import { qaCertDataMaintenanceTitle } from '../../../utils/constants/moduleTitles';
import {
  certEventLabel,
  testExtensionExemptionLabel,
  testSummaryLabel,
} from '../FilterFormAdmin/FilterFormAdmin';
import { modalViewData } from '../../../additional-functions/create-modal-input-controls';
import Modal from '../../Modal/Modal';
import ModalDetails from '../../ModalDetails/ModalDetails';
import QAMaintenanceModalPopout, {
  QA_MAINTENANCE_MODAL_DELETE,
  QA_MAINTENANCE_MODAL_REQUIRE_RESUBMISSION,
} from './QAMaintenanceModalPopout';
import MultiSelectCombobox from "../../MultiSelectCombobox/MultiSelectCombobox";
import { getLocations } from "../../ErrorSuppression/ErrorSuppressionFilters/ErrorSuppressionFilters";

let controlInputs;

const QAMaintenanceData = ({
  data = [],
  isLoading = false,
  typeSelection, // string description of selected type
  selectedRows,
  setSelectedRows,
  setReloadTableData,
}) => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [disableActionBtns, setDisableActionBtns] = useState(true);

  const [selectedViewModalData, setSelectedViewModalData] = useState(null);

  const [currentUnitStack, setCurrentUnitStack] = useState([]);
  const [availableUnitStackState, setAvailableUnitStackState] = useState([]);

  const [currentTestTypeCode, setCurrentTestTypeCode] = useState([]);
  const [availableTestTypeCodeState, setAvailableTestTypeCodeState] = useState([]);

  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const downloadFilteredDataIntoCSV = () => {

    // Extract only the displayed columns
    let columnMapping = [];

    if (typeSelection === 'Test Summary') {
      columnMapping = {
        facilityName: "Facility Name/ID",
        unitStack: "Unit Stack",
        locationId: "MP Location",
        componentIdentifier: "System/Component ID",
        testTypeCode: "Test Type Code",
        yearQuarter: "Reporting Period",
        beginDateTime: "Begin Date/Time",
        endDateTime: "End Date/Time",
        submissionAvailabilityDescription: "Submission Availability Description",
        severityDescription: "Severity Description",
        resubExplanation: "Resubmission Reason",
        id: "Record Id"
      };
    } else if (typeSelection === 'Cert Events') {
      columnMapping = {
        facilityName: "Facility Name/ID",
        unitStack: "Unit Stack",
        locationId: "MP Location",
        componentIdentifier: "System/Component ID",
        certEventCode: "Cert Event Code",
        eventDateTime: "Event Date/Time",
        requiredTestCode: "Required Test Code",
        conditionalDateTime: "Conditional Date/Time",
        lastCompletedDateTime: "Last Completed Date Time",
        submissionAvailabilityDescription: "Submission Availability Description",
        severityDescription: "Severity Description",
        resubExplanation: "Resubmission Reason",
        id: "Record Id"
      };
    } else if (typeSelection === 'Test Extension Exemption') {
      columnMapping = {
        facilityName: "Facility Name/ID",
        unitStack: "Unit Stack",
        locationId: "MP Location",
        componentIdentifier: "System/Component ID",
        fuelCode: "Fuel Code",
        extensionExemptionCode: "Extension Exemption Code",
        hoursUsed: "Hours Used",
        spanScaleCode: "Span Scale Code",
        submissionAvailabilityDescription: "Submission Availability Description",
        severityDescription: "Severity Description",
        resubExplanation: "Resubmission Reason",
        id: "Record Id"
      };
    }
  
    const headers = Object.keys(columnMapping);
    const csvHeaders = headers.map(key => columnMapping[key]);
  
    // Convert data to CSV format
    const csvRows = filteredData.map(row =>
      headers.map(header => (row[header] !== null && row[header] !== undefined ? `"${row[header]}"` : '""')).join(',')
    );
  
    // Combine headers and data rows
    const csvString = [csvHeaders.join(','), ...csvRows].join('\n');
  
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Assemble file name
    const facilityName = filteredData[0].facilityName;
    let fileName = `QA/Cert_Data_Maintenance_${facilityName}_${typeSelection}_${new Date().toISOString().slice(0, 19)}.csv`
  
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
  
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // fetch and initialize options for lower grid filter(s)
  useEffect(() => {
    const fetchAndSetOptions = async () => {
      try {
        const orisCode = data[0]?.orisCode; //grab the orisCode from any record
  
        // fetch all the locations for the current facility
        const allLocations = await getLocations(orisCode, {
          locationTypeCode: "LOC",
        });
  
        setCurrentUnitStack(allLocations);
        setAvailableUnitStackState(allLocations);
  
        // populate the options for Test Type Code filter if needed
        if (typeSelection === "Test Summary") {
          //gather all the test type codes from the data table set
          const testTypeCodes = [...new Set(data.map(({ testTypeCode }) => testTypeCode))].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  
          const availTestTypeCode = testTypeCodes.map((testTypeCode) => ({
            id: testTypeCode,
            label: testTypeCode,
            selected: false,
            enabled: true,
          }));
  
          setCurrentTestTypeCode(availTestTypeCode);
          setAvailableTestTypeCodeState(availTestTypeCode);
        }
      } catch (error) {
        console.error("Error fetching locations or setting data:", error);
      }
    };
    fetchAndSetOptions();
  }, [data]);
  
  const unitStackFilterChange = (id, action) => {

    const objectEntry = currentUnitStack.find((item) => item.id === id);

    // mark the objectEntry as selected if the action is add, otherwise set the selected field false.
    objectEntry && (objectEntry.selected = action === "add");
  };

  const testTypeCodeFilterChange = (id, action) => {

    const objectEntry = currentTestTypeCode.find((item) => item.id === id);

    // mark the objectEntry as selected if the action is add, otherwise set the selected field false.
    objectEntry && (objectEntry.selected = action === "add");
  };

  const applyFilters = useCallback(() => {

    const selectedUnitStackLabels = currentUnitStack.filter(item => item.selected).map(item => item.label);

    let updatedFilteredData = data;

    if (selectedUnitStackLabels?.length !== 0) {
      updatedFilteredData = updatedFilteredData.filter((it) => 
        selectedUnitStackLabels.includes(it.unitStack)
      );
    } 
    
    if (typeSelection === 'Test Summary') {
      const selectedTestTypeCodeIds = currentTestTypeCode.filter(item => item.selected).map(item => item.id);
      if (selectedTestTypeCodeIds?.length !== 0) {
        updatedFilteredData = updatedFilteredData.filter((it) => 
          selectedTestTypeCodeIds.includes(it.testTypeCode)
        );
      }
    }

    setFilteredData(updatedFilteredData);
  }); 

  const openViewModalHandler = useCallback(
    async (row, isCreate = false) => {
      const selectedData = row
      const { systemIdentifier, componentIdentifier } = selectedData;

      selectedData.systemComponentID =
        systemIdentifier && componentIdentifier
          ? `${systemIdentifier}/${componentIdentifier}`
          : systemIdentifier
            ? systemIdentifier
            : componentIdentifier;

      const mdmData = {};
      const prefilteredDataName = false;
      const mainDropdownName = null;
      const mainDropdownResult = [];
      const hasMainDropdown = false;
      const prefilteredTotalName = null;
      const extraControls = false;

      setSelectedViewModalData(
        modalViewData(
          selectedData,
          controlInputs,
          controlDatePickerInputs,
          isCreate,
          mdmData,
          prefilteredDataName ? mdmData[prefilteredDataName] : '',
          mainDropdownName,
          mainDropdownResult,
          hasMainDropdown,
          prefilteredTotalName,
          extraControls,
        ),
      );
      setShowViewModal(true);
    },
    []
  );

  const onRowSelection = (row, checked) => {
    row.selected = checked;
    if (checked) {
      setSelectedRows(prev => [...prev, row]);
    } else {
      const currSelectedRows = selectedRows.filter((r) => r.id !== row.id);
      setSelectedRows(currSelectedRows);
    }
  };

  useEffect(() => {
    if (selectedRows.length > 0) {
      setDisableActionBtns(false);
    } else {
      setDisableActionBtns(true);
    }
  }, [selectedRows]);

  // modal state has form {isOpen: boolean, action: string}
  const [modalState, setModalState] = useState({ isOpen: false, action: null });

  // handle loading
  if (isLoading) {
    return <Preloader />;
  }

  const baseStaticCols = [
    {
      name: <span>{'Select'}</span>,
      width: '95px',
      cell: (row, idx) => (
        <div>
          <Checkbox
            data-testid={`select-cb-${idx}`}
            className="margin-bottom-5"
            aria-label={`select row for QA/Cert Maintainance record with id ${row.id}`}
            id={idx}
            key={idx}
            onChange={e => {
              onRowSelection(row, e.target.checked);
            }}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                event.target.checked = !event.target.checked;
              }
            }}
            defaultChecked={row.selected}
          />
        </div>
      ),
    },
    {
      name: '',
      width: '135px',
      cell: (row, idx) => (
        <div>
          <Button
            className=" usa-button usa-button--outline"
            onClick={() => openViewModalHandler(row, idx, false)}
            aria-label={`view row for QA/Cert Maintainance record with id ${row.id}`}
          >
            View
          </Button>
        </div>
      ),
    },
    {
      name: <span>{'Facility Name/ID'}</span>,
      width: '210px',
      selector: row => row.facilityName,

      sortable: true,
    },
    {
      name: <span>{'MP Location'}</span>,
      width: '200px',
      selector: row => row.locationId,
      sortable: true,
    },
  ];

  let columns;
  let commonBeginProps = {
    facilityName: ['Facility Name/ID', 'input', ''],
    locationId: ['MP Location(s)', 'input', ''],
    unitStack: ['Unit/StackPipe ID', 'input', ''],
    systemComponentID: ['System/Component ID', 'input', ''],
  };

  let commonEndProps = {
    submissionAvailabilityDescription: [
      'Submission Availability Description',
      'input',
      '',
    ],
    severityDescription: ['Severity Description', 'input', ''],
    resubExplanation: ['Resubmission Reason', 'input', ''],
    id: ['ID', 'input', ''],
  };

  switch (typeSelection) {
    case testSummaryLabel:
      columns = baseStaticCols.concat(testSummaryCols);
      controlInputs = {
        ...commonBeginProps,
        testNumber: ['Test Number', 'input', ''],
        testTypeCode: ['Test Type Code', 'input', ''],
        yearQuarter: ['Reporting Period', 'input', ''],
        beginDateTime: ['Begin Date / Time', 'input', ''],
        endDateTime: ['End Date / Time', 'input', ''],
        ...commonEndProps,
      };
      break;
    case certEventLabel:
      columns = baseStaticCols.concat(certEventsCols);
      controlInputs = {
        ...commonBeginProps,
        certEventCode: ['Cert Event Code', 'input', ''],
        eventDateTime: ['Event Date / Time', 'input', ''],
        requiredTestCode: ['Required Test Code', 'input', ''],
        conditionalDateTime: ['Conditional Date / Time', 'input', ''],
        lastCompletedDateTime: ['Last Completed Date / Time', 'input', ''],
        ...commonEndProps,
      };
      break;
    case testExtensionExemptionLabel:
      columns = baseStaticCols.concat(testExtensionExemptionCols);
      controlInputs = {
        ...commonBeginProps,
        fuelCode: ['Fuel Code', 'input', ''],
        extensionExemptionCode: ['Extension Exemption Code', 'input', ''],
        hoursUsed: ['Hours Used', 'input', ''],
        spanScaleCode: ['Span Scale Code', 'input', ''],
        skip: ['', 'skip', '', ''],
        ...commonEndProps,
      };
      break;
    default:
      return;
  }

  const closeModalHandler = () => {
    setModalState({ isOpen: false, type: null });
  };

  return (
    <div>
      {modalState.isOpen === true ? (
        <QAMaintenanceModalPopout
          closeModalHandler={closeModalHandler}
          action={modalState.action}
          typeSelection={typeSelection}
          selectedRows={selectedRows}
          setReloadTableData={setReloadTableData}
        />
      ) : null}
      <div className="padding-left-0 margin-left-0 padding-right-0">
        <div className="grid-row row-width">
          <div className="grid-col-3">
            <span className="data-container-header">
              {qaCertDataMaintenanceTitle}
            </span>
          </div>
          <div className="grid-col-8">
            <div className="grid-row margin-top-2">
              <div className="grid-col-5">
                <Button
                  aria-label="Require Resubmission"
                  data-testid="es-require-resubmission"
                  className="usa-button"
                  onClick={() => {
                    window.openModalBtn = document.activeElement;
                    setModalState({
                      isOpen: true,
                      action: QA_MAINTENANCE_MODAL_REQUIRE_RESUBMISSION,
                    });
                  }}
                  disabled={disableActionBtns}
                  id="qa-update-submission-btn"
                >
                  Require Resubmission
                </Button>
              </div>
              <div className="grid-col-3">
                <Button
                  aria-label="Delete"
                  data-testid="es-delete"
                  className="usa-button usa-button--outline"
                  onClick={() => {
                    window.openModalBtn = document.activeElement;
                    setModalState({
                      isOpen: true,
                      action: QA_MAINTENANCE_MODAL_DELETE,
                    });
                  }}
                  disabled={disableActionBtns}
                  id="qa-delete-btn"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid-row row-width" style={{ display: 'flex' }}>
          <div className="grid-col-6">
            <div className="grid-col-8" >
              <MultiSelectCombobox
                data-testid="unitStack-dropdown"
                key={`unitStack-${availableUnitStackState.length}`}
                items={currentUnitStack}
                entity={"unit stack"}
                label={"Unit Stack"}
                searchBy="contains"
                onChangeUpdate={unitStackFilterChange}
                autoFocus={false}
                iconAlignRight={3}
              />
            </div>
          </div>
          {typeSelection === 'Test Summary' && (
            <>
              <div className="grid-col-6">
                <div className="grid-col-8">
                  <MultiSelectCombobox
                    data-testid="testTypeCode-dropdown"
                    key={`testTypeCode-${availableTestTypeCodeState.length}`}
                    items={currentTestTypeCode}
                    entity={"test type code"}
                    label={"Test Type Code"}
                    searchBy="contains"
                    onChangeUpdate={testTypeCodeFilterChange}
                    autoFocus={false}
                    iconAlignRight={3}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <br/>
        <div className="grid-row row-width" style={{ display: 'flex' }}>
          <div className="grid-col-6"></div>
          <div className="grid-col-6">
            <div className="grid-col-8" style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
        <div className="es-datatable margin-top-5">
          <div className="grid-row" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="button"
              data-testid={`qa-maintenance-download-csv-button`}
              title={"Download To CSV"}
              onClick={downloadFilteredDataIntoCSV}
              disabled={!filteredData || filteredData.length === 0}
            >
              {"Download To CSV"}
            </Button>
          </div>
          <span data-aria-label={'QA/Cert Data Maintenance'}></span>
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
        </div>
      </div>
      {showViewModal && (
        <Modal
          width="55%"
          title={`QA/Cert Data Maintenance `}
          show={showViewModal}
          close={() => setShowViewModal(false)}
          showDarkBg
          showCancel
        >
          <ModalDetails
            data={selectedViewModalData}
            cols={3}
            viewOnly={true}
          />
        </Modal>
      )}
    </div>
  );
};

export default QAMaintenanceData;

const controlDatePickerInputs = {};
