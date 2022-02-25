import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import { MonitoringPlanTabRender } from "./MonitoringPlanTabRender";
import { act } from "react-dom/test-utils";
import configureMockStore from "redux-mock-store";
import * as mpApi from "../../utils/api/monitoringPlansApi";
const axios = require("axios");
jest.mock("axios");

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

function componentRenderer(checkout) {
  const props = {
    title: " ( test ) ",
    user: { firstName: "test" },
    locations: selectedConfig.locations,
    selectedConfig: selectedConfig,
    setSectionSelect: jest.fn(),
    setLocationSelect: jest.fn(),
    sectionSelect: [3, "Methods"],
    locationSelect: [0, "65"],
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
  return render(<MonitoringPlanTabRender {...props} />);
}

function componentRendererCheckout() {
  const props = {
    title: " ( test ) ",
    user: { firstName: "test" },
    locations: selectedConfig.locations,
    selectedConfig: selectedConfig,
    setSectionSelect: jest.fn(),
    setLocationSelect: jest.fn(),
    sectionSelect: [3, "Methods"],
    locationSelect: [0, "65"],
    orisCode: "5",
    checkout: true,
    inactive: [false, true],

    configID: selectedConfig.id,

    setCheckout: jest.fn(),
    setInactive: jest.fn(),
  };
  return render(<MonitoringPlanTabRender {...props} />);
}

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
afterEach(() => {
  jest.restoreAllMocks();
});
test("tests api call post/get/delete", async () => {
  axios.get.mockImplementation((url) => {
    switch (url) {
      case "/users.json":
        return Promise.resolve({ data: [{ name: "Bob", items: [] }] });
      case "/items.json":
        return Promise.resolve({ data: [{ id: 1 }, { id: 2 }] });
      default:
        return Promise.reject(new Error("not found"));
    }
  });

  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );

  axios.post.mockImplementation((url) => {
    switch (url) {
      case "/users.json":
        return Promise.resolve({ data: [{ name: "Bob", items: [] }] });
      case "/items.json":
        return Promise.resolve({ data: [{ id: 1 }, { id: 2 }] });
      default:
        return Promise.reject(new Error("not found"));
    }
  });

  axios.post.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );

  axios.delete.mockImplementation((url) => {
    switch (url) {
      case "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/workspace/plans/MDC-7C15B3D1B20542C3B54DD57F03A516E5/check-outs":
        return Promise.resolve({ data: [{ name: "Bob", items: [] }] });
      case "/items.json":
        return Promise.resolve({ data: [{ id: 1 }, { id: 2 }] });
      default:
        return Promise.reject(new Error(url));
    }
  });
  axios.delete.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );
  const title = await mpApi.getMonitoringMatsMethods(6);

  const deleteId = await mpApi.deleteCheckInMonitoringPlanConfiguration(5);

  const postId = await mpApi.postCheckoutMonitoringPlanConfiguration(5, {
    firstName: "test1",
  });
  let { container } = await waitForElement(() => componentRenderer(true));
  fireEvent.click(container.querySelector("#checkInBTN"));
  // fireEvent.click(container.querySelector("#checkOutBTN"));
  expect(container).toBeDefined();
});
test("tests api calls with undefined condiitonal", async () => {
  axios.get.mockImplementation((url) => {
    switch (url) {
      case "/users.json":
        return Promise.resolve({ data: undefined });
      case "/items.json":
        return Promise.resolve({ data: [{ id: 1 }, { id: 2 }] });
      default:
        return Promise.reject(new Error("not found"));
    }
  });
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );

  axios.post.mockImplementation((url) => {
    switch (url) {
      case "/users.json":
        return Promise.resolve({ data: undefined });
      case "/items.json":
        return Promise.resolve({ data: [{ id: 1 }, { id: 2 }] });
      default:
        return Promise.reject(new Error("not found"));
    }
  });
  axios.post.mockImplementation(() =>
    Promise.resolve({ status: 200, data: undefined })
  );

  axios.delete.mockImplementation((url) => {
    switch (url) {
      case "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/workspace/plans/MDC-7C15B3D1B20542C3B54DD57F03A516E5/check-outs":
        return Promise.resolve({ data: undefined });
      case "/items.json":
        return Promise.resolve({ data: [{ id: 1 }, { id: 2 }] });
      default:
        return Promise.reject(new Error(url));
    }
  });

  axios.delete.mockImplementation(() =>
    Promise.resolve({ status: 200, data: undefined })
  );

  const title = await mpApi.getMonitoringMatsMethods(6);

  const deleteId = await mpApi.deleteCheckInMonitoringPlanConfiguration(5);

  const postId = await mpApi.postCheckoutMonitoringPlanConfiguration(5, {
    firstName: "test1",
  });

  let { container } = await waitForElement(() => componentRenderer(true));
  fireEvent.click(container.querySelector("#checkInBTN"));
  expect(container).toBeDefined();
});

