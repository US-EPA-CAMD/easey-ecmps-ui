import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ArrowDownwardSharp } from "@material-ui/icons";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { useSelector } from "react-redux";

import { displayEmissionsReport } from "../../utils/functions";
import { EMISSIONS_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";

export const EmissionsViewTable = ({ monitorPlanId, viewTemplateSelect, filterApply, setfilterApply }) => {

    const defaultTemplateValue = {
        code: "SELECT",
        name: "--- select a view ---",
      };

    const reduxCurrentTab = useSelector((state) =>
        state.openedFacilityTabs[EMISSIONS_STORE_NAME].find(
            (t) => t.selectedConfig.id === monitorPlanId
        )
    );

    const [tableColumns, setTableColumns] = useState([]);
    const [viewColumnInfo, setViewColumnInfo] = useState([]);
    const [viewData, setViewData] = useState([]);
    const [pending, setPending] = useState(true);
    const [message, setMessage] = useState('Select a Reporting Period, Location, and Template and Apply Filter to view the data');

    useEffect(() => {
        setViewColumnInfo(reduxCurrentTab?.viewColumns || []);
        console.log(JSON.stringify(viewTemplateSelect))
        console.log(filterApply + ' filter apply')
        console.log(pending + 'pending')

        if 
            ( filterApply
        ) {
            console.log("working")
            const timeOutApply = setTimeout(() => {
                setViewData(reduxCurrentTab?.viewData || []);
                // Update message based on data availability
                if (viewData.length === 0) {
                    console.log("message no records")
                    setMessage('There are no records to display');
                } 
                console.log("timer ends ")

                setPending(false); // Hide spinner after data is loaded
                setfilterApply(false)
            }, 500);

            console.log("timer starts ")
            setPending(true); // Show spinner while data is loading

            // Cleanup timeout on unmount or if dependencies change
            return () => clearTimeout(timeOutApply);
        }
        else
            setMessage('Select a Reporting Period, Location, and Template and Apply Filter to view the data');
    }, [reduxCurrentTab.viewColumns, reduxCurrentTab.viewData]);

    // useEffect(() => {
    //     // Check if all the required conditions are met before starting the effect
    //     if (
    //         viewTemplateSelect?.code !== defaultTemplateValue.code &&
    //         viewTemplateSelect !== null && filterApply
    //     ) {
    //         const timeOutApply = setTimeout(() => {
    //             // Update message based on data availability
    //             if (viewData.length === 0) {
    //                 setMessage('There are no records to display');
    //             } else {
    //                 setMessage(''); // Clear message when data is available
    //             }
    //             setPending(false); // Hide spinner after data is loaded
    //         }, 2000);

    //         // Add short delay of 2000ms to show the spinner
    //         setPending(true); // Show spinner while data is loading

    //         // Cleanup timeout on unmount or if dependencies change
    //         return () => clearTimeout(timeOutApply);
    //     }
    // }, [
    //     viewTemplateSelect,
    //     filterApply,
    //     viewData, // This dependency ensures the effect will run when `viewData` changes
    // ]);


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
                    name: <span>{vc.label}</span>,
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
        setPending(false)
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
                    noDataComponent={message}
                    progressComponent={<Preloader />}
                />
            </div>
    )
}