import React, { useState, useMemo, useEffect } from "react";
import { getQALinearitySummary } from "../../../utils/api/qaCertificationsAPI.js";
import { getLinearitySummaryRecords } from "../../../utils/selectors/QACert/TestSummary.js";
/*********** COMPONENTS ***********/

import QADataTableRender from "../../QADataTableRender/QADataTableRender.js";
import { Preloader } from "@us-epa-camd/easey-design-system";

// contains test summary data table

const QALinearitySummaryExpandableRows = (props) => {
  const { locationId, id } = props.data;
  const [loading, setLoading] = useState(false);
  const [qaLinearitySummary, setQaLinearitySummary] = useState([]);

  useEffect(() => {
    console.log("props.data ", props.data);
    console.log("qaLinearitySummary", qaLinearitySummary);
    //if (qaLinearitySummary.testSumId === testSumId && qaLinearitySummary.data.length === 0) {
    if(qaLinearitySummary.length === 0){
      setLoading(true);
      getQALinearitySummary(locationId, id).then((res) => {
        console.log(res.data, "expandedRowData");
        setQaLinearitySummary(res.data);
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useMemo(() => {
    return getLinearitySummaryRecords(qaLinearitySummary);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qaLinearitySummary]);
  
  const columns = [
    "Gas Level Code",
    "Mean Measured Value",
    "Mean Reference Value",
    "Percent Error",
    "APS Indicator",
  ];

  return (
    <div className="padding-3">
      {
        !loading ? 
        (<QADataTableRender
            columnNames={columns}
            columnWidth={15}
            data={data}
            actionColumnName={"Linearity Summary Data"}
            actionsBtn={"View"}
            user={props.user}
          />
        ) : (<Preloader />)
      }
    </div>
  )
};

export default QALinearitySummaryExpandableRows;
