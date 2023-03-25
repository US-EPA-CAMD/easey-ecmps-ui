import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {getReport,submitData} from "./camdServices";

import config from "../../config";

const mock = new MockAdapter(axios);

describe("Report API calls", () => {
  
  beforeEach(() => {
    mock.resetHistory();
  });

  test("getReport", async () => {
    const getReportUrl = "https://api.epa.gov/easey/dev/camd-services/reports?reportCode=reportCode&facilityId=facilityId"
    mock.onGet(getReportUrl).reply(200, []);

    getReport({ reportCode: "test", facilityId: 3 });

    expect(mock.history.get.length).toBe(1);
  })

  test("submitData", async () => {
    const payload = [
      { fuelTypeCodes: "data" },
    ];

    const submitUrl = `${config.services.camd.uri}/submit`;
    mock.onPost(submitUrl).reply(200);

    await submitData(payload);
    setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);
  })
});