import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../../config";
import * as qaAssert from "./assert";
import * as qaApi from "../../api/qaCertificationsAPI";

import { secureAxios } from "../../api/easeyAuthApi";

const mock = new MockAdapter(axios);

const qaCertBaseUrl = `${config.services.qaCertification.uri}`;
const id = "id";
const locId = "locId";
const testSumId = "testSumId";
const appECorrTestSumId = "appECorrTestSumId";
const appECorrTestRunId = "appECorrTestRunId";
const linSumId = "linSumId";
const hgTestSumId = "hgTestSumId";
const proGas = "Protocol Gas";
const lineTest = "Linearity Test";
const testQualification = "Test Qualification";
const appendixECorrHeatInputOil = "Appendix E Correlation Heat Input from Oil";
const fuelFlowmeterAccuracyData = "Fuel Flowmeter Accuracy Data";
const cycleTimeSummary = "Cycle Time Summary";
const transmitterTransducerAccuracyData =
  "Transmitter Transducer Accuracy Data";
const flowToLoadCheck = "Flow To Load Check";
const lineInjection = "Linearity Injection";
const rataData = "RATA Data";
const airEmissions = "Air Emissions";
const unitDefualtTest = "Unit Default Test";
const hgSummary = "Hg Summary";
const hgInjection = "Hg Injection";

jest.mock("../../api/easeyAuthApi");
secureAxios.mockImplementation((options) => axios(options));

describe("Test Qualification CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getTestQualification", async () => {
    const mockGetTestQualification = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "getTestQualification")
      .mockImplementation(mockGetTestQualification);
    const extraIDs = [locId, testSumId];
    await qaAssert.getDataTableApis(
      testQualification,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockGetTestQualification).toHaveBeenCalledTimes(1);
  });

  test("createTestQualification", async () => {
    const mockCreateTestQualification = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "createTestQualification")
      .mockImplementation(mockCreateTestQualification);
    const extraIDs = [locId, testSumId];
    await qaAssert.createDataSwitch(
      {},
      testQualification,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockCreateTestQualification).toHaveBeenCalledTimes(1);
  });

  test("updateTestQualification", async () => {
    const mockUpdateTestQualification = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "updateTestQualification")
      .mockImplementation(mockUpdateTestQualification);
    const extraIDs = [locId, testSumId];
    await qaAssert.saveDataSwitch(
      {},
      testQualification,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockUpdateTestQualification).toHaveBeenCalledTimes(1);
  });

  test("deleteTestQualification", async () => {
    const mockDeleteTestQualification = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "deleteTestQualification")
      .mockImplementation(mockDeleteTestQualification);
    const extraIDs = [locId, testSumId];
    await qaAssert.removeDataSwitch(
      {},
      testQualification,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockDeleteTestQualification).toHaveBeenCalledTimes(1);
  });
});

