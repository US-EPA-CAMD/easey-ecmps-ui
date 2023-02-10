import * as mpApi from "./monitoringPlansApi";

const selectedFacilityOrisCode = 3;
const mockData = {};
const mockCheckoutApiCall = jest.fn().mockResolvedValue({
  data: [],
});
jest.mock("../../additional-functions/checkout", () => ({
  checkoutAPI: () => mockCheckoutApiCall(),
}));

jest.mock("./easeyAuthApi", () => ({
  secureAxios: jest.fn().mockResolvedValue({ data: {}, status: 200 }),
}));

const monitoringLocationId = 56;
describe("testing monitoring plans data fetching APIs", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("tests getMonitoringPlanById workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);
    const apiCall = await mpApi.getMonitoringPlanById(selectedFacilityOrisCode);
    expect(apiCall.data).toEqual(mockData);
  });

  test("tests getMonitoringPlanById", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/monitoring-plans`);
    const apiCall = await mpApi.getMonitoringPlanById(selectedFacilityOrisCode);
    expect(apiCall.data).toEqual(mockData);
  });

  test("tests getMonitoringPlans workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringPlans(3);
    expect(apiCall.data).toEqual(mockData);
  });

  test("tests getMonitoringPlans", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringPlans(3);
    expect(apiCall.data).toEqual(mockData);
  });

  test("tests getMonitoringMethods workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringMethods(monitoringLocationId);
    expect(apiCall.data).toEqual(mockData);
  });
  test("tests getMonitoringMethods ", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringMethods(monitoringLocationId);
    expect(apiCall.data).toEqual(mockData);
  });

  test("tests a getMonitoringMatsMethods workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringMatsMethods(monitoringLocationId);
    expect(apiCall.data).toEqual(mockData);
  });
  test("tests a getMonitoringMatsMethods", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringMatsMethods(monitoringLocationId);
    expect(apiCall.data).toEqual(mockData);
  });

  test("tests getMonitoringSystems workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringSystems(monitoringLocationId);
    expect(apiCall.data).toEqual(mockData);
  });

  test("tests getMonitoringSystems", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringSystems(monitoringLocationId);
    expect(apiCall.data).toEqual(mockData);
  });

  test("tests getMonitoringSystemsFuelFlows workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringSystemsFuelFlows(
      monitoringLocationId,
      5
    );
    expect(apiCall.data).toEqual(mockData);
  });

  test("tests getMonitoringSystemsFuelFlows", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringSystemsFuelFlows(
      monitoringLocationId,
      5
    );
    expect(apiCall.data).toEqual(mockData);
  });

  test("tests getMonitoringSystemsComponents workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringSystemsComponents(
      monitoringLocationId,
      5
    );
    expect(apiCall.data).toEqual(mockData);
  });

  test("tests getMonitoringSystemsComponents", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringSystemsComponents(
      monitoringLocationId,
      5
    );
    expect(apiCall.data).toEqual(mockData);
  });

  test("tests getMonitoringComponents workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringComponents(monitoringLocationId);
    expect(apiCall.data).toEqual(mockData);
  });
  test("tests getMonitoringComponents", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringComponents(monitoringLocationId);
    expect(apiCall.data).toEqual(mockData);
  });

  test("tests getMonitoringAnalyzerRanges workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringAnalyzerRanges(
      monitoringLocationId,
      5
    );
    expect(apiCall.data).toEqual(mockData);
  });

  test("tests getMonitoringAnalyzerRanges", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringAnalyzerRanges(
      monitoringLocationId,
      5
    );
    expect(apiCall.data).toEqual(mockData);
  });
  test("tests postCheckoutMonitoringPlanConfiguration", async () => {
    const apiCall = await mpApi.postCheckoutMonitoringPlanConfiguration(
      monitoringLocationId,
      5
    );
    expect(apiCall).toEqual(mockData);
  });

  test("tests revertOfficialRecord", async () => {
    const apiCall = await mpApi.revertOfficialRecord(monitoringLocationId);
    expect(apiCall).toEqual(mockData);
  });

  test("tests createMethods", async () => {
    const apiCall = await mpApi.createMethods({
      locationId: "test",
      id: "test",
    });
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests createMats", async () => {
    const apiCall = await mpApi.createMats(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests putLockTimerUpdateConfiguration", async () => {
    const apiCall = await mpApi.putLockTimerUpdateConfiguration(
      monitoringLocationId
    );
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests saveMonitoringMethods", async () => {
    const apiCall = await mpApi.saveMonitoringMethods(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });
  test("tests saveMonitoringMats", async () => {
    const apiCall = await mpApi.saveMonitoringMats(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests saveAnalyzerRanges ", async () => {
    const apiCall = await mpApi.saveAnalyzerRanges({
      locId: "test",
      compId: "test",
      id: "test",
    });
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests createAnalyzerRanges ", async () => {
    const apiCall = await mpApi.createAnalyzerRanges(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests saveSystemsFuelFlows ", async () => {
    const apiCall = await mpApi.saveSystemsFuelFlows(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests createSystemsFuelFlows ", async () => {
    const apiCall = await mpApi.createSystemsFuelFlows({ id: "test" });
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests saveSystems ", async () => {
    const apiCall = await mpApi.saveSystems(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests createSystems ", async () => {
    const apiCall = await mpApi.createSystems(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests saveSystemsComponents ", async () => {
    const apiCall = await mpApi.saveSystemsComponents(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests createSystemsComponents ", async () => {
    const apiCall = await mpApi.createSystemsComponents(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getMonitoringSpans workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringSpans(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getMonitoringSpans ", async () => {
    delete window.location;

    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringSpans(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests saveMonitoringSpans ", async () => {
    const apiCall = await mpApi.saveMonitoringSpans(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests createMonitoringSpans ", async () => {
    const apiCall = await mpApi.createMonitoringSpans(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests saveMonitoringLoads ", async () => {
    const apiCall = await mpApi.saveMonitoringLoads(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests createMonitoringLoads ", async () => {
    const apiCall = await mpApi.createMonitoringLoads(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getMonitoringLoads workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringLoads(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getMonitoringLoads ", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringLoads(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });
  test("tests saveMonitoringDefaults ", async () => {
    const apiCall = await mpApi.saveMonitoringDefaults(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getMonitoringDefaults workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringDefaults(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });
  test("tests getMonitoringDefaults ", async () => {
    delete window.location;

    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringDefaults(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests createMonitoringDefaults ", async () => {
    const apiCall = await mpApi.createMonitoringDefaults(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getMonitoringFormulas workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringFormulas(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getMonitoringFormulas ", async () => {
    delete window.location;

    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringFormulas(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getMonitoringRectangularDucts workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringRectangularDucts(
      monitoringLocationId
    );
    expect(apiCall["data"]).toEqual(mockData);
  });
  test("tests getMonitoringRectangularDucts ", async () => {
    delete window.location;

    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringRectangularDucts(
      monitoringLocationId
    );
    expect(apiCall["data"]).toEqual(mockData);
  });
  test("tests getMonitoringPlansFuelDataRecords workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringPlansFuelDataRecords(
      monitoringLocationId
    );
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getMonitoringPlansFuelDataRecords ", async () => {
    delete window.location;

    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringPlansFuelDataRecords(
      monitoringLocationId
    );
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests saveMonitoringDuct ", async () => {
    const apiCall = await mpApi.saveMonitoringDuct(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });
  test("tests createMonitoringDuct ", async () => {
    const apiCall = await mpApi.createMonitoringDuct(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests saveMonitoringPlansFuelData ", async () => {
    const apiCall = await mpApi.saveMonitoringPlansFuelData(
      monitoringLocationId
    );
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests createFuelData ", async () => {
    const apiCall = await mpApi.createFuelData(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  // test("tests getMonitoringPlansUnitControlRecords workspace", async () => {
  //   delete window.location;
  //   window.location = new URL(`https://test.com/workspace/monitoring-plans`);
  //   axios.mockImplementationOnce(() => {
  //     return Promise.resolve({ status: 200, data: {} });
  //   });
  //   const apiCall = await mpApi.getMonitoringPlansUnitControlRecords(
  //     monitoringLocationId
  //   );
  //   expect(apiCall["data"]).toEqual(mockData);
  // });

  // test("tests getMonitoringPlansUnitControlRecords  ", async () => {
  //   delete window.location;

  //   window.location = new URL(`https://test.com/monitoring-plans`);
  //   axios.mockImplementationOnce(() => {
  //     return Promise.resolve({ status: 200, data: {} });
  //   });
  //   const apiCall = await mpApi.getMonitoringPlansUnitControlRecords(
  //     monitoringLocationId
  //   );
  //   expect(apiCall["data"]).toEqual(mockData);
  // });

  // test("tests saveUnitControl ", async () => {
  //   axios.mockImplementationOnce(() => {
  //     return Promise.resolve({ status: 200, data: {} });
  //   });
  //   const apiCall = await mpApi.saveUnitControl(monitoringLocationId, {
  //     locId: "test",
  //     unitRecordId: "test",
  //     id: "test",
  //   });
  //   expect(apiCall["data"]).toEqual(mockData);
  // });
  // test("tests createUnitControl ", async () => {
  //   axios.mockImplementationOnce(() => {
  //     return Promise.resolve({ status: 200, data: {} });
  //   });
  //   const apiCall = await mpApi.createUnitControl(monitoringLocationId, {
  //     locId: "test",
  //     unitRecordId: "test",
  //     id: "test",
  //   });
  //   expect(apiCall["data"]).toEqual(mockData);
  // });
  test("tests saveMonitoringFormulas ", async () => {
    const apiCall = await mpApi.saveMonitoringFormulas(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests createMonitoringFormulas ", async () => {
    const apiCall = await mpApi.createMonitoringFormulas(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getUnitCapacity workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getUnitCapacity(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getUnitCapacity ", async () => {
    delete window.location;

    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getUnitCapacity(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests saveUnitCapacity ", async () => {
    const apiCall = await mpApi.saveUnitCapacity(monitoringLocationId, {
      locId: "test",
      unitRecordId: "test",
      id: "test",
    });
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests createUnitCapacity ", async () => {
    const apiCall = await mpApi.createUnitCapacity(monitoringLocationId, {
      locId: "test",
      unitRecordId: "test",
      id: "test",
    });
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getPCTQualifications  wworkspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getPCTQualifications(
      monitoringLocationId,
      "qualId"
    );
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getPCTQualifications ", async () => {
    delete window.location;

    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getPCTQualifications(
      monitoringLocationId,
      "qualId"
    );
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests savePCTQualificationData ", async () => {
    const apiCall = await mpApi.savePCTQualificationData(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests createPCTQualificationData ", async () => {
    const apiCall = await mpApi.createPCTQualificationData(
      monitoringLocationId
    );
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getQualifications workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getQualifications(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getQualifications ", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getQualifications(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests saveQualificationData ", async () => {
    const apiCall = await mpApi.saveQualificationData(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests createQualificationData ", async () => {
    const apiCall = await mpApi.createQualificationData(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getLEEQualifications workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getLEEQualifications(
      monitoringLocationId,
      "qualId"
    );
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getLEEQualifications ", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getLEEQualifications(
      monitoringLocationId,
      "qualId"
    );
    expect(apiCall["data"]).toEqual(mockData);
  });
  test("tests saveLEEQualificationData ", async () => {
    const apiCall = await mpApi.saveLEEQualificationData(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests createLEEQualificationData ", async () => {
    const apiCall = await mpApi.createLEEQualificationData(
      monitoringLocationId
    );
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getLMEQualifications ", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getLMEQualifications(
      monitoringLocationId,
      "qualId"
    );
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getLMEQualifications ", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getLMEQualifications(
      monitoringLocationId,
      "qualId"
    );
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests saveLMEQualificationData ", async () => {
    const apiCall = await mpApi.saveLMEQualificationData(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests createLMEQualificationData ", async () => {
    const apiCall = await mpApi.createLMEQualificationData(
      monitoringLocationId
    );
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getLocationAttributes workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getLocationAttributes(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getLocationAttributes ", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getLocationAttributes(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getRelationshipData workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getRelationshipData(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getRelationshipData ", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/monitoring-plans`);

    const apiCall = await mpApi.getRelationshipData(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });
  test("tests saveLocationAttribute ", async () => {
    const apiCall = await mpApi.saveLocationAttribute(
      monitoringLocationId,
      "locid"
    );
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests createLocationAttribute ", async () => {
    const apiCall = await mpApi.createLocationAttribute(
      monitoringLocationId,
      "test"
    );
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getMonitoringPlansEvaluationReportData workspace", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const apiCall = await mpApi.getMonitoringPlansEvaluationReportData(
      monitoringLocationId
    );
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests getMonitoringPlansEvaluationReportData ", async () => {
    delete window.location;
    window.location = new URL(`https://test.com`);

    const apiCall = await mpApi.getMonitoringPlansEvaluationReportData(
      monitoringLocationId
    );
    expect(apiCall["data"]).toEqual(mockData);
  });

  test("tests deleteCheckInMonitoringPlanConfiguration", async () => {
    const apiCall = await mpApi.deleteCheckInMonitoringPlanConfiguration(
      monitoringLocationId
    );
    expect(apiCall).toEqual(mockData);
  });

  test("tests getCheckedOutLocations not secure", async () => {
    const apiCall = await mpApi.getCheckedOutLocations(monitoringLocationId);

    expect(apiCall["data"]).toEqual({});
  });

  test("tests getRefreshInfo not secure", async () => {
    const apiCall = await mpApi.getRefreshInfo(monitoringLocationId);
    expect(apiCall["data"]).toEqual(mockData);
  });

  // test("Should fetch list of monitoring methods for a selected monitoring location", async () => {
  //   const mock = new MockAdapter(axios);
  //   mock
  //     .onGet(
  //       `${config.services.monitorPlans.uri}/monitor-locations/${monitoringLocationId}/methods`
  //     )
  //     .reply(200, {
  //       methods: mockMonitoringMethds,
  //     });
  //   const result = await getMonitoringMethods(monitoringLocationId);
  //   expect(result["data"].methods).toEqual(mockMonitoringMethds);
  // });

  // test("Should fetch list of monitoring Mats methods for a selected monitoring location", async () => {
  //   const mock = new MockAdapter(axios);
  //   mock
  //     .onGet(
  //       `${config.services.monitorPlans.uri}/monitor-locations/${monitoringLocationId}/Supplemental-methods`
  //     )
  //     .reply(200, {
  //       matsMethods: mockMatsMethods,
  //     });
  //   const result = await getMonitoringMatsMethods(monitoringLocationId);
  //   expect(result["data"].matsMethods).toEqual(mockMatsMethods);
  // });
  // test("Should fetch list of monitoring systems for a selected monitoring location", async () => {
  //   const mock = new MockAdapter(axios);
  //   mock
  //     .onGet(
  //       `${config.services.monitorPlans.uri}/monitor-locations/${monitoringLocationId}/systems`
  //     )
  //     .reply(200, {
  //       monitoringSystems: mockSystems,
  //     });
  //   const result = await getMonitoringSystems(monitoringLocationId);
  //   expect(result["data"].monitoringSystems).toEqual(mockSystems);
  // });

  // test("Should fetch list of monitoring formulas for a selected monitoring location", async () => {
  //   const mock = new MockAdapter(axios);
  //   mock
  //     .onGet(
  //       `${config.services.monitorPlans.uri}/monitor-locations/${monitoringLocationId}/formulas`
  //     )
  //     .reply(200, {
  //       monitoringSystems: mockSystems,
  //     });
  //   const result = await getMonitoringFormulas(monitoringLocationId);
  //   expect(result["data"].monitoringSystems).toEqual(mockSystems);
  // });

  // test("Should fetch list of monitoring qualification data for a selected location", async () => {
  //   const mock = new MockAdapter(axios);
  //   mock
  //     .onGet(
  //       `${config.services.monitorPlans.uri}/monitor-locations/${monitoringLocationId}/qualifications`
  //     )
  //     .reply(200, {
  //       monitoringSystems: mockSystems,
  //     });
  //   const result = await getQualifications(monitoringLocationId);
  //   expect(result["data"].monitoringSystems).toEqual(mockSystems);
  // });
});
// test("test file", () => {
//   const val = 1;
//   expect(val === 1);
// });
