import React, { useEffect, useState } from "react";
import "./MonitoringPlanHome.scss";
import DynamicTabs from "../DynamicTabs/DynamicTabs";
import { Button } from "@trussworks/react-uswds";
import DataTable from "../datatablesContainer/SelectFacilitiesDataTable/SelectFacilitiesDataTable";
import { connect } from "react-redux";
import { MonitoringPlanTab as SelectedFacilityTab } from "../MonitoringPlanTab/MonitoringPlanTab";
import { getCheckedOutLocations } from "../../utils/api/monitoringPlansApi";
import { useInterval } from "../../additional-functions/use-interval";
import { oneSecond } from "../../config";

export const MonitoringPlanHome = ({ user, openedFacilityTabs }) => {
  const [checkedOutLocations, setCheckedOutLocations] = useState([]);

  useEffect(() => {
    obtainCheckedOutLocations().then();
  }, [openedFacilityTabs]);

  /*useInterval(() => {
    obtainCheckedOutLocations().then();
  }, 10 * oneSecond);*/

  const obtainCheckedOutLocations = async () => {
    const checkedOutLocationResult = await getCheckedOutLocations();

    let checkedOutLocationList = [];

    if (checkedOutLocationResult.data) {
      checkedOutLocationList = checkedOutLocationResult.data;
    }

    setCheckedOutLocations(checkedOutLocationList);
  };

  const handleTabState = () => {
    const tabArr = [
      {
        title: "Select Configurations",
        component: (
          <DataTable
            user={user}
            keyField="col2"
            openedFacilityTabs={openedFacilityTabs}
          />
        ),
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
            checkedOutLocations={checkedOutLocations}
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
    <div className="react-transition fade-in padding-x-3">
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
          className="display-inline-block font-body-xl text-bold margin-left-neg-2"
          epa-testid="monPlansTitle"
        >
          Monitoring Plans
        </h1>
        <Button
          type="button"
          className="radius-2 position-relative top-2 width-10 font-heading-sm float-right clearfix margin-right-neg-3 margin-top-1"
          outline={true}
          id="input-button-search"
        >
          Import
        </Button>
      </div>

      <div>
        <DynamicTabs
          tabsProps={() => handleTabState()}
          checkedOutLocations={checkedOutLocations}
          user={user}
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
export { mapStateToProps };
