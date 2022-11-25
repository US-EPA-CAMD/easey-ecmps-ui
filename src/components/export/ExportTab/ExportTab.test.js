import React from "react";
import ExportTab from "./ExportTab";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { getReportingPeriod, selectedConfig } from "./ExportTab.test.mocks";
import userEvent from "@testing-library/user-event";

describe("ExportTab", function () {
  let emissionsApi;
  let qaCertificationsApi;

  beforeAll(async () => {
    qaCertificationsApi = await import(
      "../../../utils/api/qaCertificationsAPI"
    );
    emissionsApi = await import("../../../utils/api/emissionsApi");
  });

  describe("Emissions Export", function () {
    it("should enable export button when the emissions checkbox is checked, and download when export is clicked", async function () {
      jest
        .spyOn(qaCertificationsApi, "getReportingPeriod")
        .mockResolvedValue(getReportingPeriod);
      jest
        .spyOn(emissionsApi, "exportEmissionsDataDownload")
        .mockResolvedValue({});

      await act(async () => {
        return render(
          <ExportTab
            orisCode={3}
            exportState={null}
            setExportState={() => null}
            workspaceSection={"export"}
            selectedConfig={selectedConfig}
            facility={"Barry (1, 2, CS0AAN)"}
          />
        );
      });

      const emissionsCheckbox = screen.getByRole("checkbox", {
        name: "Emissions",
      });
      const exportButton = screen.getByRole("button", {
        name: "Export",
      });

      userEvent.click(emissionsCheckbox);
      expect(exportButton).toBeEnabled();

      userEvent.click(exportButton);
      await act(async () =>
        expect(emissionsApi.exportEmissionsDataDownload).toHaveBeenCalledTimes(
          1
        )
      );
    });
  });
});
