import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { ErrorSuppressionFilters, getLocations } from "./ErrorSuppressionFilters";
import { ErrorSuppressionFiltersContextProvider } from "../context/error-suppression-context";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../../config";
import userEvent from "@testing-library/user-event";
import { testtest } from "./ErrorSuppressionFilters";
import { defaultDropdownText } from "../ErrorSuppression";

const configurations = [
  {
    id: "MDC-DSF87364AD9879A8FDS7G",
    name: "1, 2, CS0AAN",
    locations: [
      {
        id: "BZ5461",
        name: "1",
        type: "Unit",
        unitId:"1"
      },
      {
        id: "CZ5461",
        name: "2",
        type: "Unit",
        unitId:"2"
      },
      {
        id: "DA5461",
        name: "CS0AAN",
        type: "StackPipe",
        stackPipeId:"CS0AAN"
      },
    ],
  },
];
const orisCode = [1, 3];
const mock = new MockAdapter(axios);
mock.onGet(`${config.services.mdm.uri}/es-reason-codes`).reply(200, [
  {
    errorSuppressionReasonCode: "BUG",
    errorSuppressionReasonDescription: "Application Bug",
  },
]);

mock.onGet(`${config.services.facilities.uri}/facilities`).reply(200, [
  {
    facilityRecordId: 1,
    facilityId: 3,
    facilityName: "Barry",
    stateCode: "AL",
  },
]);

mock
  .onGet(`${config.services.mdm.uri}/es-check-catalog-results`)
  .reply(200, [
    {
      id: "5003",
      checkTypeCode: "ADESTAT",
      checkTypeDescription: "Appendix D and E Status",
      checkNumber: "6",
      checkResult: "Accuracy Test Not Yet Evaluated",
      locationTypeCode: "LOC",
      timeTypeCode: "HOUR",
      dataTypeCode: "FUELTYP",
      dataTypeLabel: "Fuel Type",
      dataTypeUrl: "/master-data-mgmt/fuel-type-codes",
    },
  ]);

mock
  .onGet(
    `${
      config.services.monitorPlans.uri
    }/configurations?orisCodes=${orisCode[0]}`
  )
  .reply(200, configurations);

describe("ErrorSuppressionFilters component", () => {
  let component;
  // afterAll(() => {
  //   mock.reset();
  // });
  beforeEach(async () => {

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

  it("renders Active checkbox", () => {
    expect(screen.getByLabelText("Active")).toBeDefined();
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
    await userEvent.click(clearButton);
    expect(screen.getByTestId("check-number")).toHaveValue(
      "false"
    );
    expect(screen.getByTestId("check-type")).toHaveValue(
      "false"
    );
    expect(screen.getByTestId("check-result")).toHaveValue(
      "false"
    );
    expect(screen.getByTestId("facility-name")).toHaveValue(defaultDropdownText);
    expect(screen.getByTestId("reason")).toHaveValue("false");
    expect(screen.getByTestId("is-active")).not.toBeChecked();
    expect(screen.getByLabelText("Location Name")).toHaveValue("");
  });
});

describe("getLocations()", ()=>{

  it('tests that getLocations is returning the correct number of records', async()=>{
    const checkResultObj={locationTypeCode:null};
    const availLoc = await getLocations(orisCode[0], checkResultObj);
    expect(availLoc.length).toBe(3);
  })
})