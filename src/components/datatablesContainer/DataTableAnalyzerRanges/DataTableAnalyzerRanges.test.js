import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import { DataTableAnalyzerRanges } from "./DataTableAnalyzerRanges";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
const axios = require("axios");

jest.mock("axios");

const ranges = [
  {
    active: false,
    addDate: "2009-02-20",
    analyzerRangeCode: "H",
    beginDate: "1993-10-01",
    beginHour: "0",
    componentRecordId: "CAMD-60A6D62FDAB14840BFCF67E049B4B4C5",
    dualRangeIndicator: "0",
    endDate: "2019-11-06",
    endHour: "14",
    id: "CAMD-A39804B8C17A4478970F7B2CCBF429B6",
    updateDate: "2020-01-23",
    userId: "bvick",
  },
];

//testing redux connected component to mimic props passed as argument
const componentRenderer = (update) => {
  const props = {
    user: { firstName: "test" },
    checkout: true,

    selectedRanges: ranges[0],
    thirdLevel: false,
    updateAnalyzerRangeTable: update,
    setThirdLevel: jest.fn(),

    setOpenFuelFlowsView: jest.fn(),
    setComponentView: jest.fn(),
    setSelectedModalData: jest.fn(),
    setSaveAnalyzerRange: jest.fn(),
    setSelectedRange: jest.fn(),
    setCreateAnalyzerRangesFlag:jest.fn(),
  };
  return render(<DataTableAnalyzerRanges {...props} />);
};

test("tests a configuration with only inactive methods", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: ranges })
  );
  const title = await mpApi.getMonitoringAnalyzerRanges(
    "5",
    "CAMD-60A6D62FDAB14840BFCF67E049B4B4C5"
  );
  expect(title.data).toEqual(ranges);
  let { container } = await waitForElement(() => componentRenderer(false));
  componentRenderer(true)
  fireEvent.click(container.querySelector("#testingBtn"));

  fireEvent.click(container.querySelector("#testingBtn1"));
  expect(container).toBeDefined();
  
});