import React, { useState, useMemo, useEffect } from "react";
import QACertTestSummaryHeaderInfo from "../QACertTestSummaryHeaderInfo/QACertTestSummaryHeaderInfo";
import { dataColumnSwap } from "../../additional-functions/datatable-swap";
import { getLinearitySummary } from "../../utils/selectors/QACert/LinearitySummary.js";
import QALinearitySummaryDataTable from "../qaDatatablesContainer/QALinearitySummaryDataTable/QALinearitySummaryDataTable";
export const QACertTestSummaryRender = ({
  title,
  user,
  locations,
  selectedConfig,
  setSectionSelect,
  setLocationSelect,
  sectionSelect,
  locationSelect,
  orisCode,
  configID,
}) => {
  const [dataSet, setDataSet] = useState([]);
  useEffect(() => {
   
    dataColumnSwap()
  }, [sectionSelect]);

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
        />
      </div>
      <hr />
      <QALinearitySummaryDataTable 
       />
    </div>
  );
};

export default QACertTestSummaryRender;
