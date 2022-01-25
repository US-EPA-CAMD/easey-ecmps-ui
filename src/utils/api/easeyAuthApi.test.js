import React from "react";
import * as axios from "axios";

import { deleteCheckInMonitoringPlanConfiguration } from "../api/monitoringPlansApi";
import {
  authenticate,
  refreshToken,
  logOut,
  secureAxios,
} from "./easeyAuthApi";
import { getCheckedOutLocations } from "./monitoringPlansApi";
// Mock out all top level functions, such as get, put, delete and post:

jest.mock("axios");

describe("Easey Auth API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Can we authenticate", async () => {
    axios.mockImplementationOnce(() => {
      return Promise.resolve({ data: {} });
    });

    await authenticate({});
    expect(sessionStorage.getItem("cdx_user")).toBe("{}");
  });

  // test("Can we authenticate with error ", async () => {
  //   axios.mockImplementationOnce(() => {
  //     return Promise.reject( Error("some error"));
  //   });

  //   await authenticate({});
  //   expect(sessionStorage.getItem("cdx_user")).toBe("{}");
  // });

  test("Can we refreshToken", async () => {
    sessionStorage.setItem("cdx_user", '{"token":"xyz", "userId1": "jeff"}');

    try {
      axios.mockImplementationOnce(() => {
        return Promise.resolve({ data: "token" });
      });
    } catch (e) {
      expect(e).toEqual({
        error: "error",
      });
    }

    await refreshToken();
    expect(JSON.parse(sessionStorage.getItem("cdx_user")).token).toBe("token");
  });

  test("Can we refreshToken with erro r", async () => {
    sessionStorage.setItem("cdx_user", '{"token":"xyz", "userId": "jeff"}');

    axios.mockImplementationOnce(() => {
      return Promise.reject(new Error("some error"));
    });

    await refreshToken();
    expect(JSON.parse(sessionStorage.getItem("cdx_user")).token).toBe("xyz");
  });

  test("Can we logOut", async () => {
    sessionStorage.setItem("cdx_user", '{"token":"xyz", "userId": "test"}');

    const checkedData = [
      {
        facId: 1,
        monPlanId: "M",
        checkedOutOn: "2022-01-21T03:01:20.493Z",
        checkedOutBy: "test",
        lastActivity: "2022-01-21T03:01:20.493Z",
      },
    ];
    const userInfo = sessionStorage.getItem("cdx_user");

    // mocks getCheckedOutLocations
    axios.get.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: checkedData,
      })
    );
    const apiCall = await getCheckedOutLocations();
    expect(apiCall.data).toEqual(checkedData);
    //-------
    // mocks deleteCheckInMonitoringPlanConfiguration inside checkoutAPI when there is a checked out data
    axios.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {},
      });
    });
    await deleteCheckInMonitoringPlanConfiguration(1);
    //-------
    // mocks the return secure Axios
    axios.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {},
      });
    });
    axios.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {},
      });
    });

    await logOut();
    expect(sessionStorage.getItem("cdx_user")).toBe(null);
  });

  test("Can we logOut with error ", async () => {
    sessionStorage.setItem("cdx_user", '{"token":"xyz", "userId": "test"}');

    const checkedData = [
      {
        facId: 1,
        monPlanId: "M",
        checkedOutOn: "2022-01-21T03:01:20.493Z",
        checkedOutBy: "test",
        lastActivity: "2022-01-21T03:01:20.493Z",
      },
    ];
    const userInfo = sessionStorage.getItem("cdx_user");

    // mocks getCheckedOutLocations
    axios.get.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: checkedData,
      })
    );
    const apiCall = await getCheckedOutLocations();
    expect(apiCall.data).toEqual(checkedData);
    //-------
    // mocks deleteCheckInMonitoringPlanConfiguration inside checkoutAPI when there is a checked out data
    axios.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {},
      });
    });
    await deleteCheckInMonitoringPlanConfiguration(1);
    //-------
    // mocks the return secure Axios
    axios.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {},
      });
    });
    axios.mockImplementationOnce(() => {
      return Promise.reject(new Error("some error"));
    });

    await logOut(null);
    expect(sessionStorage.getItem("cdx_user")).not.toBe(null);
  });
});
