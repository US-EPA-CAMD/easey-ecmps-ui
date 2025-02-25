import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  convertSectionToStoreName,
  QA_CERT_EVENT_STORE_NAME,
} from '../../additional-functions/workspace-section-and-store-names';
import { setSectionSelectionState, } from '../../store/actions/dynamicFacilityTab';
import QACertEventTabRender from '../QACertEventTabRender/QACertEventTabRender';

export const QACertEventTab = ({
  orisCode,
  selectedConfigId,
  title,
  user,
  tabs,
  setSection,
}) => {
  const getCurrentTab = () => {
    return tabs.find((tab) => tab.selectedConfig.id === selectedConfigId);
  };
  const [sectionSelect, setSectionSelect] = useState(getCurrentTab().section);
  useEffect(() => {
    setSection(sectionSelect, title, QA_CERT_EVENT_STORE_NAME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionSelect]);

  const locationSelect = getCurrentTab().location;
  const [selectedTestCode, setSelectedTestCode] = useState({
    testTypeGroupCode: null,
    testTypeCodes: [],
  });

  return (
    <div>
      <div>
        <QACertEventTabRender
          title={title}
          orisCode={orisCode}
          selectedConfigId={selectedConfigId}
          sectionSelect={sectionSelect}
          setSectionSelect={(section) => setSectionSelect(section)}
          locationSelect={locationSelect}
          user={user}
          setSelectedTestCode={setSelectedTestCode}
          selectedTestCode={selectedTestCode}
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(QACertEventTab);
export { mapStateToProps };
export { mapDispatchToProps };
