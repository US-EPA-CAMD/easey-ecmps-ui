import { useState, useEffect } from "react";
import * as dmApi from "../utils/api/dataManagementApi";
export const useRetrieveDropdownApi = (arr, mats = false) => {
  const [totalOptions, setTotalOptions] = useState({});
  // useEffect(() => {
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

            options.unshift({ code: "select", name: "Select a parameter..." });
            const newData = totalOptions;
            newData["supplementalMATSParameterCode"] = options;
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
            options.unshift({ code: "select", name: "Select a parameter..." });
            const newData = totalOptions;
            newData[x] = options;

            setTotalOptions(newData);
          });
        }
        break;
      case "monitoringMethodCode":
        if (mats) {
          dmApi.getAllMatsMethodCodes().then((response) => {
            options = response.data.map((option) => {
              return {
                code: option["matsMethodCode"],
                name: option["matsMethodCodeDescription"],
              };
            });

            options.unshift({ code: "", name: "" });
            options.unshift({ code: "select", name: "Select a method..." });
            const newData = totalOptions;
            newData["supplementalMATSMonitoringMethodCode"] = options;
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
            options.unshift({ code: "select", name: "Select a method..." });
            const newData = totalOptions;
            newData[x] = options;

            setTotalOptions(newData);
          });
        }
        break;
      case "substituteDataCode":
        dmApi.getAllSubstituteDataCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["subDataCode"],
              name: option["subDataCodeDescription"],
            };
          });

          options.unshift({ code: "", name: "" });
          options.unshift({
            code: "select",
            name: "Select a substitute data...",
          });
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
          options.unshift({
            code: "select",
            name: "Select a bypass approach...",
          });
          const newData = totalOptions;
          newData[x] = options;

          setTotalOptions(newData);
        });
        break;
      //Analyzer Range
      case "analyzerRangeCode":
        dmApi.getAllRangeCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["analyzerRangeCode"],
              name: option["analyzerRangeCodeDescription"],
            };
          });
          options.unshift({ code: "", name: "" });
          options.unshift({ code: "select", name: "Select a range..." });
          const newData = totalOptions;
          newData[x] = options;

          setTotalOptions(newData);
        });
        break;
      // System Fuel Flows
      case "maximumFuelFlowRateSourceCode":
        dmApi.getAllMaxRateSourceCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["maxRateSourceCode"],
              name: option["maxRateSourceCodeDescription"],
            };
          });

          options.unshift({ code: "", name: "" });
          options.unshift({ code: "", name: "Select a fuel flow rate" });
          const newData = totalOptions;
          newData[x] = options;

          setTotalOptions(newData);
        });
        break;
      case "systemFuelFlowUOMCode":
        dmApi.getAllUnitsOfMeasureCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["unitsOfMeasureCode"],
              name: option["unitsOfMeasureCodeDescription"],
            };
          });

          options.unshift({ code: "", name: "" });
          options.unshift({ code: "", name: "Select a unit of measure" });
          const newData = totalOptions;
          newData[x] = options;

          setTotalOptions(newData);
        });
        break;

      case "fuelCode":
        dmApi.getAllFuelTypes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["fuelTypeCode"],
              name: option["fuelTypeDescription"],
            };
          });

          options.unshift({ code: "", name: "" });
          options.unshift({ code: "", name: "Select a fuel type..." });
          const newData = totalOptions;
          newData[x] = options;

          setTotalOptions(newData);
        });
        break;
      case "systemTypeCode":
        dmApi.getAllSystemTypeCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["systemTypeCode"],
              name: option["systemTypeCodeDescription"],
            };
          });

          options.unshift({ code: "", name: "" });
          options.unshift({ code: "", name: "Select a system type..." });
          const newData = totalOptions;
          newData[x] = options;

          setTotalOptions(newData);
        });
        break;
      case "systemDesignationCode":
        dmApi.getAllSystemDesignationCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["systemDesignationCode"],
              name: option["systemDesignationCodeDescription"],
            };
          });

          options.unshift({ code: "", name: "" });
          options.unshift({ code: "", name: "Select a system designation..." });
          const newData = totalOptions;
          newData[x] = options;

          setTotalOptions(newData);
        });
        break;

        case "sampleAcquisitionMethodCode":
          dmApi.getAllAcquisitionMethodCodes().then((response) => {
            options = response.data.map((option) => {
              return {
                code: option["acquisitionMethodCode"],
                name: option["acquisitionMethodCodeDescription"],
              };
            });
  
            options.unshift({ code: "", name: "" });
            options.unshift({ code: "", name: "Select a method " });
            const newData = totalOptions;
            newData[x] = options;
  
            setTotalOptions(newData);
          });
          break;
          case "componentTypeCode":
            dmApi.getAllComponentTypeCodes().then((response) => {
              options = response.data.map((option) => {
                return {
                  code: option["componentTypeCode"],
                  name: option["componentTypeCodeDescription"],
                };
              });
    
              options.unshift({ code: "", name: "" });
              options.unshift({ code: "", name: "Select a component type " });
              const newData = totalOptions;
              newData[x] = options;
    
              setTotalOptions(newData);
            });
            break;
            case "basisCode":
              dmApi.getAllBasisCodes().then((response) => {
                options = response.data.map((option) => {
                  return {
                    code: option["basisCode"],
                    name: option["basisCodeDescription"],
                  };
                });
      
                options.unshift({ code: "", name: "" });
                options.unshift({ code: "", name: "Select a basis " });
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
  // }, []);
  return totalOptions;
};
