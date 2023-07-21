import React from "react";
import {
  render,
  screen,
  act,
} from "@testing-library/react";
import FilterFormAdmin from "./FilterFormAdmin";
import * as monitorPlanApi from "../../../utils/api/monitoringPlansApi";
import * as adminManagementApi from "../../../utils/api/adminManagementApi";
import {
  SUBMISSION_ACCESS_STORE_NAME,
  QA_CERT_DATA_MAINTENANCE_STORE_NAME
} from "../../../additional-functions/system-admin-section-and-store-names";
import { getMockMonitorPlanConfigurations } from "../../../mocks/functions";

describe("FilterFormAdmin", () => {
  beforeEach(() => {
    jest.spyOn(monitorPlanApi, "getMonitoringPlans").mockResolvedValue({
      data: getMockMonitorPlanConfigurations()
    });

    jest.spyOn(adminManagementApi, "getEmSubmissionRecords").mockResolvedValue({
      data: []
    })
    jest.spyOn(adminManagementApi, "getQaTestMaintenanceRecords").mockResolvedValue({
      data: []
    })
    jest.spyOn(adminManagementApi, "getQaCertEventMaintenanceRecords").mockResolvedValue({
      data: []
    })
    jest.spyOn(adminManagementApi, "getQaExtensionExemptionMaintenanceRecords").mockResolvedValue({
      data: []
    })
  });

  it("should exist facility dropdown", async () => {
    await act(async () => {
      render(
        <FilterFormAdmin
          facilities={[{
            value: 3,
            label: 'Barry (3)',
          }]}
          reportingPeriods={[{
            "periodAbbreviation": "2023 Q3",
          }]}
          setTableData={jest.fn()}
        />);
    })

    const facElement = screen.getAllByText("Barry (3)");
    expect(facElement.length).toEqual(2)

  });

  it("should exist reporting period dropdown", async () => {
    await act(async () => {
      render(
        <FilterFormAdmin
          facilities={[]}
          reportingPeriods={[{
            "periodAbbreviation": "2023 Q3",
          }]}
          section={SUBMISSION_ACCESS_STORE_NAME}
          setTableData={jest.fn()}
        />);
    })

    const period1Element = screen.getByText("2023 Q3");
    expect(period1Element).toBeDefined()

  });

  it("should exist status dropdown", async () => {
    await act(async () => {
      render(
        <FilterFormAdmin
          facilities={[]}
          reportingPeriods={[{
            "periodAbbreviation": "2023 Q3",
          }]}
          section={SUBMISSION_ACCESS_STORE_NAME}
          setTableData={jest.fn()}
        />);
    })

    const elem1 = screen.getByText("Open");
    const elem2 = screen.getByText("Closed");
    const elem3 = screen.getByText("Pending Approval");
    expect(elem1).toBeDefined()
    expect(elem2).toBeDefined()
    expect(elem3).toBeDefined()
  });

  it("should exist type dropdown", async () => {
    await act(async () => {
      render(
        <FilterFormAdmin
          facilities={[]}
          reportingPeriods={[{
            "periodAbbreviation": "2023 Q3",
          }]}
          section={QA_CERT_DATA_MAINTENANCE_STORE_NAME}
          setTableData={jest.fn()}
        />);
    })

    const elem1 = screen.getByText("Test Summary");
    const elem2 = screen.getByText("Cert Events");
    const elem3 = screen.getByText("Test Extension Exemption");
    expect(elem1).toBeDefined()
    expect(elem2).toBeDefined()
    expect(elem3).toBeDefined()
  });
});
