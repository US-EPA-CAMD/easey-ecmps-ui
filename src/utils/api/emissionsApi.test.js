import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import config from "../../config";
import { exportEmissionsData } from "./emissionsApi";

describe("Emissions API", function () {
  let mockResponse;

  beforeAll(() => {
    const mock = new MockAdapter(axios);
    mockResponse = {
      orisCode: 50243,
      monitorPlanId: "monPlanId",
      reportingPeriodId: 105,
      year: 2019,
      quarter: 1,
    };

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
});
