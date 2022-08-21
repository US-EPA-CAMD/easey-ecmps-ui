import React from "react";
import { render, screen, waitForElement, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QAImportHistoricalDataPreview from "./QAImportHistoricalDataPreview";

const axios = require("axios");
jest.mock("axios");

const setSelectedHistoricalData = jest.fn()
const setFileName = jest.fn()
const setDisablePortBtn = jest.fn()

const props = {
  locations: [],
  setSelectedHistoricalData,
  setFileName,
  setDisablePortBtn,
  orisCode: 'orisCode'
}

const testSummaryData = [
  {
    "id": "EPA-D96BC735DB28D4B505C0F460CEC1F5DC",
    "locationId": "1873",
    "stackPipeId": null,
    "unitId": "51",
    "testTypeCode": "RATA",
    "monitoringSystemID": "51C",
    "componentID": null,
    "spanScaleCode": null,
    "testNumber": "EPA-51C-2004",
    "testReasonCode": "QA",
    "testDescription": null,
    "testResultCode": "PASSED",
    "calculatedTestResultCode": "PASSED",
    "beginDate": "2006-03-15",
    "beginHour": 8,
    "beginMinute": 10,
    "endDate": "2006-03-15",
    "endHour": 15,
    "endMinute": 40,
    "gracePeriodIndicator": 0,
    "calculatedGracePeriodIndicator": null,
    "year": null,
    "quarter": null,
    "testComment": null,
    "injectionProtocolCode": null,
    "calculatedSpanValue": null,
    "evalStatusCode": null,
    "userId": "PQA09Q1",
    "addDate": "2/21/2009, 7:35:37 PM",
    "updateDate": null,
    "reportPeriodId": null,
    "calibrationInjectionData": [],
    "linearitySummaryData": [],
    "rataData": [],
    "flowToLoadReferenceData": [],
    "flowToLoadCheckData": [],
    "cycleTimeSummaryData": [],
    "onlineOfflineCalibrationData": [],
    "fuelFlowmeterAccuracyData": [],
    "transmitterTransducerData": [],
    "fuelFlowToLoadBaselineData": [],
    "fuelFlowToLoadTestData": [],
    "appECorrelationTestSummaryData": [],
    "unitDefaultTestData": [],
    "hgSummaryData": [],
    "testQualificationData": [],
    "protocolGasData": [],
    "airEmissionTestData": []
  }
]

const data = {
  orisCode: 0,
  testSummaryData
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

test('preview button can be clicked', async () => {
  // Arrange
  axios.mockResolvedValueOnce({ status: 200, data })
  axios.get.mockResolvedValueOnce({ status: 200, data: reportingPeriods })
  render(<QAImportHistoricalDataPreview {...props} />)

  // Act
  const previewBtn = await screen.findByRole('button', { name: /Preview/i })
  userEvent.click(previewBtn)

  // Assert
  expect(previewBtn).toBeInTheDocument()
})
