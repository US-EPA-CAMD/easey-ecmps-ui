import React from "react";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import { QALinearitySummaryDataTable } from "./QALinearitySummaryDataTable";

import * as qaApi from "../../../utils/api/qaCertificationsAPI";
const axios = require("axios");

jest.mock("axios");

const testSummary = [
  {
    id: "TWCORNEL5",
    stackPipeId: null,
    unitId: "1",
    testTypeCode: "FFA",
    monitoringSystemId: null,
    componentId: "AFA",
    spanScaleCode: null,
    testNumber: "20201CEM5F",
    testReasonCode: "QA",
    testDescription: null,
    testResultCode: "PASSED",
    calculatedTestResultCode: "PASSED",
    beginDate: null,
    beginHour: null,
    beginMinute: null,
    endDate: "2020-02-26",
    endHour: 20,
    endMinute: 3,
    gracePeriodIndicator: null,
    calculatedGracePeriodIndicator: null,
    year: null,
    quarter: null,
    testComment: null,
    injectionProtocolCode: null,
    calculatedSpanValue: null,
    evalStatusCode: null,
    userId: "bvick",
    addDate: "2020-04-23",
    updateDate: null,
    reportPeriodId: null,
  },
];

//testing redux connected component to mimic props passed as argument
const componentRenderer = (location) => {
  const props = {
    user: { firstName: "test" },
    locationSelectValue: location,
  };
  return render(<QALinearitySummaryDataTable {...props} />);
};
function componentRendererNoData(args) {
  const defualtProps = {
    locationSelectValue: "0",
  };

  const props = { ...defualtProps, ...args };
  return render(<QALinearitySummaryDataTable {...props} />);
}

test("tests a test summary", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: testSummary })
  );
  const title = await qaApi.getQATestSummary(3);
  expect(title.data).toEqual(testSummary);
  let { container } = await waitForElement(() => componentRenderer(3));
  expect(container).toBeDefined();
});

test("tests a test summary NO USER/NO DATA", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: [] })
  );
  const title = await qaApi.getQATestSummary(3);
  expect(title.data).toEqual([]);
  let { container } = await waitForElement(() => componentRendererNoData(3));
  expect(container).toBeDefined();
});

test("tests updating test summary data", async () => {
  axios.get.mockResolvedValue({ status: 200, data: testSummary })
  const payload = {
    "stackPipeId": testSummary.stackPipeId,
    "unitId": testSummary.unitId,
    "testTypeCode": testSummary.testTypeCode,
    "componentID": testSummary.componentID,
    "spanScaleCode": testSummary.spanScaleCode,
    "testNumber": "A05-Q4-2011-20",
    "testReasonCode": testSummary.testReasonCode,
    "testResultCode": testSummary.testResultCode,
    "beginDate": testSummary.beginDate,
    "beginHour": testSummary.beginHour,
    "beginMinute": testSummary.beginMinute,
    "endDate": testSummary.endDate,
    "endHour": testSummary.endHour,
    "endMinute": testSummary.endMinute,
    "gracePeriodIndicator": testSummary.gracePeriodIndicator,
    "testComment": "dev testing",
  };
  axios.mockResolvedValueOnce(Promise.resolve({ status: 200, data: payload }))
  const title = await qaApi.updateQALinearityTestSummary(1873, "f6e4056f-c779-4a61-b265-2932898a9033", payload);
  expect(title.data).toEqual(payload);
  let { container } = await waitForElement(() => componentRenderer(1873));
  expect(container).toBeDefined();
});
