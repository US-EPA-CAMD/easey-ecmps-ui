import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import config from "../../config";
import {
  exportEmissionsData,
  getEmissionsSchema,
  getEmissionViewData,
  importEmissionsData,
  getEmissionsReviewSubmit,
} from "./emissionsApi";
import { ExpansionPanelActions } from "@material-ui/core";

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
    test("getQATestSummaryReviewSubmit", async () => {
      const url = `${config.services.emissions.uri}/review-submit?orisCodes=3&monPlanIds=3&quarters=1`;
      mock.onGet(url).reply(200, "Mocked");

      const resp = await getEmissionsReviewSubmit([3], [3], [1]);

      expect(resp.data).toEqual("Mocked");
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

    describe("exportEmissionsData", function () {
      it("should get emissions data given year, quarter and monitoringPlanId", async function () {
        const result = await exportEmissionsData(
          mockResponse.monitorPlanId,
          mockResponse.year,
          mockResponse.quarter
        );
        expect(result["data"]).toEqual(mockResponse);
      });

      it("should get emissions data given year, quarter and monitoringPlanId", async function () {
        const result = await exportEmissionsData(
          mockResponse.monitorPlanId,
          mockResponse.year,
          mockResponse.quarter,
          true
        );
        expect(result["data"]).toEqual({
          ...mockResponse,
          orisCode: 9999,
        });
      });
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

        const result = await getEmissionViewData(
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

    describe("getEmissionsSchema", () => {
      it("should get emissions schema", async () => {
        mock
          .onGet(
            `${config.services.content.uri}/ecmps/reporting-instructions/emissions.schema.json`
          )
          .reply(200, {});
        const { data } = await getEmissionsSchema();

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
        const { data } = await importEmissionsData({});

        expect(data.message).toEqual("Success");
      });
    });
  });
});