describe("Appendix E Correlation Heat Input from Oil CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });

  test("getAppendixEHeatInputOilData", async () => {
    const mockGetAppendixEHeatInputOil = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "getAppendixEHeatInputOilData")
      .mockImplementation(mockGetAppendixEHeatInputOil);
    const extraIDs = [locId, testSumId, appECorrTestSumId];
    await qaAssert.getDataTableApis(
      appendixECorrHeatInputOil,
      locId,
      appECorrTestRunId,
      extraIDs
    );
    expect(mockGetAppendixEHeatInputOil).toHaveBeenCalledTimes(1);
  });

  test("createAppendixEHeatInputOil", async () => {
    const payload = { appendixECorrelationHeatInputOil: "data" };
    const mockCreateAppendixEHeatInputOil = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "createAppendixEHeatInputOil")
      .mockImplementation(mockCreateAppendixEHeatInputOil);
    const extraIDs = [locId, testSumId, appECorrTestSumId];
    await qaAssert.createDataSwitch(
      payload,
      appendixECorrHeatInputOil,
      locId,
      appECorrTestRunId,
      extraIDs
    );
    expect(mockCreateAppendixEHeatInputOil).toHaveBeenCalledTimes(1);
  });

  test("updateAppendixECorrelationHeatInputOil", async () => {
    const payload = { id: id, appendixECorrelationHeatInputOil: "data" };
    const mockUpdateAppendixEHeatInputOil = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "updateAppendixECorrelationHeatInputOil")
      .mockImplementation(mockUpdateAppendixEHeatInputOil);
    const extraIDs = [locId, testSumId, appECorrTestSumId];
    await qaAssert.saveDataSwitch(
      payload,
      appendixECorrHeatInputOil,
      locId,
      appECorrTestRunId,
      extraIDs
    );
    expect(mockUpdateAppendixEHeatInputOil).toHaveBeenCalledTimes(1);
  });

  test("deleteAppendixECorrelationHeatInputOil", async () => {
    const payload = { id: id };
    const mockDeleteAppendixEHeatInputOil = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "deleteAppendixECorrelationHeatInputOil")
      .mockImplementation(mockDeleteAppendixEHeatInputOil);
    const extraIDs = [locId, testSumId, appECorrTestSumId];
    await qaAssert.removeDataSwitch(
      payload,
      appendixECorrHeatInputOil,
      locId,
      appECorrTestRunId,
      extraIDs
    );
    expect(mockDeleteAppendixEHeatInputOil).toHaveBeenCalledTimes(1);
  });
});

describe("Linearity Test CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });

  test("getQALinearitySummary", async () => {
    const mockGetQALinearitySummary = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "getQALinearitySummary")
      .mockImplementation(mockGetQALinearitySummary);
    const resp = await qaAssert.getDataTableApis(lineTest, locId, testSumId);

    expect(mockGetQALinearitySummary).toHaveBeenCalledTimes(1);
  });

  test("updateQALinearitySummaryTestSecondLevel", async () => {
    const payload = { id: "id", lineSum: "data" };
    const mockUpdateQALinearitySummaryTestSecondLevel = jest
      .fn()
      .mockResolvedValue({});
    jest
      .spyOn(qaApi, "updateQALinearitySummaryTestSecondLevel")
      .mockImplementation(mockUpdateQALinearitySummaryTestSecondLevel);
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.saveDataSwitch(
      payload,
      lineTest,
      locId,
      testSumId,
      extraIDs
    );

    expect(mockUpdateQALinearitySummaryTestSecondLevel).toHaveBeenCalledTimes(1);
  });

  test("deleteQALinearitySummary", async () => {
    const payload = { id: "id", lineSum: "data" };
    const mockDeleteQALinearitySummary = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "deleteQALinearitySummary")
      .mockImplementation(mockDeleteQALinearitySummary);
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.removeDataSwitch(
      { id: id },
      lineTest,
      locId,
      testSumId,
      extraIDs
    );

    expect(mockDeleteQALinearitySummary).toHaveBeenCalledTimes(1);
  });
});

describe("Cycle Time Summary CRUD Operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });

  test("getCycleTimeSummary", async () => {
    const mockGetCycleTimeSummary = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "getCycleTimeSummary")
      .mockImplementation(mockGetCycleTimeSummary);
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.getDataTableApis(
      cycleTimeSummary,
      locId,
      testSumId,
      extraIDs
    );

    expect(mockGetCycleTimeSummary).toHaveBeenCalledTimes(1);
  });

  test("createCycleTimeSummary", async () => {
    const payload = { cycleTimeSummary: "data" };
    const mockCreateCycleTimeSummary = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "createCycleTimeSummary")
      .mockImplementation(mockCreateCycleTimeSummary);
    const extraIDs = [locId, testSumId];
    await qaAssert.createDataSwitch(
      payload,
      cycleTimeSummary,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockCreateCycleTimeSummary).toHaveBeenCalledTimes(1);
  });

  test("updateCycleTimeSummary", async () => {
    const payload = { id: id, cycleTimeSummary: "data" };
    const mockUpdateCycleTimeSummary = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "updateCycleTimeSummary")
      .mockImplementation(mockUpdateCycleTimeSummary);
    const extraIDs = [locId, testSumId];
    await qaAssert.saveDataSwitch(
      payload,
      cycleTimeSummary,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockUpdateCycleTimeSummary).toHaveBeenCalledTimes(1);
  });

  test("deleteCycleTimeSummary", async () => {
    const payload = { cycleTimeSummary: "data" };
    const mockDeleteCycleTimeSummary = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "deleteCycleTimeSummary")
      .mockImplementation(mockDeleteCycleTimeSummary);
    const extraIDs = [locId, testSumId];
    await qaAssert.removeDataSwitch(
      { id: id },
      cycleTimeSummary,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockDeleteCycleTimeSummary).toHaveBeenCalledTimes(1);
  });
});

