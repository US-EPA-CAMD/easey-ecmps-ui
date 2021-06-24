import React from "react";
import "./MonitoringPlanHome.scss";
import DynamicTabs from "../DynamicTabs/DynamicTabs";
import { Button } from "@trussworks/react-uswds";
import DataTable from "../datatablesContainer/SelectFacilitiesDataTable/SelectFacilitiesDataTable";

const MonitoringPlanHome = ({ user }) => {
  return (
    <div className="home-container">
      <div className="text-gray-50">
        <h1 className="display-inline-block">Monitoring Plans</h1>
        <Button
          className="float-right clearfix radius-2"
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
