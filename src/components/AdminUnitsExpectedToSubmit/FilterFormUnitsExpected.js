import React, { useState, useEffect, useCallback } from "react";
import { Label, Button } from "@trussworks/react-uswds";
import log from "loglevel";

import { ComboBox } from "../ComboBox/ComboBox";
import { DropdownSelection } from "../DropdownSelection/DropdownSelection";
import {
  addAriaLabelToDatatable,
  assignAriaSortHandlersToDatatable,
  assignAriaLabelsToDataTableColumns
} from "../../additional-functions/ensure-508";
import { sortReportingPeriodsDescending } from "../../utils/functions";
import { getUnitsExpectedToSubmit } from "../../utils/api/adminManagementApi";

const initialSelectOption = { code: "", name: "Select" };

const windowStatusOptions = [
  initialSelectOption,
  { code: "OPEN", name: "Open" },
  { code: "CLOSED", name: "Closed" },
  { code: "PENDING", name: "Pending" }
];

const FilterFormUnitsExpected = ({
  facilities,
  programs,
  states,
  reportingPeriods,
  setTableData,
  setIsTableDataLoading,
  setSelectedRows,
}) => {

  const [availableReportingPeriods, setAvailableReportingPeriods] = useState([initialSelectOption]);
  const [availablePrograms, setAvailablePrograms] = useState([initialSelectOption]);
  const [availableStates, setAvailableStates] = useState([initialSelectOption]);

  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedReportingPeriod, setSelectedReportingPeriod] = useState(null);
  const [selectedWindowStatus, setSelectedWindowStatus] = useState(null);


  useEffect(() => {
    const sortedPeriods = sortReportingPeriodsDescending(reportingPeriods);
    const availReportingPeriods = sortedPeriods?.map((rp) => ({
      code: rp.periodAbbreviation,
      name: rp.periodAbbreviation,
    })) || [];
    availReportingPeriods?.unshift(initialSelectOption);
    setAvailableReportingPeriods(availReportingPeriods);
  }, [reportingPeriods]);

  useEffect(() => {
    const programOptions = programs?.map((p) => ({
      code: p.programCode,
      name: `${p.programCode} - ${p.programDescription}`,
    })) || [];
    programOptions?.unshift(initialSelectOption);
    setAvailablePrograms(programOptions);
  }, [programs]);

  useEffect(() => {
    const stateOptions = states?.map((s) => ({
      code: s.stateCode,
      name: s.stateName,
    })) || [];
    stateOptions?.unshift(initialSelectOption);
    setAvailableStates(stateOptions);
  }, [states]);

  const applyFilters = useCallback(async () => {
    let year, quarter;
    setIsTableDataLoading(true);

    // Parse reporting period
    if (selectedReportingPeriod?.length > 0 && selectedReportingPeriod?.[1] !== '') {
      const rpString = selectedReportingPeriod?.[1];
      year = rpString?.split(" ")[0];
      quarter = rpString?.slice(-1);
    }

    try {
      const { data } = await getUnitsExpectedToSubmit(
        selectedFacility,
        selectedState?.[1],
        selectedProgram?.[1],
        selectedWindowStatus?.[1],
        year,
        quarter,
      );

      setTableData(data?.items || []);

      setTimeout(() => {
        addAriaLabelToDatatable();
      }, 500);

      assignAriaSortHandlersToDatatable();
      assignAriaLabelsToDataTableColumns();
    } catch (e) {
      log.error("Error fetching units expected to submit:", e);
      setTableData([]);
    } finally {
      setIsTableDataLoading(false);
      setSelectedRows([]);
    }
  }, [
    selectedFacility,
    selectedProgram,
    selectedReportingPeriod,
    selectedWindowStatus,
    setIsTableDataLoading,
    setSelectedRows,
    setTableData
  ]);

  const clearFilters = useCallback(() => {
    const elements = document.querySelectorAll('[data-testid="combo-box-clear-button"]');
    elements.forEach((element) => {
      element.click();
    });

    // Reset all state
    setSelectedFacility(null);
    setSelectedProgram(null);
    setSelectedState(null);
    setSelectedReportingPeriod(null);
    setSelectedWindowStatus(null);

    setTableData([]);
  }, [setTableData]);

  useEffect(() => {
    setTableData([]);
  }, [
    setTableData,
    selectedFacility,
    selectedProgram,
    selectedReportingPeriod,
    selectedWindowStatus
  ]);

  return (
    <div className="margin-05">
      <div className="display-flex flex-row flex-justify-start padding-2">
        <div className="desktop:width-mobile-lg desktop-lg:width-mobile">
          <Label htmlFor="facility-name">Facility Name/ID</Label>
          <ComboBox
            id="facility-name"
            name="facility-name"
            data-testid="facility-name"
            options={facilities}
            onChange={setSelectedFacility}
            disableFiltering={true}
          />
        </div>

        <div className="margin-left-2 width-card">
          <DropdownSelection
            caption="State"
            selectionHandler={setSelectedState}
            options={availableStates}
            viewKey="name"
            selectKey="code"
            initialSelection={selectedState ? selectedState[0] : null}
            extraSpace
          />
        </div>

        <div className="margin-left-2 width-card">
          <DropdownSelection
            caption="Program"
            selectionHandler={setSelectedProgram}
            options={availablePrograms}
            viewKey="name"
            selectKey="code"
            initialSelection={selectedProgram ? selectedProgram[0] : null}
            extraSpace
          />
        </div>

        <div className="margin-left-2 width-card">
          <DropdownSelection
            caption="Reporting Period"
            selectionHandler={setSelectedReportingPeriod}
            options={availableReportingPeriods}
            viewKey="name"
            selectKey="code"
            initialSelection={selectedReportingPeriod ? selectedReportingPeriod[0] : null}
            extraSpace
          />
        </div>
      </div>

      <div className="display-flex flex-row flex-justify-start padding-2">
        <div className="width-card">
          <DropdownSelection
            caption="Window Status"
            selectionHandler={setSelectedWindowStatus}
            options={windowStatusOptions}
            viewKey="name"
            selectKey="code"
            initialSelection={selectedWindowStatus ? selectedWindowStatus[0] : null}
            extraSpace
          />
        </div>
      </div>

      <div className="display-flex flex-row flex-justify-end padding-2">
        <div className="flex-align-self-end">
          <Button
            onClick={clearFilters}
            outline={true}
            className="margin-right-2"
          >
            Clear
          </Button>

          <Button
            disabled={
              !(
                selectedFacility &&
                selectedProgram &&
                selectedReportingPeriod 
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

export default FilterFormUnitsExpected;