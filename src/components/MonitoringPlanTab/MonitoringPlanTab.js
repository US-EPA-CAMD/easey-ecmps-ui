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

  activeTab,
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
  const [sectionSelect, setSectionSelect] = useState(
    tabs[activeTab[0]].section
  );
  useEffect(() => {
    setSection(sectionSelect, title, MONITORING_PLAN_STORE_NAME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionSelect]);

  const [locationSelect, setLocationSelect] = useState(
    tabs[activeTab].location
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
    tabs: state.openedFacilityTabs[
      convertSectionToStoreName(MONITORING_PLAN_STORE_NAME)
    ],
    activeTab:
      state.activeTab[convertSectionToStoreName(MONITORING_PLAN_STORE_NAME)],
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
    setActiveTab: (orisCode, value, workspaceSection) =>
      dispatch(
        setActiveTab(
          orisCode,
          value,
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
