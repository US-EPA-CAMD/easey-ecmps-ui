import React from "react";
import { render, fireEvent, waitForElement, screen} from "@testing-library/react";
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

const apiFuel = [
  {
    id: "TWCORNEL5-346B541485484501A5C748F8CAAABC22",
    locationId: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
    systemFuelFlowUOMCode: "PNG",
    maximumFuelFlowRateSourceCode: "GAS",
    maximumFuelFlowRate: "10000.0",
    beginDate: "2019-07-01",
    endDate: null,
    beginHour: "0",
    endHour: null,
    active: true,
  },
];

const componentRenderer = (location) => {
  const props = {
    user: { firstName: "test" },
    checkout: true,
    inactive: true,
    settingInactiveCheckBox: jest.fn(),
    locationSelectValue: location,
    revertedState: false,
    setRevertedState: jest.fn(),
    selectedSysIdTest: "testId",
    selectedRangeInFirstTest: { locationId: 1, componentRecordId: 1 },
    tabs: [
      {
        openedFacilityTabs: [],
        inactive: [true]
      }
    ],
    currentTabIndex: 0,
    mdmData: {
      systemDesignationCode: [
        {
          code: "",
          name: "-- Select a value --",
        },
        {
          code: "B",
          name: "Non-redundant Backup",
        },
        {
          code: "CI",
          name: "Certified Monitoring System at Inlet to Emission Control Device",
        },
        {
          code: "DB",
          name: "Data Backup",
        },
        {
          code: "P",
          name: "Primary",
        },
        {
          code: "PB",
          name: "Primary Bypass",
        },
        {
          code: "RB",
          name: "Redundant Backup",
        },
        {
          code: "RM",
          name: "Reference Method Backup",
        },
      ],
      systemTypeCode: [
        {
          code: "",
          name: "-- Select a value --",
        },
        {
          code: "CO2",
          name: "CO2 Concentration",
        },
        {
          code: "FLOW",
          name: "Stack Flow",
        },
        {
          code: "GAS",
          name: "Gas Fuel Flow",
        },
        {
          code: "H2O",
          name: "Moisture (O2 Wet and Dry)",
        },
        {
          code: "H2OM",
          name: "Moisture Sensor",
        },
        {
          code: "H2OT",
          name: "Moisture Table",
        },
        {
          code: "HG",
          name: "Hg Concentration CEMS",
        },
        {
          code: "LTGS",
          name: "Long-term Gas Fuel Flow",
        },
        {
          code: "LTOL",
          name: "Long-term Oil Fuel Flow",
        },
        {
          code: "NOX",
          name: "NOx Emission Rate",
        },
        {
          code: "NOXC",
          name: "NOx Concentration",
        },
        {
          code: "NOXE",
          name: "NOx Appendix E",
        },
        {
          code: "NOXP",
          name: "NOx PEMS",
        },
        {
          code: "O2",
          name: "O2 Concentration",
        },
        {
          code: "OILM",
          name: "Mass of Oil Fuel Flow",
        },
        {
          code: "OILV",
          name: "Volumetric Oil Fuel Flow",
        },
        {
          code: "OP",
          name: "Opacity",
        },
        {
          code: "PM",
          name: "Particulate Matter",
        },
        {
          code: "SO2",
          name: "SO2 Concentration",
        },
        {
          code: "HCL",
          name: "HCl Concentration CEMS",
        },
        {
          code: "HF",
          name: "HF Concentration CEMS",
        },
        {
          code: "ST",
          name: "Sorbent Trap Monitoring System",
        },
      ],
      fuelCode: [
        {
          code: "",
          name: "-- Select a value --",
        },
        {
          code: "ANT",
          name: "Anthracite Coal",
        },
        {
          code: "BFG",
          name: "Blast Furnace Gas",
        },
        {
          code: "BT",
          name: "Bituminous Coal",
        },
        {
          code: "BUT",
          name: "Butane Gas",
        },
        {
          code: "C",
          name: "Coal",
        },
        {
          code: "CDG",
          name: "Coal Derived Gas",
        },
        {
          code: "COG",
          name: "Coke Oven Gas",
        },
        {
          code: "CRF",
          name: "Coal Refuse",
        },
        {
          code: "DGG",
          name: "Digester Gas",
        },
        {
          code: "DSL",
          name: "Diesel Oil",
        },
        {
          code: "LFG",
          name: "Landfill Gas",
        },
        {
          code: "LIG",
          name: "Lignite Coal",
        },
        {
          code: "LPG",
          name: "Liquefied Petroleum Gas",
        },
        {
          code: "MIX",
          name: "Mixture (Co-Fired Fuels)",
        },
        {
          code: "NFS",
          name: "Non-Fuel Specific",
        },
        {
          code: "NNG",
          name: "Natural Gas",
        },
        {
          code: "OGS",
          name: "Other Gas",
        },
        {
          code: "OIL",
          name: "Residual Oil",
        },
        {
          code: "OOL",
          name: "Other Oil",
        },
        {
          code: "OSF",
          name: "Other Solid Fuel",
        },
        {
          code: "PDG",
          name: "Producer Gas",
        },
        {
          code: "PNG",
          name: "Pipeline Natural Gas",
        },
        {
          code: "PRG",
          name: "Process Gas",
        },
        {
          code: "PRP",
          name: "Propane Gas",
        },
        {
          code: "PRS",
          name: "Process Sludge",
        },
        {
          code: "PTC",
          name: "Petroleum Coke",
        },
        {
          code: "R",
          name: "Refuse",
        },
        {
          code: "RFG",
          name: "Refinery Gas",
        },
        {
          code: "SRG",
          name: "Unrefined Sour Gas",
        },
        {
          code: "SUB",
          name: "Sub-Bituminous Coal",
        },
        {
          code: "TDF",
          name: "Tire-Derived Fuel",
        },
        {
          code: "W",
          name: "Wood",
        },
        {
          code: "WL",
          name: "Waste Liquid",
        },
      ],
    },
    loadDropdownsData: jest.fn(),
  };
  return render(<DataTableSystems {...props} />);
};

