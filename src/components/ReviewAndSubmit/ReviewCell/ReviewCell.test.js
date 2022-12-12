import React from "react";
import { render, act, screen } from "@testing-library/react";
import ReviewCell from "./ReviewCell";

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
});
