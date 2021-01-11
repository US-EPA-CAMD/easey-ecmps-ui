import React, { useState } from "react";
import Tabs from "./Tabs";
import TabPane from "./TabPane";
import "./DynamicTabs.css";

const DynamicTabs = ({
  tabsProps,
  // addDynamicTabHandler,
  // removeDynamicTabHandler,
  // dynamicFacilityTabs,
}) => {
  const [tabs, setTabs] = useState(tabsProps);

  const addTabsHandler = (newTabs) => {
    newTabs.forEach((t) => {
      // if (!dynamicFacilityTabs.includes(t.title)) {
        if(!tabs.some(facility => facility.title === t.title)){
        // addDynamicTabHandler(t.title);
        tabs.push(t);
      }
    });
    setTabs([...tabs]);
  };

  const removeTabsHandler = (index) => {
    tabs.splice(index, 1);
    // removeDynamicTabHandler(index);
    setTabs([...tabs]);
  };

  return (
    <div>
      <Tabs dynamic={true} removeTabs={removeTabsHandler}>
        {tabs &&
          tabs.map((tab, i) => (
            <TabPane key={i} title={tab.title}>
              {React.cloneElement(tab.component, {
                addTabs: addTabsHandler,
              })}
            </TabPane>
          ))}
      </Tabs>
    </div>
  );
};

export default DynamicTabs;
