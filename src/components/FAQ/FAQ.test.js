import React from "react";
import { render } from "@testing-library/react";
import FAQ from "./FAQ";

describe("testing FAQ component ", () => {
  test("renders the content of faqPage component", () => {
    const { container, getAllByText, getByText } = render(<FAQ/>);
    const renderedComponent = container.querySelector("#faqPage");
    expect(renderedComponent).not.toBeUndefined();
  });
});
