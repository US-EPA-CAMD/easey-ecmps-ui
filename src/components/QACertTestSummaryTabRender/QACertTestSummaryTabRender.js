import React, { useState, useEffect } from "react";
import QACertTestSummaryHeaderInfo from "../QACertTestSummaryHeaderInfo/QACertTestSummaryHeaderInfo";

import ComingSoon from "../ComingSoon/ComingSoon";

import CustomAccordion from "../CustomAccordion/CustomAccordion";
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

  const sections = [
    { name: "AppendixE Correlation Test Summary" },
    { name: "Calibration Injection" },
    { name: "Cycle Time Summary" },
    { name: "Flow to Load Check" },
    { name: "Flow to Load Reference" },
    { name: "Fuel Flow to Load Baseline" },
    { name: "Fuel Flow to Load" },
    { name: "Fuel Flowmeter Accuracy" },
    { name: "Hg Linearity and 3-Level Summary" },
    { name: "Linearity Summary" },
    { name: "Online Offline Calibration" },
    { name: "RATA" },
    { name: "Test Qualification" },
    { name: "Transmitter Transducer Accuracy" },
    { name: "Unit Default" },
  ];
  // updates all tables whenever a location is changed
  useEffect(
    () => {
      const tableArr = [
        [<ComingSoon />],
        [<ComingSoon />],
        [<ComingSoon />],
        [<ComingSoon />],
        [<ComingSoon />],
        [<ComingSoon />],
        [<ComingSoon />],
        [<ComingSoon />],
        [<ComingSoon />],
        [
          <QALinearitySummaryDataTable
            locationSelectValue={locationSelect ? locationSelect[1] : 0}
            user={user}
          />,
        ],
        [<ComingSoon />],
        [<ComingSoon />],
        [<ComingSoon />],
        [<ComingSoon />],
        [<ComingSoon />],
      ];
      setTableState(tableArr);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // eslint-disable-next-line react-hooks/exhaustive-deps
      locationSelect[1],
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ]
  );

  // sets initial state
  // only need to initial methods since it is the default, everything else will update with above usestate
  const [tableState, setTableState] = useState([
    [["AppendixE Correlation Test Summary"]],
    [["Calibration Injection"]],
    [["Cycle Time Summary"]],
    [["Flow to Load Check"]],
    [["Flow to Load Reference"]],
    [["Fuel Flow to Load Baseline"]],
    [["Fuel Flow to Load"]],
    [["Fuel Flowmeter Accuracy"]],
    [["Hg Linearity and 3-Level Summary"]],
    [["Linearity Summary"]],
    [["Online Offline Calibration"]],
    [["RATA"]],
    [["Test Qualification"]],
    [["Transmitter Transducer Accuracy"]],
    [["Unit Default"]],
  ]);
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
      <div>{tableState[sectionSelect[0]]}</div>
    </div>
  );
};

export default QACertTestSummaryRender;
