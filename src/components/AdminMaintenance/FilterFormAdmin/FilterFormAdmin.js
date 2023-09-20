import React, { useState, useEffect, useCallback } from "react";
import { getMonitoringPlans } from "../../../utils/api/monitoringPlansApi";
import {
  QA_CERT_DATA_MAINTENANCE_STORE_NAME,
  SUBMISSION_ACCESS_STORE_NAME,
} from "../../../additional-functions/system-admin-section-and-store-names";

import { getLocations } from "../../ErrorSuppression/ErrorSuppressionFilters/ErrorSuppressionFilters";
import { DropdownSelection } from "../../DropdownSelection/DropdownSelection";
import {
  GridContainer,
  Grid,
  Label,
  ComboBox,
  Button,
} from "@trussworks/react-uswds";
import {
  getEmSubmissionRecords,
  getQaTestMaintenanceRecords,
  getQaCertEventMaintenanceRecords,
  getQaExtensionExemptionMaintenanceRecords,
} from "../../../utils/api/adminManagementApi";
import { assignAriaSortHandlersToDatatable, assignAriaLabelsToDataTableColumns, removeAriaSortHandlersFromDatatable } from "../../../additional-functions/ensure-508"

export const testSummaryLabel = "Test Summary";
export const certEventLabel = "Cert Events";
export const testExtensionExemptionLabel = "Test Extension Exemption";

const defaultDropdownText = "Select";
const initialSelectOption = { code: "", name: defaultDropdownText };

