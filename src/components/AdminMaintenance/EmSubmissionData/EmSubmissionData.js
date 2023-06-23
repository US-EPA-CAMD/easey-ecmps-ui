import React, { useCallback, useState } from 'react';
import DataTable from "react-data-table-component";
import { Preloader } from '@us-epa-camd/easey-design-system';
import { Button } from '@trussworks/react-uswds';
import { ArrowDownwardSharp } from '@material-ui/icons';
import { submissionAccessTitle } from '../../../utils/constants/moduleTitles';
import "./EmSubmissionData.scss";

export const EmSubmissionData = ({ data=[], isLoading=false }) => {

    const [, setSelectedRows] = useState([]);

    // @TODO: still need to add the View button here
    const getSelect = useCallback((row, idx) => {
        return (
            <input
                checked={row.selected}
                key={idx}
                data-testid={`select-cb-${idx}`}
                type="checkbox"
                className="usa-checkbox"
                aria-label="Select"
                onChange={(e) => onRowSelection(row, e.target.checked)}
            />
        );
    }, []);

    const onRowSelection = (row, checked) => {
        row.selected = checked;
        if (checked) {
            setSelectedRows((prev) => [...prev, row]);
        } else {
            setSelectedRows((prev) => prev.filter((r) => r.id !== row.id));
        }
    };

    const tempData = [
        {
            "id": 357579,
            "facilityId": 1,
            "orisCode": 3,
            "monitorPlanId": "MDC-A89416B9A1414C1CADE050800574A24C",
            "state": "AL",
            "locations": "6B",
            "reportingPeriodId": 77,
            "reportingFrequencyCode": "Q",
            "status": "PENDING",
            "openDate": "2012-04-01",
            "closeDate": "2012-05-01",
            "emissionStatusCode": "PENDING",
            "submissionAvailabilityCode": null,
            "lastSubmissionId": null,
            "submissionTypeCode": "INITIAL",
            "severityLevel": null,
            "resubExplanation": "Missing Rep for ARP,CAIRNOX,CAIROS,CAIRSO2,RGGI,SIPNOX",
            "userid": "ECMPSOPN",
            "addDate": "2023-05-30T18:36:30.301Z",
            "updateDate": null
          }
    ]
    const columns = [
        {
            name: "Select",
            cell: (row, idx) => getSelect(row, idx),
        },
        {
            name: "Facility Name / ID",
            selector: (row) => row.orisCode,
            // facilityName isn't in api response and will have to be added
            // (row.facilityName ? row.facilityName : "") +
            // (row.orisCode ? " (" + row.orisCode + ")" : ""),
            sortable: true,
        },
        {
            name: "State",
            selector: (row) => row.state,
            sortable: true
        },
        {
            name: "MP Location(s)",
            selector: (row) => row.locations,
            sortable: true
        },
        {
            name: "Reporting Period",
            // We need to add reporting period to the api response. 
            selector: (row) => row.reportingPeriodId,
            sortable: true,
        },
        {
            name: "Reporting Frequency",
            // We need to add reporting period to the api response. 
            selector: (row) => row.reportingFrequencyCode,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: "Open Date",
            selector: (row) => row.openDate,
            sortable: true,
        },
        {
            name: "Close Date",
            selector: (row) => row.closeDate,
            sortable: true,
        },
        {
            name: "Emission Status",
            selector: (row) => row.emissionStatusCode,
            sortable: true,
        },
        {
            name: "Submission Availability",
            selector: (row) => row.submissionAvailabilityCode,
            sortable: true,
        },
        {
            name: "Last Submission ID",
            selector: (row) => row.lastSubmissionId,
            sortable: true,
        },
        {
            name: "Severity Level",
            selector: (row) => row.severityLevel,
            sortable: true,
        },
    ];


    return (
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
                            >
                                Open
                            </Button>
                        </div>
                        <div className="grid-col-3">
                            <Button
                                aria-label="Clone"
                                data-testid="es-clone"
                            >
                                Extend
                            </Button>
                        </div>
                        <div className="grid-col-3">
                            <Button
                                aria-label="Deactivate"
                                data-testid="es-deactivate"
                            >
                                Close
                            </Button>
                        </div>
                        <div className="grid-col-3">
                            <Button
                                aria-label="Deactivate"
                                data-testid="es-deactivate"
                            >
                                Approve
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="es-datatable margin-top-5">
                {isLoading ? (
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
                        data={tempData}
                        className={`data-display-table react-transition fade-in`}
                    />
                )}
            </div>
        </div>
    )
}