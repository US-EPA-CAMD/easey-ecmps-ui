import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  setLocationSelectionState,
  setCheckoutState,
  setInactiveState,
} from "../../store/actions/dynamicFacilityTab";
import {
  convertSectionToStoreName,
  EMISSIONS_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";
import EmissionsTabRender from "../EmissionsTabRender/EmissionsTabRender";
export const EmissionsTab = ({
  orisCode,
  selectedConfigId,
  title,
  user,

  tabs,
  setLocation,
  setCheckout,
  setInactive,
}) => {
  const getCurrentTab = () => {
    return tabs.find((tab) => tab.selectedConfig.id === selectedConfigId);
  };

  const currentTab = getCurrentTab();
  const [locationSelect, setLocationSelect] = useState(currentTab.location);

  useEffect(() => {
    setLocation(locationSelect, title, EMISSIONS_STORE_NAME);
  }, [locationSelect, setLocation, title]);

  return (
    <EmissionsTabRender
      title={title}
      orisCode={orisCode}
      selectedConfigId={selectedConfigId}
      locationSelect={locationSelect}
      setLocationSelect={(location) => setLocationSelect(location)}
      user={user}
      checkout={currentTab.checkout}
      setCheckout={setCheckout}
      setInactive={setInactive}
      inactive={currentTab.inactive}
    />
  );
};

export const mapStateToProps = (state) => {
  return {
    tabs: state.openedFacilityTabs[
      convertSectionToStoreName(EMISSIONS_STORE_NAME)
    ],
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    setLocation: (location, title, workspaceSection) =>
      dispatch(
        setLocationSelectionState(
          location,
          title,
          convertSectionToStoreName(workspaceSection)
        )
      ),
    setInactive: (value, title, workspaceSection) =>
      dispatch(
        setInactiveState(
          value,
          title,
          convertSectionToStoreName(workspaceSection)
        )
      ),
    setCheckout: (value, configID, workspaceSection) =>
      dispatch(
        setCheckoutState(
          value,
          configID,
          convertSectionToStoreName(workspaceSection)
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmissionsTab);
