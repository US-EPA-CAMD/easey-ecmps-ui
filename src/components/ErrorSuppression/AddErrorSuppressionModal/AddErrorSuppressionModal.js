import React, {useRef} from "react";
import { Modal, ModalFooter, Button, ButtonGroup } from "@trussworks/react-uswds";

export const AddErrorSupressionModal = () => {

    return (
        <div>
            <Modal
                id="example-modal-1"
                aria-labelledby="modal-1-heading"
                aria-describedby="modal-1-description">

                <ModalHeading id="modal-1-heading">
                    Are you sure you want to continue?
                </ModalHeading>

                <div className="usa-prose">
                    <p id="modal-1-description">
                        You have unsaved changes that will be lost.
                    </p>
                </div>

                <ModalFooter>
                    <ButtonGroup>
                        <Button closer>
                            Save and Close
                        </Button>
                        <Button
                            className="padding-105 text-center">
                            Go back
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </Modal>
        </div>
    )
}