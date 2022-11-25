import React from "react";
import { render, screen, waitForElement, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import QAImportHistoricalDataPreview from "./QAImportHistoricalDataPreview";
import config from "../../config";

const facId = 'orisCode'

const mock = new MockAdapter(axios);

const beginDate = "1993-01-01"
const endDate = "1993-03-31"

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
  },
  {
    "id": "id2",
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
const reportingPeriods = [
  {
    "id": 1,
    "calendarYear": 1993,
    "quarter": 1,
    "beginDate": beginDate,
    "endDate": endDate,
    "periodDescription": "1993 QTR 1",
    "periodAbbreviation": "1993 Q1",
    "archiveInd": 0,
    "selected": false
  }
]

const getExportQAUrl = `${config.services.qaCertification.uri}/export?facilityId=${facId}&beginDate=${beginDate}&endDate=${endDate}`
const getReportingPeriodUrl = `${config.services.mdm.uri}/reporting-periods`

mock.onGet(getExportQAUrl).reply(200, {
  orisCode: 0,
  testSummaryData
})
mock.onGet(getReportingPeriodUrl).reply(200, reportingPeriods)

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

test('renders QAImportHistoricalDataPreview', () => {
  // Arrange
  const { container } = render(<QAImportHistoricalDataPreview {...props} />)

  // Assert
  expect(container).toBeDefined()
})

test('preview button can be clicked', async () => {
  // Arrange
  render(<QAImportHistoricalDataPreview {...props} />)

  // Act
  const previewBtn = await screen.findByRole('button', { name: /Preview/i })
  userEvent.click(previewBtn)

  // Assert
  expect(previewBtn).toBeInTheDocument()
})

test('rows are selectable', async () => {
    // Arrange
    render(<QAImportHistoricalDataPreview {...props} />)

    const rows = await screen.findAllByRole('row')
    expect(rows).toHaveLength(testSummaryData.length + 1)

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(testSummaryData.length + 1)
    const selectAllCheckbox = checkboxes[0]

    // Act
    userEvent.click(selectAllCheckbox)

    // Assert
    expect(selectAllCheckbox.checked).toBeTruthy()
})
