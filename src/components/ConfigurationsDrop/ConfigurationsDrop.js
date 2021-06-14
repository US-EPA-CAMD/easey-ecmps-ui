import React, { useState, useEffect } from "react";
import {
  getActiveConfigurations,
  getInActiveConfigurations,
} from "../../utils/selectors/monitoringConfigurations";
import { Label, Dropdown, FormGroup, Checkbox } from "@trussworks/react-uswds";
import { connect } from "react-redux";
import {
  setConfigurationSelectionState,
  setLocationSelectionState,
  setLocationsState,
} from "../../store/actions/dynamicFacilityTab";

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
  monitoringPlans,
}) => {
  const populateOptions = (optionsList) => {
    return optionsList.map((info, index) => {
      return (
        <option key={info.id} value={info.id}>
          {info[selectKey]}
        </option>
      );
    });
  };

  const [selectionState, setSelectionState] = useState(
    tabs[activeTab[0]].configuration !== 0
      ? tabs[activeTab[0]].configuration
      : options[0].id
  );

  useEffect(() => {
    // on creation of a new tab
    if (tabs[activeTab[0]].configuration === 0) {
      setConfiguration(options[0].id, orisCode);
      // when the tab exists
    } else {

        if(options.length > 0){
      // on new tab render
      const optionsConID = options.findIndex(
        (obj) => obj.id === tabs[activeTab[0]].configuration
      );
      // depending on previous options of inactive/active, the first rendering values will be invalid
      // so reset back to valid vlaues
      if (optionsConID === -1) {

        setConfiguration(options[0].id, orisCode);
        const mpLocationsId = tabs[activeTab[0]].monitoringPlans.findIndex(
          (obj) => obj.id === options[0].id
        );
        if (mpLocationsId !== -1) {

          setLocations(
            tabs[activeTab[0]].monitoringPlans[mpLocationsId].locations,
            orisCode
          );
          setLocation(
            [
              0,
              tabs[activeTab[0]].monitoringPlans[mpLocationsId].locations[0].id,
            ],
            orisCode
          );
        }
      }else{
        const mpLocationsId = tabs[activeTab[0]].monitoringPlans.findIndex(
            (obj) => obj.id === options[optionsConID].id
          );

          if (mpLocationsId !== -1) {
            setLocations(
              tabs[activeTab[0]].monitoringPlans[mpLocationsId].locations,
              orisCode
            );
            setLocation(
              [
                tabs[activeTab[0]].location[0],
                tabs[activeTab[0]].monitoringPlans[mpLocationsId].locations[tabs[activeTab[0]].location[0]].id,
              ],
              orisCode
            );}
      }
    }}
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  useEffect(() => {
    setConfiguration(selectionState, orisCode);
    const mpLocationsId = tabs[activeTab[0]].monitoringPlans.findIndex(
      (obj) => obj.id === selectionState
    );
    if (mpLocationsId !== -1) {
      setLocations(
        tabs[activeTab[0]].monitoringPlans[mpLocationsId].locations,
        orisCode
      );
      setLocation(
        [0, tabs[activeTab[0]].monitoringPlans[mpLocationsId].locations[0].id],
        orisCode
      );
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectionState]);
  const handleChange = (val) => {
    setSelectionState(val.target.value);
  };
  const checkBoxHandler = (evt) => {
    if (evt.target.checked) {
      showInactiveHandler(orisCode, true);
    } else {
      showInactiveHandler(orisCode, false);
    }
  };

  return (
    <div>
      <div>
        <FormGroup className="margin-right-2 margin-bottom-1">
          <Label htmlFor={caption + initialSelection}>{caption}</Label>
          <Dropdown
            name={caption + initialSelection}
            value={selectionState}
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
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    tabs: state.openedFacilityTabs,
    activeTab: state.activeTab,
    monitoringPlans: state.monitoringPlans,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setConfiguration: (configuration, orisCode) =>
      dispatch(setConfigurationSelectionState(configuration, orisCode)),
    setLocation: (location, orisCode) =>
      dispatch(setLocationSelectionState(location, orisCode)),
    setLocations: (locations, orisCode) =>
      dispatch(setLocationsState(locations, orisCode)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationsDrop);
