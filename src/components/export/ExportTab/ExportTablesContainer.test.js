import React from "react";
import { act, render, screen } from "@testing-library/react";

import * as qaCertificationApi from "../../../utils/api/qaCertificationsAPI";

import { getMockExportTablesContainerProps } from "./ExportTablesContainer.mocks";
import ExportTablesContainer from "./ExportTablesContainer";
import { getMockExportQa } from "./ExportTab.test.mocks";


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
  await act(async () => {
    return render(
      <ExportTablesContainer {...getMockExportTablesContainerProps()} />
    );
  });
  const tableTitle = screen.getByTestId('export-table-title')
  expect(tableTitle).toBeDefined();
});
