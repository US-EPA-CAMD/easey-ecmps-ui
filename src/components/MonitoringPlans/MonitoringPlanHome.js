import React from "react";
import "./MonitoringPlanHome.css";
import DynamicTabs from "../Common/Tabs/DynamicTabs";
import DataTable from "./DynamicTabBar/SelectFacilitiesTab/DataTable";

const MonitoringPlanHome = () => {

  return (
    <div className="home-container">
      <div className="header">
        <h1 className="title">Monitoring Plans</h1>
        <button className="ovalBTN">Import</button>
      </div>
 
      <div className="tabsBar">
        <DynamicTabs
          tabsProps={[
            {
              title: "Select Facility",
              component: <DataTable />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default MonitoringPlanHome;
