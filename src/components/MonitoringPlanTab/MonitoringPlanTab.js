import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import MonitoringPlanTabRender from "../MonitoringPlanTabRender/MonitoringPlanTabRender";

import { setActiveTab } from "../../store/actions/activeTab";
import {
  setSectionSelectionState,
  setLocationSelectionState,
  setCheckoutState,
  setInactiveState,
} from "../../store/actions/dynamicFacilityTab";
export const MonitoringPlanTab = ({
  resetTimer,
  setExpired,
  resetTimerFlag,
  callApiFlag,

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
  setCheckout,
  setInactive,
  checkedOutLocations,
  setMostRecentlyCheckedInMonitorPlanId,
  setMostRecentlyCheckedInMonitorPlanIdForTab,
  mostRecentlyCheckedInMonitorPlanIdForTab,
}) => {
  const [sectionSelect, setSectionSelect] = useState(tabs[activeTab].section);
  useEffect(() => {
    setSection(sectionSelect, title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionSelect]);

  const [locationSelect, setLocationSelect] = useState(
    tabs[activeTab].location
  );

  useEffect(() => {
    setLocation(locationSelect, title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelect]);
  return (
    <div>
      <div>
        <MonitoringPlanTabRender
          resetTimer={resetTimer}
          setExpired={setExpired}
          resetTimerFlag={resetTimerFlag}
          callApiFlag={callApiFlag}
          title={title}
          orisCode={orisCode}
          selectedConfig={selectedConfig}
          sectionSelect={tabs[activeTab].section}
          setSectionSelect={setSectionSelect}
          locationSelect={tabs[activeTab].location}
          setLocationSelect={setLocationSelect}
          locations={selectedConfig.locations}
          user={user}
          configID={tabs[activeTab[0]].selectedConfig.id}
          checkout={tabs[activeTab[0]].checkout}
          setCheckout={setCheckout}
          setInactive={setInactive}
          inactive={tabs[activeTab[0]].inactive}
          checkedOutLocations={checkedOutLocations}
          setMostRecentlyCheckedInMonitorPlanId={
            setMostRecentlyCheckedInMonitorPlanId
          }
          setMostRecentlyCheckedInMonitorPlanIdForTab={
            setMostRecentlyCheckedInMonitorPlanIdForTab
          }
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
    setInactive: (value, title) => dispatch(setInactiveState(value, title)),
    setCheckout: (value, configID) =>
      dispatch(setCheckoutState(value, configID)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MonitoringPlanTab);
export { mapStateToProps };
export { mapDispatchToProps };
