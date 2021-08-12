import React,{useState, useEffect} from "react";
import * as dmApi from "../utils/api/dataManagementApi";
export const useRetrieveDropdownApi = (arr, mats = false) => {
  const [totalOptions, setTotalOptions] = useState({});
  useEffect(() => {
    for (const x of arr) {
      let options = [];
      switch (x) {
        case "parameterCode":
          if (mats) {
            dmApi.getAllMatsParameterCodes().then((response) => {
              options = response.data.map((option) => {
                return {
                  code: option["matsMethodParamCode"],
                  name: option["matsMethodParamCodeDescription"],
                };
              });

              
              options.unshift({ code: "", name: "" });
              const newData = totalOptions;
              newData["matsMethodParameterCode"] = options;
              setTotalOptions(newData);
            });
          } else {
            dmApi.getAllParameterCodes().then((response) => {
              options = response.data.map((option) => {
                 
                return {
                  code: option["parameterCode"],
                  name: option["parameterCodeDescription"],
                };
              });

              options.unshift({ code: "", name: "" });
              const newData = totalOptions;
              newData[x] = options;

              setTotalOptions(newData);
            });
          }
          break;
        case "methodCode":
          if (mats) {
            dmApi.getAllMatsMethodCodes().then((response) => {
              options = response.data.map((option) => {
                return {
                  code: option["matsMethodCode"],
                  name: option["matsMethodCodeDescription"],
                };
              });

              options.unshift({ code: "", name: "" });
              const newData = totalOptions;
              newData["matsMethodCode"] = options;
              setTotalOptions(newData);
            });
          } else {
            dmApi.getAllMethodCodes().then((response) => {
              options = response.data.map((option) => {
                return {
                  code: option["methodCode"],
                  name: option["methodCodeDescription"],
                };
              });

              options.unshift({ code: "", name: "" });
              const newData = totalOptions;
              newData[x] = options;

              setTotalOptions(newData);
            });
          }
          break;
        case "subDataCode":
          dmApi.getAllSubstituteDataCodes().then((response) => {
            options = response.data.map((option) => {
              return {
                code: option["subDataCode"],
                name: option["subDataCodeDescription"],
              };
            });

            options.unshift({ code: "", name: "" });
            const data = {};
            data[x] = options;
            const newData = totalOptions;
            newData[x] = options;

            setTotalOptions(newData);
          });
          break;

        case "bypassApproachCode":
          dmApi.getAllBypassApproachCodes().then((response) => {
            options = response.data.map((option) => {
              return {
                code: option["bypassApproachCode"],
                name: option["bypassApproachCodeDescription"],
              };
            });

            options.unshift({ code: "", name: "" });
            const newData = totalOptions;
            newData[x] = options;

            setTotalOptions(newData);
          });
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return totalOptions;
};
