import React, { useState, useMemo, useEffect } from "react";

import { getLinearitySummary } from "../../../utils/selectors/QACert/LinearitySummary.js";
import { getTestSummary } from "../../../utils/selectors/QACert/TestSummary.js";
/*********** COMPONENTS ***********/
// *** 3rd party
import DataTable from "react-data-table-component";

import { connect } from "react-redux";
import QADataTableRender from "../../QADataTableRender/QADataTableRender.js";

// contains test summary data table

const QALinearitySummaryDataTable = ({ data }) => {
  const [dataSet, setDataSet] = useState([]);
  useEffect(() => {
    console.log(data);
    setDataSet(getLinearitySummary(3));
  }, []);

  const columns = [
    "Unit or Stack Pipe ID",
    "Test Type Code",
    " Monitoring System Code",
    "Component ID",
    " Span Scale Code",
    "Test Number",
    "Test Reason Code",
    "Test Description",
    "Test Result Code",
    " Begin Date",
    "Begin Hour",
    "Begin Minute",
    "End Date",
    "End Hour",
    " End Minute",
    " Grace Period Indicator",
    "Year",
    " Quarter",
    "Test Comment",
    " Injection Protocol Code",
  ];
  return (
    <QADataTableRender
      columnNames={columns}
      data={dataSet}
      expandableRows
      actionsBtn={"View"}
      user={true}
    />
  );
};

export default QALinearitySummaryDataTable;
