import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import QACertTestSummaryTabRender from "../QACertTestSummaryTabRender/QACertTestSummaryTabRender";
import {
  convertSectionToStoreName,
  QA_CERT_TEST_SUMMARY_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";
import {
  setSectionSelectionState,
  setLocationSelectionState,
  setCheckoutState,
} from "../../store/actions/dynamicFacilityTab";
export const QACertTestSummaryTab = ({
  resetTimer,
  setExpired,
  resetTimerFlag,
  callApiFlag,

  orisCode,
  selectedConfigId,
  title,
  locations,
  user,
  // tabs,
  isCheckedOut,

  activeTab,
  setSection,
  setLocation,
  // setCheckout,
  checkedOutLocations,
}) => {
  const dispatch = useDispatch();

  const tabs = useSelector(
    (state) =>
      state.openedFacilityTabs[
        convertSectionToStoreName(QA_CERT_TEST_SUMMARY_STORE_NAME)
      ]
  );

  const getCurrentTab = () => {
    return tabs.find((tab) => tab.selectedConfig.id === selectedConfigId);
  };
  const [sectionSelect, setSectionSelect] = useState(getCurrentTab().section);
  useEffect(() => {
    dispatch(
      setSectionSelectionState(
        sectionSelect,
        title,
        convertSectionToStoreName(QA_CERT_TEST_SUMMARY_STORE_NAME)
      )
    );

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
    dispatch(
      setLocationSelectionState(
        locationSelect,
        title,
        convertSectionToStoreName(QA_CERT_TEST_SUMMARY_STORE_NAME)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelect]);

  const setCheckout = (value, configID, workspaceSection) => {
    dispatch(
      setCheckoutState(
        value,
        configID,
        convertSectionToStoreName(workspaceSection)
      )
    );
  };
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
          selectedConfigId={selectedConfigId}
          sectionSelect={sectionSelect}
          setSectionSelect={(section) => setSectionSelect(section)}
          locationSelect={locationSelect}
          setLocationSelect={(location) => setLocationSelect(location)}
          user={user}
          setSelectedTestCode={setSelectedTestCode}
          selectedTestCode={selectedTestCode}
          setCheckout={setCheckout}
          checkoutState={getCurrentTab().checkout}
          currentTab={getCurrentTab()}
        />
      </div>
    </div>
  );
};

export default QACertTestSummaryTab;
