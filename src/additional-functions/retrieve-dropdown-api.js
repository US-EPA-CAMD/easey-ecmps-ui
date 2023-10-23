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
  equipmentControl = false,
  selectedTestCode = false
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
                code: option["matsMethodParameterCode"],
                name: option["matsMethodParameterDescription"],
              };
            });

            setDefaultOptions(options, "supplementalMATSParameterCode");
          })
          .catch(error => console.log('getAllMatsParameterCodes failed', error));
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

              setDefaultOptions(options, "parameterCode");
            })
            .catch(error => console.log('getAllControlEquipmentParameterCodes failed', error));
        } else {
          await dmApi.getAllParameterCodes().then((response) => {
            options = response.data.map((option) => {
              return {
                code: option["parameterCode"],
                name: option["parameterDescription"],
              };
            });

            setDefaultOptions(options, fieldName);
          })
          .catch(error => console.log('getAllParameterCodes failed', error));
        }
        break;

      case "monitoringMethodCode":
        if (mats) {
          await dmApi.getAllMatsMethodCodes().then((response) => {
            options = response.data.map((option) => {
              return {
                code: option["matsMethodCode"],
                name: option["matsMethodDescription"],
              };
            });

            setDefaultOptions(options, "supplementalMATSMonitoringMethodCode");
          })
          .catch(error => console.log('getAllMatsMethodCodes failed', error));
        } else {
          await dmApi.getAllMethodCodes().then((response) => {
            options = response.data.map((option) => {
              return {
                code: option["methodCode"],
                name: option["methodDescription"],
              };
            });

            setDefaultOptions(options, fieldName);
          })
          .catch(error => console.log('getAllMethodCodes failed', error));
        }
        break;
      case "substituteDataCode":
        await dmApi.getAllSubstituteDataCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["substituteDataCode"],
              name: option["substituteDataDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllSubstituteDataCodes failed', error));
        break;

      case "bypassApproachCode":
        await dmApi.getAllBypassApproachCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["bypassApproachCode"],
              name: option["bypassApproachDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllBypassApproachCodes failed', error));
        break;
      //Analyzer Range
      case "analyzerRangeCode":
        await dmApi.getAllRangeCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["analyzerRangeCode"],
              name: option["analyzerRangeDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllRangeCodes failed', error));
        break;
      // System Fuel Flows
      case "maximumFuelFlowRateSourceCode":
        await dmApi.getAllMaxRateSourceCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["maxRateSourceCode"],
              name: option["maxRateSourceDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllMaxRateSourceCodes failed', error));
        break;
      case "defaultUnitsOfMeasureCode":
      case "spanUnitsOfMeasureCode":
      case "maximumLoadUnitsOfMeasureCode":
      case "systemFuelFlowUnitsOfMeasureCode":
      case "unitsOfStandard":
        await dmApi.getAllUnitsOfMeasureCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["unitOfMeasureCode"],
              name: option["unitOfMeasureDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllUnitsOfMeasureCodes failed', error));
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
        })
        .catch(error => console.log('getAllFuelTypes failed', error));
        break;

      case "fuelCode":
        await dmApi.getAllFuelCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["fuelCode"],
              name: option["fuelDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllFuelCodes failed', error));
        break;
      case "indicatorCode":
        await dmApi.getAllFuelIndicatorCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["fuelIndicatorCode"],
              name: option["fuelIndicatorDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllFuelIndicatorCodes failed', error));
        break;
        ///
      case "demGCV":
        await dmApi.getAllDemonstrationMethodCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["demonstrationMethodCode"],
              name: option["demonstrationMethodDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllDemonstrationMethodCodes failed', error));
        break;
        ///  same as above?
      case "demSO2":
        await dmApi.getAllDemonstrationMethodCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["demonstrationMethodCode"],
              name: option["demonstrationMethodDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllDemonstrationMethodCodes failed', error));
        break;
      case "systemTypeCode":
        await dmApi.getAllSystemTypeCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["systemTypeCode"],
              name: option["systemTypeDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllSystemTypeCodes failed', error));
        break;
      case "systemDesignationCode":
        await dmApi.getAllSystemDesignationCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["systemDesignationCode"],
              name: option["systemDesignationDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllSystemDesignationCodes failed', error));
        break;

      case "sampleAcquisitionMethodCode":
        await dmApi.getAllAcquisitionMethodCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["acquisitionMethodCode"],
              name: option["acquisitionMethodDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllAcquisitionMethodCodes failed', error));
        break;
      case "componentTypeCode":
        await dmApi.getAllComponentTypeCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["componentTypeCode"],
              name: option["componentTypeDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllComponentTypeCodes failed', error));
        break;
      case "basisCode":
        await dmApi.getAllBasisCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["basisCode"],
              name: option["basisDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllBasisCodes failed', error));
        break;
      case "analyticalPrincipleCode":
        await dmApi.getAnalyticalPrincipleCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["analyticalPrincipleCode"],
              name: option["analyticalPrincipleDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllBasisCodes failed', error));
        break;
      // for spans

      case "spanScaleCode":
        await dmApi.getAllSpanScaleCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["spanScaleCode"],
              name: option["spanScaleDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllSpanScaleCodes failed', error));
        break;
      case "spanMethodCode":
        await dmApi.getAllSpanMethodCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["spanMethodCode"],
              name: option["spanMethodDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllSpanMethodCodes failed', error));
        break;
      case "normalLevelCode":
      case "secondLevelCode":
      case "operatingLevelCode":
        await dmApi.getAllOperatingLevelCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["opLevelCode"],
              name: option["opLevelDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllOperatingLevelCodes failed', error));
        break;

      // for defaults

      case "operatingConditionCode":
        await dmApi.getAllOperatingConditionCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["operatingConditionCode"],
              name: option["operatingConditionDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllOperatingConditionCodes failed', error));
        break;
      case "defaultSourceCode":
        await dmApi.getAllDefaultSourceCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["defaultSourceCode"],
              name: option["defaultSourceDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllDefaultSourceCodes failed', error));
        break;
      case "defaultPurposeCode":
        await dmApi.getAllDefaultPurposeCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["defaultPurposeCode"],
              name: option["defaultPurposeDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllDefaultPurposeCodes failed', error));
        break;
      case "formulaCode":
        await dmApi.getAllFormulaCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["equationCode"],
              name: option["equationDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllFormulaCodes failed', error));
        break;

      case "wafMethodCode":
        await dmApi.getAllRectangularDuctsCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["wafMethodCode"],
              name: option["wafMethodDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllRectangularDuctsCodes failed', error));
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
        })
        .catch(error => console.log('getAllControlTechnologies failed', error));
        break;
      case "qualificationTypeCode":
        await dmApi.getAllQualificationTypeCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["qualificationTypeCode"],
              name: option["qualificationTypeDescription"],
              groupCode: option["qualificationTypeGroupCode"]
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllQualificationTypeCodes failed', error));
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
              code: option["qualificationDataTypeCode"],
              name: option["qualificationDataTypeDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllQualificationDataTypeCodes failed', error));
        break;
      case "qualificationTestType":
        await dmApi.getAllQualificationLEETestTypeCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["qualifiationLEETestTypeCode"],
              name: option["qualifiationLEETestTypeDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllQualificationLEETestTypeCodes failed', error));
        break;

      case "materialCode":
        await dmApi.getAllMaterialCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["materialCode"],
              name: option["materialDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllMaterialCodes failed', error));
        break;

      case "shapeCode":
        await dmApi.getAllShapeCodes().then((response) => {
          options = response.data.map((option) => {
            return {
              code: option["shapeCode"],
              name: option["shapeDescription"],
            };
          });

          setDefaultOptions(options, fieldName);
        })
        .catch(error => console.log('getAllShapeCodes failed', error));
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
        })
        .catch(error => console.log('getPrefilteredMatsMethods failed', error));
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
        })
        .catch(error => console.log('getPrefilteredMethods failed', error));
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
        })
        .catch(error => console.log('getPrefilteredFormulas failed', error));
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
        })
        .catch(error => console.log('getPrefilteredSpans failed', error));
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
        })
        .catch(error => console.log('getPrefilteredDefaults failed', error));
        break;

      case "prefilteredLoads":
        await dmApi.getPrefilteredLoads().then((response) => {
          setStaticDropdown(response.data, fieldName);
        })
        .catch(error => console.log('getPrefilteredLoads failed', error));
        break;
      case "prefilteredUnitFuels":
        await dmApi.getPrefilteredUnitFuels().then((response) => {
          setStaticDropdown(response.data, fieldName);
        })
        .catch(error => console.log('getPrefilteredUnitFuels failed', error));
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
        })
        .catch(error => console.log('getPrefilteredUnitControls failed', error));
        break;
      case "prefilteredLEEQualifications":
        await dmApi.prefilteredLEEQualifications().then((response) => {
          setStaticDropdown(response.data, fieldName);
        })
        .catch(error => console.log('prefilteredLEEQualifications failed', error));
        break;
      case "prefilteredSystemFuelFlows":
        await dmApi.getPrefilteredSystemFuelFlows().then((response) => {
          setStaticDropdown(response.data, fieldName);
        })
        .catch(error => console.log('getPrefilteredSystemFuelFlows failed', error));
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
        })
        .catch(error => console.log('getPrefilteredSystemComponents failed', error));
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
export const organizePrefilterMDMData = (noDupesFormCodes, drivingInput, response) => {
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
