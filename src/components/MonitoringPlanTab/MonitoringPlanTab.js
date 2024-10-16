import React, { useState, useEffect, useMemo } from "react";

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
  selectedConfigId,
  title,
  user,
  checkout,
  removeTab,
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
  const getCurrentTab = () => {
    return tabs.find((tab) => tab.selectedConfig.id === selectedConfigId);
  };
  const currentTabIndex = useMemo(() => {
    return tabs.findIndex((tab) => tab.selectedConfig.id === selectedConfigId);
  }, [selectedConfigId, tabs]);

  // console.log('workspaceSection',workspaceSection)
  const [sectionSelect, setSectionSelect] = useState(getCurrentTab().section);
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
          removeTab={removeTab}
          resetTimerFlag={resetTimerFlag}
          callApiFlag={callApiFlag}
          title={title}
          orisCode={orisCode}
          selectedConfigId={selectedConfigId}
          sectionSelect={sectionSelect}
          setSectionSelect={(section) => setSectionSelect(section)}
          locationSelect={locationSelect}
          setLocationSelect={(location) => setLocationSelect(location)}
          user={user}
          checkout={tabs[currentTabIndex].checkout}
          setCheckout={setCheckout}
          setInactive={setInactive}
          inactive={tabs[currentTabIndex].inactive}
          checkedOutLocations={checkedOutLocations}
          setMostRecentlyCheckedInMonitorPlanId={
            setMostRecentlyCheckedInMonitorPlanId
          }
          setMostRecentlyCheckedInMonitorPlanIdForTab={
            setMostRecentlyCheckedInMonitorPlanIdForTab
          }
          currentTabIndex={currentTabIndex}
          workspaceSection={workspaceSection}
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
