import React, { useState, useEffect, useMemo } from "react";
import { GridContainer, Grid, Dropdown, Label, DatePicker, TextInput, Checkbox } from "@trussworks/react-uswds";
// import { Modal, ModalFooter, ModalHeading, Button, ButtonGroup, ModalToggleButton, ModalRef } from "@trussworks/react-uswds";
import Modal from "../../Modal/Modal";
import MultiSelectCombobox from "../../MultiSelectCombobox/MultiSelectCombobox";
import { getReportingPeriods } from "../../HeaderInfo/HeaderInfo";

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

    // Time Criteria
    const [selectedBeginDate, setSelectedBeginDate] = useState();
    const [selectedBeginHour, setSelectedBeginHour] = useState();
    const [selectedEndDate, setSelectedEndDate] = useState();
    const [selectedEndHour, setSelectedEndHour] = useState();
    const [selectedNotes, setSelectedNotes] = useState();
    const [selectedIsHistorical, setSelectedIsHistorical] = useState();
    const [selectedBeginQuarter, setSelectedBeginQuarter] = useState();
    const [selectedEndQuarter, setSelectedEndQuarter] = useState();


    const [locationData, setLocationData] = useState([]);

    const hoursInADay = [...Array(24).keys()]

    const yearQuarters = useMemo(getReportingPeriods, [])

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
            <Modal show={showModal} save={saveFunc} exitBTN={"Save and Close"} showSave title={"Add Error Suppression"} close={close} width={"1024px"}>
                <GridContainer className='margin-left-1'>
                    <Grid row gap={2}>
                        <h3>Check Result</h3>
                    </Grid>
                    <Grid row gap={2}>
                        <Grid col={5}>
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
                        <Grid col={5}>
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
                        <Grid col={5}>
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
                        <Grid col={5}>
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
                        <Grid col={5}>
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
                        <Grid col={5}>
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
                        <Grid col={5}>
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
                        <Grid col={5}>
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
                    <Grid row gap={2}>
                        <h3>Time Criteria</h3>
                    </Grid>
                    {/* These time criteria rows will be swapable later on */}
                    <Grid row gap={2}>
                        <Grid col={3} >
                            <Label
                                htmlFor="add-begin-date"
                                id="add-begin-date"
                            >
                                Begin Date
                            </Label>
                            <DatePicker
                                aria-labelledby="add-begin-date"
                                id="add-begin-date"
                                name="add-begin-date"
                                value={selectedBeginDate}
                            />
                        </Grid>
                        <Grid col={2}>
                            <Label test-id={"add-begin-hour"} htmlFor={"add-begin-hour"}>
                                Begin Hour
                            </Label>
                            <Dropdown
                                id={"add-begin-hour"}
                                name={"add-begin-hour"}
                                epa-testid={"add-begin-hour"}
                                data-testid={"add-begin-hour"}
                                value={selectedBeginHour}
                                className="width-10"
                            >
                                {hoursInADay.map((h) =>
                                    <option>{h}</option>
                                )}
                            </Dropdown>

                        </Grid>
                        <Grid col={3} >
                            <Label
                                htmlFor="add-end-date"
                                id="add-end-date"
                            >
                                End Date
                            </Label>
                            <DatePicker
                                aria-labelledby="add-end-date"
                                id="add-end-date"
                                name="add-end-date"
                                value={selectedEndDate}
                            />
                        </Grid>
                        <Grid col={3}>
                            <Label test-id={"add-end-hour"} htmlFor={"add-end-hour"}>
                                End Hour
                            </Label>
                            <Dropdown
                                id={"add-end-hour"}
                                name={"add-end-hour"}
                                epa-testid={"add-end-hour"}
                                data-testid={"add-end-hour"}
                                value={selectedEndHour}
                                className="width-10"
                            >
                                {hoursInADay.map((h) =>
                                    <option>{h}</option>
                                )}
                            </Dropdown>
                        </Grid>
                    </Grid>
                    <Grid row gap={2}>
                        <Grid col={3} >
                            <Label
                                htmlFor="add-begin-date-2"
                                id="add-begin-date-2"
                            >
                                Begin Date
                            </Label>
                            <DatePicker
                                aria-labelledby="add-begin-date-2"
                                id="add-begin-date-2"
                                name="add-begin-date-2"
                                value={selectedBeginDate}
                            />
                        </Grid>
                        <Grid col={3} >
                            <Label
                                htmlFor="add-end-date-2"
                                id="add-end-date-2"
                            >
                                End Date
                            </Label>
                            <DatePicker
                                aria-labelledby="add-end-date-2"
                                id="add-end-date-2"
                                name="add-end-date-2"
                                value={selectedEndDate}
                            />
                        </Grid>
                    </Grid>
                    <Grid row gap={2}>
                        <Grid col={3}>
                            <Checkbox id="add-is-historical" name="add-is-historical" label="Historical" value={selectedIsHistorical} />
                        </Grid>
                    </Grid>
                    <Grid row gap={4}>
                        <Grid col={3}>
                            <Label test-id={"add-begin-quarter"} htmlFor={"add-begin-quarter"}>
                                Begin Quarter
                            </Label>
                            <Dropdown
                                id={"add-begin-quarter"}
                                name={"add-begin-quarter"}
                                epa-testid={"add-begin-quarter"}
                                data-testid={"add-begin-quarter"}
                                value={selectedBeginQuarter}
                            >
                                {yearQuarters.map((yearquarter) =>
                                    <option>{yearquarter}</option>
                                )}
                            </Dropdown>
                        </Grid>
                        <Grid col={3}>
                            <Label test-id={"add-end-quarter"} htmlFor={"add-end-quarter"}>
                                End Quarter
                            </Label>
                            <Dropdown
                                id={"add-end-quarter"}
                                name={"add-end-quarter"}
                                epa-testid={"add-end-quarter"}
                                data-testid={"add-end-quarter"}
                                value={selectedEndQuarter}
                            >
                                {yearQuarters.map((yearquarter) =>
                                    <option>{yearquarter}</option>
                                )}
                            </Dropdown>
                        </Grid>
                    </Grid>

                    <Grid row gap={2}>
                        <Grid col={10}>
                            <Label htmlFor="add-notes" id="add-notes-label">Notes</Label>
                            <TextInput className="maxw-full" id="add-notes" name="add-notes" type="text" value={selectedNotes} />
                        </Grid>
                    </Grid>
                </GridContainer>
            </Modal>
        </div>
    )
}