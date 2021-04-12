import React, { useState, useEffect } from "react";
import * as fs from "../../../../utils/selectors/facilities";
import { loadMonitoringPlans } from "../../../../store/actions/monitoringPlans";
import { connect } from "react-redux";
import MonitoringPlanTabRender from "./MonitoringPlanTabRender";
import {getActiveConfigurations} from "../../../../utils/selectors/monitoringConfigurations";

export const MonitoringPlanTab = ({
  orisCode,
  facilities,
  loadMonitoringPlansData,
  monitoringPlans,
  loading,
}) => {
  const [facility] = useState(fs.getSelectedFacility(orisCode, facilities));
  const [hasActiveConfigs, setHasActiveConfigs] = useState(true);
  useEffect(() => {
    loadMonitoringPlansData(orisCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(()=>{
    if(monitoringPlans.length>0){
      setHasActiveConfigs(getActiveConfigurations(monitoringPlans).length>0?true:false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div>
      <MonitoringPlanTabRender
        facility={facility}
        monitoringPlans={monitoringPlans}
        hasActiveConfigs={hasActiveConfigs}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    facilities: state.facilities,
    loading: state.apiCallsInProgress.facilities,
    monitoringPlans: state.monitoringPlans,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMonitoringPlansData: (orisCode) =>
      dispatch(loadMonitoringPlans(orisCode)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonitoringPlanTab);
