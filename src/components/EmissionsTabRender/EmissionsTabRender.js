import React, { useState } from "react";
import HeaderInfo from "../HeaderInfo/HeaderInfo";
import "../MonitoringPlanTab/MonitoringPlanTab.scss";
import { checkoutAPI } from "../../additional-functions/checkout";

export const EmissionsTabRender = ({
  title,
  user,
  locations,
  selectedConfig,
  setLocationSelect,
  locationSelect,
  orisCode,
  configID,
  checkout,
  setCheckout,
  setInactive,
  inactive,
  workspaceSection,
}) => {
  const [updateRelatedTables, setUpdateRelatedTables] = useState(false);

  const [viewTemplateSelect, setViewTemplateSelect] = useState(null);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedQuarters, setSelectedQuarters] = useState([]);
  console.log(selectedYears)
  console.log(selectedQuarters)
  return (
    <div className=" padding-top-0">
      <div className="grid-row">
        <HeaderInfo
          facility={title}
          selectedConfig={selectedConfig}
          orisCode={orisCode}
          setLocationSelect={setLocationSelect}
          locationSelect={locationSelect}
          locations={locations}
          checkout={checkout}
          user={user}
          checkoutAPI={checkoutAPI}
          setCheckout={setCheckout}
          setInactive={setInactive}
          inactive={inactive}
          configID={configID}
          setUpdateRelatedTables={setUpdateRelatedTables}
          updateRelatedTables={updateRelatedTables}
          workspaceSection={workspaceSection}
          viewTemplateSelect={viewTemplateSelect}
          setViewTemplateSelect={setViewTemplateSelect}
          selectedYears={selectedYears}
          setSelectedYears={setSelectedYears}
          selectedQuarters={selectedQuarters}
          setSelectedQuarters={setSelectedQuarters}
        />
      </div>
      <hr />
      <div className="grid-row overflow-x-auto">
        {/* INSERT TABLE/COMPONENT HERE. */}
      </div>
    </div>
  );
};

export default EmissionsTabRender;
