import React, { useContext, useEffect, useState, } from "react";
import { GridContainer, Grid, Label, Dropdown, Checkbox, DatePicker, ButtonGroup, Button } from "@trussworks/react-uswds";
import { ErrorSuppressionFiltersContext } from "../context/error-suppression-context";
import MultiSelectCombobox from "../../MultiSelectCombobox/MultiSelectCombobox";
import { getCheckCatalogResults, getReasonCodes } from "../../../utils/api/mdmApi";
import { getAllFacilities } from "../../../utils/api/facilityApi";
import { defaultDropdownText } from "../ErrorSuppression";
import { getMonitoringPlans } from "../../../utils/api/monitoringPlansApi";

/**'
 * Transforms data from the api in the format of:
 * {
 *   checkTypeCode: {
 *      checkNumber: [objects from the api array with that exact checkTypeCode and checkTypeNumber]
 *  }
 * }
 * 
 * This is done so that we can access the check results by their check type code and check type number.
 */
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

// Takes a transformedData like in the shape described above and returns an array of objects with unique
// check types and descriptions. We need this to build the checkType dropdown.
export const getUniqueCheckTypeDescription = (transformedData) => {
    return Object.keys(transformedData)
        .map(ctCode => {
            const checkNumbers = Object.keys(transformedData[ctCode]);
            const { checkTypeDescription } = transformedData[ctCode][checkNumbers[0]][0];
            return {
                checkTypeDescription,
                checkTypeCode: ctCode
            }
        });
}

