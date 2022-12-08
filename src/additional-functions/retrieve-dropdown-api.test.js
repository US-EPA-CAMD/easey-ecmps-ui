
import {
  UseRetrieveDropdownApi,
  dataYearOptions,
} from "./retrieve-dropdown-api";
import * as dmApi from "../utils/api/dataManagementApi";
import axios from "axios";
jest.mock("axios");

afterAll(() => {
  jest.restoreAllMocks();
});

const successCode = 201;

const addDataYears = () => {
  const currYear = new Date().getFullYear();
  const maxYear = currYear + 2;
  const minYear = 2000;
  let availableYears = [];

  for (let i = minYear; i <= maxYear; i++) {
    availableYears.push(i);
  }
  return availableYears;
};

const dataYears = addDataYears();

const dataYearDropdownOptions = dataYears.map((year) => {
  return {
    code: year.toString(),
    name: year.toString(),
  };
});

dataYearDropdownOptions.unshift({ code: "", name: "-- Select a value --" });

const dropdownOptions = [
  { code: "", name: "-- Select a value --" },
  { code: "", name: "" },
];

const prefilterReturnedArray = [{ shapeCode: "", shapeDescription: "" }];

beforeAll(() => {
  jest.clearAllMocks();
});

// Iterates through the testObjects array to test all of the cases in the switch statement
const executeTests = () => {
  testObjects.forEach((testObject) => {
    // execute test with parameters from current test object
    test(`testing ${testObject.name}`, async () => {
      // Testing prefilter dropdowns
      if (testObject.dynamicPrefilterDropdown) {
        const prefilterResponse = await testObject.function();
        const viewData = prefilterResponse.data;
        expect(viewData).toEqual(prefilterReturnedArray);

        await UseRetrieveDropdownApi(
          [testObject.case],
          testObject.mats ? testObject.mats : false
        ).then((dropdownOptions) => {
          expect(dropdownOptions).toHaveProperty(testObject.case);
        });
      } else if (testObject.staticPrefilterDropdown) {
        await UseRetrieveDropdownApi(
          [testObject.case],
          testObject.mats ? testObject.mats : false
        ).then((dropdownOptions) => {
          expect(dropdownOptions).toHaveProperty(testObject.case);
        });
      }

      // Testing...
      else {
        axios.get.mockImplementation(() =>
          Promise.resolve(testObject.expectedApiResponse)
        );
        const apiResponse = await testObject.function();

        // ... Normal dropdowns
        if (!testObject.yearDropdown) {
          expect(apiResponse.data).toEqual(testObject.expectedApiResponse.data);
        }

        // ... Data year dropdowns
        else {
          expect(apiResponse).toEqual(testObject.expectedApiResponse.data);
        }

       await  UseRetrieveDropdownApi(
          [testObject.case],
          testObject.mats ? testObject.mats : false
        ).then((dropdownOptions) => {
          expect(dropdownOptions).toEqual(testObject.expectedDropdownOptions);
        });
      }
    });
  });
};


