import { render, screen, wait, fireEvent } from "@testing-library/react";
import WideHeader from "./WideHeader";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import userEvent from "@testing-library/user-event";

describe("testing WideHeader components", () => {
  test("opening nav menu, testing search bar functionality, then closing menu", async () => {
    // render Layout component with a sample child div element
    const wideHeader = render(
      <BrowserRouter>
        <WideHeader />
      </BrowserRouter>
    );

    // test nav menu (search bar & close button)
    await wait(async () => {
      const navMenuBtn = wideHeader.container.querySelector(
        "[data-testid='navMenuButton']"
      );
      const closeNavBtn = wideHeader.container.querySelector(
        "[data-testid='navCloseButton']"
      );

      const searchForm = screen.getByRole("search");
      const searchFormItems = searchForm.children;
      const searchBtn = searchFormItems[2];

      const closeSpy = jest.fn();
      window.open = jest.fn().mockReturnValue({ close: closeSpy });
      // encodeURI = jest.fn(() => "test");

      // toggle nav menu
      userEvent.click(navMenuBtn);
      userEvent.click(navMenuBtn);

      // use search bar
      userEvent.click(searchBtn);
      fireEvent.keyPress(searchBtn, {
        key: "Enter",
        code: 13,
        charCode: 13,
      });

      // close nav menu
      userEvent.click(closeNavBtn);
    });
  });
});
