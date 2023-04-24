import React from "react";
import { render, screen,act  } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import QAImportHistoricalDataPreview from "./QAImportHistoricalDataPreview";
import config from "../../config";

const facId = "orisCode";

const mock = new MockAdapter(axios);

const beginDate = "1993-01-01";
const endDate = "1993-03-31";

const testSummaryData = [
  {
    id: "EPA-D96BC735DB28D4B505C0F460CEC1F5DC",
    locationId: "1873",
    stackPipeId: null,
    unitId: "51",
    testTypeCode: "RATA",
    monitoringSystemID: "51C",
    componentID: null,
    spanScaleCode: null,
    testNumber: "EPA-51C-2004",
    testReasonCode: "QA",
    testDescription: null,
    testResultCode: "PASSED",
    calculatedTestResultCode: "PASSED",
    beginDate: "2006-03-15",
    beginHour: 8,
    beginMinute: 10,
    endDate: "2006-03-15",
    endHour: 15,
    endMinute: 40,
    gracePeriodIndicator: 0,
    calculatedGracePeriodIndicator: null,
    year: null,
    quarter: null,
    testComment: null,
    injectionProtocolCode: null,
    calculatedSpanValue: null,
    evalStatusCode: null,
    userId: "PQA09Q1",
    addDate: "2/21/2009, 7:35:37 PM",
    updateDate: null,
    reportPeriodId: null,
    calibrationInjectionData: [],
    linearitySummaryData: [],
    rataData: [],
    flowToLoadReferenceData: [],
    flowToLoadCheckData: [],
    cycleTimeSummaryData: [],
    onlineOfflineCalibrationData: [],
    fuelFlowmeterAccuracyData: [],
    transmitterTransducerData: [],
    fuelFlowToLoadBaselineData: [],
    fuelFlowToLoadTestData: [],
    appECorrelationTestSummaryData: [],
    unitDefaultTestData: [],
    hgSummaryData: [],
    testQualificationData: [],
    protocolGasData: [],
    airEmissionTestData: [],
  },
  {
    id: "id2",
    locationId: "1873",
    stackPipeId: null,
    unitId: "51",
    testTypeCode: "RATA",
    monitoringSystemID: "51C",
    componentID: null,
    spanScaleCode: null,
    testNumber: "EPA-51C-2004",
    testReasonCode: "QA",
    testDescription: null,
    testResultCode: "PASSED",
    calculatedTestResultCode: "PASSED",
    beginDate: "2006-03-15",
    beginHour: 8,
    beginMinute: 10,
    endDate: "2006-03-15",
    endHour: 15,
    endMinute: 40,
    gracePeriodIndicator: 0,
    calculatedGracePeriodIndicator: null,
    year: null,
    quarter: null,
    testComment: null,
    injectionProtocolCode: null,
    calculatedSpanValue: null,
    evalStatusCode: null,
    userId: "PQA09Q1",
    addDate: "2/21/2009, 7:35:37 PM",
    updateDate: null,
    reportPeriodId: null,
    calibrationInjectionData: [],
    linearitySummaryData: [],
    rataData: [],
    flowToLoadReferenceData: [],
    flowToLoadCheckData: [],
    cycleTimeSummaryData: [],
    onlineOfflineCalibrationData: [],
    fuelFlowmeterAccuracyData: [],
    transmitterTransducerData: [],
    fuelFlowToLoadBaselineData: [],
    fuelFlowToLoadTestData: [],
    appECorrelationTestSummaryData: [],
    unitDefaultTestData: [],
    hgSummaryData: [],
    testQualificationData: [],
    protocolGasData: [],
    airEmissionTestData: [],
  },
];
const certificationEventData = [
  {
    id: "string",
    locationId: "string",
    lastUpdated: "2023-02-28T18:47:35.811Z",
    updatedStatusFlag: "string",
    needsEvalFlag: "string",
    checkSessionId: "string",
    submissionId: 0,
    submissionAvailabilityCode: "string",
    pendingStatusCode: "string",
    evalStatusCode: "string",
    userId: "string",
    addDate: "string",
    updateDate: "string",
    stackPipeId: "string",
    unitId: "string",
    monitoringSystemID: "string",
    componentID: "string",
    qaCertEventCode: "string",
    qaCertEventDate: "2023-02-28T18:47:35.811Z",
    qaCertEventHour: 0,
    requiredTestCode: "string",
    conditionalBeginDate: "2023-02-28T18:47:35.811Z",
    conditionalBeginHour: 0,
    completionTestDate: "2023-02-28T18:47:35.811Z",
    completionTestHour: 0,
  },
];
const testExtensionExemptionData = [
  {
    stackPipeId: "string",
    unitId: "string",
    year: 0,
    quarter: 0,
    monitoringSystemID: "string",
    componentID: "string",
    spanScaleCode: "string",
    id: "string",
    locationId: "string",
    reportPeriodId: 0,
    checkSessionId: "string",
    submissionId: "string",
    submissionAvailabilityCode: "string",
    pendingStatusCode: "string",
    evalStatusCode: "string",
    userId: "string",
    addDate: "string",
    updateDate: "string",
    hoursUsed: 0,
    fuelCode: "string",
    extensionOrExemptionCode: "string",
  },
];
const reportingPeriods = [
  {
    id: 1,
    calendarYear: 1993,
    quarter: 1,
    beginDate: beginDate,
    endDate: endDate,
    periodDescription: "1993 QTR 1",
    periodAbbreviation: "1993 Q1",
    archiveInd: 0,
    selected: false,
  },
];

