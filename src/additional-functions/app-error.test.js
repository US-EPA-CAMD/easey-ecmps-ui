import { displayAppError, hideAppError } from "./app-error";
import React from "react";
import {act, fireEvent, render, screen} from "@testing-library/react";

const ErrorContainer = () =>  {
  return (
    <div data-testid="appErrorMessage" id="appErrorMessage" className="display-none">
      <div data-testid="appErrorMessageText" id="appErrorMessageText"></div>
    </div>
  );
}

const NoErrorContainer = () => {
  return (
    <div>
      <h1 id="NOT-AppErrorMessage"></h1>
    </div>
  );
}

describe("Test displayAppError", () => {
  it("Should show AppErrorMessage with Error(s) Text", async () => {

    await act(async () => {
      render(<ErrorContainer />);
    })

    const appErrorMessage = screen.getByTestId("appErrorMessage");
    const appErrorMessageText = screen.getByTestId("appErrorMessageText");

    displayAppError("Some Error");

    expect(appErrorMessage.classList).not.toContain('display-none');
    expect(appErrorMessageText.innerHTML).toBe("Some Error");

    // Clicking on the appErrorMessage container should fire hideAppError
    // and close it (display: none, empty error text)
    fireEvent.click(appErrorMessage);

    expect(appErrorMessage.classList).toContain('display-none');
    expect(appErrorMessageText.innerHTML).toBe("");
  });

  it("Should not error if called when there is no appErrorMessage container",
      async () => {

    await act(async () => {
      render(<NoErrorContainer />);
    })

    displayAppError("Some Error");
  })

});
