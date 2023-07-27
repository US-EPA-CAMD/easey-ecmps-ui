import React from "react";
import { render, act } from "@testing-library/react";
import { Provider } from "react-redux";

import { InactivityTracker } from "./InactivityTracker";
import configureStore from "../../store/configureStore.dev";
import config from "../../config";
import { logOut } from "../../utils/api/easeyAuthApi";
import * as utilsFunctions from "../../utils/functions";

const store = configureStore();
jest.mock("axios");

class MockChannel {
  constructor(name) { }

  addEventListener = () => { };
  postMessage = () => { };
}
global.BroadcastChannel = MockChannel;

jest.mock("../../utils/api/easeyAuthApi");
logOut.mockImplementation(() => Promise.resolve(""));

config.app.inactivityDuration = 30000;

describe("InactivityTracker", () => {
  let callback = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();

    jest.spyOn(utilsFunctions, "currentDateTime").mockReturnValue(new Date());
    jest.spyOn(utilsFunctions, "currentSecondsTilInactive").mockReturnValue(0);
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
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(container).not.toBeUndefined();
  });

  test("tests InactivityTracker logs out user after expiration", async () => {
    render(
      <Provider store={store}>
        <InactivityTracker />
      </Provider>
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(logOut).toHaveBeenCalled();
  });
});
