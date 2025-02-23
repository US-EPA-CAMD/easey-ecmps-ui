import React from 'react';

import {
  convertSectionToStoreName,
  MATS_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";

function MatsTab({
  orisCode,
  selectedConfigId,
  title,
  user,
}) {
  const getCurrentTab = () => {
    return tabs.find((tab) => tab.selectedConfig.id === selectedConfigId);
  };
  return <></>;
}

export const mapStateToProps = (state) => {
  return {
    tabs: state.openedFacilityTabs[
      convertSectionToStoreName(MATS_STORE_NAME)
    ],
  };
};

export default MatsTab;
