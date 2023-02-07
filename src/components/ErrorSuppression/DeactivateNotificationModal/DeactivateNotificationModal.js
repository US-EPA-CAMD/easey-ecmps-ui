import React, { useState, useEffect, useMemo, useContext } from "react";

import Modal from "../../Modal/Modal";
import "./DeactivateNotificationModal.scss"

export const DeactivateNotificationModal = ({close, showModal, deactivate})=>{

    const saveFunc = ()=>{
        deactivate();
        close();
    }
    
   return(
    <Modal showDarkBg show={showModal} save={saveFunc} exitBTN={"Deactivate"} showSave title={"Deactivate Alert"} close={close} width="600px" left="35%">
        <div className="body-font-size">
            <div>Are you sure you want to Deactivate?</div>
            <div>This action cannot be undone.</div>
        </div>
    </Modal>
);

}