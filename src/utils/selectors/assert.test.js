import {
  getDataTableApis,
  getDataTableRecords,
  saveDataSwitch,
  createDataSwitch,
} from "./assert";

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
  it("tests getDataTableApis function", () => {
    for (const name of tableNames) {
      getDataTableApis(name, "7", "7");
      // getDataTableApis(name, "7");
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
      // saveDataSwitch({}, name, "7");
    }
  });

  it("test createDataSwitch function", () => {
    for (const name of tableNames) {
      createDataSwitch({}, name, "7", { locId: "7" });
      // createDataSwitch({}, name, "7" );
    }
  });
});
