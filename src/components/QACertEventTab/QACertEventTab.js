import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  convertSectionToStoreName,
  QA_CERT_EVENT_STORE_NAME,
} from '../../additional-functions/workspace-section-and-store-names';
import {
  setSectionSelectionState,
  setLocationSelectionState,
  setCheckoutState,
} from '../../store/actions/dynamicFacilityTab';
import QACertEventTabRender from '../QACertEventTabRender/QACertEventTabRender';
export const QACertEventTab = ({
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
  setSection,
  setLocation,
  setCheckout,
  checkedOutLocations,
  workspaceSection,
}) => {
  const getCurrentTab = () => {
    return tabs.find((tab) => tab.selectedConfig.id === selectedConfig.id);
  };
  const [sectionSelect, setSectionSelect] = useState(getCurrentTab().section);
  useEffect(() => {
    setSection(sectionSelect, title, workspaceSection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionSelect]);

  const [locationSelect, setLocationSelect] = useState(
    getCurrentTab().location
  );
  const [selectedTestCode, setSelectedTestCode] = useState({
    testTypeGroupCode: null,
    testTypeCodes: [],
  });
  useEffect(() => {
    setLocation(locationSelect, title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelect]);
  return (
    <div>
      <div>
        <QACertEventTabRender
          resetTimer={resetTimer}
          setExpired={setExpired}
          resetTimerFlag={resetTimerFlag}
          callApiFlag={callApiFlag}
          title={title}
          orisCode={orisCode}
          selectedConfig={selectedConfig}
          sectionSelect={sectionSelect}
          setSectionSelect={(section) => setSectionSelect(section)}
          locationSelect={locationSelect}
          setLocationSelect={(location) => setLocationSelect(location)}
          locations={selectedConfig.locations}
          user={user}
          setSelectedTestCode={setSelectedTestCode}
          selectedTestCode={selectedTestCode}
          configID={selectedConfig.id}
          setCheckout={setCheckout}
          checkedOutLocations={checkedOutLocations}
          workspaceSection={workspaceSection}
          checkoutState={getCurrentTab().checkout}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    tabs: state.openedFacilityTabs[
      convertSectionToStoreName(QA_CERT_EVENT_STORE_NAME)
    ],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocation: (location, title) =>
      dispatch(
        setLocationSelectionState(
          location,
          title,
          convertSectionToStoreName(QA_CERT_EVENT_STORE_NAME)
        )
      ),
    setSection: (section, title) =>
      dispatch(
        setSectionSelectionState(
          section,
          title,
          convertSectionToStoreName(QA_CERT_EVENT_STORE_NAME)
        )
      ),
    updateTestTypeCodes: (section, title) =>
      dispatch(
        setSectionSelectionState(
          section,
          title,
          convertSectionToStoreName(QA_CERT_EVENT_STORE_NAME)
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
export default connect(mapStateToProps, mapDispatchToProps)(QACertEventTab);
export { mapStateToProps };
export { mapDispatchToProps };
