import React, { useContext, useEffect, useState, } from "react";
import { GridContainer, Grid, Label, Dropdown, Checkbox, DatePicker, ButtonGroup, Button } from "@trussworks/react-uswds";
import { ErrorSuppressionFiltersContext } from "../error-suppression-context";
import MultiSelectCombobox from "../../MultiSelectCombobox/MultiSelectCombobox";
import { getCheckCatalogResults, getReasonCodes } from "../../../utils/api/mdmApi";
import { getAllFacilities } from "../../../utils/api/facilityApi";

export const transformCheckResultData = (data) => {
    return data.reduce((acc, cv) => {
        if (!acc[cv.checkTypeCode]) {
            acc[cv.checkTypeCode] = {};
        }

        if (!acc[cv.checkTypeCode][cv.checkNumber]) {
            acc[cv.checkTypeCode][cv.checkNumber] = [cv];
        } else {
            acc[cv.checkTypeCode][cv.checkNumber]
                .push(cv)
        }

        return acc;
    }, {});
}

export const ErrorSuppressionFilters = () => {

    const ctxFilters = useContext(ErrorSuppressionFiltersContext);

    // Dropdowns
    const [checkTypeList, setCheckTypeList] = useState([]);
    const [checkNumberList, setCheckNumberList] = useState([]);
    const [checkResultList, setCheckResultList] = useState([]);
    const [facilityList, setFacilityList] = useState([]);
    const [reasonCodeList, setReasonCodeList] = useState([])

    // Selection values
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

    // API check result data transformed
    const [transformedData, setTransformedData] = useState([])

    const defaultDropdownText = "-- Select a value --";

    // Make all api calls that only need to happen once on page load here
    useEffect(() => {

        getCheckCatalogResults().then(({ data }) => {
            const _transformedData = transformCheckResultData(data);
            setCheckTypeList(Object.keys(_transformedData));
            setTransformedData(_transformedData);
        })

        getAllFacilities().then(({ data }) => {
            setFacilityList(data.map(f => ({ orisCode: f.facilityId, facilityName: f.facilityName })));
        })

        getReasonCodes().then(({ data }) => {
            setReasonCodeList(data)
        })

        setLocationData([
            {
                id: "Coming Soon...",
                label: "Coming Soon...",
                selected: false,
                enabled: true,
            }
        ]);

        return () => {
            setCheckTypeList([])
            setTransformedData([])
        }
    }, []);

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

    const onCheckTypeChange = (e) => {
        const { value } = e.target;
        setSelectedCheckType(value);
        setSelectedCheckNumber(false);
        setSelectedCheckResult(false);

        if (value === false)
            return;

        setCheckNumberList(Object.keys(transformedData[value]))
    }

    const onCheckNumberChange = (e) => {
        const { value } = e.target;
        setSelectedCheckNumber(value);
        setSelectedCheckResult(false);

        if (value === false)
            return;

        setCheckResultList(transformedData[selectedCheckType][value].map(d => d.checkResult))
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
                        onChange={onCheckTypeChange}
                    >
                        <option value={false}>{defaultDropdownText}</option>
                        {checkTypeList.map((d) => <option key={d} value={d} data-testid={d}>{d}</option>)}
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
                            onChange={onCheckNumberChange}
                        >
                            <option value={false}>{defaultDropdownText}</option>
                            {checkNumberList.map((d) => <option key={d} value={d} data-testid={d}>{d}</option>)}
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
                        onChange={(e) => setSelectedCheckResult(e.target.value)}
                    >
                        <option value={false}>{defaultDropdownText}</option>
                        {checkResultList.map((d) => <option key={d} value={d} data-testid={d}>{d}</option>)}
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
                        onChange={(e) => setSelectedFacility(e.target.value)}
                    >
                        <option value={false}>{defaultDropdownText}</option>
                        {facilityList.map((d) => <option key={d.orisCode} value={d.orisCode} data-testid={d.orisCode}>{`${d.facilityName} (${d.orisCode})`}</option>)}
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
                    <Checkbox id="is-active" name="is-active" label="Active" className="margin-top-2" value={selectedIsActive} />
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
                        onChange={(e)=>setSelectedReason(e.target.value)}
                    >
                        <option value={false}>{defaultDropdownText}</option>
                        {reasonCodeList.map((d) => (
                            <option
                                key={d.errorSuppressionReasonCode}
                                value={d.errorSuppressionReasonCode}
                                data-testid={d.errorSuppressionReasonCode}
                            >
                                {d.errorSuppressionReasonCode}
                            </option>))}
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
