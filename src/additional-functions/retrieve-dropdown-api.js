import React from "react";
import * as dmApi from "../utils/api/dataManagementApi";
export const useRetrieveDropdownApi = (arr) => {
  const [parameterCodesOptions, setParameterCodesOptions] = React.useState(
    null
  );
  const [methodCodesOptions, setMethodCodesOptions] = React.useState(null);
  const [
    substituteDataApproachOptions,
    setsubstituteDataApproachOptions,
  ] = React.useState(null);
  const [bypassCodesOptions, setBypassCodesOptions] = React.useState(null);

  const [totalOptions, setTotalOptions] = React.useState([]);
  React.useEffect(() => {
    for (const x of arr) {
      let options = [];
      switch (x) {
        case "parameterCode":
          dmApi.getAllParameterCodes().then((response) => {
            options = response.data.map((option) => {
              return {
                code: option["parameterCode"],
                name: option["parameterCodeDescription"],
              };
            });

            options.unshift({ code: "", name: "" });
            const data = {};
            data[x] = options;
            setTotalOptions((oldArray) => [...oldArray, data]);
          });
          break;
        case "methodCode":
          dmApi.getAllMethodCodes().then((response) => {
            const options = response.data.map((option) => {
              return {
                code: option["methodCode"],
                name: option["methodCodeDescription"],
              };
            });

            options.unshift({ code: "", name: "" });
            const data = {};
            data[x] = options;
            setTotalOptions((oldArray) => [...oldArray, data]);
          });
          break;
        case "subDataCode":
          dmApi.getAllSubstituteDataCodes().then((response) => {
            const options = response.data.map((option) => {
              return {
                code: option["subDataCode"],
                name: option["subDataCodeDescription"],
              };
            });

            options.unshift({ code: "", name: "" });
            const data = {};
            data[x] = options;
            setTotalOptions((oldArray) => [...oldArray, data]);
          });
          break;
        case "bypassApproachCode":
          dmApi.getAllBypassApproachCodes().then((response) => {
            const options = response.data.map((option) => {
              return {
                code: option["bypassApproachCode"],
                name: option["bypassApproachCodeDescription"],
              };
            });

            options.unshift({ code: "", name: "" });
            const data = {};
            data[x] = options;
            setTotalOptions((oldArray) => [...oldArray, data]);
          });
          break;
        default:
          break;
      }
      //   setTotalOptions(...totalOptions,options)
      //   console.log('total',options)
    }
   
  }, []);
  return totalOptions;
};
