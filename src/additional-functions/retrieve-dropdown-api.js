import * as dmApi from "../utils/api/dataManagementApi";

export const dataYearOptions = async () => {
  const currYear = new Date().getFullYear();
  const maxYear = currYear + 2;
  const minYear = 2000;
  let availableYears = [];

  for (let i = minYear; i <= maxYear; i++) {
    availableYears.push(i);
  }
  return availableYears;
};

export const UseRetrieveDropdownApi = async (
  dropDownFields,
  mats = false,
  equipmentControl = false
) => {
  let totalOptions = {};

  const setDefaultOptions = (items, field, select = true) => {
    if (select) {
      items.unshift({ code: "", name: "-- Select a value --" });
    }

    const newData = totalOptions;
    newData[field] = items;

    totalOptions = newData;
  };

  const setStaticDropdown = (data, fieldName) => {
    const prefilteredMdmOptions = organizeStaticPrefilterMDMData(data);
    setDefaultOptions(prefilteredMdmOptions, fieldName, false);
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
        } else if (equipmentControl) {
          await dmApi
            .getAllControlEquipmentParameterCodes()
            .then((response) => {
              options = response.data.map((option) => {
                return {
                  code: option["controlEquipParamCode"],
                  name: option["controlEquipParamDescription"],
                };
              });
              console.log(
                "Line 59",
                "controlEquipParamCode",
                options,
                fieldName
              );

              setDefaultOptions(options, "parameterCode");
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

          const prefilteredMdmOptions = organizePrefilterMDMData(
            noDupesMatsMethodCodes,
            "supplementalMATSParameterCode",
            response.data
          );

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

          const prefilteredMdmOptions = organizePrefilterMDMData(
            noDupesMethodCodes,
            "parameterCode",
            response.data
          );

          // Afterwards, we should have an array that has all the possible formula codes for each parameter code
          setDefaultOptions(prefilteredMdmOptions, fieldName);
        });
        break;

      case "prefilteredFormulas":
        let noDupesFormulaCodes = [];
        // returns all the parameter codes
        await dmApi.getPrefilteredFormulas().then((response) => {
          const viewData = response.data;

          // Get parameter codes
          noDupesFormulaCodes = viewData.map((code) => {
            return code["parameterCode"];
          });

          // Filter out the duplicates
          noDupesFormulaCodes = [...new Set(noDupesFormulaCodes)];

          const prefilteredMdmOptions = organizePrefilterMDMData(
            noDupesFormulaCodes,
            "parameterCode",
            response.data
          );

          // Afterwards, we should have an array that has all the possible formula codes for each parameter code
          setDefaultOptions(prefilteredMdmOptions, fieldName);
        });
        break;

      case "prefilteredSpans":
        let noDupesSpanCodes = [];
        await dmApi.getPrefilteredSpans().then((response) => {
          noDupesSpanCodes = response.data.map((code) => {
            return code["componentTypeCode"];
          });

          noDupesSpanCodes = [...new Set(noDupesSpanCodes)];

          const prefilteredMdmOptions = organizePrefilterMDMData(
            noDupesSpanCodes,
            "componentTypeCode",
            response.data
          );

          setDefaultOptions(prefilteredMdmOptions, fieldName);
        });
        break;
      case "prefilteredDefaults":
        let noDupesDefaultCodes = [];
        await dmApi.getPrefilteredDefaults().then((response) => {
          noDupesDefaultCodes = response.data.map((code) => {
            return code["parameterCode"];
          });

          noDupesDefaultCodes = [...new Set(noDupesDefaultCodes)];

          const prefilteredMdmOptions = organizePrefilterMDMData(
            noDupesDefaultCodes,
            "parameterCode",
            response.data
          );
          setDefaultOptions(prefilteredMdmOptions, fieldName);
        });
        break;

      case "prefilteredLoads":
        await dmApi.getPrefilteredLoads().then((response) => {
          setStaticDropdown(response.data, fieldName);
        });
        break;
      case "prefilteredUnitFuels":
        await dmApi.getPrefilteredUnitFuels().then((response) => {
          setStaticDropdown(response.data, fieldName);
        });
        break;
      case "prefilteredUnitControls":
        let noDupesFormCodesControls = [];
        await dmApi.getPrefilteredUnitControls().then((response) => {
          noDupesFormCodesControls = response.data.map((code) => {
            return code["controlEquipParamCode"];
          });
          options = response.data.map((option) => {
            return {
              parameterCode: option["controlEquipParamCode"],
              controlCode: option["controlCode"],
            };
          });
          noDupesFormCodesControls = [...new Set(noDupesFormCodesControls)];
          const prefilteredMdmOptions = organizePrefilterMDMData(
            noDupesFormCodesControls,
            "parameterCode",
            options
          );

          setDefaultOptions(prefilteredMdmOptions, fieldName);
        });
        break;
      case "prefilteredLEEQualifications":
        await dmApi.prefilteredLEEQualifications().then((response) => {
          setStaticDropdown(response.data, fieldName);
        });
        break;
      case "prefilteredSystemFuelFlows":
        await dmApi.getPrefilteredSystemFuelFlows().then((response) => {
          setStaticDropdown(response.data, fieldName);
        });
        break;

      case "prefilteredSystemsComponents":
        let noDupesSysComps = [];
        await dmApi.getPrefilteredSystemComponents().then((response) => {
          noDupesSysComps = response.data.map((code) => {
            return code["componentTypeCode"];
          });

          noDupesSysComps = [...new Set(noDupesSysComps)];

          const prefilteredMdmOptions = organizePrefilterMDMData(
            noDupesSysComps,
            "componentTypeCode",
            response.data
          );

          setDefaultOptions(prefilteredMdmOptions, fieldName);
        });
        break;
      default:
        break;
    }
  }

  return totalOptions;
};

