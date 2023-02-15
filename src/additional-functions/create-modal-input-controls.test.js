import { modalViewData } from "./create-modal-input-controls";
import * as mpApi from "../utils/api/monitoringPlansApi";

jest.mock("../utils/api/easeyAuthApi", () => ({
  secureAxios: jest.fn().mockResolvedValue({
    status: 200,
    data: [{ testInput: "", beginDate: "2/22/22T123" }],
  }),
}));

// mock get function to return a fa
const controlInputs = {
  input: ["Input", "input", "", ""],
  lockedInput: ["Locked Input", "input", "", "locked"],
  lockedDate: ["Locked Date", "date", "", "locked"],
  date: ["Date", "date", "", ""],
  radio: ["Radio", "radio", "", ""],
  skip: ["Skip", "skip", "", ""],
  blah: ["Blah", "blah", "blah", "blah"],
};

const controlDatePickerInputs = {
  beginDate: ["Start Date", "date", ""],
  beginDate: ["Start Date", "dateTime", ""],
  beginHour: ["Start Time", "time", ""],
  endDate: ["End Date", "date", ""],
  endHour: ["End Time", "time", ""],
  skip: ["skip", "skip", ""],
};

const locationSelectValue = 200;
const mdmData = {
  staticDropdown: [{ staticDropdown: [""] }],
  filteredTest: [{ staticDropdown: [""] }],
};
const mainDropdownName = "";
const staticDropdownFlag = true;
const prefilteredTotalName = "filteredTest";
const result = "";
const boolOptions = [true, false];
const extraControlInputs = false;
describe("create all options for modal input controls", () => {
  test("create method modal input controls", async () => {
    const response = await mpApi.getMonitoringMethods(locationSelectValue);
    const methods = response.data;
    const selectedData = methods[0];

    for (const isCreate of boolOptions) {
      for (const isMats of boolOptions) {
        for (const hasStaticDropdown of boolOptions) {
          const data = modalViewData(
            selectedData,
            controlInputs,
            controlDatePickerInputs,
            isCreate,
            mdmData,
            "",
            mainDropdownName,
            result,
            hasStaticDropdown,
            prefilteredTotalName,
            extraControlInputs,
            isMats
          );

          // Check that the returned modal data match the control and date picker input arrays
          for (const arr of data) {
            if (!Array.isArray(arr[0])) {
              let target =
                controlInputs[arr[0]] || controlDatePickerInputs[arr[0]];
              expect(target).toEqual(target);
            }
          }
        }
      }
    }

    // Test radio button with no selected data
    modalViewData(
      false,
      { radio: ["Radio", "radio", "", ""] },
      {},
      true,
      mdmData,
      "",
      mainDropdownName,
      result,
      staticDropdownFlag,
      prefilteredTotalName,
      extraControlInputs,
      false
    );

    // Test radio button with no selected data
    for (const isCreate of boolOptions) {
      modalViewData(
        false,
        {
          staticDropdown: ["Static Dropdown", "independentDropdown", "", ""],
          mainDropdown: ["Main Dropdown", "mainDropdown", "", ""],
          dropdown: ["Dropdown", "dropdown", "", ""],
          multiSelectDropdown: [
            "Multi Select Dropdown",
            "multiSelectDropdown",
            "",
            "",
          ],
        },
        {},
        isCreate,
        mdmData,
        "filteredTest",
        mainDropdownName,
        result,
        staticDropdownFlag,
        prefilteredTotalName,
        extraControlInputs,
        false
      );
    }
  });
});
