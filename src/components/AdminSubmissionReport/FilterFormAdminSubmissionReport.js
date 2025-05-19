import React, { useState, useEffect, useCallback } from "react";

import {
  Label,
  DatePicker,
  Button,
  Select
} from "@trussworks/react-uswds";
import log from "loglevel";

import { DropdownSelection } from "../DropdownSelection/DropdownSelection";
import { ComboBox } from "../ComboBox/ComboBox";
import {
  getSubmissionReportRecords
} from "../../utils/api/adminManagementApi";
import { addAriaLabelToDatatable, addAriaLabelOnDatePickerCalendar, assignAriaSortHandlersToDatatable, assignAriaLabelsToDataTableColumns } from "../../additional-functions/ensure-508"
import useScreenSize from "../../customHooks/useScreenSize/useScreenSize";
import MultiSelectCombobox from "../MultiSelectCombobox/MultiSelectCombobox";
import { getMonitoringPlans } from "../../utils/api/monitoringPlansApi";

const defaultDropdownText = "Select";
const initialSelectOption = { code: "", name: defaultDropdownText };


export const getLocations = (facilityValue, checkResultObj) => {
  return getMonitoringPlans(Number(facilityValue)).then(({ data }) => {
    const locations = data?.items?.map((f) => f.monitoringLocationData).flat(1);
    let availLoc = locations?.map((l) => ({
      id: l?.id,
      label: l?.unitId,
      selected: false,
      enabled: true,
    })) || [];
    if (checkResultObj.locationTypeCode === "LOC") {
      const availStackPipe = locations?.map((l) => ({
        id: l?.id,
        label: l?.stackPipeId,
        selected: false,
        enabled: true,
      })) || [];
      availLoc = [...availLoc, ...availStackPipe];
    }
    const locName = availLoc?.map((l) => l.label);
    return availLoc
      ?.filter(({ label }, index) => !locName.includes(label, index + 1))
      .filter(({ label }) => label !== null)
      .sort((a, b) => a.label - b.label);
  });
};