const FilterFormAdmin = ({
  facilities,
  section,
  setTableData,
  setIsTableDataLoading,
  reloadTableData,
  setReloadTableData,
  setSelectedRows,
  reportingPeriods,
  setQaMaintenanceTypeSelection,
}) => {
  const [availableReportingPeriods, setAvailableReportingPeriods] = useState([
    initialSelectOption,
  ]);
  // const [availableFacilities, setAvailableFacilities] = useState([]);
  const [availableConfigurations, setAvailableConfigurations] = useState([
    initialSelectOption,
  ]);

  const [availStatus] = useState([
    initialSelectOption,
    { code: "Open", name: "Open" },
    { code: "Closed", name: "Closed" },
    { code: "Pending", name: "Pending Approval" },
  ]);

  const [selectedReportingPeriod, setSelectedReportingPeriod] = useState();
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState();

  const [typeSelection, setTypeSelection] = useState([]);

  const testTypeGroupOptions = [
    initialSelectOption,
    { code: testSummaryLabel, name: testSummaryLabel },
    { code: certEventLabel, name: certEventLabel },
    { code: testExtensionExemptionLabel, name: testExtensionExemptionLabel },
  ];

  const processReportingPeriods = useCallback(async () => {
    const availReportingPeriods = reportingPeriods.map((rp) => {
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
    processReportingPeriods();
  }, [reportingPeriods, processReportingPeriods]);

  const applyFilters = useCallback(async () => {
    let monitorPlanId;
    let year;
    let quarter;
    let status;

    if (selectedLocation) {
      const locationIdx = selectedLocation[0];
      monitorPlanId = availableConfigurations[locationIdx].code;
    }

    if (
      selectedReportingPeriod?.length > 0 &&
      selectedReportingPeriod[1] !== ''
    ) {
      const rpString = selectedReportingPeriod[1];
      year = rpString.split(" ")[0];
      quarter = rpString.slice(-1);
    }

    if (
      selectedStatus?.length > 0 &&
      selectedStatus[1] !== ''
    ) {
      status = selectedStatus[1].toUpperCase();
    }

    setIsTableDataLoading(true);
    try {
      if (section === SUBMISSION_ACCESS_STORE_NAME) {
        const { data } = await getEmSubmissionRecords(
          selectedFacility,
          monitorPlanId,
          year,
          quarter,
          status
        );
        data.forEach((d) => (d.selected = false));
        setTableData(data);
      }

      if (section === QA_CERT_DATA_MAINTENANCE_STORE_NAME) {
        // typeSelection is array of form [index, description]
        const typeLabel = typeSelection?.[1];
        setQaMaintenanceTypeSelection(typeLabel);
        let resp;
        switch (typeLabel) {
          case testSummaryLabel:
            resp = await getQaTestMaintenanceRecords(
              selectedFacility,
              selectedLocation[1]
            );

            break;
          case certEventLabel:
            resp = await getQaCertEventMaintenanceRecords(
              selectedFacility,
              selectedLocation[1]
            );

            break;
          case testExtensionExemptionLabel:
            resp = await getQaExtensionExemptionMaintenanceRecords(
              selectedFacility,
              selectedLocation[1]
            );
            break;
          default:
            return;
        }
        let newData = resp.data;
        if (facilities.length > 0) {
          newData = resp.data.map((obj) => ({
            ...obj,
            facilityName: `${facilities.find((fac) => fac.value === selectedFacility).label
              }`,
          }));
        }

        setTableData(newData);
      }

      assignAriaSortHandlersToDatatable()
      assignAriaLabelsToDataTableColumns()
    } catch (e) {
      console.error(e);
    } finally {
      setIsTableDataLoading(false);
      setSelectedRows([]);
    }
  }, [
    availableConfigurations,
    section,
    selectedFacility,
    selectedLocation,
    selectedReportingPeriod,
    selectedStatus,
    setIsTableDataLoading,
    setQaMaintenanceTypeSelection,
    setSelectedRows,
    setTableData,
    typeSelection,
    facilities
  ]);

  useEffect(() => {
    if (reloadTableData) {
      removeAriaSortHandlersFromDatatable()
      applyFilters();
      setReloadTableData(false);
    }
  }, [reloadTableData, setReloadTableData, applyFilters]);

  const configurationFilterChange = (id) => {
    setSelectedLocation(id);
  };

  const facilityFilterChange = async (id) => {
    const configurationData = (await getMonitoringPlans([id])).data;
    const configNamesToMonPlan = [];
    for (const cd of configurationData) {
      if (cd.active) {
        const key = `${cd.facilityName} - ${cd.name}`;
        if (!configNamesToMonPlan[key]) {
          configNamesToMonPlan[key] = cd.id;
        }
      }
    }
    const availConfigs = [];
    for (const [name, monPlanId] of Object.entries(configNamesToMonPlan)) {
      availConfigs.push({
        code: monPlanId,
        name: name,
      });
    }
    availConfigs.unshift(initialSelectOption);
    setAvailableConfigurations(availConfigs);
  };

  const convertingArrayObject = (arr) => {
    const convertedArray = arr.map((item) => {
      return {
        code: item.label,
        name: item.label,
      };
    });

    convertedArray.unshift(initialSelectOption);
    return convertedArray;
  };

  const individualFacilityFilterChange = useCallback(async (id) => {
    getLocations(selectedFacility, {
      locationTypeCode: "LOC",
    }).then((availLoc) =>
      setAvailableConfigurations(convertingArrayObject([...availLoc]))
    );
  }, [selectedFacility])

  useEffect(() => {
    section === SUBMISSION_ACCESS_STORE_NAME
      ? facilityFilterChange(selectedFacility)
      : individualFacilityFilterChange(selectedFacility);
  }, [selectedFacility, individualFacilityFilterChange, section]);
  const onFacilityChange = (value) => {
    setSelectedFacility(value);
    // facilityFilterChange(value);

    if (!value || value === defaultDropdownText) {
      setSelectedFacility(null);
      setSelectedLocation(null);
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
    setTypeSelection(null);
    setSelectedLocation(null);
    setSelectedStatus(null);
    setTableData([]);
  }, [setTableData])

  useEffect(() => {
    clearFilters()
  }, [section, clearFilters]);

  useEffect(() => {
    setTableData([]);
  }, [setTableData, selectedFacility, selectedLocation, selectedReportingPeriod, selectedStatus, typeSelection]);

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

          <div className="padding-left-4 desktop:width-mobile-lg desktop-lg:width-mobile">
            <DropdownSelection
              caption={
                section === SUBMISSION_ACCESS_STORE_NAME
                  ? "Configuration"
                  : "Location"
              }
              selectionHandler={configurationFilterChange}
              options={availableConfigurations}
              viewKey="name"
              selectKey="code"
              initialSelection={selectedLocation ? selectedLocation[0] : 0}
              workspaceSection={section}
              extraSpace
            />
          </div>
        
          {section === QA_CERT_DATA_MAINTENANCE_STORE_NAME && (
            <div className="margin-left-4 width-card display-none widescreen:display-flex">
              <DropdownSelection
                caption="Type"
                selectionHandler={setTypeSelection}
                options={testTypeGroupOptions}
                viewKey="name"
                selectKey="name"
                initialSelection={typeSelection ? typeSelection[0] : null}
                workspaceSection={section}
                extraSpace
              />
            </div>

          )}
    
          {section === SUBMISSION_ACCESS_STORE_NAME && (
            <div className="display-none widescreen:display-flex">
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
              <div className="margin-left-4 width-card">
                <DropdownSelection
                  caption="Status"
                  selectionHandler={(option) => setSelectedStatus(option)}
                  options={availStatus}
                  viewKey="name"
                  selectKey="code"
                  initialSelection={selectedStatus ? selectedStatus[0] : null}
                  workspaceSection={section}
                  extraSpace
                />
              </div>
            </div>
          )}
        </div>
        <div className="display-flex flex-row desktop:flex-justify widescreen:flex-justify-end padding-2">
          {section === QA_CERT_DATA_MAINTENANCE_STORE_NAME && (
            <div className="widescreen:display-none desktop:display-flex">
              <div className="width-card">
                <DropdownSelection
                  caption="Type"
                  selectionHandler={setTypeSelection}
                  options={testTypeGroupOptions}
                  viewKey="name"
                  selectKey="name"
                  initialSelection={typeSelection ? typeSelection[0] : null}
                  workspaceSection={section}
                  extraSpace
                />
              </div>
            </div>
          )}

          {section === SUBMISSION_ACCESS_STORE_NAME && (
            <div className="widescreen:display-none desktop:display-flex">
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
              <div className="margin-left-4 width-card">
                <DropdownSelection
                  caption="Status"
                  selectionHandler={(option) => setSelectedStatus(option)}
                  options={availStatus}
                  viewKey="name"
                  selectKey="code"
                  initialSelection={selectedStatus ? selectedStatus[0] : null}
                  workspaceSection={section}
                  extraSpace
                />
              </div>
            </div>
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
                  (selectedFacility &&
                    selectedLocation && selectedLocation[1] !== "") &&
                  ((section === SUBMISSION_ACCESS_STORE_NAME) ||
                    (section === QA_CERT_DATA_MAINTENANCE_STORE_NAME
                      && typeSelection && typeSelection[1] !== defaultDropdownText))
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

export default FilterFormAdmin;
