import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomAccordion from "./CustomAccordion";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
describe("CustomAccordion", () => {
  const table = [
    {
      content: "Content 1",
      title: "Section 1",
    },
    { content: "Content 2", title: "Section 2" },
  ];

  it("renders the accordion with correct initial state", () => {
    render(
      <CustomAccordion
        title="Accordion Title"
        tables={table}
        section="Section"
      />
    );

    expect(screen.queryAllByTestId("collapseBTN")).toHaveLength(2);
    expect(screen.queryAllByTestId("expandBTN")).toHaveLength(0);

    expect(screen.getByText("Section 1")).toBeInTheDocument();
  });

  it("toggles the accordion state on button click", () => {
    const { container } = render(
      <CustomAccordion
        title="Accordion Title"
        tables={table}
        section="Section"
      />
    );

    const collapseButtons = screen.queryAllByTestId("collapseBTN");
    fireEvent.click(collapseButtons[0]);

    expect(screen.queryAllByTestId("expandBTN")).toHaveLength(1);
  });

  it("calls the header button click handler when clicked", () => {
    const headerButtonClickHandler = jest.fn();

    render(
      <CustomAccordion
        title="Accordion Title"
        tables={table}
        section="Section"
        headerButtonText="Button Text"
        headerButtonClickHandler={headerButtonClickHandler}
      />
    );

    const button = screen.getAllByText("Button Text");
    fireEvent.click(button[0]);

    expect(headerButtonClickHandler).toHaveBeenCalledTimes(1);
  });
});