test("tests inactivity timer api calls ", async () => {
  axios.put.mockImplementation((url) => {
    switch (url) {
      case "/users.json":
        return Promise.resolve({ data: undefined });
      case "/items.json":
        return Promise.resolve({ data: [{ id: 1 }, { id: 2 }] });
      default:
        return Promise.reject(new Error("not found"));
    }
  });
  axios.post.mockImplementation(() =>
    Promise.resolve({ status: 200, data: undefined })
  );
  axios.post.mockImplementation((url) => {
    switch (url) {
      case "/users.json":
        return Promise.resolve({ data: undefined });
      case "/items.json":
        return Promise.resolve({ data: [{ id: 1 }, { id: 2 }] });
      default:
        return Promise.reject(new Error("not found"));
    }
  });
  axios.post.mockImplementation(() =>
    Promise.resolve({ status: 200, data: undefined })
  );
  const postId = await mpApi.postCheckoutMonitoringPlanConfiguration(6, {
    firstName: "test1",
  });
  const title = await mpApi.putLockTimerUpdateConfiguration(6);

  let { container } = await waitForElement(() => componentRenderer(false));
  fireEvent.click(container.querySelector("#testingBtn"));

  expect(container).toBeDefined();
});

describe("67440874", () => {
  let wrapper;

  beforeAll(() => {
    jest.useFakeTimers();
    const columns = [
      { name: "ORIS", selector: "col1", sortable: true },
      { name: "Methodology", selector: "col2", sortable: true },
      { name: "Substitute Data Approach", selector: "col3", sortable: true },
    ];
    const columnNames = ["ORIS", "Methodology", "Substitute Data Approach"];
    const data = [
      { col1: "HI", col2: "CALC", col3: null, disabled: false, expanded: true },
      { col1: "OP", col2: "EXP", col3: null, disabled: true, expanded: true },
      { col1: "HI", col2: "AD", col3: "SPTS", disabled: true, expanded: false },
    ];
  });
});
//   test("...", async () => {
//     const props = {
//       title: " ( test ) ",
//       user: { firstName: "test" },
//       locations: selectedConfig.locations,
//       selectedConfig: selectedConfig,
//       setSectionSelect: jest.fn(),
//       setLocationSelect: jest.fn(),
//       sectionSelect: [3, "Methods"],
//       locationSelect: [0, "65"],
//       orisCode: "5",
//       checkout: true,
//       inactive: [false, true],
//       checkedOutLocations: [
//         {
//           facId: 655,
//           monPlanId: "MDC-7C15B3D1B20542C3B54DD57F03A516E5",
//           checkedOutBy: "test",
//         },],
//       configID: selectedConfig.id,

//       setCheckout: jest.fn(),
//       setInactive: jest.fn(),
//     };

//     wrapper = await mount(<MonitoringPlanTabRender {...props} />);
//     let checkInBTN = wrapper.find("#checkInBTN");
//     let checkOutBTN = wrapper.find("#checkOutBTN");
//     expect(checkOutBTN).toBeDefined();
//     expect(checkInBTN).toBeDefined();
//     act(() => {
//       jest.runOnlyPendingTimers();
//       wrapper.update();
//     });

//     // let checkOutBTN = wrapper.find("#checkOutBTN");
//     expect(checkOutBTN).toBeDefined();
//     // expect(addBtn).toBeDefined();
//   });
// });
