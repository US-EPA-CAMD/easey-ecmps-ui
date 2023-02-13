import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import {
  SelectFacilitiesDataTable,
  mapStateToProps,
} from "./SelectFacilitiesDataTable";
import { Provider } from "react-redux";
import * as facilitiesApi from "../../../utils/api/facilityApi";
import configureMockStore from "redux-mock-store";
//testing redux connected component to mimic props passed as argument

const mockStore = configureMockStore();
const store = mockStore({});
const axios = require("axios");
jest.mock("axios");

function componentRenderer(args) {
  const defualtProps = {
    user: { firstName: "test" },
    addtabs: jest.fn(),
    openedFacilityTabs: [],
    mostRecentlyCheckedInMonitorPlanIdForTab: [],
    setMostRecentlyCheckedInMonitorPlanIdForTab: jest.fn(),
  };

  const props = { ...defualtProps, ...args };
  return render(
    <Provider store={store}>
      <SelectFacilitiesDataTable {...props} />
    </Provider>
  );
}

function componentRendererNoData(args) {
  const defualtProps = {
    facilities: [],
    loadFacilitiesData: jest.fn(),
    loading: true,
  };

  const props = { ...defualtProps, ...args };
  return render(
    <Provider store={store}>
      <SelectFacilitiesDataTable {...props} />
    </Provider>
  );
}

const data = [
  {
    monPlanId: "test",
    facilityId: "3",
    facilityName: "Barry",
    state: "AL",
  },
  {
    monPlanId: "2",
    facilityId: "5",
    facilityName: "Chickasaw",
    state: "AL",
  },
];
// edgecase in addtabs function
const unmatchedData = [
  {
    monPlanId: "testunmatched",
    facilityId: "3",
    facilityName: "Barry",
    state: "AL",
  },
];
beforeEach(() => {
  jest.setTimeout(60000);
  jest.mock("axios");
});
afterEach(() => {
  jest.clearAllMocks();
});

/*
test("testing redux connected data-table component renders all records", async () => {
  axios.mockImplementation(() => Promise.resolve({ status: 200, data: data }));

  const title = await facilitiesApi.getAllFacilities();
  expect(title.data).toEqual(data);

  let { container } = await waitForElement(() => componentRenderer());
  expect(container).toBeDefined();
  const headerColumns = container.querySelectorAll("tbody tr");
  let backBtns = container.querySelector("#testingBtn");
  fireEvent.click(backBtns);

  expect(headerColumns.length).toEqual(5);
});
*/

test("testing edge cases in add tabs function-  unmatched id ", async () => {
  axios.mockImplementation(() =>
    Promise.resolve({ status: 200, data: unmatchedData })
  );

  const title = await facilitiesApi.getAllFacilities();
  expect(title.data).toEqual(unmatchedData);

  let { container } = await waitForElement(() => componentRenderer());
  let backBtns = container.querySelector("#testingBtn");
  fireEvent.click(backBtns);
  expect(container).toBeDefined();
});

test("testing edge cases in add tabs function-  no checkedout locations ", async () => {
  axios.mockImplementation(() => Promise.resolve({ status: 200, data: [] }));

  let { container } = await waitForElement(() => componentRenderer());
  let backBtns = container.querySelector("#testingBtn");
  fireEvent.click(backBtns);
  expect(container).toBeDefined();
});
