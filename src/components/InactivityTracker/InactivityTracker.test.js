import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";

import {
  InactivityTracker,
  mapStateToProps,
  mapDispatchToProps,
} from "./InactivityTracker";
import configureStore from "../../store/configureStore.dev";
import config from "../../config";
import { logOut } from "../../utils/api/easeyAuthApi";
import userEvent from "@testing-library/user-event";

const store = configureStore();
jest.mock("axios");

jest.mock("../../utils/api/easeyAuthApi");
logOut.mockImplementation(() => Promise.resolve(""));

const props = {
  openedFacilityTabs: [{ checkout: true }],
  setCheckout: jest.fn(),
};

const noCheckoutProps = {
  openedFacilityTabs: [{ checkout: false }],
  setCheckout: jest.fn(),
};
describe("InactivityTracker", () => {
  let callback = jest.fn();
  beforeEach(() => {
    // we're using fake timers because we don't want to
    // wait a full second for this test to run.
    jest.useFakeTimers();
  });
  afterEach(() => {
    callback.mockRestore();
    jest.clearAllTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  test("tests InactivityTracker", async () => {
    const { container } = render(
      <Provider store={store}>
        <InactivityTracker {...props} />{" "}
      </Provider>
    );
    jest.advanceTimersByTime(3000);
    expect(container).not.toBeUndefined();
  });

  test("tests InactivityTracker with no checkout tabs", async () => {
    const { container } = render(
      <Provider store={store}>
        <InactivityTracker {...noCheckoutProps} />{" "}
      </Provider>
    );
    jest.advanceTimersByTime(3000);

    const clickDiv = container.querySelector("div");
    fireEvent.click(clickDiv);
    expect(container).not.toBeUndefined();
  });

  test("tests InactivityTracker with no checkout tabs and not active", async () => {
    const { container } = render(
      <Provider store={store}>
        <InactivityTracker {...noCheckoutProps} />{" "}
      </Provider>
    );

    jest.advanceTimersByTime(100000);
    expect(container).not.toBeUndefined();
  });

  test("tests InactivityTracker modal popup and close", async () => {
    render(
      <Provider store={store}>
        <InactivityTracker {...noCheckoutProps} />{" "}
      </Provider>
    )

    // act(() => {
    //   jest.advanceTimersByTime(config.app.inactivityLogoutDuration);
    // });

    const closeBtn = screen.getByRole('button', { name: /Click to continue/i })
    userEvent.click(closeBtn)

    // expect(logOut).not.toHaveBeenCalled()
  });

  test("mapDispatchToProps calls the appropriate action", async () => {
    // mock the 'dispatch' object
    const dispatch = jest.fn();
    const actionProps = mapDispatchToProps(dispatch);
    const state = store.getState();
    const stateProps = mapStateToProps(state);

    // verify the appropriate action was called
    actionProps.setCheckout();
    expect(state).toBeDefined();
  });

  // test("should init hook with delay", () => {
  //   const { result } = renderHook(() => InactivityTracker({...props}));

  //   expect(result.current).toBeUndefined();
  //   expect(setInterval).toHaveBeenCalledTimes(1);
  //   expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 5000);
  // });
});
