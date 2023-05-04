import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { displayAppError } from "../../additional-functions/app-error";
import config from "../../config";

import {
  authenticate,
  logOut,
  refreshClientToken,
  refreshToken,
  secureAxios,
} from "./easeyAuthApi";

jest.mock("./monitoringPlansApi", () => ({
  getCheckedOutLocations: jest.fn().mockResolvedValue({
    data: [],
  }),
  checkoutAPI: jest.fn().mockResolvedValue({
    data: [],
  }),
  getApiUrl: jest.fn(),
}));

jest.mock("../../additional-functions/app-error.js", () => ({
  displayAppError: jest.fn(),
}));

delete window.location;
window.location = {
  pathname: {
    includes: jest.fn(),
    endsWith: jest.fn(),
  },
  reload: jest.fn(),
  assign: jest.fn(),
};

describe("Easey Auth API", () => {
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    jest.clearAllMocks();
    mock.reset();
  });

  it("should return response on success secureAxios call", async () => {
    mock.onPost(`${config.services.authApi.uri}/tokens`).reply(200, "token");
    mock
      .onGet(`${config.services.authApi.uri}/test`)
      .reply(200, "success message");

    const res = await secureAxios({
      method: "GET",
      url: `${config.services.authApi.uri}/test`,
    });

    expect(res.data).toEqual("success message");
  });

  it("Can we authenticate", async () => {
    const ecmpsUser = {
      token: "xyz",
      userId: "jeff",
      tokenExpiration: new Date(),
    };
    mock
      .onPost(`${config.services.authApi.uri}/authentication/sign-in`)
      .reply(200, ecmpsUser);

    await authenticate({});

    expect(JSON.parse(localStorage.getItem("ecmps_user")).token).toBe(
      ecmpsUser.token
    );
  });

  it("Can we authenticate with error ", async () => {
    localStorage.clear();
    mock
      .onPost(`${config.services.authApi.uri}/authentication/sign-in`)
      .reply(500, "some error");

    try {
      await authenticate({});
    } catch (e) {
      expect(e.response.data).toEqual("some error");
    }
    expect(localStorage.getItem("ecmps_user")).toEqual(null);
  });

  it("Can we refresh client Token", async () => {
    config.app.clientId = "123";
    config.app.clientSecret = "secret";
    const data = { token: "token", expiration: "11-22-2022" };

    mock
      .onPost(`${config.services.authApi.uri}/tokens/client`)
      .reply(200, data);

    await refreshClientToken();
    expect(localStorage.getItem("client_token")).toBe(data.token);
    expect(localStorage.getItem("client_token_expiration")).toBe(
      data.expiration
    );
  });

  it("should call displayAppError while refresh client Token call throws error", async () => {
    mock
      .onPost(`${config.services.authApi.uri}/tokens/client`)
      .reply(500, "some error");

    await refreshClientToken();
    expect(await refreshClientToken()).toEqual(undefined);
    expect(displayAppError).toHaveBeenCalledTimes(2);
  });

  it("should return when clientId and clientSecret does not exist without refreshing client Token", async () => {
    delete config.app.clientId;
    delete config.app.clientSecret;

    expect(await refreshClientToken()).toEqual(undefined);
    expect(displayAppError).toHaveBeenCalledTimes(1);
  });

  it("Can we refreshToken", async () => {
    const date = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      })
    );
    date.setMinutes(date.getMinutes() - 15);
    localStorage.setItem(
      "ecmps_user",
      JSON.stringify({ token: "xyz", userId: "jeff", tokenExpiration: date })
    );

    const data = { token: "refreshed token", expiration: "2022-11-23" };
    mock.onPost(`${config.services.authApi.uri}/tokens`).reply(200, data);

    const res = await refreshToken();
    expect(res).toEqual(data.token);
    expect(JSON.parse(localStorage.getItem("ecmps_user")).token).toEqual(
      data.token
    );
  });

  it("Can we refreshToken when refresh token expires in less or equal to 60 secs", async () => {
    const date = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      })
    );
    date.setSeconds(date.getSeconds() + 50);
    localStorage.setItem(
      "ecmps_user",
      JSON.stringify({ token: "xyz", userId: "jeff", tokenExpiration: date })
    );

    const data = { token: "refreshed token", expiration: "2022-11-23" };
    mock.onPost(`${config.services.authApi.uri}/tokens`).reply(200, data);

    const res = await refreshToken();
    expect(res).toEqual(data.token);
    expect(JSON.parse(localStorage.getItem("ecmps_user")).token).toEqual(
      data.token
    );
  });
  /*
  it("Can we refreshToken with error", async () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 15);
    localStorage.setItem(
      "ecmps_user",
      JSON.stringify({ token: "xyz", userId: "jeff", tokenExpiration: date })
    );

    mock
      .onPost(`${config.services.authApi.uri}/tokens`)
      .reply(500, "some error");

    await refreshToken();
    expect(JSON.parse(localStorage.getItem("ecmps_user")).token).toBe("xyz");
  });

  it("Can we logOut", async () => {
    localStorage.setItem(
      "ecmps_user",
      JSON.stringify({
        token: "xyz",
        userId: "test",
        tokenExpiration: "11-21-2022",
      })
    );

    localStorage.setItem("signing_out", false);

    mock
      .onDelete(`${config.services.authApi.uri}/authentication/sign-out`)
      .reply(200, {});

    await logOut();
    expect(localStorage.getItem("ecmps_user")).toBe(null);
  });


  it("credentialsAuth", async () => {
    mock
      .onPost(`${config.services.authApi.uri}/sign/authenticate`)
      .reply(200, {});

    expect((await credentialsAuth()).data).toEqual({});
  });

  it("verifyChallenge", async () => {
    mock.onPost(`${config.services.authApi.uri}/sign/validate`).reply(200, {});

    expect((await verifyChallenge()).data).toEqual({});
  });

  it("getCredentials", async () => {
    const monitorPlans = [1, 2];

    mock
      .onGet(
        `${
          config.services.authApi.uri
        }/certifications/statements?monitorPlanIds=${monitorPlans.join("|")}`
      )
      .reply(200, {});

    expect((await getCredentials(monitorPlans)).data).toEqual({});
  });
  */
});
