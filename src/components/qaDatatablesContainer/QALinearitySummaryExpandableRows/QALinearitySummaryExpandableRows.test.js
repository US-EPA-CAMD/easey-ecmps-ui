import React from "react";
import { render, waitForElement, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import  { QALinearitySummaryExpandableRows }  from "./QALinearitySummaryExpandableRows";

import * as qaApi from "../../../utils/api/qaCertificationsAPI";
const axios = require("axios");

jest.mock("axios");

const rowToRemoveText = 'this row should be removed'

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
    "id": "idToRemove",
    "testSumId": "IT07D0112-70AA39C4632746999222EC8FB3C530FB",
    "gasLevelCode": rowToRemoveText,
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
    data: {
      locationId: locId,
      id: testSummaryId
    },
    mdmData: {
      "gasLevelCode" : [
        {
          code: "",
          name: " --- select ---"
        },
        {
          code: "HIGH",
          name: "high"
        },
        {
          code: "MID",
          name: "mid"
        },
        {
          code: "LOW",
          name: "low"
        },
      ]
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
  expect(screen.getByRole("table")).toBeDefined();
  expect(screen.getAllByRole("columnheader").length).toBe(6);
  expect(screen.getAllByRole("row").length).toBe(linearitySummary.length + 1);
});

test.skip("when remove button on a row is clicked then that row is deleted from the table", async () => {
  // Arrange
  axios.get.mockReset()
  axios.get.mockClear()
  axios.get.mockImplementation(() => Promise.resolve({ status: 200, data: linearitySummary }));
  // works with this mock
  qaApi.deleteQALinearitySummary = jest.fn().mockResolvedValue({ status: 200, data: 'deleted' })
  // fails and encounters error with this mock
  // axios.delete.mockImplementation(() => Promise.resolve({ status: 200, data: 'delete succeeded' }))
  const rowIndex = 1

  const props = {
    user: { firstName: "test" },
    data: {
      locationId: '5930',
      id: 'IT07D0112-70AA39C4632746999222EC8FB3C530FB'
    },
    actionsBtn: 'View',
    actionColumnName: 'Linearity Summary Data"'
  };
  render(<QALinearitySummaryExpandableRows {...props} />)

  // does not work in combination with screen.getAllByRole(button)
  // waitForElement(() => render(<QALinearitySummaryExpandableRows {...props} />))

  const removeButtons = await screen.findAllByRole('button', { name: /remove/i })

  // does not work in combination with waitForelement
  // const removeButtons = screen.getAllByRole('button', { name: /remove/i })

  // row exists before remove
  expect(screen.getByText(rowToRemoveText)).toBeInTheDocument()

  // Act
  // click remove button in second row
  const secondRemoveButton = removeButtons[rowIndex]
  userEvent.click(secondRemoveButton)

  // click 'yes' in confirmation modal
  const confirmBtns = screen.getAllByRole('button', { name: /yes/i })
  const secondConfirmBtn = confirmBtns[rowIndex]
  userEvent.click(secondConfirmBtn)

  // Assert
  await waitForElement(() => {
    const removedRowText = screen.queryByText(rowToRemoveText)
    expect(removedRowText).toBeNull()
  })
});

test("testing to add linearity summary records", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: linearitySummary })
  );
  const res = await qaApi.getQALinearitySummary("5930", "IT07D0112-70AA39C4632746999222EC8FB3C530FB");
  expect(res.data).toEqual(linearitySummary);
  let { container } = await waitForElement(() => componentRenderer("5930", "IT07D0112-70AA39C4632746999222EC8FB3C530FB"));
  expect(container).toBeDefined();
  const addButtons = screen.getAllByRole("button", {name: "Add"});
  //const addButton = screen.getByText("Add");

  expect(addButtons.length).toBe(2);
  fireEvent.click(addButtons[1]);
  screen.debug();
  expect(screen.getByText("Add Linearity Test")).toBeInTheDocument();
});
