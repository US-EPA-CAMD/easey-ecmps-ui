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
    methodCode: "CALC",
    parameterCode: "HI",
    subDataCode: null,
  },
];

const methodsWithMats = [
  {
    id: "CAMD-EA417194893A42698910FB88A89A050A",
    parameterCode: "HI",
    methodCode: "CALC",
    subDataCode: null,
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
    methodCode: "EXP",
    subDataCode: null,
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
    methodCode: "AD",
    subDataCode: "SPTS",
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
    methodCode: "AD",
    subDataCode: "SPTS",
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
    methodCode: "AD",
    subDataCode: "SPTS",
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
    methodCode: "CEM",
    subDataCode: null,
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
    methodCode: "CEM",
    subDataCode: null,
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
    methodCode: "CEM",
    subDataCode: "SPTS",
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
    methodCode: "CEM",
    subDataCode: "SPTS",
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
    methodCode: "NOXR",
    subDataCode: null,
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
    methodCode: "CEM",
    subDataCode: "SPTS",
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
    methodCode: "CEM",
    subDataCode: "SPTS",
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
    setRevertedState:jest.fn(),
    showModal: showModal,
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
    setRevertedState:jest.fn(),
  };

  const props = { ...defualtProps, ...args };
  return render(<DataTableMethod {...props} />);
}

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
    Promise.resolve({ status: 200, data: data })
  );

  
  const title = await mpApi.getMonitoringMethods(69);
  expect(title.data).toEqual(methodsInactiveOnly);
  let { container } = await waitForElement(() => componentRenderer(69));

  fireEvent.click(container.querySelector("#testingBtn"));
  fireEvent.click(container.querySelector("#testingBtn2"));
  fireEvent.click(container.querySelector("#testingBtn3"));
  // componentRenderer(6);
  expect(container).toBeDefined();
});
