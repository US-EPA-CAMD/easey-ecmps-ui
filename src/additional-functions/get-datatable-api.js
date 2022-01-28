import { useState } from "react";
import * as mpApi from "../utils/api/monitoringPlansApi";
const GetDataTableApi = (dataTableName, locationSelectValue) => {
  const [data, setData] = useState({});

  let options = [];

  switch (dataTableName) {
    case "loads":
      mpApi.getMonitoringLoads(locationSelectValue).then((response) => {
        options = response.data;
      });
      break;
    default:
      break;
  }

  return options;
};
export default GetDataTableApi;
