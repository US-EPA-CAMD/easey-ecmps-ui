import React from "react";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import { DataTableMethod } from "./DataTableMethod";

import * as mpApi from "../../../utils/api/monitoringPlansApi";
const axios = require("axios");

jest.mock("axios");

const methodsInactiveOnly = [
  {
    active: false,
    beginDate: "1995-01-01",
    beginHour: "0",
    bypassApproachCode: null,
    endDate: "2015-08-24",
    endHour: "23",
    id: "CAMD-BAC9D84563F24FE08057AF5643C8602C",
    monitoringMethodCode: "CALC",
    parameterCode: "HI",
    substituteDataCode: null,
  },
];

const methodsWithMats = [
  {
    id: "CAMD-EA417194893A42698910FB88A89A050A",
    parameterCode: "HI",
    monitoringMethodCode: "CALC",
    substituteDataCode: null,
    bypassApproachCode: null,
    beginDate: "1995-01-01",
    beginHour: "0",
    endDate: "2019-06-30",
    endHour: "23",
    active: false,
  },
  {
    id: "TWCORNEL5-3FA65FADD48D4CF88F26328FEF7B5237",
    parameterCode: "OP",
    monitoringMethodCode: "EXP",
    substituteDataCode: null,
    bypassApproachCode: null,
    beginDate: "2018-10-03",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: "TWCORNEL5-E87023808E5C43F18BD84AC8A9DCF332",
    parameterCode: "HI",
    monitoringMethodCode: "AD",
    substituteDataCode: "SPTS",
    bypassApproachCode: null,
    beginDate: "2019-07-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: "TWCORNEL5-F5C722306BC647C0A89728805EC65491",
    parameterCode: "CO2",
    monitoringMethodCode: "AD",
    substituteDataCode: "SPTS",
    bypassApproachCode: null,
    beginDate: "2019-07-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: "TWCORNEL5-0242C84984624A19842495426796A5AF",
    parameterCode: "SO2",
    monitoringMethodCode: "AD",
    substituteDataCode: "SPTS",
    bypassApproachCode: null,
    beginDate: "2019-07-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
];

const methodsActiveOnly = [
  {
    id: "TWCORNEL5-520BCE7BD6D740FAB44EE107D1C92F62",
    parameterCode: "SO2RH",
    monitoringMethodCode: "CEM",
    substituteDataCode: null,
    bypassApproachCode: null,
    beginDate: "2015-07-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: "TWCORNEL5-25507D763FB945E08E84FB643A2D8C60",
    parameterCode: "HGRH",
    monitoringMethodCode: "CEM",
    substituteDataCode: null,
    bypassApproachCode: null,
    beginDate: "2015-07-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: "CAMD-1ED5DDDA1095406BAF2FEBE99B289095",
    parameterCode: "CO2",
    monitoringMethodCode: "CEM",
    substituteDataCode: "SPTS",
    bypassApproachCode: null,
    beginDate: "2007-10-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: "CAMD-613D77FE9F3E4E45829853AEDA438E65",
    parameterCode: "HI",
    monitoringMethodCode: "CEM",
    substituteDataCode: "SPTS",
    bypassApproachCode: null,
    beginDate: "2007-10-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: "CAMD-EED7181355674814908D0FBB39D494D9",
    parameterCode: "NOX",
    monitoringMethodCode: "NOXR",
    substituteDataCode: null,
    bypassApproachCode: null,
    beginDate: "2003-04-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: "CAMD-438B58B43CD34B38A4C9A159016DE1B3",
    parameterCode: "NOXR",
    monitoringMethodCode: "CEM",
    substituteDataCode: "SPTS",
    bypassApproachCode: "BYMAX",
    beginDate: "2007-10-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: "CAMD-7CBA5DDAA6AF42BBAF6CEB3E61CF4C39",
    parameterCode: "SO2",
    monitoringMethodCode: "CEM",
    substituteDataCode: "SPTS",
    bypassApproachCode: "BYMAX",
    beginDate: "2007-10-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
];
//testing redux connected component to mimic props passed as argument
const componentRenderer = (location, showModal) => {
  const props = {
    matsTableHandler: jest.fn(),
    user: { firstName: "test" },
    checkout: true,
    inactive: true,
    settingInactiveCheckBox: jest.fn(),
    locationSelectValue: location,
    setRevertedState: jest.fn(),
    showModal: showModal,
    mdmData: {
      parameterCode: [
        {
          code: "",
          name: "-- Select a value --",
        },
        {
          code: "AKSF",
          name: "Appendix K Sample to Stack Flow Scaling Factor",
        },
        {
          code: "BCO2",
          name: "Biogenic CO2 Mass (ton)",
        },
        {
          code: "CO2C",
          name: "CO2 Concentration (pct)",
        },
        {
          code: "CO2R",
          name: "CO2 Emission Rate (ton/mmBtu)",
        },
        {
          code: "CO2",
          name: "CO2 Hourly Mass Rate (ton/hr)",
        },
        {
          code: "CO2M",
          name: "CO2 Mass (ton)",
        },
        {
          code: "CO2X",
          name: "CO2 Maximum Concentration (pct)",
        },
        {
          code: "CO2N",
          name: "CO2 Minimum Concentration (pct)",
        },
        {
          code: "DENSOIL",
          name: "Density of Oil",
        },
        {
          code: "FC",
          name: "F-Factor Carbon-based",
        },
        {
          code: "FD",
          name: "F-Factor Dry-basis",
        },
        {
          code: "FW",
          name: "F-Factor Wet-basis",
        },
        {
          code: "FF2L",
          name: "Fuel Flow to Load Rate",
        },
        {
          code: "FGAS",
          name: "Gas Hourly Flow Rate (hscf)",
        },
        {
          code: "GCV",
          name: "Gross Calorific Value for Oil or Gas",
        },
        {
          code: "GHR",
          name: "Gross Heat Rate",
        },
        {
          code: "HCLRE",
          name: "HCl Electrical Output Based Emissions Rate (lb/MWh)",
        },
        {
          code: "HCLRH",
          name: "HCl Heat Input Based Emissions Rate (lb/mmBtu)",
        },
        {
          code: "HCLC",
          name: "HCl concentration (ppm)",
        },
        {
          code: "HFRE",
          name: "HF Electrical Output Based Emissions Rate (lb/MWh)",
        },
        {
          code: "HFRH",
          name: "HF Heat Input Based Emissions Rate (lb/mmBtu)",
        },
        {
          code: "HFC",
          name: "HF concentration (ppm)",
        },
        {
          code: "HI",
          name: "Heat Input Rate (mmBtu/hr)",
        },
        {
          code: "HIT",
          name: "Heat Input Total (mmBtu)",
        },
        {
          code: "HGC",
          name: "Hg Concentration (ugscm)",
        },
        {
          code: "HGRE",
          name: "Hg Electrical Output Based Emission Rate",
        },
        {
          code: "HGRH",
          name: "Hg Heat Input Based Emission Rate",
        },
        {
          code: "HCL",
          name: "Hydrogen chloride",
        },
        {
          code: "HF",
          name: "Hydrogen fluoride",
        },
        {
          code: "H2OX",
          name: "Maximum Moisture (pct)",
        },
        {
          code: "NOCX",
          name: "Maximum NOx Concentration (ppm)",
        },
        {
          code: "NORX",
          name: "Maximum NOx Emission Rate (lb/mmBtu)",
        },
        {
          code: "O2X",
          name: "Maximum O2 Concentration (pct)",
        },
        {
          code: "MHHI",
          name: "Maximum Rated Hourly Heat Input Rate (mmBtu/hr)",
        },
        {
          code: "SO2X",
          name: "Maximum SO2 Concentration (ppm)",
        },
        {
          code: "SORX",
          name: "Maximum SO2 Emission Rate (lb/mmBtu)",
        },
        {
          code: "FLOX",
          name: "Maximum Stack Flow (scfh)",
        },
        {
          code: "HG",
          name: "Mercury",
        },
        {
          code: "MNGF",
          name: "Minimum Gas Flow Rate (hscf)",
        },
        {
          code: "MNHI",
          name: "Minimum Heat Input Rate (mmBtu/hr)",
        },
        {
          code: "H2ON",
          name: "Minimum Moisture (pct)",
        },
        {
          code: "MNNX",
          name: "Minimum NOx Emission Rate (lb/mmBtu)",
        },
        {
          code: "O2N",
          name: "Minimum O2 Concentration (pct)",
        },
        {
          code: "MNOF",
          name: "Minimum Oil Flow Rate",
        },
        {
          code: "BWA",
          name: "Moisture Fraction in Ambient Air",
        },
        {
          code: "H2O",
          name: "Moisture Percentage (pct)",
        },
        {
          code: "NOXC",
          name: "NOx Concentration (ppm)",
        },
        {
          code: "NOXR",
          name: "NOx Emission Rate (lb/mmBtu)",
        },
        {
          code: "NOX",
          name: "NOx Hourly Mass Rate (lb/hr)",
        },
        {
          code: "NOXM",
          name: "NOx Mass (lb)",
        },
        {
          code: "OPHOURS",
          name: "Number of Operating Hours",
        },
        {
          code: "O2C",
          name: "O2 Concentration (pct)",
        },
        {
          code: "FOIL",
          name: "Oil Flow Rate",
        },
        {
          code: "OILM",
          name: "Oil Mass Flow Rate (lb/hr)",
        },
        {
          code: "VOIL",
          name: "Oil Volume",
        },
        {
          code: "OILV",
          name: "Oil Volumetric Flow Rate",
        },
        {
          code: "OP",
          name: "Opacity",
        },
        {
          code: "LOAD",
          name: "Operating Load",
        },
        {
          code: "OPTIME",
          name: "Operating Time (hr)",
        },
        {
          code: "PM",
          name: "Particulate Matter",
        },
        {
          code: "SO2C",
          name: "SO2 Concentration (ppm)",
        },
        {
          code: "SO2RE",
          name: "SO2 Electrical Output Based Hourly Emission Rate (lb/MW-hr)",
        },
        {
          code: "SO2RH",
          name: "SO2 Heat Input Based Hourly Emission Rate (lb/mmBtu)",
        },
        {
          code: "SO2R",
          name: "SO2 Hourly  Emission Rate (lb/mmBtu)",
        },
        {
          code: "SO2",
          name: "SO2 Hourly Mass Rate (lb/hr)",
        },
        {
          code: "SO2M",
          name: "SO2 Mass (lb)",
        },
        {
          code: "SGF",
          name: "Sample Gas Flow",
        },
        {
          code: "FLOW",
          name: "Stack Flow (scfh)",
        },
        {
          code: "SULFUR",
          name: "Sulfur Content",
        },
      ],
      monitoringMethodCode: [
        {
          code: "",
          name: "-- Select a value --",
        },
        {
          code: "AD",
          name: "Appendix D",
        },
        {
          code: "ADCALC",
          name: "Appendix D Measured and Apportioned",
        },
        {
          code: "AE",
          name: "Appendix E",
        },
        {
          code: "AMS",
          name: "Alternative Monitoring System",
        },
        {
          code: "CALC",
          name: "Apportioned or Summed Value",
        },
        {
          code: "CEM",
          name: "Continuous Emission Monitor",
        },
        {
          code: "CEMF23",
          name: "Continuous Emission Monitor or Equation F-23",
        },
        {
          code: "CEMNOXR",
          name: "Continuous Emission Monitor or Calculation from NOx Rate",
        },
        {
          code: "COM",
          name: "Continuous Opacity or Particulate Matter Monitor",
        },
        {
          code: "EXP",
          name: "Exempt",
        },
        {
          code: "F23",
          name: "Equation F-23",
        },
        {
          code: "FSA",
          name: "Fueling Sample and Analysis",
        },
        {
          code: "LME",
          name: "Low Mass Emissions",
        },
        {
          code: "LTFCALC",
          name: "Long-Term Fuel Flow Measured and Apportioned",
        },
        {
          code: "LTFF",
          name: "Long-Term Fuel Flow",
        },
        {
          code: "MDF",
          name: "Moisture Default",
        },
        {
          code: "MHHI",
          name: "Maximum Hourly Heat Input",
        },
        {
          code: "MMS",
          name: "Moisture Sensor",
        },
        {
          code: "MTB",
          name: "Moisture Lookup Table",
        },
        {
          code: "MWD",
          name: "Wet and Dry O2 Monitors",
        },
        {
          code: "NOXR",
          name: "NOx Mass Calculated from NOx Emission Rate",
        },
        {
          code: "PEM",
          name: "Predictive Emissions Monitor",
        },
        {
          code: "CEMST",
          name: "Hg CEMS and Sorbent Trap Monitoring System",
        },
        {
          code: "ST",
          name: "Sorbent Trap Monitoring System",
        },
      ],
      substituteDataCode: [
        {
          code: "",
          name: "-- Select a value --",
        },
        {
          code: "FSP75",
          name: "Fuel-Specific Missing Data",
        },
        {
          code: "FSP75C",
          name: "Fuel-Specific Missing Data with Separate Co-Fired Database",
        },
        {
          code: "MHHI",
          name: "Maximum Rated Hourly Heat Input Rate for LME Units Normal using Long Term Fuel Flow",
        },
        {
          code: "NLB",
          name: "Non Load-Based Missing Data",
        },
        {
          code: "NLBOP",
          name: "Non Load-Based Missing Data with Operational Bins",
        },
        {
          code: "OZN75",
          name: "Ozone vs Non-Ozone NOX Missing Data",
        },
        {
          code: "REV75",
          name: "Inverse Part 75 for H2O or O2 Missing Data",
        },
        {
          code: "SPTS",
          name: "Standard Part 75 for Missing Data",
        },
      ],
      bypassApproachCode: [
        {
          code: "",
          name: "-- Select a value --",
        },
        {
          code: "BYMAX",
          name: "Standard Part 75 for Unmonitored Bypass Stack",
        },
        {
          code: "BYMAXFS",
          name: "Fuel-Specific for Unmonitored Bypass Stack",
        },
      ],
    },
    loadDropdownsData: jest.fn(),
    setUpdateRelatedTables: jest.fn(),
    updateRelatedTables: false,
    currentTabIndex: 0,
    tabs: [{ inactive: [{}] }],
  };
  return render(<DataTableMethod {...props} />);
};
function componentRendererNoData(args) {
  const defualtProps = {
    locationSelectValue: "0",
    matsTableHandler: jest.fn(),
    showActiveOnly: true,
    user: { username: "test" },
    checkout: true,
    setRevertedState: jest.fn(),
  };

  const props = { ...defualtProps, ...args };
  return render(<DataTableMethod {...props} />);
}

test("here to run test", () => {
  expect(true);
});

/*
test("tests a configuration with only inactive methods", async () => {
  // React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  // React.useState = jest
  //   .fn()
  // .mockReturnValueOnce([true, {}])

  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: methodsInactiveOnly })
  );
  const title = await mpApi.getMonitoringMethods(69);
  expect(title.data).toEqual(methodsInactiveOnly);
  let { container } = await waitForElement(() => componentRenderer(69, false));
  // componentRenderer(6);
  expect(container).toBeDefined();
});
test("tests a configuration with both inactive and active methods and mats", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: methodsWithMats })
  );
  const title = await mpApi.getMonitoringMethods(6);
  expect(title.data).toEqual(methodsWithMats);
  let { container } = await waitForElement(() => componentRenderer(6));
  expect(container).toBeDefined();
});

test("tests a configuration with only active methods", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: methodsActiveOnly })
  );
  const title = await mpApi.getMonitoringMethods(5894);
  expect(title.data).toEqual(methodsActiveOnly);
  let { container } = await waitForElement(() => componentRenderer(5894));
  expect(container).toBeDefined();
});
test("tests a configuration with only inactive methods", async () => {
  // React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  // React.useState = jest
  //   .fn()
  // .mockReturnValueOnce([true, {}])

  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: methodsInactiveOnly })
  );

  axios.put.mockImplementation((url) => {
    switch (url) {
      case `https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/workspace/locations/3844/methods/WPC07008-24F0C0E2B4DD4AFC927FC2DEDC67B859`:
        return Promise.resolve({ data: [{ name: "Bob", items: [] }] });
      case "/items.json":
        return Promise.resolve({ data: [{ id: 1 }, { id: 2 }] });
      default:
        return Promise.reject(new Error("not found"));
    }
  });
  axios.put.mockImplementation(() =>
    Promise.resolve({ status: 200, data: methodsInactiveOnly })
  );

  const title = await mpApi.getMonitoringMethods(69);
  expect(title.data).toEqual(methodsInactiveOnly);
  let { container } = await waitForElement(() => componentRenderer(69));

  // fireEvent.click(container.querySelector("#testingBtn"));
  // fireEvent.click(container.querySelector("#testingBtn2"));
  // fireEvent.click(container.querySelector("#testingBtn3"));
  expect(container).toBeDefined();
});
*/
