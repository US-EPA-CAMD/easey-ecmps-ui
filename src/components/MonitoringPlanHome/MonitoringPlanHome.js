import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Button } from "@trussworks/react-uswds";
import DataTable from "../datatablesContainer/SelectFacilitiesDataTable/SelectFacilitiesDataTable";
import MonitoringPlanTab from "../MonitoringPlanTab/MonitoringPlanTab";
import DynamicTabs from "../DynamicTabs/DynamicTabs";

import { getCheckedOutLocations } from "../../utils/api/monitoringPlansApi";

import * as mpApi from "../../utils/api/monitoringPlansApi";

import "./MonitoringPlanHome.scss";
import { MONITORING_PLAN_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
export const MonitoringPlanHome = ({
  user,
  resetTimer,
  setExpired,
  resetTimerFlag,
  callApiFlag,
  openedFacilityTabs,
}) => {
  useEffect(() => {
    document.title = "ECMPS Monitoring Plans";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [checkedOutLocations, setCheckedOutLocations] = useState([]);
  const [
    mostRecentlyCheckedInMonitorPlanIdForTab,
    setMostRecentlyCheckedInMonitorPlanIdForTab,
  ] = useState("");

  useEffect(() => {
    obtainCheckedOutLocations().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedFacilityTabs, mostRecentlyCheckedInMonitorPlanIdForTab]);

  /*useInterval(() => {
    obtainCheckedOutLocations().then();
  }, 3 * oneSecond);*/

  const obtainCheckedOutLocations = async () => {
    const checkedOutLocationResult = await getCheckedOutLocations();

    let checkedOutLocationList = [];
    if (checkedOutLocationResult) {
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
            workspaceSection={MONITORING_PLAN_STORE_NAME}
          />
        ),
      },
    ];

    for (const row of openedFacilityTabs) {
      tabArr.push({
        title: row.name,
        component: (
          <MonitoringPlanTab
            resetTimer={resetTimer}
            setExpired={setExpired}
            resetTimerFlag={resetTimerFlag}
            callApiFlag={callApiFlag}
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
            workspaceSection={MONITORING_PLAN_STORE_NAME}
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
        {/* {user ? (
          <Button
            type="button"
            className="float-right clearfix radius-2 position-relative tablet-lg:margin-top-2 tablet:margin-top-2 tablet:margin-right-neg-3 desktop:margin-right-0"
            outline={true}
            id="input-button-search"
            title="Coming Soon"
          >
            Import a Monitoring Plan
          </Button>
        ) : (
          ""
        )} */}
      </div>
      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testingBtn2"
        onClick={() => {
          obtainCheckedOutLocations();
          checkInAll();
        }}
      />
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
          workspaceSection={MONITORING_PLAN_STORE_NAME}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    openedFacilityTabs: state.openedFacilityTabs[MONITORING_PLAN_STORE_NAME],
  };
};

export default connect(mapStateToProps, null)(MonitoringPlanHome);
export { mapStateToProps };
