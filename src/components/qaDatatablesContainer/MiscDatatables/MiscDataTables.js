import React from "react";

import TestSummaryDataTable from "../TestSummaryDataTable/TestSummaryDataTable";
import { getTestSummary } from "../../../utils/selectors/QACert/TestSummary.js";

const testTypeCodes = [
  'DAHS',
  'DGFMCAL',
  'MFMCAL',
  'TSCAL',
  'BCAL',
  'QGA',
  'LEAK',
  'OTHER',
  'PEMSAC',
]

const MiscDataTables = ({
  locationSelectValue,
}) => {

  return (
    <TestSummaryDataTable
      locationSelectValue={locationSelectValue}
      testTypeCodes={testTypeCodes}
      mapDataToRows={getTestSummary}
    />
  )
}

export default MiscDataTables
