import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import MonitoringPlanTabRender from "../MonitoringPlanTabRender/MonitoringPlanTabRender";

import { setActiveTab } from "../../store/actions/activeTab";
import {
  setSectionSelectionState,
  setLocationSelectionState,
  setCheckoutState
} from "../../store/actions/dynamicFacilityTab";
export const MonitoringPlanTab = ({
  orisCode,
  selectedConfig,
  title,
  locations,
  user,
  checkout,
  tabs,
  activeTab,
  setSection,
  setLocation,
  setCheckout
}) => {
  const [sectionSelect, setSectionSelect] = useState(tabs[activeTab].section);
  useEffect(() => {
    setSectionSelect(sectionSelect);
    setSection(sectionSelect, title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionSelect]);

  const [locationSelect, setLocationSelect] = useState(
    tabs[activeTab].location
  );

  useEffect(() => {
    setLocationSelect(locationSelect);
    setLocation(locationSelect, title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelect]);

  return (
    <div>
      <div>
        <MonitoringPlanTabRender
          title={title}
          orisCode={orisCode}
          selectedConfig={selectedConfig}
          sectionSelect={sectionSelect}
          setSectionSelect={setSectionSelect}
          locationSelect={locationSelect}
          setLocationSelect={setLocationSelect}
          locations={selectedConfig.locations}
          user={user}
          configID={tabs[activeTab[0]].selectedConfig.id}
          checkout={tabs[activeTab[0]].checkout}
          setCheckout={setCheckout}
        />
      </div>
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
    setLocation: (location, title) =>
      dispatch(setLocationSelectionState(location, title)),
    setSection: (section, title) =>
      dispatch(setSectionSelectionState(section, title)),
    setActiveTab: (orisCode, value) => dispatch(setActiveTab(orisCode, value)),
    
    setCheckout: (value, orisCode) => dispatch(setCheckoutState(value,orisCode)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MonitoringPlanTab);
