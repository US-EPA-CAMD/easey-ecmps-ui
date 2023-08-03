import {
  createMatchTypeDropdownLists,
  getMatchDataFieldNames,
} from "./esFunctions";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../../config";
import {
  mockParamCheckCatalogResult,
  mockMonplanCheckCatalogResult,
  mockTestnumCheckCatalogResult,
} from "./mocks";

describe("AddErrorSuppressionModal helper functions", () => {
  const mock = new MockAdapter(axios);

  describe("createMatchTypeDropdownLists tests", () => {
    it("successfuly returns data when dataTypeCode=PARAM", async () => {
      mock.onGet(`${config.services.mdm.uri}/es-parameter-codes`).reply(200, [
        {
          checkTypeCode: "WSISTAT",
          checkNumber: "4",
          parameterCode: "H2O",
          parameterDescription: "Moisture Percentage (pct)",
        },
      ]);

      let result = await createMatchTypeDropdownLists(
        mockParamCheckCatalogResult
      );

      expect(result[0].value).toBe("H2O");
      expect(result[0].label).toBe("Moisture Percentage (pct)");
    });

    it("successfuly returns data when dataTypeCode=MONPLAN", async () => {
      mock
        .onGet(
          `${config.services.monitorPlans.uri}/workspace/configurations?orisCodes=3`
        )
        .reply(200, [
          {
            id: "MDC-ABF4B69D22C04494A78DA1667DFE9DE6",
            facId: 1,
            facilityName: "Barry",
            configTypeCode: null,
            lastUpdated: "2009-02-20T15:09:02.000Z",
            orisCode: 3,
            name: "7B",
          },
        ]);
      let result = await createMatchTypeDropdownLists(
        mockMonplanCheckCatalogResult,
        3
      );

      expect(result[0].value).toBe("MDC-ABF4B69D22C04494A78DA1667DFE9DE6");
      expect(result[0].label).toBe("7B");
    });

    it("successfuly returns data when dataTypeCode=TESTNUM", async () => {
      mock
        .onGet(
          `${config.services.qaCertification.uri}/workspace/locations/1/test-summary`
        )
        .reply(200, [
          {
            testNumber: "1A",
          },
        ]);
      mock
        .onGet(
          `${config.services.qaCertification.uri}/workspace/locations/2/test-summary`
        )
        .reply(200, [
          {
            testNumber: "2A",
          },
        ]);

      let result = await createMatchTypeDropdownLists(
        mockTestnumCheckCatalogResult,
        3,
        ["1", "2"]
      );

      expect(result[0].value).toBe("1A");
      expect(result[0].label).toBe("1A");
    });
  });

  describe("getMatchDataFieldNames tests", () => {
    it("returns two field names for each of the dataTypeCodes", () => {
      expect(getMatchDataFieldNames("CEPARAM").length).toBe(2);
      expect(getMatchDataFieldNames("COMPTYP").length).toBe(2);
      expect(getMatchDataFieldNames("FUELTYP").length).toBe(2);
      expect(getMatchDataFieldNames("PROGRAM").length).toBe(2);
      expect(getMatchDataFieldNames("QUALTYP").length).toBe(2);
      expect(getMatchDataFieldNames("TESTTYP").length).toBe(2);
      expect(getMatchDataFieldNames("MATSPAR").length).toBe(2);
      expect(getMatchDataFieldNames("PARAM").length).toBe(2);
      expect(getMatchDataFieldNames("MONPLAN").length).toBe(2);
      expect(getMatchDataFieldNames("TESTNUM").length).toBe(2);
    });

    it("returns an array with two undefineds for non matching dataTypeCode", () => {
      const [code, description] = getMatchDataFieldNames("WRONG");
      expect(code).not.toBeDefined();
      expect(description).not.toBeDefined();
    });
  });
});