const organizeStaticPrefilterMDMData = (response) => {
  const setOfCodeNames = {};
  // creates an array based on the property name of the mdm coming in
  for (const codeName in response[0]) {
    setOfCodeNames[codeName] = [];
  }

  // for each unique property name, it will find the unique value and add it (no duplicates)
  for (const mdmDataRow of response) {
    for (const codeNameOfRow in mdmDataRow) {
      if (
        // filters out code duplicates
        !setOfCodeNames[codeNameOfRow].includes(mdmDataRow[codeNameOfRow])
      ) {
        setOfCodeNames[codeNameOfRow].push(mdmDataRow[codeNameOfRow]);
      }
    }
  }

  const setOfCodeNamesArray = [];
  setOfCodeNamesArray.push(setOfCodeNames);
  return setOfCodeNamesArray;
};
const organizePrefilterMDMData = (noDupesFormCodes, drivingInput, response) => {
  const prefilteredMdmOptions = [];
  // for each unique main driving input code
  for (const code of noDupesFormCodes) {
    // get all of the secondary dropdowns that follows the unique main driving input
    const filteredArray = response.filter(
      (element) => element[drivingInput] === code
    );

    let setOfSecondaryDropdownArrayCodes = {};

    // finds the secondary dropdown property names and makes array and pushes into object above
    for (const secondaryCodeName in filteredArray[0]) {
      if (secondaryCodeName !== drivingInput) {
        //  dynamically creates array for each secondary
        setOfSecondaryDropdownArrayCodes[secondaryCodeName] = [];
      }
    }

    // *** rest of sub-arrays
    // runs through each secondary belonging to the unique main driving input array and adds it to an array
    filteredArray.forEach((element) => {
      for (const secondaryCode in setOfSecondaryDropdownArrayCodes) {
        if (
          // filters out secondary code duplicates
          !setOfSecondaryDropdownArrayCodes[secondaryCode].includes(
            element[secondaryCode]
          )
        ) {
          setOfSecondaryDropdownArrayCodes[secondaryCode].push(
            element[secondaryCode]
          );
        }
      }
    });
    const organizedMDMrow = {};
    organizedMDMrow[drivingInput] = code;
    // creates returning object of
    // {drivingInput: uniqueCode , secondaryArray : [uniqueCode,uniqueCode2,uniqueCode3], secondaryArray2: [uniqueCode,uniqueCode2]}
    for (const secondaryCode in setOfSecondaryDropdownArrayCodes) {
      organizedMDMrow[secondaryCode] =
        setOfSecondaryDropdownArrayCodes[secondaryCode];
    }

    prefilteredMdmOptions.push(organizedMDMrow);
  }
  return prefilteredMdmOptions;
};
