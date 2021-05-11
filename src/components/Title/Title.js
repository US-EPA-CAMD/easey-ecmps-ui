import React from "react";
import { RiDashboardFill } from "react-icons/ri";
const Title = () => {
  return (
    <div className=" display-flex flex-align-center text-base-lightest">
      <RiDashboardFill size={32} style={{ fill: "white" }} />
      <h5 className="padding-0 padding-left-5px"> EASEY-In Dashboard</h5>
    </div>
  );
};

export default Title;
