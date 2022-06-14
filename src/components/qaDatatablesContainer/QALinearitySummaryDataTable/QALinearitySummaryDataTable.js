import React, { useState, useMemo, useEffect } from "react";
import {
  getQATestSummaryByID,
  getQATestSummary,
} from "../../../utils/api/qaCertificationsAPI.js";
import { getLinearitySummary } from "../../../utils/selectors/QACert/LinearitySummary.js";
import { getTestSummary } from "../../../utils/selectors/QACert/TestSummary.js";
/*********** COMPONENTS ***********/

import { Preloader } from "@us-epa-camd/easey-design-system";
// *** 3rd party
import DataTable from "react-data-table-component";

import { dataColumnSwap } from "../../../additional-functions/datatable-swap";
import { connect } from "react-redux";
import QADataTableRender from "../../QADataTableRender/QADataTableRender.js";
import { Button } from "@trussworks/react-uswds";

// contains test summary data table

const QALinearitySummaryDataTable = ({ locationSelectValue, user }) => {
  const [dataLoaded, setDataLoaded] = useState(false);

  const [qaTestSummary, setQATestSummary] = useState([]);
  // useEffect(() => {
  //   console.log(data);
  //   // setDataSet(getTestSummary(getQATestSummaryByID(3)));
  //   console.log(getQATestSummary(3));
  // }, []);

  useEffect(() => {
    console.log("location", locationSelectValue);
    setDataLoaded(false);
    if (
      // updateTable ||
      qaTestSummary.length <= 0 ||
      locationSelectValue
    ) {
      getQATestSummary(locationSelectValue).then((res) => {
        console.log(res.data, "res");
        setQATestSummary(res.data);

        setDataLoaded(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue]);

  const data = useMemo(() => {
    return getTestSummary(qaTestSummary);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qaTestSummary]);
  const columns = [
    "Unit or Stack Pipe ID",
    "Test Type Code",
    "Monitoring System Code",
    "Component ID",
    "Span Scale Code",
    "Test Number",
    "Test Reason Code",
    "Test Description",
    "Test Result Code",
    "Begin Date",
    "Begin Hour",
    "Begin Minute",
    "End Date",
    "End Hour",
    "End Minute",
    "Grace Period Indicator",
    "Year",
    "Quarter",
    "Test Comment",
    "Injection Protocol Code",
  ];

  return (
    <div>
      <div className=" padding-3">
        <h3 className="display-inline padding-right-3">Test Summary Data</h3>
        {user ? <Button> Add Test Summary Data</Button> : ""}
      </div>

      <QADataTableRender
        columnNames={columns}
        data={data}
        expandableRows
        actionsBtn={"View"}
        user={user}
      />
    </div>
    // ) : (
    //   <Preloader />
  );
};

export default QALinearitySummaryDataTable;
