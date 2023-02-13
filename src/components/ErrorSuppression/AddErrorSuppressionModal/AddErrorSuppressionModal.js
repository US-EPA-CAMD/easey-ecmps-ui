import React, { useState, useEffect, useMemo, useContext } from "react";
import { GridContainer, Grid, Dropdown, Label, DatePicker, TextInput, Checkbox } from "@trussworks/react-uswds";
// import { Modal, ModalFooter, ModalHeading, Button, ButtonGroup, ModalToggleButton, ModalRef } from "@trussworks/react-uswds";
import Modal from "../../Modal/Modal";
import MultiSelectCombobox from "../../MultiSelectCombobox/MultiSelectCombobox";
import { getReportingPeriods } from "../../HeaderInfo/HeaderInfo";
import { getSeverityCodes } from "../../../utils/api/mdmApi";
import { defaultDropdownText } from "../ErrorSuppression";
import { ErrorSuppressionFiltersContext } from "../context/error-suppression-context";
import { getUniqueCheckTypeDescription, getLocations } from "../ErrorSuppressionFilters/ErrorSuppressionFilters";
import { formatDate, getQuarter } from "../../../utils/functions";

export const AddErrorSupressionModal = ({ showModal, close, values }) => {
    console.log(values)
    // Values being used from context
    const {
        transformedData,
        facilityList,
        reasonCodeList } = useContext(ErrorSuppressionFiltersContext);

    // Dropdowns
    const [checkTypeList, setCheckTypeList] = useState([]);
    const [checkNumberList, setCheckNumberList] = useState([]);
    const [checkResultList, setCheckResultList] = useState([]);
    const [severityCodeList, setSeverityCodeList] = useState([]);
    
    // Selected form 
    const [selectedCheckType, setSelectedCheckType] = useState();
    const [selectedCheckNumber, setSelectedCheckNumber] = useState();
    const [selectedCheckResult, setSelectedCheckResult] = useState();
    const [selectedFacility, setSelectedFacility] = useState();
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedReason, setSelectedReason] = useState();
    const [selectedFuelType, setSelectedFuelType] = useState();
    const [selectedSeverityCode, setSelectedSeverityCode] = useState();
    const [selectedNotes, setSelectedNotes] = useState('');

    // Time Criteria
    const [selectedBeginDate, setSelectedBeginDate] = useState();
    const [selectedBeginHour, setSelectedBeginHour] = useState();
    const [selectedEndDate, setSelectedEndDate] = useState();
    const [selectedEndHour, setSelectedEndHour] = useState();
    const [selectedIsHistorical, setSelectedIsHistorical] = useState();
    const [selectedBeginQuarter, setSelectedBeginQuarter] = useState();
    const [selectedEndQuarter, setSelectedEndQuarter] = useState();

    // Locations multiselect items
    const [locationData, setLocationData] = useState([]);

    const hoursInADay = [...Array(24).keys()]

    const yearQuarters = useMemo(getReportingPeriods, [])

    // Time Criteria booleans
    const showDateHour = useMemo(() => !!(findCheckResultObject()?.timeTypeCode === 'HOUR'),
        [selectedCheckType, selectedCheckNumber, selectedCheckResult, transformedData]);

    const showDate = useMemo(() => !!(findCheckResultObject()?.timeTypeCode === 'DATE'),
        [selectedCheckType, selectedCheckNumber, selectedCheckResult, transformedData]);

    const showQuarter = useMemo(() => !!(findCheckResultObject()?.timeTypeCode === 'QUARTER'),
        [selectedCheckType, selectedCheckNumber, selectedCheckResult, transformedData]);
    
    const showHistorical = useMemo(() => !!(findCheckResultObject()?.timeTypeCode === 'HISTIND'),
        [selectedCheckType, selectedCheckNumber, selectedCheckResult, transformedData]);

    useEffect(() => {
        const uniqueTypeCodeAndDesc = getUniqueCheckTypeDescription(transformedData);
        setCheckTypeList(uniqueTypeCodeAndDesc);
    }, [transformedData])

    // When the clone button is clicked and values is set, this useEffect takes care of prepopulating
    // all the form fields with the values of the row that was selected
    useEffect(() => {
        if (!values)
            return;

        const { checkTypeCode, checkNumber, checkResultCode, orisCode,
            locations, reasonCode, severityCode, note, matchTimeTypeCode,
            matchTimeBeginValue, matchTimeEndValue, matchHistoricalIndicator } = values;

        // The onchange functions load the dropdown values and set the values for selectedCheckType and selectedCheckNumber
        onCheckTypeChange({ target: { value: checkTypeCode } });
        onCheckNumberChange({ target: { value: checkNumber } }, checkTypeCode);
        setSelectedCheckResult(checkResultCode);
        setSelectedFacility(orisCode);
        setSelectedReason(reasonCode);
        setSelectedSeverityCode(severityCode);
        setSelectedNotes(note);

        const checkResultObj = transformedData[checkTypeCode][checkNumber].find(r=>r.checkResult === checkResultCode);
        getLocations(orisCode, checkResultObj).then((availLoc)=>{
            setLocationData([...availLoc]);
            // split the locations coming from the table row
            const splitLocationList = locations?.split(",");
            if (splitLocationList) {
                splitLocationList.forEach(locName => {
                    const found = availLoc.find(datum => datum.id === locName);
                    if (found)
                        found.selected = true
                })
            }
    
        });

        // Match time values
        switch (matchTimeTypeCode) {
            case ("HISTIND"):
                setSelectedIsHistorical(matchHistoricalIndicator)
                break;
            case ("HOUR"):
                setSelectedBeginDate(matchTimeBeginValue ? formatDate(matchTimeBeginValue, "/") : undefined);
                setSelectedBeginHour(matchTimeBeginValue ? new Date(matchTimeBeginValue).getUTCHours() : undefined);
                setSelectedEndDate(matchTimeEndValue ? formatDate(matchTimeEndValue, "/") : undefined);
                setSelectedEndHour(matchTimeEndValue ? new Date(matchTimeEndValue).getUTCHours() : undefined);
                break;
            case ("DATE"):
                setSelectedBeginDate(matchTimeBeginValue ? formatDate(matchTimeBeginValue, "/") : undefined);
                setSelectedEndDate(matchTimeEndValue ? formatDate(matchTimeEndValue, "/") : undefined);
                break;
            case ("QUARTER"):
                const beginYearQuarter = matchTimeBeginValue ? `${new Date(matchTimeBeginValue).getUTCFullYear()} Q${getQuarter(new Date(matchTimeBeginValue), true)}` : undefined;
                setSelectedBeginQuarter(beginYearQuarter);
                const endYearQuarter = matchTimeEndValue ? `${new Date(matchTimeEndValue).getUTCFullYear()} Q${getQuarter(new Date(matchTimeEndValue), true)}` : undefined;
                setSelectedEndQuarter(endYearQuarter);
                break;
            default:
        }
    }, [values])

    // API Calls
    useEffect(() => {

        getSeverityCodes().then(({ data }) => {
            setSeverityCodeList(data);
        }).catch(error => {
            console.log("Error getting Severity Codes", error);
        });
    }, []);


    const saveFunc = () => {
        // Make api call here later on to save and create new ES
        // Might move this to ErrorSuppressionDataContainer and pass in as prop
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

    // Assuming user has chosen a value for Check Type, Check Number, and Check Result, 
    // this function finds and returns the checkCatalogResult object from transformedData.
    // Returns undefined if nothing is found.
    function findCheckResultObject() {
        if (!(selectedCheckType && selectedCheckNumber && selectedCheckResult))
            return;
        // the list of check catalog objects for the checkType and checkNumber selected
        const checkCatalogList = transformedData[selectedCheckType][selectedCheckNumber];
        return checkCatalogList.find(c => c.checkResult === selectedCheckResult);
    }

    const onCheckTypeChange = (e) => {
        const { value } = e.target;
        setSelectedCheckType(value);
        setSelectedCheckNumber(false);
        setSelectedCheckResult(false);

        if (value === false)
            return;
        const checkNumbers = Object.keys(transformedData[value]);
        setCheckNumberList(checkNumbers)
    }

    const onCheckNumberChange = (e, selCheckType) => {
        const { value } = e.target;
        setSelectedCheckNumber(value);
        setSelectedCheckResult(false);
        if (value === false)
            return;
        setCheckResultList(transformedData[selCheckType][value].map(d => d.checkResult))
    }

    const onCheckResultChange = (e) => {
        const { value } = e.target;
        setSelectedCheckResult(value);

        if (selectedCheckType && selectedCheckNumber && value) {
            const checkResultObj = transformedData[selectedCheckType][selectedCheckNumber].find(r=>r.checkResult === value)
            getLocations(selectedFacility, checkResultObj).then(availLoc=>{
                setLocationData([...availLoc])
            }).catch(err=>{
                console.log("error", err)
            });
        }
    };

    const onFacilityChange = (e) => {
        const { value } = e.target;
        setSelectedFacility(value);
        if (value === false) return;
        if (selectedCheckType && selectedCheckNumber && selectedCheckResult) {
            const checkResultObj = transformedData[selectedCheckType][selectedCheckNumber].find(r=>r.checkResult === selectedCheckResult)
            getLocations(value, checkResultObj).then(availLoc=>{
                setLocationData([...availLoc]);
            });
        }
    };

    return (
        <div>
            <Modal showDarkBg show={showModal} save={saveFunc} exitBTN={"Save and Close"} showSave title={"Add Error Suppression"} close={close} width={"1024px"}>
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
                                onChange={onCheckTypeChange}
                            >
                                <option value={false}>{defaultDropdownText}</option>
                                {checkTypeList.map((d) => <option key={d.checkTypeCode} value={d.checkTypeCode} data-testid={d.checkTypeCode}>{`${d.checkTypeDescription} (${d.checkTypeCode})`}</option>)}
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
                                onChange={(e) => onCheckNumberChange(e, selectedCheckType)}
                                disabled={!selectedCheckType}
                            >
                                <option value={false}>{defaultDropdownText}</option>
                                {checkNumberList.map((d) => <option key={d} value={d} data-testid={d}>{d}</option>)}
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
                                onChange={onCheckResultChange}
                                disabled={!selectedCheckType || !selectedCheckNumber}
                            >
                                <option value={false}>{defaultDropdownText}</option>
                                {checkResultList.map((d) => <option key={d} value={d} data-testid={d}>{d}</option>)}
                            </Dropdown>
                        </Grid>
                    </Grid>
                    <Grid row gap={2}>
                        <h3>Severity and Reason</h3>
                    </Grid>
                    <Grid row gap={2}>
                        <Grid col={5}>
                            <Label test-id={"add-severity-code"} htmlFor={"add-severity-code"}>
                                Type
                            </Label>
                            <Dropdown
                                id={"add-severity-code"}
                                name={"add-severity-code"}
                                epa-testid={"add-severity-code"}
                                data-testid={"add-severity-code"}
                                value={selectedSeverityCode}
                                onChange={(e) => setSelectedSeverityCode(e.target.value)}
                            >
                                <option value={false}>{defaultDropdownText}</option>
                                {severityCodeList.map((d) => (
                                    <option
                                        key={d.severityCode}
                                        value={d.severityCode}
                                        data-testid={d.severityCode}
                                    >
                                        {d.severityCode}
                                    </option>
                                ))}
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
                                onChange={(e) => setSelectedReason(e.target.value)}
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
                                onChange={onFacilityChange}
                            >
                                <option value={false}>{defaultDropdownText}</option>
                                {facilityList.map((d) => <option key={d.orisCode} value={d.orisCode} data-testid={d.orisCode}>{`${d.facilityName} (${d.orisCode})`}</option>)}
                            </Dropdown>
                        </Grid>
                        <Grid col={5}>
                            <MultiSelectCombobox
                                items={locationData}
                                label="Locations"
                                entity="es-locations-add"
                                searchBy="contains"
                                value={selectedLocations}
                                onChangeUpdate={onChangeOfLocationMultiSelect}
                                iconAlignRight={2}
                                disabled={
                                    !(
                                        selectedCheckType &&
                                        selectedCheckNumber &&
                                        selectedCheckResult &&
                                        selectedFacility
                                    )
                                }
                            ></MultiSelectCombobox>

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
                    {/* Only show the time criteria section if we determined a valid time type code */}
                    { showDateHour || showDate || showQuarter || showHistorical ? 
                    <Grid row gap={2}>
                        <h3>Time Criteria</h3>
                    </Grid> : null}

                    {/* HOUR */}
                    {showDateHour ?
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
                                    defaultValue={values?.matchTimeBeginValue}
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
                                    onChange={(e) => setSelectedBeginHour(e.target.value)}
                                >
                                    {hoursInADay.map((h, i) =>
                                        <option key={i}>{h}</option>
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
                                    defaultValue={values?.matchTimeEndValue}
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
                                    onChange={(e) => setSelectedEndHour(e.target.value)}
                                >
                                    {hoursInADay.map((h, i) =>
                                        <option key={i}>{h}</option>
                                    )}
                                </Dropdown>
                            </Grid>
                        </Grid> : null}

                    {/* DATE */}
                    {showDate ?
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
                                    defaultValue={values?.matchTimeBeginValue}
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
                                    defaultValue={values?.matchTimeEndValue}
                                />
                            </Grid>
                        </Grid> : null}

                    {/* HISTIND */}
                    {showHistorical ?
                        <Grid row gap={2}>
                            <Grid col={3}>
                                <Checkbox
                                    id="add-is-historical"
                                    name="add-is-historical"
                                    label="Historical"
                                    checked={selectedIsHistorical}
                                    value={selectedIsHistorical}
                                    onChange={() =>
                                        setSelectedIsHistorical((previousVal) => !previousVal)
                                    }
                                />
                            </Grid>
                        </Grid> : null}

                    {/* QUARTER */}
                    {showQuarter ?
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
                                    onChange={(e) => setSelectedBeginQuarter(e.target.value)}
                                >
                                    {yearQuarters.map((yearquarter, i) =>
                                        <option key={i} value={yearquarter}>{yearquarter}</option>
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
                                    onChange={(e) => setSelectedEndQuarter(e.target.value)}
                                >
                                    {yearQuarters.map((yearquarter, i) =>
                                        <option key={i} value={yearquarter}>{yearquarter}</option>
                                    )}
                                </Dropdown>
                            </Grid>
                        </Grid> : null}

                    <Grid row gap={2}>
                        <Grid col={10}>
                            <Label htmlFor="add-notes" id="add-notes-label">Notes</Label>
                            <TextInput className="maxw-full" id="add-notes" name="add-notes" type="text" value={selectedNotes} onChange={(e) => { setSelectedNotes(e.target.value) }} />
                        </Grid>
                    </Grid>
                </GridContainer>
            </Modal>
        </div>
    )
}