import { at } from "lodash";
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";

import { MATS_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
import config from "../../config";
import DataTableMatsSubmission from "../datatablesContainer/DataTableMatsSubmission/DataTableMatsSubmission";
import MatsHeaderInfo from "../MatsHeaderInfo/MatsHeaderInfo";

export const MatsTab = ({
  orisCode,
  selectedConfigId,
  title,
  user,

  /* MAPPED PROPS */
  checkedOutConfigs,
}) => {
  const selectedLocation = useSelector(
    (state) =>
      state.openedFacilityTabs[MATS_STORE_NAME].find(
        (tab) => tab.selectedConfig.id === selectedConfigId
      )?.location[1]
  );
  const [selectedReportType, setSelectedReportType] = useState("");

  const isCheckedOutByUser =
    checkedOutConfigs.find((config) => config["monPlanId"] === selectedConfigId)
      ?.checkedOutBy === user.userId;
  const acceptedRoles = at(config.app, [
    "sponsorRole",
    "submitterRole",
    "initialAuthorizerRole",
  ]);
  const hasRequiredRole = user.roles?.some((role) =>
    acceptedRoles.includes(role)
  );
  const canSubmit = isCheckedOutByUser && hasRequiredRole;

  return (
    <div className="padding-top-0">
      <div className="grid-row">
        <MatsHeaderInfo
          canSubmit={canSubmit}
          facility={title}
          orisCode={orisCode}
          selectedConfigId={selectedConfigId}
          selectedReportType={selectedReportType}
          setSelectedReportType={setSelectedReportType}
          user={user}
        />
      </div>
      <hr />
      <DataTableMatsSubmission
        canSubmit={canSubmit}
        selectedConfigId={selectedConfigId}
        selectedLocation={selectedLocation}
        selectedReportType={selectedReportType}
      />
    </div>
  );
};

export const mapStateToProps = (state) => ({
  checkedOutConfigs: state.checkedOutLocations,
});

export default connect(mapStateToProps)(MatsTab);
