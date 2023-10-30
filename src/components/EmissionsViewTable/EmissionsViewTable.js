import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ArrowDownwardSharp } from "@material-ui/icons";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { useSelector } from "react-redux";
import { displayEmissionsReport } from "../../utils/functions";
import { EMISSIONS_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
import { orderBy } from "lodash";

export const EmissionsViewTable = ({ monitorPlanId }) => {

    const reduxCurrentTab = useSelector((state) =>
        state.openedFacilityTabs[EMISSIONS_STORE_NAME].find(
            (t) => t.selectedConfig.id === monitorPlanId
        )
    );

    const [tableColumns, setTableColumns] = useState([]);
    const [viewColumnInfo, setViewColumnInfo] = useState([]);
    const [viewData, setViewData] = useState([]);

    useEffect(() => {

        setViewColumnInfo(reduxCurrentTab?.viewColumns || []);
        setViewData(reduxCurrentTab?.viewData || []);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reduxCurrentTab.viewColumns, reduxCurrentTab.viewData,]);

    // If the error has an errorCode then we want to show a "View Error" link on the first column to the left of the actual data of the first column, see Zenhub ticket#5756 for more details
    const getFormattedCellForFirstRow = (row) => {

        let cell;
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
    }

    const createTableColumns = () => {
        if (!Array.isArray(viewColumnInfo) || viewColumnInfo.length === 0)
            return [];

        let tableColumns = viewColumnInfo
                            .filter(vc=>vc.value !== "errorCodes")
                            .map((vc) => {
            // wrapping the header and cell in div makes it so that the the table lib doesn't cut off the text
            return {
                name: <span>{vc.label}</span>,
                selector: (row)=>row[vc.value],
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

        // tableColumns.filter()
        return tableColumns;
    }

    useEffect(() => {
        const cols = createTableColumns(viewColumnInfo);
        setTableColumns(cols);
    }, [viewColumnInfo]);

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
            />
        </div>
    )
}