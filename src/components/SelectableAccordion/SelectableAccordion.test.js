import React from "react";
import { render } from "@testing-library/react";
import { SelectableAccordion } from "./SelectableAccordion";

describe("Selectable Accordion", () => {
  test("Render selectable accordion with no errors", () => {
    const { container } = render(
      <SelectableAccordion items={[]} setCanCheck={jest.fn()} />
    );

    expect(container).toBeDefined();
  });

  test("Render selectable accordion items from item list", () => {
    const { getByText } = render(
      <SelectableAccordion
        items={[
          {
            title: "Statement1",
            content: "Content1",
            expanded: false,
            hasExpanded: false,
          },
          {
            title: "Statement2",
            content: "Content2",
            expanded: false,
            hasExpanded: false,
          },
        ]}
        setCanCheck={jest.fn()}
      />
    );

    expect(getByText("Statement1")).toBeInTheDocument();
    expect(getByText("Statement2")).toBeInTheDocument();
  });

  test("Set canCheck to true after clicking all boxes", () => {
    const func = jest.fn();

    const { getByText } = render(
      <SelectableAccordion
        items={[
          {
            title: "Statement1",
            content: "Content1",
            expanded: false,
            hasExpanded: false,
          },
          {
            title: "Statement2",
            content: "Content2",
            expanded: false,
            hasExpanded: false,
          },
        ]}
        setCanCheck={func}
      />
    );

    getByText("Statement1").click();
    getByText("Statement2").click();

    expect(func).toHaveBeenCalled();
  });
});
