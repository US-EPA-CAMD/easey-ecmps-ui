import React from "react";
import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as qaCertApi from "../../../utils/api/qaCertificationsAPI";
import * as dataManagementApi from "../../../utils/api/dataManagementApi";
import * as monitorPlanApi from "../../../utils/api/monitoringPlansApi";

import render from "../../../mocks/render"
import QATestSummaryDataTable from "./QATestSummaryDataTable";
import { getMockMonitoringComponents, getMockMonitoringSystems, getMockQATestSummary, getMockSpanScaleCodes, getMockTestReasonCodes, getMockTestResultCodes, getMockTestTypeCodes } from "../../../mocks/functions";

const locId = "locId";

const props = {
  locationSelectValue: locId,
  user: 'user',
  nonEditable: false,
  showModal: false,
  selectedTestCode: {
    testTypeCodes: ["UNITDEF"],
    testTypeGroupCode: 'APPESUM',
  },
  isCheckedOut: true,
  selectedLocation: '66',
  locations: [
    {
      id: "66",
      unitRecordId: 11,
      unitId: "1",
      stackPipeRecordId: null,
      stackPipeId: null,
      name: "1",
      type: "unit",
      active: true,
      activeDate: null,
      retireDate: null,
      nonLoadBasedIndicator: 0,
    },
  ],
  updateTable: false,
  setUpdateTable: jest.fn()
}

beforeEach(() => {
  // qaCertApi
  jest.spyOn(qaCertApi, "getQATestSummary").mockResolvedValue({
    data: getMockQATestSummary(),
  });
  jest.spyOn(qaCertApi, "createQATestData").mockResolvedValue({
    data: { id: 'createdId' },
  });

  jest.spyOn(qaCertApi, "updateQALinearityTestSummary").mockResolvedValue({
    data: { id: 'updatedId' }
  })
  jest.spyOn(qaCertApi, "deleteQATestSummary").mockResolvedValue({
    data: 'deleted',
    status: 200
  });

  // dataManagementApi
  jest.spyOn(dataManagementApi, "getAllTestTypeCodes").mockResolvedValue({
    data: getMockTestTypeCodes(),
    status: 200
  });
  jest.spyOn(dataManagementApi, "getAllSpanScaleCodes").mockResolvedValue({
    data: getMockSpanScaleCodes(),
    status: 200
  });
  jest.spyOn(dataManagementApi, "getAllTestReasonCodes").mockResolvedValue({
    data: getMockTestReasonCodes(),
    status: 200
  });
  jest.spyOn(dataManagementApi, "getAllTestResultCodes").mockResolvedValue({
    data: getMockTestResultCodes(),
    status: 200
  });
  jest.spyOn(dataManagementApi, "getPrefilteredTestSummaries").mockResolvedValue({
    data: getMockQATestSummary(),
    status: 200
  });

  // monitorPlanApi
  jest.spyOn(monitorPlanApi, "getMonitoringComponents").mockResolvedValue({
    data: getMockMonitoringComponents(),
    status: 200
  });
  jest.spyOn(monitorPlanApi, "getMonitoringSystems").mockResolvedValue({
    data: getMockMonitoringSystems(),
    status: 200
  });

  // mock window.scrollTo
  window.scrollTo = jest.fn()
})

afterEach(() => {
  jest.clearAllMocks();
})

test("renders QATestSummaryDataTable", async () => {
  await render(
    <QATestSummaryDataTable {...props} />
  )
});

test('renders add button', async () => {
  await render(
    <QATestSummaryDataTable {...props} />
  )

  const addBtn = screen.getByRole('button', { name: /Add/i })
  expect(addBtn).toBeInTheDocument()
})
