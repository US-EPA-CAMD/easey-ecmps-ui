import React, { useEffect } from "react";
import config from "../../config";
import _ from "lodash";
import { getEvaluationQueueOrder } from '../../utils/api/camdServices'

export const EvaluateRefresh = ({
  dataList,
  storedFilters,
  lastEvalTime,
  forceReloadTables
}) => {

  const refreshPage = async () => {
    if (storedFilters.current !== null) {
      const evaluationQueueOrder = await getEvaluationQueueOrder(storedFilters.current.orisCodes);
      for (const value of dataList) {
        let data;

        const { ref, rowId, call, type: key } = value;

        if (key !== "MP") {
          //Filter emissions by quarter as well
          const resp = (
            await call(
              storedFilters.current.orisCodes,
              storedFilters.current.monPlanIds,
              storedFilters.current.submissionPeriods
            )
          );
          data = resp.data?.items ?? resp.data;
        } else {
          data = (
            await call(
              storedFilters.current.orisCodes,
              storedFilters.current.monPlanIds
            )
          ).data?.items;
        }

        const evaluationQueueOrderData = evaluationQueueOrder && evaluationQueueOrder.data && evaluationQueueOrder.data.items
        if (data && data.length && evaluationQueueOrderData && evaluationQueueOrderData.length) {
          data.forEach((d) => {
            if (d.evalStatusCode === 'INQ') {
              if (key !== "MP") {
                const row = evaluationQueueOrderData.find((item) => (item.testSumIdentifier && item.testSumIdentifier === d.testSumId) || (item.qaCertEventIdentifier && item.qaCertEventIdentifier === d.qaCertEventIdentifier) || (item.testExtensionExemptionIdentifier && item.testExtensionExemptionIdentifier === d.testExtensionExemptionIdentifier) || (item.periodAbbreviation && item.monPlanIdentifier === d.monPlanId && item.periodAbbreviation === d.periodAbbreviation));
                if (row) {
                  d.evalStatusCodeDescription = `In Queue (#${row.queuePosition} in queue)`
                }
              } else if (key === "MP") {
                const row = evaluationQueueOrderData.find((item) => (item.monPlanIdentifier && item.processCode === 'MP' && item.monPlanIdentifier === d.id));
                if (row) {
                  d.evalStatusCodeDescription = `In Queue (#${row.queuePosition} in queue)`
                }
              }
            }
          })
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

          const isRefreshDue =
          (new Date().getTime() - lastEvalTime.current) / 1000 >
          config.app.refreshEvalStatusRate / 1000 + 1 ;

         if (rowEntry && isRefreshDue) {
          //Make sure to always do the In Queue and In Progress
          if (rowEntry.evalStatusCodeDescription !== r.evalStatusCodeDescription && 
            (r.evalStatusCode === "INQ" || r.evalStatusCode === "WIP" || r.evalStatusCode === "EVAL" || r.evalStatusCode === "PASS"))
          {
              changes++;
              rowEntry.evalStatusCode = r.evalStatusCode;
              rowEntry.evalStatusCodeDescription = r.evalStatusCodeDescription;
          } 
          else if (
            rowEntry.evalStatusCodeDescription !== r.evalStatusCodeDescription ||
            rowEntry.severityDescription !== r?.severityDescription
          ) 
          {
              changes++;
              rowEntry.evalStatusCode = r.evalStatusCode;
              rowEntry.evalStatusCodeDescription = r.evalStatusCodeDescription;
              rowEntry.severityDescription = r?.severityDescription
          }
        }
      }

        if (changes > 0) {
          if (typeof forceReloadTables === 'function') {
            forceReloadTables();
          }
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(refreshPage, config.app.refreshEvalStatusRate);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div></div>;
};

export default EvaluateRefresh;