import React from "react";
import "./HomeView.css";

import DynamicTabBar from "./DynamicTabBar/DynamicTabBar";
const HomeView = ({ facilities, loadFacilitiesData }) => {
  return (
    <div className="home-container">
      <div className="header">
        <h1 className="title">Monitoring Plans</h1>
        <button className="ovalBTN">Import</button>
      </div>

      <div className="tabsBar">
        <DynamicTabBar />
      </div>
    </div>
  );
};

export default HomeView;
