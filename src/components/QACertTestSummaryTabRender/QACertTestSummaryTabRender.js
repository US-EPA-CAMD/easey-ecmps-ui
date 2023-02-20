import React, { useState, useEffect } from "react";
import QACertTestSummaryHeaderInfo from "../QACertTestSummaryHeaderInfo/QACertTestSummaryHeaderInfo";

import QATestSummaryDataTable from "../qaDatatablesContainer/QATestSummaryDataTable/QATestSummaryDataTable";

export const QACertTestSummaryRender = ({
  title,
  user,
  locations,
  selectedConfig,
  setSectionSelect,
  setLocationSelect,
  setSelectedTestCode,
  selectedTestCode,
  sectionSelect,
  locationSelect,
  orisCode,
  configID,
  setCheckout,
  checkoutState,
  currentTab,
}) => {
  const [updateRelatedTables, setUpdateRelatedTables] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const elem = document.querySelector(`[title="${currentTab.name}"]`)
      if (elem) {
        elem.querySelector('#tabBtn').focus()
      }
    }, 1000)
  }, [])

  return (
    <div className=" padding-top-0">
      <div className="grid-row">
        <QACertTestSummaryHeaderInfo
          facility={title}
          selectedConfig={selectedConfig}
          orisCode={orisCode}
          sectionSelect={sectionSelect}
          setSectionSelect={setSectionSelect}
          setLocationSelect={setLocationSelect}
          locationSelect={locationSelect}
          locations={locations}
          user={user}
          configID={configID}
          setSelectedTestCode={setSelectedTestCode}
          setCheckout={setCheckout}
          checkoutState={checkoutState}
          setUpdateRelatedTables={setUpdateRelatedTables}
          updateRelatedTables={updateRelatedTables}
        />
      </div>
      <hr />
      {
        <QATestSummaryDataTable
          locationSelectValue={locationSelect ? locationSelect[1] : 0}
          user={user}
          sectionSelect={sectionSelect}
          selectedLocation={{
            name: locations[locationSelect[0]]["name"],
            stackPipeId: locations[locationSelect[0]]["stackPipeId"],
            unitId: locations[locationSelect[0]]["unitId"],
          }}
          locations={locations}
          selectedTestCode={selectedTestCode}
          isCheckedOut={checkoutState}
          updateTable={updateRelatedTables}
          setUpdateTable={setUpdateRelatedTables}
        />
      }
    </div>
  );
};

export default QACertTestSummaryRender;