describe("Fuel Flowmeter Accuracy Data CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });

  test("getFuelFlowmeterAccuracyDataRecords", async () => {
    const mockGetFuelFlowmeterAccuracyData = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "getFuelFlowmeterAccuracyDataRecords")
      .mockImplementation(mockGetFuelFlowmeterAccuracyData);
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.getDataTableApis(
      fuelFlowmeterAccuracyData,
      locId,
      testSumId,
      extraIDs
    );

    expect(mockGetFuelFlowmeterAccuracyData).toHaveBeenCalledTimes(1);
  });

  test("createFuelFlowmeterAccuracyDataRecord", async () => {
    const payload = { fuelFlowmeterAccuracyData: "data" };
    const mockCreateFuelFlowmeterAccuracyData = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "createFuelFlowmeterAccuracyDataRecord")
      .mockImplementation(mockCreateFuelFlowmeterAccuracyData);
    const extraIDs = [locId, testSumId];
    await qaAssert.createDataSwitch(
      payload,
      fuelFlowmeterAccuracyData,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockCreateFuelFlowmeterAccuracyData).toHaveBeenCalledTimes(1);
  });

  test("updateFuelFlowmeterAccuracyDataRecord", async () => {
    const payload = { id: id, fuelFlowmeterAccuracyData: "data" };
    const mockUpdateFuelFlowmeterAccuracyData = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "updateFuelFlowmeterAccuracyDataRecord")
      .mockImplementation(mockUpdateFuelFlowmeterAccuracyData);
    const extraIDs = [locId, testSumId];
    await qaAssert.saveDataSwitch(
      payload,
      fuelFlowmeterAccuracyData,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockUpdateFuelFlowmeterAccuracyData).toHaveBeenCalledTimes(1);
  });

  test("deleteFuelFlowmeterAccuracyDataRecord", async () => {
    const payload = { fuelFlowmeterAccuracyData: "data" };
    const mockDeleteFuelFlowmeterAccuracyData = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "deleteFuelFlowmeterAccuracyDataRecord")
      .mockImplementation(mockDeleteFuelFlowmeterAccuracyData);
    const extraIDs = [locId, testSumId];
    await qaAssert.removeDataSwitch(
      { id: id },
      fuelFlowmeterAccuracyData,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockDeleteFuelFlowmeterAccuracyData).toHaveBeenCalledTimes(1);
  });
});

