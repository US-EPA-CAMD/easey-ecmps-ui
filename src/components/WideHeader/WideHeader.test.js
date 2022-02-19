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

    // nav menu button elements
    const navMenuBtn = wideHeader.container.querySelector(
      "[data-testid='navMenuButton']"
    );
    const closeNavBtn = wideHeader.container.querySelector(
      "[data-testid='navCloseButton']"
    );

    // search bar elements
    const searchForm = screen.getByRole("search");
    const searchFormItems = searchForm.children;
    const searchBtn = searchFormItems[2];

    // mocking window.open JavaScript built-in function
    const closeSpy = jest.fn();
    window.open = jest.fn().mockReturnValue({ close: closeSpy });

    // test nav menu (search bar & close button)
    await wait(async () => {
      // toggle nav menu
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

    // trigger callback function for escape keydown (closes menu)
    await wait(async () => {
      userEvent.click(navMenuBtn);
      for (let i = 0; i < 1000; i++) {
        fireEvent.keyDown(document, {
          key: "Escape",
          code: 27,
          charCode: 27,
        });
      }
    });
  });
});
