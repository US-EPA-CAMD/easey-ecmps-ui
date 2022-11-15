import { Button, Fieldset, Radio } from "@trussworks/react-uswds";
import React, { useState, useRef, useEffect } from "react";
import MultiSelectCombobox from "../../MultiSelectCombobox/MultiSelectCombobox";
import { getMonitoringPlans } from "../../../utils/api/monitoringPlansApi";

const ReviewAndSubmitForm = ({ queryCallback, showModal }) => {
  const [availableFacilities, setAvailableFacilities] = useState([]);
  const [availableConfigState, setAvailableConfigState] = useState([]);

  const availableConfigurations = useRef([]);
  const selectedOrisCodes = useRef([]);

  const facilities = [
    {
      id: 3,
      facilityId: "3",
      facilityName: "Barry",
      stateCode: "AL",
    },
    {
      id: 5,
      facilityId: "5",
      facilityName: "Chickasaw",
      stateCode: "AL",
    },
    {
      id: 7,
      facilityId: "7",
      facilityName: "Gadsden",
      stateCode: "AL",
    },
    {
      id: 8,
      facilityId: "8",
      facilityName: "Gorgas",
      stateCode: "AL",
    },
    {
      id: 10,
      facilityId: "10",
      facilityName: "Greene County",
      stateCode: "AL",
    },
  ];

  useEffect(() => {
    const availFac = facilities.map((f) => ({
      id: f.facilityId,
      label: `${f.facilityName} (${f.facilityId})`,
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
      const key = cd.name.trim();
      if (!configNamesToMonPlan[key]) {
        configNamesToMonPlan[key] = cd.id;
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

  const radioButtons = [
    "Exclude Files with Critical Errors",
    "Include Files with Critical Errors",
  ];

  const comboboxStyling = {
    combobox: 'margin-bottom-2 bg-white multi-select-combobox',
    listbox:
      'list-box bg-white display-block height-15 width-full overflow-y-scroll overflow-x-hidden',
  };

  return (
    <div className="">
      <div className="text-black margin-top-1 display-none tablet:display-block">
        <h2 className="display-inline-block page-header margin-top-2">
          Review And Submit
        </h2>
      </div>
      <div className="container border-y-1px border-base-lighter padding-y-1">
        <Fieldset className="grid-row margin-y-2">
          {radioButtons.map((radio, i) => (
            <Radio
              className="grid-col-6 desktop:grid-col-12 margin-bottom-1"
              id={`${radio}-radio-button`}
              name="critical-errors-radio"
              label={radio}
              key={i}
            />
          ))}
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
                items={availableConfigState}
                styling={comboboxStyling}
                hideInput={true}
                entity={"Configurations"}
                label={"Configurations"}
                searchBy="label"
                onChangeUpdate={() => {}}
              />
            </div>
          </div>
          <div className="grid-col-3 desktop:grid-col-2 margin-top-2">
            <div className="margin-right-2">
              <MultiSelectCombobox
                items={[]}
                styling={comboboxStyling}
                hideInput={true}
                entity={"Reporting Period(s)"}
                label={"Reporting Period(s)"}
                searchBy="label"
                onChangeUpdate={(id, action) => {}}
              />
            </div>
          </div>
          <div className="buttons grid-col-9 desktop:grid-col-4">
            <div className="display-flex flex-row flex-justify-end desktop:flex-justify-center margin-top-5 margin-right-1">
              <Button onClick={applyFilters} outline={true}>
                Apply Filter(s)
              </Button>
              <Button
                onClick={() => {
                  showModal(true);
                }}
                disabled={false}
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