// After adding a new case in retrieve-dropdown-api.js, all you need to do is add a new test object following the current structure:
//    - name:                           this text appears when you run the test
//    - expectedApiResponse:            mock response with the properties that will be returned
//    - expectedDropdownOptions:        options object containing name of the field in the UI
//    - case:                           the fieldName used in the switch statement in retrieve-dropdown-api.js
//    - mats:                           MATS flag set to true (optional)
//    - function:                       function called in dataManagementApi.js
//    - yearDropdown:                   flag to indicate a data year dropdown
//    - dynamicPrefilterDropdown:       flag to indicate a dynamic prefilter dropdown
//    - staticPrefilterDropdown:        flag to indicate a dynamic prefilter dropdown
const testObjects = [
  {
    name: "parameter Code for non-MATS",
    expectedApiResponse: {
      status: successCode,
      data: [{ parameterCode: "", parameterDescription: "" }],
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
      data: [{ matsMethodParameterCode: "", matsMethodParameterDescription: "" }],
    },
    expectedDropdownOptions: {
      supplementalMATSParameterCode: dropdownOptions,
    },
    case: "parameterCode",
    mats: true,
    function: dmApi.getAllMatsParameterCodes,
  },
  // {
  //   name: "controlEquipParamCode",
  //   expectedApiResponse: {
  //     status: successCode,
  //     data: [{ controlEquipParamCode: "", controlEquipParamDescription: "" }],
  //   },
  //   expectedDropdownOptions: {
  //     controlEquipParamCode: dropdownOptions,
  //   },
  //   case: "controlEquipParamCode",
  //   function: dmApi.getAllControlEquipmentParameterCodes,
  // },

  {
    name: "monitoringMethodCode for non-MATS",
    expectedApiResponse: {
      status: successCode,
      data: [{ methodCode: "", methodDescription: "" }],
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
      data: [{ matsMethodCode: "", matsMethodDescription: "" }],
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
      data: [{ substituteDataCode: "", substituteDataDescription: "" }],
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
      data: [{ bypassApproachCode: "", bypassApproachDescription: "" }],
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
      data: [{ analyzerRangeCode: "", analyzerRangeDescription: "" }],
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
      data: [{ mMaxRateSourceCode: "", maxRateSourceDescription: "" }],
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
      data: [{ unitOfMeasureCode: "", unitOfMeasureDescription: "" }],
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
      data: [{ unitOfMeasureCode: "", unitOfMeasureDescription: "" }],
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
      data: [{ unitOfMeasureCode: "", unitOfMeasureDescription: "" }],
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
      data: [{ unitOfMeasureCode: "", unitOfMeasureDescription: "" }],
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
      data: [{ unitOfMeasureCode: "", unitOfMeasureDescription: "" }],
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
      data: [{ fuelCode: "", fuelDescription: "" }],
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
      data: [{ fuelIndicatorCode: "", fuelIndicatorDescription: "" }],
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
      data: [{ demonstrationMethodCode: "", demonstrationMethodDescription: "" }],
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
      data: [{ demonstrationMethodCode: "", demonstrationMethodDescription: "" }],
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
      data: [{ systemTypeCode: "", systemTypeDescription: "" }],
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
        { systemDesignationCode: "", systemDesignationDescription: "" },
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
        { acquisitionMethodCode: "", acquisitionMethodDescription: "" },
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
      data: [{ componentTypeCode: "", componentTypeDescription: "" }],
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
      data: [{ basisCode: "", basisDescription: "" }],
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
      data: [{ spanScaleCode: "", spanScaleDescription: "" }],
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
      data: [{ spanMethodCode: "", spanMethodDescription: "" }],
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
      data: [{ opLevelCode: "", opLevelDescription: "" }],
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
      data: [{ opLevelCode: "", opLevelDescription: "" }],
    },
    expectedDropdownOptions: {
      secondLevelCode: dropdownOptions,
    },
    case: "secondLevelCode",
    function: dmApi.getAllOperatingLevelCodes,
  },

  {
    name: "operatingConditionCode",
    expectedApiResponse: {
      status: successCode,
      data: [
        { operatingConditionCode: "", operatingConditionDescription: "" },
      ],
    },
    expectedDropdownOptions: {
      operatingConditionCode: dropdownOptions,
    },
    case: "operatingConditionCode",
    function: dmApi.getAllOperatingConditionCodes,
  },

  {
    name: "defaultSourceCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ defaultSourceCode: "", defaultSourceDescription: "" }],
    },
    expectedDropdownOptions: {
      defaultSourceCode: dropdownOptions,
    },
    case: "defaultSourceCode",
    function: dmApi.getAllDefaultSourceCodes,
  },

  {
    name: "defaultPurposeCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ defaultPurposeCode: "", defaultPurposeDescription: "" }],
    },
    expectedDropdownOptions: {
      defaultPurposeCode: dropdownOptions,
    },
    case: "defaultPurposeCode",
    function: dmApi.getAllDefaultPurposeCodes,
  },

  {
    name: "formulaCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ equationCode: "", equationDescription: "" }],
    },
    expectedDropdownOptions: {
      formulaCode: dropdownOptions,
    },
    case: "formulaCode",
    function: dmApi.getAllFormulaCodes,
  },

  {
    name: "wafMethodCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ wafMethodCode: "", wafMethodDescription: "" }],
    },
    expectedDropdownOptions: {
      wafMethodCode: dropdownOptions,
    },
    case: "wafMethodCode",
    function: dmApi.getAllRectangularDuctsCodes,
  },

  {
    name: "controlCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ controlCode: "", controlDescription: "" }],
    },
    expectedDropdownOptions: {
      controlCode: dropdownOptions,
    },
    case: "controlCode",
    function: dmApi.getAllControlTechnologies,
  },

  {
    name: "qualificationTypeCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ qualificationTypeCode: "", qualificationTypeDescription: "" }],
    },
    expectedDropdownOptions: {
      qualificationTypeCode: dropdownOptions,
    },
    case: "qualificationTypeCode",
    function: dmApi.getAllQualificationTypeCodes,
  },

  {
    name: "qualificationYear",
    expectedApiResponse: {
      status: successCode,
      data: dataYears,
    },
    expectedDropdownOptions: {
      qualificationYear: dataYearDropdownOptions,
    },
    case: "qualificationYear",
    function: dataYearOptions,
    yearDropdown: true,
  },

  {
    name: "yr1QualificationDataYear",
    expectedApiResponse: {
      status: successCode,
      data: dataYears,
    },
    expectedDropdownOptions: {
      yr1QualificationDataYear: dataYearDropdownOptions,
    },
    case: "yr1QualificationDataYear",
    function: dataYearOptions,
    yearDropdown: true,
  },

  {
    name: "yr2QualificationDataYear",
    expectedApiResponse: {
      status: successCode,
      data: dataYears,
    },
    expectedDropdownOptions: {
      yr2QualificationDataYear: dataYearDropdownOptions,
    },
    case: "yr2QualificationDataYear",
    function: dataYearOptions,
    yearDropdown: true,
  },

  {
    name: "yr3QualificationDataYear",
    expectedApiResponse: {
      status: successCode,
      data: dataYears,
    },
    expectedDropdownOptions: {
      yr3QualificationDataYear: dataYearDropdownOptions,
    },
    case: "yr3QualificationDataYear",
    function: dataYearOptions,
    yearDropdown: true,
  },

  {
    name: "qualificationDataYear",
    expectedApiResponse: {
      status: successCode,
      data: dataYears,
    },
    expectedDropdownOptions: {
      qualificationDataYear: dataYearDropdownOptions,
    },
    case: "qualificationDataYear",
    function: dataYearOptions,
    yearDropdown: true,
  },

  {
    name: "yr1QualificationDataTypeCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ qualificationDataTypeCode: "", qualificationDataTypeDescription: "" }],
    },
    expectedDropdownOptions: {
      yr1QualificationDataTypeCode: dropdownOptions,
    },
    case: "yr1QualificationDataTypeCode",
    function: dmApi.getAllQualificationDataTypeCodes,
  },

  {
    name: "yr2QualificationDataTypeCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ qualificationDataTypeCode: "", qualificationDataTypeDescription: "" }],
    },
    expectedDropdownOptions: {
      yr2QualificationDataTypeCode: dropdownOptions,
    },
    case: "yr2QualificationDataTypeCode",
    function: dmApi.getAllQualificationDataTypeCodes,
  },

  {
    name: "yr3QualificationDataTypeCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ qualificationDataTypeCode: "", qualificationDataTypeDescription: "" }],
    },
    expectedDropdownOptions: {
      yr3QualificationDataTypeCode: dropdownOptions,
    },
    case: "yr3QualificationDataTypeCode",
    function: dmApi.getAllQualificationDataTypeCodes,
  },

  {
    name: "qualificationTestType",
    expectedApiResponse: {
      status: successCode,
      data: [{ qualifiationLEETestTypeCode: "", qualifiationLEETestTypeDescription: "" }],
    },
    expectedDropdownOptions: {
      qualificationTestType: dropdownOptions,
    },
    case: "qualificationTestType",
    function: dmApi.getAllQualificationLEETestTypeCodes,
  },

  {
    name: "materialCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ materialCode: "", materialDescription: "" }],
    },
    expectedDropdownOptions: {
      materialCode: dropdownOptions,
    },
    case: "materialCode",
    function: dmApi.getAllMaterialCodes,
  },

  {
    name: "shapeCode",
    expectedApiResponse: {
      status: successCode,
      data: [{ shapeCode: "", shapeDescription: "" }],
    },
    expectedDropdownOptions: {
      shapeCode: dropdownOptions,
    },
    case: "shapeCode",
    function: dmApi.getAllShapeCodes,
  },

  {
    name: "prefilteredMatsMethods",
    case: "prefilteredMatsMethods",
    function: dmApi.getPrefilteredMatsMethods,
    dynamicPrefilterDropdown: true,
  },

  {
    name: "prefilteredMethods",
    case: "prefilteredMethods",
    function: dmApi.getPrefilteredMethods,
    dynamicPrefilterDropdown: true,
  },

  {
    name: "prefilteredFormulas",
    case: "prefilteredFormulas",
    function: dmApi.getPrefilteredFormulas,
    dynamicPrefilterDropdown: true,
  },

  {
    name: "prefilteredSpans",
    case: "prefilteredSpans",
    function: dmApi.getPrefilteredSpans,
    dynamicPrefilterDropdown: true,
  },

  {
    name: "prefilteredDefaults",
    case: "prefilteredDefaults",
    function: dmApi.getPrefilteredDefaults,
    dynamicPrefilterDropdown: true,
  },

  {
    name: "prefilteredLoads",
    case: "prefilteredLoads",
    function: dmApi.getPrefilteredLoads,
    staticPrefilterDropdown: true,
  },

  {
    name: "prefilteredUnitFuels",
    case: "prefilteredUnitFuels",
    function: dmApi.getPrefilteredUnitFuels,
    staticPrefilterDropdown: true,
  },

  {
    name: "prefilteredLEEQualifications",
    case: "prefilteredLEEQualifications",
    function: dmApi.prefilteredLEEQualifications,
    staticPrefilterDropdown: true,
  },

  {
    name: "prefilteredUnitControls",
    case: "prefilteredUnitControls",
    function: dmApi.getPrefilteredUnitControls,
    dynamicPrefilterDropdown: true,
  },  {
    name: "prefilteredLEEQualifications",
    case: "prefilteredLEEQualifications",
    function: dmApi.getPrefilteredUnitControls,
    dynamicPrefilterDropdown: true,
  },  {
    name: "prefilteredSystemFuelFlows",
    case: "prefilteredSystemFuelFlows",
    function: dmApi.getPrefilteredUnitControls,
    dynamicPrefilterDropdown: true,
  },  {
    name: "prefilteredSystemsComponents",
    case: "prefilteredSystemsComponents",
    function: dmApi.getPrefilteredUnitControls,
    dynamicPrefilterDropdown: true,
  },
];

executeTests();
