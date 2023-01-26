import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getReportingPeriods, getCheckCatalogResults, getReasonCodes, getSeverityCodes } from "./mdmApi";
import config from "../../config";


describe("MDM Api Test", () => {

  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  })

  test("Should fetch reporting periods from mdm API", async () => {

    mock.onGet(`${config.services.mdm.uri}/reporting-periods`).reply(200, [
      {
        id: 1,
      },
    ]);

    const result = await getReportingPeriods();
    expect(result["data"][0].id).toEqual(1);
  });

  test("Should get the mdm es catalog results", async () => {
    mock.onGet(`${config.services.mdm.uri}/es-check-catalog-results`).reply(200, [
      {
        "id": "5003",
        "checkTypeCode": "ADESTAT",
        "checkTypeDescription": "Appendix D and E Status",
        "checkNumber": "6",
        "checkResult": "Accuracy Test Not Yet Evaluated",
        "locationTypeCode": "LOC",
        "timeTypeCode": "HOUR",
        "dataTypeCode": "FUELTYP",
        "dataTypeLabel": "Fuel Type",
        "dataTypeUrl": "/master-data-mgmt/fuel-type-codes"
      },
    ]);

    const result = await getCheckCatalogResults();
    expect(result.data[0].id).toEqual("5003")
  })

  test("Should get the md es reason codes", async () => {
    mock.onGet(`${config.services.mdm.uri}/es-reason-codes`).reply(200, [
      {
        "errorSuppressionReasonCode": "BUG",
        "errorSuppressionReasonDescription": "Application Bug",
      },
    ]);

    const result = await getReasonCodes();
    expect(result.data[0].errorSuppressionReasonCode).toEqual("BUG")
  })

  test("Should get the md es severity codes", async () => {
    mock.onGet(`${config.services.mdm.uri}/es-severity-codes`).reply(200, [
      { severityCode: 'NONE', severityDescription: 'No Errors' },
    ]);

    const result = await getSeverityCodes();
    expect(result.data[0].severityCode).toEqual("NONE")
  })


})
