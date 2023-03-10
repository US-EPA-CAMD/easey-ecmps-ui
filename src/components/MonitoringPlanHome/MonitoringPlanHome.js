import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import DataTable from '../datatablesContainer/SelectFacilitiesDataTable/SelectFacilitiesDataTable';
import MonitoringPlanTab from '../MonitoringPlanTab/MonitoringPlanTab';
import QACertTestSummaryTab from '../QACertTestSummaryTab/QACertTestSummaryTab';
import QACertEventTab from '../QACertEventTab/QACertEventTab';
import EmissionsTab from '../EmissionsTab/EmissionsTab';
import Export from '../export/Export/Export';
import DynamicTabs from '../DynamicTabs/DynamicTabs';

import { getCheckedOutLocations } from '../../utils/api/monitoringPlansApi';

import * as mpApi from '../../utils/api/monitoringPlansApi';

import './MonitoringPlanHome.scss';
import {
  MONITORING_PLAN_STORE_NAME,
  QA_CERT_TEST_SUMMARY_STORE_NAME,
  EMISSIONS_STORE_NAME,
  EXPORT_STORE_NAME,
  QA_CERT_EVENT_STORE_NAME,
} from '../../additional-functions/workspace-section-and-store-names';
import * as modules from '../../utils/constants/moduleTitles';

export const MonitoringPlanHome = ({
  user,
  resetTimer,
  setExpired,
  resetTimerFlag,
  callApiFlag,
  openedFacilityTabs,
  workspaceSection,
}) => {
  const [titleName, setTitleName] = useState(document.title);
  const [checkedOutLocations, setCheckedOutLocations] = useState([]);
  const [
    mostRecentlyCheckedInMonitorPlanIdForTab,
    setMostRecentlyCheckedInMonitorPlanIdForTab,
  ] = useState('');

  useEffect(() => {
    obtainCheckedOutLocations().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedFacilityTabs, mostRecentlyCheckedInMonitorPlanIdForTab]);

  useEffect(() => {
    switch (workspaceSection) {
      case MONITORING_PLAN_STORE_NAME:
        document.title = modules.monitoring_plans_module;
        setTitleName(modules.monitoring_plans_module);
        break;
      case QA_CERT_TEST_SUMMARY_STORE_NAME:
        document.title = modules.qa_Certifications_Test_Summary_Module;
        setTitleName(modules.qa_Certifications_Test_Summary_Module);
        break;
      case QA_CERT_EVENT_STORE_NAME:
        document.title = modules.qa_Certifications_Event_Module;
        setTitleName(modules.qa_Certifications_Event_Module);
        break;
      case EXPORT_STORE_NAME:
        document.title = modules.export_Module;
        setTitleName(modules.export_Module);
        break;
      case EMISSIONS_STORE_NAME:
        document.title = modules.emissions_module;
        setTitleName(modules.emissions_module);
        break;
      default:
        break;
    }
    return () => {
      setTitleName(''); // This worked for me
    };
  }, [workspaceSection]);

  const obtainCheckedOutLocations = async () => {
    const checkedOutLocationResult = await getCheckedOutLocations();

    let checkedOutLocationList = [];
    if (checkedOutLocationResult) {
      if (checkedOutLocationResult.data) {
        checkedOutLocationList = checkedOutLocationResult.data;
      }
      // *** find locations currently checked out by the user
      const currentlyCheckedOutMonPlanId = checkedOutLocationList.filter(
        (element) => element['checkedOutBy'] === user.firstName
      )[0]
        ? checkedOutLocationList.filter(
            (element) => element['checkedOutBy'] === user.firstName
          )[0]['monPlanId']
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
    window.addEventListener('beforeunload', checkInAll);

    return () => {
      window.removeEventListener('beforeunload', checkInAll);
    };
  }, []);

  const handleTabState = () => {
    const tabArr = [
      {
        title: 'Select Configurations',
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
            workspaceSection={workspaceSection}
          />
        ),
      },
    ];
    // uses Redux to put the saved Tabs back in the UI if the user leaves the page
    switch (workspaceSection) {
      case MONITORING_PLAN_STORE_NAME:
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
                workspaceSection={workspaceSection}
              />
            ),
            orisCode: row.orisCode,
            selectedConfig: row.selectedConfig,
            checkout: row.checkout,
          });
        }
        break;
      case QA_CERT_TEST_SUMMARY_STORE_NAME:
        for (const row of openedFacilityTabs) {
          tabArr.push({
            title: row.name,
            component: (
              <QACertTestSummaryTab
                resetTimer={resetTimer}
                setExpired={setExpired}
                resetTimerFlag={resetTimerFlag}
                callApiFlag={callApiFlag}
                orisCode={row.orisCode}
                selectedConfig={row.selectedConfig}
                title={row.name}
                user={user}
                isCheckedOut={row.checkout}
                checkedOutLocations={checkedOutLocations}
              />
            ),
            orisCode: row.orisCode,
            selectedConfig: row.selectedConfig,
            checkout: row.checkout,
          });
        }
        break;
      case QA_CERT_EVENT_STORE_NAME:
        for (const row of openedFacilityTabs) {
          tabArr.push({
            title: row.name,
            component: (
              <QACertEventTab
                resetTimer={resetTimer}
                setExpired={setExpired}
                resetTimerFlag={resetTimerFlag}
                callApiFlag={callApiFlag}
                orisCode={row.orisCode}
                selectedConfig={row.selectedConfig}
                title={row.name}
                user={user}
                isCheckedOut={row.checkout}
                checkedOutLocations={checkedOutLocations}
                workspaceSection={workspaceSection}
              />
            ),
            orisCode: row.orisCode,
            selectedConfig: row.selectedConfig,
            checkout: row.checkout,
          });
        }
        break;
      case EMISSIONS_STORE_NAME:
        for (const row of openedFacilityTabs) {
          tabArr.push({
            title: row.name,
            component: (
              <EmissionsTab
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
                workspaceSection={workspaceSection}
              />
            ),
            orisCode: row.orisCode,
            selectedConfig: row.selectedConfig,
            checkout: row.checkout,
          });
        }
        break;
      case EXPORT_STORE_NAME:
        for (const row of openedFacilityTabs) {
          tabArr.push({
            title: row.name,
            component: (
              <Export
                orisCode={row.orisCode}
                selectedConfig={row.selectedConfig}
                title={row.name}
                user={user}
                workspaceSection={workspaceSection}
              />
            ),
            orisCode: row.orisCode,
            selectedConfig: row.selectedConfig,
            checkout: row.checkout,
          });
        }
        break;
      default:
        break;
    }
    return tabArr;
  };

  return (
    <div className="react-transition fade-in padding-x-3">
      <div className="text-black margin-top-1 display-none tablet:display-block">
        <h2
          className="display-inline-block page-header margin-top-2"
          epa-testid={`${titleName.split(' ').join('')}Title`}
        >
          {titleName}
        </h2>
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
          epa-testid={`${titleName.split(' ').join('')}Title`}
        >
          {titleName}
        </h1>
      </div>

      <div>
        <DynamicTabs
          tabsProps={() => handleTabState()}
          checkedOutLocations={checkedOutLocations}
          user={user}
          workspaceSection={workspaceSection}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    openedFacilityTabs: state.openedFacilityTabs[ownProps.workspaceSection],
  };
};

export default connect(mapStateToProps, null)(MonitoringPlanHome);
export { mapStateToProps };
