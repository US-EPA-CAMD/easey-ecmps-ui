import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { triggerEvaluation, sendNotificationEmail } from "./quartzApi";
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

  // test error
  const errorMsg = "error occurred while sending notification email";
  mock.onPost(url).reply(400, errorMsg);
  await sendNotificationEmail(payload);
});

test("Should test evaluation trigger endpoint", async () => {
  let url = `${config.services.quartz.uri}`;
  url = `${url}/triggers/evaluations/monitor-plans`;

  const successResponse = 200;
  const payload = {};

  const mock = new MockAdapter(axios);

  // test success
  mock.onPost(url).reply(200, {
    status: 200,
  });
  const result = await triggerEvaluation(payload);
  expect(result.status).toEqual(successResponse);

  // test error
  const errorMsg = "error occurred while triggerring evaluation process";
  mock.onPost(url).reply(400, errorMsg);
  await triggerEvaluation(payload);
});
