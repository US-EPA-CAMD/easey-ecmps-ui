import React from "react";

import Modal from "../../Modal/Modal";
import "./DeactivateNotificationModal.scss"
import { deactivateErrorSuppression } from "../../../utils/api/errorSuppressionApi";

export const DeactivateNotificationModal = ({close, showModal, selectedRowIds, refreshTable})=>{

    
    const deactivateErrorSuppressionRecords = () => {
        const promises = []
            selectedRowIds.forEach(id => {
                promises.push(deactivateErrorSuppression(id))
            });
        
        Promise.allSettled(promises).then(()=>{
            // refresh the data in the table once all promises have settled
            refreshTable();
        }).catch(e=>{
            console.error(e)
        }).finally(()=>{
            close();
        })
    }

   return(
    <Modal showDarkBg show={showModal} save={deactivateErrorSuppressionRecords} exitBTN={"Deactivate"} showSave title={"Deactivate Alert"} close={close} width="600px" left="35%">
        <div className="body-font-size">
            <div>Are you sure you want to Deactivate?</div>
            <div>This action cannot be undone.</div>
        </div>
    </Modal>
);

}