import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import QACertTestSummaryHeaderInfo from "../QACertTestSummaryHeaderInfo/QACertTestSummaryHeaderInfo";

import QATestSummaryDataTable from "../qaDatatablesContainer/QATestSummaryDataTable/QATestSummaryDataTable";

export const QACertTestSummaryRender = ({
  title,
  user,
  selectedConfigId,
  setSectionSelect,
  setSelectedTestCode,
  selectedTestCode,
  sectionSelect,
  locationSelect,
  orisCode,
  checkoutState,
  currentTab,
}) => {
  const [updateRelatedTables, setUpdateRelatedTables] = useState(false);
  const locations = useSelector(
    (state) =>
      state.monitoringPlans[orisCode]?.find((mp) => mp.id === selectedConfigId)
        ?.monitoringLocationData ?? []
  );

  useEffect(() => {
    setTimeout(() => {
      const elem = document.querySelector(`[title="${currentTab.name}"]`);
      if (elem) {
        elem.querySelector("#tabBtn").focus();
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" padding-top-0">
      <div className="grid-row">
        <QACertTestSummaryHeaderInfo
          facility={title}
          selectedConfigId={selectedConfigId}
          orisCode={orisCode}
          sectionSelect={sectionSelect}
          setSectionSelect={setSectionSelect}
          user={user}
          setSelectedTestCode={setSelectedTestCode}
          checkoutState={checkoutState}
          setUpdateRelatedTables={setUpdateRelatedTables}
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
          orisCode={orisCode}
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
