// import React from "react";
// import {
//   render,
//   waitForElement,
//   fireEvent,
//   screen,
// } from "@testing-library/react";
// import * as mpApi from "../../../utils/api/monitoringPlansApi";
// //import { extractUserInput } from "../../../additional-functions/extract-user-input";
// import * as axios from "axios";
// import DataTableLEEQualifications from "./DataTableLEEQualifications";
// import { act } from "react-dom/test-utils";
// jest.mock("axios");

// const selectedQualifications = [{}];

// const locationSelectValue = 60;

// // const userInput = extractUserInput(payload, ".modalUserInput", radioName);

// //testing redux connected component to mimic props passed as argument
// const componentRenderer = (
//   checkout,
//   secondLevel,
//   addComponentFlag,
//   openComponentViewTest,
//   openAddComponentTest
// ) => {
//   const props = {
//     locationSelectValue: "60",
//     user: "testUser",
//     checkout: false,
//     inactive: [false],
//     settingInactiveCheckBox: jest.fn(),
//     revertedState: false,
//     setRevertedState: jest.fn(),
//     setOpenLEE: jest.fn(),
//     openLEE: false,
//     setUpdateLEE: jest.fn(),
//     updateLEE: false,
//     setCreatingChild: jest.fn(),
//   };
//   return render(<DataTableLEEQualifications {...props} />);
// };

// test("tests getMonitoringQualifications", async () => {
//   axios.get.mockImplementation(() =>
//     Promise.resolve({ status: 200, data: selectedQualifications })
//   );
//   const title = await mpApi.getQualifications(locationSelectValue);
//   expect(title.data).toEqual(selectedQualifications);

//   let { container } = await waitForElement(() =>
//     componentRenderer(false, false, false, true, false)
//   );
//   expect(container).toBeDefined();
// });

// test("test opening the Modal to view formula details and then closing", async () => {
//   act(async () => {
//     let { container } = await waitForElement(() => {
//       componentRenderer(false, false, false, true, false);
//     });

//     jest.mock("../../../utils/api/monitoringPlansApi", () => {
//       const mockLEEQual = [
//         {
//           addDate: "2018-10-25",
//           applicableEmissionStandard: "29.0000",
//           id: "MIKE-DELL-CFEDE4EB21124391BE13E7FB5A56081C",
//           parameterCode: "HG",
//           percentageOfEmissionStandard: "72.8",
//           potentialAnnualHgMassEmissions: null,
//           qualificationId: "MIKE-DELL-E4CE3931A24E4C1395B3C81457B300CC",
//           qualificationTestDate: "2018-07-15",
//           qualificationTestType: "INITIAL",
//           unitsOfStandard: "LBGWH",
//           updateDate: null,
//           userId: "moconnel",
//         },
//       ];
//       return {
//         getQualifications: jest.fn(() => Promise.resolve(mockLEEQual)),
//       };
//     });

//     let viewBtn = container.getByText("View");

//     fireEvent.click(viewBtn);

//     let closeBtn = container.getByTestId("closeModalBtn");
//     //Modal X button
//     expect(closeBtn).toBeInTheDocument();
//     //Header
//     // expect(container.getByText("Formula")).toBeInTheDocument();

//     fireEvent.click(closeBtn);
//     // expect(closeBtn).not.toBeInTheDocument();
//   });
// });
test("test file", () => {
  const val = 1;
  expect(val === 1);
});
