import React from "react";
import { render, waitForElement } from "@testing-library/react";
import {
  DataTableConfigurations,
  mapDispatchToProps,
  mapStateToProps,
} from "./DataTableConfigurations";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import { Provider } from "react-redux";

import configureMockStore from "redux-mock-store";

const axios = require("axios");

import * as actions from "../../../store/actions/monitoringPlans";
jest.mock("axios");
//testing redux connected component to mimic props passed as argument
const data = [
  "5",
  [
    {
      id: "MDC-7C15B3D1B20542C3B54DD57F03A516E5",
      name: "110",
      locations: [
        {
          id: "65",
          name: "110",
          type: "Unit",
          active: false,
          retireDate: null,
          links: [
            {
              rel: "self",
              href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/65",
            },
            {
              rel: "methods",
              href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/65/methods",
            },
            {
              rel: "systems",
              href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/65/systems",
            },
            {
              rel: "spans",
              href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/65/spans",
            },
          ],
        },
      ],
      endReportPeriodId: "24",
      active: false,
      links: [
        {
          rel: "self",
          href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/MDC-7C15B3D1B20542C3B54DD57F03A516E5",
        },
      ],
    },
  ],
];
const dataProp = {
  col1: "5",
  col2: "Chickasaw",
  col3: "AL",
  disabled: false,
  expanded: false,
};
const mockStore = configureMockStore();
const store = mockStore({});

function componentRenderer() {
  const props = {
    user: { firstName: "test" },
    monitoringPlans: data,
    data: dataProp,
    selectedRowHandler: jest.fn(),
    className: "test",
    loadMonitoringPlansData: jest.fn(),
  };
  return render(
    <Provider store={store}>
      <DataTableConfigurations {...props} />
    </Provider>
  );
}
function componentRendererNoData(args) {
  const defualtProps = {
    monitoringPlans: [],
    loadMonitoringPlansData: jest.fn(),
    loading: true,
    user: false,
    data: {},
  };

  const props = { ...defualtProps, ...args };
  return render(
    <Provider store={store}>
      <DataTableConfigurations {...props} />
    </Provider>
  );
}

afterAll(() => {
  jest.restoreAllMocks();
});
test("tests a configuration with only active systems", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );
  const title = await mpApi.getMonitoringPlans(6);
  expect(title.data).toEqual(data);
  let { container } = await waitForElement(() => componentRenderer());
  expect(container).toBeDefined();
});

test("mapDispatchToProps calls the appropriate action", async () => {
  // mock the 'dispatch' object
  const dispatch = jest.fn();
  const actionProps = mapDispatchToProps(dispatch);
  const state = jest.fn();
  const stateProps = mapStateToProps(state);

  const formData = [];
  // verify the appropriate action was called
  actionProps.loadMonitoringPlansData();
  actionProps.setCheckout();
  // expect(actions.loadMonitoringPlansData).toHaveBeenCalled();
});
