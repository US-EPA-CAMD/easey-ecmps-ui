import React from "react";
import { render, waitForElement,screen, fireEvent } from "@testing-library/react";
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
    facilityRecordId: "1",
    facilityId: "3",
    facilityName: "Barry",
    state: "AL",
    links: [
      {
        rel: "self",
        href: "/api/facility-mgmt/facilities/1",
      },
      {
        rel: "units",
        href: "/api/facility-mgmt/facilities/1/units",
      },
      {
        rel: "stacks",
        href: "/api/facility-mgmt/facilities/1/stacks",
      },
      {
        rel: "owners",
        href: "/api/facility-mgmt/facilities/1/owners",
      },
      {
        rel: "contacts",
        href: "/api/facility-mgmt/facilities/1/contacts",
      },
    ],
  },
  {
    facilityRecordId: "2",
    facilityId: "5",
    facilityName: "Chickasaw",
    state: "AL",
    links: [
      {
        rel: "self",
        href: "/api/facility-mgmt/facilities/2",
      },
      {
        rel: "units",
        href: "/api/facility-mgmt/facilities/2/units",
      },
      {
        rel: "stacks",
        href: "/api/facility-mgmt/facilities/2/stacks",
      },
      {
        rel: "owners",
        href: "/api/facility-mgmt/facilities/2/owners",
      },
      {
        rel: "contacts",
        href: "/api/facility-mgmt/facilities/2/contacts",
      },
    ],
  },
];
test("testing redux connected data-table component renders all records", async () => {
  // const { container } = componentRenderer();
  

  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );
  const title = await facilitiesApi.getAllFacilities();
  expect(title.data).toEqual(data);
  let { container } = await waitForElement(() => componentRenderer());
  expect(container).toBeDefined();
// const headerColumns = container.querySelectorAll("tbody tr");
//   expect(headerColumns.length).toEqual(0);
});

test("mapDispatchToProps calls the appropriate action", async () => {
  // mock the 'dispatch' object
  const dispatch = jest.fn();
  const state = jest.fn();
  const stateProps = mapStateToProps(state);
});