describe("Transmitter Transducer Accuracy Data CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });

  test("getTransmitterTransducerAccuracyDataRecords", async () => {
    const mockGetTransmitterTransducerAccuracyData = jest
      .fn()
      .mockResolvedValue({});
    jest
      .spyOn(qaApi, "getTransmitterTransducerAccuracyDataRecords")
      .mockImplementation(mockGetTransmitterTransducerAccuracyData);
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.getDataTableApis(
      transmitterTransducerAccuracyData,
      locId,
      testSumId,
      extraIDs
    );

    expect(mockGetTransmitterTransducerAccuracyData).toHaveBeenCalledTimes(1);
  });

  test("createTransmitterTransducerAccuracyDataRecord", async () => {
    const payload = { transmitterTransducerAccuracyData: "data" };
    const mockCreateTransmitterTransducerAccuracyData = jest
      .fn()
      .mockResolvedValue({});
    jest
      .spyOn(qaApi, "createTransmitterTransducerAccuracyDataRecord")
      .mockImplementation(mockCreateTransmitterTransducerAccuracyData);
    const extraIDs = [locId, testSumId];
    await qaAssert.createDataSwitch(
      payload,
      transmitterTransducerAccuracyData,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockCreateTransmitterTransducerAccuracyData).toHaveBeenCalledTimes(
      1
    );
  });

  test("updateTransmitterTransducerAccuracyDataRecord", async () => {
    const payload = { id: id, transmitterTransducerAccuracyData: "data" };
    const mockUpdateTransmitterTransducerAccuracyData = jest
      .fn()
      .mockResolvedValue({});
    jest
      .spyOn(qaApi, "updateTransmitterTransducerAccuracyDataRecord")
      .mockImplementation(mockUpdateTransmitterTransducerAccuracyData);
    const extraIDs = [locId, testSumId];
    await qaAssert.saveDataSwitch(
      payload,
      transmitterTransducerAccuracyData,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockUpdateTransmitterTransducerAccuracyData).toHaveBeenCalledTimes(
      1
    );
  });

  test("deleteTransmitterTransducerAccuracyDataRecord", async () => {
    const payload = { transmitterTransducerAccuracyData: "data" };
    const mockDeleteTransmitterTransducerAccuracyData = jest
      .fn()
      .mockResolvedValue({});
    jest
      .spyOn(qaApi, "deleteTransmitterTransducerAccuracyDataRecord")
      .mockImplementation(mockDeleteTransmitterTransducerAccuracyData);
    const extraIDs = [locId, testSumId];
    await qaAssert.removeDataSwitch(
      { id: id },
      transmitterTransducerAccuracyData,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockDeleteTransmitterTransducerAccuracyData).toHaveBeenCalledTimes(
      1
    );
  });
});

describe("Flow to Load Check CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });

  test("getFlowToLoadCheckRecords", async () => {
    const mockGetFlowToLoadCheckRecords = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "getFlowToLoadCheckRecords")
      .mockImplementation(mockGetFlowToLoadCheckRecords);
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.getDataTableApis(
      flowToLoadCheck,
      locId,
      testSumId,
      extraIDs
    );

    expect(mockGetFlowToLoadCheckRecords).toHaveBeenCalledTimes(1);
  });

  test("createFlowToLoadCheckRecord", async () => {
    const payload = { flowToLoadCheck: "data" };
    const mockCreateFlowToLoadCheckRecord = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "createFlowToLoadCheckRecord")
      .mockImplementation(mockCreateFlowToLoadCheckRecord);
    const extraIDs = [locId, testSumId];
    await qaAssert.createDataSwitch(
      payload,
      flowToLoadCheck,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockCreateFlowToLoadCheckRecord).toHaveBeenCalledTimes(1);
  });

  test("updateFlowToLoadCheckRecord", async () => {
    const payload = { id: id, flowToLoadCheck: "data" };
    const mockUpdateFlowToLoadCheckRecord = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "updateFlowToLoadCheckRecord")
      .mockImplementation(mockUpdateFlowToLoadCheckRecord);
    const extraIDs = [locId, testSumId];
    await qaAssert.saveDataSwitch(
      payload,
      flowToLoadCheck,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockUpdateFlowToLoadCheckRecord).toHaveBeenCalledTimes(1);
  });

  test("deleteFlowToLoadCheckRecord", async () => {
    const payload = { flowToLoadCheck: "data" };
    const mockDeleteFlowToLoadCheckRecord = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "deleteFlowToLoadCheckRecord")
      .mockImplementation(mockDeleteFlowToLoadCheckRecord);
    const extraIDs = [locId, testSumId];
    await qaAssert.removeDataSwitch(
      { id: id },
      flowToLoadCheck,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockDeleteFlowToLoadCheckRecord).toHaveBeenCalledTimes(1);
  });
});

