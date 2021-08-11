import React from "react";
import { render, waitForElement,fireEvent } from "@testing-library/react";
import { DataTableMats } from "./DataTableMats";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
const axios = require("axios");

jest.mock("axios");

const monitoringMatsMethods= [
  {
    id: "MELISSARHO-FD768B60E4D343158F7AD52EFD704D0E",
    matsMethodParameterCode: "TNHGM",
    matsMethodCode: "QST",
    beginDate: "2016-04-16",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: "MELISSARHO-CDF765BC7BF849EE9C23608B95540200",
    matsMethodParameterCode: "HG",
    matsMethodCode: "LEE",
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
    setRevertedState:jest.fn(),
    locationSelectValue: location,
  };
  return render(<DataTableMats {...props} />);
};
function componentRendererNoData(args) {
  const defualtProps = {
    user: { firstName: "test" },
    checkout: true,
    inactive: true,
    settingInactiveCheckBox: jest.fn(),
    locationSelectValue: location,
  };

  const props = { ...defualtProps, ...args };
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
  Promise.resolve({ status: 200, data: data })
);

  let { container } = await waitForElement(() => componentRenderer(5770));

  fireEvent.click(container.querySelector("#testingBtn"));
  fireEvent.click(container.querySelector("#testingBtn2"));
  fireEvent.click(container.querySelector("#testingBtn3"));
  // componentRenderer(6);
  expect(container).toBeDefined();
});
