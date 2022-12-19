import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../config";
import * as dataManagementApi from "./dataManagementApi";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

const mock = new MockAdapter(axios);

const dataManagementBaseUrl = config.services.mdm.uri;


describe("Test Data Management API calls", () => {
  
  beforeEach(() => {
    mock.resetHistory();
  });

  test("getAllControlTechnologies", async () => {
    const controlCodesObject = [
      { controlCodes: "data" },
    ];

    const controlCodesUrl = `${dataManagementBaseUrl}/control-codes`
    mock.onGet(controlCodesUrl).reply(200, controlCodesObject);

    const resp = await dataManagementApi.getAllControlTechnologies();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(controlCodesObject);
  })

  test("getAllFuelTypes", async () => {
    const fuelTypeCodesObject = [
      { fuelTypeCodes: "data" },
    ];

    const fuelTypeCodesUrl = `${dataManagementBaseUrl}/fuel-type-codes`
    mock.onGet(fuelTypeCodesUrl).reply(200, fuelTypeCodesObject);

    const resp = await dataManagementApi.getAllFuelTypes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(fuelTypeCodesObject);
  })
  
  test("getAllUnitTypes", async () => {
    const unitTypeCodesObject = [
      { unitTypeCodes: "data" },
    ];

    const unitTypeCodesUrl = `${dataManagementBaseUrl}/unit-type-codes`
    mock.onGet(unitTypeCodesUrl).reply(200, unitTypeCodesObject);

    const resp = await dataManagementApi.getAllUnitTypes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(unitTypeCodesObject);
  })
  
  test("getAllPrograms", async () => {
    const programCodesObject = [
      { programCodes: "data" },
    ];

    const programCodesUrl = `${dataManagementBaseUrl}/program-codes`
    mock.onGet(programCodesUrl).reply(200, programCodesObject);

    const resp = await dataManagementApi.getAllPrograms();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(programCodesObject);
  })
  
  test("getAllAccountTypes", async () => {
    const accountTypeCodesObject = [
      { accountTypeCodes: "data" },
    ];

    const accountTypeCodesUrl = `${dataManagementBaseUrl}/account-type-codes`
    mock.onGet(accountTypeCodesUrl).reply(200, accountTypeCodesObject);

    const resp = await dataManagementApi.getAllAccountTypes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(accountTypeCodesObject);
  })
  
  test("getAllStates", async () => {
    const stateCodesObject = [
      { stateCodes: "data" },
    ];

    const stateCodesUrl = `${dataManagementBaseUrl}/state-codes`
    mock.onGet(stateCodesUrl).reply(200, stateCodesObject);

    const resp = await dataManagementApi.getAllStates();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(stateCodesObject);
  })
  
  test("getAllBypassApproachCodes", async () => {
    const bypassApproachCodesObject = [
      { bypassApproachCodes: "data" },
    ];

    const bypassApproachCodesUrl = `${dataManagementBaseUrl}/bypass-approach-codes`
    mock.onGet(bypassApproachCodesUrl).reply(200, bypassApproachCodesObject);

    const resp = await dataManagementApi.getAllBypassApproachCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(bypassApproachCodesObject);
  })
  
  test("getAllSubstituteDataCodes", async () => {
    const substituteDataCodesObject = [
      { substituteDataCodes: "data" },
    ];

    const substituteDataCodesUrl = `${dataManagementBaseUrl}/substitute-data-codes`
    mock.onGet(substituteDataCodesUrl).reply(200, substituteDataCodesObject);

    const resp = await dataManagementApi.getAllSubstituteDataCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(substituteDataCodesObject);
  })
  
  test("getAllParameterCodes", async () => {
    const parameterCodesObject = [
      { parameterCodes: "data" },
    ];

    const parameterCodesUrl = `${dataManagementBaseUrl}/parameter-codes`
    mock.onGet(parameterCodesUrl).reply(200, parameterCodesObject);

    const resp = await dataManagementApi.getAllParameterCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(parameterCodesObject);
  })
  
  test("getAllMethodCodes", async () => {
    const methodCodesObject = [
      { methodCodes: "data" },
    ];

    const methodCodesUrl = `${dataManagementBaseUrl}/method-codes`
    mock.onGet(methodCodesUrl).reply(200, methodCodesObject);

    const resp = await dataManagementApi.getAllMethodCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(methodCodesObject);
  })
  
  test("getAllMatsParameterCodes", async () => {
    const matsMethodParameterCodesObject = [
      { matsMethodParameterCodes: "data" },
    ];

    const matsMethodParameterCodesUrl = `${dataManagementBaseUrl}/mats-method-parameter-codes`
    mock.onGet(matsMethodParameterCodesUrl).reply(200, matsMethodParameterCodesObject);

    const resp = await dataManagementApi.getAllMatsParameterCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(matsMethodParameterCodesObject);
  })
  
  test("getAllMatsMethodCodes", async () => {
    const matsMethodCodesObject = [
      { matsMethodCodes: "data" },
    ];

    const matsMethodCodesUrl = `${dataManagementBaseUrl}/mats-method-codes`
    mock.onGet(matsMethodCodesUrl).reply(200, matsMethodCodesObject);

    const resp = await dataManagementApi.getAllMatsMethodCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(matsMethodCodesObject);
  })
  
  test("getAllMaxRateSourceCodes", async () => {
    const maxRateSourceCodesObject = [
      { maxRateSourceCodes: "data" },
    ];

    const maxRateSourceCodesUrl = `${dataManagementBaseUrl}/max-rate-source-codes`
    mock.onGet(maxRateSourceCodesUrl).reply(200, maxRateSourceCodesObject);

    const resp = await dataManagementApi.getAllMaxRateSourceCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(maxRateSourceCodesObject);
  })
  
  test("getAllUnitsOfMeasureCodes", async () => {
    const unitsOfMeasureCodesObject = [
      { unitsOfMeasureCodes: "data" },
    ];

    const unitsOfMeasureCodesUrl = `${dataManagementBaseUrl}/units-of-measure-codes`
    mock.onGet(unitsOfMeasureCodesUrl).reply(200, unitsOfMeasureCodesObject);

    const resp = await dataManagementApi.getAllUnitsOfMeasureCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(unitsOfMeasureCodesObject);
  })
  
  test("getAllRangeCodes", async () => {
    const analyzerRangeCodesObject = [
      { analyzerRangeCodes: "data" },
    ];

    const analyzerRangeCodesUrl = `${dataManagementBaseUrl}/analyzer-range-codes`
    mock.onGet(analyzerRangeCodesUrl).reply(200, analyzerRangeCodesObject);

    const resp = await dataManagementApi.getAllRangeCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(analyzerRangeCodesObject);
  })
  
  test("getAllSystemTypeCodes", async () => {
    const systemTypeCodesObject = [
      { systemTypeCodes: "data" },
    ];

    const systemTypeCodesUrl = `${dataManagementBaseUrl}/system-type-codes`
    mock.onGet(systemTypeCodesUrl).reply(200, systemTypeCodesObject);

    const resp = await dataManagementApi.getAllSystemTypeCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(systemTypeCodesObject);
  })
  
  test("getAllSystemDesignationCodes", async () => {
    const systemDesignationCodesObject = [
      { systemDesignationCodes: "data" },
    ];

    const systemDesignationCodesUrl = `${dataManagementBaseUrl}/system-designation-codes`
    mock.onGet(systemDesignationCodesUrl).reply(200, systemDesignationCodesObject);

    const resp = await dataManagementApi.getAllSystemDesignationCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(systemDesignationCodesObject);
  })
  
  test("getAllAcquisitionMethodCodes", async () => {
    const acquisitionMethodCodesObject = [
      { acquisitionMethodCodes: "data" },
    ];

    const acquisitionMethodCodesUrl = `${dataManagementBaseUrl}/acquisition-method-codes`
    mock.onGet(acquisitionMethodCodesUrl).reply(200, acquisitionMethodCodesObject);

    const resp = await dataManagementApi.getAllAcquisitionMethodCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(acquisitionMethodCodesObject);
  })
  
  test("getAllComponentTypeCodes", async () => {
    const componentTypeCodesObject = [
      { componentTypeCodes: "data" },
    ];

    const componentTypeCodesUrl = `${dataManagementBaseUrl}/component-type-codes`
    mock.onGet(componentTypeCodesUrl).reply(200, componentTypeCodesObject);

    const resp = await dataManagementApi.getAllComponentTypeCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(componentTypeCodesObject);
  })
  
  test("getAllBasisCodes", async () => {
    const basisCodesObject = [
      { basisCodes: "data" },
    ];

    const basisCodesUrl = `${dataManagementBaseUrl}/basis-codes`
    mock.onGet(basisCodesUrl).reply(200, basisCodesObject);

    const resp = await dataManagementApi.getAllBasisCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(basisCodesObject);
  })
  
  test("getAllSpanMethodCodes", async () => {
    const spanMethodCodesObject = [
      { spanMethodCodes: "data" },
    ];

    const spanMethodCodesUrl = `${dataManagementBaseUrl}/span-method-codes`
    mock.onGet(spanMethodCodesUrl).reply(200, spanMethodCodesObject);

    const resp = await dataManagementApi.getAllSpanMethodCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(spanMethodCodesObject);
  })
  
  test("getAllSpanScaleCodes", async () => {
    const spanScaleCodesObject = [
      { spanScaleCodes: "data" },
    ];

    const spanScaleCodesUrl = `${dataManagementBaseUrl}/span-scale-codes`
    mock.onGet(spanScaleCodesUrl).reply(200, spanScaleCodesObject);

    const resp = await dataManagementApi.getAllSpanScaleCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(spanScaleCodesObject);
  })
  
  test("getAllOperatingLevelCodes", async () => {
    const operatingLevelCodesObject = [
      { operatingLevelCodes: "data" },
    ];

    const operatingLevelCodesUrl = `${dataManagementBaseUrl}/operating-level-codes`
    mock.onGet(operatingLevelCodesUrl).reply(200, operatingLevelCodesObject);

    const resp = await dataManagementApi.getAllOperatingLevelCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(operatingLevelCodesObject);
  })
  
  test("getAllOperatingConditionCodes", async () => {
    const operatingConditionCodesObject = [
      { operatingConditionCodes: "data" },
    ];

    const operatingConditionCodesUrl = `${dataManagementBaseUrl}/operating-condition-codes`
    mock.onGet(operatingConditionCodesUrl).reply(200, operatingConditionCodesObject);

    const resp = await dataManagementApi.getAllOperatingConditionCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(operatingConditionCodesObject);
  })
  
  test("getAllDefaultSourceCodes", async () => {
    const defaultSourceCodesObject = [
      { defaultSourceCodes: "data" },
    ];

    const defaultSourceCodesUrl = `${dataManagementBaseUrl}/default-source-codes`
    mock.onGet(defaultSourceCodesUrl).reply(200, defaultSourceCodesObject);

    const resp = await dataManagementApi.getAllDefaultSourceCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(defaultSourceCodesObject);
  })
  
  test("getAllDefaultPurposeCodes", async () => {
    const defaultPurposeCodesObject = [
      { defaultPurposeCodes: "data" },
    ];

    const defaultPurposeCodesUrl = `${dataManagementBaseUrl}/default-purpose-codes`
    mock.onGet(defaultPurposeCodesUrl).reply(200, defaultPurposeCodesObject);

    const resp = await dataManagementApi.getAllDefaultPurposeCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(defaultPurposeCodesObject);
  })
  
  test("getAllFuelCodes", async () => {
    const fuelCodesObject = [
      { fuelCodes: "data" },
    ];

    const fuelCodesUrl = `${dataManagementBaseUrl}/fuel-codes`
    mock.onGet(fuelCodesUrl).reply(200, fuelCodesObject);

    const resp = await dataManagementApi.getAllFuelCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(fuelCodesObject);
  })
  
  test("getAllFuelIndicatorCodes", async () => {
    const fuelIndicatorCodesObject = [
      { fuelIndicatorCodes: "data" },
    ];

    const fuelIndicatorCodesUrl = `${dataManagementBaseUrl}/fuel-indicator-codes`
    mock.onGet(fuelIndicatorCodesUrl).reply(200, fuelIndicatorCodesObject);

    const resp = await dataManagementApi.getAllFuelIndicatorCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(fuelIndicatorCodesObject);
  })
  
  test("getAllDemonstrationMethodCodes", async () => {
    const demonstrationMethodCodesObject = [
      { demonstrationMethodCodes: "data" },
    ];

    const demonstrationMethodCodesUrl = `${dataManagementBaseUrl}/demonstration-method-codes`
    mock.onGet(demonstrationMethodCodesUrl).reply(200, demonstrationMethodCodesObject);

    const resp = await dataManagementApi.getAllDemonstrationMethodCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(demonstrationMethodCodesObject);
  })
  
  test("getAllFormulaCodes", async () => {
    const formulaCodesObject = [
      { formulaCodes: "data" },
    ];

    const formulaCodesUrl = `${dataManagementBaseUrl}/equation-codes`
    mock.onGet(formulaCodesUrl).reply(200, formulaCodesObject);

    const resp = await dataManagementApi.getAllFormulaCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(formulaCodesObject);
  })
  
  test("getAllRectangularDuctsCodes", async () => {
    const rectangularDuctsCodesObject = [
      { rectangularDuctsCodes: "data" },
    ];

    const rectangularDuctsCodesUrl = `${dataManagementBaseUrl}/waf-method-codes`
    mock.onGet(rectangularDuctsCodesUrl).reply(200, rectangularDuctsCodesObject);

    const resp = await dataManagementApi.getAllRectangularDuctsCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(rectangularDuctsCodesObject);
  })
  
  test("getAllControlEquipmentParameterCodes", async () => {
    const controlEquipmentParameterCodesObject = [
      { controlEquipmentParameterCodes: "data" },
    ];

    const controlEquipmentParameterCodesUrl = `${dataManagementBaseUrl}/control-equip-param-codes`
    mock.onGet(controlEquipmentParameterCodesUrl).reply(200, controlEquipmentParameterCodesObject);

    const resp = await dataManagementApi.getAllControlEquipmentParameterCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(controlEquipmentParameterCodesObject);
  })
  
  test("getAllProbeTypeCodes", async () => {
    const probeTypeCodesObject = [
      { probeTypeCodes: "data" },
    ];

    const probeTypeCodesUrl = `${dataManagementBaseUrl}/probe-type-codes`
    mock.onGet(probeTypeCodesUrl).reply(200, probeTypeCodesObject);

    const resp = await dataManagementApi.getAllProbeTypeCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(probeTypeCodesObject);
  })
  
  test("getAllQualificationTypeCodes", async () => {
    const qualificationTypeCodesObject = [
      { qualificationTypeCodes: "data" },
    ];

    const qualificationTypeCodesUrl = `${dataManagementBaseUrl}/qualification-type-codes`
    mock.onGet(qualificationTypeCodesUrl).reply(200, qualificationTypeCodesObject);

    const resp = await dataManagementApi.getAllQualificationTypeCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(qualificationTypeCodesObject);
  })
  
  test("getAllQualificationDataTypeCodes", async () => {
    const qualificationDataTypeCodesObject = [
      { qualificationDataTypeCodes: "data" },
    ];

    const qualificationDataTypeCodesUrl = `${dataManagementBaseUrl}/qualification-data-type-codes`
    mock.onGet(qualificationDataTypeCodesUrl).reply(200, qualificationDataTypeCodesObject);

    const resp = await dataManagementApi.getAllQualificationDataTypeCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(qualificationDataTypeCodesObject);
  })
  
  test("getAllQualificationLEETestTypeCodes", async () => {
    const qualificationLEETestTypeCodesObject = [
      { qualificationLEETestTypeCodes: "data" },
    ];

    const qualificationLEETestTypeCodesUrl = `${dataManagementBaseUrl}/qualification-lee-test-type-codes`
    mock.onGet(qualificationLEETestTypeCodesUrl).reply(200, qualificationLEETestTypeCodesObject);

    const resp = await dataManagementApi.getAllQualificationLEETestTypeCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(qualificationLEETestTypeCodesObject);
  })
  
  test("getAllMaterialCodes", async () => {
    const materialCodesObject = [
      { materialCodes: "data" },
    ];

    const materialCodesUrl = `${dataManagementBaseUrl}/material-codes`
    mock.onGet(materialCodesUrl).reply(200, materialCodesObject);

    const resp = await dataManagementApi.getAllMaterialCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(materialCodesObject);
  })
  
  test("getAllShapeCodes", async () => {
    const shapeCodesObject = [
      { shapeCodes: "data" },
    ];

    const shapeCodesUrl = `${dataManagementBaseUrl}/shape-codes`
    mock.onGet(shapeCodesUrl).reply(200, shapeCodesObject);

    const resp = await dataManagementApi.getAllShapeCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(shapeCodesObject);
  })
  
  test("getPrefilteredFormulas", async () => {
    const prefilteredFormulasObject = [
      { prefilteredFormulas: "data" },
    ];

    const prefilteredFormulasUrl = `${dataManagementBaseUrl}/relationships/formulas`
    mock.onGet(prefilteredFormulasUrl).reply(200, prefilteredFormulasObject);

    const resp = await dataManagementApi.getPrefilteredFormulas();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(prefilteredFormulasObject);
  })
  
  test("getPrefilteredMethods", async () => {
    const prefilteredMethodsObject = [
      { prefilteredMethods: "data" },
    ];

    const prefilteredMethodsUrl = `${dataManagementBaseUrl}/relationships/methods`
    mock.onGet(prefilteredMethodsUrl).reply(200, prefilteredMethodsObject);

    const resp = await dataManagementApi.getPrefilteredMethods();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(prefilteredMethodsObject);
  })
  
  test("getPrefilteredMatsMethods", async () => {
    const prefilteredMatsMethodsObject = [
      { prefilteredMatsMethods: "data" },
    ];

    const prefilteredMatsMethodsUrl = `${dataManagementBaseUrl}/relationships/mats-methods`
    mock.onGet(prefilteredMatsMethodsUrl).reply(200, prefilteredMatsMethodsObject);

    const resp = await dataManagementApi.getPrefilteredMatsMethods();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(prefilteredMatsMethodsObject);
  })
  
  test("getPrefilteredSpans", async () => {
    const prefilteredSpansObject = [
      { prefilteredSpans: "data" },
    ];

    const prefilteredSpansUrl = `${dataManagementBaseUrl}/relationships/spans`
    mock.onGet(prefilteredSpansUrl).reply(200, prefilteredSpansObject);

    const resp = await dataManagementApi.getPrefilteredSpans();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(prefilteredSpansObject);
  })
  
  test("getPrefilteredDefaults", async () => {
    const prefilteredDefaultsObject = [
      { prefilteredDefaults: "data" },
    ];

    const prefilteredDefaultsUrl = `${dataManagementBaseUrl}/relationships/defaults`
    mock.onGet(prefilteredDefaultsUrl).reply(200, prefilteredDefaultsObject);

    const resp = await dataManagementApi.getPrefilteredDefaults();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(prefilteredDefaultsObject);
  })
  
  test("getPrefilteredLoads", async () => {
    const prefilteredLoadsObject = [
      { prefilteredLoads: "data" },
    ];

    const prefilteredLoadsUrl = `${dataManagementBaseUrl}/relationships/loads`
    mock.onGet(prefilteredLoadsUrl).reply(200, prefilteredLoadsObject);

    const resp = await dataManagementApi.getPrefilteredLoads();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(prefilteredLoadsObject);
  })
  
  test("prefilteredLEEQualifications", async () => {
    const prefilteredLEEQualificationsObject = [
      { prefilteredLEEQualifications: "data" },
    ];

    const prefilteredLEEQualificationsUrl = `${dataManagementBaseUrl}/relationships/lee-qualifications`
    mock.onGet(prefilteredLEEQualificationsUrl).reply(200, prefilteredLEEQualificationsObject);

    const resp = await dataManagementApi.prefilteredLEEQualifications();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(prefilteredLEEQualificationsObject);
  })
  
  test("getPrefilteredUnitFuels", async () => {
    const prefilteredUnitFuelsObject = [
      { prefilteredUnitFuels: "data" },
    ];

    const prefilteredUnitFuelsUrl = `${dataManagementBaseUrl}/relationships/unit-fuels`
    mock.onGet(prefilteredUnitFuelsUrl).reply(200, prefilteredUnitFuelsObject);

    const resp = await dataManagementApi.getPrefilteredUnitFuels();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(prefilteredUnitFuelsObject);
  })
  
  test("getPrefilteredUnitControls", async () => {
    const prefilteredUnitControlsObject = [
      { prefilteredUnitControls: "data" },
    ];

    const prefilteredUnitControlsUrl = `${dataManagementBaseUrl}/relationships/unit-controls`
    mock.onGet(prefilteredUnitControlsUrl).reply(200, prefilteredUnitControlsObject);

    const resp = await dataManagementApi.getPrefilteredUnitControls();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(prefilteredUnitControlsObject);
  })
  
  test("getPrefilteredSystemFuelFlows", async () => {
    const prefilteredSystemFuelFlowsObject = [
      { prefilteredSystemFuelFlows: "data" },
    ];

    const prefilteredSystemFuelFlowsUrl = `${dataManagementBaseUrl}/relationships/system-fuel-flows`
    mock.onGet(prefilteredSystemFuelFlowsUrl).reply(200, prefilteredSystemFuelFlowsObject);

    const resp = await dataManagementApi.getPrefilteredSystemFuelFlows();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(prefilteredSystemFuelFlowsObject);
  })
  
  test("getPrefilteredSystemComponents", async () => {
    const prefilteredSystemComponentsObject = [
      { prefilteredSystemComponents: "data" },
    ];

    const prefilteredSystemComponentsUrl = `${dataManagementBaseUrl}/relationships/system-components`
    mock.onGet(prefilteredSystemComponentsUrl).reply(200, prefilteredSystemComponentsObject);

    const resp = await dataManagementApi.getPrefilteredSystemComponents();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(prefilteredSystemComponentsObject);
  })
  
  test("getAllTestTypeCodes", async () => {
    const testTypeCodesObject = [
      { testTypeCodes: "data" },
    ];

    const testTypeCodesUrl = `${dataManagementBaseUrl}/test-type-codes`
    mock.onGet(testTypeCodesUrl).reply(200, testTypeCodesObject);

    const resp = await dataManagementApi.getAllTestTypeCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(testTypeCodesObject);
  })
  
  test("getAllTestResultCodes", async () => {
    const testResultCodesObject = [
      { testResultCodes: "data" },
    ];

    const testResultCodesUrl = `${dataManagementBaseUrl}/test-result-codes`
    mock.onGet(testResultCodesUrl).reply(200, testResultCodesObject);

    const resp = await dataManagementApi.getAllTestResultCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(testResultCodesObject);
  })
  
  test("getAllTestReasonCodes", async () => {
    const testReasonCodesObject = [
      { testReasonCodes: "data" },
    ];

    const testReasonCodesUrl = `${dataManagementBaseUrl}/test-reason-codes`
    mock.onGet(testReasonCodesUrl).reply(200, testReasonCodesObject);

    const resp = await dataManagementApi.getAllTestReasonCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(testReasonCodesObject);
  })
  
  test("getAllGasLevelCodes", async () => {
    const gasLevelCodesObject = [
      { gasLevelCodes: "data" },
    ];

    const gasLevelCodesUrl = `${dataManagementBaseUrl}/gas-level-codes`
    mock.onGet(gasLevelCodesUrl).reply(200, gasLevelCodesObject);

    const resp = await dataManagementApi.getAllGasLevelCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(gasLevelCodesObject);
  })
  
  test("getAllGasTypeCodes", async () => {
    const gasTypeCodesObject = [
      { gasTypeCodes: "data" },
    ];

    const gasTypeCodesUrl = `${dataManagementBaseUrl}/gas-type-codes`
    mock.onGet(gasTypeCodesUrl).reply(200, gasTypeCodesObject);

    const resp = await dataManagementApi.getAllGasTypeCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(gasTypeCodesObject);
  })
  
  test("getAllTestTypeGroupCodes", async () => {
    const testTypeGroupCodesObject = [
      { testTypeGroupCodes: "data" },
    ];

    const testTypeGroupCodesUrl = `${dataManagementBaseUrl}/test-type-group-codes`
    mock.onGet(testTypeGroupCodesUrl).reply(200, testTypeGroupCodesObject);

    const resp = await dataManagementApi.getAllTestTypeGroupCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(testTypeGroupCodesObject);
  })
  
  test("getPrefilteredTestSummaries", async () => {
    const prefilteredTestSummariesObject = [
      { prefilteredTestSummaries: "data" },
    ];

    const prefilteredTestSummariesUrl = `${dataManagementBaseUrl}/relationships/test-summaries`
    mock.onGet(prefilteredTestSummariesUrl).reply(200, prefilteredTestSummariesObject);

    const resp = await dataManagementApi.getPrefilteredTestSummaries();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(prefilteredTestSummariesObject);
  })
  
  test("getAllRataFreqCodes", async () => {
    const rataFreqCodesObject = [
      { rataFreqCodes: "data" },
    ];

    const rataFreqCodesUrl = `${dataManagementBaseUrl}/rata-frequency-codes`
    mock.onGet(rataFreqCodesUrl).reply(200, rataFreqCodesObject);

    const resp = await dataManagementApi.getAllRataFreqCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(rataFreqCodesObject);
  })
  
  test("getAllApsCodes", async () => {
    const apsCodesObject = [
      { apsCodes: "data" },
    ];

    const apsCodesUrl = `${dataManagementBaseUrl}/aps-codes`
    mock.onGet(apsCodesUrl).reply(200, apsCodesObject);

    const resp = await dataManagementApi.getAllApsCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(apsCodesObject);
  })
  
  test("getAllReferenceMethodCodes", async () => {
    const referenceMethodCodesObject = [
      { referenceMethodCodes: "data" },
    ];

    const referenceMethodCodesUrl = `${dataManagementBaseUrl}/reference-method-codes`
    mock.onGet(referenceMethodCodesUrl).reply(200, referenceMethodCodesObject);

    const resp = await dataManagementApi.getAllReferenceMethodCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(referenceMethodCodesObject);
  })
  
  test("getAllRunStatusCodes", async () => {
    const runStatusCodesObject = [
      { runStatusCodes: "data" },
    ];

    const runStatusCodesUrl = `${dataManagementBaseUrl}/run-status-codes`
    mock.onGet(runStatusCodesUrl).reply(200, runStatusCodesObject);

    const resp = await dataManagementApi.getAllRunStatusCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(runStatusCodesObject);
  })
  
  test("getAllPressureMeasureCodes", async () => {
    const pressureMeasureCodesObject = [
      { pressureMeasureCodes: "data" },
    ];

    const pressureMeasureCodesUrl = `${dataManagementBaseUrl}/pressure-measure-codes`
    mock.onGet(pressureMeasureCodesUrl).reply(200, pressureMeasureCodesObject);

    const resp = await dataManagementApi.getAllPressureMeasureCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(pressureMeasureCodesObject);
  })
  
  test("getAllMonitoringSystemIDCodes", async () => {
    const locationId = "locationId";
    const monitoringSystemObject1 = [
      { 
        monitoringSystemId: "1",
        systemTypeCode: "OILV",
      },
    ];
    const monitoringSystemObject2 = [
      {
        monitoringSystemIDCode: "1",
        monitoringSystemIDDescription: "OILV",
      }
    ];

    const monitoringSystemUrl = `https://api.epa.gov/easey/dev/monitor-plan-mgmt/locations/${locationId}/systems`
    mock.onGet(monitoringSystemUrl).reply(200, monitoringSystemObject1);

    const resp = await dataManagementApi.getAllMonitoringSystemIDCodes(locationId);

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(monitoringSystemObject2);
  })
  
  test("getMdmDataByCodeTable", async () => {
    const mdmDataByCodeTableObject = [
      { mdmDataByCodeTable: "data" },
    ];

    const mdmDataByCodeTableUrl = `${dataManagementBaseUrl}/test`
    mock.onGet(mdmDataByCodeTableUrl).reply(200, mdmDataByCodeTableObject);

    const resp = await dataManagementApi.getMdmDataByCodeTable("test");

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(mdmDataByCodeTableObject);
  })
  
  test("getAllAccuracyTestMethodCodes", async () => {
    const accuracyTestMethodCodesObject = [
      { accuracyTestMethodCodes: "data" },
    ];

    const accuracyTestMethodCodesUrl = `${dataManagementBaseUrl}/accuracy-test-method-codes`
    mock.onGet(accuracyTestMethodCodesUrl).reply(200, accuracyTestMethodCodesObject);

    const resp = await dataManagementApi.getAllAccuracyTestMethodCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(accuracyTestMethodCodesObject);
  })
  
  test("getAllAccuracySpecCodes", async () => {
    const accuracySpecCodesObject = [
      { accuracySpecCodes: "data" },
    ];

    const accuracySpecCodesUrl = `${dataManagementBaseUrl}/accuracy-spec-codes`
    mock.onGet(accuracySpecCodesUrl).reply(200, accuracySpecCodesObject);

    const resp = await dataManagementApi.getAllAccuracySpecCodes();

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(accuracySpecCodesObject);
  })
  
})