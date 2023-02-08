import React from "react";
import Modal from "./Modal";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";

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
      });
    const stateSetter = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementation((stateValue) => [(stateValue = 0), stateSetter]);
    const { getByText, getAllByText } = render(
      <Modal
        createNew={"save and close"}
        close={close}
        show={show}
        showCancel={true}
        showSave={true}
        extraBtn={jest.fn()}
        extraBtnText={"test"}
      />
    );
    const cancelBTN = getByText(/Cancel/i);
    let closeBTN = getAllByText(/close/i);

    fireEvent.click(cancelBTN);
    cancelBTN.focus();

    expect(cancelBTN).toHaveFocus();

    const e = {
      keyCode: 9,
      preventDefault: jest.fn(),
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
      shiftKey: true,
      preventDefault: jest.fn(),
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

  test("testing clicking and tabbing between btns ", () => {
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
      });
    const stateSetter = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementation((stateValue) => [(stateValue = 0), stateSetter]);
    const { container, getByText, getAllByRole } = render(
      <Modal
        createNew={"save and close"}
        close={close}
        show={false}
        showCancel={false}
        showSave={false}
        breadCrumbBar={true}
      />
    );
  });

  test("renders error messages", () => {
    const errorMsg = "This is a test error message";
    render(
      <Modal
        createNew={"save and close"}
        close={null}
        show={false}
        showCancel={false}
        showSave={false}
        breadCrumbBar={true}
        errorMsgs={[errorMsg]}
      />
    );
    const errorMsgDisplay = screen.getByText(errorMsg);
    expect(errorMsgDisplay).toBeInTheDocument();
  })
});
