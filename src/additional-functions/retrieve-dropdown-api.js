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

            setDefaultOptions(options, "supplementalMATSParameterCode");
          });
        } else {
          dmApi.getAllParameterCodes().then((response) => {
            options = response.data.map((option) => {
              return {
                code: option["parameterCode"],
                name: option["parameterCodeDescription"],
              };
            });

            setDefaultOptions(options, x);
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

          setDefaultOptions(options, "parameterCode");
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

            setDefaultOptions(options, "supplementalMATSMonitoringMethodCode");
          });
        } else {
          dmApi.getAllMethodCodes().then((response) => {
            options = response.data.map((option) => {
              return {
                code: option["methodCode"],
                name: option["methodCodeDescription"],
              };
            });

            setDefaultOptions(options, x);
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

          setDefaultOptions(options, x);
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

          setDefaultOptions(options, x);
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

          setDefaultOptions(options, x);
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

          setDefaultOptions(options, x);
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

          setDefaultOptions(options, x);
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

          setDefaultOptions(options, "fuelCode");
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

          setDefaultOptions(options, x);
        });
        break;
      case "indicatorCode":
        dmApi.getAllFuelIndicatorCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["fuelIndicatorCode"],
              name: option["fuelIndicatorCodeDescription"],
            };
          });

          setDefaultOptions(options, x);
        });
        break;
      case "demGCV":
        dmApi.getAllDemonstrationMethodCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["demMethodCode"],
              name: option["demMethodCodeDescription"],
            };
          });

          setDefaultOptions(options, x);
        });
        break;
      case "demSO2":
        dmApi.getAllDemonstrationMethodCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["demMethodCode"],
              name: option["demMethodCodeDescription"],
            };
          });

          setDefaultOptions(options, x);
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

          setDefaultOptions(options, x);
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

          setDefaultOptions(options, x);
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

          setDefaultOptions(options, x);
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

          setDefaultOptions(options, x);
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

          setDefaultOptions(options, x);
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

          setDefaultOptions(options, x);
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

          setDefaultOptions(options, x);
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

          setDefaultOptions(options, x);
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

          setDefaultOptions(options, x);
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

          setDefaultOptions(options, x);
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

          setDefaultOptions(options, x);
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

          setDefaultOptions(options, x);
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

          setDefaultOptions(options, x);
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

          setDefaultOptions(options, x);
        });
        break;
      default:
        break;
    }
  }

  const setDefaultOptions = (items, field) => {
    items.unshift({ code: "", name: "-- Select a value --" });
    const newData = totalOptions;
    newData[field] = items;

    setTotalOptions(newData);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return totalOptions;
};


