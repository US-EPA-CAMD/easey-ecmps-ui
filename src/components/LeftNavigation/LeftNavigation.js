import React from "react";
import "./LeftNavigation.scss";
import Accessories from "../Accessories/Accessories";
import Workspace from "../Workspace/Workspace";
import Title from "../Title/Title";

const LeftNavigation = () => {
  return (
    <div className="bg-base width-full height-full font-body-sm padding-3">
      <Title />
      <Workspace />
      <div className="bottomPart">
        <Accessories />
      </div>
    </div>
  );
};

export default LeftNavigation;
