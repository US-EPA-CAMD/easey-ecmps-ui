import React from "react";
import { render, screen, act } from "@testing-library/react";
import { AddErrorSupressionModal } from "./AddErrorSuppressionModal";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../../config";
import { ErrorSuppressionFiltersContext } from "../context/error-suppression-context";
import * as esFunctions from "./esFunctions";
import * as mdmApi from "../../../utils/api/mdmApi";
import * as facilityApi from "../../../utils/api/facilityApi";
import {
  configurations,
  reasonCodes,
  facilities,
  checkCatalogResult,
} from "./mocks";

describe("AddErrorSupressionModal component", () => {
  const mock = new MockAdapter(axios);
  global.scrollTo = jest.fn();

  const orisCode = 6481;

  mock
    .onGet(
      `${config.services.monitorPlans.uri}/configurations?orisCodes=${orisCode}`
    )
    .reply(200, configurations);

  mock.onGet(`${config.services.mdm.uri}/es-severity-codes`).reply(200, [
    { severityCode: "NONE", severityDescription: "No Errors" },
    { severityCode: "ADMNOVR", severityDescription: "Administrative Override" },
  ]);

  describe("Clone screen", () => {
    beforeEach(() => {
      jest
        .spyOn(esFunctions, "createMatchTypeDropdownLists")
        .mockResolvedValue([{ label: "Match Data Label", value: "matchVal" }]);
      jest
        .spyOn(mdmApi, "getCheckCatalogResults")
        .mockResolvedValue(checkCatalogResult);
      jest.spyOn(mdmApi, "getReasonCodes").mockResolvedValue(reasonCodes);
      jest.spyOn(facilityApi, "getAllFacilities").mockResolvedValue(facilities);
    });

    const tableRow = {
      id: 482,
      checkCatalogResultId: 715,
      checkTypeCode: "LINEAR",
      checkNumber: 12,
      checkResultCode: "A",
      severityCode: "NONE",
      facilityId: 864,
      orisCode: 6481,
      locations: "1SGA",
      matchDataTypeCode: "PARAM",
      matchDataValue: "EPA-023-1024",
      matchTimeTypeCode: "DATE",
      matchTimeBeginValue: "2009-05-05T17:40:29.000Z",
      matchTimeEndValue: "2009-05-06T17:40:29.000Z",
      matchHistoricalIndicator: null,
      reasonCode: "APPROVE",
      note: "Approved by Matt B.  See RT 8808.",
      active: false,
      userId: "PQA",
      addDate: "2009-05-05T17:40:29.000Z",
      updateDate: "2009-12-16T11:55:28.000Z",
      selected: true,
    };
    let contextMock = {
      transformedData: {
        LINEAR: {
          12: [
            {
              id: "715",
              checkTypeCode: "LINEAR",
              checkTypeDescription: "Linearity Check",
              checkNumber: "12",
              checkResult: "A",
              locationTypeCode: "LOC",
              timeTypeCode: "DATE",
              dataTypeCode: "PARAM",
              dataTypeLabel: "Test Number",
              dataTypeUrl:
                "/qa-certification-mgmt/workspace/locations/{id}/test-summary",
            },
          ],
        },
      },
      facilityList: [],
      reasonCodeList: [],
    };

    it("should populate the form with proper values", async () => {
      await act(async () =>
        render(
          <ErrorSuppressionFiltersContext.Provider value={contextMock}>
            <AddErrorSupressionModal values={tableRow} />
          </ErrorSuppressionFiltersContext.Provider>
        )
      );
      expect(screen.getByTestId("add-check-type")).toBeDefined();
      expect(screen.getByTestId("add-check-number")).toBeDefined();
      expect(screen.getByTestId("add-check-result")).toBeDefined();
      expect(screen.getByTestId("add-severity-code")).toBeDefined();
      expect(screen.getByTestId("add-reason")).toBeDefined();
      expect(screen.queryByText("add-notes")).toBeDefined();
    });

    it("should display the proper time criteria row for timeTimeCode=DATE", async () => {
      await act(async () =>
        render(
          <ErrorSuppressionFiltersContext.Provider value={contextMock}>
            <AddErrorSupressionModal values={tableRow} />
          </ErrorSuppressionFiltersContext.Provider>
        )
      );
      expect(screen.getByTestId("time-type-code-date")).toBeDefined();
      expect(screen.queryByTestId("time-type-code-historical")).toBeNull();
      expect(screen.queryByTestId("time-type-code-hour")).toBeNull();
      expect(screen.queryByTestId("time-type-code-quarter")).toBeNull();
    });

    it("should display the proper time criteria row for timeTimeCode=HISTIND", async () => {
      const ctxVal = { ...contextMock };
      ctxVal["transformedData"]["LINEAR"]["12"][0].timeTypeCode = "HISTIND";
      const row = { ...tableRow };
      row.matchTimeTypeCode = "HISTIND";
      row.matchHistoricalIndicator = true;
      await act(async () =>
        render(
          <ErrorSuppressionFiltersContext.Provider value={ctxVal}>
            <AddErrorSupressionModal values={row} />
          </ErrorSuppressionFiltersContext.Provider>
        )
      );
      expect(screen.getByTestId("time-type-code-historical")).toBeDefined();
      expect(screen.queryByTestId("time-type-code-date")).toBeNull();
      expect(screen.queryByTestId("time-type-code-hour")).toBeNull();
      expect(screen.queryByTestId("time-type-code-quarter")).toBeNull();
    });

    it("should display the proper time criteria row for timeTimeCode=QUARTER", async () => {
      const ctxVal = { ...contextMock };
      ctxVal["transformedData"]["LINEAR"]["12"][0].timeTypeCode = "QUARTER";
      const row = { ...tableRow };
      row.matchTimeTypeCode = "QUARTER";
      row.matchHistoricalIndicator = true;
      await act(async () =>
        render(
          <ErrorSuppressionFiltersContext.Provider value={ctxVal}>
            <AddErrorSupressionModal values={row} />
          </ErrorSuppressionFiltersContext.Provider>
        )
      );
      expect(screen.getByTestId("time-type-code-quarter")).toBeDefined();
      expect(screen.queryByTestId("time-type-code-date")).toBeNull();
      expect(screen.queryByTestId("time-type-code-hour")).toBeNull();
      expect(screen.queryByTestId("time-type-code-historical")).toBeNull();
    });

    it("should display the proper time criteria row for timeTimeCode=HOUR", async () => {
      const ctxVal = { ...contextMock };
      ctxVal["transformedData"]["LINEAR"]["12"][0].timeTypeCode = "HOUR";
      const row = { ...tableRow };
      row.matchTimeTypeCode = "HOUR";
      row.matchHistoricalIndicator = true;
      await act(async () =>
        render(
          <ErrorSuppressionFiltersContext.Provider value={ctxVal}>
            <AddErrorSupressionModal values={row} />
          </ErrorSuppressionFiltersContext.Provider>
        )
      );
      expect(screen.getByTestId("time-type-code-hour")).toBeDefined();
      expect(screen.queryByTestId("time-type-code-date")).toBeNull();
      expect(screen.queryByTestId("time-type-code-quarter")).toBeNull();
      expect(screen.queryByTestId("time-type-code-historical")).toBeNull();
    });
  });
});
