import React, { useState, useEffect } from "react";
import {
  getActiveConfigurations,
  getInActiveConfigurations,
} from "../../utils/selectors/monitoringConfigurations";
import { Label, Dropdown, FormGroup, Checkbox } from "@trussworks/react-uswds";
import { connect } from "react-redux";
import {
  setConfigurationSelectionState,
  setSectionSelectionState,
  setLocationSelectionState,
  setInactiveToggle,
  setLocationsState,
} from "../../store/actions/dynamicFacilityTab";

import { setActiveTab } from "../../store/actions/activeTab";
const ConfigurationsDrop = ({
  caption,
  options,
  selectKey,

  showInactive = false,
  initialSelection,

  inactiveCheck,
  showInactiveHandler,

  hasActiveConfigs,
  orisCode,
  tabs,
  activeTab,
  setConfiguration,
  setLocations,
  setLocation,
}) => {
  // ISSUE RIGHT NOW IS SWITCHING BETWEEN TABS'
  // ACTIVE TAB DOESNT CHANGE RIGHT AWAY SO WHEN IT TRIES TO FIND A MONITORINGPLAN WITH A
  //HIGH CONFIGURATION, IT THINKS OF THE PREVIOUS TAB WITH A LOW LENGTH CONFIGURATION
  // AND GIVES ERROR
  const getIndex = (val) => {
    return options.findIndex((obj) => obj.id === val);
  };

  const getMPIndex = (val) => {
    if (tabs[activeTab[0]].monitoringPlans.length >= 1) {
      return tabs[activeTab[0]].monitoringPlans.findIndex(
        (obj) => obj.id === val
      );
    }
  };

  const [selectionState, setSelectionState] = useState(
    options.indexOf(
      tabs[activeTab[0]].monitoringPlans[tabs[activeTab].configuration]
    )
  );

  const handleChange = (val) => {
    setSelectionState(getIndex(val.target.value));
    setConfiguration(getMPIndex(val.target.value), orisCode);

    setLocations(
      tabs[activeTab[0]].monitoringPlans[getMPIndex(val.target.value)]
        .locations,
      orisCode
    );
    setLocation(
      [
        0,
        tabs[activeTab[0]].monitoringPlans[getMPIndex(val.target.value)]
          .locations[0].id,
      ],
      orisCode
    );
  };

  const populateOptions = (optionsList) => {
    return optionsList.map((info, index) => {
      return (
        <option key={info.id} value={info.id}>
          {info[selectKey]}
        </option>
      );
    });
  };

  useEffect(() => {
    const settingLocations = (index, flag) => {
      if (
        tabs[activeTab[0]].monitoringPlans.length >
        tabs[activeTab[0]].configuration
      ) {
        setLocations(
          tabs[activeTab[0]].monitoringPlans[index].locations,
          orisCode
        );
        if (flag){
        setLocation(
          [0, tabs[activeTab[0]].monitoringPlans[index].locations[0].id],
          orisCode
        );}
      }
    };
    // on a new tab rendering
    if (tabs[activeTab[0]].location[1] == 0) {
      if (hasActiveConfigs) {
        for (const x of tabs[activeTab[0]].monitoringPlans) {
          if (x.active) {
            setSelectionState(options.indexOf(x));
            setConfiguration(tabs[activeTab[0]].monitoringPlans.indexOf(x));
            settingLocations(tabs[activeTab[0]].monitoringPlans.indexOf(x),true);
            break;
          }
        }
      } else {
        setSelectionState(0);
        setConfiguration(0);
        console.log('got called in else ')
        settingLocations(0,true);
      }
    }
    // going back to previous tab
    else {
      setSelectionState(tabs[activeTab].configuration);
      if (
        tabs[activeTab[0]].monitoringPlans.length >
        tabs[activeTab[0]].configuration
      ) {
        setLocations(
          tabs[activeTab[0]].monitoringPlans[tabs[activeTab[0]].configuration].locations,
          orisCode
        );}
    }

  }, [tabs[activeTab[0]].monitoringPlans]);
  const checkBoxHandler = (evt) => {
    if (evt.target.checked) {
      showInactiveHandler(orisCode, true);
    } else {
      showInactiveHandler(orisCode, false);
    }
  };

  return (
    <div>
      {tabs[activeTab[0]].configuration <
      tabs[activeTab[0]].monitoringPlans.length ? (
        <div>
          <FormGroup className="margin-right-2 margin-bottom-1">
            <Label htmlFor={caption + initialSelection}>{caption}</Label>
            <Dropdown
              name={caption + initialSelection}
              value={
                tabs[activeTab[0]].monitoringPlans[
                  tabs[activeTab[0]].configuration
                ].id
              }
              id={orisCode}
              onChange={(e) => handleChange(e)}
            >
              {getActiveConfigurations(options).length > 0 && (
                <optgroup label="Active" role="optGroup">
                  {populateOptions(getActiveConfigurations(options))}
                </optgroup>
              )}
              {showInactive && getInActiveConfigurations(options).length > 0 && (
                <optgroup label="Inactive" role="optGroup">
                  {populateOptions(getInActiveConfigurations(options))}
                </optgroup>
              )}
            </Dropdown>
          </FormGroup>

          <div className="mpSelect showInactive">
            <Checkbox
              id={1}
              name="checkbox"
              label="Show Inactive"
              checked={inactiveCheck}
              disabled={!hasActiveConfigs}
              onChange={checkBoxHandler}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    tabs: state.openedFacilityTabs,

    activeTab: state.activeTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setConfiguration: (configuration, orisCode) =>
      dispatch(setConfigurationSelectionState(configuration, orisCode)),
    setLocation: (location, orisCode) =>
      dispatch(setLocationSelectionState(location, orisCode)),
    setSection: (section, orisCode) =>
      dispatch(setSectionSelectionState(section, orisCode)),
    setInactive: (orisCode, value) =>
      dispatch(setInactiveToggle(orisCode, value)),
    setActiveTab: (orisCode, value) => dispatch(setActiveTab(orisCode, value)),
    setLocations: (locations, orisCode) =>
      dispatch(setLocationsState(locations, orisCode)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationsDrop);
