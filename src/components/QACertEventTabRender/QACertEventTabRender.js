import React, { useEffect, useState } from 'react';
import { Button } from '@trussworks/react-uswds';
import HeaderInfo from '../HeaderInfo/HeaderInfo';
import '../MonitoringPlanTab/MonitoringPlanTab.scss';
import { checkoutAPI } from '../../additional-functions/checkout';
import { useSelector } from 'react-redux';
import { QA_CERT_EVENT_STORE_NAME } from '../../additional-functions/workspace-section-and-store-names';

export const QACertEventTabRender = ({
  title,
  user,
  locations,
  selectedConfig,
  setLocationSelect,
  locationSelect,
  orisCode,
  configID,
  checkout,
  setCheckout,
  workspaceSection,
}) => {
  const currentTab = useSelector((state) =>
    state.openedFacilityTabs[QA_CERT_EVENT_STORE_NAME].find(
      (t) => t.selectedConfig.id === configID
    )
  );

  const [updateRelatedTables, setUpdateRelatedTables] = useState(false);
  const [viewTemplateSelect, setViewTemplateSelect] = useState(null);
  const [viewColumns, setViewColumns] = useState();
  const [viewData, setViewData] = useState();
  const [isDataLoaded, setIsDataLoaded] = useState();
  const isInitialLoadOfPage = currentTab?.isViewDataLoaded === undefined;

  useEffect(() => {
    setViewColumns(currentTab?.viewColumns || []);
    setViewData(currentTab?.viewData || []);
    setIsDataLoaded(isInitialLoadOfPage ? true : currentTab?.isViewDataLoaded);
    setViewTemplateSelect(currentTab?.viewTemplateSelect ?? null);
  }, [currentTab]);

  return (
    <div className=" padding-top-0">
      <div className="grid-row">
        <HeaderInfo
          facility={title}
          selectedConfig={selectedConfig}
          orisCode={orisCode}
          setLocationSelect={setLocationSelect}
          locationSelect={locationSelect}
          locations={locations}
          checkout={checkout}
          user={user}
          checkoutAPI={checkoutAPI}
          setCheckout={setCheckout}
          configID={configID}
          updateRelatedTables={updateRelatedTables}
          workspaceSection={workspaceSection}
          currentTab={currentTab}
        />
      </div>
      <hr />
    </div>
  );
};

export default QACertEventTabRender;
