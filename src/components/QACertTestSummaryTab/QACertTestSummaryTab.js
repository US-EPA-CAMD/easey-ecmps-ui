import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import QACertTestSummaryTabRender from "../QACertTestSummaryTabRender/QACertTestSummaryTabRender";
import {
  convertSectionToStoreName,
  QA_CERT_TEST_SUMMARY_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";
import { setSectionSelectionState, } from "../../store/actions/dynamicFacilityTab";

export const QACertTestSummaryTab = ({
  orisCode,
  selectedConfigId,
  title,
  user,
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
  }, [dispatch, sectionSelect, title]);

  const locationSelect = getCurrentTab().location;
  const [selectedTestCode, setSelectedTestCode] = useState({
    testTypeGroupCode: null,
    testTypeCodes: [],
  });

  return (
    <div>
      <div>
        <QACertTestSummaryTabRender
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
          currentTab={getCurrentTab()}
        />
      </div>
    </div>
  );
};

export default QACertTestSummaryTab;
