import React, { useState } from "react";
import Tabs from "./Tabs";
import TabPane from "./TabPane";
import "./DynamicTabs.css";

const DynamicTabs = ({ tabsProps }) => {
  const [tabs, setTabs] = useState(tabsProps);

  const addTabsHandler = (newTabs) => {
    newTabs.forEach((t) => {
      tabs.push(t);
    });
    setTabs([...tabs]);
  };

  const removeTabsHandler = (index) => {
    tabs.splice(index, 1);
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