describe("Linear Injection CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });

  test("getQALinearityInjection", async () => {
    const mockGetQALinearityInjection = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "getQALinearityInjection")
      .mockImplementation(mockGetQALinearityInjection);
    const extraIDs = [locId, linSumId];
    const resp = await qaAssert.getDataTableApis(
      lineInjection,
      locId,
      linSumId,
      extraIDs
    );

    expect(mockGetQALinearityInjection).toHaveBeenCalledTimes(1);
  });

  test("createQALinearityInjection", async () => {
    const payload = { qaLinearityInjection: "data" };
    const mockCreateQALinearityInjection = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "createQALinearityInjection")
      .mockImplementation(mockCreateQALinearityInjection);
    const extraIDs = [locId, linSumId];
    await qaAssert.createDataSwitch(
      payload,
      lineInjection,
      locId,
      linSumId,
      extraIDs
    );
    expect(mockCreateQALinearityInjection).toHaveBeenCalledTimes(1);
  });

  test("editQALinearityInjection", async () => {
    const payload = { id: id, qaLinearityInjection: "data" };
    const mockEditQALinearityInjection = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "editQALinearityInjection")
      .mockImplementation(mockEditQALinearityInjection);
    const extraIDs = [locId, linSumId];
    await qaAssert.saveDataSwitch(
      payload,
      lineInjection,
      locId,
      linSumId,
      extraIDs
    );
    expect(mockEditQALinearityInjection).toHaveBeenCalledTimes(1);
  });

  test("deleteQALinearityInjection", async () => {
    const payload = { qaLinearityInjection: "data" };
    const mockDeleteQALinearityInjection = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "deleteQALinearityInjection")
      .mockImplementation(mockDeleteQALinearityInjection);
    const extraIDs = [locId, linSumId];
    await qaAssert.removeDataSwitch(
      { id: id },
      lineInjection,
      locId,
      linSumId,
      extraIDs
    );
    expect(mockDeleteQALinearityInjection).toHaveBeenCalledTimes(1);
  });
});

describe("Rata Data CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });

  test("getRataData", async () => {
    const mockGetRataData = jest.fn().mockResolvedValue({});
    jest.spyOn(qaApi, "getRataData").mockImplementation(mockGetRataData);
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.getDataTableApis(
      rataData,
      locId,
      testSumId,
      extraIDs
    );

    expect(mockGetRataData).toHaveBeenCalledTimes(1);
  });

  test("createRataData", async () => {
    const payload = { rataData: "data" };
    const mockCreateRataData = jest.fn().mockResolvedValue({});
    jest.spyOn(qaApi, "createRataData").mockImplementation(mockCreateRataData);
    const extraIDs = [locId, testSumId];
    await qaAssert.createDataSwitch(
      payload,
      rataData,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockCreateRataData).toHaveBeenCalledTimes(1);
  });

  test("updateRataData", async () => {
    const payload = { id: id, rataData: "data" };
    const mockUpdateRataData = jest.fn().mockResolvedValue({});
    jest.spyOn(qaApi, "updateRataData").mockImplementation(mockUpdateRataData);
    const extraIDs = [locId, testSumId];
    await qaAssert.saveDataSwitch(
      payload,
      rataData,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockUpdateRataData).toHaveBeenCalledTimes(1);
  });

  test("deleteRataData", async () => {
    const payload = { rataData: "data" };
    const mockDeleteRataData = jest.fn().mockResolvedValue({});
    jest.spyOn(qaApi, "deleteRataData").mockImplementation(mockDeleteRataData);
    const extraIDs = [locId, testSumId];
    await qaAssert.removeDataSwitch(
      { id: id },
      rataData,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockDeleteRataData).toHaveBeenCalledTimes(1);
  });
});

