import React from "react";
import ExportTab from "./ExportTab";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { getReportingPeriod, selectedConfig } from "./ExportTab.test.mocks";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react/dist/pure";
import { before } from "lodash";

describe("ExportTab", function () {
  let emissionsApi;
  let qaCertificationsApi;
  let monitoringPlansApi;

  beforeAll(async () => {
    qaCertificationsApi = await import(
      "../../../utils/api/qaCertificationsAPI"
    );
    emissionsApi = await import("../../../utils/api/emissionsApi");
    monitoringPlansApi = await import(
        "../../../utils/api/monitoringPlansApi"
        )
  });

  describe("Emissions Export", function () {
    it("should enable export button when the emissions checkbox is checked, and download when export is clicked", async function () {
      jest
        .spyOn(qaCertificationsApi, "getReportingPeriod")
        .mockResolvedValue(getReportingPeriod);
      jest
        .spyOn(emissionsApi, "exportEmissionsDataDownload")
        .mockResolvedValue({});
      jest.spyOn(monitoringPlansApi, "exportMonitoringPlanDownload")
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

    describe("Testing Preview Button", ()=>{
      
      let mpCheckboxElement;
      let emissionsCheckboxElement;
      let qaCheckboxElement;
      let previewButtonElement;

      beforeEach(async ()=>{
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

        mpCheckboxElement = screen.getByLabelText("Monitoring Plan");
        emissionsCheckboxElement = screen.getByLabelText("Emissions");
        qaCheckboxElement = screen.getByLabelText("QA & Certification");                  
        previewButtonElement = screen.getByRole("button", {name: "Preview"});
      })

      it("should render the component with the preview button disabled", ()=>{
        expect(previewButtonElement.disabled).toBe(true)
      })

      it("should disable preview button when MP is checked", ()=>{  
        fireEvent.click(mpCheckboxElement)
        expect(previewButtonElement.disabled).toBe(true)
      })
      
      it("should disable preview button when Emissions is checked", ()=>{
        fireEvent.click(emissionsCheckboxElement)
        expect(previewButtonElement.disabled).toBe(true)
      })

      it("should enable preview button when QA is checked", async ()=>{
        fireEvent.click(qaCheckboxElement)
        expect(previewButtonElement.disabled).toBe(false)
      })
    })
  });
});
