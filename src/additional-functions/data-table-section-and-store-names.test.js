import { convertSectionToStoreName } from "./data-table-section-and-store-names";
import * as initialState from "../store/reducers/initialState";

const dataTableNames = [
  "Default",
  "Formula",
  "Load",
  "Location Attribute",
  "Methods",
  "Qualifications",
  "Rectangular Duct WAF",
  "Span",
  "Systems",
  "Unit Fuel",
  "Unit Control",
  "Unit Capacity",
  "Fuel Flows",
  "System Components",
  "Analyzer Ranges",
  "Qualification Percent",
  "Qualification LME",
  "Qualification LEE",
  "Supplemental Methods",
  "This should result in the default case",
];

describe("convert data table names to their corresponding redux store names", () => {
  test("all resulting store names exist in the initial state of the redux store", () => {
    for (const name of dataTableNames) {
      const store = convertSectionToStoreName(name);
      const dropdowns = initialState.default.dropdowns;
      if (store !== "") {
        expect(dropdowns[store]).toBeTruthy();
      }
    }
  });
});
