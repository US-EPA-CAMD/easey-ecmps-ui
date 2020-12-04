import React, { useState, useEffect } from "react";
import "./HomeView.css";
import DataTable from "./SelectFacilitiesTab/DataTable";
import MonitoringPlanDataTable from "./MonitoringPlanTab/MonitoringPlanDataTable";
import * as fs from "../../utils/selectors/facilities";
import { connect } from "react-redux";
import SelectedFacilityTab from "./SelectedFacilityTab/SelectedFacilityTab";
const HomeView = ({ facilities }) => {
  const [orisCode,setOrisCode] = useState(3);
  
  const [facility, setFacility] = useState(
    fs.getSelectedFacility(orisCode, facilities)
  );
  useEffect(() => {
    setFacility(fs.getSelectedFacility(orisCode, facilities));
  }, [facilities, orisCode]);

  return (
    <div className="home-container">
      <div className="header">
        <h1 className="title">Monitoring Plans</h1>
        <button className="ovalBTN">Import</button>
      </div>

      <div className="tabContainer ">
        <DataTable
          selectedRowHandler={(facilityId) => {
            setOrisCode(3);
          }}
        />
        <SelectedFacilityTab/>

      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    facilities: state.facilities,
  };
};

export default connect(mapStateToProps)(HomeView);
