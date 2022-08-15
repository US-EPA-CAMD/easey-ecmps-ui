import React from "react";
import { render, screen, waitForElement, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QAImportHistoricalDataPreview from "./QAImportHistoricalDataPreview";

const axios = require("axios");
jest.mock("axios");

const props = {
  locations: [],
  setSelectedHistoricalData: jest.fn(),
  setFileName: jest.fn(),
  setDisablePortBtn: jest.fn(),
  orisCode: 'orisCode'
}

const data = {
  orisCode: 0,
  testSummaryData: []
}

const reportingPeriods = [
  {
    "id": 1,
    "calendarYear": 1993,
    "quarter": 1,
    "beginDate": "1993-01-01",
    "endDate": "1993-03-31",
    "periodDescription": "1993 QTR 1",
    "periodAbbreviation": "1993 Q1",
    "archiveInd": 0,
    "selected": false
  }
]

test('renders QAImportHistoricalDataPreview', () => {
  // Arrange
  // mock value for exportQA call
  axios.mockResolvedValueOnce({ status: 200, data })
  // mock value for ReportingPeriodSelector
  axios.get.mockResolvedValueOnce({ status: 200, data: reportingPeriods })
  const { container } = render(<QAImportHistoricalDataPreview {...props} />)

  // Assert
  expect(container).toBeDefined()
})
