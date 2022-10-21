import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import config from "../../config";
import { exportEmissionsData, getEmissionViewData } from "./emissionsApi";

describe("Emissions API", function () {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  describe("exportEmissionsData", function () {
    it("should get emissions data given year, quarter and monitoringPlanId", async function () {
      const mockResponse = {
        orisCode: 50243,
        monitorPlanId: "monPlanId",
        reportingPeriodId: 105,
        year: 2019,
        quarter: 1,
      };

      mock
        .onGet(
          `${config.services.emissions.uri}/emissions/export?monitorPlanId=monPlanId&year=2019&quarter=1`
        )
        .reply(200, mockResponse);

      const result = await exportEmissionsData("monPlanId", 2019, 1);
      expect(result["data"]).toEqual(mockResponse);
    });
  });

  describe("getEmissionViewData", function () {
    it("should get emissions view data", async function () {
      const viewCode = "DAILYCAL";
      const params = {
        monitorPlanId: "123",
        quarter: "123",
        year: "123",
        unitIds: "123",
        stackPipeIds: "123",
      };
      const url = `${config.services.emissions.uri}/emissions/views/${viewCode}`;
      const searchParams = new URLSearchParams(params);
      mock.onGet(`${url.toString()}?${searchParams.toString()}`).reply(200, {});

      const result = await getEmissionViewData(
        viewCode,
        params.monitorPlanId,
        params.year,
        params.quarter,
        params.unitIds,
        params.stackPipeIds
      );
      expect(result.data).toEqual({});
    });
  });
});
