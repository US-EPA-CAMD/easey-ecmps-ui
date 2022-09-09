import React, { useState, cloneElement } from "react";
import { connect } from "react-redux";
import { Tabs } from "../Tabs/Tabs";
import TabPane from "../TabPane/TabPane";
import {
  addFacilityTab,
  removeFacilityTab,
} from "../../store/actions/dynamicFacilityTab";

import {
  convertSectionToStoreName,
  EXPORT_STORE_NAME,
  QA_CERT_TEST_SUMMARY_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";
import "./DynamicTabs.scss";

export const DynamicTabs = ({
  tabsProps,
  checkedOutLocations,
  user,
  removeFacility,
  addFacility,
  setMostRecentlyCheckedInMonitorPlanId,
  mostRecentlyCheckedInMonitorPlanId,
  workspaceSection,
}) => {
  const [tabs, setTabs] = useState(tabsProps);

  const addTabsHandler = (newTabs) => {
    newTabs.forEach((t) => {
      if (!tabs.some((facility) => facility.title === t.title)) {
        tabs.push(t);
        addFacility(
          {
            orisCode: t.orisCode,
            checkout: t.checkout,
            name: t.title,
            location: [0, t.selectedConfig.locations[0].id],
            section: [4, "Methods"],
            selectedConfig: t.selectedConfig,
            facId: t.selectedConfig.locations[0].facId,
            inactive: [false, false],
          },
          workspaceSection
        );
      }
    });
    setTabs([...tabs]);

    setTimeout(() => {
      document
        .querySelectorAll(".tab-button")
        [document.querySelectorAll(".tab-button").length - 1].focus();
    });
  };

  const removeTabsHandler = (index) => {
    tabs.splice(index, 1);
    removeFacility(index, workspaceSection);
    setTabs([...tabs]);
  };
  return (
    <div>
      {workspaceSection === QA_CERT_TEST_SUMMARY_STORE_NAME ? (
        <Tabs
          dynamic={true}
          removeTabs={removeTabsHandler}
          tabProps={tabs}
          user={user}
          workspaceSection={workspaceSection}
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
              >
                {cloneElement(tab.component, {
                  addtabs: addTabsHandler,
                })}
              </TabPane>
            ))}
        </Tabs>
      ) : workspaceSection === EXPORT_STORE_NAME ? (
        <Tabs
          dynamic={true}
          removeTabs={removeTabsHandler}
          tabProps={tabs}
          user={user}
          workspaceSection={workspaceSection}
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
              >
                {cloneElement(tab.component, {
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
              >
                {cloneElement(tab.component, {
                  addtabs: addTabsHandler,
                })}
              </TabPane>
            ))}
        </Tabs>
      )}
    </div>
  );
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
  };
};

export default connect(null, mapDispatchToProps)(DynamicTabs);
export { mapDispatchToProps };
