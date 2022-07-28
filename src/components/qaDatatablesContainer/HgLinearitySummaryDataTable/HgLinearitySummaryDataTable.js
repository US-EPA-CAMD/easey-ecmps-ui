/* istanbul ignore file */
import React from "react";

import { getTestSummary } from "../../../utils/selectors/QACert/TestSummary";
import TestSummaryDataTable from "../TestSummaryDataTable/TestSummaryDataTable";

const testTypeCodes = ['HGSI3', 'HGLINE']

const HgLinearitySummaryDataTable = ({
  _user,
  locationSelectValue
}) => {
  return (
    <TestSummaryDataTable
      user
      locationSelectValue={locationSelectValue}
      testTypeCodes={testTypeCodes}
      mapDataToRows={getTestSummary}
    />
  )
}

export default HgLinearitySummaryDataTable
