import { useState } from "react";
import * as mpApi from "../utils/api/monitoringPlansApi";
const GetDataTableApi = (dataTableName, locationSelectValue) => {
  const [data, setData] = useState({});

  let options = [];

  switch (dataTableName) {
    case "loads":
      mpApi.getMonitoringLoads(locationSelectValue).then((response) => {
        console.log("resoonse", response.data);
        options = response.data;
      });
      break;
    default:
      break;
  }

  return options;
};
export default GetDataTableApi;
