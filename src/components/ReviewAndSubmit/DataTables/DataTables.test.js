import React from "react";
import { render, act } from "@testing-library/react";

import DataTables from "./DataTables";

let mockRowState = {
  submissionAvailabilityCode: "REQUIRE",
  checkedOut: false,
  userCheckedOut: false,
  evalStatusCode: "PASS",
  orisCode: 1,
};

jest.mock("../TableRender/TableRender", () => {
  const { forwardRef } = jest.requireActual("react"); //Need this to mock a forwardRef
  return {
    __esModule: true,
    default: forwardRef(({ getRowState, selectMonPlanRow, type }, mockRef) => (
      <div>
        <button>{`${type}:${getRowState(mockRowState, "MP")}`}</button>
        <button
          onClick={() => {
            selectMonPlanRow("testId");
          }}
        >
          {`${type}:SELECT MON PLAN ROW`}
        </button>
      </div>
    )),
  };
});

describe("Review and Submit Tables component", () => {
  it("expect initial loading state to be correct", async () => {
    let query = render(
      <DataTables
        monPlanState={[]}
        setMonPlanState={jest.fn()}
        monPlanRef={{
          current: [
            {
              selected: false,
              userCheckedOut: false,
              monPlanId: "testId",
              orisCode: 1,
            },
          ],
        }}
        permissions={{ current: { 1: ["DSMP"] } }}
        updateFilesSelected={jest.fn()}
      />
    );

    const { getByText } = query;
    expect(getByText("MP:Checkbox")).toBeInTheDocument();
    expect(getByText("MP:SELECT MON PLAN ROW")).toBeInTheDocument();
  });

  it("expect lock to be shown if record is checked out", async () => {
    mockRowState = {
      submissionAvailabilityCode: "REQUIRE",
      checkedOut: true,
      userCheckedOut: false,
      evalStatusCode: "PASS",
      orisCode: 1,
    };

    let { getByText } = render(
      <DataTables
        monPlanState={[]}
        setMonPlanState={jest.fn()}
        monPlanRef={{
          current: [
            {
              selected: false,
              userCheckedOut: false,
              monPlanId: "testId",
              orisCode: 1,
            },
          ],
        }}
        permissions={{ current: { 1: ["DSMP"] } }}
        updateFilesSelected={jest.fn()}
      />
    );

    expect(getByText("MP:Lock")).toBeInTheDocument();
  });

  it("expect view button to show if record is open but does not require submissions", async () => {
    mockRowState = {
      submissionAvailabilityCode: "UPDATED",
      checkedOut: false,
      userCheckedOut: false,
      evalStatusCode: "PASS",
      orisCode: 1,
    };

    let { getByText } = render(
      <DataTables
        monPlanState={[]}
        setMonPlanState={jest.fn()}
        monPlanRef={{
          current: [
            {
              selected: false,
              userCheckedOut: false,
              monPlanId: "testId",
              orisCode: 1,
            },
          ],
        }}
        permissions={{ current: { 1: ["DSMP"] } }}
        updateFilesSelected={jest.fn()}
      />
    );

    expect(getByText("MP:View")).toBeInTheDocument();
  });

  it("expect selection of a monitor plan row to work", async () => {
    mockRowState = {
      submissionAvailabilityCode: "REQUIRE",
      checkedOut: false,
      userCheckedOut: false,
      evalStatusCode: "PASS",
      orisCode: 1,
    };

    const currentRef = {
      current: [
        {
          selected: false,
          userCheckedOut: false,
          monPlanId: "testId",
          orisCode: 1,
          evalStatusCode: "PASS",
        },
      ],
    };

    let { getByText } = render(
      <DataTables
        monPlanState={[]}
        setMonPlanState={jest.fn()}
        monPlanRef={currentRef}
        permissions={{ current: { 1: ["DSMP"] } }}
        updateFilesSelected={jest.fn()}
      />
    );

    await act(async () => {
      getByText("MP:SELECT MON PLAN ROW").click();
    });

    expect(currentRef.current[0].selected).toBe(true);
  });
});
