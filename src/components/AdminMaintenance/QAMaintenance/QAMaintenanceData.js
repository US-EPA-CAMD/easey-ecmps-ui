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
  const [modalDataSelections, setModalDataSelections] = useState(null);

  const openViewModalHandler = useCallback(
    async (row, index, isCreate = false) => {
      const selectedData = data[index];
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
    [data],
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
      name: <span>{'Facility Name / ID'}</span>,
      width: '210px',
      selector: row => row.facilityName,

      sortable: true,
    },
    {
      name: <span>{'MP Location'}'</span>,
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
        <div className="es-datatable margin-top-5">
          <span data-aria-label={'QA/Cert Data Maintenance'}></span>
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
            modalData={modalDataSelections}
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
