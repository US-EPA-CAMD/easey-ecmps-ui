import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import DataTableFuelData from "./DataTableFuelData";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import * as axios from "axios";
jest.mock("axios");

const selectedFuelData = [{}];

const locationSelectValue = 6;

//testing redux connected component to mimic props passed as argument
const componentRenderer = (
  checkout,
  secondLevel,
  addComponentFlag,
  openComponentViewTest,
  openAddComponentTest
) => {
  const props = {
    locationSelectValue: "1111",
    user: "testUser",
    checkout: false,
    inactive: [false],
    settingInactiveCheckBox: jest.fn(),
    revertedState: false,
    selectedLocation: { id: "8", unitRedordId: "3" },
    setRevertedState: jest.fn(),
  };
  return render(<DataTableFuelData {...props} />);
};

test("tests getMonitoringPlansFuelDataRecords", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: selectedFuelData })
  );
  const title = await mpApi.getMonitoringPlansFuelDataRecords(locationSelectValue);
  expect(title.data).toEqual(selectedFuelData);

  let { container } = await waitForElement(() =>
    componentRenderer(false, false, false, true, false)
  );
  expect(container).toBeDefined();
});


test('test opening the Modal to view formula details and then closing', async () => {
  act(async () => {

    let { container } = await waitForElement(() => {
      componentRenderer(false, false, false, true, false);
    });

    jest.mock("../../../utils/api/monitoringPlansApi", () => {
      const mockFormulas = [{
        locationId: 6,
        id: "8",
        unitId: "3",
        fuelCode: "DSL",
        indicatorCode: "S",
        ozoneSeasonIndicator: "0",
        demGCV: null,
        demSO2: null,
        beginDate: "1995-01-01T00:00:00.000Z",
        endDate: "2015-08-24T00:00:00.000Z",
        actualOrProjectCode: "A",
        sulfurContent: null,
        userId: "bvick",
        addDate: "2009-02-20T00:00:00.000Z",
        updateDate: "2015-10-22T00:00:00.000Z",
        active: false
      }];
      return {
        getMonitoringPlansFuelDataRecords: jest.fn(() => Promise.resolve(mockFormulas))
      }
    });

    viewBtn = container.getByText('View');

    fireEvent.click(viewBtn);

    closeBtn = container.getByTestId('closeModalBtn')
    //Modal X button
    expect(closeBtn).toBeInTheDocument();
    //Header
    expect(container.getByText('Unit Fuel')).toBeInTheDocument();

    fireEvent.click(closeBtn);
    expect(closeBtn).not.toBeInTheDocument();

    fireEvent.click(container.querySelector("#testingBtn"));
    fireEvent.click(container.querySelector("#testingBtn2"));
    fireEvent.click(container.querySelector("#testingBtn3"));
  });
});
