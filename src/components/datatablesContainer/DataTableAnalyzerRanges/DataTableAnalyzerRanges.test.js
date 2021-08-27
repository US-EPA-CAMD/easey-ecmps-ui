import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import {DataTableAnalyzerRanges} from "./DataTableAnalyzerRanges";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
const axios = require("axios");

jest.mock("axios");

const ranges = [
  {
    id: "CAMD-9554A75F4BF14DEAAAD2A5C0B5AC2F65",
    componentRecordId: "CAMD-601D8BE4030348A9A4F207630B9F599D",
    analyzerRangeCode: "H",
    dualRangeIndicator: "0",
    beginDate: "2009-01-01",
    endDate: null,
    beginHour: "0",
    endHour: null,
    active: true,
  },
];

//testing redux connected component to mimic props passed as argument
const componentRenderer = () => {
  const props = {
    user: { firstName: "test" },
    checkout: true,

    selectedRanges: ranges[0],
    thirdLevel: false,
    updateAnalyzerRangeTable: false,
    setThirdLevel: jest.fn(),

    setOpenFuelFlowsView: jest.fn(),
    setComponentView: jest.fn(),
    setSelectedModalData: jest.fn(),
    setCreateNewAnalyzerRange: jest.fn(),
    setSaveAnalyzerRange: jest.fn(),
    setSelectedRange: jest.fn(),
  };
  return render(<DataTableAnalyzerRanges {...props} />);
};

test("tests a configuration with only inactive methods", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: ranges })
  );
  const title = await mpApi.getMonitoringAnalyzerRanges(
    "6417",
    "CAMD-601D8BE4030348A9A4F207630B9F599D"
  );
  expect(title.data).toEqual(ranges);
  let { container } = await waitForElement(() => componentRenderer());
  
  fireEvent.click(container.querySelector("#testingBtn"));
  // componentRenderer(6);
  expect(container).toBeDefined();
});

// test("tests a create/save methods", async () => {

//   axios.get.mockImplementation(() =>
//     Promise.resolve({ status: 200, data: monitoringMatsMethods })
//   );

//   axios.put.mockImplementation((url) => {
//     switch (url) {
//       case `https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/workspace/locations/5770/mats-methods/MELISSARHO-CDF765BC7BF849EE9C23608B95540200`:
//         return Promise.resolve({ data: [{ name: "Bob", items: [] }] });
//       case "/items.json":
//         return Promise.resolve({ data: [{ id: 1 }, { id: 2 }] });
//       default:
//         return Promise.reject(new Error("not found"));
//     }
//   });
//   axios.put.mockImplementation(() =>
//     Promise.resolve({ status: 200, data: data })
//   );

//   let { container } = await waitForElement(() => componentRenderer(5770));

//   fireEvent.click(container.querySelector("#testingBtn"));
//   fireEvent.click(container.querySelector("#testingBtn2"));
//   fireEvent.click(container.querySelector("#testingBtn3"));
//   // componentRenderer(6);
//   expect(container).toBeDefined();
// });
