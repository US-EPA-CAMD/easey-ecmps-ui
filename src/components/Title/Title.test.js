import React from "react";
import Title from "./Title";
import { render, screen } from "@testing-library/react";

test("renders title", () => {
  render(<Title />);
  const title = screen.getByText("EASEY-In Dashboard");
  expect(title).not.toBeUndefined();
});
