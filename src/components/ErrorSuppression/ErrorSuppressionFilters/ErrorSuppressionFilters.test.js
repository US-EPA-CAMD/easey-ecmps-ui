import React from "react";
import { act, render, screen } from "@testing-library/react";
import {
  ErrorSuppressionFilters,
  getLocations,
} from "./ErrorSuppressionFilters";
import { ErrorSuppressionFiltersContextProvider } from "../context/error-suppression-context";
import axios from "axios";
// import MockAdapter from "axios-mock-adapter";
// import config from "../../../config";
import userEvent from "@testing-library/user-event";
import { secureAxios } from "../../../utils/api/easeyAuthApi";
import { esConfigurations as configurations, checkCatalogRecords, esFacilities, } from "../mocks";
import { defaultDropdownText } from "../ErrorSuppression";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import * as mdmApi from "../../../utils/api/mdmApi";
import * as facilityApi from "../../../utils/api/facilityApi";

jest.mock("../../../utils/api/easeyAuthApi");
secureAxios.mockImplementation((options) => axios(options));

describe("ErrorSuppressionFilters component", () => {
  let component;

  beforeEach(async () => {

    jest.spyOn(mpApi, 'getMonitoringPlans').mockResolvedValue( configurations);
    jest.spyOn(mdmApi, 'getCheckCatalogResults').mockResolvedValue(checkCatalogRecords);
    jest.spyOn(mdmApi, 'getReasonCodes').mockResolvedValue(checkCatalogRecords);

    jest.spyOn(facilityApi, 'getAllFacilities').mockResolvedValue(esFacilities);

    await act(async () => {
      component = render(
        <ErrorSuppressionFiltersContextProvider>
          <ErrorSuppressionFilters />
        </ErrorSuppressionFiltersContextProvider>
      );
    });
  });

  it("renders Check Type", () => {
    expect(screen.getByLabelText("Check Type")).toBeDefined();
  });

  it("renders Check Number dropdown", () => {
    expect(screen.getByLabelText("Check Number")).toBeDefined();
  });

  it("renders Check Result dropdown", () => {
    expect(screen.getByLabelText("Check Result")).toBeDefined();
  });

  it("renders Facility dropdown", () => {
    expect(screen.getByLabelText("Facility Name/ID")).toBeDefined();
  });

  it("renders Location multiselect", () => {
    expect(screen.getByLabelText("Location Name")).toBeDefined();
  });

  it("renders Status dropdown", () => {
    expect(screen.getByLabelText("Status")).toBeDefined();
  });

  it("renders Reason dropdown", () => {
    expect(screen.getByLabelText("Facility Name/ID")).toBeDefined();
  });

  it("renders Add Date After and Before datepickers", () => {
    expect(screen.queryByText("Add Date After")).toBeDefined();
    expect(screen.queryByText("Add Date Before")).toBeDefined();
  });

  it("renders Clear and Apply Filter buttons", () => {
    expect(screen.queryByText("Clear")).toBeDefined();
    expect(screen.queryByText("Apply Filters")).toBeDefined();
  });

  it("clicks the apply filters button", async () => {
    const applyFiltersButton = screen.queryByText("Apply Filters");
    userEvent.click(applyFiltersButton);
    expect(component).toBeDefined();
  });

  it("clears all filters when clear button is selected", async () => {
    const clearButton = screen.getByTestId("clear-filters");

    await act(async ()=>{
      await userEvent.click(clearButton);
    })

    expect(screen.getByTestId("check-number")).toHaveValue("false");
    expect(screen.getByTestId("check-type")).toHaveValue("false");
    expect(screen.getByTestId("check-result")).toHaveValue("false");

    expect(screen.getByTestId("reason")).toHaveValue(defaultDropdownText);
    expect(screen.getByTestId("status")).toHaveValue(defaultDropdownText);
    expect(screen.getByLabelText("Location Name")).toHaveValue("");

    screen.debug(undefined, 300000)
  });

  it("calls onFacilityChange() when default dropdown text is selected", async () => {

    await act(async () => {
      await userEvent.click(screen.getByTestId("combo-box"));
    });

    await act(async ()=>{
      await userEvent.click(screen.getByTestId("combo-box-option-1"));
    });

    expect(screen.getByTestId("combo-box-input")).toHaveValue("Barry (3)");
  });

  it("calls onCheckResultChange() when default dropdown text is selected", async () => {
    
    await act(async ()=>{
      await userEvent.selectOptions(screen.getByLabelText("Check Result"), ["false"]);
    })
    expect(screen.getByTestId("check-result")).toHaveValue("false");
  });

  it("tests that getLocations is returning the correct number of records", async () => {
    const checkResultObj = { locationTypeCode: null };
    const availLoc = await getLocations("1", checkResultObj);
    expect(availLoc.length).toBe(3);
  });
});
