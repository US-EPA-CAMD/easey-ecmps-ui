import React,{ useState, useEffect } from "react";
import * as fs from "../../../../utils/selectors/facilities";
import { loadFacilities,loadMonitoringPlans } from "../../../../store/actions/facilities";
import { connect } from "react-redux";
import SelectedFacilityTabRender from "./SelectedFacilityTabRender";

const SelectedFacilityTab = ({
  orisCode,
  facilities,
  loadFacilitiesData,
  loadMonitoringPlansData,
  monitoringPlans,
  loading,
}) => {

    const [facility] = useState(
        fs.getSelectedFacility(orisCode, facilities)
      );
      useEffect(() => {
        if (facilities.length === 0) {
          loadFacilitiesData();
        }
      }, []);
      useEffect(() => {
        if (monitoringPlans.length === 0) {
            loadMonitoringPlansData();
        }
      }, []);

  return (
    <div>
      <SelectedFacilityTabRender facility={facility} monitoringPlans={monitoringPlans}/>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    facilities: state.facilities,
    loading: state.apiCallsInProgress.facilities,
    monitoringPlans:state.monitoringPlans
  };
};

const mapDispatchToProps = (dispatch) => {
  return { 
    loadMonitoringPlansData: () => dispatch(loadMonitoringPlans()),
    loadFacilitiesData: () => dispatch(loadFacilities()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedFacilityTab);
