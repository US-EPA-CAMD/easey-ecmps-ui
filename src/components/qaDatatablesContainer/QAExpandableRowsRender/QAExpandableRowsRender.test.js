import React from "react";
import {
  render,
  waitForElement,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import QAExpandableRowsRender from "./QAExpandableRowsRender";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../../config";

import {
  qaLinearitySummaryProps,
  qaRataDataProps,
} from "../../../additional-functions/qa-dataTable-props";
const locId = "1873";
const testSummaryId = "4f2d07c0-55f9-49b0-8946-ea80c1febb15";
const gasLevelCodes = [
  {
    code: "",
    name: " --- select ---",
  },
  {
    code: "HIGH",
    name: "high",
  },
  {
    code: "MID",
    name: "mid",
  },
  {
    code: "LOW",
    name: "low",
  },
];

const gasTypeCode = [
  {
    code: "",
    name: "-- Select a value --",
  },
  {
    code: "ZERO",
    name: "Zero level gas used for the low level calibration of a reference analyzer used in RATA testing",
  },
  {
    code: "ZAM",
    name: "Zero Air Material",
  },
];
const componentRenderer = () => {
  const obj = qaLinearitySummaryProps();
  return render(
    <QAExpandableRowsRender
      payload={obj["payload"]}
      dropdownArray={obj["dropdownArray"]}
      columns={obj["columnNames"]}
      controlInputs={obj["controlInputs"]}
      controlDatePickerInputs={obj["controlDatePickerInputs"]}
      dataTableName={obj["dataTableName"]}
      extraControls={obj["extraControls"]}
      radioBtnPayload={obj["radioBtnPayload"]}
      expandable
      extraIDs={null}
      isCheckedOut={true}
    />
  );
};

test("testing component renders properly and functionlity for add/edit/remove", async () => {
  const { container } = await waitForElement(() => componentRenderer());
  expect(container).toBeDefined();
});
