import * as dtp from "./dataTable-props";

const oneParam = [
  "defaultsDataTableProps",
  "formulasDataTableProps",
  "loadsDataTableProps",
  "rectWAFsDataTableProps",
  "spanDataTableProps",
  "unitFuelDataTableProps",
  "locationAttributesDataTableProps",
  "relationshipDataTableProps",
];
const twoParams = ["unitControlDataTableProps", "unitCapacityDataTableProps"];

const locationId = "locId";
const unitRecordId = "unitRecordId";
const selectedLocation = { id: locationId, unitRecordId: unitRecordId };

const propNames = [
  "payload",
  "dropdownArray",
  "columnNames",
  "controlInputs",
  "controlDatePickerInputs",
];
const urlParams = "urlParameters";

describe("dataTable-props file", () => {
  test("call all functions from dataTable-props", () => {
    for (const func in dtp) {
      // check all expected properties are returned from functions that accept 1 parameter (locationId)
      if (oneParam.includes(func)) {
        const props = dtp[func](locationId);
        for (const propName of propNames) {
          expect(props[propName]).toBeTruthy();
        }
      }
      // check all expected properties return from functions that accept 2 parameters (locationId & selectedLocation)
      if (twoParams.includes(func)) {
        const props = dtp[func](locationId, selectedLocation);
        for (const propName of propNames) {
          expect(props[propName]).toBeTruthy();
        }
        expect(props[urlParams]).toBeTruthy();
      }
    }
  });
});
