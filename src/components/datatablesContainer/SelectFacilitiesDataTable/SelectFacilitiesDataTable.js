import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import * as fs from '../../../utils/selectors/facilities';
import MonitoringPlanTab from '../../MonitoringPlanTab/MonitoringPlanTab';
import QACertTestSummaryTab from '../../QACertTestSummaryTab/QACertTestSummaryTab';
import QACertEventTab from '../../QACertEventTab/QACertEventTab';
import { DataTableRender } from '../../DataTableRender/DataTableRender';
import './SelectFacilitiesDataTable.scss';
import DataTableConfigurations from '../DataTableConfigurations/DataTableConfigurations';
import * as facilitiesApi from '../../../utils/api/facilityApi';
import { getCheckedOutLocations } from '../../../utils/api/monitoringPlansApi';
import {
  MONITORING_PLAN_STORE_NAME,
  QA_CERT_TEST_SUMMARY_STORE_NAME,
  EMISSIONS_STORE_NAME,
  QA_CERT_EVENT_STORE_NAME,
} from '../../../additional-functions/workspace-section-and-store-names';
import Export from '../../export/Export/Export';
import EmissionsTab from '../../EmissionsTab/EmissionsTab';
import { useHistory } from "react-router-dom";
import { resetTabOrder } from "../../../utils/functions";

export const SelectFacilitiesDataTable = ({
  user,
  addtabs,
  openedFacilityTabs,
  setMostRecentlyCheckedInMonitorPlanIdForTab,
  workspaceSection,
}) => {
  const [facilities, setFacilities] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [checkedOutLocations, setCheckedOutLocations] = useState([]);
  const [
    mostRecentlyCheckedInMonitorPlanId,
    setMostRecentlyCheckedInMonitorPlanId,
  ] = useState('');
  const history = useHistory();

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
  const columnNames = ['Facility', 'ORIS', 'State'];

  // handles the actual component that appears after clicking on the dynamic tabs
  const selectedRowHandler = (info) => {
    const title = `${info[0].col1} (${info[1].name}) ${
      info[1].active ? '' : 'Inactive'
    }`;

    // if user has THIS plan checkedout
    const isCheckedOutByUser = (configs) => {
      return (
        configs.map((location) => location['monPlanId']).indexOf(info[1].id) >
          -1 &&
        configs[
          configs.map((location) => location['monPlanId']).indexOf(info[1].id)
        ]['checkedOutBy'] === user['userId']
      );
    };

    const checkedOutValue = isCheckedOutByUser(checkedOutLocations);

    addtabs([
      {
        title,
        component:
          workspaceSection === MONITORING_PLAN_STORE_NAME ? (
            <div className="selectedTabsBox">
              <MonitoringPlanTab
                orisCode={info[0].col2}
                selectedConfig={info[1]}
                title={title}
                user={user}
                checkout={info[2] || checkedOutValue}
                checkedOutLocations={checkedOutLocations}
                setMostRecentlyCheckedInMonitorPlanId={
                  setMostRecentlyCheckedInMonitorPlanId
                }
                setMostRecentlyCheckedInMonitorPlanIdForTab={
                  setMostRecentlyCheckedInMonitorPlanIdForTab
                }
                workspaceSection={workspaceSection}
              />
            </div>
          ) : workspaceSection === QA_CERT_TEST_SUMMARY_STORE_NAME ? (
            <div className="selectedTabsBox">
              <QACertTestSummaryTab
                orisCode={info[0].col2}
                selectedConfig={info[1]}
                title={title}
                user={user}
                workspaceSection={workspaceSection}
              />
            </div>
          ) : workspaceSection === QA_CERT_EVENT_STORE_NAME ? (
            <div className="selectedTabsBox">
              <QACertEventTab
                orisCode={info[0].col2}
                selectedConfig={info[1]}
                title={title}
                user={user}
                workspaceSection={workspaceSection}
              />
            </div>
          ) : workspaceSection === EMISSIONS_STORE_NAME ? (
            <div className="selectedTabsBox">
              <EmissionsTab
                orisCode={info[0].col2}
                selectedConfig={info[1]}
                title={title}
                user={user}
                checkout={info[2] || checkedOutValue}
                checkedOutLocations={checkedOutLocations}
                workspaceSection={workspaceSection}
              />
            </div>
          ) : (
            // handles export
            <div className="selectedTabsBox">
              <Export
                orisCode={info[0].col2}
                selectedConfig={info[1]}
                title={title}
                user={user}
                workspaceSection={workspaceSection}
              />
            </div>
          ),

        orisCode: info[0].col2,
        selectedConfig: info[1],
        // info[2] shows true if "open and checkout" was click first time
        // checkedoutvalue shows true if user already had it checked out but navigates away
        checkout: info[2] || checkedOutValue,
      },
    ]);
  };

  const data = useMemo(() => {
    if (facilities.length != undefined && facilities.length > 0) {
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
            { col1: '1', col2: '2' },
            { id: 'test', name: 'testname', active: false },
            false,
          ]);
          // edge case
          selectedRowHandler([
            { col1: '1', col2: '2' },
            { id: 'test', name: 'testname', active: true },
            false,
          ]);
        }}
      />
      {/* {workspaceSection === MONITORING_PLAN_STORE_NAME ? ( */}

      <DataTableRender
        columnNames={columnNames}
        dataLoaded={dataLoaded}
        data={data}
        defaultSort="col2"
        openedFacilityTabs={openedFacilityTabs[workspaceSection]}
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
            actionsBtn={'Open'}
            setMostRecentlyCheckedInMonitorPlanId={
              setMostRecentlyCheckedInMonitorPlanId
            }
            setMostRecentlyCheckedInMonitorPlanIdForTab={
              setMostRecentlyCheckedInMonitorPlanIdForTab
            }
            workspaceSection={workspaceSection}
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
        ariaLabel={'Select Configurations'}
        workspaceSection={workspaceSection}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    openedFacilityTabs: state.openedFacilityTabs[ownProps.workspaceSection],
  };
};

export default connect(mapStateToProps, null)(SelectFacilitiesDataTable);
export { mapStateToProps };
