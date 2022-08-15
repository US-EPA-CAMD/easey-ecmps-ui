import React, { useState } from "react";
import QACertTestSummaryHeaderInfo from "../QACertTestSummaryHeaderInfo/QACertTestSummaryHeaderInfo";

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
  const [selectedTestCode, setSelectedTestCode] = useState({ testTypeGroupCode: 'LINSUM', testTypeCodes: ['LINE'] });
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
        />
      </div>
      <hr />
      {
        <QALinearitySummaryDataTable
          locationSelectValue={locationSelect ? locationSelect[1] : 0}
          user={user}
          selectedLocation={{
            name: locations[locationSelect[0]]["name"],
            stackPipeId: locations[locationSelect[0]]["stackPipeId"],
            unitId: locations[locationSelect[0]]["unitId"],
          }}
          selectedTestCode={selectedTestCode}
        />
      }
    </div>
  );
};

export default QACertTestSummaryRender;
