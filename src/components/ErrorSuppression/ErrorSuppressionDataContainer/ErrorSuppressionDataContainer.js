import React, { useEffect, useState, useContext, useCallback } from "react";
import { Button } from "@trussworks/react-uswds";
import { AddErrorSupressionModal } from "../AddErrorSuppressionModal/AddErrorSuppressionModal";
import DataTable from "react-data-table-component";
import { getErrorSuppressionRecords } from "../../../utils/api/errorSuppressionApi";
import { ErrorSuppressionFiltersContext } from "../error-suppression-context";
import "./ErrorSuppressionDataContainer.scss"
import { formatDate, getQuarter } from "../../../utils/functions";

export const ErrorSuppressionDataContainer = () => {
    const { checkType, checkNumber, checkResult, } = useContext(ErrorSuppressionFiltersContext);
    const [showModal, setShowModal] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const onRowSelection = (row, checked) => {
        row.selected=checked;
        if(checked){
            setSelectedRows((prev)=>[...prev, row]);
        }
        else {
            setSelectedRows((prev)=>prev.filter(r=>r.id !== row.id));
        }
    }

    const formatMatchTimeCriteriaCell = (row)=>{
        let beginTime;
        let endTime;

        if( row.matchTimeTypeCode === null ){
            return ""
        }
        if( row.matchTimeTypeCode === "HISTIND" || row.matchHistoricalIndicator){
            return "Historical"
        }
        
        if(row.matchTimeTypeCode === "DATE" ){
            if(row.matchTimeBeginValue)
                beginTime = formatDate(row.matchTimeBeginValue, "/");
            if(row.matchTimeEndValue){
                endTime = formatDate(row.matchTimeEndValue, "/")
            }
        }
        
        if(row.matchTimeTypeCode === "HOUR"){
            if(row.matchTimeBeginValue){
                const d = new Date(row.matchTimeBeginValue);
                beginTime = `${formatDate(row.matchTimeBeginValue, "/")}  ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
            }
            if(row.matchTimeEndValue){
                const d = new Date(row.matchTimeEndValue);
                endTime = `${formatDate(row.matchTimeEndValue, "/")}  ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
            }
        }

        if(row.matchTimeTypeCode === "QUARTER"){
            if(row.matchTimeBeginValue){
                const d = new Date(row.matchTimeBeginValue);
                beginTime = `${d.getFullYear()} Q${getQuarter(d)}`;
            }
            if(row.matchTimeEndValue){
                const d = new Date(row.matchTimeEndValue);
                endTime = `${d.getFullYear()} Q${getQuarter(d)}`;
            }
        }

        if( !beginTime && !endTime){
            return "";
        }

        return `${beginTime ?? ""} - ${endTime ?? ""}`
    }

    const formatDateWithHoursMinutesSeconds = (dateString) =>{
        const date = new Date(dateString);
        return `${formatDate(dateString, "/")} ${date.getHours()}:${date.getMinutes()}:${date.getMinutes()}`
    }

    const getCheckbox = useCallback((row, idx, )=>{

        return <input checked={row.selected} key={idx} data-testid={`select-cb-${idx}`} type="checkbox" className="usa-checkbox" aria-label="Select" onChange={(e) => onRowSelection(row, e.target.checked)} />
    }, [])

    const columns = [
        { name: "Select", maxWidth:"100px", cell: (row, idx) => getCheckbox(row, idx) },
        { name: "Severity", maxWidth:"150px", selector: (row) => row.severityCode },
        { name: "Facility Name/ID", selector: (row) => row.orisCode },
        { name: "Locations", selector: (row) => row.locations },
        { name: "Match Data Criteria", selector: (row) => "" + row.matchDataTypeCode + (row.matchDataValue ?  ":"+row.matchDataValue : "") },
        { name: "Match Time Criteria", width:"300px", selector: (row) => formatMatchTimeCriteriaCell(row) },
        { name: "Reason", maxWidth:"150px", selector: (row) => row.reasonCode },
        { name: "Status", maxWidth:"150px", selector: (row) => row.active ? "Active" : "Inactive" },
        { name: "Note", maxWidth: "1000px", selector: (row) => row.note },
        { name: "User", selector: (row) => row.userId },
        { name: "Add Date & Hour", selector: (row) => formatDateWithHoursMinutesSeconds(row.addDate) },
        { name: "Update Date", selector: (row) => formatDateWithHoursMinutesSeconds(row.updateDate) },
    ];

    useEffect(() => {
        // if( !checkType || !checkNumber || !checkResult)
        //     return; 
        // getErrorSuppressionRecords('QUAL', '23', 'D').then(({ data }) => {

        getErrorSuppressionRecords('LINEAR', '12', 'A').then(({ data }) => {
        // getErrorSuppressionRecords('DAYCAL', '19', 'E').then(({ data }) => {
        // getErrorSuppressionRecords('HOURGEN', '7', 'C').then(({ data }) => {
            data.forEach(d=>d.selected=false)
            setTableData(data)
        }).catch(err => {
            console.log("error", err)
        })
    }, [checkType, checkNumber, checkResult]);

    return (
        <div>
            {/* This height class is here due to a strange bug where the left nav is too short without it.
                We may be able to remove this once we implement the table */}
            {showModal ? <AddErrorSupressionModal showModal={showModal} close={() => setShowModal(false)} /> : null}
            <div className="padding-left-0 margin-left-0 padding-right-0">
                <div className="grid-row row-width">    
                    <div className="grid-col-5">
                        <span className="data-container-header">Add Suppression</span>
                    </div>
                    <div className="grid-col-2">
                        <Button aria-label="Add" data-testid="es-add" className="margin-left-1" onClick={() => setShowModal(true)}>Add</Button>
                    </div>
                    <div className="grid-col-2">
                        <Button aria-label="Clone" data-testid="es-clone" disabled={selectedRows.length > 1}>Clone</Button>
                    </div>
                    <div className="grid-col-2">
                        <Button aria-label="Deactivate" data-testid="es-deactivate">Deactivate</Button>
                    </div>
                </div>
                <div className=" ">
                <DataTable
                    noHeader={true}
                    fixedHeader={true}
                    fixedHeaderScrollHeight="50vh"
                    columns={columns}
                    data={tableData}
                    className={`data-display-table react-transition fade-in`}
                />

                </div>
            </div>
        </div>
    )
}