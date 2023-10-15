import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ArrowDownwardSharp } from "@material-ui/icons";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { useSelector } from "react-redux";
import { displayEmissionsReport } from "../../utils/functions";
import { EMISSIONS_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";

export const EmissionsViewTable = ({ viewData, viewColumnInfo, isLoading, monitorPlanId }) => {
    console.log("viewData EmissionsViewTable")
    console.log(viewData)
    const [tableColumns, setTableColumns] = useState([]);

    const reduxCurrentTab = useSelector((state) =>
        state.openedFacilityTabs[EMISSIONS_STORE_NAME].find(
            (t) => t.selectedConfig.id === monitorPlanId
        )
    );
    
    console.log("reduxCurrentTab")
    console.log(reduxCurrentTab)
    // If the error has an errorCode then we want to show a "View Error" link on the first column to the left of the actual data of the first column, see Zenhub ticket#5756 for more details
    const getFormattedCellForFirstRow = (row) => {

        let cell;
        if (row.errorCodes !== null) {
            cell = (
                <div>
                    <button
                        className={"hyperlink-btn cursor-pointer"}
                        onClick={() => displayEmissionsReport(reduxCurrentTab.orisCode, monitorPlanId, row.rptyear, row.rptquarter, row.dateHour)}
                    >
                        View Error
                    </button>
                    <span>{" " + row[viewColumnInfo[0].value]}</span>
                </div>
            )
        }
        else 
            cell = <div>{row[viewColumnInfo[0].value]}</div>

        return cell;
    }

    const createTableColumns = () => {
        console.log("viewColumnInfo")
        console.log(viewColumnInfo)
        if (!Array.isArray(viewColumnInfo) || viewColumnInfo.length === 0)
            return [];
    
        const tableColumns = viewColumnInfo.map((vc) => {
            // wrapping the header and cell in div makes it so that the the table lib doesn't cut off the text
            return {
                name: <div>{vc.label}</div>,
                cell: (row) => <span>{row[vc.value]}</span>,
                sortable: true,
            }
        });
        
        console.log("tableColumns")
        console.log(tableColumns)
        tableColumns[0].cell = (row) => getFormattedCellForFirstRow(row);
        tableColumns[0].width = "250px";

        return tableColumns;
    }

    useEffect(() => {
        const cols = createTableColumns(viewColumnInfo);
        setTableColumns(cols);
    }, [viewColumnInfo]);

    return (
        <div className="padding-left-0 margin-left-0 padding-right-0">
            {
                isLoading
                    ? (
                        <Preloader />
                    ) : (
                        <DataTable
                            sortIcon={
                                <ArrowDownwardSharp className="margin-left-2 text-primary" />
                            }
                            noHeader={true}
                            fixedHeader={true}
                            fixedHeaderScrollHeight="50vh"
                            columns={tableColumns}
                            data={viewData}
                            className={`data-display-table `}
                        />
                    )
            }
        </div>
    )
}