import { useState } from "react";
import * as dmApi from "../utils/api/dataManagementApi";
export const useRetrieveDropdownApi = (dropDownFields, mats = false) => {
  const [totalOptions, setTotalOptions] = useState({});

  const dataYearOptions = async () => {
    const currYear = new Date().getFullYear();
    const maxYear = currYear + 2;
    const minYear = 2000;
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

      case "materialCode":
        dmApi.getAllMaterialCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["materialCode"],
              name: option["materialCodeDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        });
        break;

      case "shapeCode":
        dmApi.getAllShapeCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["shapeCode"],
              name: option["shapeCodeDescription"],
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

export const UseRetrieveDropdownApi = async (dropDownFields, mats = false) => {
  let totalOptions = {};

  const dataYearOptions = async () => {
    const currYear = new Date().getFullYear();
    const maxYear = currYear + 2;
    const minYear = 2000;
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

    totalOptions = newData;
  };

  for (const fieldName of dropDownFields) {
    let options = [];
    switch (fieldName) {
      case "parameterCode":
        if (mats) {
          await dmApi.getAllMatsParameterCodes().then((response) => {
            options = response.data.map((option) => {
              return {
                code: option["matsMethodParamCode"],
                name: option["matsMethodParamCodeDescription"],
              };
            });

            setDefaultOptions(options, "supplementalMATSParameterCode");
          });
        } else {
          await dmApi.getAllParameterCodes().then((response) => {
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
        await dmApi.getAllControlEquipmentParameterCodes().then((response) => {
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
          await dmApi.getAllMatsMethodCodes().then((response) => {
            options = response.data.map((option) => {
              return {
                code: option["matsMethodCode"],
                name: option["matsMethodCodeDescription"],
              };
            });

            setDefaultOptions(options, "supplementalMATSMonitoringMethodCode");
          });
        } else {
          await dmApi.getAllMethodCodes().then((response) => {
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
        await dmApi.getAllSubstituteDataCodes().then((response) => {
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
        await dmApi.getAllBypassApproachCodes().then((response) => {
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
        await dmApi.getAllRangeCodes().then((response) => {
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
        await dmApi.getAllMaxRateSourceCodes().then((response) => {
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
        await dmApi.getAllUnitsOfMeasureCodes().then((response) => {
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
        await dmApi.getAllFuelTypes().then((response) => {
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
        await dmApi.getAllFuelCodes().then((response) => {
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
        await dmApi.getAllFuelIndicatorCodes().then((response) => {
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
        await dmApi.getAllDemonstrationMethodCodes().then((response) => {
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
        await dmApi.getAllDemonstrationMethodCodes().then((response) => {
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
        await dmApi.getAllSystemTypeCodes().then((response) => {
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
        await dmApi.getAllSystemDesignationCodes().then((response) => {
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
        await dmApi.getAllAcquisitionMethodCodes().then((response) => {
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
        await dmApi.getAllComponentTypeCodes().then((response) => {
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
        await dmApi.getAllBasisCodes().then((response) => {
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
        await dmApi.getAllSpanScaleCodes().then((response) => {
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
        await dmApi.getAllSpanMethodCodes().then((response) => {
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
        await dmApi.getAllOperatingLevelCodes().then((response) => {
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
        await dmApi.getAllOperatingConditionCodes().then((response) => {
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
        await dmApi.getAllDefaultSourceCodes().then((response) => {
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
        await dmApi.getAllDefaultPurposeCodes().then((response) => {
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
        await dmApi.getAllFormulaCodes().then((response) => {
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
        await dmApi.getAllRectangularDuctsCodes().then((response) => {
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
        await dmApi.getAllControlTechnologies().then((response) => {
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
        await dmApi.getAllQualificationTypeCodes().then((response) => {
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
        await dmApi.getAllQualificationDataTypeCodes().then((response) => {
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
        await dmApi.getAllQualificationLEETestTypeCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["qualLeeTestTypeCode"],
              name: option["qualLeeTestTypeDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        });
        break;

      case "materialCode":
        await dmApi.getAllMaterialCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["materialCode"],
              name: option["materialCodeDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        });
        break;

      case "shapeCode":
        await dmApi.getAllShapeCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["shapeCode"],
              name: option["shapeCodeDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        });
        break;

      case "prefilteredMatsMethods":
        let noDupesMatsMethodCodes = [];
        // returns all the parameter codes
        await dmApi.getPrefilteredMatsMethods().then((response) => {
          const viewData = response.data;

          // Get parameter codes
          noDupesMatsMethodCodes = viewData.map((code) => {
            return code["supplementalMATSParameterCode"];
          });

          // Filter out the duplicates
          noDupesMatsMethodCodes = [...new Set(noDupesMatsMethodCodes)];

          const prefilteredMdmOptions = [];

          // For each unique parameter code...
          for (const code of noDupesMatsMethodCodes) {
            // Find the records from the view that have that parameter code
            const filteredArray = viewData.filter(
              (element) => element.supplementalMATSParameterCode === code
            );

            // Gather all formula codes from those records
            let methodCodeArray = [];

            // *** rest of sub-arrays
            filteredArray.forEach((element) => {
              methodCodeArray.push(
                element.supplementalMATSMonitoringMethodCode
              );
            });

            // Find the distinct ones
            methodCodeArray = [...new Set(methodCodeArray)];

            // Pair the current parameter code with the list of matching formula codes
            const organizedMDMrow = {};
            organizedMDMrow["supplementalMATSParameterCode"] = code;
            organizedMDMrow["supplementalMATSMonitoringMethodCode"] =
              methodCodeArray;

            // Push this object (containing the pairing) to the array
            prefilteredMdmOptions.push(organizedMDMrow);
          }

          // Afterwards, we should have an array that has all the possible formula codes for each parameter code
          setDefaultOptions(prefilteredMdmOptions, fieldName);
        });
        break;

      case "prefilteredMethods":
        let noDupesMethodCodes = [];
        // returns all the parameter codes
        await dmApi.getPrefilteredMethods().then((response) => {
          const viewData = response.data;

          // Get parameter codes
          noDupesMethodCodes = viewData.map((code) => {
            return code["parameterCode"];
          });

          // Filter out the duplicates
          noDupesMethodCodes = [...new Set(noDupesMethodCodes)];

          const prefilteredMdmOptions = [];

          // For each unique parameter code...
          for (const code of noDupesMethodCodes) {
            // Find the records from the view that have that parameter code
            const filteredArray = viewData.filter(
              (element) => element.parameterCode === code
            );

            // Gather all formula codes from those records
            let methodCodeArray = [];
            let substituteDataCodeArray = [];
            let bypassApproachCodeArray = [];

            // *** rest of sub-arrays
            filteredArray.forEach((element) => {
              methodCodeArray.push(element.monitoringMethodCode);
              substituteDataCodeArray.push(element.substituteDataCode);
              bypassApproachCodeArray.push(element.bypassApproachCode);
            });

            // Find the distinct ones
            methodCodeArray = [...new Set(methodCodeArray)];
            substituteDataCodeArray = [...new Set(substituteDataCodeArray)];
            bypassApproachCodeArray = [...new Set(bypassApproachCodeArray)];

            // Pair the current parameter code with the list of matching formula codes
            const organizedMDMrow = {};
            organizedMDMrow["parameterCode"] = code;
            organizedMDMrow["monitoringMethodCode"] = methodCodeArray;
            organizedMDMrow["substituteDataCode"] = substituteDataCodeArray;
            organizedMDMrow["bypassApproachCode"] = bypassApproachCodeArray;

            // Push this object (containing the pairing) to the array
            prefilteredMdmOptions.push(organizedMDMrow);
          }

          // Afterwards, we should have an array that has all the possible formula codes for each parameter code
          setDefaultOptions(prefilteredMdmOptions, fieldName);
        });
        break;

      case "prefilteredFormulas":
        let noDupesFormCodes = [];
        // returns all the parameter codes
        await dmApi.getPrefilteredFormulas().then((response) => {
          const viewData = response.data;

          // Get parameter codes
          noDupesFormCodes = viewData.map((code) => {
            return code["parameterCode"];
          });

          // Filter out the duplicates
          noDupesFormCodes = [...new Set(noDupesFormCodes)];

          const prefilteredMdmOptions = [];

          // For each unique parameter code...
          for (const code of noDupesFormCodes) {
            // Find the records from the view that have that parameter code
            const filteredArray = viewData.filter(
              (element) => element.parameterCode === code
            );

            // Gather all formula codes from those records
            let formulaCodeArray = [];
            // *** rest of sub-arrays
            filteredArray.forEach((element) => {
              formulaCodeArray.push(element.formulaCode);
            });

            // Find the distinct ones
            formulaCodeArray = [...new Set(formulaCodeArray)];

            // Pair the current parameter code with the list of matching formula codes
            const organizedMDMrow = {};
            organizedMDMrow["parameterCode"] = code;
            organizedMDMrow["formulaCode"] = formulaCodeArray;

            // Push this object (containing the pairing) to the array
            prefilteredMdmOptions.push(organizedMDMrow);
          }

          // Afterwards, we should have an array that has all the possible formula codes for each parameter code
          setDefaultOptions(prefilteredMdmOptions, fieldName);
        });
        break;

      case "prefilteredSpans":
        let noDupesFormCodesSpans = [];
        await dmApi.getPrefilteredSpans().then((response) => {
          console.log("data", response.data);

          noDupesFormCodesSpans = response.data.map((code) => {
            return code["componentTypeCode"];
          });

          noDupesFormCodesSpans = [...new Set(noDupesFormCodesSpans)];

          const prefilteredMdmOptions = [];
          for (const code of noDupesFormCodesSpans) {
            const filteredArray = response.data.filter(
              (element) => element.componentTypeCode === code
            );
            let spanScaleCodeArray = [];
            let spanMethodCodeArray = [];
            let spanUnitsOfMeasureCodeArray = [];
            // *** rest of sub-arrays
            filteredArray.forEach((element) => {
              spanScaleCodeArray.push(element.spanScaleCode);
              spanMethodCodeArray.push(element.spanMethodCode);
              spanUnitsOfMeasureCodeArray.push(element.spanUnitsOfMeasureCode);
            });
            spanScaleCodeArray = [...new Set(spanScaleCodeArray)];
            spanMethodCodeArray = [...new Set(spanMethodCodeArray)];
            spanUnitsOfMeasureCodeArray = [
              ...new Set(spanUnitsOfMeasureCodeArray),
            ];

            const organizedMDMrow = {};
            organizedMDMrow["componentTypeCode"] = code;
            organizedMDMrow["spanScaleCode"] = spanScaleCodeArray;
            organizedMDMrow["spanMethodCode"] = spanMethodCodeArray;
            organizedMDMrow["spanUnitsOfMeasureCode"] =
              spanUnitsOfMeasureCodeArray;
            prefilteredMdmOptions.push(organizedMDMrow);
          }

          setDefaultOptions(prefilteredMdmOptions, fieldName);
        });
        break;
      case "prefilteredDefaults":
        let noDupesFormCodesDefaults = [];
        await dmApi.getPrefilteredDefaults().then((response) => {
          noDupesFormCodesDefaults = response.data.map((code) => {
            return code["parameterCode"];
          });

          noDupesFormCodesDefaults = [...new Set(noDupesFormCodesDefaults)];

          const prefilteredMdmOptions = [];
          for (const code of noDupesFormCodesDefaults) {
            const filteredArray = response.data.filter(
              (element) => element.parameterCode === code
            );
            let operatingConditionCodeArray = [];
            let defaultUnitsOfMeasureCodeArray = [];
            let defaultPurposeCodeArray = [];
            let fuelCodeArray = [];
            let defaultSourceCodeArray = [];
            // *** rest of sub-arrays
            filteredArray.forEach((element) => {
              operatingConditionCodeArray.push(element.operatingConditionCode);
              defaultUnitsOfMeasureCodeArray.push(
                element.defaultUnitsOfMeasureCode
              );
              defaultPurposeCodeArray.push(element.defaultPurposeCode);
              fuelCodeArray.push(element.fuelCode);
              defaultSourceCodeArray.push(element.defaultSourceCode);
            });
            operatingConditionCodeArray = [
              ...new Set(operatingConditionCodeArray),
            ];
            defaultUnitsOfMeasureCodeArray = [
              ...new Set(defaultUnitsOfMeasureCodeArray),
            ];
            defaultPurposeCodeArray = [...new Set(defaultPurposeCodeArray)];
            fuelCodeArray = [...new Set(fuelCodeArray)];
            defaultSourceCodeArray = [...new Set(defaultSourceCodeArray)];

            const organizedMDMrow = {};
            organizedMDMrow["parameterCode"] = code;
            organizedMDMrow["operatingConditionCode"] =
              operatingConditionCodeArray;
            organizedMDMrow["defaultUnitsOfMeasureCode"] =
              defaultUnitsOfMeasureCodeArray;
            organizedMDMrow["defaultPurposeCode"] = defaultPurposeCodeArray;
            organizedMDMrow["fuelCode"] = fuelCodeArray;
            organizedMDMrow["defaultSourceCode"] = defaultSourceCodeArray;
            prefilteredMdmOptions.push(organizedMDMrow);
          }

          setDefaultOptions(prefilteredMdmOptions, fieldName);
        });
        break;

      default:
        break;
    }
  }

  return totalOptions;
};
