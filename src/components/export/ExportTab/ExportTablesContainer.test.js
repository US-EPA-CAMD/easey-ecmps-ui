import React from "react";
import { render, screen } from "@testing-library/react";

import * as qaCertificationApi from "../../../utils/api/qaCertificationsAPI";

import ExportTablesContainer from "./ExportTablesContainer";
import { getMockExportQa } from "../../../mocks/functions";

const props = {
  selectionData: { beginDate: "1/1/11", endDate: "1/1/11" },
  selectedConfig: {
    locations: [{ unitId: "51", type: "unitId", stackPipeId: null }],
  },
  exportState: {},
  setExportState: jest.fn(),
  workspaceSection: "workspacesection",
  orisCode: "3776",
  dataRef: {},
  tableTitle: "Test Summary",
  dataKey: "testSummaryData",
};

beforeEach(() => {
  jest.spyOn(qaCertificationApi, "exportQA").mockResolvedValue({
    data: getMockExportQa(),
    status: 200
  });
})

afterEach(() => {
  jest.clearAllMocks();
})

test("renders ExportTablesContainer", async () => {
  await render(
    <ExportTablesContainer {...props} />
  );
  const tableTitle = await screen.findByTestId('export-table-title')
  expect(tableTitle).toBeDefined();
});
