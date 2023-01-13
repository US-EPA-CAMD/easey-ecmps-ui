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
  setSectionSelect,
  setSelectedTestCode,
  selectedTestCode,
  sectionSelect,
  checkoutState,
}) => {
  const [updateRelatedTables, setUpdateRelatedTables] = useState(false);

  return (
    <div className=" padding-top-0">
      <div className="grid-row">
        <HeaderInfo
          facility={title}
          selectedConfig={selectedConfig}
          sectionSelect={sectionSelect}
          setSectionSelect={setSectionSelect}
          orisCode={orisCode}
          setLocationSelect={setLocationSelect}
          locationSelect={locationSelect}
          locations={locations}
          checkout={checkout}
          user={user}
          checkoutAPI={checkoutAPI}
          setCheckout={setCheckout}
          configID={configID}
          setUpdateRelatedTables={setUpdateRelatedTables}
          updateRelatedTables={updateRelatedTables}
          workspaceSection={workspaceSection}
        />
      </div>
      <hr />
    </div>
  );
};

export default QACertEventTabRender;
