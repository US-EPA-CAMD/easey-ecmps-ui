import React, { useState } from "react";
import { connect } from "react-redux";
import Tabs from "./Tabs";
import TabPane from "./TabPane";
import "./DynamicTabs.css";
import {addFacilityTab, removeFacilityTab} from "../../../store/actions/dynamicFacilityTab";

export const DynamicTabs = ({
  tabsProps,
  removeFacility,
  addFacility
}) => {
  const [tabs, setTabs] = useState(tabsProps);

  const addTabsHandler = (newTabs) => {
    newTabs.forEach((t) => {
        if(!tabs.some(facility => facility.title === t.title)){
          tabs.push(t);
          addFacility(t.title);
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

const mapDispatchToProps = (dispatch) => {
  return {
    removeFacility: (facility) => dispatch(removeFacilityTab(facility)),
    addFacility: (facility) => dispatch(addFacilityTab(facility)),
  };
};

export default  connect(null, mapDispatchToProps)(DynamicTabs);
