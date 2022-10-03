import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import MonitoringPlanTabRender from "../MonitoringPlanTabRender/MonitoringPlanTabRender";
import {
  setSectionSelectionState,
  setLocationSelectionState,
  setCheckoutState,
  setInactiveState,
} from "../../store/actions/dynamicFacilityTab";
import {
  convertSectionToStoreName,
  MONITORING_PLAN_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";
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

  setSection,
  setLocation,
  setCheckout,
  setInactive,
  checkedOutLocations,
  setMostRecentlyCheckedInMonitorPlanId,
  setMostRecentlyCheckedInMonitorPlanIdForTab,
  mostRecentlyCheckedInMonitorPlanIdForTab,
  workspaceSection,
}) => {
  const getCurrentTab = () =>{
    return tabs.find(tab => tab.selectedConfig.id === selectedConfig.id);

  }
  const [ currentTab, setCurrentTab ] = useState(getCurrentTab());

  useEffect(()=>{
    setCurrentTab(getCurrentTab())
        // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedConfig]);

  const [sectionSelect, setSectionSelect] = useState(
    getCurrentTab().section
  );
  useEffect(() => {
    setSection(sectionSelect, title, MONITORING_PLAN_STORE_NAME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionSelect]);

  const [locationSelect, setLocationSelect] = useState(
    getCurrentTab().location
  );

  useEffect(() => {
    setLocation(locationSelect, title, workspaceSection);
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
          sectionSelect={sectionSelect}
          setSectionSelect={(section)=>setSectionSelect(section)}
          locationSelect={locationSelect}
          setLocationSelect={(location)=>setLocationSelect(location)}
          locations={selectedConfig.locations}
          user={user}
          configID={currentTab.selectedConfig.id}
          checkout={currentTab.checkout}
          setCheckout={setCheckout}
          setInactive={setInactive}
          inactive={currentTab.inactive}
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
    tabs: state.openedFacilityTabs[
      convertSectionToStoreName(MONITORING_PLAN_STORE_NAME)
    ],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocation: (location, title, workspaceSection) =>
      dispatch(
        setLocationSelectionState(
          location,
          title,
          convertSectionToStoreName(workspaceSection)
        )
      ),
    setSection: (section, title, workspaceSection) =>
      dispatch(
        setSectionSelectionState(
          section,
          title,
          convertSectionToStoreName(workspaceSection)
        )
      ),
    setInactive: (value, title, workspaceSection) =>
      dispatch(
        setInactiveState(
          value,
          title,
          convertSectionToStoreName(workspaceSection)
        )
      ),
    setCheckout: (value, configID, workspaceSection) =>
      dispatch(
        setCheckoutState(
          value,
          configID,
          convertSectionToStoreName(workspaceSection)
        )
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MonitoringPlanTab);
export { mapStateToProps };
export { mapDispatchToProps };
