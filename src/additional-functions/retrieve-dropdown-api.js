import { useState } from "react";
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

            options.unshift({ code: "select", name: "-- Select a value --" });
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
            options.unshift({ code: "select", name: "-- Select a value --" });
            const newData = totalOptions;
            newData[x] = options;

            setTotalOptions(newData);
          });
        }
        break;
      case "controlEquipParamCode":
        dmApi.getAllControlEquipmentParameterCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["controlEquipParamCode"],
              name: option["controlEquipParamDescription"],
            };
          });

          options.unshift({ code: "", name: "" });
          options.unshift({ code: "select", name: "-- Select a value --" });
          const newData = totalOptions;
          newData["parameterCode"] = options;
          newData[x] = options;

          setTotalOptions(newData);
        });
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
            options.unshift({ code: "select", name: "-- Select a value --" });
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
            options.unshift({ code: "select", name: "-- Select a value --" });
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
            name: "-- Select a value --",
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
            name: "-- Select a value --",
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
          options.unshift({ code: "select", name: "-- Select a value --" });
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
          options.unshift({ code: "select", name: "-- Select a value --" });
          const newData = totalOptions;
          newData[x] = options;

          setTotalOptions(newData);
        });
        break;
      case "defaultUnitsOfMeasureCode":
      case "spanUnitsOfMeasureCode":
      case "maximumLoadUnitsOfMeasureCode":
      case "systemFuelFlowUOMCode":
        dmApi.getAllUnitsOfMeasureCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["unitsOfMeasureCode"],
              name: option["unitsOfMeasureCodeDescription"],
            };
          });

          options.unshift({ code: "", name: "" });
          options.unshift({ code: "select", name: "-- Select a value --" });
          const newData = totalOptions;
          newData[x] = options;

          setTotalOptions(newData);
        });
        break;

      case "fuelType":
        dmApi.getAllFuelTypes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["fuelTypeCode"],
              name: option["fuelTypeDescription"],
            };
          });

          options.unshift({ code: "", name: "" });
          options.unshift({ code: "select", name: "-- Select a value --" });
          const newData = totalOptions;
          newData[x] = options;

          setTotalOptions(newData);
        });
        break;

      case "fuelCode":
        dmApi.getAllFuelCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["fuelCode"],
              name: option["fuelCodeDescription"],
            };
          });

          options.unshift({ code: "", name: "" });
          options.unshift({ code: "select", name: "-- Select a value --" });
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
          options.unshift({ code: "select", name: "-- Select a value --" });
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
          options.unshift({ code: "select", name: "-- Select a value --" });
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
          options.unshift({ code: "select", name: "-- Select a value --" });
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
          options.unshift({ code: "select", name: "-- Select a value --" });
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
          options.unshift({ code: "select", name: "-- Select a value --" });
          const newData = totalOptions;
          newData[x] = options;

          setTotalOptions(newData);
        });
        break;
      // for spans

      case "spanScaleCode":
        dmApi.getAllSpanScaleCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["spanScaleCode"],
              name: option["spanScaleCodeDescription"],
            };
          });

          options.unshift({ code: "", name: "" });
          options.unshift({ code: "select", name: "-- Select a value --" });
          const newData = totalOptions;
          newData[x] = options;

          setTotalOptions(newData);
        });
        break;
      case "spanMethodCode":
        dmApi.getAllSpanMethodCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["spanMethodCode"],
              name: option["spanMethodCodeDescription"],
            };
          });

          options.unshift({ code: "", name: "" });
          options.unshift({ code: "select", name: "-- Select a value --" });
          const newData = totalOptions;
          newData[x] = options;

          setTotalOptions(newData);
        });
        break;
      case "normalLevelCode":
      case "secondLevelCode":
        dmApi.getAllOperatingLevelCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["operatingLevelCode"],
              name: option["operatingLevelCodeDescription"],
            };
          });

          options.unshift({ code: "", name: "" });
          options.unshift({ code: "select", name: "-- Select a value --" });
          const newData = totalOptions;
          newData[x] = options;

          setTotalOptions(newData);
        });
        break;

      // for defaults

      case "operatingConditionCode":
        dmApi.getAllOperatingConditionCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["operatingConditionCode"],
              name: option["operatingConditionCodeDescription"],
            };
          });

          options.unshift({ code: "", name: "" });
          options.unshift({ code: "select", name: "-- Select a value --" });
          const newData = totalOptions;
          newData[x] = options;

          setTotalOptions(newData);
        });
        break;
      case "defaultSourceCode":
        dmApi.getAllDefaultSourceCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["defaultSourceCode"],
              name: option["defaultSourceCodeDescription"],
            };
          });

          options.unshift({ code: "", name: "" });
          options.unshift({ code: "select", name: "-- Select a value --" });
          const newData = totalOptions;
          newData[x] = options;

          setTotalOptions(newData);
        });
        break;
      case "defaultPurposeCode":
        dmApi.getAllDefaultPurposeCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["defaultPurposeCode"],
              name: option["defaultPurposeCodeDescription"],
            };
          });

          options.unshift({ code: "", name: "" });
          options.unshift({ code: "select", name: "-- Select a value --" });
          const newData = totalOptions;
          newData[x] = options;

          setTotalOptions(newData);
        });
        break;
      case "formulaCode":
        dmApi.getAllFormulaCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["equationCode"],
              name: option["equationCodeDescription"],
            };
          });

          options.unshift({ code: "", name: "" });
          options.unshift({ code: "select", name: "-- Select a value --" });
          const newData = totalOptions;
          newData[x] = options;

          setTotalOptions(newData);
        });
        break;

      case "wafMethodCode":
        dmApi.getAllRectangularDuctsCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["wafMethodCode"],
              name: option["wafMethodCodeDescription"],
            };
          });

          options.unshift({ code: "", name: "" });
          options.unshift({ code: "select", name: "-- Select a value --" });
          const newData = totalOptions;
          newData[x] = options;

          setTotalOptions(newData);
        });
        break;
      case "controlCode":
        dmApi.getAllControlTechnologies().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["controlCode"],
              name: option["controlDescription"],
            };
          });

          options.unshift({ code: "", name: "" });
          options.unshift({ code: "select", name: "-- Select a value --" });
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
