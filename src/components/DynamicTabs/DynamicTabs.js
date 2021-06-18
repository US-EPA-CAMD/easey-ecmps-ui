import React, { useState } from "react";
import { connect } from "react-redux";
import Tabs from "../Tabs/Tabs";
import TabPane from "../TabPane/TabPane";
import "./DynamicTabs.scss";
import {addFacilityTab, removeFacilityTab} from "../../store/actions/dynamicFacilityTab";
import ResizeObserver from 'resize-observer-polyfill';
import { setActiveTab } from "../../store/actions/activeTab";

export const DynamicTabs = ({
  tabsProps,
  removeFacility,
  addFacility,
  setActive
}) => {
  const [tabs, setTabs] = useState(tabsProps);
  const [containerWidth, setContainerWidth] = useState(null);
  const firstTabWidth = 142;
  const tabWidth = 102;

  const initResizeObs = (containerBox) =>{
    setContainerWidth(containerBox.getBoundingClientRect().width);
    const resizeObserver = new ResizeObserver(entries=>{
      if(entries && entries[0].contentBoxSize){
        setContainerWidth(entries[0].contentBoxSize[0].inlineSize);
      }
    })
    resizeObserver.observe(containerBox);
  }

  const addTabsHandler = (newTabs) => {
    const availableWidth = containerWidth-firstTabWidth;
    if((tabs.length)*tabWidth <= availableWidth){
      newTabs.forEach((t) => {
        if(!tabs.some(facility => facility.title === t.title)){
          tabs.push(t);
          addFacility({orisCode:t.orisCode,configID:t.configID,checkout:t.checkout, name: t.title,location:[0,t.locations[0].id],section:3,locations:t.locations});
        }
      });
      setTabs([...tabs]);
    }else{
      alert("Please close one of the open Facility tabs, in order to open a new tab.");
    }
  };

  const removeTabsHandler = (index) => {
    tabs.splice(index, 1);
    removeFacility(index);
    setTabs([...tabs]);
  };

  return (
    <div>
      <Tabs dynamic={true} removeTabs={removeTabsHandler} setResizeObserver={initResizeObs} setActive={setActive}>
        {tabs &&
          tabs.map((tab, i) => (
            <TabPane key={i} title={tab.title}>
              {React.cloneElement(tab.component, {
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
    setActive: (orisCode,value) => dispatch(setActiveTab(orisCode,value))
  };
};

export default connect(null, mapDispatchToProps)(DynamicTabs);
