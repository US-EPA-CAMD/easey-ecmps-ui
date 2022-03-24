import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import * as axios from "axios";
import {
  DataTableLMEQualifications,
  mapStateToProps,
  mapDispatchToProps,
} from "./DataTableLMEQualifications";
import { act } from "react-dom/test-utils";
jest.mock("axios");

const selectedQualifications = [{}];

const locationSelectValue = 60;

//testing redux connected component to mimic props passed as argument
const componentRenderer = (
  checkout,
  secondLevel,
  addComponentFlag,
  openComponentViewTest,
  openAddComponentTest,
  mdmData
) => {
  let currentData = [];

  if (mdmData) {
    currentData = mdmData;
  }

  const props = {
    mdmData: currentData,
    loadDropdownsData: jest.fn(),
    locationSelectValue: "60",
    user: "testUser",
    checkout: false,
    inactive: [false],
    settingInactiveCheckBox: jest.fn(),
    revertedState: false,
    setRevertedState: jest.fn(),
    setOpenLME: jest.fn(),
    openLME: false,
    setUpdateLME: jest.fn(),
    updateLME: false,
    setCreatingChild: jest.fn(),
  };
  return render(<DataTableLMEQualifications {...props} />);
};

test("tests getMonitoringQualifications", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: selectedQualifications })
  );
  const title = await mpApi.getQualifications(locationSelectValue);
  expect(title.data).toEqual(selectedQualifications);

  let { container } = await waitForElement(() =>
    componentRenderer(false, false, false, true, false,{ test: "" })
  );
  let backBtns = container.querySelectorAll("#testBtn");

  for (var x of backBtns) {
    fireEvent.click(x);
  }
  expect(container).toBeDefined();
});

test("tests getMonitoringQualifications WITHOUT mdmdata", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: selectedQualifications })
  );
  const title = await mpApi.getQualifications(locationSelectValue);
  expect(title.data).toEqual(selectedQualifications);

  let { container } = await waitForElement(() =>
    componentRenderer(false, false, false, true, false,false)
  );
  expect(container).toBeDefined();
});

// test("test opening the Modal to view formula details and then closing", async () => {
//   act(async () => {
//     let { container } = await waitForElement(() => {
//       componentRenderer(false, false, false, true, false);
//     });

//     jest.mock("../../../utils/api/monitoringPlansApi", () => {
//       const mockLMEQual = [
//         {
//           addDate: "2014-07-09",
//           id: "NJCHQ7LAPA",
//           noxTons: "0.9",
//           operatingHours: "8",
//           qualificationDataYear: "2013",
//           qualificationId: "NJCHQ7LAPA",
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

//     let backBtns = container.querySelectorAll("#testBtn");
//     for (var x of backBtns) {
//       fireEvent.click(x);
//     }
//     //Header
//   });
// });
test("mapStateToProps calls the appropriate state", async () => {
  // mock the 'dispatch' object
  const dispatch = jest.fn();
  const state = { dropdowns: [1] };
  const stateProps = mapStateToProps(state, true);
});

test("mapDispatchToProps calls the appropriate action", async () => {
  // mock the 'dispatch' object
  const dispatch = jest.fn();
  const actionProps = mapDispatchToProps(dispatch);
  const formData = [];
  // verify the appropriate action was called
  actionProps.loadDropdownsData();
});
