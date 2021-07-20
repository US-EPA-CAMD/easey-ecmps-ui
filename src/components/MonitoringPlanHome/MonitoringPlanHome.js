import React from "react";
import "./MonitoringPlanHome.scss";
import DynamicTabs from "../DynamicTabs/DynamicTabs";
import { Button } from "@trussworks/react-uswds";
import DataTable from "../datatablesContainer/SelectFacilitiesDataTable/SelectFacilitiesDataTable";
import { connect } from "react-redux";
import SelectedFacilityTab from "../MonitoringPlanTab/MonitoringPlanTab";

export const MonitoringPlanHome = ({ user, openedFacilityTabs }) => {
  const handleTabState = () => {
    const tabArr = [
      {
        title: "Select Configurations",
        component: <DataTable user={user} keyField="col1" />,
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
    <div className="home-container react-transition fade-in">
      <div className="text-black margin-top-1 display-none tablet:display-block">
        <h1
          className="display-inline-block page-header"
          epa-testid="monPlansTitle"
        >
          Monitoring Plans
        </h1>
        <Button
          type="button"
          className="float-right clearfix radius-2 position-relative top-2"
          outline={true}
          id="input-button-search"
        >
          Import a Monitoring Plan
        </Button>
      </div>

      <div className="display-none mobile:display-block tablet:display-none">
        <h1
          className="display-inline-block font-body-xl text-bold"
          epa-testid="monPlansTitle"
        >
          Monitoring Plans
        </h1>
        <Button
          type="button"
          className="radius-2 position-relative top-2 width-10 font-heading-sm float-right clearfix mobile-lg:margin-right-4 mobile:margin-right-1 margin-top-1"
          outline={true}
          id="input-button-search"
        >
          Import
        </Button>
      </div>

      <div>
        <DynamicTabs tabsProps={() => handleTabState()} />
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
export { mapStateToProps };
