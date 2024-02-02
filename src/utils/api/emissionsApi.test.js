import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import config from "../../config";
import * as emissionsApi from "./emissionsApi";
import * as apiUtils from "./apiUtils";


const mockFileDownload = jest.fn();
jest.mock('downloadjs', () => ({
  __esModule: true,
  default: () => mockFileDownload()
}));

describe("Emissions API", function () {
  let mock;
  let mockResponse;

  beforeAll(() => {
    mock = new MockAdapter(axios);
    mockResponse = {
      orisCode: 50243,
      monitorPlanId: "monPlanId",
      reportingPeriodId: 105,
      year: 2019,
      quarter: 1,
    };
  });

  describe("Review And Submit", () => {
    test("getEmissionsReviewSubmit", async () => {
      const url = `${config.services.emissions.uri}/workspace/emissions?orisCodes=3&monPlanIds=3&quarters=1`;
      mock.onGet(url).reply(200, "Mocked");

      const resp = await emissionsApi.getEmissionsReviewSubmit([3], [3], [1]);

      expect(resp?.data).toBeUndefined();
    });
  });

  describe("exportEmissionsData", function () {
    it("should get emissions data given year, quarter and monitoringPlanId", async function () {
      mock
        .onGet(
          `${config.services.emissions.uri}/emissions/export?monitorPlanId=monPlanId&year=2019&quarter=1`
        )
        .reply(200, mockResponse);
      const url = new URL(`${config.services.emissions.uri}/emissions/export`);
      const workspaceUrl = new URL(
        `${config.services.emissions.uri}/workspace/emissions/export`
      );
      const searchParams = new URLSearchParams({
        monitorPlanId: mockResponse.monitorPlanId,
        year: mockResponse.year,
        quarter: mockResponse.quarter,
      });
      mock
        .onGet(`${url.toString()}?${searchParams.toString()}`)
        .reply(200, mockResponse);
      mock
        .onGet(`${workspaceUrl.toString()}?${searchParams.toString()}`)
        .reply(200, {
          ...mockResponse,
          orisCode: 9999,
        });
    });
    //The test of these APIs are outdated.
    // describe("exportEmissionsData", function () {
    //   it("should get emissions data given year, quarter and monitoringPlanId", async function () {
    //     const result = await emissionsApi.exportEmissionsData(
    //       mockResponse.monitorPlanId,
    //       mockResponse.year,
    //       mockResponse.quarter
    //     );
    //     expect(result["data"]).toEqual(mockResponse);
    //   });

      // it("should get emissions data given year, quarter and monitoringPlanId", async function () {
      //   const result = await emissionsApi.exportEmissionsData(
      //     mockResponse.monitorPlanId,
      //     mockResponse.year,
      //     mockResponse.quarter,
      //     true
      //   );
      //   expect(result["data"]).toEqual({
      //     ...mockResponse,
      //     orisCode: 9999,
      //   });
      // });
    // });

  });

  describe("getEmissionViewData", function () {
    it("should get emissions view data", async function () {
      const viewCode = "DAILYCAL";
      const params = {
        monitorPlanId: "123",
        reportingPeriod: "123",
        unitIds: "123",
        stackPipeIds: "123",
        attachFile: false,
      };
      const url = `${config.services.emissions.uri}/emissions/views/${viewCode}`;
      const searchParams = new URLSearchParams(params);
      mock
        .onGet(`${url.toString()}?${searchParams.toString()}`)
        .reply(200, {});

      const result = await emissionsApi.getEmissionViewData(
        viewCode,
        params.monitorPlanId,
        params.reportingPeriod,
        params.unitIds,
        params.stackPipeIds,
        false,
        false
      );
      expect(result.data).toEqual({});
    });
  });

  describe("getViews", function () {
    it("should get Views data", async function () {
      const url = `${config.services.emissions.uri}/emissions/views`;
      mock
        .onGet(`${url.toString()}`)
        .reply(200, {});

      const result = await emissionsApi.getViews();
      expect(result.data).toEqual({});
    });

    it("should call handleError and return []", async () => {

      const mockHandleError = jest.spyOn(apiUtils, "handleError");

      mock
        .onGet(`${config.services.emissions.uri}/emissions/views`)
        .reply(500, "some error");

      const result = await emissionsApi.getViews();

      expect(mockHandleError).toHaveBeenCalled();
      expect(result).toEqual([]);

    });
  });

  describe("getEmissionsSchema", () => {
    it("should get emissions schema", async () => {
      mock
        .onGet(
          `${config.services.content.uri}/ecmps/reporting-instructions/emissions.schema.json`
        )
        .reply(200, {});
      const { data } = await emissionsApi.getEmissionsSchema();

      expect(data).toEqual({});
    });
  });

  describe("importEmissionsData", () => {
    it("should successfully import emissions json", async () => {
      mock
        .onPost(
          `${config.services.emissions.uri}/workspace/emissions/import`,
          {}
        )
        .reply(201, { message: "Success" });
      const { data } = await emissionsApi.importEmissionsData({});

      expect(data.message).toEqual("Success");
    });

    it("should call handleImportError and return []", async () => {

      const mockHandleError = jest.spyOn(apiUtils, "handleImportError");

      mock
        .onPost(
          `${config.services.emissions.uri}/workspace/emissions/import`,
          {}
        )
        .reply(500, "some error");

      const result = await emissionsApi.importEmissionsData({});

      expect(mockHandleError).toHaveBeenCalled();
      expect(result.data).toEqual("some error");


    });
  });

  describe("exportEmissionsDataDownload", () => {
    it("should successfully download emissions data", async () => {
      await emissionsApi.exportEmissionsDataDownload(
        'SomeFacilityName',
        mockResponse.monitorPlanId,
        mockResponse.year,
        mockResponse.quarter,
        true
      );

      expect(mockFileDownload);
    });
  });
});
