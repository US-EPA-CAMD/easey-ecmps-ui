import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { loadDropdowns } from "../../../store/actions/dropdowns";

export const HgLinearitySummaryDataTable = () => {
  return (
    <h1>hg linearity temp</h1>
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