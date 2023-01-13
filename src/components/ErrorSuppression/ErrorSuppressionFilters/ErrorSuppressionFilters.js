import React, { useContext, useEffect, useState, } from "react";
import { GridContainer, Grid, Label, Dropdown, Checkbox, DatePicker, ButtonGroup, Button } from "@trussworks/react-uswds";
import { ErrorSuppressionFiltersContext } from "../error-suppression-context";
import MultiSelectCombobox from "../../MultiSelectCombobox/MultiSelectCombobox";
import { LocationSearching } from "@material-ui/icons";

export const ErrorSuppressionFilters = () => {

    const ctxFilters = useContext(ErrorSuppressionFiltersContext);

    const [selectedCheckType, setSelectedCheckType] = useState();
    const [selectedCheckNumber, setSelectedCheckNumber] = useState();
    const [selectedCheckResult, setSelectedCheckResult] = useState();
    const [selectedFacility, setSelectedFacility] = useState();
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedIsActive, setSelectedActive] = useState();
    const [selectedReason, setSelectedReason] = useState();
    const [selectedAddDateAfter, setSelectedAddDateAfter] = useState();
    const [selectedAddDateBefore, setSelectedAddDateBefore] = useState();

    const [locationData, setLocationData] = useState([]);
    useEffect(()=>{

        setLocationData([
            {
                id: "Coming Soon...",
                label: "Coming Soon...",
                selected: false,
                enabled: true,
            }
        ])
    }, []);    

    const onChangeOfLocationMultiSelect = (id, changeType)=>{
        const uniqueLocations = [
            ...new Set([...selectedLocations, id]),
        ];
      
        if( changeType === "add"){
            setSelectedLocations(uniqueLocations);
        }
        else if( changeType === "remove"){
            const selected = locationData.filter((l)=>l.selected).map(l=>l.id);
            setSelectedLocations(selected);
        }
        else 
            return;
    }

    return (
        <GridContainer className='padding-left-0 margin-left-0 padding-right-0'>
            <Grid row>
                <h3>Check Result</h3>
            </Grid>
            <Grid row>
                <Grid col={4}>
                    <Label test-id={"check-type-label"} htmlFor={"check-type"}>
                        Check Type
                    </Label>
                    <Dropdown
                        id={"check-type"}
                        name={"check-type"}
                        epa-testid={"check-type"}
                        data-testid={"check-type"}
                        value={selectedCheckType}
                    >
                        <option>Coming Soon...</option>
                    </Dropdown>
                </Grid>
                <Grid col={2}>
                    <div className="margin-left-2">
                        <Label test-id={"check-number-label"} htmlFor={"check-number"}>
                            Check Number
                        </Label>
                        <Dropdown
                            id={"check-number"}
                            name={"check-number"}
                            epa-testid={"check-number"}
                            data-testid={"check-number"}
                            value={selectedCheckNumber}
                        >
                            <option>Coming Soon...</option>
                        </Dropdown>
                    </div>
                </Grid>
            </Grid>
            <Grid row className="margin-top-2">
                <Grid col={4}>
                    <Label test-id={"check-result-label"} htmlFor={"check-result"}>
                        Check Result
                    </Label>
                    <Dropdown
                        id={"check-result"}
                        name={"check-result"}
                        epa-testid={"check-result"}
                        data-testid={"check-result"}
                        value={selectedCheckResult}
                    >
                        <option>Coming Soon...</option>
                    </Dropdown>
                </Grid>
            </Grid>
            <Grid row className="margin-top-4">
                <h3>Facility Location</h3>
            </Grid>
            <Grid row>
                <Grid col={4}>
                    <Label test-id={"facility-name-label"} htmlFor={"facility-name"}>
                        Facility Name/ID
                    </Label>
                    <Dropdown
                        id={"facility-name"}
                        name={"facility-name"}
                        epa-testid={"facility-name"}
                        data-testid={"facility-name"}
                        value={selectedFacility}
                    >
                        <option>Coming Soon...</option>
                    </Dropdown>
                </Grid>
                <Grid col={4}>
                    <div className="margin-left-2">
                        <MultiSelectCombobox
                            items={locationData}
                            label="Location Name"
                            entity="locationName"
                            searchBy="contains"
                            onChangeUpdate={onChangeOfLocationMultiSelect}
                        />
                    </div>
                </Grid>
            </Grid>
            <Grid row className="margin-top-4">
                <Grid col={3}>
                    <h3>Active, Reason & Add Date</h3>
                </Grid>
                <Grid col={3}>
                    <Checkbox id="is-active" name="is-active" label="Active" className="margin-top-2" value={selectedIsActive}/>
                </Grid>
            </Grid>
            <Grid row>
                <Grid col={4}>
                    <Label test-id={"reason-label"} htmlFor={"reason"}>
                        Reason
                    </Label>
                    <Dropdown
                        id={"reason"}
                        name={"reason"}
                        epa-testid={"reason"}
                        data-testid={"reason"}
                        value={selectedReason}
                    >
                        <option>Coming Soon...</option>
                    </Dropdown>
                </Grid>
            </Grid>
            <Grid row className="margin-top-2">
                <Grid col={3}>
                    <Label
                        htmlFor="add-date-after"
                        id="add-date-after-label"
                    >
                        Add Date After
                    </Label>
                    <DatePicker
                        aria-labelledby="add-date-after-label"
                        id="add-date-after"
                        name="add-date-after"
                        value={selectedAddDateAfter}
                    />
                </Grid>
                <Grid col={3} >
                    <div className="margin-left-4">
                        <Label
                            htmlFor="add-date-before"
                            id="add-date-before-label"
                        >
                            Add Date Before
                        </Label>
                        <DatePicker
                            aria-labelledby="add-date-before-label"
                            id="add-date-before"
                            name="add-date-before"
                            value={selectedAddDateBefore}
                        />
                    </div>
                </Grid>
                <Grid col={4} >
                    <ButtonGroup type="default" className="float-right margin-top-3">
                        <Button type="button" className="usa-button usa-button--outline">
                            Clear 
                        </Button>
                        <Button type="button">Apply Filters</Button>
                    </ButtonGroup>
                </Grid>

            </Grid>
        </GridContainer>
    );
}