const exportData = {
  orisCode: 0,
  testSummaryData,
  certificationEventData,
  testExtensionExemptionData,
};

const getExportQAUrl = `${
  config.services.qaCertification.uri
}/export?testTypeCodes=${
  (testSummaryData[0].testTypeCode, testSummaryData[1].testTypeCode)
}facilityId=${facId}&beginDate=${beginDate}&endDate=${endDate}`;
const getReportingPeriodUrl = `${config.services.mdm.uri}/reporting-periods`;
const getReportingPeriodExportUrl = `${config.services.mdm.uri}/reporting-periods?export=true`;
const getHistoricalExportUrl =
  "https://api.epa.gov/easey/dev/qa-certification-mgmt/export?facilityId=orisCode&beginDate=1993-01-01&endDate=1993-03-31";

mock.onGet(getExportQAUrl).reply(200, exportData);
mock.onGet(getHistoricalExportUrl).reply(200, exportData);
mock.onGet(getReportingPeriodUrl).reply(200, reportingPeriods);
mock.onGet(getReportingPeriodExportUrl).reply(200, reportingPeriods);

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

test("renders QAImportHistoricalDataPreview", () => {
  // Arrange
  const { container } = render(<QAImportHistoricalDataPreview {...props} />);

  // Assert
  expect(container).toBeDefined();
});

test("renders QAImportHistoricalDataPreview with cert event and test extension exemption tables", async () => {
  // Arrange
  const { container } = render(
    <QAImportHistoricalDataPreview {...props} showTestSummaryTable={false} />
  );

  // Act
  const previewBtn = await screen.findByRole("button", { name: /Preview/i });
  userEvent.click(previewBtn);

  const certEventTitle = await screen.findByText(/QA Certification Events/i);
  const teeTitle = screen.getByText(/Test Extension Exemptions/i);

  // Assert
  expect(container).toBeDefined();
  expect(certEventTitle).toBeInTheDocument();
  expect(teeTitle).toBeInTheDocument();
});

test("preview button can be clicked", async () => {
  // Arrange
  render(<QAImportHistoricalDataPreview {...props} />);

  // Act
  const previewBtn = await screen.findByRole("button", { name: /Preview/i });
  userEvent.click(previewBtn);

  // Assert
  expect(previewBtn).toBeInTheDocument();
});

test("rows can be checked", async () => {
  // Arrange
  const { container } = render(<QAImportHistoricalDataPreview {...props} />);
  // Act
  const previewBtn = await screen.findByRole("button", { name: /Preview/i });

  await act(async () => {
   userEvent.click(previewBtn);
  });
  
  const rows = await screen.getAllByRole("checkbox");
  // Assert

  rows.forEach((row) => {
    if(row.checked === false){
      userEvent.click(row);
      expect(row.checked).toBe(true);
    }
    
  });
});
