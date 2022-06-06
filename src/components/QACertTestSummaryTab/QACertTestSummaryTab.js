import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import QACertTestSummaryTabRender from "../QACertTestSummaryTabRender/QACertTestSummaryTabRender";
import {
  convertSectionToStoreName,
  QA_CERT_TEST_SUMMARY_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";
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
  const [sectionSelect, setSectionSelect] = useState(
    tabs ? tabs[activeTab].section : ""
  );
  useEffect(() => {
    setSection(sectionSelect, title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionSelect]);

  const [locationSelect, setLocationSelect] = useState(
    tabs ? tabs[activeTab].location : ""
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
          sectionSelect={tabs ? tabs[activeTab].section : null}
          setSectionSelect={setSectionSelect}
          locationSelect={tabs ? tabs[activeTab].location : null}
          setLocationSelect={setLocationSelect}
          locations={selectedConfig.locations}
          user={user}
          configID={tabs ? tabs[activeTab].selectedConfig.id : null}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    tabs: state.openedFacilityTabs[QA_CERT_TEST_SUMMARY_STORE_NAME],
    activeTab: state.activeTab[QA_CERT_TEST_SUMMARY_STORE_NAME][0],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocation: (location, title) =>
      dispatch(
        setLocationSelectionState(
          location,
          title,
          convertSectionToStoreName(QA_CERT_TEST_SUMMARY_STORE_NAME)
        )
      ),
    setSection: (section, title) =>
      dispatch(
        setSectionSelectionState(
          section,
          title,
          convertSectionToStoreName(QA_CERT_TEST_SUMMARY_STORE_NAME)
        )
      ),
    setActiveTab: (orisCode, value) =>
      dispatch(
        setActiveTab(
          orisCode,
          value,
          convertSectionToStoreName(QA_CERT_TEST_SUMMARY_STORE_NAME)
        )
      ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QACertTestSummaryTab);
export { mapStateToProps };
export { mapDispatchToProps };
