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
      setSelectAllVisible,
    }) => {
      return (
        <div>
          <button
            onClick={() => {
              handleRowView(mockRowState);
            }}
          >
            VIEW ROW
          </button>
          <button
            onClick={() => {
              handleRowSelection(mockRowState, type, true);
            }}
          >
            SELECT INDIVIDUAL
          </button>
        </div>
      );
    }
);

describe("Review and Submit Tables component", () => {
  it("expect select all to select all of the current rows", async () => {
    const selectRowMock = jest.fn();

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
        setState={jest.fn()}
        state={[{ orisCode: 1 }]}
        type="MP"
        getRowState={jest.fn().mockReturnValue("Checkbox")}
        rowId={"monPlanId"}
        ref={currentRows}
        selectRow={selectRowMock}
      />
    );

    const checkbox = screen.getByTestId("SelectAll");

    await act(async () => {
      fireEvent.click(checkbox);
    });

    expect(selectRowMock).toHaveBeenCalledTimes(2);
  });

  it("expect select individual to select an individual row", async () => {
    const selectRowMock = jest.fn();

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

    let { getByText } = render(
      <TableRender
        columns={[
          {
            name: "ORIS Code",
            selector: "orisCode",
          },
        ]}
        setState={jest.fn()}
        state={[{ orisCode: 1 }]}
        type="MP"
        getRowState={jest.fn().mockReturnValue("Checkbox")}
        rowId={"monPlanId"}
        ref={currentRows}
        selectRow={selectRowMock}
      />
    );

    await act(async () => {
      await getByText("SELECT INDIVIDUAL").click();
    });

    expect(selectRowMock).toHaveBeenCalledTimes(1);
  });
});
