import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ArrowDownwardSharp } from "@material-ui/icons";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { useSelector } from "react-redux";

import { displayEmissionsReport } from "../../utils/functions";
import { EMISSIONS_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";

export const EmissionsViewTable = ({ monitorPlanId }) => {

    const reduxCurrentTab = useSelector((state) =>
        state.openedFacilityTabs[EMISSIONS_STORE_NAME].find(
            (t) => t.selectedConfig.id === monitorPlanId
        )
    );

    const [tableColumns, setTableColumns] = useState([]);
    const [viewColumnInfo, setViewColumnInfo] = useState([]);
    const [viewData, setViewData] = useState([]);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        setViewColumnInfo(reduxCurrentTab?.viewColumns || []);

        const timeout = setTimeout(() => {
            setViewData(reduxCurrentTab?.viewData || []);
            setPending(false)
        }, 2000)

        return () => clearTimeout(timeout)
    }, [reduxCurrentTab.viewColumns, reduxCurrentTab.viewData]);

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
            .filter(vc => vc.value !== "errorCodes")
            .map((vc) => {
                // wrapping the header and cell in div makes it so that the the table lib doesn't cut off the text
                return {
                    name: <div>{vc.label}</div>,
                    selector: (row) => row[vc.value],
                    cell: (row) => <span>{row[vc.value]}</span>,
                    sortable: true,
                }
            });

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
                data={viewData}
                className={`data-display-table react-transition fade-in`}
                progressPending={pending}
                progressComponent={<Preloader />}
            />
        </div>
    )
}