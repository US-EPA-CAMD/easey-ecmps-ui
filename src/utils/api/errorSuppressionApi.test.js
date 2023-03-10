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

    const resp = await esApi.getErrorSuppressionRecords({checkTypeCode:"", checkNumber:"", active: false, checkResult:"", severityCode:"", orisCode:"", locationsList:[""], reasonCode:"", beginDateHrQtr:"", endDateHrQtr:""});

    expect(resp.data).toEqual("Mocked");
  });

  test("getErrorSuppressionRecords test", async () => {
    const id = 123;
    const url = `${config.services.camd.uri}/error-suppressions/${id}`;
    mock.onPut(url).reply(200, "Mocked");

    const resp = await esApi.deactivateErrorSuppression(id);

    expect(resp.data).toEqual("Mocked");
  });

  test("getData test", async ()=>{
    const url = `${config.services.mdm.uri}/system-type-codes`;
    mock.onGet(url).reply(200, "Mocked");

    let resp = await esApi.getMdmData("system-type-codes");
    expect(resp.data).toEqual("Mocked");

    resp = await esApi.getMdmData();
    expect(resp).not.toBeDefined();
  })
});
