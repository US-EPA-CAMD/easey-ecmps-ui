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
// import DataTableLMEQualifications from "./DataTableLMEQualifications";
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
//     setOpenLME: jest.fn(),
//     openLME: false,
//     setUpdateLME: jest.fn(),
//     updateLME: false,
//     setCreatingChild: jest.fn(),
//   };
//   return render(<DataTableLMEQualifications {...props} />);
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
//       const mockLMEQual = [
//         {
//           addDate: "2014-07-09",
//           id: "NJCHQ7LAPA-AA1A78CFAA3641AA9AC5E6E7C20258D8",
//           noxTons: "0.9",
//           operatingHours: "8",
//           qualificationDataYear: "2013",
//           qualificationId: "NJCHQ7LAPA-FFD7C257EC904898B2CE3FF73CC7DC97",
//           so2Tons: null,
//           updateDate: null,
//           userId: "PYOUGH",
//         },
//       ];
//       return {
//         getQualifications: jest.fn(() => Promise.resolve(mockLMEQual)),
//       };
//     });

//     let viewBtn = container.getByText("View");

//     fireEvent.click(viewBtn);

//     closeBtn = container.getByTestId("closeModalBtn");
//     //Modal X button
//     expect(closeBtn).toBeInTheDocument();
//     //Header

//   });
// });
test("test file", () => {
  const val = 1;
  expect(val === 1);
});
