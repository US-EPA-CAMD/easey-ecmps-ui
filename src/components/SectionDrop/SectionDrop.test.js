import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SectionDrop from "./SectionDrop";

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
      <SectionDrop
        caption={"test caption"}
        initialSelection={1}
        selectKey={"name"}
        selectionHandler={jest.fn()}
        orisCode={1}
        monitoringPlans={[]}
        activeTab={0}
      />
    );
    userEvent.selectOptions(screen.getById("1"), ["2"]);
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
  });

});
