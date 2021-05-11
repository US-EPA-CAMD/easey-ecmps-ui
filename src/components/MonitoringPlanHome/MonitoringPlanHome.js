import React from "react";
import "./MonitoringPlanHome.scss";
import DynamicTabs from "../DynamicTabs/DynamicTabs";
import { Button } from "@trussworks/react-uswds";
import DataTable from "../datatablesContainer/SelectFacilitiesDataTable/SelectFacilitiesDataTable";

const MonitoringPlanHome = () => {
  return (
    <div className="home-container">
      <div className="text-gray-50">
        <h1 className="display-inline-block">Monitoring Plans</h1>
        <Button
          className="float-right clearfix radius-pill"
          id="input-button-search"
          // onClick={updateSearchHandler}
        >
          Import a Monitoring Plan
        </Button>
      </div>

      <div>
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
