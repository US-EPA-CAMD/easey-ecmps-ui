import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

import * as qaCertApi from "../../utils/api/qaCertificationsAPI";

import render from "../../mocks/render"
import QAImportHistoricalDataPreview from "./QAImportHistoricalDataPreview";
import { getMockExportQa, getMockReportingPeriods } from "../../mocks/functions";

const setSelectedHistoricalData = jest.fn();
const setFileName = jest.fn();
const setDisablePortBtn = jest.fn();

const props = {
  locations: [],
  setSelectedHistoricalData,
  setFileName,
  setDisablePortBtn,
  orisCode: "orisCode",
};

beforeEach(() => {
  jest.spyOn(qaCertApi, "exportQA").mockResolvedValue({
    data: getMockExportQa(),
  });

  jest.spyOn(qaCertApi, "getReportingPeriods").mockResolvedValue({
    data: getMockReportingPeriods(),
    status: 200
  });
})

test("renders QAImportHistoricalDataPreview with test summary table", async () => {
  // Arrange
  await render(
    <QAImportHistoricalDataPreview {...props} />
  )

  // Act
  const previewBtn = await screen.findByRole("button", { name: /Preview/i });
  await act(async () => previewBtn.click())

  const testSummaryTable = screen.getByTestId('test-summary-table')

  expect(testSummaryTable).toBeInTheDocument()
});

test("renders QAImportHistoricalDataPreview with qa cert table", async () => {
  // Arrange
  const customProps = { ...props, showTestSummaryTable: false }
  await render(
    <QAImportHistoricalDataPreview {...customProps} />
  )

  // Act
  const previewBtn = await screen.findByRole("button", { name: /Preview/i });
  await act(async () => previewBtn.click())

  const qaCertTable = screen.getByTestId('qa-cert-events-and-tee-table')

  expect(qaCertTable).toBeInTheDocument()
});
