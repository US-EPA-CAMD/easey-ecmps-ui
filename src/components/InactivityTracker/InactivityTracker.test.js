import React from "react";
import { config } from "../../config";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { InactivityTracker } from "./InactivityTracker";
import { logOut } from "../../utils/api/easeyAuthApi";
import { checkoutAPI } from "../../additional-functions/checkout";

jest.mock("../../utils/api/easeyAuthApi");
logOut.mockImplementation(() => Promise.resolve(""));

jest.mock("../../additional-functions/checkout");
checkoutAPI.mockImplementation(() => Promise.resolve(""));

let container = null;
describe("Inactivity Tracker", () => {
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test("Doesn't sign out before inactivity expired", () => {
    jest.useFakeTimers();

    act(() => {
      render(
        <InactivityTracker openedFacilityTabs={{}} setCheckout={jest.fn()} />,
        container
      );
    });

    expect(logOut).not.toHaveBeenCalled();
  });

  test("Don't sign out if check out and time hasn't expired", () => {
    const currentCheckedOut = { checkout: true, selectedConfig: { id: 0 } };

    jest.useFakeTimers();

    act(() => {
      render(
        <InactivityTracker
          openedFacilityTabs={{ currentCheckedOut }}
          setCheckout={jest.fn()}
        />,
        container
      );
    });

    expect(logOut).not.toHaveBeenCalled();
  });

  test("Sign out after inactivity expired", () => {
    jest.useFakeTimers();

    act(() => {
      render(
        <InactivityTracker openedFacilityTabs={{}} setCheckout={jest.fn()} />,
        container
      );
    });

    act(() => {
      jest.advanceTimersByTime(config.app.inactivityLogoutDuration + 1001);
    });

    expect(logOut).toHaveBeenCalled();
  });

  test("Sign out after expired and record checked out", () => {
    jest.useFakeTimers();

    const currentCheckedOut = { checkout: true, selectedConfig: { id: 0 } };

    act(() => {
      render(
        <InactivityTracker
          openedFacilityTabs={{ currentCheckedOut }}
          setCheckout={jest.fn()}
        />,
        container
      );
    });

    act(() => {
      jest.advanceTimersByTime(config.app.inactivityDuration + 1001);
    });

    expect(logOut).toHaveBeenCalled();
  });
});
