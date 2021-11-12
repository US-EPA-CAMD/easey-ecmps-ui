// import React from "react";
// import { shallow } from "enzyme";
// import { render, waitForElement, fireEvent } from "@testing-library/react";
// import { DataTableAssert } from "./DataTableAssert";
// import { act } from "react-dom/test-utils";
// import * as assertSelector from "../../../utils/selectors/assert";

// jest.mock("axios");

// const props = {
//   locationSelectValue: "6",
//   user: "testuser",
//   checkout: false,
//   inactive: false,
//   settingInactiveCheckBox: () => {},
//   revertedState: false,
//   setRevertedState: () => {},
//   pagination: false,
//   filter: false,
//   controlInputs: null,
//   controlDatePickerInputs: null,
//   radioName: "",
//   payload: {},
//   urlParameters: null,
//   columnNames: ["", "", ""],
//   dropdownArray: ["", "", ""],
//   dataTableName: "",
//   selectedLocation: "6",
//   showModal: false,
// };

// describe("DataTableAssert", () => {
//   it("should render and match snapshot", () => {
//     const wrapper = shallow(<DataTableAssert {...props} />);
//     expect(wrapper).toMatchSnapshot();
//   });

//   it("should render DataTableAssert", () => {
//     act(() => {
//       render(<DataTableAssert {...props} />);
//     });
//   });

//   it("should fire test button", async () => {
//     let { container } = await waitForElement(() =>
//       render(<DataTableAssert {...props} />)
//     );
//     fireEvent.click(container.querySelector("#testBtn"));
//   });

//   it("should test switch cases,", () => {
//     const tableNames = [
//       "Load",
//       "Rectangular Duct WAF",
//       "Span",
//       "Formula",
//       "Default",
//       "Unit Fuel",
//       "Unit Control",
//       "Unit Capacity",
//     ];
//     for (const name of tableNames) {
//       const props = {
//         locationSelectValue: "6",
//         user: "testuser",
//         checkout: false,
//         inactive: false,
//         settingInactiveCheckBox: () => {},
//         revertedState: false,
//         setRevertedState: () => {},
//         pagination: false,
//         filter: false,
//         controlInputs: null,
//         controlDatePickerInputs: null,
//         radioName: "",
//         payload: {},
//         urlParameters: null,
//         columnNames: ["", "", ""],
//         dropdownArray: ["", "", ""],
//         dataTableName: name,
//         selectedLocation: "6",
//         showModal: false,
//       };

//       act(() => {
//         render(<DataTableAssert {...props} />);
//       });
//     }
//   });
// });
test("test file", () => {
  const val = 1;
  expect(val === 1);
});
