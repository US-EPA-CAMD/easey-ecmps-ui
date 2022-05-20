import React from "react";
import QACertTestSummaryHeaderInfo from "../QACertTestSummaryHeaderInfo/QACertTestSummaryHeaderInfo";
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
      {/* <div className="grid-row">
        <NotFound />
      </div> */}
    </div>
  );
};

export default QACertTestSummaryRender;
