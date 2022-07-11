import React, { useState, useMemo, useEffect } from "react";
import { getQATestSummary } from "../../../utils/api/qaCertificationsAPI.js";
import { getTestSummary } from "../../../utils/selectors/QACert/TestSummary.js";
import QALinearitySummaryExpandableRows from "../QALinearitySummaryExpandableRows/QALinearitySummaryExpandableRows";
/*********** COMPONENTS ***********/

import QADataTableRender from "../../QADataTableRender/QADataTableRender.js";
import { Button } from "@trussworks/react-uswds";
import { Preloader } from "@us-epa-camd/easey-design-system";

// contains test summary data table

const QALinearitySummaryDataTable = ({ locationSelectValue, user }) => {
  const [loading, setLoading] = useState(false);

  const [qaTestSummary, setQATestSummary] = useState([]);

  useEffect(() => {
    console.log("location", locationSelectValue);
    if (
      // updateTable ||
      qaTestSummary.length <= 0 ||
      locationSelectValue
    ) {
      setLoading(true);
      getQATestSummary(locationSelectValue).then((res) => {
        console.log(res.data, "res");
        setQATestSummary(res.data);
        setLoading(false);
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
    "Component ID",
    "Test Number",
    "Test Reason Code",
    "Test Result Code",
    "End Date",
    "End Hour",
    "End Minute",
  ];

  return (
    <div>
      <div className=" padding-3">
        <h3 className="display-inline padding-right-3">Test Summary Data</h3>
        {user ? <Button> Add Test Summary Data</Button> : ""}
      </div>
      {
        !loading ? 
        (<QADataTableRender
            columnNames={columns}
            columnWidth={10}
            data={data}
            actionColumnName={"Actions"}
            actionsBtn={"View"}
            user={user}
            expandableRowComp={<QALinearitySummaryExpandableRows user={user}/>}
          />
        ) : (<Preloader />)
      }
    </div>
  )
};

export default QALinearitySummaryDataTable;
