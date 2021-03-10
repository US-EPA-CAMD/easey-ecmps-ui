import React from "react";
import Workspace from "./Workspace";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
const { container, getByLabelText } = render(
  <MemoryRouter>
    <Workspace />
  </MemoryRouter>
);
test("renders dropdown btn", () => {
  const layoutContent = screen.queryAllByRole("workspaceDropp");
  expect(layoutContent).not.toBeUndefined();
});

test("clicking on the workspace btn to open dropdown", () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/monitoring-plans"]}>
      <Workspace />
    </MemoryRouter>
  );
  const searchBox = getByText("Workspace");
  fireEvent.click(searchBox);
  let mpLink = getByText("- Monitoring Plans");
  expect(mpLink).toBeInTheDocument();
});
