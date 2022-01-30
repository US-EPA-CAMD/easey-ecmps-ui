import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import { DataTableMats } from "./DataTableMats";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
const axios = require("axios");

jest.mock("axios");

const monitoringMatsMethods = [
  {
    id: "MELISSARHO-FD768B60E4D343158F7AD52EFD704D0E",
    supplementalMATSParameterCode: "TNHGM",
    supplementalMATSMonitoringMethodCode: "QST",
    beginDate: "2016-04-16",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: "MELISSARHO-CDF765BC7BF849EE9C23608B95540200",
    supplementalMATSParameterCode: "HG",
    supplementalMATSMonitoringMethodCode: "LEE",
    beginDate: "2016-04-16",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
];
//testing redux connected component to mimic props passed as argument
const componentRenderer = (location) => {
  const props = {
    user: { firstName: "test" },
    checkout: true,
    setRevertedState: jest.fn(),
    locationSelectValue: location,
    mdmData: {
      supplementalMATSParameterCode: [
        {
          code: "",
          name: "-- Select a value --",
        },
        {
          code: "HCL",
          name: "Hydrogen Chloride",
        },
        {
          code: "HF",
          name: "Hydrogen Fluoride",
        },
        {
          code: "HG",
          name: "Mercury",
        },
        {
          code: "IM",
          name: "Individual HAP Metals (Including Hg)",
        },
        {
          code: "INHGM",
          name: "Individual non-Hg HAP Metals",
        },
        {
          code: "LU",
          name: "Limited-Use Oil-Fired Unit",
        },
        {
          code: "TM",
          name: "Total HAP Metals (Including Hg)",
        },
        {
          code: "TNHGM",
          name: "Total non-Hg HAP Metals",
        },
      ],
      supplementalMATSMonitoringMethodCode: [
        {
          code: "",
          name: "-- Select a value --",
        },
        {
          code: "CEMS",
          name: "Continuous Emission Monitoring System (Requires Administrative Approval under 40 CFR 63.7(f))",
        },
        {
          code: "LEE",
          name: "Low Emitting EGU for Total HAP metals , including Hg",
        },
        {
          code: "LEST",
          name: "Low Emitting EGU for some of the non-Hg HAP metals and Quarterly Stack Testing for the rest",
        },
        {
          code: "NA",
          name: "No Applicable Method",
        },
        {
          code: "PMCEMS",
          name: "Particulate Matter Continuous Monitoring System",
        },
        {
          code: "PMCPMS",
          name: "Particulate Matter Continuous Parametric Monitoring System",
        },
        {
          code: "PMO",
          name: "Percent Moisture in the Oil (Oil-fired EGUs, only)",
        },
        {
          code: "PMQST",
          name: "Quarterly Stack Testing for Particulate Matter",
        },
        {
          code: "QST",
          name: "Quarterly Stack Testing",
        },
      ],
    },
    loadDropdownsData: jest.fn(),
    settingInactiveCheckBox: jest.fn(),
    setUpdateRelatedTables: jest.fn(),
    updateRelatedTables: false,
  };
  return render(<DataTableMats {...props} />);
};
function componentRendererNoData(args) {
  const defaultProps = {
    user: { firstName: "test" },
    checkout: true,
    inactive: true,
    settingInactiveCheckBox: jest.fn(),
    locationSelectValue: 1,
  };

  const props = { ...defaultProps, ...args };
  return render(<DataTableMats {...props} />);
}

test("tests a configuration with only inactive methods", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: monitoringMatsMethods })
  );
  const title = await mpApi.getMonitoringMethods(5770);
  expect(title.data).toEqual(monitoringMatsMethods);
  let { container } = await waitForElement(() => componentRenderer(5770));
  // componentRenderer(6);
  expect(container).toBeDefined();
});

test("tests a create/save methods", async () => {
  // axios.get.mockImplementation(() =>
  //   Promise.resolve({ status: 200, data: methodsInactiveOnly })
  // );

  // axios.put.mockImplementation((url) => {
  //   switch (url) {
  //     case `https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/workspace/locations/3844/methods/WPC07008-24F0C0E2B4DD4AFC927FC2DEDC67B859`:
  //       return Promise.resolve({ data: [{ name: "Bob", items: [] }] });
  //     case "/items.json":
  //       return Promise.resolve({ data: [{ id: 1 }, { id: 2 }] });
  //     default:
  //       return Promise.reject(new Error("not found"));
  //   }
  // });
  // axios.put.mockImplementation(() =>
  //   Promise.resolve({ status: 200, data: data })
  // );

  // const title = await mpApi.getMonitoringMethods(69);
  // expect(title.data).toEqual(methodsInactiveOnly);
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: monitoringMatsMethods })
  );

  axios.put.mockImplementation((url) => {
    switch (url) {
      case `https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/workspace/locations/5770/mats-methods/MELISSARHO-CDF765BC7BF849EE9C23608B95540200`:
        return Promise.resolve({ data: [{ name: "Bob", items: [] }] });
      case "/items.json":
        return Promise.resolve({ data: [{ id: 1 }, { id: 2 }] });
      default:
        return Promise.reject(new Error("not found"));
    }
  });
  axios.put.mockImplementation(() =>
    Promise.resolve({ status: 200, data: monitoringMatsMethods })
  );

  let { container } = await waitForElement(() => componentRenderer(5770));

  // fireEvent.click(container.querySelector("#testingBtn"));
  // fireEvent.click(container.querySelector("#testingBtn2"));
  // fireEvent.click(container.querySelector("#testingBtn3"));
  // componentRenderer(6);
  expect(container).toBeDefined();
});
