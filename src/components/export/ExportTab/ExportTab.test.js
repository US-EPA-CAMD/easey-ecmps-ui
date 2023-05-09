import React from "react";
import ExportTab from "./ExportTab";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import {
  EXPORT_TAB_TEST_EXPORT_STATE,
  exportQAResponse,
  mockReportingPeriod,
  selectedConfig,
} from "./ExportTab.test.mocks";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../../config";
import { secureAxios } from "../../../utils/api/easeyAuthApi";

const mock = new MockAdapter(axios);

const idRegex = "[\\w\\-]+";

const getReportingPeriodUrl = `${config.services.mdm.uri}/reporting-periods?export=true`;
mock.onGet(getReportingPeriodUrl).reply(200, mockReportingPeriod);

const exportQAUrl = new RegExp(
  `${config.services.qaCertification.uri}/export?facilityId=3&unitIds=1|2&stackPipeIds=CS0AAN&beginDate=${idRegex}&endDate=${idRegex}`
);
mock.onGet(exportQAUrl).reply(200, exportQAResponse);

const exportEndpoint = `${config.services.monitorPlans.uri}/plans/export?planId=TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A`;
mock.onGet(exportEndpoint).reply(200, "exported");

jest.mock("../../../utils/api/easeyAuthApi");
secureAxios.mockImplementation((options) => axios(options));

describe("ExportTab", function () {
  let emissionsApi;
  let monitoringPlansApi;

  beforeAll(async () => {
    emissionsApi = await import("../../../utils/api/emissionsApi");
    monitoringPlansApi = await import("../../../utils/api/monitoringPlansApi");
  });

  describe("Emissions Export", function () {
    it("should enable export button when the emissions checkbox is checked, and download when export is clicked", async function () {
      jest
        .spyOn(emissionsApi, "exportEmissionsDataDownload")
        .mockResolvedValue({});
      jest
        .spyOn(monitoringPlansApi, "exportMonitoringPlanDownload")
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

  describe("QA & Cert Export", () => {
    test("when qa&cert is checked and no rows are selected then export should be disabled", async () => {
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
      const qaCertCheckbox = screen.getByRole("checkbox", {
        name: "QA & Certification",
      });
      const exportButton = screen.getByRole("button", {
        name: "Export",
      });

      userEvent.click(qaCertCheckbox);
      expect(exportButton).not.toBeEnabled();
    });

    /*
    test("when qa&cert is checked and rows selected then export should be enabled", async () => {
      await act(async () => {
        return render(
          <ExportTab
            orisCode={3}
            exportState={EXPORT_TAB_TEST_EXPORT_STATE}
            setExportState={() => null}
            workspaceSection={"export"}
            selectedConfig={selectedConfig}
            facility={"Barry (1, 2, CS0AAN)"}
          />
        );
      });
      const qaCertCheckbox = screen.getByRole("checkbox", {
        name: "QA & Certification",
      });
      const exportButton = screen.getByRole("button", {
        name: "Export",
      });

      await act(async () => {
        userEvent.click(qaCertCheckbox);
      });

      const qaRows = await screen.findAllByRole("row");
      const firstRow = qaRows[0];
      const firstCheckbox = firstRow.querySelector('input[type="checkbox"]'); // Find the checkbox inside the row

      userEvent.click(firstCheckbox);

      expect(firstCheckbox.checked).toBe(true);
      expect(exportButton).toBeEnabled();
    });
    */

    /*
    test("given qa&cert is checked when reporting period is changed then new data is loaded", async () => {
      await act(async () => {
        return render(
          <ExportTab
            orisCode={3}
            exportState={EXPORT_TAB_TEST_EXPORT_STATE}
            setExportState={() => null}
            workspaceSection={"export"}
            selectedConfig={selectedConfig}
            facility={"Barry (1, 2, CS0AAN)"}
          />
        );
      });
      const qaCertCheckbox = screen.getByRole("checkbox", {
        name: "QA & Certification",
      });
      await act(async () => {
        userEvent.click(qaCertCheckbox);
      });

      const reportingPeriodDropdown =
        screen.getByLabelText(/Reporting Periods/i);
      // select new reporting period
      const selectedOptionId = "2";
      await act(async () => {
        userEvent.selectOptions(reportingPeriodDropdown, selectedOptionId);
      });

      // rows are rendered
      const qaRows = await screen.findAllByRole("row");
      expect(qaRows).not.toHaveLength(0);
    });
    */
  });
});