const FilterFormAdminSubmissionReport = ({
  facilities,
  setTableData,
  setIsTableDataLoading,
  setSelectedRows,
  reportingPeriods,
}) => {
  const screenSize = useScreenSize();

  const [availableReportingPeriods, setAvailableReportingPeriods] = useState([
    initialSelectOption,
  ]);
  const [submissionsType ] = useState([
    initialSelectOption,
    { code: "EM", name: "Emissions" },
    { code: "MP", name: "Monitor Plan" },
    { code: "QA", name: "Quality Assurance" },
    { code: "MATS", name: "MATS Data" },
  ]);

  const [severityLevel ] = useState([
    initialSelectOption,
    { code: "NONE", name: "No Errors" },
    { code: "ADMNOVR", name: "Administrative Override" },
    { code: "INFORM", name: "Informational Message" },
    { code: "NONCRIT", name: "Non-Critical Error" },
    { code: "FORGIVE", name: "Forgiven" },
    { code: "CRIT1", name: "Critical Error Level 1" },
    { code: "CRIT2", name: "Critical Error Level 2" },
    { code: "FATAL", name: "Fatal" },
    { code: "CRIT3", name: "Critical Error Level 3" },
  ]);

  const testType = ['7DAY',
        'APPE',
        'BCAL',
        'CYCLE',
        'DAHS',
        'DGFMCAL',
        'F2LCHK',
        'F2LREF',
        'FF2LBAS',
        'FF2LTST',
        'FFACC',
        'FFACCTT',
        'HGLINE',
        'HGSI3',
        'LEAK',
        'LINE',
        'MFMCAL',
        'ONOFF',
        'OTHER',
        'PEI',
        'PEMSACC',
        'QGA',
        'RATA',
        'TSCAL',
        'UNITDEF'];

    const [qADataType ] = useState([
    initialSelectOption,
    { code: "Test", name: "Test Summary" },
    { code: "Event", name: "Cert Events" },
    { code: "TEE", name: "Test Extension Exemption" },
  ] );

  const [selectedAddDateAfter, setSelectedAddDateAfter] = useState();
  const [selectedAddDateBefore, setSelectedAddDateBefore] = useState();
  const [dateAfterKey, setDateAfterKey] = useState(false);
  const [dateBeforeKey, setDateBeforeKey] = useState(false);
  const [selectedReportingPeriod, setSelectedReportingPeriod] = useState();
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [locationData, setLocationData] = useState([]);

  const [selectedSubmissionType, setSelectedSubmissionType] = useState();
  const [selectedSeverityLevel, setSelectedSeverityLevel] = useState();;
  const [selectedQADataType, setSelectedQADataType] = useState();
  const [selectedTestType, setSelectedTestType] = useState();

  addAriaLabelToDatatable();

  const processReportingPeriods = useCallback(async () => {
    const availReportingPeriods = reportingPeriods?.map((rp) => {
      return {
        code: rp.periodAbbreviation,
        name: rp.periodAbbreviation,
      };
    });

    const reversed = availReportingPeriods.sort().reverse();
    reversed.unshift(initialSelectOption);

    setAvailableReportingPeriods(reversed);
  }, [reportingPeriods])

   useEffect(() => {
      addAriaLabelOnDatePickerCalendar(["add-date-after", "add-date-before"]);
    }, []);

  useEffect(() => {
    processReportingPeriods();
  }, [reportingPeriods, processReportingPeriods]);

  const applyFilters = useCallback(async () => {
    let year;
    let quarter;
    let submissionType;
    let severityCode;
    let submissionFrom;
    let submissionTo;
    let qaDataType;
    let locations;
    let testType;

    // Keep in the the below will convert the dates to UTC
    if (selectedAddDateAfter) {
      submissionTo = new Date(selectedAddDateAfter)
        .toISOString()
        .split("T")[0];
    }

    if (selectedAddDateBefore) {
      submissionFrom = new Date(selectedAddDateBefore)
        .toISOString()
        .split("T")[0];
    }

    setIsTableDataLoading(true);

    if (
      selectedReportingPeriod?.length > 0 &&
      selectedReportingPeriod?.[1] !== ''
    ) {
      const rpString = selectedReportingPeriod?.[1];
      year = rpString?.split(" ")[0];
      quarter = rpString?.slice(-1);
    }

    if (
      selectedSubmissionType?.length > 0 &&
      selectedSubmissionType?.[1] !== ''
    ) {
      submissionType = selectedSubmissionType?.[1].toUpperCase();
    }

    if (
      selectedSeverityLevel?.length > 0 &&
      selectedSeverityLevel?.[1] !== ''
    ) {
      severityCode = selectedSeverityLevel?.[1].toUpperCase();
    }

     if (
      selectedQADataType?.length > 0 &&
      selectedQADataType?.[1] !== ''
    ) {
      qaDataType = selectedQADataType?.[1];
    }

     if (
      selectedTestType?.length > 0 &&
      selectedTestType?.[1] !== ''
    ) {
      testType = selectedTestType?.toUpperCase();
    }

     let labels = selectedLocations
      ?.map(
        (selectedId) => locationData.find((ld) => ld.id === selectedId)?.label
      )
      ?.filter((loc) => loc !== null && loc !== undefined);

    locations =
    labels && labels?.length > 0 ? labels?.join("|") : undefined;

    try {
        const { data } = await getSubmissionReportRecords(
          selectedFacility,
          year,
          quarter,
          severityCode,
          submissionType,
          submissionFrom,
          submissionTo,
          qaDataType,
          testType,
          locations
        );

      if(data)
            setTableData(data.items);
      else
            setTableData([]);

      setTimeout(() => {
        addAriaLabelToDatatable();
        }, 500);
      assignAriaSortHandlersToDatatable()
      assignAriaLabelsToDataTableColumns()
    } catch (e) {
      log.error(e);
    } finally {
      setIsTableDataLoading(false);
      setSelectedRows([]);
    }
  }, [
    selectedFacility,
    selectedReportingPeriod,
    selectedSubmissionType,
    selectedAddDateAfter,
    selectedAddDateBefore,
    selectedSeverityLevel,
    selectedQADataType,
    selectedLocations,
    selectedTestType,
    setIsTableDataLoading,
    setSelectedRows,
    setTableData,
    facilities
    ]);


  const onFacilityChange = (value) => {
    setSelectedFacility(value);
    if (!value || value === defaultDropdownText) {
      setSelectedFacility(null);
      setSelectedLocations([]);
      setLocationData([]);
      return;
      }

    const facility = facilities.find((f) => f.value === value);
    getLocations(facility.value, {
                locationTypeCode: "LOC",
                }).then((availLoc) =>
               {
                 setLocationData([...availLoc])
               }
    )};

    const onChangeOfLocationMultiSelect = (id, changeType) => {      
    const uniqueLocations = [...new Set([...selectedLocations, id])];

      if (changeType === "add") {
      setSelectedLocations(uniqueLocations);
      } else if (changeType === "remove") {
        const selected = locationData.filter((l) => l.selected).map((l) => l.id);
        setSelectedLocations(selected);
      } else return;
    };

    const handleChange = (val) => {
      if (!val.target.value || val.target.value === defaultDropdownText) {
      setSelectedTestType(null)
      return;
      }
    setSelectedTestType(val.target.value);
  };

  const clearFilters = useCallback(() => {
    const elements = document.querySelectorAll(
      '[data-testid="combo-box-clear-button"]'
    );
    elements.forEach((element) => {
      element.click();
    });
    setSelectedFacility(null);
    setSelectedReportingPeriod(null);
    setSelectedSubmissionType(null);
    setSelectedSeverityLevel(null);
    setSelectedQADataType(null);
    setSelectedTestType(null);
    setSelectedLocations([]);
    setLocationData([]);
    setSelectedAddDateAfter(null);
    setSelectedAddDateBefore(null);
    setDateAfterKey((k) => !k);
    setDateBeforeKey((k) => !k);
    setTableData([]);
  }, [setTableData])


  useEffect(() => {
    setTableData([]);
  }, [setTableData, selectedFacility, selectedReportingPeriod, selectedSubmissionType]);

  return (
    <div className="margin-05">
        <div className="display-flex flex-row flex-justify-start padding-2">
          <div className="desktop:width-mobile-lg desktop-lg:width-mobile">
            <Label test-id={"facility-name-label"} htmlFor={"facility-name"}>
              Facility Name/ID
            </Label>
            <ComboBox
              id="facility-name"
              name="facility-name"
              epa-testid={"facility-name"}
              data-testid={"facility-name"}
              options={facilities}
              onChange={onFacilityChange}
              disableFiltering={true}
            />
          </div>
        <div className="grid-col-4">
           <div className="margin-left-2">
            <MultiSelectCombobox
              items={locationData}
              label="Location Name"
              entity="es-locations-filter"
              searchBy="contains"
              onChangeUpdate={onChangeOfLocationMultiSelect}
              disabled={
                !(
                  selectedFacility
                )
              }
            ></MultiSelectCombobox>
          </div>
        </div>
         
          { screenSize.width >= 1400 &&(
            <>
              <div className="margin-left-4 width-card">
                <DropdownSelection
                  caption="Reporting Period"
                  selectionHandler={setSelectedReportingPeriod}
                  options={availableReportingPeriods}
                  viewKey="name"
                  selectKey="code"
                  initialSelection={
                    selectedReportingPeriod ? selectedReportingPeriod[0] : null
                  }
                  extraSpace
                />
              </div>

            </>
          )}
        </div>

        <div className="display-flex flex-row flex-justify-start">
              <div className="margin-left-2 width-card">
                <DropdownSelection
                  caption="Severity Level"
                  selectionHandler={(option) => setSelectedSeverityLevel(option)}
                  options={severityLevel}
                  viewKey="name"
                  selectKey="code"
                  initialSelection={selectedSeverityLevel ? selectedSeverityLevel[0] : null}
                  extraSpace
                />
              </div>
                <div className="margin-left-2 width-card">
                  <DropdownSelection
                    caption="QA Data Type"
                    selectionHandler={(option) => setSelectedQADataType(option)}
                    options={qADataType}
                    viewKey="name"
                    selectKey="code"
                    initialSelection={selectedQADataType ? selectedQADataType[0] : null}
                    extraSpace
                  />
                </div>

               <div className="margin-left-2 width-card">
                <div>
                <Label test-id='Test Type' htmlFor='Test Type'>
                Test Type
                </Label>
                <Select
                id='Test Type'
                name='Test Type'
                epa-testid='Test Type'
                data-testid='Test Type'
                value={selectedTestType
                ?selectedTestType: 'Select'}
                onChange={(e) => handleChange(e)}
                tabIndex={0}
                >
                <option value="Select">Select</option>
                {testType.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
                </Select>
              </div>
             </div>

              <div className="margin-left-2 width-card">
                <DropdownSelection
                  caption="Submission Type"
                  selectionHandler={(option) => setSelectedSubmissionType(option)}
                  options={submissionsType}
                  viewKey="name"
                  selectKey="code"
                  initialSelection={selectedSubmissionType ? selectedSubmissionType[0] : null}
                  extraSpace
                />
              </div>
        </div>

        <div className="display-flex flex-row flex-justify-start">
            <div className="margin-left-2 width-card margin-top-2">
                        <Label htmlFor="add-date-before" id="add-date-before-label">
                        Submission From
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

                      <div className="margin-left-2 width-card margin-top-2">
                          <Label htmlFor="add-date-after" id="add-date-after-label">
                          Submission To
                          </Label>
                           <DatePicker
                          key={`after-${dateAfterKey}`}
                          aria-labelledby="add-date-after-label"
                          id="add-date-after"
                          name="add-date-after"
                          value={selectedAddDateAfter}
                          onChange={(date) => setSelectedAddDateAfter(date)}
                        />
                      </div>
          </div>

        <div className="display-flex flex-row desktop:flex-justify widescreen:flex-justify-end padding-2">
          {screenSize.width < 1400 &&(
            <>
              <div className="width-card">
                <DropdownSelection
                  caption="Reporting Period"
                  selectionHandler={setSelectedReportingPeriod}
                  options={availableReportingPeriods}
                  viewKey="name"
                  selectKey="code"
                  initialSelection={
                    selectedReportingPeriod ? selectedReportingPeriod[0] : null
                  }
                  extraSpace
                />
              </div>
            </>
          )}
          <div className="flex-align-self-end">
            <Button 
              onClick={clearFilters} 
              outline={true}
            >
              Clear
            </Button>

            <Button
              disabled={
                !(
                  selectedFacility || selectedReportingPeriod || selectedSubmissionType 
                  || selectedSeverityLevel || selectedAddDateAfter
                  || selectedAddDateBefore || selectedQADataType || selectedLocations || selectedTestType
                  ) 
                 }
              onClick={applyFilters}
              outline={false}
            >
              Apply Filter(s)
            </Button>
          </div>
              
        </div>

    </div>
  );
};

export default FilterFormAdminSubmissionReport;
