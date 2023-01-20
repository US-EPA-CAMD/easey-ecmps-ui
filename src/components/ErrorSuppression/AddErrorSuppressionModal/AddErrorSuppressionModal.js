import React, { useState, useEffect } from "react";
import { GridContainer, Grid, Dropdown, Label } from "@trussworks/react-uswds";
// import { Modal, ModalFooter, ModalHeading, Button, ButtonGroup, ModalToggleButton, ModalRef } from "@trussworks/react-uswds";
import Modal from "../../Modal/Modal";
import MultiSelectCombobox from "../../MultiSelectCombobox/MultiSelectCombobox";

export const AddErrorSupressionModal = ({ showModal, close }) => {

    const [selectedCheckType, setSelectedCheckType] = useState();
    const [selectedCheckNumber, setSelectedCheckNumber] = useState();
    const [selectedCheckResult, setSelectedCheckResult] = useState();
    const [selectedFacility, setSelectedFacility] = useState();
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedIsActive, setSelectedActive] = useState();
    const [selectedReason, setSelectedReason] = useState();
    const [selectedAddDateAfter, setSelectedAddDateAfter] = useState();
    const [selectedAddDateBefore, setSelectedAddDateBefore] = useState();
    const [selectedType, setType] = useState();
    const [selectedFuelType, setSelectedFuelType] = useState([]);

    const [locationData, setLocationData] = useState([]);

    useEffect(() => {
        setLocationData([
            {
                id: "Coming Soon...",
                label: "Coming Soon...",
                selected: false,
                enabled: true,
            }
        ])
    }, []);

    const saveFunc = () => {

        close();
    }

    const onChangeOfLocationMultiSelect = (id, changeType) => {
        const uniqueLocations = [
            ...new Set([...selectedLocations, id]),
        ];

        if (changeType === "add") {
            setSelectedLocations(uniqueLocations);
        }
        else if (changeType === "remove") {
            const selected = locationData.filter((l) => l.selected).map(l => l.id);
            setSelectedLocations(selected);
        }
        else
            return;
    }

    return (
        <div>
            <div className="usa-overlay is-visible"></div>
            <Modal show={showModal} save={saveFunc} exitBTN={"Save and Close"} showSave title={"Add Error Suppression"} close={close}>
                <GridContainer className='padding-left-0 padding-right-0'>
                    <Grid row gap={2}>
                        <h3>Check Result</h3>
                    </Grid>
                    <Grid row gap={2}>
                        <Grid col={4}>
                            <Label test-id={"add-check-type-label"} htmlFor={"add-check-type"}>
                                Check Type
                            </Label>
                            <Dropdown
                                id={"add-check-type"}
                                name={"add-check-type"}
                                epa-testid={"add-check-type"}
                                data-testid={"add-check-type"}
                                value={selectedCheckType}
                            >
                                <option>Coming Soon...</option>
                            </Dropdown>
                        </Grid>
                        <Grid col={2}>
                            <Label test-id={"add-check-number-label"} htmlFor={"add-check-number"}>
                                Check Number
                            </Label>
                            <Dropdown
                                id={"add-check-number"}
                                name={"add-check-number"}
                                epa-testid={"add-check-number"}
                                data-testid={"add-check-number"}
                                value={selectedCheckNumber}
                            >
                                <option>Coming Soon...</option>
                            </Dropdown>
                        </Grid>
                    </Grid>
                    <Grid row gap={2} className="margin-top-2">
                        <Grid col={4}>
                            <Label test-id={"add-check-result-label"} htmlFor={"add-check-result"}>
                                Check Result
                            </Label>
                            <Dropdown
                                id={"add-check-result"}
                                name={"add-check-result"}
                                epa-testid={"add-check-result"}
                                data-testid={"add-check-result"}
                                value={selectedCheckResult}
                            >
                                <option>Coming Soon...</option>
                            </Dropdown>
                        </Grid>
                    </Grid>
                    <Grid row gap={2}>
                        <h3>Severity and Reason</h3>
                    </Grid>
                    <Grid row gap={2}>
                        <Grid col={4}>
                            <Label test-id={"add-type"} htmlFor={"add-type"}>
                                Type
                            </Label>
                            <Dropdown
                                id={"add-type"}
                                name={"add-type"}
                                epa-testid={"add-type"}
                                data-testid={"add-type"}
                                value={selectedType}
                            >
                                <option>Coming Soon...</option>
                            </Dropdown>
                        </Grid>
                        <Grid col={4}>
                            <Label test-id={"add-reason"} htmlFor={"add-reason"}>
                                Reason
                            </Label>
                            <Dropdown
                                id={"add-reason"}
                                name={"add-reason"}
                                epa-testid={"add-reason"}
                                data-testid={"add-reason"}
                                value={selectedReason}
                            >
                                <option>Coming Soon...</option>
                            </Dropdown>
                        </Grid>
                    </Grid>
                    <Grid row gap={2}>
                        <h3>Targeting</h3>
                    </Grid>
                    <Grid row gap={2}>
                        <Grid col={4}>
                            <Label test-id={"add-facility-name-label"} htmlFor={"add-facility-name"}>
                                Facility Name
                            </Label>
                            <Dropdown
                                id={"add-facility-name"}
                                name={"add-facility-name"}
                                epa-testid={"add-facility-name"}
                                data-testid={"add-facility-name"}
                                value={selectedFacility}
                            >
                                <option>Coming Soon...</option>
                            </Dropdown>
                        </Grid>
                        <Grid col={4}>
                            <MultiSelectCombobox
                                items={locationData}
                                label="Location Name"
                                entity="locationName"
                                searchBy="contains"
                                onChangeUpdate={onChangeOfLocationMultiSelect}
                                iconAlignRight={2}
                            />
                        </Grid>
                    </Grid>
                    <Grid row gap={2}>
                        <Grid col={4}>
                            <Label test-id={"add-fuel-type"} htmlFor={"add-fuel-type"}>
                                Fuel Type
                            </Label>
                            <Dropdown
                                id={"add-fuel-type"}
                                name={"add-fuel-type"}
                                epa-testid={"add-fuel-type"}
                                data-testid={"add-fuel-type"}
                                value={selectedFuelType}
                            >
                                <option>Coming Soon...</option>
                            </Dropdown>
                        </Grid>
                    </Grid>
                </GridContainer>
            </Modal>
        </div>
    )
}