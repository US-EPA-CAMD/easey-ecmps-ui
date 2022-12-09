import * as fs from "./TestSummary";

describe("testing TestSummary data selectors", () => {
  let selectedData;
  let tableRecords;

  test("getTestSummary", () => {
    const cols = [
      "Test Type Code",
      "Unit or Stack Pipe ID",
      "Component ID",
      "Test Number",
      "Test Reason Code",
      "Test Result Code",
      "End Date",
      "End Hour",
      "End Minute",
    ];
    const data = [
      {
        id: "3ee84634-7dc4-45c8-8eee-ca79e699893a",
        locationId: "1873",
        stackPipeId: null,
        unitId: "51",
        testTypeCode: "LINE",

        componentID: null,

        testNumber: "412343",
        testReasonCode: "DIAG",
        testDescription: null,
        testResultCode: "ABORTED",
        endDate: "2022-10-01",
        endHour: 2,
        endMinute: 2,
      },
      {
        id: "3ee84634-7dc4-45c8-8eee-ca79e699893a",
        locationId: "1873",
        stackPipeId: "51",
        unitId: null,
        testTypeCode: "LINE",

        componentID: null,

        testNumber: "412343",
        testReasonCode: "DIAG",
        testDescription: null,
        testResultCode: "ABORTED",
        endDate: "2022-10-01",
        endHour: 2,
        endMinute: 2,
      },
      {
        id: "3ee84634-7dc4-45c8-8eee-ca79e699893a",
        locationId: "1873",
        stackPipeId: "",
        unitId: null,
        testTypeCode: "LINE",

        componentID: null,

        testNumber: "412343",
        testReasonCode: "DIAG",
        testDescription: null,
        testResultCode: "ABORTED",
        endDate: null,
        endHour: null,
        endMinute: null,
      },
    ];
    const records = [
      {
        col1: "LINE",
        col2: "51",
        col3: null,
        col4: "412343",
        col5: "DIAG",
        col6: "ABORTED",
        col7: "10/01/2022",
        col8: "2",
        col9: "2",
        id: "3ee84634-7dc4-45c8-8eee-ca79e699893a",
        locationId: "1873",
      },
      {
        col1: "LINE",
        col2: "51",
        col3: null,
        col4: "412343",
        col5: "DIAG",
        col6: "ABORTED",
        col7: "10/01/2022",
        col8: "2",
        col9: "2",
        id: "3ee84634-7dc4-45c8-8eee-ca79e699893a",
        locationId: "1873",
      },
      {
        col1: "LINE",
        col2: "",
        col3: null,
        col4: "412343",
        col5: "DIAG",
        col6: "ABORTED",
        col7: "",
        col8: "",
        col9: "",
        id: "3ee84634-7dc4-45c8-8eee-ca79e699893a",
        locationId: "1873",
      },
    ];
    expect(fs.getTestSummary(data, cols)).toEqual(records);
  });

  test("getLinearitySummaryRecords", () => {
    const data = [
      {
        id: "f8af3354-f8ba-42c4-a88d-9361c47cabdf",
        testSumId: "3ee84634-7dc4-45c8-8eee-ca79e699893a",
        gasLevelCode: "HIGH",
        meanMeasuredValue: 1,
        calculatedMeanMeasuredValue: null,
        meanReferenceValue: 1,
        calculatedMeanReferenceValue: null,
        percentError: 1,
        calculatedPercentError: null,
        apsIndicator: 0,
        calculatedAPSIndicator: null,
        linearityInjectionData: [],
      },
      {
        id: "f8af3354-f8ba-42c4-a88d-9361c47cabdf",
        testSumId: "3ee84634-7dc4-45c8-8eee-ca79e699893a",
        gasLevelCode: "HIGH",
        meanMeasuredValue: 1,
        calculatedMeanMeasuredValue: null,
        meanReferenceValue: 1,
        calculatedMeanReferenceValue: null,
        percentError: 1,
        calculatedPercentError: null,
        apsIndicator: 1,
        calculatedAPSIndicator: null,
        linearityInjectionData: [],
      },
    ];
    const records = [
      {
        col1: "HIGH",
        col2: 1,
        col3: 1,
        col4: 1,
        col5: "No",
        id: "f8af3354-f8ba-42c4-a88d-9361c47cabdf",
        testSumId: "3ee84634-7dc4-45c8-8eee-ca79e699893a",
      },
      {
        col1: "HIGH",
        col2: 1,
        col3: 1,
        col4: 1,
        col5: "Yes",
        id: "f8af3354-f8ba-42c4-a88d-9361c47cabdf",
        testSumId: "3ee84634-7dc4-45c8-8eee-ca79e699893a",
      },
    ];
    expect(fs.getLinearitySummaryRecords(data)).toEqual(records);
  });

  test("getProtocolGasRecords", () => {
    const data = [
      {
        id: "a2a7f0ea-53af-46fd-8f1e-ca922b069aa5",
        testSumId: "3ee84634-7dc4-45c8-8eee-ca79e699893a",
        gasLevelCode: "HIGH",
        gasTypeCode: "ZERO",
        vendorID: "Ven",
        cylinderID: "Cy",
        expirationDate: "2022-10-01",
        userId: "mddee-dp",
        addDate: "2022-10-19T00:00:00.000Z",
        updateDate: "2022-10-19T00:00:00.000Z",
      },
      {
        id: "a2a7f0ea-53af-46fd-8f1e-ca922b069aa5",
        testSumId: "3ee84634-7dc4-45c8-8eee-ca79e699893a",
        gasLevelCode: "HIGH",
        gasTypeCode: "ZERO",
        vendorID: "Ven",
        cylinderID: "Cy",
        expirationDate: null,
        userId: "mddee-dp",
        addDate: "2022-10-19T00:00:00.000Z",
        updateDate: "2022-10-19T00:00:00.000Z",
      },
    ];
    const records = [
      {
        col1: "HIGH",
        col2: "ZERO",
        col3: "Cy",
        col4: "Ven",
        col5: "10/01/2022",
        id: "a2a7f0ea-53af-46fd-8f1e-ca922b069aa5",
        testSumId: "3ee84634-7dc4-45c8-8eee-ca79e699893a",
      },
      {
        col1: "HIGH",
        col2: "ZERO",
        col3: "Cy",
        col4: "Ven",
        col5: "",
        id: "a2a7f0ea-53af-46fd-8f1e-ca922b069aa5",
        testSumId: "3ee84634-7dc4-45c8-8eee-ca79e699893a",
      },
    ];
    expect(fs.getProtocolGasRecords(data)).toEqual(records);
  });

  test("mapTestQualificationToRows", () => {
    const data = [
      {
        id: "2b2adedb-24eb-4325-8ad4-37c342f67a37",
        testSumId: "325f65f7-b056-4b74-97d7-0040a1b44dbd",
        testClaimCode: "NLE",
        beginDate: "2022-10-01",
        endDate: "2022-10-01",
        highLoadPercentage: 3,
        midLoadPercentage: 3,
        lowLoadPercentage: 3,
      },
    ];
    const records = [
      {
        col1: "NLE",
        col2: "10/01/2022",
        col3: "10/01/2022",
        col4: 3,
        col5: 3,
        col6: 3,
        id: "2b2adedb-24eb-4325-8ad4-37c342f67a37",
        testSumId: "325f65f7-b056-4b74-97d7-0040a1b44dbd",
      },
    ];
    expect(fs.mapTestQualificationToRows(data)).toEqual(records);
  });
  test("getEmptyRows", () => {
    const data = [
      {
        name: "QI Last Name",
        selector: "col1",
        sortable: true,
        wrap: true,
        width: "15%",
        style: {
          justifyContent: "left",
        },
      },
      {
        name: "QI First Name",
        selector: "col2",
        sortable: true,
        wrap: true,
        width: "15%",
        style: {
          justifyContent: "left",
        },
      },
    ];
    const records = [
      {
        col1: "",
        col2: "",
      },
    ];
    expect(fs.getEmptyRows(data)).toEqual(records);
  });
  test("mapRataSummaryToRows", () => {
    const data = [
      {
        id: "c2b71699-bdcb-47a6-832e-9fea2fd068a1",
        rataId: "TWCORNEL5-B1523F032896481898FFEC62FADD6196",
        operatingLevelCode: "H",
        averageGrossUnitLoad: 1,
        calculatedAverageGrossUnitLoad: null,
        referenceMethodCode: "20",
        meanCEMValue: 1,
        calculatedMeanCEMValue: null,
        meanRATAReferenceValue: 1,
        calculatedMeanRATAReferenceValue: null,
        meanDifference: 1,
        calculatedMeanDifference: null,
        standardDeviationDifference: 1,
        calculatedStandardDeviationDifference: null,
        confidenceCoefficient: 1,
        calculatedConfidenceCoefficient: null,
        tValue: 1,
        calculatedTValue: null,
        apsIndicator: 0,
        calculatedApsIndicator: null,
        apsCode: "PS18",
        relativeAccuracy: 1,
        calculatedRelativeAccuracy: null,
        biasAdjustmentFactor: 1,
        calculatedBiasAdjustmentFactor: null,
        co2OrO2ReferenceMethodCode: "20",
        stackDiameter: 1,
        stackArea: 1,
        calculatedStackArea: null,
        numberOfTraversePoints: 1,
        calculatedWAF: 1,
        calculatedCalculatedWAF: null,
        defaultWAF: 0,
      },
      {
        id: "c2b71699-bdcb-47a6-832e-9fea2fd068a1",
        rataId: "TWCORNEL5-B1523F032896481898FFEC62FADD6196",
        operatingLevelCode: "H",
        averageGrossUnitLoad: 1,
        calculatedAverageGrossUnitLoad: null,
        referenceMethodCode: "20",
        meanCEMValue: 1,
        calculatedMeanCEMValue: null,
        meanRATAReferenceValue: 1,
        calculatedMeanRATAReferenceValue: null,
        meanDifference: 1,
        calculatedMeanDifference: null,
        standardDeviationDifference: 1,
        calculatedStandardDeviationDifference: null,
        confidenceCoefficient: 1,
        calculatedConfidenceCoefficient: null,
        tValue: 1,
        calculatedTValue: null,
        apsIndicator: 1,
        calculatedApsIndicator: null,
        apsCode: "PS18",
        relativeAccuracy: 1,
        calculatedRelativeAccuracy: null,
        biasAdjustmentFactor: 1,
        calculatedBiasAdjustmentFactor: null,
        co2OrO2ReferenceMethodCode: "20",
        stackDiameter: 1,
        stackArea: 1,
        calculatedStackArea: null,
        numberOfTraversePoints: 1,
        calculatedWAF: 1,
        calculatedCalculatedWAF: null,
        defaultWAF: 0,
      },
    ];
    const records = [
      {
        col1: "H",
        col2: "20",
        col3: "No",
        col4: "PS18",
        col5: 1,
        col6: "20",
        id: "c2b71699-bdcb-47a6-832e-9fea2fd068a1",
        rataId: "TWCORNEL5-B1523F032896481898FFEC62FADD6196",
      },
      {
        col1: "H",
        col2: "20",
        col3: "Yes",
        col4: "PS18",
        col5: 1,
        col6: "20",
        id: "c2b71699-bdcb-47a6-832e-9fea2fd068a1",
        rataId: "TWCORNEL5-B1523F032896481898FFEC62FADD6196",
      },
    ];
    expect(fs.mapRataSummaryToRows(data)).toEqual(records);
  });
  test("mapAppendixECorrHeatInputOilToRows", () => {
    const data = [
      {
        id: "0000120",
        monitoringSystemID: '100',
        oilMass: 1,
        oilGCV: 1,
        oilGCVUnitsOfMeasureCode: 'BTUBBL',
        oilHeatInput: 1,
        oilVolume: 1,
        oilVolumeUnitsOfMeasureCode: 'BBL',
        oilDensity: 1,
        oilDensityUnitsOfMeasureCode: 'LBBBL',
      },
    ];
    const records = [
      {
        id: '0000120',
        col1: '100',
        col2: 1,
        col3: 1,
        col4: 'BTUBBL',
        col5: 1,
        col6: 1,
        col7: 'BBL',
        col8: 1,
        col9: 'LBBBL',
      },
    ];
    expect(fs.mapAppendixECorrHeatInputOilToRows(data)).toEqual(records);
  });
  test("mapFuelFlowmeterAccuracyDataToRows", () => {
    const data = [
      {
        id: "0000120",
        accuracyTestMethodCode: 'API',
        lowFuelAccuracy: 1,
        midFuelAccuracy: 1,
        highFuelAccuracy: 1,
        reinstallationDate: "2022-10-01",
        reinstallationHour: 1,
      },
    ];
    const records = [
      {
        id: '0000120',
        col1: 'API',
        col2: 1,
        col3: 1,
        col4: 1,
        col5: "2022-10-01",
        col6: 1,
      },
    ];
    expect(fs.mapFuelFlowmeterAccuracyDataToRows(data)).toEqual(records);
  });
  test("mapTransmitterTransducerAccuracyDataToRows", () => {
    const data = [
      {
        id: "0000120",
        lowLevelAccuracy: 1,
        lowLevelAccuracySpecCode: "ACT",
        midLevelAccuracy: 1,
        midLevelAccuracySpecCode: "ACT",
        highLevelAccuracy: 1,
        highLevelAccuracySpecCode: "ACT",
      },
    ];
    const records = [
      {
        id: '0000120',
        col1: 1,
        col2: "ACT",
        col3: 1,
        col4: "ACT",
        col5: 1,
        col6: "ACT",
      },
    ];
    expect(fs.mapTransmitterTransducerAccuracyDataToRows(data)).toEqual(records);
  });
});
