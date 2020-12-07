import React from "react";
import HeaderInfo from "./HeaderInfo/HeaderInfo";
import MethodSub from "./MethodSub/MethodSub";
import "./SelectedFacilityTab.css";
const SelectedFacilityTabRender = ({facility, monitoringPlans }) => {
  return (
    <div className='selectedMPTab'>

      <HeaderInfo facility={facility} monitoringPlans={monitoringPlans}/>
      <hr width="100%" align="center" />
      <MethodSub title="Method" />
      <hr width="100%" align="center" />
      <MethodSub title="Supplemental Method" />
      <hr width="100%" align="center" />
    </div>
  );
};

export default SelectedFacilityTabRender;
