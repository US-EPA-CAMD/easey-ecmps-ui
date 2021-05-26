import React, { useState, useEffect } from "react";
import * as fs from "../../utils/selectors/facilities";
import {
  loadMonitoringPlans,
  emptyMonitoringPlans,
} from "../../store/actions/monitoringPlans";
import {
  setInactiveToggle,
  setMonitoringPlan,
} from "../../store/actions/dynamicFacilityTab";
import { connect } from "react-redux";
import MonitoringPlanTabRender from "../MonitoringPlanTabRender/MonitoringPlanTabRender";
import { getActiveConfigurations } from "../../utils/selectors/monitoringConfigurations";

import { setActiveTab } from "../../store/actions/activeTab";

export const MonitoringPlanTab = ({
  orisCode,
  facilities,
  loadMonitoringPlansData,

  setInactive,
  monitoringPlans,
  loading,
  tabs,
  setActiveTab,
  activeTab,
  setMonitoringPlan,
  emptyPlans,
}) => {
  const [facility] = useState(fs.getSelectedFacility(orisCode, facilities));

  const [sectionSelect, setSectionSelect] = useState(tabs[activeTab].section);

  useEffect(() => {
    setSectionSelect(tabs[activeTab].section);
  }, [tabs[activeTab].section]);

  const [locationSelect, setLocationSelect] = useState(
    tabs[activeTab].location[1]
  );

  useEffect(() => {
    setLocationSelect(tabs[activeTab].location[1]);
  }, [tabs[activeTab].location]);

  const [hasActiveConfigs, setHasActiveConfigs] = useState(true);

  useEffect(() => {
    emptyPlans();
  }, []);
  useEffect(() => {
    if (monitoringPlans.length < 1) {
      loadMonitoringPlansData(orisCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps

    for (const x of tabs) {
      if (x.orisCode === orisCode) {
        setActiveTab(orisCode, tabs.indexOf(x));
        break;
      }
    }
  }, [monitoringPlans]);

  useEffect(() => {
    if (monitoringPlans.length > 0) {
      setHasActiveConfigs(
        getActiveConfigurations(monitoringPlans).length > 0 ? true : false
      );
      if (getActiveConfigurations(monitoringPlans).length <= 0) {
        setInactive(orisCode, true);
      }
      setMonitoringPlan(monitoringPlans, orisCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monitoringPlans]);

  return (
    <div>
      {monitoringPlans.length >= 1 ? (
        <div>
          <MonitoringPlanTabRender
            facility={facility}
            monitoringPlans={monitoringPlans}
            hasActiveConfigs={hasActiveConfigs}
            orisCode={orisCode}
            sectionSelect={sectionSelect}
            locationSelect={locationSelect}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    facilities: state.facilities,
    tabs: state.openedFacilityTabs,
    loading: state.apiCallsInProgress.facilities,
    monitoringPlans: state.monitoringPlans,
    activeTab: state.activeTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMonitoringPlansData: (orisCode) =>
      dispatch(loadMonitoringPlans(orisCode)),
    setActiveTab: (orisCode, value) => dispatch(setActiveTab(orisCode, value)),
    setMonitoringPlan: (mp, orisCode) =>
      dispatch(setMonitoringPlan(mp, orisCode)),
    setInactive: (orisCode, value) =>
      dispatch(setInactiveToggle(orisCode, value)),
    emptyPlans: () => dispatch(emptyMonitoringPlans()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MonitoringPlanTab);
