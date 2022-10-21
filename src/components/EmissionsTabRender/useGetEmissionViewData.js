import { useEffect, useState } from "react";
import { getEmissionViewData } from "../../utils/api/emissionsApi";
import { handleError } from "../../utils/api/apiUtils";

export const useGetEmissionViewData = (
  viewCode,
  monitorPlanId,
  year,
  quarter,
  unitIds,
  stackPipeIds
) => {
  // string[]
  const [columnNames, setColumnNames] = useState([]);
  // Array<{col1: string, col2: string, ...}>
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const handleGetData = async () => {
      const response = await getEmissionViewData(
        viewCode,
        monitorPlanId,
        year,
        quarter,
        unitIds,
        stackPipeIds
      );

      if (
        response &&
        response.status === 200 &&
        response.headers["x-field-mappings"] &&
        response.data
      ) {
        const columns = JSON.parse(response.headers["x-field-mappings"]);
        const results = response.data;

        const names = columns.map((column) => column.label);

        const formattedResults = [];
        for (const result of results) {
          let id = 1;
          const formattedObject = {};
          for (const resultKey in result) {
            formattedObject[`col${id}`] = result[resultKey];
            id += 1;
          }
          formattedResults.push(formattedObject);
        }

        setColumnNames(names);
        setData(formattedResults);
        setIsDataLoaded(true);
      } else {
        setIsDataLoaded(true);
      }
    };

    handleGetData().catch((error) => {
      handleError(error);
    });
  }, [monitorPlanId, quarter, stackPipeIds, unitIds, viewCode, year]);

  return { columnNames, data, isDataLoaded };
};
