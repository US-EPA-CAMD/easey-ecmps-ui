import React, { useRef } from "react";
// import { Modal, ModalFooter, ModalHeading, Button, ButtonGroup, ModalToggleButton, ModalRef } from "@trussworks/react-uswds";
import Modal from "../../Modal/Modal";

export const AddErrorSupressionModal = ({ showModal, close }) => {

    const saveFunc = () => {

        close();
    }

    return (
        <div>
            <div className="usa-overlay is-visible"></div>
            <Modal show={showModal} save={saveFunc} exitBTN={"Save and Close"} showSave title={"Add Error Suppression"} close={close}>

            </Modal>
        </div>
    )
}