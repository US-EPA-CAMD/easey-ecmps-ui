import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getReportingPeriods } from "./mdmApi";
import config from "../../config";

test("Should fetch reporting periods from mdm API", async () => {
  const mock = new MockAdapter(axios);

  mock.onGet(`${config.services.mdm.uri}/reporting-periods`).reply(200, [
    {
      id: 1,
    },
  ]);

  const result = await getReportingPeriods();
  expect(result["data"][0].id).toEqual(1);
});
