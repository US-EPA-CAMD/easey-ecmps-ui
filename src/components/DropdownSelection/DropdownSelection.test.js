import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DropdownSelection from "./DropdownSelection";

let options = [];
beforeAll(() => {
  options = [
    { id: "6", name: "1" },
    { id: "7", name: "2" },
    { id: "8", name: "3" },
  ];
});
describe("testing the creation of 1 select drop down and handling change", () => {
  test("renders 1 drop down with an initial value and required text ", () => {
    const { container } = render(
      <DropdownSelection
        caption={"test caption"}
        initialSelection={1}
        selectKey={"id"}
        options={options}
        selectionHandler={jest.fn()}
        viewKey ="name"
      />
    );
    userEvent.selectOptions(document.getById("1"), ["2"]);
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
  });

});
