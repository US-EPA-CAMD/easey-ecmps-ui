import React from "react";
import { Provider } from "react-redux";
import { screen } from "@testing-library/react";

import render from "../../mocks/render";
import configureStore from "../../store/configureStore.dev";
import * as mdmApi from "../../utils/api/mdmApi";
import { getMockReportingPeriods } from "../../mocks/functions";
import { ImportHistoricalDataModal } from "./ImportHistoricalDataModal";

describe("ImportHistoricalDataModal", () => {
  beforeEach(() => {
    jest.spyOn(mdmApi, "getReportingPeriods").mockResolvedValue({
      data: { items: getMockReportingPeriods() },
      status: 200,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("loads completed quarters only for emissions historical import", async () => {
    const store = configureStore({
      openedFacilityTabs: {
        emissions: [
          {
            checkout: true,
            selectedConfig: { id: "test-config-id" },
          },
        ],
      },
    });

    await render(
      <Provider store={store}>
        <ImportHistoricalDataModal
          closeModalHandler={jest.fn()}
          setIsLoading={jest.fn()}
          setFinishedLoading={jest.fn()}
          importedFileErrorMsgs={[]}
          setImportedFileErrorMsgs={jest.fn()}
          workspaceSectionName="Emissions"
          portCallback={jest.fn()}
        />
      </Provider>,
    );

    expect(await screen.findByText("Reporting Periods")).toBeInTheDocument();
    expect(mdmApi.getReportingPeriods).toHaveBeenCalledWith({
      excludeCurrentQuarter: true,
    });
  });
});
