import React, { useState, useRef, useEffect } from "react";
import { getMonitoringPlans } from "../../../../utils/api/monitoringPlansApi";
import { getReportingPeriods } from "../../../../utils/api/mdmApi";
import DropdownSelection from "../../../DropdownSelection/DropdownSelection";

import { getAllFacilities } from "../../../../utils/api/facilityApi";
import {
  GridContainer,
  Grid,
  Label,
  Dropdown,
  Checkbox,
  DatePicker,
  ButtonGroup,
  ComboBox,
  Button,
} from "@trussworks/react-uswds";
const FilterFormAdmin = ({
  facilities,
  queryCallback,
  showModal,
  setExcludeErrors,
  filesSelected,
  buttonText,
  filterClick,
}) => {
  const defaultDropdownText = "-- Select a value --";
  const [availableReportingPeriods, setAvailableReportingPeriods] = useState(
    []
  );
  const [availableFacilities, setAvailableFacilities] = useState([]);
  const [availableConfigState, setAvailableConfigState] = useState([]);

  const [availableConfigurations, setAvailableConfigurations] = useState([]);
  const selectedOrisCodes = useRef([]);
  const selectedReportingPeriods = useRef([]);

  const [availStatus, setAvailStatus] = useState([
    { value: "Open", label: "Open" },
    { value: "Closed", label: "Closed" },
    { value: "Pending", label: "Pending Approval" },
    { value: "all", label: "Show All" },
  ]);

  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [facility, setFacility] = useState([]);
  const [facilityList, setFacilityList] = useState([]);
  const [locations, setLocations] = useState([]);
  // Make all api calls that only need to happen once on page load here

  const [reset, setReset] = useState(false);

  async function fetchReportingPeriods() {
    const reportingPeriodList = (await getReportingPeriods()).data;

    const availReportingPeriods = [];

    for (let i = reportingPeriodList.length - 1; i >= 0; i--) {
      const period = reportingPeriodList[i];
      const objectMapping = {
        id: period.periodAbbreviation,
        label: period.periodAbbreviation,
        selected: false,
        enabled: true,
      };

      if (i === reportingPeriodList.length - 1) {
        objectMapping.selected = true;
        selectedReportingPeriods.current = [period.periodAbbreviation]; //Default selected reporting period
      }

      availReportingPeriods.push(objectMapping);
    }

    setAvailableReportingPeriods(availReportingPeriods);
  }

  useEffect(() => {
    fetchReportingPeriods();
  }, [facilities]);

  const applyFilters = () => {
    const selectedEntries = availableConfigurations.filter((item) => {
      return item.selected;
    });

    let monPlanIds = [];
    if (selectedEntries) {
      monPlanIds = selectedEntries.map((entry) => entry.monPlanId);
    }

    queryCallback(
      selectedOrisCodes.current,
      monPlanIds,
      selectedReportingPeriods.current
    );
  };

  async function reportingPeriodFilterChange(id, action) {
    let newState;
    if (action === "add") {
      newState = [...selectedReportingPeriods.current, id];
    } else {
      newState = [];
      selectedReportingPeriods.current.forEach((item) => {
        if (item !== id) {
          newState.push(item);
        }
      });
    }
    selectedReportingPeriods.current = newState;
  }

  const configurationFilterChange = (id) => {
    setSelectedLocation(id);
  };

  const facilityFilterChange = async (id) => {
    let newState = [id];
    const configurationData = newState.length
      ? (await getMonitoringPlans(newState)).data
      : [];

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
      //Remove existing configurations that not longer have a monitor plan associated, or keep current ones selected
      const existingEntry = availableConfigurations.filter((item) => {
        return item.selected && item.label === name;
      });
      let selected = false;
      if (existingEntry.length > 0) {
        selected = true;
      }

      availConfigs.push({
        id: name,
        label: name,
        selected: selected,
        enabled: true,
        monPlanId: monPlanId,
      });
    }
    setAvailableConfigurations(availConfigs);
    setAvailableConfigState(availableConfigurations);
  };

  const onFacilityChange = (value) => {
    setSelectedFacility(value);
    facilityFilterChange(value);

    if (!value || value === defaultDropdownText) {
      setSelectedFacility(null);
      setSelectedLocation(null);
      return;
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
    setSelectedLocation(null);
  };
  return (
    <div className="container border-y-1px border-base-lighter padding-y-1 ">
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

          <Grid col={4}>
            <div className="margin-left-2 ">
              <Label
                test-id={"configuration-name-label"}
                htmlFor={"configuration-name"}
              >
                Configurations
              </Label>
              <ComboBox
                id="configuration-name"
                name="configuration-name"
                epa-testid={"configuration-name"}
                data-testid={"configuration-name"}
                options={availableConfigurations}
                onChange={configurationFilterChange}
                disableFiltering={true}
              />
            </div>
          </Grid>
        </Grid>
        <Grid row className="margin-top-2">
          <Grid col={2}  >
            <Label
              test-id={"reporting-period-name-label"}
              htmlFor={"reporting-period-name"}
            >
              Reporting Period
            </Label>
            <ComboBox
              id="reporting-period-name"
              name="reporting-period-name"
              epa-testid={"reporting-period-name"}
              data-testid={"reporting-period-name"}
              options={availableReportingPeriods}
              onChange={reportingPeriodFilterChange}
              disableFiltering={true}
            />
          </Grid>
          <Grid col={3}>
            <div className="margin-left-2">
              <Label test-id={"status-name-label"} htmlFor={"status-name"}>
                Status
              </Label>
              <ComboBox
                id="status-name"
                name="status-name"
                epa-testid={"status-name"}
                data-testid={"status-name"}
                options={availStatus}
                onChange={(option) => setSelectedStatus(option)}
                disableFiltering={true}
              />
            </div>
          </Grid>
          <Grid col={4} className=" position-relative margin-top-3">
            <div className="position-absolute right-0 bottom-0">
            <Button
              //   disabled={availableConfigState.length === 0}
              onClick={clearFilters}
              outline={true}
            >
              Clear
            </Button>

            <Button
              disabled={!(selectedFacility && selectedStatus)}
              //   onClick={applyFilters}
              outline={false}
            >
              Apply Filter(s)
            </Button></div>
          </Grid>
        </Grid>
      </GridContainer>
    </div>
  );
};

export default FilterFormAdmin;
