import React from "react";
import { render, act } from "@testing-library/react";
import { Provider } from "react-redux";

import { InactivityTracker } from "./InactivityTracker";
import configureStore from "../../store/configureStore.dev";
import config from "../../config";
import { logOut } from "../../utils/api/easeyAuthApi";

const store = configureStore();
jest.mock("axios");

class MockChannel {
  constructor(name) {}

  addEventListener = () => {};
  postMessage = () => {};
}
global.BroadcastChannel = MockChannel;

jest.mock("../../utils/api/easeyAuthApi");
logOut.mockImplementation(() => Promise.resolve(""));

config.app.inactivityDuration = 30000;

describe("InactivityTracker", () => {
  let callback = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    callback.mockRestore();
    jest.clearAllTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  test("tests InactivityTracker renders", async () => {
    const { container } = render(
      <Provider store={store}>
        <InactivityTracker />
      </Provider>
    );
    jest.advanceTimersByTime(3000);
    expect(container).not.toBeUndefined();
  });

<<<<<<< HEAD
  test("tests InactivityTracker logs out user after expiration", async () => {
=======
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
    jest.setTimeout(10000);

>>>>>>> 25d3ba56c18d06616548afe0e5b1558f01ee8ee1
    render(
      <Provider store={store}>
        <InactivityTracker />
      </Provider>
    );

    act(() => {
      jest.advanceTimersByTime(400000);
    });

    expect(logOut).toHaveBeenCalled();
  });
});
