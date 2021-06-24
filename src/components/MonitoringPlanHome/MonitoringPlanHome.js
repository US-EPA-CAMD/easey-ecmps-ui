import React from "react";
import "./MonitoringPlanHome.scss";
import DynamicTabs from "../DynamicTabs/DynamicTabs";
import { Button } from "@trussworks/react-uswds";
import DataTable from "../datatablesContainer/SelectFacilitiesDataTable/SelectFacilitiesDataTable";
import { connect } from "react-redux";
import SelectedFacilityTab from "../MonitoringPlanTab/MonitoringPlanTab";
// import {SelectedFacilityTab} from '../../'
const MonitoringPlanHome = ({ user, openedFacilityTabs }) => {
  const handleTabState = () => {
    const tabArr = [
      {
        title: "Select Configurations",
        component: <DataTable user={user} />,
      },
    ];

    for (const row of openedFacilityTabs) {
      tabArr.push({
        title: row.name,
        component: (
          <SelectedFacilityTab
            orisCode={row.orisCode}
            selectedConfig={row.selectedConfig}
            title={row.name}
            user={user}
            checkout={row.checkout}
          />
        ),
        orisCode: row.orisCode,
        selectedConfig: row.selectedConfig,
        checkout: row.checkout,
      });
    }
    return tabArr;
  };

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
        <DynamicTabs tabsProps={handleTabState} />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    openedFacilityTabs: state.openedFacilityTabs,
  };
};

export default connect(mapStateToProps, null)(MonitoringPlanHome);
