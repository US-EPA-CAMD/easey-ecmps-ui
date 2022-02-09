import { UseRetrieveDropdownApi } from "./retrieve-dropdown-api";
import React from "react";
import * as dmApi from "../utils/api/dataManagementApi";
import axios from "axios";
jest.mock("axios");

afterAll(() => {
  jest.restoreAllMocks();
});

const successCode = 201;

const dropdownOptions = [
  { code: "", name: "-- Select a value --" },
  { code: "", name: "" },
];

// Iterates through the testObjects array to test all of the cases in the switch statement
const executeTests = () => {
  testObjects.forEach((testObject) => {
    test(`testing ${testObject.name}`, async () => {
      axios.get.mockImplementation(() =>
        Promise.resolve(testObject.expectedApiResponse)
      );
      React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

      const apiResponse = await testObject.function();
      expect(apiResponse.data).toEqual(testObject.expectedApiResponse.data);

      UseRetrieveDropdownApi(
        [testObject.case],
        testObject.mats ? testObject.mats : false
      ).then((dropdownOptions) => {
        expect(dropdownOptions).toEqual(testObject.expectedDropdownOptions);
      });
    });
  });
};

// After adding a new case in retrieve-dropdown-api.js, all you need to do is add a new test object following the current structure:
//    - name:                     this text appears when you run the test
//    - expectedApiResponse:      mock response with the properties that will be returned
//    - expectedDropdownOptions:  options object containing name of the field in the UI
//    - case:                     the fieldName used in the switch statement in retrieve-dropdown-api.js
//    - mats:                     MATS flag set to true (optional)
//    - function:                 function called in dataManagementApi.js
const testObjects = [
  {
    name: "parameter Code for non-MATS",
    expectedApiResponse: {
      status: successCode,
      data: [{ parameterCode: "", parameterCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      parameterCode: dropdownOptions,
    },
    case: "parameterCode",
    function: dmApi.getAllParameterCodes,
  },
  {
    name: "parameter Code for MATS",
    expectedApiResponse: {
      status: successCode,
      data: [{ matsMethodParamCode: "", matsMethodParamCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      supplementalMATSParameterCode: dropdownOptions,
    },
    case: "parameterCode",
    mats: true,
    function: dmApi.getAllMatsParameterCodes,
  },
  {
    name: "controlEquipParamCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ controlEquipParamCode: "", controlEquipParamDescription: "" }],
    },
    expectedDropdownOptions: {
      parameterCode: dropdownOptions,
    },
    case: "controlEquipParamCode",
    function: dmApi.getAllControlEquipmentParameterCodes,
  },

  {
    name: "monitoringMethodCode for non-MATS",
    expectedApiResponse: {
      status: successCode,
      data: [{ methodCode: "", methodCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      monitoringMethodCode: dropdownOptions,
    },
    case: "monitoringMethodCode",
    function: dmApi.getAllMethodCodes,
  },

  {
    name: "monitoringMethodCode for MATS",
    expectedApiResponse: {
      status: successCode,
      data: [{ matsMethodCode: "", matsMethodCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      supplementalMATSMonitoringMethodCode: dropdownOptions,
    },
    case: "monitoringMethodCode",
    mats: true,
    function: dmApi.getAllMatsMethodCodes,
  },

  {
    name: "substituteDataCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ subDataCode: "", subDataCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      substituteDataCode: dropdownOptions,
    },
    case: "substituteDataCode",
    function: dmApi.getAllSubstituteDataCodes,
  },

  {
    name: "bypassApproachCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ bypassApproachCode: "", bypassApproachCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      bypassApproachCode: dropdownOptions,
    },
    case: "bypassApproachCode",
    function: dmApi.getAllBypassApproachCodes,
  },

  {
    name: "analyzerRangeCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ analyzerRangeCode: "", analyzerRangeCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      analyzerRangeCode: dropdownOptions,
    },
    case: "analyzerRangeCode",
    function: dmApi.getAllRangeCodes,
  },

  {
    name: "maximumFuelFlowRateSourceCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ maxRateSourceCode: "", maxRateSourceCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      maximumFuelFlowRateSourceCode: dropdownOptions,
    },
    case: "maximumFuelFlowRateSourceCode",
    function: dmApi.getAllMaxRateSourceCodes,
  },

  {
    name: "defaultUnitsOfMeasureCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ unitsOfMeasureCode: "", unitsOfMeasureCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      defaultUnitsOfMeasureCode: dropdownOptions,
    },
    case: "defaultUnitsOfMeasureCode",
    function: dmApi.getAllUnitsOfMeasureCodes,
  },

  {
    name: "spanUnitsOfMeasureCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ unitsOfMeasureCode: "", unitsOfMeasureCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      spanUnitsOfMeasureCode: dropdownOptions,
    },
    case: "spanUnitsOfMeasureCode",
    function: dmApi.getAllUnitsOfMeasureCodes,
  },

  {
    name: "maximumLoadUnitsOfMeasureCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ unitsOfMeasureCode: "", unitsOfMeasureCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      maximumLoadUnitsOfMeasureCode: dropdownOptions,
    },
    case: "maximumLoadUnitsOfMeasureCode",
    function: dmApi.getAllUnitsOfMeasureCodes,
  },

  {
    name: "systemFuelFlowUOMCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ unitsOfMeasureCode: "", unitsOfMeasureCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      systemFuelFlowUOMCode: dropdownOptions,
    },
    case: "systemFuelFlowUOMCode",
    function: dmApi.getAllUnitsOfMeasureCodes,
  },

  {
    name: "unitsOfStandard",
    expectedApiResponse: {
      status: successCode,
      data: [{ unitsOfMeasureCode: "", unitsOfMeasureCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      unitsOfStandard: dropdownOptions,
    },
    case: "unitsOfStandard",
    function: dmApi.getAllUnitsOfMeasureCodes,
  },

  {
    name: "fuelType",
    expectedApiResponse: {
      status: successCode,
      data: [{ fuelTypeCode: "", fuelTypeDescription: "" }],
    },
    expectedDropdownOptions: {
      fuelCode: dropdownOptions,
    },
    case: "fuelType",
    function: dmApi.getAllFuelTypes,
  },

  {
    name: "fuelCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ fuelCode: "", fuelCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      fuelCode: dropdownOptions,
    },
    case: "fuelCode",
    function: dmApi.getAllFuelCodes,
  },

  {
    name: "indicatorCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ fuelIndicatorCode: "", fuelIndicatorCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      indicatorCode: dropdownOptions,
    },
    case: "indicatorCode",
    function: dmApi.getAllFuelIndicatorCodes,
  },

  {
    name: "demGCV",
    expectedApiResponse: {
      status: successCode,
      data: [{ demMethodCode: "", demMethodCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      demGCV: dropdownOptions,
    },
    case: "demGCV",
    function: dmApi.getAllDemonstrationMethodCodes,
  },

  {
    name: "demSO2",
    expectedApiResponse: {
      status: successCode,
      data: [{ demMethodCode: "", demMethodCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      demSO2: dropdownOptions,
    },
    case: "demSO2",
    function: dmApi.getAllDemonstrationMethodCodes,
  },

  {
    name: "systemTypeCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ systemTypeCode: "", systemTypeCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      systemTypeCode: dropdownOptions,
    },
    case: "systemTypeCode",
    function: dmApi.getAllSystemTypeCodes,
  },

  {
    name: "systemDesignationCode",
    expectedApiResponse: {
      status: successCode,
      data: [
        { systemDesignationCode: "", systemDesignationCodeDescription: "" },
      ],
    },
    expectedDropdownOptions: {
      systemDesignationCode: dropdownOptions,
    },
    case: "systemDesignationCode",
    function: dmApi.getAllSystemDesignationCodes,
  },

  {
    name: "sampleAcquisitionMethodCode",
    expectedApiResponse: {
      status: successCode,
      data: [
        { acquisitionMethodCode: "", acquisitionMethodCodeDescription: "" },
      ],
    },
    expectedDropdownOptions: {
      sampleAcquisitionMethodCode: dropdownOptions,
    },
    case: "sampleAcquisitionMethodCode",
    function: dmApi.getAllSystemDesignationCodes,
  },

  {
    name: "componentTypeCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ componentTypeCode: "", componentTypeCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      componentTypeCode: dropdownOptions,
    },
    case: "componentTypeCode",
    function: dmApi.getAllComponentTypeCodes,
  },

  {
    name: "basisCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ basisCode: "", basisCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      basisCode: dropdownOptions,
    },
    case: "basisCode",
    function: dmApi.getAllBasisCodes,
  },

  {
    name: "spanScaleCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ spanScaleCode: "", spanScaleCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      spanScaleCode: dropdownOptions,
    },
    case: "spanScaleCode",
    function: dmApi.getAllSpanScaleCodes,
  },

  {
    name: "spanMethodCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ spanMethodCode: "", spanMethodCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      spanMethodCode: dropdownOptions,
    },
    case: "spanMethodCode",
    function: dmApi.getAllSpanMethodCodes,
  },

  {
    name: "normalLevelCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ operatingLevelCode: "", operatingLevelCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      normalLevelCode: dropdownOptions,
    },
    case: "normalLevelCode",
    function: dmApi.getAllOperatingLevelCodes,
  },

  {
    name: "secondLevelCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ operatingLevelCode: "", operatingLevelCodeDescription: "" }],
    },
    expectedDropdownOptions: {
      secondLevelCode: dropdownOptions,
    },
    case: "secondLevelCode",
    function: dmApi.getAllOperatingLevelCodes,
  },
];

executeTests();
