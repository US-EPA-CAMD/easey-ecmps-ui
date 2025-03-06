import React, { useState, useEffect, useCallback } from "react";

import {
  Label,
  DatePicker,
  Button,
} from "@trussworks/react-uswds";
import log from "loglevel";

import { addAriaLabelOnDatePickerCalendar } from "../../additional-functions/ensure-508";

import { DropdownSelection } from "../DropdownSelection/DropdownSelection";
import { ComboBox } from "../ComboBox/ComboBox";
import {
  getSubmissionReportRecords
} from "../../utils/api/adminManagementApi";
import { assignAriaSortHandlersToDatatable, assignAriaLabelsToDataTableColumns, removeAriaSortHandlersFromDatatable } from "../../additional-functions/ensure-508"
import { addAriaLabelToDatatable } from "../../additional-functions/ensure-508";
import useScreenSize from "../../customHooks/useScreenSize/useScreenSize";


const defaultDropdownText = "Select";
const initialSelectOption = { code: "", name: defaultDropdownText };

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

  const [selectedAddDateAfter, setSelectedAddDateAfter] = useState();
  const [selectedAddDateBefore, setSelectedAddDateBefore] = useState();
  const [dateAfterKey, setDateAfterKey] = useState(false);
  const [dateBeforeKey, setDateBeforeKey] = useState(false);
  const [selectedReportingPeriod, setSelectedReportingPeriod] = useState();
  const [selectedFacility, setSelectedFacility] = useState(null);

  const [selectedSubmissionType, setSelectedSubmissionType] = useState();
  const [selectedSeverityLevel, setSelectedSeverityLevel] = useState();;

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
    let severityLevel;
    let apiFormattedDateAfter;
    let apiFormattedDateBefore;

    // Keep in the the below will convert the dates to UTC
    if (selectedAddDateAfter) {
      apiFormattedDateAfter = new Date(selectedAddDateAfter)
        .toISOString()
        .split("T")[0];
    }

    if (selectedAddDateBefore) {
      apiFormattedDateBefore = new Date(selectedAddDateBefore)
        .toISOString()
        .split("T")[0];
    }

    setIsTableDataLoading(true);

    if (
      selectedReportingPeriod?.length > 0 &&
      selectedReportingPeriod[1] !== ''
    ) {
      const rpString = selectedReportingPeriod[1];
      year = rpString.split(" ")[0];
      quarter = rpString.slice(-1);
    }

    if (
      selectedSubmissionType?.length > 0 &&
      selectedSubmissionType[1] !== ''
    ) {
      submissionType = selectedSubmissionType[1].toUpperCase();
    }

    if (
      selectedSeverityLevel?.length > 0 &&
      selectedSeverityLevel[1] !== ''
    ) {
      severityLevel = selectedSeverityLevel[1].toUpperCase();
    }

    try {
        const { data } = await getSubmissionReportRecords(
          selectedFacility,
          year,
          quarter,
          submissionType,
          severityLevel,
          apiFormattedDateBefore,
          apiFormattedDateAfter
        );

        setTableData(data);

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
    setIsTableDataLoading,
    setSelectedRows,
    setTableData,
    facilities
    ]);


  const onFacilityChange = (value) => {
    setSelectedFacility(value);

    if (!value) {
      setSelectedFacility(null);
    }
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
            <>
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
                  caption="Submission Type"
                  selectionHandler={(option) => setSelectedSubmissionType(option)}
                  options={submissionsType}
                  viewKey="name"
                  selectKey="code"
                  initialSelection={selectedSubmissionType ? selectedSubmissionType[0] : null}
                  extraSpace
                />
              </div>

            </>
        </div>

        <div className="display-flex flex-row flex-justify-start">
            <>
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
            </>
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
                  || selectedAddDateBefore
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
