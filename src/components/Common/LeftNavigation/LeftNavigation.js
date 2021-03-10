import React from "react";
import "./LeftNavigation.css";
import Accessories from "./Accessories/Accessories";
import Workspace from "./Workspace/Workspace";
import Title from "./Title/Title";

const LeftNavigation = () => {
  return (
    <div className="leftNavigation">
      <Title />
      <Workspace />
      <div className="bottomPart">
        <Accessories />
      </div>
    </div>
  );
};

export default LeftNavigation;
