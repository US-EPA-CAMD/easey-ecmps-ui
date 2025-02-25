import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  convertSectionToStoreName,
  MATS_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";
import {
  setLocationSelectionState,
  setCheckoutState,
} from "../../store/actions/dynamicFacilityTab";
import MatsTabRender from "../MatsTabRender/MatsTabRender";

export const MatsTab = ({
  orisCode,
  selectedConfigId,
  title,
  user,

  /* MAPPED PROPS */
  setCheckout,
  setLocation,
  tabs,
}) => {
  const currentTab = tabs.find(
    (tab) => tab.selectedConfig.id === selectedConfigId
  );
  const [locationSelect, setLocationSelect] = useState(currentTab.location);

  useEffect(() => {
    setLocation(locationSelect, title);
  }, [locationSelect, setLocation, title]);

  return (
    <MatsTabRender
      checkout={currentTab.checkout}
      locationSelect={locationSelect}
      orisCode={orisCode}
      selectedConfigId={selectedConfigId}
      setCheckout={setCheckout}
      setLocationSelect={setLocationSelect}
      title={title}
      user={user}
    />
  );
};

export const mapDispatchToProps = (dispatch) => {
  return {
    setLocation: (location, title) =>
      dispatch(
        setLocationSelectionState(
          location,
          title,
          convertSectionToStoreName(MATS_STORE_NAME)
        )
      ),
    setCheckout: (value, configID) =>
      dispatch(
        setCheckoutState(
          value,
          configID,
          convertSectionToStoreName(MATS_STORE_NAME)
        )
      ),
  };
};
export const mapStateToProps = (state) => {
  return {
    tabs: state.openedFacilityTabs[convertSectionToStoreName(MATS_STORE_NAME)],
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatsTab);
