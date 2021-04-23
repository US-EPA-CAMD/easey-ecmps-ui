import React from "react";
import './Title.scss';
import { RiDashboardFill } from "react-icons/ri";
const Title = () => {
  return (
    <div className="navTitle">
      <RiDashboardFill size={32} style={{ fill: "white" }} />
      <h5> EASEY-In Dashboard</h5>
    </div>
  );
};

export default Title;
