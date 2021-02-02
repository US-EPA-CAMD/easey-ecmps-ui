import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectBox from "./SelectBox";

describe("testing the creation of 1 select drop down and handling change", () => {
  test("renders 1 drop down and selects a different option ", () => {
    const options = [
      { id: "6", name: "1" },
      { id: "7", name: "2" },
      { id: "8", name: "3" },
    ];
    const { container } = render(
      <SelectBox
        caption={"test caption"}
        selectionHandler={jest.fn()}
        selectKey={"name"}
        options={options}
      />
    );
    userEvent.selectOptions(screen.getByTestId("select"), ["2"]);
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
  });
});