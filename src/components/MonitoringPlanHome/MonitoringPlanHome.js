import React from "react";
import "./MonitoringPlanHome.scss";
import DynamicTabs from "../DynamicTabs/DynamicTabs";
import { Button } from "@trussworks/react-uswds";
import DataTable from "../datatablesContainer/SelectFacilitiesDataTable/SelectFacilitiesDataTable";

const MonitoringPlanHome = ({ user }) => {
  return (
    <div className="home-container">
      <div className="text-black margin-top-1">
        <h1 className="display-inline-block page-header">Monitoring Plans</h1>
        <Button
          type="button"
          className="float-right clearfix radius-2 position-relative top-2"
          outline={true}
          id="input-button-search"
        >
          Import a Monitoring Plan
        </Button>
      </div>

      <div>
        <DynamicTabs
          tabsProps={[
            {
              title: "Select Configurations",
              component: <DataTable user={user} />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default MonitoringPlanHome;
