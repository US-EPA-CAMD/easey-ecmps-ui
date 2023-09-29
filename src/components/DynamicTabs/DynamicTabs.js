import React, { useState, cloneElement, useEffect } from "react";
import { connect } from "react-redux";
import Tabs from "../Tabs/Tabs";
import TabPane from "../TabPane/TabPane";
import {
  addFacilityTab,
  removeFacilityTab,
  setActiveTab,
  setCheckoutState,
} from "../../store/actions/dynamicFacilityTab";
import MonitoringPlanTab from "../MonitoringPlanTab/MonitoringPlanTab";
import QACertTestSummaryTab from "../QACertTestSummaryTab/QACertTestSummaryTab";
import QACertEventTab from "../QACertEventTab/QACertEventTab";
import EmissionsTab from "../EmissionsTab/EmissionsTab";
import Export from "../export/Export/Export";
import {
  convertSectionToStoreName,
  MONITORING_PLAN_STORE_NAME,
  QA_CERT_TEST_SUMMARY_STORE_NAME,
  EMISSIONS_STORE_NAME,
  EXPORT_STORE_NAME,
  QA_CERT_EVENT_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";
import "./DynamicTabs.scss";
import { setCurrentTabIndex } from "../../store/actions/currentTabIndex";

export const DynamicTabs = ({
  tabsProps,
  checkedOutLocations,
  user,
  removeFacility,
  addFacility,
  setMostRecentlyCheckedInMonitorPlanId,
  workspaceSection,
  setCurrentTabIndex,
  currentTabIndex,
  setCheckout,
  mostRecentlyCheckedInMonitorPlanIdForTab,
  setMostRecentlyCheckedInMonitorPlanIdForTab,
}) => {
  const [tabs, setTabs] = useState([]);

  useEffect(()=>{
    setTabs(tabsProps())
  }, [tabsProps])

  const addTabsHandler = (newTabs) => {
    newTabs.forEach((t) => {
      if (!tabs.some((facility) => facility.title === t.title)) {
        tabs.push(t);
        addFacility(
          {
            orisCode: t.orisCode,
            checkout: t.checkout,
            name: t.title,
            location: [0, t.selectedConfig?.monitoringLocationData[0]?.id ?? null],
            section: [4, "Methods"], // watch out for this outside MP
            selectedConfig: t.selectedConfig,
            facId: t.selectedConfig.facId, // changed to id ??
            // id: t.selectedConfig.locations[0].id,
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
  };

  const removeTabsHandler = (index) => {
    // setTimeout(()=>{
    tabs.splice(index, 1);
    removeFacility(index, workspaceSection);
    setTabs([...tabs]);

    setTimeout(() => {
      const elems = document.querySelectorAll(".tab-button");
      if (elems.length > 0) {
        elems[elems.length - 1].focus();
      }
    });

    // },100)
  };

  const getModule = (item) => {
    if (tabs.length > 1 && item.title !== "Select Configurations") {
      switch (workspaceSection) {
        case MONITORING_PLAN_STORE_NAME:
          item.component = (
            <MonitoringPlanTab
              resetTimer={item.component.resetTimer}
              setExpired={item.component.setExpired}
              resetTimerFlag={item.component.resetTimerFlag}
              callApiFlag={item.component.callApiFlag}
              orisCode={item.orisCode}
              selectedConfig={item.selectedConfig}
              title={item.title}
              user={user}
              checkout={item.checkout}
              checkedOutLocations={checkedOutLocations}
              mostRecentlyCheckedInMonitorPlanIdForTab={
                mostRecentlyCheckedInMonitorPlanIdForTab
              }
              setMostRecentlyCheckedInMonitorPlanIdForTab={
                setMostRecentlyCheckedInMonitorPlanIdForTab
              }
              workspaceSection={workspaceSection}
            />
          );
          break;

        case QA_CERT_TEST_SUMMARY_STORE_NAME:
          item.component = (
            <QACertTestSummaryTab
              resetTimer={item.component.resetTimer}
              setExpired={item.component.setExpired}
              resetTimerFlag={item.component.resetTimerFlag}
              callApiFlag={item.component.callApiFlag}
              orisCode={item.orisCode}
              selectedConfig={item.selectedConfig}
              title={item.title}
              user={user}
              isCheckedOut={item.checkout}
              checkedOutLocations={checkedOutLocations}
            />
          );

          break;

        case QA_CERT_EVENT_STORE_NAME:
          item.component = (
            <QACertEventTab
              resetTimer={item.component.resetTimer}
              setExpired={item.component.setExpired}
              resetTimerFlag={item.component.resetTimerFlag}
              callApiFlag={item.component.callApiFlag}
              orisCode={item.orisCode}
              selectedConfig={item.selectedConfig}
              title={item.title}
              user={user}
              isCheckedOut={item.checkout}
              checkedOutLocations={checkedOutLocations}
              workspaceSection={workspaceSection}
            />
          );

          break;
        case EMISSIONS_STORE_NAME:
          item.component = (
            <EmissionsTab
              resetTimer={item.component.resetTimer}
              setExpired={item.component.setExpired}
              resetTimerFlag={item.component.resetTimerFlag}
              callApiFlag={item.component.callApiFlag}
              orisCode={item.orisCode}
              selectedConfig={item.selectedConfig}
              title={item.title}
              user={user}
              checkout={item.checkout}
              checkedOutLocations={checkedOutLocations}
              workspaceSection={workspaceSection}
            />
          );

          break;
        case EXPORT_STORE_NAME:
          item.component = (
            <Export
              orisCode={item.orisCode}
              selectedConfig={item.selectedConfig}
              title={item.title}
              user={user}
              workspaceSection={workspaceSection}
            />
          );

          break;
        default:
          break;
      }
    }

    return item.component;
  };
  return (
    <div>
      {workspaceSection === EXPORT_STORE_NAME ? (
        <Tabs
          dynamic={true}
          removeTabs={removeTabsHandler}
          tabProps={tabs}
          user={user}
          workspaceSection={workspaceSection}
          currentTabIndex={currentTabIndex}
          setCheckout={setCheckout}
          setCurrentTabIndex={setCurrentTabIndex}
        >
          {tabs &&
            tabs.map((tab, i) => (
              <TabPane
                key={i}
                title={tab.title}
                locationId={
                  tab.selectedConfig ? tab.selectedConfig.id : "initial"
                }
                facId={
                  tab.selectedConfig ? tab.selectedConfig.facId : "initial"
                }
                selectedConfigName={tab?.selectedConfig?.name ?? "initial"}
              >
                {cloneElement(getModule(tab), {
                  addtabs: addTabsHandler,
                })}
              </TabPane>
            ))}
        </Tabs>
      ) : (
        <Tabs
          dynamic={true}
          removeTabs={removeTabsHandler}
          tabProps={tabs}
          checkedOutLocations={checkedOutLocations}
          user={user}
          setMostRecentlyCheckedInMonitorPlanId={
            setMostRecentlyCheckedInMonitorPlanId
          }
          workspaceSection={workspaceSection}
          currentTabIndex={currentTabIndex}
          setCheckout={setCheckout}
          setCurrentTabIndex={setCurrentTabIndex}
        >
          {tabs &&
            tabs.map((tab, i) => (
              <TabPane
                key={i}
                title={tab.title}
                locationId={
                  tab.selectedConfig ? tab.selectedConfig.id : "initial"
                }
                facId={
                  tab.selectedConfig ? tab.selectedConfig.facId : "initial"
                }
                selectedConfigName={tab?.selectedConfig?.name ?? "initial"}
              >
                {cloneElement(getModule(tab), {
                  addtabs: addTabsHandler,
                })}
              </TabPane>
            ))}
        </Tabs>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentTabIndex: state.currentTabIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
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
export { mapDispatchToProps };
export { mapStateToProps };
