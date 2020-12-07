import React from "react";
import "./MonitoringPlanHome.css";

import DynamicTabBar from "./DynamicTabBar/DynamicTabBar";
const MonitoringPlanHome = ({ facilities, loadFacilitiesData }) => {
  return (
    <div className="home-container">
      <div className="header">
        <h1 className="title">Monitoring Plans</h1>
        <button className="ovalBTN">Import</button>
      </div>

      <div className="tabsBar">
        <DynamicTabBar />
      </div>
    </div>
  );
};

export default MonitoringPlanHome;
