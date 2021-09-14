import React from "react";
import { config } from "../../config";
import { TokenRefresher } from "./TokenRefresher";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { refreshToken } from "../../utils/api/easeyAuthApi";

jest.mock("../../utils/api/easeyAuthApi");
refreshToken.mockImplementation(() => Promise.resolve(""));

let container = null;
describe("Token Refresher", () => {
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

  test("did token refresher render", () => {
    act(() => {
      render(<TokenRefresher />, container);
    });
    expect(container.textContent).toBe("");
  });

  test("did token not refresh when given invalid refresh time", () => {
    jest.useFakeTimers();
    act(() => {
      render(<TokenRefresher />, container);
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(refreshToken).not.toHaveBeenCalled();
  });

  test("did token refresher given valid refresh time", () => {
    jest.useFakeTimers();
    act(() => {
      render(<TokenRefresher />, container);
    });
    act(() => {
      jest.advanceTimersByTime(config.app.refreshTokenRate + 10000);
    });

    expect(refreshToken).toHaveBeenCalled();
  });
});
