import React, { useEffect, useMemo, useState } from "react";
import { connect, useSelector } from "react-redux";
import * as fs from "../../../utils/selectors/facilities";
import MonitoringPlanTab from "../../MonitoringPlanTab/MonitoringPlanTab";
import QACertTestSummaryTab from "../../QACertTestSummaryTab/QACertTestSummaryTab";
import QACertEventTab from "../../QACertEventTab/QACertEventTab";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import "./SelectFacilitiesDataTable.scss";
import { DataTableConfigurations } from "../DataTableConfigurations/DataTableConfigurations";
import * as facilitiesApi from "../../../utils/api/facilityApi";
import { getCheckedOutLocations } from "../../../utils/api/monitoringPlansApi";
import {
  MONITORING_PLAN_STORE_NAME,
  QA_CERT_TEST_SUMMARY_STORE_NAME,
  EMISSIONS_STORE_NAME,
  QA_CERT_EVENT_STORE_NAME,
} from "../../../additional-functions/workspace-section-and-store-names";
import Export from "../../export/Export/Export";
import EmissionsTab from "../../EmissionsTab/EmissionsTab";
import { useNavigate } from "react-router-dom";
import { resetTabOrder } from "../../../utils/functions";

export const SelectFacilitiesDataTable = ({
  user,
  addtabs,
  setMostRecentlyCheckedInMonitorPlanIdForTab,
  workspaceSection,
  workspaceState,
}) => {
  const openedFacilityTabs = useSelector(
    (state) => state.openedFacilityTabs[workspaceSection]
  );

  const [facilities, setFacilities] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [checkedOutLocations, setCheckedOutLocations] = useState([]);
  const [
    mostRecentlyCheckedInMonitorPlanId,
    setMostRecentlyCheckedInMonitorPlanId,
  ] = useState("");
  const history = useNavigate();

  useEffect(() => {
    facilitiesApi
      .getAllFacilities()
      .then((res) => {
        setDataLoaded(true);
        setFacilities(res.data);
        if (history?.action === "POP") {
          resetTabOrder();
        }
      })
      .catch((error) => {
        console.error("Error getting facilities", error);
      });
    return () => {
      setFacilities([]); // This worked for me
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    obtainCheckedOutLocations().then();
  }, [openedFacilityTabs, mostRecentlyCheckedInMonitorPlanId]);
  const obtainCheckedOutLocations = async () => {
    const checkedOutLocationResult = await getCheckedOutLocations().then();
    let checkedOutLocationsList = [];
    if (checkedOutLocationResult) {
      if (
        checkedOutLocationResult.data &&
        checkedOutLocationResult.data.length > 0
      ) {
        checkedOutLocationsList = checkedOutLocationResult.data;
      }
    }

    setCheckedOutLocations(checkedOutLocationsList);
    return () => {
      setCheckedOutLocations([]); // This worked for me
    };
  };
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = ["Facility", "ORIS", "State"];

  // handles the actual component that appears after clicking on the dynamic tabs
  const selectedRowHandler = (info) => {
    const [data, config, checkout] = info;
    const title = `${config.facilityName} (${config.name})`;

    // if user has THIS plan checkedout
    const isCheckedOutByUser = (configs) => {
      const configIndex = configs
        .map((location) => location["monPlanId"])
        .indexOf(config.id);
      return (
        configIndex > -1 &&
        configs[configIndex]["checkedOutBy"] === user["userId"]
      );
    };

    const checkedOutValue = isCheckedOutByUser(checkedOutLocations);

    addtabs([
      {
        title,
        component:
          workspaceState === MONITORING_PLAN_STORE_NAME ? (
            <div className="selectedTabsBox">
              <MonitoringPlanTab
                orisCode={data.col2}
                selectedConfigId={config.id}
                title={title}
                user={user}
                checkout={checkout || checkedOutValue}
                checkedOutLocations={checkedOutLocations}
                setMostRecentlyCheckedInMonitorPlanId={
                  setMostRecentlyCheckedInMonitorPlanId
                }
                setMostRecentlyCheckedInMonitorPlanIdForTab={
                  setMostRecentlyCheckedInMonitorPlanIdForTab
                }
                workspaceSection={workspaceState}
              />
            </div>
          ) : workspaceState === QA_CERT_TEST_SUMMARY_STORE_NAME ? (
            <div className="selectedTabsBox">
              <QACertTestSummaryTab
                orisCode={data.col2}
                selectedConfigId={config.id}
                title={title}
                user={user}
              />
            </div>
          ) : workspaceState === QA_CERT_EVENT_STORE_NAME ? (
            <div className="selectedTabsBox">
              <QACertEventTab
                orisCode={data.col2}
                selectedConfigId={config.id}
                title={title}
                user={user}
                workspaceSection={workspaceState}
              />
            </div>
          ) : workspaceSection === EMISSIONS_STORE_NAME ? (
            <div className="selectedTabsBox">
              <EmissionsTab
                orisCode={data.col2}
                selectedConfigId={config.id}
                title={title}
                user={user}
                checkout={checkout || checkedOutValue}
                checkedOutLocations={checkedOutLocations}
                workspaceSection={workspaceState}
              />
            </div>
          ) : (
            // handles export
            <div className="selectedTabsBox">
              <Export
                orisCode={data.col2}
                selectedConfigId={config.id}
                title={title}
                user={user}
                workspaceSection={workspaceState}
              />
            </div>
          ),

        orisCode: data.col2,
        selectedConfig: config,
        // info[2] shows true if "open and checkout" was click first time
        // checkedoutvalue shows true if user already had it checked out but navigates away
        checkout: checkout || checkedOutValue,
        workspaceSection: workspaceState,
      },
    ]);
  };

  const data = useMemo(() => {
    if (facilities.length > 0) {
      return fs.getTableRecords(facilities).map((item) => {
        const disabled = false;
        let expanded = false;

        return { ...item, disabled, expanded };
      });
    } else {
      return [];
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facilities]);

  return (
    <div className="tabsBox">
      {/* {workspaceSection === MONITORING_PLAN_STORE_NAME ? ( */}

      <DataTableRender
        columnNames={columnNames}
        dataLoaded={dataLoaded}
        data={data}
        defaultSort="col2"
        defaultSortDir="asc"
        openedFacilityTabs={openedFacilityTabs[workspaceState]}
        user={user}
        pagination={true}
        filter={true}
        sectionTitle="Select Configurations"
        checkedOutLocations={checkedOutLocations}
        expandableRows={true}
        expandableRowComp={DataTableConfigurations}
        expandableRowProps={{
          selectedRowHandler: selectedRowHandler,
          user: user,
          className: "expand-row-data-table",
          checkedOutLocations: checkedOutLocations,
          actionsBtn: "Open",
          setMostRecentlyCheckedInMonitorPlanId:
            setMostRecentlyCheckedInMonitorPlanId,

          setMostRecentlyCheckedInMonitorPlanIdForTab:
            setMostRecentlyCheckedInMonitorPlanIdForTab,

          workspaceSection: workspaceState,
        }}
        headerStyling="padding-top-0 padding-left-2"
        setShowInactive={() => {}}
        setMostRecentlyCheckedInMonitorPlanId={
          setMostRecentlyCheckedInMonitorPlanId
        }
        setMostRecentlyCheckedInMonitorPlanIdForTab={
          setMostRecentlyCheckedInMonitorPlanIdForTab
        }
        ariaLabel={"Select Configurations"}
        workspaceSection={workspaceSection}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  workspaceState: state.workspaceState,
});

export default connect(mapStateToProps)(SelectFacilitiesDataTable);
