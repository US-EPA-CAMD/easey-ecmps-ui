import React from "react";
import { render, screen } from "@testing-library/react";
import { DataTableMethod } from "./DataTableMethod";
// import axios from "axios";

import * as mpApi from "../../../utils/api/monitoringPlansApi";
const axios = require("axios");

jest.mock("axios");

const methodsWithMats = [
  {
      "id": "CAMD-EA417194893A42698910FB88A89A050A",
      "parameterCode": "HI",
      "methodCode": "CALC",
      "subDataCode": null,
      "bypassApproachCode": null,
      "beginDate": "1995-01-01",
      "beginHour": "0",
      "endDate": "2019-06-30",
      "endHour": "23",
      "active": false
  },
  {
      "id": "TWCORNEL5-3FA65FADD48D4CF88F26328FEF7B5237",
      "parameterCode": "OP",
      "methodCode": "EXP",
      "subDataCode": null,
      "bypassApproachCode": null,
      "beginDate": "2018-10-03",
      "beginHour": "0",
      "endDate": null,
      "endHour": null,
      "active": true
  },
  {
      "id": "TWCORNEL5-E87023808E5C43F18BD84AC8A9DCF332",
      "parameterCode": "HI",
      "methodCode": "AD",
      "subDataCode": "SPTS",
      "bypassApproachCode": null,
      "beginDate": "2019-07-01",
      "beginHour": "0",
      "endDate": null,
      "endHour": null,
      "active": true
  },
  {
      "id": "TWCORNEL5-F5C722306BC647C0A89728805EC65491",
      "parameterCode": "CO2",
      "methodCode": "AD",
      "subDataCode": "SPTS",
      "bypassApproachCode": null,
      "beginDate": "2019-07-01",
      "beginHour": "0",
      "endDate": null,
      "endHour": null,
      "active": true
  },
  {
      "id": "TWCORNEL5-0242C84984624A19842495426796A5AF",
      "parameterCode": "SO2",
      "methodCode": "AD",
      "subDataCode": "SPTS",
      "bypassApproachCode": null,
      "beginDate": "2019-07-01",
      "beginHour": "0",
      "endDate": null,
      "endHour": null,
      "active": true
  }
]
//testing redux connected component to mimic props passed as argument
const componentRenderer = (location) => {
  const props = {
    matsTableHandler: jest.fn(),
    user: { firstName: "test" },
    checkout: true,
    inactive: true,
    settingInactiveCheckBox: jest.fn(),
    locationSelectValue: location,
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
  };

  const props = { ...defualtProps, ...args };
  return render(<DataTableMethod {...props} />);
}

test("should render at least one row of data with mats flag", async () => {

  axios.get.mockImplementation(() => Promise.resolve({ status: 200, data: methodsWithMats }));
  const title = await mpApi.getMonitoringMethods(6);
  expect(title.data).toEqual(methodsWithMats);
  let { container } = await componentRenderer(6);
  // componentRenderer(6);
  const records = screen.getAllByDisplayValue('COM')
  expect(records).toBeDefined();
});
