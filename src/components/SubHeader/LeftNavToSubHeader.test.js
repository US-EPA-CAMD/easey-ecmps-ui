import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import { LeftNavToSubHeader } from "./LeftNavToSubHeader";

jest.mock('../../utils/constants/menuTopics', () => ({
  getWorkspacePaths: jest.fn().mockReturnValue([
    {
      name: "Home",
      children: [],
    },
    {
      name: "QA & Certification",
      children: [{ url: "/qa/test-data", name: "Test Data" }],
    }])
}))

describe("LeftNavToSubHeader Component", () => {
  test("Menu items render without errors", () => {
    const { container } = render(
      <BrowserRouter>
        <LeftNavToSubHeader />
      </BrowserRouter>
    );

    //Resources
    const resourcesMenuItem = screen.getAllByText("ECMPS Menu");
    expect(resourcesMenuItem.length).toBe(1);

    const totalBtns = container.querySelectorAll("button");
    for (var x of totalBtns) {
      fireEvent.click(x);
    }

    const totalLinks = container.querySelectorAll("a");
    for (var x of totalLinks) {
      fireEvent.click(x);
    }
  });
});
