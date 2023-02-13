import React from "react";
import { render, screen } from "@testing-library/react";
import ExportTablesContainer from "./ExportTablesContainer";
import * as qaCertificationsAPI from "../../../utils/api/qaCertificationsAPI";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const mock = new MockAdapter(axios);
import {qaTestSummaryCols} from "../../../utils/constants/tableColumns";

const props = {
  selectionData: { beginDate: '1/1/11', endDate: '1/1/11' },
  selectedConfig: { locations: [{unitId:"51", type:"unitId", stackPipeId:null}] },
  exportState: {},
  setExportState: null,
  workspaceSection: 'workspacesection',
  orisCode: '3776',
  dataRef: {},
}
const exportUrl = "https://api.epa.gov/easey/dev/qa-certification-mgmt/export?facilityId=3776&qaTestExtensionExemptionIds=null&qaCertificationEventIds=null&beginDate=1/1/11&endDate=1/1/11"
const response = {"orisCode":3776,"testSummaryData":[{"id":"TWCORNEL5-5438209079BE4E7C83507AFC1D8DA532","locationId":"5","stackPipeId":"CS0AAN","unitId":null,"testTypeCode":"F2LCHK","monitoringSystemID":"AA4","componentID":null,"spanScaleCode":null,"testNumber":"201904010000AA4","testReasonCode":"QA","testDescription":null,"testResultCode":"FEW168H","calculatedTestResultCode":"FEW168H","beginDate":null,"beginHour":null,"beginMinute":null,"endDate":null,"endHour":null,"endMinute":null,"gracePeriodIndicator":null,"calculatedGracePeriodIndicator":null,"year":2019,"quarter":1,"testComment":null,"injectionProtocolCode":null,"calculatedSpanValue":null,"evalStatusCode":null,"userId":"bvick","addDate":"4/24/2019, 5:27:06 PM","updateDate":null,"reportPeriodId":105,"calibrationInjectionData":[],"linearitySummaryData":[],"rataData":[],"flowToLoadReferenceData":[],"flowToLoadCheckData":[{"id":"TWCORNEL5-6B67F4286CBD4867BC981E601A989626","testSumId":"TWCORNEL5-5438209079BE4E7C83507AFC1D8DA532","testBasisCode":"Q","biasAdjustedIndicator":null,"avgAbsolutePercentDiff":null,"numberOfHours":null,"numberOfHoursExcludedForFuel":null,"numberOfHoursExcludedRamping":null,"numberOfHoursExcludedBypass":null,"numberOfHoursExcludedPreRATA":null,"numberOfHoursExcludedTest":null,"numberOfHoursExcMainBypass":null,"operatingLevelCode":"H","userId":"bvick","addDate":"4/24/2019, 5:27:07 PM","updateDate":null}],"cycleTimeSummaryData":[],"onlineOfflineCalibrationData":[],"fuelFlowmeterAccuracyData":[],"transmitterTransducerData":[],"fuelFlowToLoadBaselineData":[],"appECorrelationTestSummaryData":[],"fuelFlowToLoadTestData":[],"unitDefaultTestData":[],"hgSummaryData":[],"testQualificationData":[],"protocolGasData":[],"airEmissionTestingData":[]}],"certificationEventData":[],"testExtensionExemptionData":[]};
mock.onGet(exportUrl).reply(200, response);
test('renders QA Test Summary table', async () => {
  // const response = { data: { testSummaryData: [] } }
  // qaCertificationsAPI.exportQA = jest.fn().mockReturnValue(response)
  render(<ExportTablesContainer {...props} />);
  const testSummaryTitle = await screen.findByText(/test summary/i)
  expect(testSummaryTitle).toBeInTheDocument();
  const columnheaders = await screen.findAllByRole('columnheader')
  expect(columnheaders.length).toBe(qaTestSummaryCols.length);
  expect(await screen.findByText('Unit or StackPipe ID')).toBeVisible();
  expect(await screen.findByText('System or Component ID')).toBeVisible();
  expect(await screen.findByText('Test Type Code')).toBeVisible();
})