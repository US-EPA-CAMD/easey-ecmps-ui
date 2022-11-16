import { Button, Fieldset, Radio } from "@trussworks/react-uswds";
import React, { useState, useRef, useEffect } from "react";
import MultiSelectCombobox from "../../MultiSelectCombobox/MultiSelectCombobox";
import { getMonitoringPlans } from "../../../utils/api/monitoringPlansApi";

const ReviewAndSubmitForm = ({
  facilities,
  queryCallback,
  showModal,
  setExcludeErrors,
}) => {
  const [availableFacilities, setAvailableFacilities] = useState([]);
  const [availableConfigState, setAvailableConfigState] = useState([]);

  const availableConfigurations = useRef([]);
  const selectedOrisCodes = useRef([]);

  useEffect(() => {
    const availFac = facilities.map((f) => ({
      id: f.id,
      label: `${f.facilityName} (${f.id})`,
      selected: false,
      enabled: true,
    }));
    setAvailableFacilities([...availFac]);
  }, []);

  const applyFilters = () => {
    const selectedEntries = availableConfigurations.current.filter((item) => {
      return item.selected;
    });

    let monPlanIds = [];
    if (selectedEntries) {
      monPlanIds = selectedEntries.map((entry) => entry.monPlanId);
    }

    queryCallback(selectedOrisCodes.current, monPlanIds, "");
  };

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

  const comboboxStyling = {
    combobox: "margin-bottom-2 bg-white multi-select-combobox",
    listbox:
      "list-box bg-white display-block height-15 width-full overflow-y-scroll overflow-x-hidden",
  };

  return (
    <div className="react-transition fade-in padding-x-3">
      <div className="text-black margin-top-1 display-none tablet:display-block">
        <h2 className="display-inline-block page-header margin-top-2">
          Review And Submit
        </h2>
      </div>
      <div className="container border-y-1px border-base-lighter padding-y-1">
        <Fieldset className="grid-row margin-y-2">
          <Radio
            className="grid-col-6 desktop:grid-col-12 margin-bottom-1"
            id={`0-radio-button`}
            defaultChecked
            name="critical-errors-radio"
            label={"Exclude Files with Critical Errors"}
            key={0}
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
                styling={comboboxStyling}
                hideInput={true}
                entity={"Facilities"}
                label={"Facilities"}
                searchBy="label"
                onChangeUpdate={facilityFilterChange}
              />
            </div>
          </div>
          <div className="grid-col-6 desktop:grid-col-3 margin-top-2">
            <div className="margin-right-2">
              <MultiSelectCombobox
                key={`configs-${availableConfigState.length}`}
                items={availableConfigurations.current}
                styling={comboboxStyling}
                hideInput={true}
                entity={"Configurations"}
                label={"Configurations"}
                searchBy="label"
                onChangeUpdate={configurationFilterChange}
              />
            </div>
          </div>
          <div className="grid-col-3 desktop:grid-col-2 margin-top-2">
            <div className="margin-right-2">
              <MultiSelectCombobox
                items={[]}
                styling={comboboxStyling}
                hideInput={true}
                entity={"Reporting Periods"}
                label={"Reporting Periods"}
                searchBy="label"
                onChangeUpdate={(id, action) => {}}
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
                disabled={true}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndSubmitForm;
