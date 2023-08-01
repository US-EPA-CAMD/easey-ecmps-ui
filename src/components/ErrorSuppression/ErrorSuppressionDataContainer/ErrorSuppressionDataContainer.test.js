import React from "react";
import { act, render, screen } from "@testing-library/react";
import { ErrorSuppressionDataContainer } from "./ErrorSuppressionDataContainer";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import * as context from "../context/error-suppression-context";
import {
  ErrorSuppressionFiltersContext,
  useSuppressionFiltersStore,
} from "../context/error-suppression-context";
import { secureAxios } from "../../../utils/api/easeyAuthApi";
import * as errorSuppressionApi from "../../../utils/api/errorSuppressionApi";
import { esRecords, esContext } from "../mocks";

jest.mock("../../../utils/api/easeyAuthApi");
secureAxios.mockImplementation((options) => axios(options));

describe("ErrorSuppressionDataContainer component", () => {

  beforeEach(async () => {
    // mocks
    jest.spyOn(errorSuppressionApi, 'getErrorSuppressionRecords').mockResolvedValue(esRecords);
    jest.spyOn(context, "useSuppressionFiltersStore").mockReturnValue(esContext);

    // Mock the context provider
    const ProviderForTest = ({ children }) => {
      const p = useSuppressionFiltersStore();

      return (
        <ErrorSuppressionFiltersContext.Provider
          value={p}
        >
          {children}
        </ErrorSuppressionFiltersContext.Provider>
      );
    };
    await act(async () => {
      return render(
        <ProviderForTest>
          <ErrorSuppressionDataContainer />
        </ProviderForTest>
      );
    });
  });

  it("Renders table and the four rows", () => {
    const cb0 = screen.getByTestId("select-cb-0");
    const cb1 = screen.getByTestId("select-cb-1");
    const cb2 = screen.getByTestId("select-cb-2");
    const cb3 = screen.getByTestId("select-cb-3");

    expect(cb0).toBeDefined();
    expect(cb1).toBeDefined();
    expect(cb2).toBeDefined();
    expect(cb3).toBeDefined();
  });

  it("Has the correctly formatted data for Match Time Criteria", () => {
    // when matchTimeTypeCode=QUARTER
    expect(screen.queryByText("2011 Q1 - 2011 Q4")).toBeDefined();
    // when matchTimeTypeCode=DATE
    expect(screen.queryByText("10/25/2011 - 11/25/2011")).toBeDefined();
    // when matchTimeTypeCode=HOUR
    expect(
      screen.queryByText("10/25/2011 11:26:32 - 11/25/2011 11:26:32")
    ).toBeDefined();
    // when matchTimeTypeCode=HISTIND
    expect(screen.queryByText("Historical")).toBeDefined();
  });

  it("Disables deactivate button when no checkboxes are selected and enabled when at least one chceckbox is selected", async () => {
    const deactivateButton = screen.getByTestId("es-deactivate-btn");
    expect(deactivateButton).toBeDisabled();

    const cb0 = screen.getByTestId("select-cb-0");

    await act(async () => {
      await userEvent.click(cb0);
    });

    expect(deactivateButton).not.toBeDisabled();
  });

  it("Disables clone button when multiple checkboxes are selected and enabled when at least one chceckbox is selected", async () => {
    const cloneButton = screen.getByTestId("es-clone-btn");
    expect(cloneButton).toBeDisabled();

    const cb0 = screen.getByTestId("select-cb-0");
    const cb1 = screen.getByTestId("select-cb-1");

    await act(async () => {
      await userEvent.click(cb0);
    });

    // should be enabled when a single row is selected 
    expect(cloneButton).not.toBeDisabled();

    await act(async () => {
      await userEvent.click(cb1);
    });

    // should be disabled when multiple rows selected
    expect(cloneButton).toBeDisabled();
  });

});
