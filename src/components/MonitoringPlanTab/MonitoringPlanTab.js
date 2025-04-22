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
  orisCode,
  selectedConfigId,
  title,
  user,
  removeTab,

  tabs,
  setSection,
  setLocation,
  setCheckout,
  setInactive,
}) => {
  const currentTab = tabs.find((tab) => tab.selectedConfig.id === selectedConfigId);
  const currentTabIndex = useMemo(() => {
    return tabs.findIndex((tab) => tab.selectedConfig.id === selectedConfigId);
  }, [selectedConfigId, tabs]);

  const [sectionSelect, setSectionSelect] = useState(currentTab?.section ?? null);
  useEffect(() => {
    setSection(sectionSelect, title, MONITORING_PLAN_STORE_NAME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionSelect]);

  const locationSelect = currentTab?.location ?? null;
  const setLocationSelect = (location) => setLocation(location, title, MONITORING_PLAN_STORE_NAME);

  if (!currentTab) {
    return null;
  }

  return (
    <div id="monitoring-plan-tab-container">
      <div>
        <MonitoringPlanTabRender
          removeTab={removeTab}
          title={title}
          orisCode={orisCode}
          selectedConfigId={selectedConfigId}
          sectionSelect={sectionSelect}
          setSectionSelect={setSectionSelect}
          locationSelect={locationSelect}
          setLocationSelect={setLocationSelect}
          user={user}
          checkout={currentTab.checkout}
          setCheckout={setCheckout}
          setInactive={setInactive}
          inactive={currentTab.inactive}
          currentTabIndex={currentTabIndex}
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
