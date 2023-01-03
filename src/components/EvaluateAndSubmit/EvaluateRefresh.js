import React, { useEffect } from "react";
import config from "../../config";
import _ from "lodash";

export const EvaluateRefresh = ({ dataList, storedFilters }) => {
  const refreshPage = async () => {
    if (storedFilters.current !== null) {
      for (const [key, value] of Object.entries(dataList)) {
        let data;

        const { ref, rowId, call, setState } = value;

        if (key !== "MP") {
          //Filter emissions by quarter as well
          data = (
            await call(
              storedFilters.current.orisCodes,
              storedFilters.current.monPlanIds,
              storedFilters.current.submissionPeriods
            )
          ).data;
        } else {
          data = (
            await call(
              storedFilters.current.orisCodes,
              storedFilters.current.monPlanIds
            )
          ).data;
        }

        // Extra formatting to make all data sets uniform
        let changes = 0;
        for (const r of data) {
          if (r["id"]) {
            r.monPlanId = r["id"];
          }

          const rowEntry = ref.current.find(
            (v) => v["monPlanId"] === r["monPlanId"] && v[rowId] === r[rowId]
          );

          if (rowEntry && rowEntry.evalStatusCode !== r.evalStatusCode) {
            changes++;
            rowEntry.evalStatusCode = r.evalStatusCode;
          }
        }

        if (changes > 0) {
          setState(_.cloneDeep(ref.current));
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(refreshPage, config.app.refreshEvalStatusRate);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div></div>;
};

export default EvaluateRefresh;
