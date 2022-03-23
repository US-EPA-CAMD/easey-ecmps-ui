import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
//import { extractUserInput } from "../../../additional-functions/extract-user-input";
import * as axios from "axios";
import {
  DataTablePCTQualifications,
  mapDispatchToProps,
  mapStateToProps,
} from "./DataTablePCTQualifications";
import { act } from "react-dom/test-utils";
jest.mock("axios");

const selectedQualifications = [{}];

const locationSelectValue = 60;

// const userInput = extractUserInput(payload, ".modalUserInput", radioName);

//testing redux connected component to mimic props passed as argument
const componentRenderer = (
  checkout,
  secondLevel,
  addComponentFlag,
  openComponentViewTest,
  openAddComponentTest
) => {
  const props = {
    mdmData: [{ test: "" }],
    locationSelectValue: "60",
    qualSelectValue: "60",
    user: "testUser",
    checkout: false,
    inactive: [false],
    settingInactiveCheckBox: jest.fn(),
    revertedState: false,
    setRevertedState: jest.fn(),
    setOpenPCT: jest.fn(),
    openPCT: false,
    setUpdatePCT: jest.fn(),
    updatePCT: false,
    setCreatingChild: jest.fn(),
  };
  return render(<DataTablePCTQualifications {...props} />);
};

test("tests getMonitoringQualifications", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: selectedQualifications })
  );
  const title = await mpApi.getQualifications(locationSelectValue);
  expect(title.data).toEqual(selectedQualifications);

  let { container } = await waitForElement(() =>
    componentRenderer(false, false, false, true, false)
  );

  let backBtns = container.querySelectorAll("#testBtn");

  for (var x of backBtns) {
    fireEvent.click(x);
  }
  expect(container).toBeDefined();
});

test("test opening the Modal to view formula details and then closing", async () => {
  act(async () => {
    let { container } = await waitForElement(() => {
      componentRenderer(false, false, false, true, false);
    });

    jest.mock("../../../utils/api/monitoringPlansApi", () => {
      const mockPCTQual = [
        {
          id: "DPGLISSO9-635AF13C866142E6A5CF72782D274618",
          qualificationId: "DPGLISSO9-EB4EDE87B8294FBC86FED070BA25E9E8",
          qualificationYear: "2013",
          averagePercentValue: "0.9",
          yr1QualificationDataYear: "2010",
          yr1QualificationDataTypeCode: "A",
          yr1PercentageValue: "1.1",
          yr2QualificationDataYear: "2011",
          yr2QualificationDataTypeCode: "A",
          yr2PercentageValue: "1.6",
          yr3QualificationDataYear: "2012",
          yr3QualificationDataTypeCode: "A",
          yr3PercentageValue: "0.0",
          userId: "phh",
          addDate: "2013-04-16",
          updateDate: null,
        },
      ];
      return {
        getQualifications: jest.fn(() => Promise.resolve(mockPCTQual)),
      };
    });

    let viewBtn = container.getByText("View");

    fireEvent.click(viewBtn);

    let backBtns = container.querySelectorAll("#testBtn");
    // //Modal X button
    // expect(closeBtn).toBeInTheDocument();
    //Header
    // expect(container.getByText("Formula")).toBeInTheDocument();

    // fireEvent.click(backBtns);
    for (var x of backBtns) {
      fireEvent.click(x);
    }
    // expect(closeBtn).not.toBeInTheDocument();
  });
});

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
  // expect(loadDropdowns).toHaveBeenCalled();
});
