import React from "react";
import DataTable from "../SelectFacilitiesTab/DataTable";
import HeaderInfo from "./HeaderInfo/HeaderInfo";
import MethodSub from "./MethodSub/MethodSub";
import "./SelectedFacilityTab.css";
const SelectedFacilityTab = ({ title }) => {
  return (
    <div>

    <HeaderInfo title="test"/>
      <hr width="100%" align="center" />
      <MethodSub title="Method" />
      <hr width="100%" align="center" />
      <MethodSub title="Supplemental Method" />
      <hr width="100%" align="center" />
    </div>
  );
};

export default SelectedFacilityTab;
