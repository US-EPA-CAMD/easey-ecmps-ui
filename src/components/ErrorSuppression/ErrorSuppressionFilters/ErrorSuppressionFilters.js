import React, { useContext, useEffect, useState } from "react";
import { GridContainer, Grid, Label, Dropdown, DatePicker, ButtonGroup, Button, ComboBox } from "@trussworks/react-uswds";
import { ErrorSuppressionFiltersContext } from "../context/error-suppression-context";
import MultiSelectCombobox from "../../MultiSelectCombobox/MultiSelectCombobox";
import { getCheckCatalogResults, getReasonCodes } from "../../../utils/api/mdmApi";
import { getAllFacilities } from "../../../utils/api/facilityApi";
import { defaultDropdownText } from "../ErrorSuppression";
import { getMonitoringPlans } from "../../../utils/api/monitoringPlansApi";
import { addAriaLabelOnDatePickerCalendar } from "../../../additional-functions/ensure-508";

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

// Makes API call to get locations and then formats them to be in the way
// MultiSelectCombobox expects the items to look and calls setLocationData()
export const getLocations = (facilityValue, checkResultObj) => {
  return getMonitoringPlans(Number(facilityValue)).then(({ data }) => {
    const locations = data.map((f) => f.locations).flat(1);

    let availLoc = locations?.map((l) => ({
      id: l.id,
      label: l.unitId,
      selected: false,
      enabled: true,
    }));
    if (checkResultObj.locationTypeCode === "LOC") {
      const availStackPipe = locations?.map((l) => ({
        id: l.id,
        label: l.stackPipeId,
        selected: false,
        enabled: true,
      }));
      availLoc = [...availLoc, ...availStackPipe];
    }
    const locName = availLoc.map((l) => l.label);
    return availLoc
      .filter(({ label }, index) => !locName.includes(label, index + 1))
      .filter(({ label }) => label !== null)
      .sort((a, b) => a.label - b.label);
  });
};

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
    setReasonCode,
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
  const [selectedStatus, setSelectedStatus] = useState();
  const [selectedReason, setSelectedReason] = useState();
  const [selectedAddDateAfter, setSelectedAddDateAfter] = useState();
  const [selectedAddDateBefore, setSelectedAddDateBefore] = useState();
  const [locationData, setLocationData] = useState([]);

  const [dateAfterKey, setDateAfterKey] = useState(false);
  const [dateBeforeKey, setDateBeforeKey] = useState(false);

  // API check result data transformed
  // const [transformedData, setTransformedData] = useState([])

  // Make all api calls that only need to happen once on page load here
  useEffect(() => {
    getCheckCatalogResults().then(({ data }) => {
      const _transformedData = transformCheckResultData(data);
      const uniqueTypeCodeAndDesc = getUniqueCheckTypeDescription(_transformedData);

      setCheckTypeList(uniqueTypeCodeAndDesc);
      setTransformedData(_transformedData);
    }).catch(error => {
      console.error("Error getting Check Catalog Results", error);
    })

    getAllFacilities().then(({ data }) => {
      const formattedFacilities = data.map(f => ({ value: f.facilityRecordId, label: `${f.facilityName} (${f.facilityId})`, orisCode: f.facilityId }))
      setFacilityList(formattedFacilities);

      // The following lines of code are hacks to mitigate an issue with the ComboBox USWDS component.
      // BUG: When the page is initially loaded, clicking on the combobox only brings up an empty list.
      //      The data does not populate until the second click. The below code does the initial click
      //      on the ComboBox and then focuses away again. Tab is then reset to where it was when page
      //      initially loaded.
      const previouslyFocusedEle = document.activeElement;
      document.getElementById("facility-name").click();
      document.activeElement.blur();
      previouslyFocusedEle.tabIndex = 0;
      previouslyFocusedEle.focus();
      previouslyFocusedEle.tabIndex = -1;
    }).catch(error => {
      console.error("Error getting facilities", error)
    })

    getReasonCodes().then(({ data }) => {
      setReasonCodeList(data)
    }).catch(error => {
      console.error("Error getting reason codes", error)
    })

    return () => {
      setCheckTypeList([])
      setTransformedData([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(()=>{
    addAriaLabelOnDatePickerCalendar(["add-date-after","add-date-before"]);
  },[]);

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

  const onFacilityChange = (value) => {
    setSelectedFacility(value);
    if (!value || value === defaultDropdownText) {
      setSelectedLocations([]);
      setLocationData([]);
      return;
    }

    if (selectedCheckType && selectedCheckNumber && selectedCheckResult) {
      const checkResultObj = transformedData[selectedCheckType][selectedCheckNumber].find(r => r.checkResult === selectedCheckResult);
      const facility = facilityList.find(f => f.value === value);

      getLocations(facility.orisCode, checkResultObj).then(availLoc => setLocationData([...availLoc]));
    }
  };

  const onCheckTypeChange = (e) => {
    let { value } = e.target;
    value = value === "false" ? false : value;

    setSelectedCheckType(value);
    setSelectedCheckNumber(false);
    setSelectedCheckResult(false);
    if (!value)
      return;

    const checkNumbers = Object.keys(transformedData[value]);
    setCheckNumberList(checkNumbers);
    // reset location selections if there are any
    locationData.forEach(d => d.selected = false)

  }

  const onCheckNumberChange = (e) => {
    let { value } = e.target;
    value = value === "false" ? false : value;

    setSelectedCheckNumber(value);
    setSelectedCheckResult(false);

    if (!value)
      return;

    const checkResults = transformedData[selectedCheckType][value].map(d => d.checkResult);
    setCheckResultList(checkResults);

    // reset location selections if there are any
    locationData.forEach(d => d.selected = false)

  }

  const onCheckResultChange = (e) => {
    let { value } = e.target;
    value = value === "false" ? false : value;

    setSelectedCheckResult(value);
    if (!value) {
      setSelectedLocations([]);
      setLocationData([]);
      return;
    }

    const facility = facilityList.find(f => f.value === selectedFacility);

    if (selectedCheckType && selectedCheckNumber && value && facility) {
      const checkResultObj = transformedData[selectedCheckType][selectedCheckNumber].find(r => r.checkResult === value);

      getLocations(facility.orisCode, checkResultObj).then((availLoc) =>
        setLocationData([...availLoc])
      );
    }
  };

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

    // selectedFacility is the facility record id so we need to use it with facilityList to find the facility orisCode
    let orisCode = null;
    if (selectedFacility && selectedFacility !== defaultDropdownText)
      orisCode = facilityList.find(f => f.value === selectedFacility)?.orisCode;

    // selectedLocations is an array of location ids. For the creation API call, we actually need the unit/stack name which is the label of the MultiselectCombobox
    const unitStackNames = selectedLocations.map(selectedId => locationData.find(ld => ld.id === selectedId)?.label)
        .filter(loc => loc !== null && loc !== undefined) // just sanity checking

    //Apply the states from the form to the Context so that the table in ErrorSuppressionDataContainer will automatically update
    setCheckType(selectedCheckType !== defaultDropdownText ? selectedCheckType : null)
    setCheckNumber(selectedCheckNumber !== defaultDropdownText ? selectedCheckNumber : null)
    setCheckResult(selectedCheckResult !== defaultDropdownText ? selectedCheckResult : null)
    setFacility(orisCode)
    setLocations(unitStackNames)
    setActive(selectedStatus !== defaultDropdownText ? selectedStatus : null)
    setReasonCode(selectedReason !== defaultDropdownText ? selectedReason : null)
    setAddDateAfter(apiFormattedDateAfter)
    setAddDateBefore(apiFormattedDateBefore)
  }

  const clearFilters = () => {

    setCheckNumberList([]);
    setCheckResultList([]);
    setSelectedCheckType("");
    setSelectedCheckNumber("");
    setSelectedCheckResult("");
    setSelectedFacility("");
    setSelectedLocations([]);
    setLocationData([]);
    setSelectedStatus(null);
    setSelectedReason(null);
    setCheckType(null);
    setCheckNumber(null);
    setCheckResult(null);
    setFacility(null);
    setLocations(null);
    setActive(null);
    setReasonCode(null);
    setAddDateBefore(null);
    setSelectedAddDateAfter(null);
    setSelectedAddDateBefore(null);
    setDateAfterKey(k => !k)
    setDateBeforeKey(k => !k)

  };

  return (
    <GridContainer className="padding-left-0 margin-left-0 padding-right-0">
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
            <option value="false">{defaultDropdownText}</option>
            {checkTypeList.map((d) => (
              <option
                key={d.checkTypeCode}
                value={d.checkTypeCode}
                data-testid={d.checkTypeCode}
              >{`${d.checkTypeDescription} (${d.checkTypeCode})`}</option>
            ))}
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
              <option value="false">{defaultDropdownText}</option>
              {checkNumberList.map((d) => (
                <option key={d} value={d} data-testid={d}>
                  {d}
                </option>
              ))}
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
            onChange={onCheckResultChange}
            disabled={!selectedCheckType || !selectedCheckNumber}
          >
            <option value="false">{defaultDropdownText}</option>
            {checkResultList.map((d) => (
              <option key={d} value={d} data-testid={d}>
                {d}
              </option>
            ))}
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
          <ComboBox
            id="facility-name"
            name="facility-name"
            epa-testid={"facility-name"}
            data-testid={"facility-name"}
            options={facilityList}
            onChange={onFacilityChange}
            disableFiltering={false}
          />

        </Grid>
        <Grid col={4}>
          <div className="margin-left-2">
            <MultiSelectCombobox
              items={locationData}
              label="Location Name"
              entity="es-locations-filter"
              searchBy="contains"
              onChangeUpdate={onChangeOfLocationMultiSelect}
              disabled={
                !(
                  selectedCheckType &&
                  selectedCheckNumber &&
                  selectedCheckResult &&
                  selectedFacility &&
                  selectedFacility !== defaultDropdownText
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
      </Grid>
      <Grid row>
        <Grid col={3}>
          <Label test-id={"reason-label"} htmlFor={"reason"}>
            Status
          </Label>
          <Dropdown
            id={"status"}
            name={"status"}
            epa-testid={"status"}
            data-testid={"status"}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option>{defaultDropdownText}</option>
            {[{
              label: 'ACTIVE',
              value: true
            }, {
              label: 'INACTIVE',
              value: false
            }].map((d) => (
              <option
                key={d.label}
                value={d.value}
                data-testid={d.label}
              >
                {d.label}
              </option>
            ))}
          </Dropdown>
        </Grid>
        <Grid col={3} className="margin-left-2">
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
              </option>
            ))}
          </Dropdown>
        </Grid>
      </Grid>
      <Grid row className="margin-top-2">
        <Grid col={3}>
          <Label htmlFor="add-date-after" id="add-date-after-label">
            Add Date After
          </Label>
          <DatePicker
            key={`after-${dateAfterKey}`}
            aria-labelledby="add-date-after-label"
            id="add-date-after"
            name="add-date-after"
            value={selectedAddDateAfter}
            onChange={(date) => setSelectedAddDateAfter(date)}
          />
        </Grid>
        <Grid col={3}>
          <div className="margin-left-2">
            <Label htmlFor="add-date-before" id="add-date-before-label">
              Add Date Before
            </Label>
            <DatePicker
              key={`before-${dateBeforeKey}`}
              aria-labelledby="add-date-before-label"
              id="add-date-before"
              name="add-date-before"
              value={selectedAddDateBefore}
              onChange={(date) => setSelectedAddDateBefore(date)}
            />
          </div>
        </Grid>
        <Grid col={4}>
          <ButtonGroup type="default" className="float-right margin-top-3">
            <Button
              id="clearButton"
              type="button"
              data-testid={"clear-filters"}
              className="usa-button usa-button--outline"
              onClick={clearFilters}
            >
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
