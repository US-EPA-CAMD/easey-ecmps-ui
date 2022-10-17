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

    mock
      .onGet(
        `${config.services.emissions.uri}/export?monitorPlanId=monPlanId&year=2019&quarter=1`
      )
      .reply(200, mockResponse);
  });

  describe("exportEmissionsData", function () {
    it("should get emissions data given year, quarter and monitoringPlanId", async function () {
      const result = await exportEmissionsData("monPlanId", 2019, 1);
      expect(result["data"]).toEqual(mockResponse);
    });
  });
});
