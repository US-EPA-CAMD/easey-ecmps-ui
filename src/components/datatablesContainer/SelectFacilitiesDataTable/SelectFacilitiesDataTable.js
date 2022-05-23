import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import * as fs from "../../../utils/selectors/facilities";
import SelectedFacilityTab from "../../MonitoringPlanTab/MonitoringPlanTab";
import QACertTestSummaryTab from "../../QACertTestSummaryTab/QACertTestSummaryTab";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import "./SelectFacilitiesDataTable.scss";
import DataTableConfigurations from "../DataTableConfigurations/DataTableConfigurations";
import * as facilitiesApi from "../../../utils/api/facilityApi";
import { getCheckedOutLocations } from "../../../utils/api/monitoringPlansApi";
import NotFound from "../../NotFound/NotFound";

export const SelectFacilitiesDataTable = ({
  user,
  addtabs,
  openedFacilityTabs,
  setMostRecentlyCheckedInMonitorPlanIdForTab,
  sectionType = false,
}) => {
  const [facilities, setFacilities] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const [checkedOutLocations, setCheckedOutLocations] = useState([]);
  const [
    mostRecentlyCheckedInMonitorPlanId,
    setMostRecentlyCheckedInMonitorPlanId,
  ] = useState("");

  useEffect(() => {
    facilitiesApi.getAllFacilities().then((res) => {
      setDataLoaded(true);
      setFacilities(res.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedFacilityTabs, mostRecentlyCheckedInMonitorPlanId]);

  useEffect(() => {
    obtainCheckedOutLocations().then();
    return () => {
      setCheckedOutLocations([]); 
    };
  }, [openedFacilityTabs, mostRecentlyCheckedInMonitorPlanId]);

  const obtainCheckedOutLocations = async () => {
    const checkedOutLocationResult = await getCheckedOutLocations();

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
  };

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = ["Facility", "ORIS", "State"];

  // handles the actual component that appears after clicking on the dynamic tabs
  const selectedRowHandler = (info) => {
    addtabs([
      {
        title: `${info[0].col1} (${info[1].name}) ${
          info[1].active ? "" : "Inactive"
        }`,
        component: !sectionType ? (
          <div className="selectedTabsBox">
            <SelectedFacilityTab
              orisCode={info[0].col2}
              selectedConfig={info[1]}
              title={`${info[0].col1} (${info[1].name}) ${
                info[1].active ? "" : "Inactive"
              }`}
              user={user}
              checkout={
                checkedOutLocations.length > 0
                  ? checkedOutLocations[0].monPlanId === info[1].id
                    ? true
                    : info[2]
                  : info[2]
              }
              checkedOutLocations={checkedOutLocations}
              setMostRecentlyCheckedInMonitorPlanId={
                setMostRecentlyCheckedInMonitorPlanId
              }
              setMostRecentlyCheckedInMonitorPlanIdForTab={
                setMostRecentlyCheckedInMonitorPlanIdForTab
              }
            />
          </div>
        ) : (
          <div className="selectedTabsBox">
            <QACertTestSummaryTab
              orisCode={info[0].col2}
              selectedConfig={info[1]}
              title={`${info[0].col1} (${info[1].name}) ${
                info[1].active ? "" : "Inactive"
              }`}
              user={user}
            />
          </div>
        ),
        orisCode: info[0].col2,
        selectedConfig: info[1],
        checkout:
          checkedOutLocations.length > 0
            ? checkedOutLocations[0].monPlanId === info[1].id
              ? true
              : info[2]
            : info[2],
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
      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testingBtn"
        onClick={() => {
          selectedRowHandler([
            { col1: "1", col2: "2" },
            { id: "test", name: "testname", active: false },
            false,
          ]);
          // edge case
          selectedRowHandler([
            { col1: "1", col2: "2" },
            { id: "test", name: "testname", active: true },
            false,
          ]);
        }}
      />
      {!sectionType ? (
        <DataTableRender
          columnNames={columnNames}
          dataLoaded={dataLoaded}
          data={data}
          defaultSort="col2"
          openedFacilityTabs={openedFacilityTabs}
          user={user}
          pagination={true}
          filter={true}
          sectionTitle="Select Configurations"
          checkedOutLocations={checkedOutLocations}
          expandableRows={true}
          expandableRowComp={
            <DataTableConfigurations
              selectedRowHandler={selectedRowHandler}
              user={user}
              className="expand-row-data-table"
              checkedOutLocations={checkedOutLocations}
              actionsBtn={"Open"}
              setMostRecentlyCheckedInMonitorPlanId={
                setMostRecentlyCheckedInMonitorPlanId
              }
              setMostRecentlyCheckedInMonitorPlanIdForTab={
                setMostRecentlyCheckedInMonitorPlanIdForTab
              }
            />
          }
          headerStyling="padding-top-0 padding-left-2"
          setShowInactive={() => {}}
          setMostRecentlyCheckedInMonitorPlanId={
            setMostRecentlyCheckedInMonitorPlanId
          }
          setMostRecentlyCheckedInMonitorPlanIdForTab={
            setMostRecentlyCheckedInMonitorPlanIdForTab
          }
          ariaLabel={"Select Configurations"}
        />
      ) : (
        <DataTableRender
          columnNames={columnNames}
          dataLoaded={dataLoaded}
          data={data}
          defaultSort="col2"
          openedFacilityTabs={openedFacilityTabs}
          user={user}
          pagination={true}
          filter={true}
          sectionTitle="Select Configurations"
          expandableRows={true}
          expandableRowComp={
            <DataTableConfigurations
              selectedRowHandler={selectedRowHandler}
              user={user}
              className="expand-row-data-table"
              actionsBtn={"Open"}
              sectionType={sectionType}
            />
          }
          headerStyling="padding-top-0 padding-left-2"
          setShowInactive={() => {}}
          ariaLabel={"Select Configurationss"}
          sectionType={sectionType}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    openedFacilityTabs: state.openedFacilityTabs,
  };
};

export default connect(mapStateToProps, null)(SelectFacilitiesDataTable);
export { mapStateToProps };
