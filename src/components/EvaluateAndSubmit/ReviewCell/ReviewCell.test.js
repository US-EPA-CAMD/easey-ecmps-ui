import React from "react";
import { render, act, screen } from "@testing-library/react";
import ReviewCell from "./ReviewCell";
import userEvent from "@testing-library/user-event";

describe("Review and Submit Tables component", () => {
  it("expect checkbox loading state", async () => {
    let mockRow = {
      submissionAvailabilityCode: "REQUIRE",
      checkedOut: false,
      userCheckedOut: false,
      evalStatusCode: "PASS",
      orisCode: 1,
    };

    await act(async () => {
      render(
        <ReviewCell
          row={mockRow}
          handleRowSelection={jest.fn()}
          handleRowView={jest.fn()}
          type={"MP"}
          getRowState={jest.fn().mockReturnValue("Checkbox")}
          setSelectAllState={jest.fn()}
        />
      );
    });

    const checkbox = screen.getByTestId("Checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("expect lock loading state", async () => {
    let mockRow = {
      submissionAvailabilityCode: "REQUIRE",
      checkedOut: false,
      userCheckedOut: false,
      evalStatusCode: "PASS",
      orisCode: 1,
    };

    await act(async () => {
      render(
        <ReviewCell
          row={mockRow}
          handleRowSelection={jest.fn()}
          handleRowView={jest.fn()}
          type={"MP"}
          getRowState={jest.fn().mockReturnValue("Lock")}
          setSelectAllState={jest.fn()}
        />
      );
    });

    const checkbox = screen.getByTestId("Lock");
    expect(checkbox).toBeInTheDocument();
  });

  it("expect view loading state", async () => {
    let mockRow = {
      submissionAvailabilityCode: "REQUIRE",
      checkedOut: false,
      userCheckedOut: false,
      evalStatusCode: "PASS",
      orisCode: 1,
    };

    await act(async () => {
      render(
        <ReviewCell
          row={mockRow}
          handleRowSelection={jest.fn()}
          handleRowView={jest.fn()}
          type={"MP"}
          getRowState={jest.fn().mockReturnValue("View")}
          setSelectAllState={jest.fn()}
        />
      );
    });

    const checkbox = screen.getByTestId("ViewButton");
    expect(checkbox).toBeInTheDocument();
  });

  it("sets select all visible to false if row is view only", async () => {
    let mockRow = {
      submissionAvailabilityCode: "REQUIRE",
      checkedOut: false,
      userCheckedOut: false,
      evalStatusCode: "PASS",
      orisCode: 1,
      viewOnly: true,
    };
    const mockSetSelectAllVisible = jest.fn();
    await act(async () => {
      render(
        <ReviewCell
          row={mockRow}
          handleRowSelection={jest.fn()}
          handleRowView={jest.fn()}
          type={"MP"}
          getRowState={jest.fn().mockReturnValue("View")}
          setSelectAllState={jest.fn()}
          setSelectAllVisible={mockSetSelectAllVisible}
        />
      );
    });

    expect(mockSetSelectAllVisible).toHaveBeenCalledWith(false);
  });

  it("calls handleRowView if view button is clicked", async () => {
    let mockRow = {
      submissionAvailabilityCode: "REQUIRE",
      checkedOut: false,
      userCheckedOut: false,
      evalStatusCode: "PASS",
      orisCode: 1,
      viewOnly: true,
    };
    const mockHandleRowView = jest.fn();
    await act(async () => {
      render(
        <ReviewCell
          row={mockRow}
          handleRowSelection={jest.fn()}
          handleRowView={mockHandleRowView}
          type={"MP"}
          getRowState={jest.fn().mockReturnValue("View")}
          setSelectAllState={jest.fn()}
          setSelectAllVisible={jest.fn()}
        />
      );
    });
    const ViewButton = screen.getByTestId("ViewButton")
    await act(async() => userEvent.click(ViewButton))
    expect(mockHandleRowView).toHaveBeenCalled();
  });

  it("calls handleRowSelection if checkbox is clicked", async () => {
    let mockRow = {
      submissionAvailabilityCode: "REQUIRE",
      checkedOut: false,
      userCheckedOut: false,
      evalStatusCode: "PASS",
      orisCode: 1,
    };
    const mockHandleRowSelection = jest.fn();
    await act(async () => {
      render(
        <ReviewCell
          row={mockRow}
          handleRowSelection={mockHandleRowSelection}
          handleRowView={jest.fn()}
          type={"MP"}
          getRowState={jest.fn().mockReturnValue("Checkbox")}
          setSelectAllState={jest.fn()}
          setSelectAllVisible={jest.fn()}
        />
      );
    });
    const checkbox = screen.getByTestId("Checkbox")
    await act(async() => userEvent.click(checkbox))
    expect(mockHandleRowSelection).toHaveBeenCalled();
  });
});
