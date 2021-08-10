import React, { useEffect, useState } from "react";
import { Button } from "@trussworks/react-uswds";
import DataTable from "../datatablesContainer/SelectFacilitiesDataTable/SelectFacilitiesDataTable";
import { connect } from "react-redux";
import { MonitoringPlanTab as SelectedFacilityTab } from "../MonitoringPlanTab/MonitoringPlanTab";
import DynamicTabs from "../DynamicTabs/DynamicTabs";
import { getCheckedOutLocations } from "../../utils/api/monitoringPlansApi";
import { useInterval } from "../../additional-functions/use-interval";
import { oneSecond } from "../../config";
import * as mpApi from "../../utils/api/monitoringPlansApi";
import "./MonitoringPlanHome.scss";

export const MonitoringPlanHome = ({ user, openedFacilityTabs }) => {
  const [checkedOutLocations, setCheckedOutLocations] = useState([]);
  const [
    mostRecentlyCheckedInMonitorPlanIdForTab,
    setMostRecentlyCheckedInMonitorPlanIdForTab,
  ] = useState("");

  useEffect(() => {
    obtainCheckedOutLocations().then();
  }, [openedFacilityTabs, mostRecentlyCheckedInMonitorPlanIdForTab]);

  /*useInterval(() => {
    obtainCheckedOutLocations().then();
  }, 3 * oneSecond);*/

  const obtainCheckedOutLocations = async () => {
    const checkedOutLocationResult = await getCheckedOutLocations();

    let checkedOutLocationList = [];

    if (checkedOutLocationResult.data) {
      checkedOutLocationList = checkedOutLocationResult.data;
    }

    // *** find locations currently checked out by the user
    const currentlyCheckedOutMonPlanId = checkedOutLocationList.filter(
      (element) => element["checkedOutBy"] === user.firstName
    )[0]
      ? checkedOutLocationList.filter(
          (element) => element["checkedOutBy"] === user.firstName
        )[0]["monPlanId"]
      : null;

    if (currentlyCheckedOutMonPlanId) {
      window.currentlyCheckedOutMonPlanId = currentlyCheckedOutMonPlanId;
    }

    setCheckedOutLocations(checkedOutLocationList);
  };

  const checkInAll = () => {
    if (window.currentlyCheckedOutMonPlanId) {
      mpApi
        .deleteCheckInMonitoringPlanConfiguration(
          window.currentlyCheckedOutMonPlanId
        )
        .then((res) => {});
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", checkInAll);

    return () => {
      window.removeEventListener("beforeunload", checkInAll);
    };
  }, []);

  const handleTabState = () => {
    const tabArr = [
      {
        title: "Select Configurations",
        component: (
          <DataTable
            user={user}
            keyField="col2"
            openedFacilityTabs={openedFacilityTabs}
            mostRecentlyCheckedInMonitorPlanIdForTab={
              mostRecentlyCheckedInMonitorPlanIdForTab
            }
            setMostRecentlyCheckedInMonitorPlanIdForTab={
              setMostRecentlyCheckedInMonitorPlanIdForTab
            }
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
            mostRecentlyCheckedInMonitorPlanIdForTab={
              mostRecentlyCheckedInMonitorPlanIdForTab
            }
            setMostRecentlyCheckedInMonitorPlanIdForTab={
              setMostRecentlyCheckedInMonitorPlanIdForTab
            }
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
        <h2
          className="display-inline-block page-header margin-top-2"
          epa-testid="monPlansTitle"
        >
          Monitoring Plans
        </h2>
        <Button
          type="button"
          className="float-right clearfix radius-2 position-relative tablet-lg:margin-top-2 tablet:margin-top-1"
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
