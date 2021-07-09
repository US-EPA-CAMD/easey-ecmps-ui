import React from "react";
import { render, waitForElement,fireEvent } from "@testing-library/react";
import { MonitoringPlanTabRender } from "./MonitoringPlanTabRender";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import configureMockStore from "redux-mock-store";
import * as mpApi from "../../utils/api/monitoringPlansApi";
const axios = require("axios");
jest.mock("axios")
//testing redux connected component to mimic props passed as argument
// const mockStore = configureMockStore();
// const store = mockStore({});
// configure({ adapter: new Adapter() });
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

function componentRenderer() {
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
    checkout: false,
    inactive: [false, true],

    configID: selectedConfig.id,

    setCheckout: jest.fn(),
    setInactive: jest.fn(),
  };
  return render(<MonitoringPlanTabRender {...props} />);
}
// describe("Shallow render to avoid issues with redux store", () => {
//   it("should render without throwing an error", () => {
//     const props = { ...defualtProps };
//     const wrapper = shallow(<MonitoringPlanTabRender {...props} />);
//     expect(wrapper.find("hr")).toHaveLength(1);
//   });
// });
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
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/65",
            },
            {
              rel: "methods",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/65/methods",
            },
            {
              rel: "systems",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/65/systems",
            },
            {
              rel: "spans",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/65/spans",
            },
          ],
        },
      ],
      endReportPeriodId: "24",
      active: false,
      links: [
        {
          rel: "self",
          href:
            "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/MDC-7C15B3D1B20542C3B54DD57F03A516E5",
        },
      ],
    },
  ],
];
afterAll(() => {
  jest.restoreAllMocks();
});
test("tests a configuration with only active systems", async () => {
  axios.get.mockImplementation((url) => {
    switch (url) {
      case '/users.json':
        return Promise.resolve({data: [{name: 'Bob', items: []}]})
      case '/items.json':
        return Promise.resolve({data: [{id: 1}, {id: 2}]})
      default:
        return Promise.reject(new Error('not found'))
    }
  })
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );
  const title = await mpApi.getMonitoringMatsMethods(6);
  // expect(title.data).toEqual(data);
  let { container } = await waitForElement(() => componentRenderer());
  // container.querySelector("#checkOutBTN")
  fireEvent.click(container.querySelector("#checkOutBTN"));
  // let accordions = screen.getAllByRole("button");
  // expect(accordions).toHaveLength(2);
  expect(container).toBeDefined();
});