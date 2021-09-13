import React from "react";
import * as axios from "axios";

import { authenticate, refreshToken, logOut } from "./easeyAuthApi";

// Mock out all top level functions, such as get, put, delete and post:

jest.mock("axios");

describe("Easey Auth API", () => {
  test("Can we authenticate", async () => {
    axios.mockImplementationOnce(() => {
      return Promise.resolve({ data: {} });
    });

    await authenticate({});
    expect(sessionStorage.getItem("cdx_user")).toBe("{}");
  });

  test("Can we logOut", async () => {
    sessionStorage.setItem("cdx_user", '{"token":"xyz"}');
    await logOut();
    expect(sessionStorage.getItem("cdx_user")).toBe(null);
  });

  test("Can we refreshToken", async () => {
    sessionStorage.setItem("cdx_user", '{"token":"xyz", "userId": "jeff"}');

    axios.mockImplementationOnce(() => {
      return Promise.resolve({ data: "token" });
    });

    await refreshToken();
    expect(JSON.parse(sessionStorage.getItem("cdx_user")).token).toBe("token");
  });
});
