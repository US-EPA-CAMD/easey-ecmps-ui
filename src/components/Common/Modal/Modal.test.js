import React from "react";
import Modal from "./Modal";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, fireEvent } from "@testing-library/react";

beforeAll(() => {
  const myInitialState = 0;
  React.useState = jest.fn().mockReturnValue([myInitialState, {}]);
});

describe("testing the creation of a modal", () => {
  test("testing clicking and tabbing between btns ", () => {
    const show = true;
    const close = jest.fn();
    const events = {};
    jest
      .spyOn(document, "addEventListener")
      .mockImplementation((event, handle) => {
        events[event] = handle;
      });
    jest
      .spyOn(document, "removeEventListener")
      .mockImplementation((event, handle) => {
        events[event] = undefined;
        console.log("unmount");
      });
      const stateSetter = jest.fn()
      jest
      .spyOn(React, 'useState')
      .mockImplementation(stateValue => [stateValue=0, stateSetter])
    const { getByText } = render(<Modal close={close} show={show} />);
    const cancelBTN = getByText(/Cancel/i);
    const closeBTN = getByText(/save and close/i);

    fireEvent.click(cancelBTN);
    cancelBTN.focus();

    expect(cancelBTN).toHaveFocus();

    userEvent.tab();
    expect(closeBTN).toHaveFocus();

    const e = {
      keyCode: 9,
      preventDefault:jest.fn(),
    };
    events["keydown"](e);
    events["keydown"](e);
    events["keydown"](e);
    events["keydown"](e);
    events["keydown"](e);
    events["keydown"](e);
    events["keydown"](e);
    const shift = {
      keyCode: 9,
      shiftKey:true,
      preventDefault:jest.fn(),
    };
    events["keydown"](shift);
    events["keydown"](shift);
    events["keydown"](shift);
    events["keydown"](shift);
    events["keydown"](shift);
    events["keydown"](shift);
    expect(document.addEventListener).toBeCalledWith(
      "keydown",
      expect.any(Function)
    );
  });
});