export const ErrorSuppressionFilters = () => {

    const ctxFilters = useContext(ErrorSuppressionFiltersContext);
    const {
        transformedData, setTransformedData,
        facilityList, setFacilityList,
        reasonCodeList, setReasonCodeList,
        setCheckType,
        setCheckNumber,
        setCheckResult,
        setFacility,
        setLocations,
        setActive,
        setReason,
        setAddDateAfter,
        setAddDateBefore,
    } = ctxFilters;

    // Dropdowns
    const [checkTypeList, setCheckTypeList] = useState([]);
    const [checkNumberList, setCheckNumberList] = useState([]);
    const [checkResultList, setCheckResultList] = useState([]);

    // Selection values
    const [selectedCheckType, setSelectedCheckType] = useState();
    const [selectedCheckNumber, setSelectedCheckNumber] = useState();
    const [selectedCheckResult, setSelectedCheckResult] = useState();
    const [selectedFacility, setSelectedFacility] = useState();
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedIsActive, setSelectedIsActive] = useState(false);
    const [selectedReason, setSelectedReason] = useState();
    const [selectedAddDateAfter, setSelectedAddDateAfter] = useState();
    const [selectedAddDateBefore, setSelectedAddDateBefore] = useState();
    const [locationData, setLocationData] = useState([]);

    // API check result data transformed
    // const [transformedData, setTransformedData] = useState([])

    // Make all api calls that only need to happen once on page load here
    useEffect(() => {

        getCheckCatalogResults().then(({ data }) => {
            const _transformedData = transformCheckResultData(data);
            const uniqueTypeCodeAndDesc = getUniqueCheckTypeDescription(_transformedData);

            setCheckTypeList(uniqueTypeCodeAndDesc);
            console.log(_transformedData)
            setTransformedData(_transformedData);
        }).catch(error => {
            console.error("Error getting Check Catalog Results", error);
        })

        getAllFacilities().then(({ data }) => {
            setFacilityList(data.map(f => ({ orisCode: f.facilityId, facilityName: f.facilityName })));
        }).catch(error => {
            console.error("Error getting facilities", error)
        })

        getReasonCodes().then(({ data }) => {
            setReasonCodeList(data)
        }).catch(error => {
            console.log("Error getting reason codes", error)
        })

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
   
    const onFacilityChange = (e) => {
      const { value } = e.target;
      setSelectedFacility(value);
      if (value === false) return;

      if (selectedCheckResult && selectedCheckNumber && selectedCheckResult) {
        const locationTypeCode = transformedData[selectedCheckType][
          selectedCheckNumber
        ]
          .filter((r) => r.checkResult === selectedCheckResult)
          .map((d) => d.locationTypeCode);

        getMonitoringPlans(Number(value)).then(({ data }) => {
          const locations = data.map((f) => f.locations).flat(1);
          let availLoc = locations?.map((l) => ({
            id: l.id,
            label: l.unitId,
            selected: false,
            enabled: true,
          }));
          if (locationTypeCode.includes("LOC")) {
            const availStackPipe = locations?.map((l) => ({
              id: l.id,
              label: l.stackPipeId,
              selected: false,
              enabled: true,
            }));
            availLoc = [...availLoc, ...availStackPipe];
          }
          const locName = availLoc.map((l) => l.label);
          availLoc = availLoc
            .filter(({ label }, index) => !locName.includes(label, index + 1))
            .filter(({ label }) => label !== null)
            .sort((a, b) => a.label - b.label);
          setLocationData([...availLoc]);
        });
      }
    };

    const onCheckTypeChange = (e) => {
        const { value } = e.target;
        setSelectedCheckType(value);
        setSelectedCheckNumber(false);
        setSelectedCheckResult(false);

        if (value === false)
            return;

        const checkNumbers = Object.keys(transformedData[value]);
        setCheckNumberList(checkNumbers);
    }

    const onCheckNumberChange = (e) => {
        const { value } = e.target;
        setSelectedCheckNumber(value);
        setSelectedCheckResult(false);

        if (value === false)
            return;

        const checkResults = transformedData[selectedCheckType][value].map(d => d.checkResult);
        setCheckResultList(checkResults)
    }

    const applyFilters = () => {
        let apiFormattedDateAfter;
        let apiFormattedDateBefore;

        // Keep in the the below will convert the dates to UTC
        if (selectedAddDateAfter) {
            apiFormattedDateAfter = new Date(selectedAddDateAfter).toISOString().split('T')[0]
        }

        if (selectedAddDateBefore) {
            apiFormattedDateBefore = new Date(selectedAddDateBefore).toISOString().split('T')[0];
        }

        //Apply the states from the form to the Context so that the table in ErrorSuppressionDataContainer will automatically update
        setCheckType(selectedCheckType !== defaultDropdownText ? selectedCheckType : null)
        setCheckNumber(selectedCheckNumber !== defaultDropdownText ? selectedCheckNumber : null)
        setCheckResult(selectedCheckResult !== defaultDropdownText ? selectedCheckResult : null)
        setFacility(selectedFacility !== defaultDropdownText ? selectedFacility : null)
        setLocations(selectedLocations)
        setActive(selectedIsActive)
        setReason(selectedReason !== defaultDropdownText ? selectedReason : null)
        setAddDateAfter(selectedAddDateAfter)
        setAddDateBefore(selectedAddDateBefore)

        console.log(selectedFacility)
        console.log(selectedFacility ? selectedFacility : null)
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
                        <option>{defaultDropdownText}</option>
                        {checkTypeList.map((d) => <option key={d.checkTypeCode} value={d.checkTypeCode} data-testid={d.checkTypeCode}>{`${d.checkTypeDescription} (${d.checkTypeCode})`}</option>)}
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
                            disabled={!selectedCheckType}
                        >
                            <option>{defaultDropdownText}</option>
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
                        disabled={!selectedCheckType || !selectedCheckNumber}
                    >
                        <option>{defaultDropdownText}</option>
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
              onChange={onFacilityChange}
            >
              <option value={false}>{defaultDropdownText}</option>
              {facilityList.map((d) => (
                <option
                  key={d.orisCode}
                  value={d.orisCode}
                  data-testid={d.orisCode}
                >{`${d.facilityName} (${d.orisCode})`}</option>
              ))}
            </Dropdown>
          </Grid>
          <Grid col={4}>
            <div className="margin-left-2">
              <MultiSelectCombobox
                items={locationData}
                label="Location Name"
                entity="locationName"
                searchBy="contains"
                value={selectedLocations}
                onChangeUpdate={onChangeOfLocationMultiSelect}
                disabled={
                  !(
                    selectedCheckType &&
                    selectedCheckNumber &&
                    selectedCheckResult &&
                    selectedFacility
                  )
                }
              ></MultiSelectCombobox>
            </div>
          </Grid>
        </Grid>
            <Grid row className="margin-top-4">
                <Grid col={3}>
                    <h3>Active, Reason & Add Date</h3>
                </Grid>
                <Grid col={3}>
                    <Checkbox
                        id="is-active"
                        data-testid="is-active"
                        name="is-active"
                        label="Active"
                        className="margin-top-2"
                        value={selectedIsActive}
                        onChange={() => setSelectedIsActive(previousVal => !previousVal)}
                    />
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
                        onChange={(e) => setSelectedReason(e.target.value)}
                    >
                        <option>{defaultDropdownText}</option>
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
                        onChange={(date) => setSelectedAddDateAfter(date)}
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
                            onChange={(date) => setSelectedAddDateBefore(date)}
                        />
                    </div>
                </Grid>
                <Grid col={4} >
                    <ButtonGroup type="default" className="float-right margin-top-3">
                        <Button type="button" className="usa-button usa-button--outline">
                            Clear
                        </Button>
                        <Button
                            type="button"
                            data-testid={"apply-filters"}
                            onClick={applyFilters}
                        >
                            Apply Filters
                        </Button>
                    </ButtonGroup>
                </Grid>

            </Grid>
        </GridContainer>
    );
}
