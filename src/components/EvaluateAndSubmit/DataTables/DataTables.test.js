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

const permissions = { current: { 1: ["DSMP", "DSQA"] } };

let dataList;

jest.mock("../TableRender/TableRender", () => {
  const { forwardRef } = jest.requireActual("react"); //Need this to mock a forwardRef
  return {
    __esModule: true,
    default: forwardRef(
      ({ columns, state, type, getRowState, rowId, selectRow }, mockRef) => (
        <div>
          <button>{`${type}:${getRowState(mockRowState, type)}`}</button>
          <button
            onClick={() => {
              selectRow(mockRef.current[0], true, type);
            }}
          >
            {`${type}:SELECT ROW`}
          </button>
        </div>
      )
    ),
  };
});

jest.mock("../../../additional-functions/checkout", () => ({
  checkoutAPI: jest.fn(),
}));

describe("Review and Submit Tables component", () => {
  beforeAll(() => {
    dataList = [
      {
        columns: [],
        ref: {
          current: [
            {
              selected: false,
              userCheckedOut: false,
              monPlanId: "testId",
              orisCode: 1,
              evalStatusCode: "PASS",
            },
          ],
        },
        state: [],
        setState: jest.fn(),
        call: jest.fn(),
        rowId: "monPlanId",
        name: "Monitoring Plan",
        type: "MP",
      },
      {
        columns: [],
        ref: {
          current: [
            {
              selected: false,
              userCheckedOut: false,
              testSumId: "testId",
              monPlanId: "testId",
              periodAbbreviation: "mock",
              orisCode: 1,
              evalStatusCode: "PASS",
            },
          ],
        },
        state: [],
        setState: jest.fn(),
        call: jest.fn(),
        rowId: "testSumId",
        name: "Test Data",
        type: "QA",
      },
      {
        columns: [],
        ref: {
          current: [
            {
              selected: false,
              userCheckedOut: false,
              testSumId: "testId",
              monPlanId: "testId",
              periodAbbreviation: "mock",
              orisCode: 1,
              evalStatusCode: "PASS",
            },
          ],
        },
        state: [],
        setState: jest.fn(),
        call: jest.fn(),
        rowId: "testSumId",
        name: "Cert Evnts",
        type: "QA1",
      },
      {
        columns: [],
        ref: {
          current: [
            {
              selected: false,
              userCheckedOut: false,
              testSumId: "testId",
              monPlanId: "testId",
              periodAbbreviation: "mock",
              orisCode: 1,
              evalStatusCode: "PASS",
            },
          ],
        },
        state: [],
        setState: jest.fn(),
        call: jest.fn(),
        rowId: "testSumId",
        name: "TEE Events",
        type: "QA2",
      },
      {
        columns: [],
        ref: {
          current: [
            {
              selected: false,
              userCheckedOut: false,
              periodAbbreviation: "mock",
              monPlanId: "testId",
              orisCode: 1,
              evalStatusCode: "PASS",
            },
          ],
        },
        state: [],
        setState: jest.fn(),
        call: jest.fn(),
        rowId: "periodAbbreviation",
        name: "Emissions",
        type: "EM",
      },
    ];
  });

  it("expect initial loading state to be correct for submission", async () => {
    let query = render(
      <DataTables
        dataList={dataList}
        permissions={permissions}
        updateFilesSelected={jest.fn()}
        componentType="Submission"
        monitorPlanIdToSelectedMap={new Map()}
        userCheckedOutPlans={{ current: [] }}
      />
    );

    const { getByText } = query;
    expect(getByText("QA:Checkbox")).toBeInTheDocument();
    expect(getByText("QA:SELECT ROW")).toBeInTheDocument();
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
        dataList={dataList}
        permissions={permissions}
        updateFilesSelected={jest.fn()}
        componentType="Submission"
        monitorPlanIdToSelectedMap={new Map()}
        userCheckedOutPlans={{ current: [] }}
      />
    );

    expect(getByText("QA:Lock")).toBeInTheDocument();
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
        dataList={dataList}
        permissions={permissions}
        updateFilesSelected={jest.fn()}
        componentType="Submission"
        monitorPlanIdToSelectedMap={new Map()}
        userCheckedOutPlans={{ current: [] }}
      />
    );

    expect(getByText("QA:View")).toBeInTheDocument();
  });

  it("expect selection of a qa record to select qa and monitor plan", async () => {
    mockRowState = {
      submissionAvailabilityCode: "REQUIRE",
      checkedOut: false,
      userCheckedOut: false,
      evalStatusCode: "PASS",
      orisCode: 1,
    };

    let { getByText } = render(
      <DataTables
        dataList={dataList}
        permissions={permissions}
        updateFilesSelected={jest.fn()}
        componentType="Submission"
        monitorPlanIdToSelectedMap={{ current: new Map() }}
        userCheckedOutPlans={{ current: new Set() }}
      />
    );

    await act(async () => {
      await getByText("QA:SELECT ROW").click();
    });

    expect(dataList[1].ref.current[0].selected).toBe(true);
    expect(dataList[0].ref.current[0].selected).toBe(true);
  });

  it("expect selection of an em record to select em, qa and monitor plan", async () => {
    mockRowState = {
      submissionAvailabilityCode: "REQUIRE",
      checkedOut: false,
      userCheckedOut: false,
      evalStatusCode: "PASS",
      orisCode: 1,
    };

    let { getByText } = render(
      <DataTables
        dataList={dataList}
        permissions={permissions}
        updateFilesSelected={jest.fn()}
        componentType="Submission"
        monitorPlanIdToSelectedMap={{ current: new Map() }}
        userCheckedOutPlans={{ current: new Set() }}
      />
    );

    await act(async () => {
      await getByText("EM:SELECT ROW").click();
    });

    expect(dataList[2].ref.current[0].selected).toBe(true);
    expect(dataList[1].ref.current[0].selected).toBe(true);
    expect(dataList[0].ref.current[0].selected).toBe(true);
  });

  it("expect initial loading state to be correct for evaluate checkbox", async () => {
    mockRowState = {
      submissionAvailabilityCode: "REQUIRE",
      checkedOut: false,
      userCheckedOut: false,
      evalStatusCode: "EVAL",
      orisCode: 1,
    };

    let query = render(
      <DataTables
        dataList={dataList}
        permissions={permissions}
        updateFilesSelected={jest.fn()}
        componentType="Evaluate"
        monitorPlanIdToSelectedMap={{ current: new Map() }}
        userCheckedOutPlans={{ current: new Set() }}
      />
    );

    const { getByText } = query;
    expect(getByText("MP:Checkbox")).toBeInTheDocument();
    expect(getByText("MP:SELECT ROW")).toBeInTheDocument();
  });

  it("expect initial loading state to be correct for evaluate lock", async () => {
    mockRowState = {
      submissionAvailabilityCode: "REQUIRE",
      checkedOut: true,
      userCheckedOut: false,
      evalStatusCode: "EVAL",
      orisCode: 1,
    };

    let query = render(
      <DataTables
        dataList={dataList}
        permissions={permissions}
        updateFilesSelected={jest.fn()}
        componentType="Evaluate"
        monitorPlanIdToSelectedMap={{ current: new Map() }}
        userCheckedOutPlans={{ current: new Set() }}
      />
    );

    const { getByText } = query;
    expect(getByText("MP:Lock")).toBeInTheDocument();
    expect(getByText("MP:SELECT ROW")).toBeInTheDocument();
  });

  it("expect initial loading state to be correct for evaluate view button", async () => {
    mockRowState = {
      submissionAvailabilityCode: "REQUIRE",
      checkedOut: false,
      userCheckedOut: false,
      evalStatusCode: "PASS",
      orisCode: 1,
    };

    let query = render(
      <DataTables
        dataList={dataList}
        permissions={permissions}
        updateFilesSelected={jest.fn()}
        componentType="Evaluate"
        monitorPlanIdToSelectedMap={{ current: new Map() }}
        userCheckedOutPlans={{ current: new Set() }}
      />
    );

    const { getByText } = query;
    expect(getByText("MP:View")).toBeInTheDocument();
    expect(getByText("MP:SELECT ROW")).toBeInTheDocument();
  });
});
