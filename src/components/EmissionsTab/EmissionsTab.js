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
  resetTimer,
  setExpired,
  resetTimerFlag,
  callApiFlag,

  orisCode,
  selectedConfig,
  title,
  user,
  checkout,
  tabs,

  setLocation,
  setCheckout,
  setInactive,
  checkedOutLocations,
  workspaceSection,
}) => {
  const getCurrentTab = () =>{
    return tabs.find(tab => tab.selectedConfig.id === selectedConfig.id);

  }
  const getCurrentTabIndex = () =>{
    return tabs.findIndex(tab => tab.selectedConfig.id === selectedConfig.id);

  }
  const [ currentTabIndex, setCurrentTabIndex ] = useState(getCurrentTabIndex());

  useEffect(()=>{
    // setCurrentTab(getCurrentTab())
    setCurrentTabIndex(getCurrentTabIndex())

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedConfig,checkout,currentTabIndex]);

  const [locationSelect, setLocationSelect] = useState(
    getCurrentTab().location
  );

  useEffect(() => {
    setLocation(locationSelect, title, workspaceSection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelect]);


  return (
    <div>
      <div>
        <EmissionsTabRender
          resetTimer={resetTimer}
          setExpired={setExpired}
          resetTimerFlag={resetTimerFlag}
          callApiFlag={callApiFlag}
          title={title}
          orisCode={orisCode}
          selectedConfig={selectedConfig}
          locationSelect={locationSelect}
          setLocationSelect={(location)=>setLocationSelect(location)}
          locations={selectedConfig.locations}
          user={user}
          configID={tabs[currentTabIndex].selectedConfig.id}
          checkout={tabs[currentTabIndex].checkout}
          setCheckout={setCheckout}
          setInactive={setInactive}
          inactive={tabs[currentTabIndex].inactive}
          checkedOutLocations={checkedOutLocations}
          currentTabIndex={currentTabIndex}
          workspaceSection={workspaceSection}
        /> 
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    tabs: state.openedFacilityTabs[
      convertSectionToStoreName(EMISSIONS_STORE_NAME)
    ],
  };
};

const mapDispatchToProps = (dispatch) => {
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
export { mapStateToProps };
export { mapDispatchToProps };
