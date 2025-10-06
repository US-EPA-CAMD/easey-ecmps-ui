import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  convertSectionToStoreName,
  EMISSIONS_STORE_NAME,
  EXPORT_STORE_NAME,
  MATS_STORE_NAME,
  MONITORING_PLAN_STORE_NAME,
  QA_CERT_EVENT_STORE_NAME,
  QA_CERT_TEST_SUMMARY_STORE_NAME,
  MOCK_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";
import { setCurrentTabIndex } from "../../store/actions/currentTabIndex";
import {
  addFacilityTab,
  removeFacilityTab,
  setActiveTab,
  setCheckoutState,
} from "../../store/actions/dynamicFacilityTab";
import DataTable from "../datatablesContainer/SelectFacilitiesDataTable/SelectFacilitiesDataTable";
import EmissionsTab from "../EmissionsTab/EmissionsTab";
import Export from "../export/Export/Export";
import MatsTab from "../MatsTab/MatsTab";
import MonitoringPlanTab from "../MonitoringPlanTab/MonitoringPlanTab";
import QACertEventTab from "../QACertEventTab/QACertEventTab";
import QACertTestSummaryTab from "../QACertTestSummaryTab/QACertTestSummaryTab";
import Tabs from "../Tabs/Tabs";
import "./DynamicTabs.scss";
import { Welcome } from "./mocks";

export const DynamicTabs = ({
  addFacility,
  checkedOutLocations,
  currentTabIndex,
  removeFacility,
  setCheckout,
  setCurrentTabIndex,
  setMostRecentlyCheckedInMonitorPlanIdForTab,
  tabsProps,
  user,
  workspaceSection,
}) => {
  /** @type {[{title: string, orisCode?: number, selectedConfig?: {id: string, facId: number, name: string}, checkout?: boolean}[], function]} */
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    setTabs(tabsProps());
  }, [tabsProps]);

  const addTabsHandler = (newTabs) => {
    newTabs.forEach((t) => {
      if (!tabs.some((facility) => facility.title === t.title)) {
        tabs.push(t);
        addFacility(
          {
            orisCode: t.orisCode,
            checkout: t.checkout,
            name: t.title,
            location: [
              0,
              t.selectedConfig?.monitoringLocationData?.[0]?.id ?? null,
            ],
            section: [4, "Methods"], // watch out for this outside MP
            selectedConfig: t.selectedConfig,
            facId: t.selectedConfig.facId, // changed to id ??
            inactive: [false, false],
          },
          workspaceSection
        );
      }
    });
    setTabs([...tabs]);
    setTimeout(() => {
      const elems = document.querySelectorAll(".tab-button");
      if (elems.length > 0) {
        elems[elems.length - 1].focus();
      }
    });

    openNewAddedTab()
  };

  const openNewAddedTab = () => {
    let index = tabs?.length - 1;
    setCurrentTabIndex(index)
  }

  const removeTabsHandler = (index) => {
    const prevTabCount = tabs.length;
    tabs.splice(index, 1);
    removeFacility(index, workspaceSection);
    setTabs([...tabs]);
    if (currentTabIndex === prevTabCount - 1) {
      setCurrentTabIndex(index - 1);
    }

    setTimeout(() => {
      const elems = document.querySelectorAll(".tab-button");
      if (elems.length > 0) {
        elems[elems.length - 1].focus();
      }
    });
  };

  const getModule = (item) => {
    if (item.title === "Select Configurations") {
      return (
        <DataTable
          addtabs={addTabsHandler}
          user={user}
          setMostRecentlyCheckedInMonitorPlanIdForTab={
            setMostRecentlyCheckedInMonitorPlanIdForTab
          }
          workspaceSection={workspaceSection}
        />
      );
    }
    return (() => {
      switch (workspaceSection) {
        case MONITORING_PLAN_STORE_NAME:
          return (
            <MonitoringPlanTab
              orisCode={item.orisCode}
              selectedConfigId={item.selectedConfig.id}
              removeTab={removeTabsHandler}
              title={item.title}
              user={user}
            />
          );

        case QA_CERT_TEST_SUMMARY_STORE_NAME:
          return (
            <QACertTestSummaryTab
              orisCode={item.orisCode}
              selectedConfigId={item.selectedConfig.id}
              title={item.title}
              user={user}
            />
          );

        case QA_CERT_EVENT_STORE_NAME:
          return (
            <QACertEventTab
              orisCode={item.orisCode}
              selectedConfigId={item.selectedConfig.id}
              title={item.title}
              user={user}
            />
          );

        case EMISSIONS_STORE_NAME:
          return (
            <EmissionsTab
              orisCode={item.orisCode}
              selectedConfigId={item.selectedConfig.id}
              title={item.title}
              user={user}
            />
          );

        case EXPORT_STORE_NAME:
          return (
            <Export
              orisCode={item.orisCode}
              selectedConfigId={item.selectedConfig.id}
              title={item.title}
            />
          );

        case MATS_STORE_NAME:
          return (
            <MatsTab
              orisCode={item.orisCode}
              selectedConfigId={item.selectedConfig.id}
              title={item.title}
              user={user}
            />
          );
        case MOCK_STORE_NAME:
          return (
            <Welcome 
              addtabs={addTabsHandler}
              name={user.firstName}
            />
          );

        default:
          break;
      }
    })();
  };
  return (
    <div>
      <Tabs
        checkedOutLocations={checkedOutLocations}
        dynamic={true}
        removeTabs={removeTabsHandler}
        user={user}
        workspaceSection={workspaceSection}
        currentTabIndex={currentTabIndex}
        setCheckout={setCheckout}
        setCurrentTabIndex={setCurrentTabIndex}
        panes={tabs.map((tab) => ({
          content: getModule(tab),
          facId: tab.selectedConfig?.facId ?? "initial",
          locationId: tab.selectedConfig?.id ?? "initial",
          selectedConfigName: tab.selectedConfig?.name ?? "initial",
          title: tab.title,
        }))}
      />
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    currentTabIndex: state.currentTabIndex,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    removeFacility: (facility, workspaceSection) =>
      dispatch(
        removeFacilityTab(facility, convertSectionToStoreName(workspaceSection))
      ),
    addFacility: (facility, workspaceSection) =>
      dispatch(
        addFacilityTab(facility, convertSectionToStoreName(workspaceSection))
      ),
    setActive: (facility, workspaceSection) =>
      dispatch(
        setActiveTab(facility, convertSectionToStoreName(workspaceSection))
      ),
    setCheckout: (value, configID, workspaceSection) =>
      dispatch(
        setCheckoutState(
          value,
          configID,
          convertSectionToStoreName(workspaceSection)
        )
      ),
    setCurrentTabIndex: (value) => dispatch(setCurrentTabIndex(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DynamicTabs);
