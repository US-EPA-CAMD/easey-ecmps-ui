import { Button } from "@trussworks/react-uswds";
import { Preloader } from "@us-epa-camd/easey-design-system";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";

import { loadDropdowns } from "../../../store/actions/dropdowns";
import { getQATestSummaryByCode } from "../../../utils/api/qaCertificationsAPI";
import QADataTableRender from "../../QADataTableRender/QADataTableRender";

const defaultCols = [
  "Test Type Code",
  "Unit or Stack Pipe ID",
  "Component ID",
  "Test Number",
  "Test Reason Code",
  "Test Result Code",
  "End Date",
  "End Hour",
  "End Minute",
];

export const TestSummaryDataTable = ({
  _user,
  locationSelectValue,
  columns = defaultCols,
  testTypeCodes,
  mapDataToRows,
}) => {

  const [loading, setLoading] = useState(false)
  const [testSummaryData, setTestSummaryData] = useState([])

  useEffect(() => {
    const fetchTestSummaryData = async () => {
      setLoading(true)
      const resp = await getQATestSummaryByCode(locationSelectValue, { testTypeCodes })
      console.log('resp', resp);
      setLoading(false)
      setTestSummaryData(resp.data)
    }
    fetchTestSummaryData()
  }, [locationSelectValue, testTypeCodes])

  const rowData = useMemo(() => {
    return mapDataToRows(testSummaryData);
  }, [testSummaryData]);

  return (
    <>
      <div className="padding-3">
        <h3 className="display-inline padding-right-3">Test Summary Data</h3>
      </div>
      {!loading ? (
        <QADataTableRender
          columnNames={columns}
          columnWidth={10}
          data={rowData}
          // openHandler={openModal}
          // onRemoveHandler={onRemoveHandler}
          actionColumnName={"Actions"}
          actionsBtn={"View"}
        // user={user}
        // expandableRowComp={<QALinearitySummaryExpandableRows user={user} />}
        />
      ) : (
        <Preloader />
      )}
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  // const dataTableName = "Test Summary Data";
  // return {
  //   mdmData: state.dropdowns[convertSectionToStoreName(dataTableName)],
  // };
  return {}
};

const mapDispatchToProps = (dispatch) => {
  // return {
  //   loadDropdownsData: async (section, dropdownArray) =>
  //     dispatch(
  //       loadDropdowns(convertSectionToStoreName(section), dropdownArray)
  //     ),
  // };
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestSummaryDataTable);
export { mapDispatchToProps };
export { mapStateToProps };