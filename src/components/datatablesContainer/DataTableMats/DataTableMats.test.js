import React from "react";
import { render, waitForElement, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { DataTableMats, mapDispatchToProps, mapStateToProps } from "./DataTableMats";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import config from "../../../config";
import userEvent from "@testing-library/user-event";

const mock = new MockAdapter(axios);

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

const monitoringMethods = [
  {
    parameterCode: "SO2",
    monitoringMethodCode: "CEM",
    substituteDataCode: "SPTS",
    bypassApproachCode: "BYMAX",
    beginDate: "2007-11-27",
    beginHour: 17,
    endDate: null,
    endHour: null,
    id: "MELISSAMAT-7BA7D94FDB4F4D4A8E1161E4B46150F6",
    locationId: "5770",
    userId: "abcde",
    addDate: "2009-02-20",
    updateDate: "2009-02-20",
    active: true
  },
  {
    parameterCode: "SO2",
    monitoringMethodCode: "CEM",
    substituteDataCode: "SPTS",
    bypassApproachCode: "BYMAX",
    beginDate: "2007-11-27",
    beginHour: 17,
    endDate: null,
    endHour: null,
    id: "MELISSAMAT-7BA7D94FDB4F4D4A8E1161E4B46150F6",
    locationId: "5770",
    userId: "abcde",
    addDate: "2009-02-20",
    updateDate: "2009-02-20",
    active: true
  }
]

const idRegex = '[\\w\\-]+'
const locationId = '5770'

const getMonitoringMatsMethodsUrl = new RegExp(`${config.services.monitorPlans.uri}/locations/${locationId}/mats-methods`)
const getMonitoringMethodsUrl = new RegExp(`${config.services.monitorPlans.uri}/locations/${locationId}/methods`)
const postUrl = new RegExp(`${config.services.monitorPlans.uri}/locations/${idRegex}/mats-methods`)
const putUrl = new RegExp(`${config.services.monitorPlans.uri}/locations/${idRegex}/mats-methods/${idRegex}`)

mock.onGet(getMonitoringMatsMethodsUrl).reply(200, monitoringMatsMethods)
mock.onGet(getMonitoringMethodsUrl).reply(200, monitoringMethods)
mock.onPost(postUrl).reply(200, 'created')
mock.onPut(putUrl).reply(200, 'updated')

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
      prefilteredMatsMethods: []
    },
    loadDropdownsData: jest.fn(),
    settingInactiveCheckBox: jest.fn(),
    setUpdateRelatedTables: jest.fn(),
    updateRelatedTables: false,
    currentTabIndex:0,
    tabs: [{ inactive: [{}] }],
  };
  return render(<DataTableMats {...props} />);
};

test("renders DataTableMats", async () => {
  let { container } = await waitForElement(() => componentRenderer(locationId));
  expect(container).toBeDefined();
});

test('DataTableMats create', async () => {
  await waitForElement(() => componentRenderer(locationId))
  const addBtn = screen.getAllByRole('button', { name: /Create MATS/i })
  userEvent.click(addBtn[0])
  const saveAndCloseBtn = screen.getAllByRole('button', { name: /Create MATS/i })
  userEvent.click(saveAndCloseBtn[0])
  expect(addBtn[0]).toBeDefined()


})

test('DataTableMats edit', async () => {
  await waitForElement(() => componentRenderer(locationId))
  const editBtn = screen.getAllByRole('button', { name: 'view and/or edit TNHGM' })
  userEvent.click(editBtn[0])
  const saveAndCloseBtn = screen.getAllByRole('button', { name: /Click to save/i })
  userEvent.click(saveAndCloseBtn[0])
  expect(editBtn).toBeDefined()
})

test("mapStateToProps calls the appropriate state", async () => {
  // mock the 'dispatch' object
  const dispatch = jest.fn();
  const state = { dropdowns: [1], openedFacilityTabs: ["monitoringPlans"] };
  const stateProps = mapStateToProps(state, true);
});

test("mapDispatchToProps calls the appropriate action", async () => {
  // mock the 'dispatch' object
  const dispatch = jest.fn();
  const actionProps = mapDispatchToProps(dispatch);
  const formData = [];
  // verify the appropriate action was called
  actionProps.loadDropdownsData();
});
