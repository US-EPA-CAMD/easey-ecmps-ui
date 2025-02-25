import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  convertSectionToStoreName,
  MATS_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";
import MatsTabRender from "../MatsTabRender/MatsTabRender";

export const MatsTab = ({
  orisCode,
  selectedConfigId,
  title,
  user,

  /* MAPPED PROPS */
  tabs,
}) => {
  const currentTab = tabs.find(
    (tab) => tab.selectedConfig.id === selectedConfigId
  );

  return (
    <MatsTabRender
      checkout={currentTab.checkout}
      orisCode={orisCode}
      selectedConfigId={selectedConfigId}
      title={title}
      user={user}
    />
  );
};

export const mapStateToProps = (state) => {
  return {
    tabs: state.openedFacilityTabs[convertSectionToStoreName(MATS_STORE_NAME)],
  };
};

export default connect(mapStateToProps)(MatsTab);
