import React from "react";
import { render, screen } from "@testing-library/react";
import ExportTablesContainer from "./ExportTablesContainer";
import * as qaCertificationsAPI from "../../../utils/api/qaCertificationsAPI";

const props = {
  selectionData: { beginDate: "1/1/11", endDate: "1/1/11" },
  selectedConfig: { locations: [] },
  exportState: {},
  setExportState: null,
  workspaceSection: "workspacesection",
  orisCode: "orisCode",
  dataRef: {},
};

test("renders QA Test Summary table title", async () => {
  const response = { data: { testSummaryData: [] } };
  qaCertificationsAPI.exportQA = jest.fn().mockReturnValue(response);
  render(<ExportTablesContainer {...props} />);
  const testSummaryTitle = await screen.findByText(/test summary/i);
  expect(testSummaryTitle).toBeInTheDocument();
});
