import { Button } from "@trussworks/react-uswds";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { loadDropdowns } from "../../../store/actions/dropdowns";
import { getQATestSummaryByCode } from "../../../utils/api/qaCertificationsAPI";
import QADataTableRender from "../../QADataTableRender/QADataTableRender";

export const HgLinearitySummaryDataTable = ({
  locationSelectValue
}) => {

  console.log('location select value', locationSelectValue);

  const testFetch = async () => {
    const codes = ['HGSI3', 'HGLINE']
    // const codes = ['HGLINE']
    const resp = await getQATestSummaryByCode(locationSelectValue.id, { testTypeCodes: codes })
    console.log('resp', resp);
  }

  const columns = [
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

  const data = []

  return (
    <>
      <h1>hg linearity temp</h1>
      <Button onClick={testFetch}>test fetch</Button>
      <QADataTableRender
        columnNames={columns}
        columnWidth={10}
        data={data}
        // openHandler={openModal}
        // onRemoveHandler={onRemoveHandler}
        actionColumnName={"Actions"}
        actionsBtn={"View"}
        // user={user}
        // expandableRowComp={<QALinearitySummaryExpandableRows user={user} />}
      />
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
)(HgLinearitySummaryDataTable);
export { mapDispatchToProps };
export { mapStateToProps };