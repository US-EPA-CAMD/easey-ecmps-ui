import React from "react";
import { render, getByText } from "@testing-library/react";
import HomeTitle from "./HomeTitle";

describe("testing montiring plans viewer Home page title component", () => {
  test("renders page title", () => {
    const { container } = render(<HomeTitle />);
    expect(getByText(container, "Clean Air Markets")).not.toBeUndefined();
    expect(getByText(container, "Contact Us")).not.toBeUndefined();
    expect(getByText(container, "Share")).not.toBeUndefined();
  });
});
