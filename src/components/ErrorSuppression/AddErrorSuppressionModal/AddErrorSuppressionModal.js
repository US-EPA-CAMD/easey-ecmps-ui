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
import { getData as getMatchData } from "../../../utils/api/errorSuppressionApi";
import { getMonitoringPlans } from "../../../utils/api/monitoringPlansApi";
import { getQATestSummary } from "../../../utils/api/qaCertificationsAPI";

// The mdm api returns a data that looks different for each Data Type Code.
// The below function maps the correct description and code field for a 
// Data Type Code
const getMatchDataFieldNames = (dataTypeCode) => {
    let descriptionField;
    let codeField;

    switch (dataTypeCode) {
        case "CEPARAM":
            descriptionField = "controlEquipParamDescription";
            codeField = "controlEquipParamCode";
            break;
        case "COMPTYP":
            descriptionField = "componentTypeDescription";
            codeField = "componentTypeCode";
            break;
        case "FUELTYP":
            descriptionField = "fuelTypeDescription";
            codeField = "fuelTypeCode";
            break;
        case "PROGRAM":
            descriptionField = "programDescription";
            codeField = "programCode";
            break;
        case "QUALTYP":
            descriptionField = "qualificationTypeDescription";
            codeField = "qualificationTypeCode";
            break;
        case "SYSTYP":
            descriptionField = "systemTypeDescription";
            codeField = "systemTypeCode";
            break;
        case "TESTTYP":
            descriptionField = "testTypeDescription";
            codeField = "testTypeCode";
            break;
        case "MATSPAR":
            descriptionField = "matsMethodParameterDescription";
            codeField = "matsMethodParameterCode";
            break;
        case "PARAM":
            descriptionField = "parameterDescription";
            codeField = "parameterCode";
            break;
        case "MONPLAN":
            descriptionField = "name";
            codeField = "id";
            break;
        case "TESTNUM":
            descriptionField = "testNumber";
            codeField = "testNumber";
            break;
    }

    return [codeField, descriptionField];
}
export const AddErrorSupressionModal = ({ showModal, close, values }) => {
    //console.log(values)
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
    const [matchDataList, setMatchDataList] = useState([]);

    // Selected form 
    const [selectedCheckType, setSelectedCheckType] = useState();
    const [selectedCheckNumber, setSelectedCheckNumber] = useState();
    const [selectedCheckResult, setSelectedCheckResult] = useState();
    const [selectedCheckResultObj, setSelectedCheckResultObj] = useState();
    const [selectedFacility, setSelectedFacility] = useState();
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedReason, setSelectedReason] = useState();
    const [selectedMatchDataType, setSelectedMatchDataType] = useState();
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
    const showDateHour = selectedCheckResultObj?.timeTypeCode === 'HOUR';
    const showDate = selectedCheckResultObj?.timeTypeCode === 'DATE';
    const showQuarter = selectedCheckResultObj?.timeTypeCode === 'QUARTER';
    const showHistorical = selectedCheckResultObj?.timeTypeCode === 'HISTIND';

    useEffect(() => {
        const uniqueTypeCodeAndDesc = getUniqueCheckTypeDescription(transformedData);
        setCheckTypeList(uniqueTypeCodeAndDesc);
    }, [transformedData])

    // When the clone button is clicked and values is set, this useEffect takes care of prepopulating
    // all the form fields with the values of the row that was selected
    useEffect(() => {
        if (!values)
            return;

        const { checkTypeCode, checkNumber, checkResultCode, orisCode, matchDataTypeCode,
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

        const checkResultObj = transformedData[checkTypeCode][checkNumber].find(r => r.checkResult === checkResultCode);
        setSelectedCheckResultObj(checkResultObj);

        getLocations(orisCode, checkResultObj).then((availLoc) => {
            // split the locations coming from the table row
            const splitLocationList = locations?.split(",");

            if (splitLocationList) {
                splitLocationList.forEach(locName => {
                    const found = availLoc.find(datum => datum.label === locName);
                    if (found)
                        found.selected = true
                })
            }

            setLocationData(availLoc);
            if( matchDataTypeCode === "TESTNUM"){
                createMatchTypeDropdownLists(checkResultObj, orisCode, availLoc.map(l=>l.id))
            }
        });

        if( matchDataTypeCode !== "TESTNUM"){
            createMatchTypeDropdownLists(checkResultObj, orisCode)
        }

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

    const createMatchTypeDropdownLists = (checkCatalogResult, orisCode, locations = []) => {
        const { dataTypeCode, dataTypeUrl, checkTypeCode, checkNumber } = checkCatalogResult;

        console.log(checkCatalogResult)
        console.log(orisCode)
        // sanity check
        if (!checkCatalogResult || !dataTypeUrl || !dataTypeCode || !checkTypeCode || !checkNumber)
            return;

        const [codeField, descriptionField] = getMatchDataFieldNames(dataTypeCode);
        // sanity check
        if (!codeField || !descriptionField)
            return;

        const processPromiseData = (data) => {
            console.log("match data")
            console.log(data);
            if (!data)
                return;
            // SPECIAL CASE - see ticket 4621
            if (dataTypeCode === "PARAM") {
                data = data.filter(d => d.checkTypeCode === checkTypeCode && d.checkNumber === checkNumber);
            }

            // The following creates a unique list of objects so something like [{label:1, value:1}, {label:1, value:1}] would become [{label:1, value:1}]
            const objStrList = data.map(d => (
                {
                    label: d[descriptionField],
                    value: d[codeField]
                }
            )).map( r=> JSON.stringify(r));
            
            const universalMatchDataList = Array.from(new Set(objStrList)).map( r=> JSON.parse(r))
            setMatchDataList(universalMatchDataList);
        }

        // SPECIAL CASE - see ticket 4621
        if (dataTypeCode === "MONPLAN") {

            if (!orisCode)
                return;

            getMonitoringPlans([orisCode], [], true).then(({ data }) => {
                processPromiseData(data)
            })
        }
        // SPECIAL CASE - see ticket 4621
        else if (dataTypeCode === "TESTNUM") {

            if (locations.length === 0){
                // removes all options from Match Data Dropdown
                processPromiseData([])
                return;
            }

            console.log("facility: ", orisCode)
            console.log("locations: ", locations)
            const promiseList = [];

            locations.forEach(l => {
                promiseList.push(getQATestSummary(l));
            })

            Promise.all(promiseList).then(responses=>{
                const data = responses.map(({data})=>data).flat();
                processPromiseData(data);
            })
        }
        else {
            const path = dataTypeUrl.split("/").slice(2).join();
            getMatchData(path).then(({ data }) => {
                processPromiseData(data)
            })
        }
    }

    const onChangeOfLocationMultiSelect = (id, changeType) => {
        const uniqueLocations = [
            ...new Set([...selectedLocations, id]),
        ];

        if (changeType === "add") {
            console.log("uniqueLocations")
            console.log(uniqueLocations)
            createMatchTypeDropdownLists(selectedCheckResultObj, selectedFacility, uniqueLocations)
            setSelectedLocations(uniqueLocations);
        }
        else if (changeType === "remove") {
            const selected = locationData.filter((l) => l.selected).map(l => l.id);
            createMatchTypeDropdownLists(selectedCheckResultObj, selectedFacility, selected)
            setSelectedLocations(selected);
        }
        else
            return;
    }

    const onCheckTypeChange = (e) => {
        let { value } = e.target;
        value = value === "false" ? false : value;

        setSelectedCheckType(value);
        setSelectedCheckNumber(false);
        setSelectedCheckResult(false);
        setSelectedCheckResultObj(null)
        if (!value)
            return;

        const checkNumbers = Object.keys(transformedData[value]);
        setCheckNumberList(checkNumbers)
        // reset location selections if there are any
        locationData.forEach(d => d.selected = false)
    }

    const onCheckNumberChange = (e, selCheckType) => {
        let { value } = e.target;
        value = value === "false" ? false : value;

        setSelectedCheckNumber(value);
        setSelectedCheckResult(false);
        setSelectedCheckResultObj(null);
        if (!value)
            return;
        setCheckResultList(transformedData[selCheckType][value].map(d => d.checkResult))
        // reset location selections if there are any
        locationData.forEach(d => d.selected = false)

    }

    const onCheckResultChange = (e) => {
        let { value } = e.target;
        value = value === "false" ? false : value;
        setSelectedCheckResult(value);

        // set the actual catalog result object
        const checkCatalogList = transformedData[selectedCheckType][selectedCheckNumber];
        const checkCatalogResult = checkCatalogList.find(c => c.checkResult === value);
        setSelectedCheckResultObj(checkCatalogResult);

        console.log("checkCatalogResult?.dataTypeUrl: " + checkCatalogResult?.dataTypeUrl)

        createMatchTypeDropdownLists(checkCatalogResult);

        if (selectedCheckType && selectedCheckNumber && value) {
            const checkResultObj = transformedData[selectedCheckType][selectedCheckNumber].find(r => r.checkResult === value)
            getLocations(selectedFacility, checkResultObj).then(availLoc => {
                setLocationData([...availLoc])
            }).catch(err => {
                console.log("error", err)
            });
        }
    };

    const onFacilityChange = (e) => {
        let { value } = e.target;
        value = value === "false" ? false : value;

        setSelectedFacility(value);
        if (!value) return;

        if (selectedCheckType && selectedCheckNumber && selectedCheckResult) {
            createMatchTypeDropdownLists(selectedCheckResultObj, value);
            const checkResultObj = transformedData[selectedCheckType][selectedCheckNumber].find(r => r.checkResult === selectedCheckResult)
            getLocations(value, checkResultObj).then(availLoc => {
                setLocationData([...availLoc]);
            });
        }
    };

    const onMatchDataTypeChange = (e) => {
        let { value } = e.target;
        value = value === "false" ? false : value;

        setSelectedMatchDataType(value);
    }

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
                                <option value={"false"} data-testid="add-check-type-reset">{defaultDropdownText}</option>
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
                                <option value={"false"} data-testid="add-check-number-reset">{defaultDropdownText}</option>
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
                                <option value={"false"} data-testid="add-check-result-reset">{defaultDropdownText}</option>
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
                                <option value={"false"}>{defaultDropdownText}</option>
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
                                <option value={"false"}>{defaultDropdownText}</option>
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
                                <option value={"false"}>{defaultDropdownText}</option>
                                {facilityList.map((d) => <option key={d.orisCode} value={d.orisCode} data-testid={d.orisCode}>{`${d.facilityName} (${d.orisCode})`}</option>)}
                            </Dropdown>
                        </Grid>
                        <Grid col={5}>
                            <MultiSelectCombobox
                                items={locationData}
                                label="Locations"
                                entity="es-locations-add"
                                searchBy="contains"
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
                    {selectedCheckResultObj ?
                        <Grid row gap={2}>
                            <Grid col={5}>
                                <Label test-id={"add-fuel-type"} htmlFor={"add-fuel-type"}>
                                    {selectedCheckResultObj.dataTypeLabel}
                                </Label>
                                <Dropdown
                                    id={"add-fuel-type"}
                                    name={"add-fuel-type"}
                                    epa-testid={"add-fuel-type"}
                                    data-testid={"add-fuel-type"}
                                    value={selectedMatchDataType}
                                    onChange={onMatchDataTypeChange}
                                >
                                    <option value={"false"}>{defaultDropdownText}</option>
                                    {
                                        matchDataList.map((d, i) => <option key={`${d.value}-${i}`} value={d.value}>{d.label}</option>)
                                    }
                                </Dropdown>
                            </Grid>
                        </Grid> : null
                    }

                    {/* Only show the time criteria section if we determined a valid time type code */}
                    {showDateHour || showDate || showQuarter || showHistorical ?
                        <Grid row gap={2}>
                            <h3>Time Criteria</h3>
                        </Grid> : null}

                    {/* HOUR */}
                    {showDateHour ?
                        <Grid row gap={2} data-testid={"time-type-code-hour"}>
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
                        <Grid row gap={2} data-testid={"time-type-code-date"}>
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
                        <Grid row gap={2} data-testid={"time-type-code-historical"}>
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
                        <Grid row gap={4} data-testid={"time-type-code-quarter"}>
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
                                    {yearQuarters.map((yearquarter) =>
                                        <option key={yearquarter} value={yearquarter}>{yearquarter}</option>
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
                                    {yearQuarters.map((yearquarter) =>
                                        <option key={yearquarter} value={yearquarter}>{yearquarter}</option>
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