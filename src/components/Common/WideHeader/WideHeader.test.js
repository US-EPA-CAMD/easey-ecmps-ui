import React from "react";
import WideHeader from "./WideHeader";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
describe("testing search/filter feature of generic uswds table component", () => {
  const WideHeaderTest = () => {
    return <WideHeader />;
  };

  test("navbar renders a menu button", () => {
    const { container } = render(<WideHeaderTest />);
    const menuBTN = container.querySelectorAll(".menuBTN");
    expect(menuBTN.length).toEqual(1);
  });

  test("screen renders the close button when menu button is pressed", () => {
    const { container, getByText } = render(<WideHeaderTest />);
    fireEvent.click(getByText("Menu"));
    expect(screen.getByAltText("close")).toBeDefined();
  });
});
