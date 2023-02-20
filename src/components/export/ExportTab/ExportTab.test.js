import React from "react";
import ExportTab from "./ExportTab";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { exportQAResponse, mockReportingPeriod, selectedConfig } from "./ExportTab.test.mocks";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react/dist/pure";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../../config";

const mock = new MockAdapter(axios);

const getReportingPeriodUrl = `${config.services.mdm.uri}/reporting-periods?export=true`;
mock.onGet(getReportingPeriodUrl).reply(200, mockReportingPeriod);

const exportQAUrl = `${config.services.qaCertification.uri}/export?facilityId=3&unitIds=1|2&stackPipeIds=CS0AAN&beginDate=1993-01-01&endDate=1993-03-31`;
mock.onGet(exportQAUrl).reply(200, exportQAResponse)

describe("ExportTab", function () {
  let emissionsApi;
  let monitoringPlansApi;

  beforeAll(async () => {
    emissionsApi = await import("../../../utils/api/emissionsApi");
    monitoringPlansApi = await import(
      "../../../utils/api/monitoringPlansApi"
    )
  });

  describe("Emissions Export", function () {
    it("should enable export button when the emissions checkbox is checked, and download when export is clicked", async function () {
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

    describe("Testing Preview Button", () => {

      let mpCheckboxElement;
      let emissionsCheckboxElement;
      let qaCheckboxElement;
      let previewButtonElement;

      beforeEach(async () => {
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
        previewButtonElement = screen.getByRole("button", { name: "Preview" });
      })

      it("should render the component with the preview button disabled", () => {
        expect(previewButtonElement.disabled).toBe(true)
      })

      it("should disable preview button when MP is checked", () => {
        fireEvent.click(mpCheckboxElement)
        expect(previewButtonElement.disabled).toBe(true)
      })

      it("should disable preview button when Emissions is checked", () => {
        fireEvent.click(emissionsCheckboxElement)
        expect(previewButtonElement.disabled).toBe(true)
      })

      it("should enable preview button when QA is checked", async () => {
        fireEvent.click(qaCheckboxElement)
        expect(previewButtonElement.disabled).toBe(false)
        jest.setTimeout(5000);
      })

      it("should preview data when preview button is clicked", async () => {
        fireEvent.click(qaCheckboxElement)
        expect(previewButtonElement.disabled).toBe(false)
        fireEvent.click(previewButtonElement);
        const testSummaryTitle = await screen.findByText(/Test Summary/i);
        const qaCertTitle = screen.getByText(/QA Certification Events/i);
        const testExtExeTitle = screen.getByText(/Test Extension Exemptions/i);
        expect(testSummaryTitle).toBeInTheDocument();
        expect(qaCertTitle).toBeInTheDocument();
        expect(testExtExeTitle).toBeInTheDocument();
      })
    })
  });
});
