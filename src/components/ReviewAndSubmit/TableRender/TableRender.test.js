import React from "react";
import { render, act, screen, fireEvent } from "@testing-library/react";
import TableRender from "./TableRender";

const mockFunc = jest.fn();
window.open = mockFunc;

let mockRowState = {
  submissionAvailabilityCode: "REQUIRE",
  checkedOut: false,
  userCheckedOut: false,
  evalStatusCode: "PASS",
  orisCode: 1,
  monPlanId: "testId",
};

jest.mock(
  "../ReviewCell/ReviewCell",
  () =>
    ({
      row,
      handleRowSelection,
      handleRowView,
      type,
      getRowState,
      setSelectAllState,
    }) => {
      return (
        <div>
          <button
            onClick={() => {
              handleRowSelection(mockRowState, "MP", true);
            }}
          >
            SELECT ROW
          </button>
          <button
            onClick={() => {
              handleRowView(mockRowState);
            }}
          >
            VIEW ROW
          </button>
        </div>
      );
    }
);
const mockApiCall = jest.fn().mockResolvedValue({
  data: [],
});
jest.mock("../../../additional-functions/checkout", () => ({
  checkoutAPI: () => mockApiCall(),
}));
describe("Review and Submit Tables component", () => {
  it("expect row selection to select row in current ref", async () => {
    const currentRows = {
      current: [
        {
          selected: false,
          userCheckedOut: false,
          monPlanId: "testId",
          orisCode: 1,
        },
      ],
    };

    let query = render(
      <TableRender
        columns={[
          {
            name: "ORIS Code",
            selector: "orisCode",
          },
        ]}
        state={[{ orisCode: 1 }]}
        setState={jest.fn()}
        name={"Monitor Plans"}
        type="MP"
        selectMonPlanRow={jest.fn()}
        getRowState={jest.fn()}
        ref={currentRows}
        updateFilesSelected={jest.fn()}
      />
    );

    const { getByText } = query;

    await act(async () => {
      getByText("SELECT ROW").click();
    });
    expect(currentRows.current[0].selected).toBe(true);
  });
  it("checks out row when it is selected", async () => {
    const currentRows = {
      current: [
        {
          selected: false,
          userCheckedOut: false,
          monPlanId: "testId",
          orisCode: 1,
        },
      ],
    };

    let query = render(
      <TableRender
        columns={[
          {
            name: "ORIS Code",
            selector: "orisCode",
          },
        ]}
        state={[{ orisCode: 1 }]}
        setState={jest.fn()}
        name={"Monitor Plans"}
        type="MP"
        selectMonPlanRow={jest.fn()}
        getRowState={jest.fn()}
        ref={currentRows}
        updateFilesSelected={jest.fn()}
      />
    );

    const { getByText } = query;

    await act(async () => {
      getByText("SELECT ROW").click();
    });
    expect(mockApiCall).toHaveBeenCalled();
  });

  it("expect monitor plan to open on view button click", async () => {
    const currentRows = {
      current: [
        {
          selected: false,
          userCheckedOut: false,
          monPlanId: "testId",
          orisCode: 1,
        },
      ],
    };

    let query = render(
      <TableRender
        columns={[
          {
            name: "ORIS Code",
            selector: "orisCode",
          },
        ]}
        state={[{ orisCode: 1 }]}
        setState={jest.fn()}
        name={"Monitor Plans"}
        type="MP"
        selectMonPlanRow={jest.fn()}
        getRowState={jest.fn()}
        ref={currentRows}
        updateFilesSelected={jest.fn()}
      />
    );

    const { getByText } = query;

    await act(async () => {
      getByText("VIEW ROW").click();
    });
    expect(mockFunc).toHaveBeenCalled();
  });

  it("expect select all to select all of the current rows", async () => {
    const currentRows = {
      current: [
        {
          selected: false,
          userCheckedOut: false,
          monPlanId: "testId",
          orisCode: 1,
        },
        {
          selected: false,
          userCheckedOut: false,
          monPlanId: "testId2",
          orisCode: 2,
        },
      ],
    };

    let query = render(
      <TableRender
        columns={[
          {
            name: "ORIS Code",
            selector: "orisCode",
          },
        ]}
        state={[{ orisCode: 1 }]}
        setState={jest.fn()}
        name={"Monitor Plans"}
        type="MP"
        selectMonPlanRow={jest.fn()}
        getRowState={jest.fn().mockReturnValue("Checkbox")}
        ref={currentRows}
        updateFilesSelected={jest.fn()}
      />
    );

    const checkbox = screen.getByTestId("SelectAll");

    await act(async () => {
      fireEvent.click(checkbox);
    });

    expect(currentRows.current[0].selected).toBe(true);
    expect(currentRows.current[1].selected).toBe(true);
  });

  it("select all checks out selected rows", async () => {
    const currentRows = {
      current: [
        {
          selected: false,
          userCheckedOut: false,
          monPlanId: "testId",
          orisCode: 1,
        },
        {
          selected: false,
          userCheckedOut: false,
          monPlanId: "testId2",
          orisCode: 2,
        },
      ],
    };

    let query = render(
      <TableRender
        columns={[
          {
            name: "ORIS Code",
            selector: "orisCode",
          },
        ]}
        state={[{ orisCode: 1 }]}
        setState={jest.fn()}
        name={"Monitor Plans"}
        type="MP"
        selectMonPlanRow={jest.fn()}
        getRowState={jest.fn().mockReturnValue("Checkbox")}
        ref={currentRows}
        updateFilesSelected={jest.fn()}
      />
    );

    const checkbox = screen.getByTestId("SelectAll");

    await act(async () => {
      fireEvent.click(checkbox);
    });

    expect(mockApiCall).toHaveBeenCalled();
  });
});
