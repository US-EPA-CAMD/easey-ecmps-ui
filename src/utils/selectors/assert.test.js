import * as mpApi from "../api/monitoringPlansApi";

// selectors that normalize api data to fit the columns in UI datatable
import * as loadSelector from "./monitoringPlanLoads";
import * as wafSelector from "./monitoringPlanRectangularDucts";
import * as spanSelector from "./monitoringPlanSpans";
import * as formulaSelector from "./monitoringPlanFormulas";
import * as defaultSelector from "./monitoringPlanDefaults";
import * as unitFuelSelector from "./monitoringPlanFuelData";
import * as unitControlSelector from "./monitoringPlanUnitControls";
import * as unitCapacitySelector from "./monitoringPlanUnitCapacity";
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
];

describe("assert", () => {
  it("tests getDataTableApis function", () => {
    for (const name of tableNames) {
      getDataTableApis(name, "7", "7");
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

  it("test createDataSwitch function", () => {
    for (const name of tableNames) {
      createDataSwitch({}, name, "7", { locId: "7" });
    }
  });
});
