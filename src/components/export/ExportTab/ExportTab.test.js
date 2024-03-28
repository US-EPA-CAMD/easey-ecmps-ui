import React from "react";
import ExportTab from "./ExportTab";
import { screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import * as qaCertificationApi from "../../../utils/api/qaCertificationsAPI";
import * as emissionsApi from "../../../utils/api/emissionsApi";
import * as monitoringPlansApi from "../../../utils/api/monitoringPlansApi";

import render from "../../../mocks/render"
import { getMockExportQa, getMockReportingPeriods } from "../../../mocks/functions";
import { EXPORT_TAB_TEST_EXPORT_STATE, mockSelectedConfig } from "../../../mocks/constants";
import { Provider } from "react-redux";
import configureStore from "../../../store/configureStore.dev";

const store = configureStore();

describe("ExportTab", () => {
  beforeEach(() => {
    jest.spyOn(qaCertificationApi, "getReportingPeriods").mockResolvedValue({
      data: getMockReportingPeriods(),
      status: 200
    });
    jest.spyOn(qaCertificationApi, "exportQA").mockResolvedValue({
      data: getMockExportQa(),
      status: 200
    });
    jest
      .spyOn(emissionsApi, "exportEmissionsDataDownload")
      .mockResolvedValue({});
    jest
      .spyOn(monitoringPlansApi, "exportMonitoringPlanDownload")
      .mockResolvedValue({});
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe("QA & Cert Export", () => {
    test("when qa&cert is checked and no rows are selected then export should be disabled", async () => {
      await render(
        <Provider store={store}>
          <ExportTab
            orisCode={3}
            exportState={null}
            setExportState={() => null}
            workspaceSection={"export"}
            selectedConfig={mockSelectedConfig}
            facility={"Barry (1, 2, CS0AAN)"}
          />
        </Provider>
      );
      const exportButton = screen.getAllByText("Export");
      expect(exportButton[0]).not.toBeEnabled();
    });
  });
});
