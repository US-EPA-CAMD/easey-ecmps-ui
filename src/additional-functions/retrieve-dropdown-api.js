import { useState } from "react";
import * as dmApi from "../utils/api/dataManagementApi";
export const useRetrieveDropdownApi = (dropDownFields, mats = false) => {
  const [totalOptions, setTotalOptions] = useState({});

  const dataYearOptions = async () => {
    const currYear = new Date().getFullYear();
    const maxYear = currYear + 2;
    const minYear = 2002;
    let availableYears = [];

    for (let i = minYear; i <= maxYear; i++) {
      availableYears.push(i);
    }
    return availableYears;
  };

  const setDefaultOptions = (items, field) => {
    items.unshift({ code: "", name: "-- Select a value --" });
    const newData = totalOptions;
    newData[field] = items;

    setTotalOptions(newData);
  };

  for (const fieldName of dropDownFields) {
    let options = [];
    switch (fieldName) {
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

            setDefaultOptions(options, fieldName);
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

            setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
        });
        break;
      case "defaultUnitsOfMeasureCode":
      case "spanUnitsOfMeasureCode":
      case "maximumLoadUnitsOfMeasureCode":
      case "systemFuelFlowUOMCode":
      case "unitsOfStandard":
        dmApi.getAllUnitsOfMeasureCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["unitsOfMeasureCode"],
              name: option["unitsOfMeasureCodeDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
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

          setDefaultOptions(options, fieldName);
        });
        break;
      case "qualificationTypeCode":
        dmApi.getAllQualificationTypeCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["qualTypeCode"],
              name: option["qualTypeCodeDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        });
        break;
      case "qualificationYear":
      case "yr1QualificationDataYear":
      case "yr2QualificationDataYear":
      case "yr3QualificationDataYear":
        case "qualificationDataYear":
        dataYearOptions().then((years) => {
          options = years.map((year) => {
            return {
              code: year.toString(),
              name: year.toString(),
            };
          });

          setDefaultOptions(options, fieldName);
        });

        break;
      case "yr1QualificationDataTypeCode":
      case "yr2QualificationDataTypeCode":
      case "yr3QualificationDataTypeCode":
        dmApi.getAllQualificationDataTypeCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["qualDataTypeCode"],
              name: option["qualDataTypeCodeDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        });
        break;
      case "qualificationTestType":
        dmApi.getAllQualificationLEETestTypeCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["qualLeeTestTypeCode"],
              name: option["qualLeeTestTypeDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        });
        break;
      default:
        break;
    }
  }

  return totalOptions;
};
