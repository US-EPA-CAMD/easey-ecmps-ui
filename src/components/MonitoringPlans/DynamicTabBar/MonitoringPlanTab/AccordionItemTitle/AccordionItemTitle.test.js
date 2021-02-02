import React from "react";
import { render, getByText,fireEvent,screen  } from "@testing-library/react";
import AccordionItemTitle from "./AccordionItemTitle";

describe("testing each accordion header", () => {
  test("renders accordion", () => {
    const { container } = render(<AccordionItemTitle title={"Test"}/>);

    fireEvent.click(screen.getByRole("button"))
    expect(getByText(container, "Test")).not.toBeUndefined();
  });
});
