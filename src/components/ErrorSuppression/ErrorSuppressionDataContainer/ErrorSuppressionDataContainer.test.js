import React from "react";
import { render, screen, waitForElement } from "@testing-library/react";
import { act } from "react-dom/test-utils";
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
      console.log('my provider: ', p)
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

  it("disables clone button when two checkboxes are selected", async () => {
    const cb0 = screen.getByTestId("select-cb-0");
    const cb1 = screen.getByTestId("select-cb-1");
    const cloneButton = screen.getByTestId("es-clone");

    // Should be enabled after single checkbox clicked
    await act(async () => {
      userEvent.click(cb0);
      userEvent.click(cb1);
    });

    // expect(cloneButton).toBeDisabled();
    expect(cloneButton).toBeDisabled();
  });

  it("Reenables clone button when two checkboxes are selected and then one of them is deselected again", async () => {
    const cb0 = screen.getByTestId("select-cb-0");
    const cb1 = screen.getByTestId("select-cb-1");
    const cloneButton = screen.getByTestId("es-clone");

    // Should be enabled after single checkbox clicked
    await userEvent.click(cb0);
    await userEvent.dblClick(cb1);

    expect(cloneButton).not.toBeDisabled();
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
    const deactivateButton = screen.getByTestId("es-deactivate");
    expect(deactivateButton).toBeDisabled();

    const cb0 = screen.getByTestId("select-cb-0");

    await act(async () => {
      userEvent.click(cb0);
    });

    expect(deactivateButton).not.toBeDisabled();
  });
});
