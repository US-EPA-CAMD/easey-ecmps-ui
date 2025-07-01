import React, { useCallback, useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { ArrowDownwardSharp } from "@material-ui/icons";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { useSelector } from "react-redux";

import { displayEmissionsReport } from "../../utils/functions";
import { EMISSIONS_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
import { filterEmissionsRows } from '../../utils/emissions-data-filter';

export const EmissionsViewTable = ({ monitorPlanId, filterApply, setFilterApply, user, viewTemplateSelect }) => {

    const reduxCurrentTab = useSelector((state) =>
        state.openedFacilityTabs[EMISSIONS_STORE_NAME].find(
            (t) => t.selectedConfig.id === monitorPlanId
        )
    );

    const [tableColumns, setTableColumns] = useState([]);
    const [viewColumnInfo, setViewColumnInfo] = useState([]);
    const [pendingMessage, setPendingMessage] = useState(false);
    const [message, setMessage] = useState('');

    // Filter the data based on user authentication and view template
    const filteredViewData = useMemo(() => {
        if (user) return reduxCurrentTab?.viewData || [];
        return filterEmissionsRows(reduxCurrentTab?.viewData, viewTemplateSelect?.code);
    }, [reduxCurrentTab?.viewData, viewTemplateSelect?.code, user]);

    useEffect(() => {
        setViewColumnInfo(reduxCurrentTab?.viewColumns || []);

        if (filterApply) {
            const timeOutApply = setTimeout(() => {
                setFilterApply(false)
                if (filteredViewData.length === 0) {
                    setPendingMessage(true)
                }
            }, 1000);

            return () => clearTimeout(timeOutApply);
        }
        else {
            setMessage('Select a Reporting Period, Location, and Template, then click the Apply Filter button to view the data.');
        }
    }, [reduxCurrentTab.viewColumns, reduxCurrentTab.viewData, filterApply]);

    useEffect(() => {
        if (pendingMessage) {
            if (filteredViewData === 0) {
                const timeOutApply = setTimeout(() => {
                    setPendingMessage(false)
                }, 1000);
                setMessage(
                    <div>
                        <p>There are no records to display</p>
                        <p>
                            Select another Reporting Period, Location, and Template, then
                            click the Apply Filter button to view the data
                        </p>
                    </div>
                );
                return () => clearTimeout(timeOutApply);
            }
        }

    }, [pendingMessage, filteredViewData]);

    // If the error has an errorCode then we want to show a "View Error" link on the first column to the left of the actual data of the first column, see Zenhub ticket#5756 for more details
    const getFormattedCellForFirstRow = useCallback((row) => {
        if (row.errorCodes) {
            return (
                <div>
                    <button
                        className={"hyperlink-btn cursor-pointer"}
                        onClick={() => displayEmissionsReport(reduxCurrentTab.orisCode, monitorPlanId, row.rptyear, row.rptquarter, row.dateHour)}
                    >
                        View Error
                    </button>
                </div>
            )
        }
        else
            return null;
    }, [monitorPlanId, reduxCurrentTab.orisCode])

    const createTableColumns = useCallback(() => {
        if (!Array.isArray(viewColumnInfo) || viewColumnInfo.length === 0)
            return [];

        let tableColumns = viewColumnInfo
            .filter(vc => vc.value !== "errorCodes").filter((vc) => {
                if (user) {
                    return true;
                }
                // Other Daily Tests View's label calc desnot contain '.' after calc || Moisture View cantain Calculated % H2O
                if (vc.label?.includes('Calc.') || vc.label === 'Calc Test Result' || vc.label === 'Calculated % H2O') {
                    return false;
                }
                return true;
            })
            .map((vc) => {
                // wrapping the header and cell in div makes it so that the the table lib doesn't cut off the text
                return {
                    name: <span>{vc.label}</span>,
                    selector: (row) => row[vc.value],
                    cell: (row) => <span>{row[vc.value]}</span>,
                    sortable: true,
                }
            });

        if (user) {
            tableColumns.unshift({
                name: <div>Report Errors</div>,
                cell: (row) => getFormattedCellForFirstRow(row),
                sortable: true,
                sortFunction: (rowA, rowB) => {
                    // The errorCodes field can only be either Y or null
                    if (rowA.errorCodes === 'Y' && rowB.errorCodes === null) {
                        return 1;
                    }

                    if (rowB.errorCodes === 'Y' && rowA.errorCodes === null) {
                        return -1;
                    }

                    return 0;
                }
            })
        }

        return tableColumns;
    }, [getFormattedCellForFirstRow, viewColumnInfo])

    useEffect(() => {
        const cols = createTableColumns();
        setTableColumns(cols);
    }, [viewColumnInfo, createTableColumns]);


    return (
        <div className="padding-left-0 margin-left-0 padding-right-0">
            <DataTable
                sortIcon={
                    <ArrowDownwardSharp className="margin-left-2 text-primary" />
                }
                noHeader={true}
                fixedHeader={true}
                fixedHeaderScrollHeight="50vh"
                columns={tableColumns}
                data={filteredViewData}
                className={`data-display-table react-transition fade-in`}
                progressPending={filterApply}
                noDataComponent={message}
                progressComponent={<Preloader />}
            />
        </div>
    )
}