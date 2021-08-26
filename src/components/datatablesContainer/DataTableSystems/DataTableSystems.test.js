import React from "react";
import { render, waitForElement } from "@testing-library/react";
import { DataTableSystems } from "./DataTableSystems";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
const axios = require("axios");
const DataTableSystemsfunction = require("./DataTableSystems");
jest.mock("axios");
const systemsDataActiveOnly = [
  {
    id: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
    locationId: "6",
    maximumFuelFlowRateSourceCode: "GAS",
    systemDesignationCode: "P",
    monitoringSystemId: "AF1",
    systemFuelFlowUOMCode: "PNG",
    beginDate: "2019-07-01",
    endDate: null,
    beginHour: "0",
    endHour: null,
    active: true,
  },
  {
    id: "TWCORNEL5-10B54DDC6DBF4DF3B309251288E83E12",
    locationId: "6",
    maximumFuelFlowRateSourceCode: "GAS",
    systemDesignationCode: "P",
    monitoringSystemId: "AF2",
    systemFuelFlowUOMCode: "PNG",
    beginDate: "2019-07-01",
    endDate: null,
    beginHour: "0",
    endHour: null,
    active: true,
  },
];

const systemData = [
  {
    id: "CAMD-DDD452F9F99344048EFB96C42432C0ED",
    locationId: "5",
    maximumFuelFlowRateSourceCode: "OP",
    systemDesignationCode: "P",
    monitoringSystemId: "AA5",
    systemFuelFlowUOMCode: "NFS",
    beginDate: "1993-10-01",
    endDate: "2018-10-02",
    beginHour: "0",
    endHour: "23",
    active: false,
  },
  {
    id: "CAMD-7903CC3112AF47F797D1F0E58EDB486E",
    locationId: "5",
    maximumFuelFlowRateSourceCode: "SO2",
    systemDesignationCode: "P",
    monitoringSystemId: "AA1",
    systemFuelFlowUOMCode: "NFS",
    beginDate: "1993-10-01",
    endDate: "2019-06-30",
    beginHour: "0",
    endHour: "23",
    active: false,
  },
  {
    id: "CAMD-F0470799B81840DB81B5BBD810F9EE15",
    locationId: "5",
    maximumFuelFlowRateSourceCode: "NOX",
    systemDesignationCode: "P",
    monitoringSystemId: "AA2",
    systemFuelFlowUOMCode: "NFS",
    beginDate: "1993-10-01",
    endDate: null,
    beginHour: "0",
    endHour: null,
    active: true,
  },
  {
    id: "CAMD-F5E1F18322AB4688982A8E4633001B12",
    locationId: "5",
    maximumFuelFlowRateSourceCode: "CO2",
    systemDesignationCode: "P",
    monitoringSystemId: "AA3",
    systemFuelFlowUOMCode: "NFS",
    beginDate: "1993-10-01",
    endDate: "2019-06-30",
    beginHour: "0",
    endHour: "23",
    active: false,
  },
  {
    id: "CAMD-51F3958C85DE4A0BB7DA47F2D1EDE131",
    locationId: "5",
    maximumFuelFlowRateSourceCode: "FLOW",
    systemDesignationCode: "P",
    monitoringSystemId: "AA4",
    systemFuelFlowUOMCode: "NFS",
    beginDate: "1993-10-01",
    endDate: "2019-06-30",
    beginHour: "0",
    endHour: "23",
    active: false,
  },
];

const systemsInactiveOnly = [
  {
    id: "CAMD-0BEB1B660CA54089B7C1CC2CC3297C85",
    locationId: "76",
    maximumFuelFlowRateSourceCode: "OP",
    systemDesignationCode: "P",
    monitoringSystemId: "DB5",
    systemFuelFlowUOMCode: "NFS",
    beginDate: "1994-11-01",
    endDate: "2007-09-30",
    beginHour: "0",
    endHour: "23",
    active: false,
  },
];

const componentRenderer = (location) => {
  const props = {
    user: { firstName: "test" },
    checkout: true,
    inactive: true,
    settingInactiveCheckBox: jest.fn(),
    locationSelectValue: location,
  };
  return render(<DataTableSystems {...props} />);
};

beforeAll(() => {
  // jest.spyOn(DataTableSystems.prototype, 'selectedRowHandler').mockImplementation(() => 'Hello');
});

afterAll(() => {
  jest.restoreAllMocks();
});
test("tests a configuration with only active systems", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: systemsDataActiveOnly })
  );
  const title = await mpApi.getMonitoringSystems(6);
  expect(title.data).toEqual(systemsDataActiveOnly);
  let { container } = await waitForElement(() => componentRenderer(6));
  expect(container).toBeDefined();
});
test("tests a configuration with both inactive and active systems", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: systemData })
  );
  const title = await mpApi.getMonitoringSystems(5);
  expect(title.data).toEqual(systemData);
  let { container } = await waitForElement(() => componentRenderer(5));
  expect(container).toBeDefined();
});

test("tests a configuration with inactive only", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: systemsInactiveOnly })
  );
  const title = await mpApi.getMonitoringSystems(76);

  expect(title.data).toEqual(systemsInactiveOnly);
  let { container } = await waitForElement(() => componentRenderer(76));
  expect(container).toBeDefined();
});

// test("click",async () => {
//   const props = {
//     user: { firstName: "test" },
//     checkout: true,
//     inactive: true,
//     settingInactiveCheckBox: jest.fn(),
//     locationSelectValue: 76,
//   };

// //   const spy1 = jest.spyOn(DataTableSystems.prototype, "selectedRowHandler");
// //  const wrapper = shallow(<DataTableSystems   {...props}/>);
// //   wrapper.find("#btnOpen").simulate("click");
// //   expect(spy1).not.toHaveBeenCalled(); // Success!  (onClick NOT bound to spy)

// //   wrapper.setState({}); // <= force re-render (sometimes calling wrapper.update isn't enough)

// //   wrapper.find("#btnOpen").simulate("click");
// //   expect(spy1).toHaveBeenCalledTimes(1); // Success!  (onClick IS bound to spy)

// // const spy = jest.spyOn(util, 'selectedRowHandler');
// // const wrapper =  shallow(<DataTableSystems   {...props}/>);
// let { container } = await waitForElement(() => componentRenderer(5));
// // const spy1 = jest.spyOn(wrapper.instance(), 'selectedRowHandler');
// // wrapper.update();

// // const button = wrapper.find('#btnOpen');
// // button.simulate('click');
// expect(container.selectedRowHandler()).toBe("Hello");

// });
