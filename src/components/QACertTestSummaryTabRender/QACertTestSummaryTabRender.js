import React, { useState, useEffect } from "react";
import QACertTestSummaryHeaderInfo from "../QACertTestSummaryHeaderInfo/QACertTestSummaryHeaderInfo";

import ComingSoon from "../ComingSoon/ComingSoon";

import QALinearitySummaryDataTable from "../qaDatatablesContainer/QALinearitySummaryDataTable/QALinearitySummaryDataTable";
import { getAllTestTypeCodes, getAllTestTypeGroupCodes } from "../../utils/api/dataManagementApi";
import TestSummaryDataTable from "../qaDatatablesContainer/TestSummaryDataTable/TestSummaryDataTable";
import { getTestSummary } from "../../utils/selectors/QACert/TestSummary";


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

  const [allTestTypeCodes, setAllTestTypeCodes] = useState([])
  const [testTypeGroupOptions, setTestTypeGroupOptions] = useState([{ name: 'Loading...' }]);

  useEffect(() => {
    const fetchTestTypeCodes = async () => {
      let resp = await getAllTestTypeCodes()
      const allTtc = resp.data
      setAllTestTypeCodes(allTtc)

      resp = await getAllTestTypeGroupCodes()
      const options = resp.data
        .map(e => {
          return { name: e.testTypeGroupCodeDescription, code: e.testTypeGroupCode }
        })
        .sort((a, b) => a.name.localeCompare(b.name))
      setTestTypeGroupOptions(options)
    }
    fetchTestTypeCodes()
  }, [configID])

  const selectedIndex = sectionSelect[0]
  const selectedTestTypeGroupOptionObj = testTypeGroupOptions[selectedIndex]
  const codesForSelectedTestTypeGroup = allTestTypeCodes
    .filter(data => {
      return data.testTypeGroupCode === selectedTestTypeGroupOptionObj?.code
    })
    .map(obj => {
      return obj.testTypeCode
    })

  let testSummaryTable = <TestSummaryDataTable
    locationSelectValue={locationSelect ? locationSelect[1] : 0}
    testTypeCodes={codesForSelectedTestTypeGroup}
    mapDataToRows={getTestSummary}
  />

  if (selectedTestTypeGroupOptionObj?.code === 'LINSUM') {
    testSummaryTable = <QALinearitySummaryDataTable
      locationSelectValue={locationSelect ? locationSelect[1] : 0}
      user={user}
    />
  }

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
      {selectedTestTypeGroupOptionObj && testSummaryTable}
    </div>
  );
};

export default QACertTestSummaryRender;
