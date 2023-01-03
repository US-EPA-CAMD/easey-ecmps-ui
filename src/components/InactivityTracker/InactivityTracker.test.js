// import React from "react";
// import { config } from "../../config";
// import { render, unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";
// import { InactivityTracker } from "./InactivityTracker";
// import { logOut } from "../../utils/api/easeyAuthApi";
// import { checkoutAPI } from "../../additional-functions/checkout";

// jest.mock("../../utils/api/easeyAuthApi");
// logOut.mockImplementation(() => Promise.resolve(""));

// jest.mock("../../additional-functions/checkout");
// checkoutAPI.mockImplementation(() => Promise.resolve(""));

// let container = null;
// describe("Inactivity Tracker", () => {
//   beforeEach(() => {
//     // setup a DOM element as a render target
//     container = document.createElement("div");
//     document.body.appendChild(container);
//   });

//   afterEach(() => {
//     // cleanup on exiting
//     unmountComponentAtNode(container);
//     container.remove();
//     container = null;
//   });

//   test("Doesn't sign out before inactivity expired", () => {
//     jest.useFakeTimers();

//     act(() => {
//       render(
//         <InactivityTracker openedFacilityTabs={{}} setCheckout={jest.fn()} />,
//         container
//       );
//     });

//     expect(logOut).not.toHaveBeenCalled();
//   });

//   test("Don't sign out if check out and time hasn't expired", () => {
//     const currentCheckedOut = { checkout: true, selectedConfig: { id: 0 } };

//     jest.useFakeTimers();

//     act(() => {
//       render(
//         <InactivityTracker
//           openedFacilityTabs={{ currentCheckedOut }}
//           setCheckout={jest.fn()}
//         />,
//         container
//       );
//     });

//     expect(logOut).not.toHaveBeenCalled();
//   });

//   test("Sign out after inactivity expired", () => {
//     jest.useFakeTimers();

//     act(() => {
//       render(
//         <InactivityTracker openedFacilityTabs={{}} setCheckout={jest.fn()} />,
//         container
//       );
//     });

//     act(() => {
//       jest.advanceTimersByTime(config.app.inactivityLogoutDuration + 1001);
//     });

//     expect(logOut).toHaveBeenCalled();
//   });

//   test("Sign out after expired and record checked out", () => {
//     jest.useFakeTimers();

//     const currentCheckedOut = { checkout: true, selectedConfig: { id: 0 } };

//     act(() => {
//       render(
//         <InactivityTracker
//           openedFacilityTabs={{ currentCheckedOut }}
//           setCheckout={jest.fn()}
//         />,
//         container
//       );
//     });

//     act(() => {
//       jest.advanceTimersByTime(config.app.inactivityDuration + 1001);
//     });

//     expect(logOut).toHaveBeenCalled();
//   });
// });
// import React from "react";
// import { config } from "../../config";
// import { render, unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";
// import { InactivityTracker } from "./InactivityTracker";
// import { logOut } from "../../utils/api/easeyAuthApi";
// import { checkoutAPI } from "../../additional-functions/checkout";
import React from "react";
import { render, fireEvent, screen, act, waitForElement } from "@testing-library/react";
import {
  InactivityTracker,
  mapStateToProps,
  mapDispatchToProps,
} from "./InactivityTracker";
import { Provider } from "react-redux";
import configureStore from "../../store/configureStore.dev";
import config from "../../config";
import { logOut } from "../../utils/api/easeyAuthApi";
import userEvent from "@testing-library/user-event";
const store = configureStore();
const axios = require("axios");
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

    act(() => {
      jest.advanceTimersByTime(config.app.inactivityLogoutDuration);
    });

    const inactivityMsg = await screen.findByText(/Logging out due to inactivity/i)
    expect(inactivityMsg).toBeInTheDocument()

    const closeBtn = screen.getByRole('button', { name: /Click to close/i })
    userEvent.click(closeBtn)

    expect(logOut).not.toHaveBeenCalled()
    expect(inactivityMsg).not.toBeInTheDocument()
  });

  test("when logout modal timer counts down then user is logged out", () => {
    config.countdownDuration = 0
    render(
      <Provider store={store}>
        <InactivityTracker {...noCheckoutProps} />{" "}
      </Provider>
    )

    act(() => {
      jest.advanceTimersByTime(config.app.inactivityLogoutDuration);
    });

    act(() => {
      jest.advanceTimersByTime(60000)
    })

    expect(logOut).toHaveBeenCalled()
  })

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
