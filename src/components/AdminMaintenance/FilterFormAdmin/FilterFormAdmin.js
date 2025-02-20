import React, { useState, useEffect, useCallback } from "react";
import log from "loglevel";
import { getMonitoringPlans } from "../../../utils/api/monitoringPlansApi";
import {
  QA_CERT_DATA_MAINTENANCE_STORE_NAME,
  SUBMISSION_ACCESS_STORE_NAME,
} from "../../../additional-functions/system-admin-section-and-store-names";

import { getLocations } from "../../ErrorSuppression/ErrorSuppressionFilters/ErrorSuppressionFilters";
import { DropdownSelection } from "../../DropdownSelection/DropdownSelection";
import {
  Label,
  Button,
  Checkbox
} from "@trussworks/react-uswds";
import { ComboBox } from "../../ComboBox/ComboBox";
import {
  getEmSubmissionRecords,
  getQaTestMaintenanceRecords,
  getQaCertEventMaintenanceRecords,
  getQaExtensionExemptionMaintenanceRecords,
} from "../../../utils/api/adminManagementApi";
import { assignAriaSortHandlersToDatatable, assignAriaLabelsToDataTableColumns, removeAriaSortHandlersFromDatatable } from "../../../additional-functions/ensure-508"
import { addAriaLabelToDatatable } from "../../../additional-functions/ensure-508";
import useScreenSize from "../../../customHooks/useScreenSize/useScreenSize";

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
  const screenSize = useScreenSize();

  const [availableReportingPeriods, setAvailableReportingPeriods] = useState([
    initialSelectOption,
  ]);
  // const [availableFacilities, setAvailableFacilities] = useState([]);
  const [availStatus] = useState([
    initialSelectOption,
    { code: "Open", name: "Open" },
    { code: "Closed", name: "Closed" },
    { code: "Pending", name: "Pending Approval" },
    { code: "Cancelled", name: "Cancelled" },
    { code: "No_Window", name: "No Window" },
    { code: "Not_Yet_Open", name: "Not Yet Open" },
  ]);

  const [selectedReportingPeriod, setSelectedReportingPeriod] = useState();
  const [selectedFacility, setSelectedFacility] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState();

  const [typeSelection, setTypeSelection] = useState([]);

  const testTypeGroupOptions = [
    initialSelectOption,
    { code: testSummaryLabel, name: testSummaryLabel },
    { code: certEventLabel, name: certEventLabel },
    { code: testExtensionExemptionLabel, name: testExtensionExemptionLabel },
  ];

  const [includeHistoricalWindows, setIncludeHistoricalWindows] = useState(false);

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
    processReportingPeriods();
  }, [reportingPeriods, processReportingPeriods]);

  const applyFilters = useCallback(async () => {
    let monitorPlanId;
    let year;
    let quarter;
    let status;

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
        
        data.items.forEach((d) => (d.selected = false));

        //preprocess data to get the latest record for each config
        const latestOpenDateMap = new Map();
        data.items.forEach(record => {
            const location = record.locations;
            const openDate = new Date(record.openDate);

            if (!latestOpenDateMap.has(location) || openDate > latestOpenDateMap.get(location)) {
                latestOpenDateMap.set(location, openDate);
            }
        });
        data.items.forEach(record => {
            record.isLatestRecord = new Date(record.openDate).getTime() === latestOpenDateMap.get(record.locations).getTime();
        });

        const filteredData = includeHistoricalWindows ? data.items : data.items.filter(record => record.isLatestRecord);

        setTableData(filteredData);
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
            );
            break;
          case certEventLabel:
            resp = await getQaCertEventMaintenanceRecords(
              selectedFacility,
            );
            break;
          case testExtensionExemptionLabel:
            resp = await getQaExtensionExemptionMaintenanceRecords(
              selectedFacility,
            );
            break;
          default:
            return;
        }
        let newData = resp.data.items;
        if (facilities.length > 0) {
          newData = resp.data.items.map((obj) => ({
            ...obj,
            facilityName: `${facilities.find((fac) => fac.value === selectedFacility).label
              }`,
          }));
        }

        setTableData(newData);
      }
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
    section,
    selectedFacility,
    selectedReportingPeriod,
    selectedStatus,
    setIsTableDataLoading,
    setQaMaintenanceTypeSelection,
    setSelectedRows,
    setTableData,
    typeSelection,
    facilities,
    includeHistoricalWindows
  ]);

  useEffect(() => {
    if (reloadTableData) {
      removeAriaSortHandlersFromDatatable()
      applyFilters();
      setReloadTableData(false);
    }
  }, [reloadTableData, setReloadTableData, applyFilters]);

  const onFacilityChange = (value) => {
    setSelectedFacility(value);

    if (!value || value === defaultDropdownText) {
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
    setTypeSelection(null);
    setSelectedStatus(null);
    setTableData([]);
  }, [setTableData])

  useEffect(() => {
    clearFilters()
  }, [section, clearFilters]);

  useEffect(() => {
    setTableData([]);
  }, [setTableData, selectedFacility, selectedReportingPeriod, selectedStatus, typeSelection]);

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
          {section === QA_CERT_DATA_MAINTENANCE_STORE_NAME && screenSize.width >= 1400 && (
            <div className="margin-left-4 width-card">
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
          {section === SUBMISSION_ACCESS_STORE_NAME && screenSize.width >= 1400 &&(
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
            </>
          )}
        </div>
        <div className="display-flex flex-row desktop:flex-justify widescreen:flex-justify-end padding-2">
          {section === QA_CERT_DATA_MAINTENANCE_STORE_NAME && screenSize.width < 1400 && (
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
          )}
          {section === SUBMISSION_ACCESS_STORE_NAME && screenSize.width < 1400 &&(
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
                  (section === SUBMISSION_ACCESS_STORE_NAME
                    && ((selectedReportingPeriod && selectedReportingPeriod[1] !== defaultDropdownText) || selectedFacility ) // for EM Submission Access, need to have at least reporting period OR facility to enable the button
                  ) ||
                    (section === QA_CERT_DATA_MAINTENANCE_STORE_NAME
                      && selectedFacility
                      && typeSelection
                      && typeSelection[1] !== defaultDropdownText) // for QA Maintenance, need both facility and type to enable the button
                )
              }
              onClick={applyFilters}
              outline={false}
            >
              Apply Filter(s)
            </Button>
          </div>
          {section === SUBMISSION_ACCESS_STORE_NAME ? (
              <Checkbox
                id="force-re-evaluation"
                className="display-flex flex-row flex-justify-center"
                name="include-historical-windows"
                label="Include Historical Windows"
                epa-testid={"include-historical-windows"}
                data-testid={"include-historical-windows"}
                checked={includeHistoricalWindows}
                onChange={(e) => setIncludeHistoricalWindows(e.target.checked)}
                disabled={false}
              />
            ) : ("")}
        </div>

    </div>
  );
};

export default FilterFormAdmin;