describe("Protocol Gas CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getProtocolGas", async () => {
    const mockGetProtocolGas = jest.fn().mockResolvedValue({});
    jest.spyOn(qaApi, "getProtocolGas").mockImplementation(mockGetProtocolGas);
    const extraIDs = [locId, testSumId];
    await qaAssert.getDataTableApis(proGas, locId, testSumId, extraIDs);
    expect(mockGetProtocolGas).toHaveBeenCalledTimes(1);
  });

  test("createProtocolGas", async () => {
    const mockCreateProtocolGas = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "createProtocolGas")
      .mockImplementation(mockCreateProtocolGas);
    const extraIDs = [locId, testSumId];
    await qaAssert.createDataSwitch({}, proGas, locId, testSumId, extraIDs);
    expect(mockCreateProtocolGas).toHaveBeenCalledTimes(1);
  });

  test("updateProtocolGas", async () => {
    const mockUpdateProtocolGas = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "updateProtocolGas")
      .mockImplementation(mockUpdateProtocolGas);
    const extraIDs = [locId, testSumId];
    await qaAssert.saveDataSwitch({}, proGas, locId, testSumId, extraIDs);

    expect(mockUpdateProtocolGas).toHaveBeenCalledTimes(1);
  });

  test("deleteProtocolGas", async () => {
    const mockDeleteProtocolGas = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "deleteProtocolGas")
      .mockImplementation(mockDeleteProtocolGas);
    const extraIDs = [locId, testSumId];
    await qaAssert.removeDataSwitch(
      { id: id },
      proGas,
      locId,
      testSumId,
      extraIDs
    );

    expect(mockDeleteProtocolGas).toHaveBeenCalledTimes(1);
  });
});

describe("Air Emissions CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getAirEmissions", async () => {
    const mockGetAirEmissions = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "getAirEmissions")
      .mockImplementation(mockGetAirEmissions);
    const extraIDs = [locId, testSumId];
    await qaAssert.getDataTableApis(airEmissions, locId, testSumId, extraIDs);
    expect(mockGetAirEmissions).toHaveBeenCalledTimes(1);
  });

  test("createAirEmissions", async () => {
    const mockCreateAirEmissions = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "createAirEmissions")
      .mockImplementation(mockCreateAirEmissions);
    const extraIDs = [locId, testSumId];
    await qaAssert.createDataSwitch(
      {},
      airEmissions,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockCreateAirEmissions).toHaveBeenCalledTimes(1);
  });

  test("updateAirEmissions", async () => {
    const mockUpdateAirEmissions = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "updateAirEmissions")
      .mockImplementation(mockUpdateAirEmissions);
    const extraIDs = [locId, testSumId];
    await qaAssert.saveDataSwitch({}, airEmissions, locId, testSumId, extraIDs);

    expect(mockUpdateAirEmissions).toHaveBeenCalledTimes(1);
  });

  test("deleteAirEmissions", async () => {
    const mockDeleteAirEmissions = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "deleteAirEmissions")
      .mockImplementation(mockDeleteAirEmissions);
    const extraIDs = [locId, testSumId];
    await qaAssert.removeDataSwitch(
      { id: id },
      airEmissions,
      locId,
      testSumId,
      extraIDs
    );

    expect(mockDeleteAirEmissions).toHaveBeenCalledTimes(1);
  });
});

