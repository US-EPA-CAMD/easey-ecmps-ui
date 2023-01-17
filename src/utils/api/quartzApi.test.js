import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { triggerBulkEvaluation, sendNotificationEmail } from "./quartzApi";
import config from "../../config";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

test("Should test email notification endpoint", async () => {
  let url = `${config.services.quartz.uri}`;
  url = `${url}/triggers/notifications/emails`;

  const successResponse = 200;
  const payload = { toEmail: "", purpose: "" };

  payload["toEmail"] = config.app.email;
  payload["purpose"] = "Contact ECMPS Support";

  const mock = new MockAdapter(axios);

  // test success
  mock.onPost(url).reply(200, {
    status: 200,
  });
  const result = await sendNotificationEmail(payload);
  expect(result.status).toEqual(successResponse);
});

test("Should test bulk evaluation trigger endpoint", async () => {
  let url = `${config.services.quartz.uri}`;
  url = `${url}/triggers/evaluations`;

  const successResponse = 200;
  const payload = {};

  const mock = new MockAdapter(axios);

  // test success
  mock.onPost(url).reply(200, {
    status: 200,
  });
  const result = await triggerBulkEvaluation(payload);
  expect(result.status).toEqual(successResponse);
});
