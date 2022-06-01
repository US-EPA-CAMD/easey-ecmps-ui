import React from "react";
import { render } from "@testing-library/react";
import Preloader from "./Preloader";

describe("testing preloader", () => {
  test("renders the content of Home component", () => {
    const { container } = render(<Preloader />);
    const renderedComponent = container.querySelector("img");
    expect(renderedComponent).not.toBeUndefined();
  });
});
