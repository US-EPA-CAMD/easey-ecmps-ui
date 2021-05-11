import React from "react";
import { render } from "@testing-library/react";
import HomeOverview from "./HomeOverview";

describe("testing montiring plans viewer Home overview component", () => {
  test("renders all paragrphs of overview content", () => {
    const { container } = render(<HomeOverview />);
    const numberOfParagraphs = container.querySelectorAll("p");
    expect(numberOfParagraphs.length).toBe(5);
  });
});
