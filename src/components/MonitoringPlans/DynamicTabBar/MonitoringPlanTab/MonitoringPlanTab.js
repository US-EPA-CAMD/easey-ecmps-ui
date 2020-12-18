import React, { useState, useEffect } from "react";
import * as fs from "../../../../utils/selectors/facilities";
import { loadFacilities } from "../../../../store/actions/facilities";
import { loadMonitoringPlans } from "../../../../store/actions/monitoringPlans";
import { connect } from "react-redux";
import MonitoringPlanTabRender from "./MonitoringPlanTabRender";

const MonitoringPlanTab = ({
  orisCode,
  facilities,
  loadFacilitiesData,
  loadMonitoringPlansData,
  monitoringPlans,
  loading,
}) => {
  const [facility] = useState(fs.getSelectedFacility(orisCode, facilities));
  useEffect(() => {
    if (facilities.length === 0) {
      loadFacilitiesData();
    }
  }, []);
  useEffect(() => {
    loadMonitoringPlansData(orisCode);
  }, [orisCode]);

  return (
    <div>
      <MonitoringPlanTabRender
        facility={facility}
        monitoringPlans={monitoringPlans}
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
    loadFacilitiesData: () => dispatch(loadFacilities()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonitoringPlanTab);
