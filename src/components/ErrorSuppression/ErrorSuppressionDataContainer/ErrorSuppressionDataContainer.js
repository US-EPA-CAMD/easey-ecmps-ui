import React, { useEffect, useState, useContext, useCallback } from "react";
import { Button } from "@trussworks/react-uswds";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { AddErrorSupressionModal } from "../AddErrorSuppressionModal/AddErrorSuppressionModal";
import DataTable from "react-data-table-component";
import { getErrorSuppressionRecords } from "../../../utils/api/errorSuppressionApi";
import { ErrorSuppressionFiltersContext } from "../context/error-suppression-context";
import "./ErrorSuppressionDataContainer.scss"
import { formatDate, getQuarter } from "../../../utils/functions";
import { DeactivateNotificationModal } from "../DeactivateNotificationModal/DeactivateNotificationModal";

export const ErrorSuppressionDataContainer = () => {
    const {
        checkType,
        checkNumber,
        checkResult,
        facility,
        locations,
        active,
        reason,
        addDateAfter,
        addDateBefore,
    } = useContext(ErrorSuppressionFiltersContext);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showCloneModal, setShowCloneModal] = useState(false);

    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isTableLoading, setIsTableLoading] = useState(false)

    const getTableData = () => {
        if (!checkType || !checkNumber || !checkResult)
            return;
        // const params = { checkType:"LINEAR", checkNumber:'12', checkResult:'A', facility, locations, active, reason, addDateAfter, addDateBefore, }
        // const params = { checkType:"QUAL", checkNumber:'23', checkResult:'D', facility, locations, active, reason, addDateAfter, addDateBefore, }
        // const params = { checkType:"HOURGEN", checkNumber:'7', checkResult:'C', facility, locations, active, reason, addDateAfter, addDateBefore, }
        // const params = { checkType: "DAYCAL", checkNumber: '19', checkResult: 'E', facility, locations, active, reason, addDateAfter, addDateBefore, }
        const params = { checkType, checkNumber, checkResult, facility, locations, active, reason, addDateAfter, addDateBefore, }
        setIsTableLoading(true);
        console.log(params);
        getErrorSuppressionRecords(params).then(({ data }) => {
            // getErrorSuppressionRecords('HOURGEN', '7', 'C').then(({ data }) => {
            data.forEach(d => d.selected = false)
            setTableData(data)
            setSelectedRows([]);
        }).catch(err => {
            console.log("error", err)
        }).finally(() => {
            console.log("was herer")
            setIsTableLoading(false);
        })
    }
    useEffect(() => {
        getTableData()
        return () => {
            setTableData([])
        }
    }, [checkType, checkNumber, checkResult, facility, locations, active, reason, addDateAfter, addDateBefore]);

    const getCheckbox = useCallback((row, idx,) => {

        return <input checked={row.selected} key={idx} data-testid={`select-cb-${idx}`} type="checkbox" className="usa-checkbox" aria-label="Select" onChange={(e) => onRowSelection(row, e.target.checked)} />
    }, []);


    const onRowSelection = (row, checked) => {
        row.selected = checked;
        if (checked) {
            setSelectedRows((prev) => [...prev, row]);
        }
        else {
            setSelectedRows((prev) => prev.filter(r => r.id !== row.id));
        }
    }

    const formatMatchTimeCriteriaCell = (row) => {
        let beginTime;
        let endTime;

        if (row.matchTimeTypeCode === null) {
            return ""
        }
        if (row.matchTimeTypeCode === "HISTIND") {
            return "Historical"
        }

        if (row.matchTimeTypeCode === "DATE") {
            if (row.matchTimeBeginValue)
                beginTime = formatDate(row.matchTimeBeginValue, "/");
            if (row.matchTimeEndValue) {
                endTime = formatDate(row.matchTimeEndValue, "/")
            }
        }

        if (row.matchTimeTypeCode === "HOUR") {
            if (row.matchTimeBeginValue) {
                const d = new Date(row.matchTimeBeginValue);
                beginTime = `${formatDate(row.matchTimeBeginValue, "/")}  ${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()}`;
            }
            if (row.matchTimeEndValue) {
                const d = new Date(row.matchTimeEndValue);
                endTime = `${formatDate(row.matchTimeEndValue, "/")}  ${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()}`;
            }
        }

        if (row.matchTimeTypeCode === "QUARTER") {
            if (row.matchTimeBeginValue) {
                const d = new Date(row.matchTimeBeginValue);
                beginTime = `${d.getUTCFullYear()} Q${getQuarter(d, true)}`;
            }
            if (row.matchTimeEndValue) {
                const d = new Date(row.matchTimeEndValue);
                endTime = `${d.getUTCFullYear()} Q${getQuarter(d, true)}`;
            }
        }

        if (!beginTime && !endTime) {
            return "";
        }

        return `${beginTime ?? ""} - ${endTime ?? ""}`
    }

    const formatDateWithHoursMinutesSeconds = (dateString) => {
        const date = new Date(dateString);
        return `${formatDate(dateString, "/")} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCMinutes()}`
    }

    const closeModal = () => {
        setShowAddModal(false);
        setShowCloneModal(false);
    }

    const columns = [
        { name: "Select", maxWidth: "100px", cell: (row, idx) => getCheckbox(row, idx) },
        { name: "Severity", maxWidth: "150px", selector: (row) => row.severityCode },
        { name: "Facility Name/ID", selector: (row) => row.orisCode },
        { name: "Locations", selector: (row) => row.locations },
        { name: "Match Data Criteria", selector: (row) => "" + row.matchDataTypeCode + (row.matchDataValue ? ":" + row.matchDataValue : "") },
        { name: "Match Time Criteria", width: "300px", selector: (row) => formatMatchTimeCriteriaCell(row) },
        { name: "Reason", maxWidth: "150px", selector: (row) => row.reasonCode },
        { name: "Status", maxWidth: "150px", selector: (row) => row.active ? "Active" : "Inactive" },
        { name: "Note", maxWidth: "1000px", selector: (row) => row.note },
        { name: "User", selector: (row) => row.userId },
        { name: "Add Date & Hour", selector: (row) => formatDateWithHoursMinutesSeconds(row.addDate) },
        { name: "Update Date", selector: (row) => formatDateWithHoursMinutesSeconds(row.updateDate) },
    ];

    return (
        <div>
            {showAddModal || showCloneModal ? <AddErrorSupressionModal showAddModal={showAddModal || showCloneModal} values={showCloneModal ? selectedRows[0] : undefined} close={closeModal} /> : null}
            {/* {showCloneModal ? <AddErrorSupressionModal showAddModal={showCloneModal} values={selectedRows[0]} close={() => setShowCloneModal(false)} /> : null} */}
            {showDeactivateModal ?
                <DeactivateNotificationModal
                    showDeactivateModal={showDeactivateModal}
                    close={() => setShowDeactivateModal(false)}
                    selectedRowIds={selectedRows.map(r => r.id)}
                    refreshTable={getTableData}
                />
                : null}

            <div className="padding-left-0 margin-left-0 padding-right-0">
                <div className="grid-row row-width">
                    <div className="grid-col-5">
                        <span className="data-container-header">Add Suppression </span>

                    </div>
                    <div className="grid-col-2">
                        <Button
                            aria-label="Add"
                            data-testid="es-add"
                            className="margin-left-1"
                            onClick={() => setShowAddModal(true)}
                        >
                            Add
                        </Button>
                    </div>
                    <div className="grid-col-2">
                        <Button aria-label="Clone"
                            data-testid="es-clone"
                            disabled={selectedRows.length !== 1}
                            onClick={() => {
                                setShowCloneModal(true);
                            }}
                        >
                            Clone
                        </Button>
                    </div>
                    <div className="grid-col-2">
                        <Button
                            aria-label="Deactivate"
                            data-testid="es-deactivate"
                            onClick={() => setShowDeactivateModal(true)}
                            disabled={selectedRows.length === 0}
                        >
                            Deactivate
                        </Button>
                    </div>
                </div>
                <div className=" ">
                    {isTableLoading ?
                        <Preloader />
                        :
                        <DataTable
                            noHeader={true}
                            fixedHeader={true}
                            fixedHeaderScrollHeight="50vh"
                            columns={columns}
                            data={tableData}
                            className={`data-display-table react-transition fade-in`}
                        />
                    }

                </div>
            </div>
        </div>
    )
}