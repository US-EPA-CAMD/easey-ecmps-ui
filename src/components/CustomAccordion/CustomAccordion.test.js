import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CustomAccordion from "./CustomAccordion";

describe("testing a reusable accordion component", () => {
  const accordion = (
    <CustomAccordion title={"test Title"} table={[["test", "component"],["test2", "component2"]]} />
  );
  test("renders an accordion dropdown button and clicks it twice ", () => {
    const { container } = render(accordion);

    fireEvent.click(container.querySelector("#collapseBTN"));
    fireEvent.click(container.querySelector("#expandBTN"));
    let accordions = screen.getAllByRole("button");
    expect(accordions).toHaveLength(2);

  });
});
