import React, { useState } from "react";
import { useSelector } from "react-redux";

import { MATS_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
import MatsDataTable from "../MatsDataTable/MatsDataTable";
import MatsHeaderInfo from "../MatsHeaderInfo/MatsHeaderInfo";

export const MatsTab = ({ orisCode, selectedConfigId, title, user }) => {
  const selectedLocation = useSelector(
    (state) =>
      state.openedFacilityTabs[MATS_STORE_NAME].find(
        (tab) => tab.selectedConfig.id === selectedConfigId
      )?.location[1]
  );
  const [selectedReportType, setSelectedReportType] = useState("");

  return (
    <div className="padding-top-0">
      <div className="grid-row">
        <MatsHeaderInfo
          facility={title}
          orisCode={orisCode}
          selectedConfigId={selectedConfigId}
          selectedReportType={selectedReportType}
          setSelectedReportType={setSelectedReportType}
          user={user}
        />
      </div>
      <hr />
      <MatsDataTable
        selectedConfigId={selectedConfigId}
        selectedLocation={selectedLocation}
        selectedReportType={selectedReportType}
      />
    </div>
  );
};

export default MatsTab;
