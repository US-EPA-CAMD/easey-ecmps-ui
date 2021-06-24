import React from "react";
import "./MonitoringPlanHome.scss";
import DynamicTabs from "../DynamicTabs/DynamicTabs";
import { Button } from "@trussworks/react-uswds";
import DataTable from "../datatablesContainer/SelectFacilitiesDataTable/SelectFacilitiesDataTable";
import { connect } from "react-redux";
// import {SelectedFacilityTab} from '../../'
const MonitoringPlanHome = ({ user, openedFacilityTabs }) => {
  const handleTabState = () => {
    // component: (
    //   <div className="selectedTabsBox">
    //     <SelectedFacilityTab
    //       orisCode={info[0].col1}
    //       locations={info[2].locations}
    //       selectedConfig={info[2]}
    //       title={`${info[0].col2} (${info[1].col1}) ${
    //         info[1].col2 === "Inactive" ? "Inactive" : ""
    //       }`}
    //       configID={info[2].id}
    //       user={user}
    //       checkout={info[3]}
    //     />
    //   </div>
    // ),

    const tabArr = [];

    // for (const row of openedFacilityTabs) {
    //   tabArr.push(
    //     <SelectedFacilityTab
    //       orisCode={row[0].col1}
    //       locations={row[2].locations}
    //       selectedConfig={row[2]}
    //       title={`${row[0].col2} (${row[1].col1}) ${
    //         row[1].col2 === "Inactive" ? "Inactive" : ""
    //       }`}
    //       configID={row[2].id}
    //       user={user}
    //       checkout={row[3]}
    //     />
    //   );
    // }
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
const mapStateToProps = (state) => {
  return {
    openedFacilityTabs: state.openedFacilityTabs,
  };
};

export default connect(mapStateToProps, null)(MonitoringPlanHome);
