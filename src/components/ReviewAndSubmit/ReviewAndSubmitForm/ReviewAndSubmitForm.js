import { Button, Fieldset, Radio } from "@trussworks/react-uswds";
import React, { useState, useRef, useEffect } from "react";
import MultiSelectCombobox from "../../MultiSelectCombobox/MultiSelectCombobox";
import { getMonitoringPlans } from "../../../utils/api/monitoringPlansApi";
import { getReportingPeriods } from "../../../utils/api/mdmApi";

const ReviewAndSubmitForm = ({
  facilities,
  queryCallback,
  showModal,
  setExcludeErrors,
  filesSelected,
}) => {
  const [availableReportingPeriods, setAvailableReportingPeriods] = useState(
    []
  );
  const [availableFacilities, setAvailableFacilities] = useState([]);
  const [availableConfigState, setAvailableConfigState] = useState([]);

  const availableConfigurations = useRef([]);
  const selectedOrisCodes = useRef([]);
  const selectedReportingPeriods = useRef([]);

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
    const availFac = facilities.map((f) => ({
      id: f.id,
      label: `${f.facilityName} (${f.id})`,
      selected: false,
      enabled: true,
    }));
    setAvailableFacilities([...availFac]);

    fetchReportingPeriods();
  }, []);

  const applyFilters = () => {
    const selectedEntries = availableConfigurations.current.filter((item) => {
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

  async function configurationFilterChange(id, action) {
    const objectEntry = availableConfigurations.current.find(
      (item) => item.id === id
    );
    if (objectEntry) {
      if (action === "add") {
        objectEntry.selected = true;
      } else {
        objectEntry.selected = false;
      }
    }
  }

  async function facilityFilterChange(id, action) {
    id = id.toString();

    let newState;
    if (action === "add") {
      newState = [...selectedOrisCodes.current, id];
    } else {
      newState = [];
      selectedOrisCodes.current.forEach((item) => {
        if (item !== id) {
          newState.push(item);
        }
      });
    }
    selectedOrisCodes.current = newState;

    const configurationData = (await getMonitoringPlans(newState)).data;

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
      const existingEntry = availableConfigurations.current.filter((item) => {
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
    availableConfigurations.current = availConfigs;
    setAvailableConfigState(availableConfigurations.current);
  }

  return (
    <div className="container border-y-1px border-base-lighter padding-y-1">
      <Fieldset className="grid-row margin-y-2">
        <Radio
          className="grid-col-6 desktop:grid-col-12 margin-bottom-1"
          id={`0-radio-button`}
          defaultChecked
          name="critical-errors-radio"
          label={"Exclude Files with Critical Errors"}
          key={0}
          data-testid="radio-exclude"
          onClick={() => {
            setExcludeErrors(true);
          }}
        />

        <Radio
          className="grid-col-6 desktop:grid-col-12 margin-bottom-1"
          id={`1-radio-button`}
          name="critical-errors-radio"
          label={"Include Files with Critical Errors"}
          key={1}
          data-testid="radio-include"
          onClick={() => {
            setExcludeErrors(false);
          }}
        />
      </Fieldset>
      <div className="dropdowns grid-row">
        <div className="grid-col-6 desktop:grid-col-3 margin-top-2">
          <div className="margin-right-2">
            <MultiSelectCombobox
              key={`facilities-${availableFacilities.length}`}
              items={availableFacilities}
              entity={"Facilities"}
              label={"Facilities"}
              searchBy="contains"
              onChangeUpdate={facilityFilterChange}
              autoFocus={false}
              iconAlignRight={3}
            />
          </div>
        </div>
        <div className="grid-col-6 desktop:grid-col-3 margin-top-2">
          <div className="margin-right-2">
            <MultiSelectCombobox
              key={`configs-${availableConfigState.length}`}
              items={availableConfigurations.current}
              entity={"Configurations"}
              label={"Configurations"}
              searchBy="contains"
              onChangeUpdate={configurationFilterChange}
              autoFocus={false}
              iconAlignRight={3}
            />
          </div>
        </div>
        <div className="grid-col-3 desktop:grid-col-2 margin-top-2">
          <div className="margin-right-2">
            <MultiSelectCombobox
              key={`periods-${availableReportingPeriods.length}`}
              items={availableReportingPeriods}
              entity={"Reporting-Periods"}
              label={"Reporting Periods"}
              searchBy="contains"
              onChangeUpdate={reportingPeriodFilterChange}
              autoFocus={false}
              iconAlignRight={3}
            />
          </div>
        </div>
        <div className="buttons grid-col-9 desktop:grid-col-4 padding-top-1">
          <div
            id="submit-button-group"
            className="display-flex flex-row flex-justify-end desktop:flex-justify-center margin-top-5 margin-right-1"
          >
            <Button
              disabled={availableConfigState.length === 0}
              onClick={applyFilters}
              outline={true}
            >
              Apply Filter(s)
            </Button>
            <Button
              onClick={() => {
                showModal(true);
              }}
              disabled={filesSelected === 0}
            >
              Sign & Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndSubmitForm;