beforeAll(() => {
  // jest.spyOn(DataTableSystems.prototype, 'selectedRowHandler').mockImplementation(() => 'Hello');
});

afterAll(() => {
  jest.restoreAllMocks();
});
test("tests a configuration with only active systems and ability to create system data", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: systemsDataActiveOnly })
  );
  const title = await mpApi.getMonitoringSystems(6);
  expect(title.data).toEqual(systemsDataActiveOnly);
  let { container } = await waitForElement(() => componentRenderer(6));
  expect(container).toBeDefined();
  const systemsTable = screen.getByRole('table');
  expect(systemsTable).toBeDefined();
  let createSystemsBtn = screen.getByRole('button', {name:"Create System"});
  expect(createSystemsBtn).toBeDefined();
  fireEvent.click(createSystemsBtn);
  const addDialog = screen.getByRole('dialog');
  expect(addDialog).toBeDefined();
  expect(screen.getAllByText("Create System").length).toBe(3);
  createSystemsBtn = screen.getByRole('button', {name:"Create System"});
  fireEvent.click(createSystemsBtn);
  expect(container.querySelector("#appErrorMessageText")).toBeDefined();
  // const endDate = container.querySelector("#End Date");
  // expect(endDate).toBeDefined();
  // fireEvent.change(endDate, {target: {value: '01/01/2022'}})
  // const endTime = container.querySelector("#End Time");
  // expect(endTime).toBeDefined();
  // fireEvent.change(endTime, {target: {value: '10'}})
  
});
test("tests a configuration with both inactive and active systems", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: systemData })
  );
  const title = await mpApi.getMonitoringSystems(5);
  expect(title.data).toEqual(systemData);
  let { container } = await waitForElement(() => componentRenderer(5));
  expect(container).toBeDefined();
  const systemsTables = screen.getAllByRole('table');
  expect(systemsTables.length).toBe(2);
  //screen.debug();
  const viewEditBtns = screen.getAllByText("View / Edit");
  expect(viewEditBtns.length).toBe(10);
  //fireEvent.click(viewEditBtns[0]);
});

test("tests a configuration with inactive only", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: systemsInactiveOnly })
  );
  const title = await mpApi.getMonitoringSystems(76);

  expect(title.data).toEqual(systemsInactiveOnly);
  let { container } = await waitForElement(() => componentRenderer(76));
  // fireEvent.click(container.querySelector("#testingBtn"));
  // fireEvent.click(container.querySelector("#testingBtn2"));
  expect(container).toBeDefined();
});
test("tests a getMonitoringSystemsFuelFlows", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: apiFuel })
  );
  const title = await mpApi.getMonitoringSystemsFuelFlows(
    6,
    "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D"
  );
  expect(title.data).toEqual(apiFuel);

  let { container } = await waitForElement(() =>
  componentRenderer(6)
  );

  const fuelBtn = container.querySelectorAll("#btnOpenFuelFlows");
  for (const x of fuelBtn) {
    fireEvent.click(x);
  }
  expect(container.querySelector("#backBtn")).toBeDefined();
});
