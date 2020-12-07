import React,{ useState, useEffect } from "react";
import * as fs from "../../../utils/selectors/facilities";
import { loadFacilities } from "../../../store/actions/facilities";
import { connect } from "react-redux";
import SelectedFacilityTabRender from "./SelectedFacilityTabRender";

const SelectedFacilityTab = ({
  orisCode,
  facilities,
  loadFacilitiesData,
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
    
  return (
    <div>
      <SelectedFacilityTabRender facility={facility}/>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    facilities: state.facilities,
    loading: state.apiCallsInProgress.facilities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFacilitiesData: () => dispatch(loadFacilities()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedFacilityTab);
