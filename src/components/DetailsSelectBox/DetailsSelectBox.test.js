import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DetailsSelectBox from "./DetailsSelectBox";


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
      <DetailsSelectBox
        caption={"test caption"}
        required={true}
        initialSelection={1}
        selectKey={"name"}
        options={options}
      />
    );
    userEvent.selectOptions(screen.getByTestId("dropdown"), ["2"]);
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
  });

  test("renders 1 drop down with no initial value and no required text  ", () => {

    const { container } = render(
      <DetailsSelectBox
        caption={"test caption"}
        initialSelection={null}
        required={false}
        selectKey={"name"}
        options={options}
      />
    );
    userEvent.selectOptions(screen.getByTestId("dropdown"), ["2"]);
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
  });
});