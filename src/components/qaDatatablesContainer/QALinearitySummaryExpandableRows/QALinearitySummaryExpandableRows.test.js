import React from "react";
import { render, waitForElement, screen } from "@testing-library/react";
import QALinearitySummaryExpandableRows from "./QALinearitySummaryExpandableRows";

import * as qaApi from "../../../utils/api/qaCertificationsAPI";
const axios = require("axios");

jest.mock("axios");

const linearitySummary = [
  {
    "id": "IT07D0112-4CBC1A08D61B403DBB179D0B78EC51A8",
    "testSumId": "IT07D0112-70AA39C4632746999222EC8FB3C530FB",
    "gasLevelCode": "MID",
    "meanMeasuredValue": 55.3,
    "calculatedMeanMeasuredValue": 55.3,
    "meanReferenceValue": 55.9,
    "calculatedMeanReferenceValue": 55.9,
    "percentError": 1.1,
    "calculatedPercentError": 1.1,
    "apsIndicator": 0,
    "calculatedAPSIndicator": 0,
    "userId": "lperez",
    "addDate": "4/25/2011, 7:30:54 PM",
    "updateDate": null,
    "linearityInjectionData": []
  },
  {
    "id": "IT07D0112-7B71D94A53784A5282585A35DDB346C0",
    "testSumId": "IT07D0112-70AA39C4632746999222EC8FB3C530FB",
    "gasLevelCode": "LOW",
    "meanMeasuredValue": 25.233,
    "calculatedMeanMeasuredValue": 25.233,
    "meanReferenceValue": 25.2,
    "calculatedMeanReferenceValue": 25.2,
    "percentError": 0.1,
    "calculatedPercentError": 0.1,
    "apsIndicator": 0,
    "calculatedAPSIndicator": 0,
    "userId": "lperez",
    "addDate": "4/25/2011, 7:30:54 PM",
    "updateDate": null,
    "linearityInjectionData": []
  },
];

//testing redux connected component to mimic props passed as argument
const componentRenderer = (locId, testSummaryId) => {
  const props = {
    user: { firstName: "test" },
    data :{
      locationId: locId,
      id: testSummaryId
    }
  };
  return render(<QALinearitySummaryExpandableRows {...props} />);
};

test("testing linearity summary expandable records from test summary data", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: linearitySummary })
  );
  const res = await qaApi.getQALinearitySummary("5930", "IT07D0112-70AA39C4632746999222EC8FB3C530FB");
  expect(res.data).toEqual(linearitySummary);
  let { container } = await waitForElement(() => componentRenderer("5930", "IT07D0112-70AA39C4632746999222EC8FB3C530FB"));
  expect(container).toBeDefined();
  //screen.debug();
  expect(screen.getByRole("table")).toBeDefined();
  expect(screen.getAllByRole("columnheader").length).toBe(6);
  expect(screen.getAllByRole("row").length).toBe(linearitySummary.length+1);
});

