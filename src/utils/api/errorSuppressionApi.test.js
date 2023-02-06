import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import config from "../../config";
import * as esApi from "./errorSuppressionApi";

describe("ErrorSuppression API", function () {
  let mock;
  let mockResponse;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  test("getErrorSuppressionRecords test", async () => {
    const url = `${config.services.camd.uri}/error-suppressions`;
    mock.onGet(url).reply(200, "Mocked");

    const resp = await esApi.getErrorSuppressionRecords("", "", "");

    expect(resp.data).toEqual("Mocked");
  });

});
