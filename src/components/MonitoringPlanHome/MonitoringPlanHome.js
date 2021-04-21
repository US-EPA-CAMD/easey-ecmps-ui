import React from "react";
import "./MonitoringPlanHome.scss";
import DynamicTabs from "../DynamicTabs/DynamicTabs";
import { Button } from "@trussworks/react-uswds";
import DataTable from "../SelectFacilitiesDataTable/SelectFacilitiesDataTable";

const MonitoringPlanHome = () => {
  return (
    <div className="home-container">
      <div className="header">
        <h1 className="title">Monitoring Plans</h1>
        <Button
          className="ovalBTN"
          id="input-button-search"
          // onClick={updateSearchHandler}
        >
          Import a Monitoring Plan
        </Button>
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
