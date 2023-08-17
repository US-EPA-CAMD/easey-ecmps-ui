import {
  getDataTableApis,
  getDataTableRecords,
  saveDataSwitch,
  createDataSwitch,
} from "./assert";
import * as mpApi from "../api/monitoringPlansApi";

const tableNames = [
  "Load",
  "Rectangular Duct WAF",
  "Span",
  "Formula",
  "Default",
  "Unit Fuel",
  "Unit Control",
  "Unit Capacity",
  "Fake Table Name",
  "Location Attribute",
  "Relationship Data",
];

describe("assert", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it("tests getDataTableApis function", () => {
    for (const name of tableNames) {
      getDataTableApis(name, "7", "7");
    }
  });

  it("tests getDataTableApis function when error", async () => {

    jest.spyOn(mpApi, "getMonitoringLoads").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "getMonitoringRectangularDucts").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "getMonitoringSpans").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "getMonitoringFormulas").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "getMonitoringDefaults").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "getUnitCapacity").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "getLocationAttributes").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "getRelationshipData").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "getMonitoringPlansFuelDataRecords").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "getMonitoringPlansUnitControlRecords").mockRejectedValue('Some Exception');

    for (const name of tableNames) {
      const result = await getDataTableApis(name, "7", "7");
      if (name === 'Fake Table Name') {
        expect(result.data).toEqual([]);
      } else {
        expect(result).toEqual(undefined);
      }
    }
  });

  it("tests getDataTableRecords function", () => {
    for (const name of tableNames) {
      getDataTableRecords([], name);
    }
  });

  it("test saveDataSwitch function", () => {
    for (const name of tableNames) {
      saveDataSwitch({}, name, "7", { locId: "7" });
    }
  });

  it("test saveDataSwitch function with API error", async () => {
    jest.spyOn(mpApi, "saveMonitoringLoads").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "saveMonitoringDuct").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "saveMonitoringSpans").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "saveMonitoringFormulas").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "saveMonitoringDefaults").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "saveMonitoringPlansFuelData").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "saveUnitControl").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "saveUnitCapacity").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "saveLocationAttribute").mockRejectedValue('Some Exception');

    for (const name of tableNames) {
      const result = await saveDataSwitch({}, name, "7", { locId: "7" });

      if (name === 'Fake Table Name' || name === 'Relationship Data') {
        expect(result).toEqual([]);
      } else {
        expect(result).toEqual(undefined);
      }
    }
  });

  it("test createDataSwitch function", () => {
    for (const name of tableNames) {
      createDataSwitch({}, name, "7", { locId: "7" });
    }
  });

  it("test createDataSwitch function with API error", async () => {
    jest.spyOn(mpApi, "createMonitoringLoads").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "createMonitoringDuct").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "createMonitoringSpans").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "createMonitoringFormulas").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "createMonitoringDefaults").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "createFuelData").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "createUnitControl").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "createUnitCapacity").mockRejectedValue('Some Exception');
    jest.spyOn(mpApi, "createLocationAttribute").mockRejectedValue('Some Exception');

    for (const name of tableNames) {
      const result = await createDataSwitch({}, name, "7", { locId: "7" });

      if (name === 'Fake Table Name' || name === 'Relationship Data') {
        expect(result).toEqual([]);
      } else {
        expect(result).toEqual(undefined);
      }
    }
  });
});
