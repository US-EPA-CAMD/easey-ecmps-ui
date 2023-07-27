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

  describe("Emissions Export", function () {
    it("should enable export button when the emissions checkbox is checked, and download when export is clicked", async () => {
      jest.setTimeout(10000)

      await render(
        <ExportTab
          orisCode={3}
          exportState={EXPORT_TAB_TEST_EXPORT_STATE}
          setExportState={() => null}
          workspaceSection={"export"}
          selectedConfig={mockSelectedConfig}
          facility={"Barry (1, 2, CS0AAN)"}
        />
      );

      const emissionsCheckbox = screen.getByRole("checkbox", {
        name: "Emissions",
      });
      const exportButton = screen.getByRole("button", {
        name: "Export",
      });

      await act(async () => emissionsCheckbox.click())

      expect(exportButton).toBeEnabled();

      await act(async () => exportButton.click())

      expect(monitoringPlansApi.exportMonitoringPlanDownload).toHaveBeenCalledTimes(1)
    });
  });

  describe("QA & Cert Export", () => {
    test("when qa&cert is checked and no rows are selected then export should be disabled", async () => {
      await render(
        <ExportTab
          orisCode={3}
          exportState={null}
          setExportState={() => null}
          workspaceSection={"export"}
          selectedConfig={mockSelectedConfig}
          facility={"Barry (1, 2, CS0AAN)"}
        />
      );
      const qaCertCheckbox = screen.getByRole("checkbox", {
        name: "QA & Certification",
      });
      const exportButton = screen.getByRole("button", {
        name: "Export",
      });

      userEvent.click(qaCertCheckbox);
      expect(exportButton).not.toBeEnabled();
    });
  });
});
