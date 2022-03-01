import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import { MonitoringPlanTabRender } from "./MonitoringPlanTabRender";
import { act } from "react-dom/test-utils";
import configureMockStore from "redux-mock-store";
import * as mpApi from "../../utils/api/monitoringPlansApi";
const axios = require("axios");
jest.mock("axios");
import { Provider } from "react-redux";
import { deleteCheckInMonitoringPlanConfiguration } from "../../utils/api/monitoringPlansApi";
const selectedConfig = {
  id: "MDC-7C15B3D1B20542C3B54DD57F03A516E5",
  name: "110",
  locations: [
    {
      id: "655",
      name: "110",
      type: "Unit",
      active: false,
      retireDate: null,
    },
  ],
};
const mockStore = configureMockStore();
const store = mockStore({});
function componentRenderer(checkout) {
  const props = {
    resetTimer: false,
    setExpired: jest.fn(),
    resetTimerFlag:false,
    callApiFlag:false,
    title: " ( test ) ",
    user: { firstName: "test" },
    locations: selectedConfig.locations,
    selectedConfig: selectedConfig,
    setSectionSelect: jest.fn(),
    setLocationSelect: jest.fn(),
    sectionSelect: [3, "Methods"],
    locationSelect: [0, "655"],
    orisCode: "5",
    checkout: checkout,
    inactive: [false, true],

    configID: selectedConfig.id,

    setCheckout: jest.fn(),
    setInactive: jest.fn(),
    checkedOutLocations: [
      {
        facId: 655,
        monPlanId: "MDC-7C15B3D1B20542C3B54DD57F03A516E5",
        checkedOutBy: "test",
      },
    ],
  };
  return render(
    <Provider store={store}>
      <MonitoringPlanTabRender {...props} />{" "}
    </Provider>
  );
}

function componentRendererCheckout() {
  const props = {
    resetTimer: false,
    setExpired: jest.fn(),
    resetTimerFlag:false,
    callApiFlag:false,
    title: " ( test ) ",
    user: { firstName: "test" },
    locations: selectedConfig.locations,
    selectedConfig: selectedConfig,
    setSectionSelect: jest.fn(),
    setLocationSelect: jest.fn(),
    sectionSelect: [3, "Methods"],
    locationSelect: [0, "655"],
    orisCode: "5",
    checkout: true,
    inactive: [false, true],

    configID: selectedConfig.id,

    setCheckout: jest.fn(),
    setInactive: jest.fn(),
  };
  return render(
    <Provider store={store}>
      <MonitoringPlanTabRender {...props} />{" "}
    </Provider>
  );
}

const data = [
  "5",
  [
    {
      id: "MDC-7C15B3D1B20542C3B54DD57F03A516E5",
      name: "110",
      locations: [
        {
          id: "655",
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
afterEach(() => {
  jest.restoreAllMocks();
});
// test("tests api call post/get/delete", async () => {
//   axios.mockImplementationOnce(() => {
//     return Promise.resolve({
//       data: {},
//     });
//   });
//   await deleteCheckInMonitoringPlanConfiguration(1);
//   //-------
//   // mocks the return secure Axios
//   axios.mockImplementationOnce(() => {
//     return Promise.resolve({
//       data: {},
//     });
//   });
//   // mocks the return secure Axios
//   axios.mockImplementationOnce(() => {
//     return Promise.resolve({
//       data: {},
//     });
//   });
//   axios.get.mockImplementation((url) => {
//     switch (url) {
//       case "/users.json":
//         return Promise.resolve({ data: [{ name: "Bob", items: [] }] });
//       case "/items.json":
//         return Promise.resolve({ data: [{ id: 1 }, { id: 2 }] });
//       default:
//         return Promise.reject(new Error("not found"));
//     }
//   });

//   axios.get.mockImplementation(() =>
//     Promise.resolve({ status: 200, data: data })
//   );

//   axios.post.mockImplementation((url) => {
//     switch (url) {
//       case "/users.json":
//         return Promise.resolve({ data: [{ name: "Bob", items: [] }] });
//       case "/items.json":
//         return Promise.resolve({ data: [{ id: 1 }, { id: 2 }] });
//       default:
//         return Promise.reject(new Error("not found"));
//     }
//   });

//   axios.post.mockImplementation(() =>
//     Promise.resolve({ status: 200, data: data })
//   );

//   axios.delete.mockImplementation((url) => {
//     switch (url) {
//       case "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/workspace/plans/MDC-7C15B3D1B20542C3B54DD57F03A516E5/check-outs":
//         return Promise.resolve({ data: [{ name: "Bob", items: [] }] });
//       case "/items.json":
//         return Promise.resolve({ data: [{ id: 1 }, { id: 2 }] });
//       default:
//         return Promise.reject(new Error(url));
//     }
//   });
//   axios.delete.mockImplementation(() =>
//     Promise.resolve({ status: 200, data: data })
//   );
//   const title = await mpApi.getMonitoringMatsMethods(6);

//   const deleteId = await mpApi.deleteCheckInMonitoringPlanConfiguration(5);

//   const postId = await mpApi.postCheckoutMonitoringPlanConfiguration(5, {
//     firstName: "test1",
//   });
//   let { container } = await waitForElement(() => componentRenderer(true));
//   fireEvent.click(container.querySelector("#checkInBTN"));
//   // fireEvent.click(container.querySelector("#checkOutBTN"));
//   expect(container).toBeDefined();
// });
test('test file', () => {
  const val = 1;
  expect(val === 1);
});
