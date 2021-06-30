import React, { useState, cloneElement } from "react";
import { connect } from "react-redux";
import Tabs from "../Tabs/Tabs";
import TabPane from "../TabPane/TabPane";
import {
  addFacilityTab,
  removeFacilityTab,
} from "../../store/actions/dynamicFacilityTab";
import { setActiveTab } from "../../store/actions/activeTab";

import "./DynamicTabs.scss";

export const DynamicTabs = ({
  tabsProps,
  removeFacility,
  addFacility,
  setActive,
}) => {
  const [tabs, setTabs] = useState(tabsProps);

  const addTabsHandler = (newTabs) => {
    newTabs.forEach((t) => {
      if (!tabs.some((facility) => facility.title === t.title)) {
        tabs.push(t);
        addFacility({
          orisCode: t.orisCode,
          checkout: t.checkout,
          name: t.title,
          location: [0, t.selectedConfig.locations[0].id],
          section: [3, "Methods"],
          selectedConfig: t.selectedConfig,
          inactive:[false,false]
        });
      }
    });
    setTabs([...tabs]);
  };

  const removeTabsHandler = (index) => {
    tabs.splice(index, 1);
    removeFacility(index);
    setTabs([...tabs]);
  };

  return (
    <div>
      <Tabs dynamic={true} removeTabs={removeTabsHandler} setActive={setActive}>
        {tabs &&
          tabs.map((tab, i) => (
            <TabPane key={i} title={tab.title}>
              {cloneElement(tab.component, {
                addtabs: addTabsHandler,
              })}
            </TabPane>
          ))}
      </Tabs>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFacility: (facility) => dispatch(removeFacilityTab(facility)),
    addFacility: (facility) => dispatch(addFacilityTab(facility)),
    setActive: (orisCode, value) => dispatch(setActiveTab(orisCode, value)),
  };
};

export default connect(null, mapDispatchToProps)(DynamicTabs);
export { mapDispatchToProps };
