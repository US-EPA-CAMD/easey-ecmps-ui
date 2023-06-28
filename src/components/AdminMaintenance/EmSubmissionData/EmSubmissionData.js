import React, { useCallback, useState } from 'react';
import DataTable from "react-data-table-component";
import { Preloader } from '@us-epa-camd/easey-design-system';
import { Button } from '@trussworks/react-uswds';
import { ArrowDownwardSharp } from '@material-ui/icons';
import { submissionAccessTitle } from '../../../utils/constants/moduleTitles';
import { EmSubmissionModal } from '../EmSubmissionPopOut/EmSubmissionPopout'
import "./EmSubmissionData.scss";
import Modal from '../../Modal/Modal';
import ModalDetails from '../../ModalDetails/ModalDetails';
import { modalViewData } from '../../../additional-functions/create-modal-input-controls';

export const EmSubmissionData = ({
    data = [],
    isLoading = false,
    currentFilters, // current set of filters chosen by the filter compopnent. Use to make api calls to refresh table. Remove if table refresh isn't required
}) => {

    const [showOpenModal, setShowOpenModal] = useState(false);
    const [showExtendModal, setShowExtendModal] = useState(false);
    const [showCloseModal, setShowCloseModal] = useState(false);
    const [showApproveModal, setShowApproveModal] = useState(false);
    // This array contains the rows that are selected in the table. Use this to do logic to disable/enable buttons
    const [selectedRows, setSelectedRows] = useState([]);

    const [selectedModalData, setSelectedModalData] = useState(null);
    const [selectedRowData, setSelectedRowData] = useState(null)

    // TODO, temp remove later
    // check out qa expandable rows render to see how modals and view buttons are displayed
    // maybe make a E
    // qa expandabla rows uses qa data table render which has cell: (row, index) => return element to render
    data = [
        {
            emissionStatusCode: "emissionStatusCode",
            submissionAvailabilityCode: "submissionAvailabilityCode",
            resubExplanation: "resubExplanation",
            closeDate: "2023-06-28T14:17:05.648Z",
            openDate: "2023-06-28T14:17:05.648Z",
            monitorPlanId: "monitorPlanId",
            reportingPeriodId: 1,
            id: 2,
            facilityId: 3,
            orisCode: 4,
            state: "state",
            locations: "locations",
            reportingFrequencyCode: "reportingFrequencyCode",
            submissionTypeCode: "submissionTypeCode",
            status: "status",
            lastSubmissionId: 5,
            severityLevel: "severityLevel",
            userid: "userid",
            addDate: "2023-06-28T14:17:05.648Z",
            updateDate: "2023-06-28T14:17:05.648Z"
        },
        {
            emissionStatusCode: "emissionStatusCode2",
            submissionAvailabilityCode: "submissionAvailabilityCode2",
            resubExplanation: "resubExplanation2",
            closeDate: "2023-06-28T14:17:05.648Z",
            openDate: "2023-06-28T14:17:05.648Z",
            monitorPlanId: "monitorPlanId2",
            reportingPeriodId: 11,
            id: 22,
            facilityId: 33,
            orisCode: 44,
            state: "state2",
            locations: "locations2",
            reportingFrequencyCode: "reportingFrequencyCode2",
            submissionTypeCode: "submissionTypeCode2",
            status: "status2",
            lastSubmissionId: 55,
            severityLevel: "severityLevel2",
            userid: "userid2",
            addDate: "2023-06-28T14:17:05.648Z",
            updateDate: "2023-06-28T14:17:05.648Z"
        }
    ]

    const getSelect = useCallback((row, idx) => {
        return (
            <div>
                <input
                    checked={row.selected}
                    key={idx}
                    data-testid={`select-cb-${idx}`}
                    type="checkbox"
                    className="usa-checkbox"
                    aria-label="Select"
                    onChange={(e) => onRowSelection(row, e.target.checked)}
                />
                <Button className="margin-left-2 usa-button usa-button--outline">View</Button>
            </div>
        );
    }, []);

    const openModalHandler = (row, index, isCreate) => {
        console.log({ row, index });
        let selectedData = null;

        selectedData = data[1]

        setSelectedRowData(data[0])

        // const controlInputs = {
        //     parameterCode: ["Parameter", "mainDropdown", ""],
        //     name: ["Name", "input", ""],
        //     email: ["Email", "input", ""],
        //     bypassApproachCode: ["Bypass Approach", "dropdown", ""],
        // }

        // const controlDatePickerInputs = {
        //     beginDate: ["Start Date", "date", ""],
        //     beginHour: ["Start Time", "hourDropdown", ""],
        //     endDate: ["End Date", "date", ""],
        //     endHour: ["End Time", "hourDropdown", ""],
        // }
        const controlDatePickerInputs = null

        const mdmData = {}

        const prefilteredDataName = false

        const mainDropdownName = null
        const mainDropdownResult = []
        const prefilteredTotalName = 'prefilteredTotalName'
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
                true,
                prefilteredTotalName,
                extraControls
            )
        )
        // setShowModal(true);
    }

    const closeModalHandler = () => {
        // setShowModal(false);
    }

    const onRowSelection = (row, checked) => {
        row.selected = checked;
        if (checked) {
            setSelectedRows((prev) => [...prev, row]);
        } else {
            setSelectedRows((prev) => prev.filter((r) => r.id !== row.id));
        }
    };

    const columns = [
        {
            name: "Select",
            width: "150px",
            cell: (row, idx) => getSelect(row, idx),
        },
        {
            name: "Facility Name / ID",
            width: "210px",
            // facilityName isn't in api response and will have to be added
            selector: (row) => row.facilityName ? `${row.facilityName} (${row.orisCode})` : row.orisCode,
            sortable: true,
        },
        {
            name: "State",
            width: "150px",
            selector: (row) => row.state,
            sortable: true
        },
        {
            name: "MP Location(s)",
            width: "200px",
            selector: (row) => row.locations,
            sortable: true
        },
        {
            name: "Reporting Period",
            width: "210px",
            // We need to add reporting period to the api response. 
            selector: (row) => row.reportingPeriodId,
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
    };

    return (
        <div>
            {showOpenModal || showExtendModal || showCloseModal || showApproveModal ? (
                <EmSubmissionModal
                    showModal={showOpenModal || showExtendModal || showCloseModal || showApproveModal}
                    close={closeModal}
                    isOpenModal={showOpenModal}
                    isExtendModal={showExtendModal}
                    isCloseModal={showCloseModal}
                    isApproveModal={showApproveModal}
                    openDate={new Date().toISOString()}
                    closeDate={'2023-07-30'}
                />
            ) : null}
            <div className="padding-left-0 margin-left-0 padding-right-0" >
                <div className="grid-row row-width" >
                    <div className="grid-col-4">
                        <span className="data-container-header">{submissionAccessTitle}</span>
                    </div>
                    <div className="grid-col-8">
                        <div className="grid-row margin-left-3 margin-top-2">
                            <div className="grid-col-3">
                                <Button
                                    aria-label="Add"
                                    data-testid="es-add"
                                    className="usa-button usa-button--outline"
                                    onClick={() => setShowOpenModal(true)}
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
                                >
                                    Close
                                </Button>
                            </div>
                            <div className="grid-col-3">
                                <Button
                                    aria-label="Deactivate"
                                    data-testid="es-deactivate"
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
            </div>
            {false &&
                <Modal
                    show={() => { }}
                    close={closeModalHandler}
                >
                    <ModalDetails
                        modalData={selectedRowData}
                        data={selectedModalData}
                        cols={3}
                        title={'TEMP em submission data title'}
                        // viewOnly={!user || (user && !isCheckedOut)}
                        viewOnly={true}
                    // create={createNewData}
                    />
                </Modal>
            }
        </div>
    )
}

const controlInputs = {
    // cols usese .orisCode for fac name/id
    facilityId: ["Facility Name/ID", "input", ""],
    state: ["State", "input", ""],
    locations: ["MP Location(s)", "input", ""],
    reportingPeriodId: ["Reporting Period", "input", ""],
    reportingFrequencyCode: ["Reporting Frequency", "input", ""],
    status: ["Status", "input", ""],
    lastWindowField: ["Last Window", "input", ""],
    openDate: ["Open Date", "date", ""],
    closeDate: ["Close Date", "date", ""],
    emissionStatusCode: ["Emission Status", "input", ""],
    submissionAvailabilityCode: ["Submission Availability", "input", ""],
    submissionStatusField: ["Submission Status", "input", ""],
    lastSubmissionId: ["Last Submission ID", "input", ""],
    submissionDateTimeField: ["Submission Date/Time", "input", ""],
    submissionTypeCode: ["Submission Type", "input", ""],
    severityLevel: ["Severity Level", "input", ""],
    representativeField: ["Representative", "input", ""],
    analystField: ["Analyst", "input", ""],
}