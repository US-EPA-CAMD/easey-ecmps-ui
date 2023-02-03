import React, {useEffect, useState, useContext} from "react";
import {Button, Checkbox } from "@trussworks/react-uswds";
import { AddErrorSupressionModal } from "../AddErrorSuppressionModal/AddErrorSuppressionModal";
import DataTable from "react-data-table-component";
import { getErrorSuppressionRecords } from "../../../utils/api/errorSuppressionApi";
import { ErrorSuppressionFiltersContext } from "../error-suppression-context";
import "./ErrorSuppressionDataContainer.scss"
import { formatDate } from "../../../utils/functions";

export const ErrorSuppressionDataContainer = () => {
    const {checkType, checkNumber, checkResult, } = useContext(ErrorSuppressionFiltersContext);
    const [showModal, setShowModal] = useState(false);
    const [tableData, setTableData] = useState([]);
    

    const columns = [
            {name: "Select", cell: (row, idx)=> <input checked={row.selected} key={idx} data-testid={`select-cb-${idx}`} type="checkbox" className="usa-checkbox" />}, 
            {name: "Severity", selector: (row)=>row.severityCode},
            {name: "Facility Name/ID", selector: (row, idx)=>row.orisCode},
            {name: "Locations", selector: (row)=>row.locations},
            {name: "Criteria", selector: (row)=>row.id}, // ??
            {name: "Reason", selector: (row)=>row.reasonCode},
            {name: "Status", selector: (row)=>row.active ? "Active" : "Inactive"},
            {name: "Note", selector: (row)=>row.note},
            {name: "User", selector: (row)=>row.userId},
            {name: "Add Date & Hour", selector: (row, idx)=>`${formatDate(row.addDate, "/")}, ${new Date(row.addDate).getHours()}`},
            {name: "Update Date", selector: (row, idx)=>formatDate(row.updateDate, "/")},
        ];

    useEffect(()=>{
        // if( !checkType || !checkNumber || !checkResult)
        //     return; 

        getErrorSuppressionRecords('QUAL', '23', 'D').then(({data})=>{
            console.log(data)

            setTableData(data)
        }).catch(err=>{
            console.log("error", err)
        })
    }, [checkType, checkNumber, checkResult]);

    return (
            <div>
                {/* This height class is here due to a strange bug where the left nav is too short without it.
                We may be able to remove this once we implement the table */}
                {showModal  ? <AddErrorSupressionModal showModal={showModal} close={()=>setShowModal(false)}/> : null}
                <div className="padding-left-0 margin-left-0 padding-right-0">
                        <div className="grid-row grid-gap width-tablet">
                            <div className="grid-col-5"><span className="data-container-header">Add Suppression</span></div>
                            <div className="grid-col-2"><Button className="margin-left-1" onClick={()=>setShowModal(true)}>Add</Button></div>
                            <div className="grid-col-2"><Button>Clone</Button></div>
                            <div className="grid-col-2"><Button>Deactivate</Button></div>
                        </div>
                        <DataTable
                            id="es-table"
                            columns={columns}
                            data={tableData}
                            className={`data-display-table react-transition fade-in overflow-x-scroll`}

                        />
                </div>
            </div>
    )
}