describe("Unit Default CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getUnitDefaultTest", async () => {
    const unitDefaultTestObject = [{ unitDefaultTest: "data" }];
    const getUnitDefaultTestUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/unit-default-tests`;

    const mockGetUnitDefault = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "getUnitDefaultTest")
      .mockImplementation(mockGetUnitDefault);
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.getDataTableApis(
      unitDefualtTest,
      locId,
      testSumId,
      extraIDs
    );

    expect(mockGetUnitDefault).toHaveBeenCalledTimes(1);
  });
  test("createUnitDefaultTest", async () => {
    const payload = { unitDefaultTest: "data" };
    const mockCreateUnitDefault = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "createUnitDefaultTest")
      .mockImplementation(mockCreateUnitDefault);
    const extraIDs = [locId, testSumId];
    await qaAssert.createDataSwitch(
      payload,
      unitDefualtTest,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockCreateUnitDefault).toHaveBeenCalledTimes(1);
  });

  test("updateUnitDefaultTest", async () => {
    const mockUpdateUnitDefaultTest = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "updateUnitDefaultTest")
      .mockImplementation(mockUpdateUnitDefaultTest);
    const extraIDs = [locId, testSumId];
    const payload = { id: id, unitDefaultTest: "data" };
    await qaAssert.saveDataSwitch(
      payload,
      unitDefualtTest,
      locId,
      testSumId,
      extraIDs
    );

    expect(mockUpdateUnitDefaultTest).toHaveBeenCalledTimes(1);
  });

  test("deleteUnitDefaultTest", async () => {
    const mockDeleteUnitDefaultTest = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "deleteUnitDefaultTest")
      .mockImplementation(mockDeleteUnitDefaultTest);
    const extraIDs = [locId, testSumId];
    await qaAssert.removeDataSwitch(
      { id: id },
      unitDefualtTest,
      locId,
      testSumId,
      extraIDs
    );

    expect(mockDeleteUnitDefaultTest).toHaveBeenCalledTimes(1);
  });
});

describe("Hg Summary CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });

  test("getHgSummary", async () => {
    const mockGetHgSummary = jest.fn().mockResolvedValue({});
    jest.spyOn(qaApi, "getHgSummary").mockImplementation(mockGetHgSummary);
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.getDataTableApis(
      hgSummary,
      locId,
      testSumId,
      extraIDs
    );

    expect(mockGetHgSummary).toHaveBeenCalledTimes(1);
  });

  test("createHgSummary", async () => {
    const payload = { hgSummary: "data" };
    const mockCreateHgSummary = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "createHgSummary")
      .mockImplementation(mockCreateHgSummary);
    const extraIDs = [locId, testSumId];
    await qaAssert.createDataSwitch(
      payload,
      hgSummary,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockCreateHgSummary).toHaveBeenCalledTimes(1);
  });

  test("updateHgSummary", async () => {
    const payload = { hgSummary: "data" };
    const mockUpdateHgSummary = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "updateHgSummary")
      .mockImplementation(mockUpdateHgSummary);
    const extraIDs = [locId, testSumId, hgTestSumId];
    await qaAssert.saveDataSwitch(
      payload,
      hgSummary,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockUpdateHgSummary).toHaveBeenCalledTimes(1);
  });

  test("deleteHgSummary", async () => {
    const payload = { hgSummary: "data" };
    const mockDeleteHgSummary = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "deleteHgSummary")
      .mockImplementation(mockDeleteHgSummary);
    const extraIDs = [locId, testSumId, hgTestSumId];
    await qaAssert.removeDataSwitch(
      { id: id },
      hgSummary,
      locId,
      hgTestSumId,
      extraIDs
    );
    expect(mockDeleteHgSummary).toHaveBeenCalledTimes(1);
  });
});

describe("Hg Injection CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getHgInjection", async () => {
    const mockGetHgInjection = jest.fn().mockResolvedValue({});
    jest.spyOn(qaApi, "getHgInjection").mockImplementation(mockGetHgInjection);
    const extraIDs = [locId, testSumId, hgTestSumId];
    const resp = await qaAssert.getDataTableApis(
      hgInjection,
      locId,
      hgTestSumId,
      extraIDs
    );

    expect(mockGetHgInjection).toHaveBeenCalledTimes(1);
  });

  test("createHgInjection", async () => {
    const payload = { hgInjection: "data" };
    const mockCreateHgInjection = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "createHgInjection")
      .mockImplementation(mockCreateHgInjection);
    const extraIDs = [locId, testSumId, hgTestSumId];
    await qaAssert.createDataSwitch(
      payload,
      hgInjection,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockCreateHgInjection).toHaveBeenCalledTimes(1);
  });
  test("deleteHgInjection", async () => {
    const payload = { hgInjection: "data" };
    const mockDeleteHgInjection = jest.fn().mockResolvedValue({});
    jest
      .spyOn(qaApi, "deleteHgInjection")
      .mockImplementation(mockDeleteHgInjection);
    const extraIDs = [locId, testSumId, hgTestSumId];
    await qaAssert.removeDataSwitch(
      { id: id },
      hgInjection,
      locId,
      hgTestSumId,
      extraIDs
    );
    expect(mockDeleteHgInjection).toHaveBeenCalledTimes(1);
  });
});
