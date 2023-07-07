import React, { useState, useEffect, useCallback } from "react";
import { getMonitoringPlans } from "../../../utils/api/monitoringPlansApi";
import { getReportingPeriods } from "../../../utils/api/mdmApi";
import {
  QA_CERT_DATA_MAINTENANCE_STORE_NAME,
  SUBMISSION_ACCESS_STORE_NAME,
} from "../../../additional-functions/system-admin-section-and-store-names";
import { DropdownSelection } from "../../DropdownSelection/DropdownSelection";
import {
  getAllTestTypeGroupCodes,
} from "../../../utils/api/dataManagementApi";
import {
  GridContainer,
  Grid,
  Label,
  ComboBox,
  Button,
} from "@trussworks/react-uswds";
import { getEmSubmissionRecords } from "../../../utils/api/adminManagementApi";
import { getQaCertEventMaintenanceRecords, getQaExtensionExemptionMaintenanceRecords, getQaTestMaintenanceRecords } from "../../../utils/api/camdServices";
import { certEventLabel, testExtensionExemptionLabel, testSummaryLabel } from "../AdminMaintenance";

const FilterFormAdmin = ({
  facilities,
  section,
  setTableData,
  setIsTableDataLoading,
  reloadTableData,
  setReloadTableData,
  setSelectedRows,
  reportingPeriods,
  setQaMaintenanceTypeSelection
}) => {

  const defaultDropdownText = "Select";
  const initialSelectOption = { code: "", name: defaultDropdownText };
  const [availableReportingPeriods, setAvailableReportingPeriods] = useState([
    initialSelectOption
  ]);
  // const [availableFacilities, setAvailableFacilities] = useState([]);
  const [availableConfigurations, setAvailableConfigurations] = useState([
    initialSelectOption,
  ]);

  const [availStatus, setAvailStatus] = useState([
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
  ]

  const processReportingPeriods = async () => {
    const availReportingPeriods = reportingPeriods.map(rp => {
      return {
        code: rp.periodAbbreviation,
        name: rp.periodAbbreviation,
      }
    });
    const reversed = availReportingPeriods.sort().toReversed()
    reversed.unshift(initialSelectOption);

    setAvailableReportingPeriods(reversed);
  }

  useEffect(() => {
    processReportingPeriods();
  }, [reportingPeriods]);

  const applyFilters = useCallback(async () => {

    let monitorPlanId;
    let year;
    let quarter;
    let status;

    if (selectedLocation) {
      const locationIdx = selectedLocation[0];
      monitorPlanId = availableConfigurations[locationIdx].code;
    }

    if (selectedReportingPeriod?.length > 0 && selectedReportingPeriod[1] !== defaultDropdownText) {
      const rpString = selectedReportingPeriod[1];
      year = rpString.split(" ")[0];
      quarter = rpString.slice(-1);
    }

    if (selectedStatus?.length > 0 && selectedStatus[1] !== defaultDropdownText) {
      status = selectedStatus[1].toUpperCase()
    }

    setIsTableDataLoading(true)
    try {
      if (section === SUBMISSION_ACCESS_STORE_NAME) {
        const { data } = await getEmSubmissionRecords(selectedFacility, monitorPlanId, year, quarter, status);
        data.forEach((d) => (d.selected = false));
        setTableData(data);
      }

      if (section === QA_CERT_DATA_MAINTENANCE_STORE_NAME) {
        // typeSelection is array of form [index, description]
        const typeLabel = typeSelection?.[1]
        setQaMaintenanceTypeSelection(typeLabel)
        let resp
        switch (typeLabel) {
          case testSummaryLabel:
            // resp = await getQaTestMaintenanceRecords(selectedFacility)
            // TODO: remove dummy data
            resp = {
              data: [
                {
                  testSumId: "VMAEPHQAS1-89E7352373BA45D8B868B5D193329D50",
                  locationId: "1873",
                  orisCode: 3776,
                  unitStack: "51",
                  systemIdentifier: "51F",
                  componentIdentifier: 'componentIdentifier',
                  testNumber: "51F-Q3-2014-1",
                  gracePeriodIndicator: 'gracePeriodIndicator',
                  testTypeCode: "F2LCHK",
                  testReasonCode: "QA",
                  testResultCode: "FEW168H",
                  yearQuarter: "2014 Q3",
                  testDescription: 'testDescription',
                  beginDateTime: 'beginDateTime',
                  endDateTime: 'endDateTime',
                  testComment: 'testComment',
                  spanScaleCode: 'spanScaleCode',
                  injectionProtocolCode: 'injectionProtocolCode',
                  submissionAvailabilityCode: "UPDATED",
                  submissionAvailabilityDescription: "Updated on Host",
                  severityCode: 'severityCode',
                  severityDescription: 'severityDescription'
                }
              ]
            }
            break
          case certEventLabel:
            // resp = await getQaCertEventMaintenanceRecords(selectedFacility)
            resp = {
              data: [
                {
                  certEventId: 'certEventId',
                  locationId: 'locationId',
                  unitStack: 'unitStack',
                  systemIdentifier: 'systemIdentifier',
                  componentIdentifier: 'componentIdentifier',
                  certEventCode: 'certEventCode',
                  certEventDescription: 'certEventDescription',
                  eventDateTime: 'eventDateTime',
                  requiredTestCode: 'requiredTestCode',
                  requiredTestDescription: 'requiredTestDescription',
                  conditionalDateTime: 'conditionalDateTime',
                  lastCompletedDateTime: 'lastCompletedDateTime',
                  submissionAvailabilityCode: 'submissionAvailabilityCode',
                  submissionAvailabilityDescription: 'submissionAvailabilityDescription',
                  severityCode: 'severityCode',
                  severityDescription: 'severityDescription',
                }
              ]
            }
            break
          case testExtensionExemptionLabel:
            // resp = await getQaExtensionExemptionMaintenanceRecords(selectedFacility)
            resp = {
              data: [
                {
                  testExtensionExemptionId: 'testExtensionExemptionId',
                  locationId: 'locationId',
                  unitStack: 'unitStack',
                  systemIdentifier: 'systemIdentifier',
                  componentIdentifier: 'componentIdentifier',
                  fuelCode: 'fuelCode',
                  fuelDescription: 'fuelDescription',
                  extensionExemptionCode: 'extensionExemptionCode',
                  extensionExemptionDescription: 'extensionExemptionDescription',
                  hoursUsed: 'hoursUsed',
                  spanScaleCode: 'spanScaleCode',
                  submissionAvailabilityCode: 'submissionAvailabilityCode',
                  submissionAvailabilityDescription: 'submissionAvailabilityDescription',
                  severityCode: 'severityCode',
                  severityDescription: 'severityDescription',
                }
              ]
            }
            break
          default:
            return
        }
        setTableData(resp.data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsTableDataLoading(false);
      setSelectedRows([])
    }
  }, [availableConfigurations, section, selectedFacility, selectedLocation, selectedReportingPeriod, selectedStatus, setIsTableDataLoading, setQaMaintenanceTypeSelection, setSelectedRows, setTableData, typeSelection]);

  useEffect(() => {
    if (reloadTableData) {
      applyFilters()
      setReloadTableData(false)
    }
  }, [reloadTableData, setReloadTableData, applyFilters]);

  const configurationFilterChange = (id) => {
    setSelectedLocation(id);
  };

  const facilityFilterChange = async (id) => {
    const configurationData = (await getMonitoringPlans([id])).data
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

  const onFacilityChange = (value) => {
    setSelectedFacility(value);
    facilityFilterChange(value);

    if (!value || value === defaultDropdownText) {
      setSelectedFacility(null);
      setSelectedLocation(null);
    }
  };

  const clearFilters = () => {
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
  };

  return (
    <div className="container padding-y-1 ">
      <GridContainer className="padding-left-0 margin-left-0 padding-right-0">
        <Grid row>
          <Grid col={6}>
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
          </Grid>

          <Grid col={3}>
            <div className="margin-left-2 ">
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
          </Grid>
          {section === QA_CERT_DATA_MAINTENANCE_STORE_NAME &&
            <Grid col={3}>
              <div className="margin-left-3 ">
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
            </Grid>
          }
        </Grid>

        <Grid row className="margin-top-2">
          {section === SUBMISSION_ACCESS_STORE_NAME &&
            <>
              <Grid col={2}>
                <DropdownSelection
                  caption="Reporting Period"
                  selectionHandler={setSelectedReportingPeriod}
                  options={availableReportingPeriods}
                  viewKey="name"
                  selectKey="code"
                  initialSelection={selectedReportingPeriod ? selectedReportingPeriod[0] : null}
                  extraSpace
                />

              </Grid>
              <Grid col={3}>
                <div className="margin-left-2">
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
              </Grid>
            </>
          }
          <Grid col={4} className=" position-relative margin-top-3">
            <div
              className={
                section === SUBMISSION_ACCESS_STORE_NAME
                  ? "position-absolute right-0 bottom-0"
                  : " "
              }
            >
              <Button onClick={clearFilters} outline={true}>
                Clear
              </Button>

              <Button
                disabled={
                  false
                  // There is currently a BUG in the API where sending facility id does not return data so 
                  // commenting this out until that bug is fixed.
                  // !(
                  //   selectedFacility &&
                  //   selectedFacility[0] !== "" &&
                  //   selectedLocation &&
                  //   selectedLocation[0] !== "" &&
                  //   (section === SUBMISSION_ACCESS_STORE_NAME
                  //     ? selectedStatus && selectedStatus[0] !== ""
                  //     : true) &&
                  //   (section === QA_CERT_DATA_MAINTENANCE_STORE_NAME
                  //     ? typeSelection && typeSelection[0] !== ""
                  //     : true)
                  // )
                }
                onClick={applyFilters}
                outline={false}
              >
                Apply Filter(s)
              </Button>
            </div>
          </Grid>
        </Grid>
      </GridContainer>
    </div>
  );
};

export default FilterFormAdmin;
