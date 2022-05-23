import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import QACertTestSummaryTabRender from "../QACertTestSummaryTabRender/QACertTestSummaryTabRender";

import { setActiveTab } from "../../store/actions/activeTab";
import {
  setSectionSelectionState,
  setLocationSelectionState,
} from "../../store/actions/dynamicFacilityTab";
export const QACertTestSummaryTab = ({
  resetTimer,
  setExpired,
  resetTimerFlag,
  callApiFlag,

  orisCode,
  selectedConfig,
  title,
  locations,
  user,
  tabs,

  activeTab,
  setSection,
  setLocation,
}) => {
  const [sectionSelect, setSectionSelect] = useState(tabs[activeTab].section);
  useEffect(() => {
    setSection(sectionSelect, title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionSelect]);

  const [locationSelect, setLocationSelect] = useState(
    tabs[activeTab].location
  );

  useEffect(() => {
    setLocation(locationSelect, title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelect]);
  return (
    <div>
      <div>
        <QACertTestSummaryTabRender
          resetTimer={resetTimer}
          setExpired={setExpired}
          resetTimerFlag={resetTimerFlag}
          callApiFlag={callApiFlag}
          title={title}
          orisCode={orisCode}
          selectedConfig={selectedConfig}
          sectionSelect={tabs[activeTab].section}
          setSectionSelect={setSectionSelect}
          locationSelect={tabs[activeTab].location}
          setLocationSelect={setLocationSelect}
          locations={selectedConfig.locations}
          user={user}
          configID={tabs[activeTab].selectedConfig.id}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    tabs: state.openedFacilityTabs,
    activeTab: state.activeTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocation: (location, title) =>
      dispatch(setLocationSelectionState(location, title)),
    setSection: (section, title) =>
      dispatch(setSectionSelectionState(section, title)),
    setActiveTab: (orisCode, value) => dispatch(setActiveTab(orisCode, value)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QACertTestSummaryTab);
export { mapStateToProps };
export { mapDispatchToProps };
