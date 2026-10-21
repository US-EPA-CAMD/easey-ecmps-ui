import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../config";
import * as monitoringPlansApi from "./monitoringPlansApi"
import * as appError from "../../additional-functions/app-error.js"
import * as checkoutAPI from "../../additional-functions/checkout";


import { authenticate, secureAxios, refreshToken, getCredentials, logOut, refreshLastActivity, getPermissions, createActivity, validate } from "./easeyAuthApi";

delete window.location;
window.location = {
  pathname: '/',
  reload: jest.fn(),
  assign: jest.fn(),
};

describe("Easey Auth API", () => {
  const mock = new MockAdapter(axios);
  let displayAppError

  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(monitoringPlansApi, 'getCheckedOutLocations').mockResolvedValue({
      data: [{
        checkedOutBy: 'subrata',
      }],
    })
    jest.spyOn(checkoutAPI, 'checkoutAPI').mockResolvedValue({
      data: [],
    })
    jest.spyOn(monitoringPlansApi, 'getApiUrl').mockImplementation(() => { })

    displayAppError = jest.spyOn(appError, 'displayAppError').mockImplementation(() => { })
  });

  afterEach(() => {
    jest.clearAllMocks();
    mock.reset();
  });

  let originalLocation;
  beforeAll(() => {
    originalLocation = window.location;
    delete window.location;
    window.location = { ...originalLocation, href: 'http://localhost' }; //mock `location`
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  it("should return response on success secureAxios call", async () => {
    jest.setTimeout(10000);
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

  it("should return response on success secureAxios call when additional headers provided", async () => {
    jest.setTimeout(10000);

    const date = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      })
    );
    date.setMinutes(date.getMinutes() - 15);

    localStorage.setItem(
      "ecmps_user",
      JSON.stringify({ token: "xyz", userId: "subrata", tokenExpiration: date })
    );

    mock.onPost(`${config.services.authApi.uri}/tokens`).reply(200, {
      token: "token",
      expiration: new Date(Date.now() + 20 * 60000).toISOString(),
    });
    mock
      .onGet(`${config.services.authApi.uri}/test`)
      .reply(200, "success message");

    const res = await secureAxios({
      method: "GET",
      url: `${config.services.authApi.uri}/test`,
      headers: {
        contentType: "application/json",
      }
    });

    expect(res.data).toEqual("success message");
    expect(res.config.headers.contentType).toEqual("application/json");
    localStorage.removeItem("ecmps_user");
  });

  it("Can we authenticate", async () => {
    const ecmpsUser = {
      token: "xyz",
      userId: "subrata",
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


  it("Can we refreshToken", async () => {
    const date = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      })
    );
    date.setMinutes(date.getMinutes() - 15);
    localStorage.setItem(
      "ecmps_user",
      JSON.stringify({ token: "xyz", userId: "subrata", tokenExpiration: date })
    );

    const data = { token: "refreshed token", expiration: new Date(Date.now() + 20 * 60000).toISOString() };
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
      JSON.stringify({ token: "xyz", userId: "subrata", tokenExpiration: date })
    );

    const data = { token: "refreshed token", expiration: new Date(Date.now() + 20 * 60000).toISOString() };
    mock.onPost(`${config.services.authApi.uri}/tokens`).reply(200, data);

    const res = await refreshToken();
    expect(res).toEqual(data.token);
    expect(JSON.parse(localStorage.getItem("ecmps_user")).token).toEqual(
      data.token
    );
  });

  it("rejects a refresh error without replacing the current token", async () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 15);
    localStorage.setItem(
      "ecmps_user",
      JSON.stringify({ token: "xyz", userId: "subrata", tokenExpiration: date })
    );

    mock
      .onPost(`${config.services.authApi.uri}/tokens`)
      .reply(500, "some error");

    await expect(refreshToken()).rejects.toBeDefined();
    expect(JSON.parse(localStorage.getItem("ecmps_user")).token).toBe("xyz");
    expect(displayAppError).toHaveBeenCalledTimes(1);
  });

  it("allows the next request to retry after a transient refresh failure", async () => {
    localStorage.setItem(
      "ecmps_user",
      JSON.stringify({
        token: "xyz",
        userId: "subrata",
        tokenExpiration: new Date(Date.now() - 60000).toISOString(),
      })
    );
    const data = {
      token: "refreshed token",
      expiration: new Date(Date.now() + 20 * 60000).toISOString(),
    };
    mock
      .onPost(`${config.services.authApi.uri}/tokens`)
      .replyOnce(500, "some error")
      .onPost(`${config.services.authApi.uri}/tokens`)
      .replyOnce(200, data);

    await expect(refreshToken()).rejects.toBeDefined();
    await expect(refreshToken()).resolves.toBe("refreshed token");

    expect(mock.history.post).toHaveLength(2);
  });

  it("does not send the business request when token refresh fails", async () => {
    localStorage.setItem(
      "ecmps_user",
      JSON.stringify({
        token: "xyz",
        userId: "subrata",
        tokenExpiration: new Date(Date.now() - 60000).toISOString(),
      })
    );

    mock.onPost(`${config.services.authApi.uri}/tokens`).reply(500, "some error");
    mock.onGet(`${config.services.authApi.uri}/test`).reply(200, "unexpected");

    await expect(
      secureAxios({
        method: "GET",
        url: `${config.services.authApi.uri}/test`,
      })
    ).rejects.toBeDefined();

    expect(mock.history.get).toHaveLength(0);
  });

  it("shares one refresh across concurrent protected requests", async () => {
    localStorage.setItem(
      "ecmps_user",
      JSON.stringify({
        token: "xyz",
        userId: "subrata",
        tokenExpiration: new Date(Date.now() - 60000).toISOString(),
      })
    );

    const data = {
      token: "refreshed token",
      expiration: new Date(Date.now() + 20 * 60000).toISOString(),
    };
    mock.onPost(`${config.services.authApi.uri}/tokens`).reply(200, data);
    mock.onGet(/\/test-[12]$/).reply(200, "success");

    await Promise.all([
      secureAxios({
        method: "GET",
        url: `${config.services.authApi.uri}/test-1`,
      }),
      secureAxios({
        method: "GET",
        url: `${config.services.authApi.uri}/test-2`,
      }),
    ]);

    const refreshCalls = mock.history.post.filter(
      request => request.url === `${config.services.authApi.uri}/tokens`
    );
    expect(refreshCalls).toHaveLength(1);
  });

  it("displays one error when a shared refresh fails", async () => {
    localStorage.setItem(
      "ecmps_user",
      JSON.stringify({
        token: "xyz",
        userId: "subrata",
        tokenExpiration: new Date(Date.now() - 60000).toISOString(),
      })
    );
    mock.onPost(`${config.services.authApi.uri}/tokens`).reply(500, "some error");

    const results = await Promise.allSettled([refreshToken(), refreshToken()]);

    expect(results.map(result => result.status)).toEqual([
      "rejected",
      "rejected",
    ]);
    expect(mock.history.post).toHaveLength(1);
    expect(displayAppError).toHaveBeenCalledTimes(1);
  });

  it.each([400, 401])("clears the local session after a %s refresh rejection", async (status) => {
    const currentLocation = window.location;
    localStorage.setItem(
      "ecmps_user",
      JSON.stringify({
        token: "xyz",
        userId: "subrata",
        tokenExpiration: new Date(Date.now() - 60000).toISOString(),
      })
    );
    mock.onPost(`${config.services.authApi.uri}/tokens`).reply(status, "expired");

    await expect(refreshToken()).rejects.toBeDefined();

    expect(localStorage.getItem("ecmps_user")).toBeNull();
    window.location = currentLocation;
  });

  it("compares ISO token expiration as an absolute instant", async () => {
    const now = Date.parse("2026-10-20T15:42:42.000Z");
    const dateNowSpy = jest.spyOn(Date, "now").mockReturnValue(now);
    localStorage.setItem(
      "ecmps_user",
      JSON.stringify({
        token: "xyz",
        userId: "subrata",
        tokenExpiration: "2026-10-20T15:44:42.000Z",
      })
    );

    await expect(refreshToken()).resolves.toBe("xyz");
    expect(mock.history.post).toHaveLength(0);
    dateNowSpy.mockRestore();
  });

  it("Can we logOut", async () => {
    localStorage.setItem(
      "ecmps_user",
      JSON.stringify({
        token: "xyz",
        userId: "subrata",
        tokenExpiration: "11-21-2022",
      })
    );

    localStorage.setItem("ecmps_signing_out", false);

    mock
      .onDelete(`${config.services.authApi.uri}/authentication/sign-out`)
      .reply(200, {});

    await logOut();
    expect(localStorage.getItem("ecmps_user")).toBe(null);
  });

  it("getCredentials", async () => {
    const monitorPlans = [1, 2];

    mock
      .onGet(
        `${config.services.authApi.uri
        }/certifications/statements?monitorPlanIds=${monitorPlans.join("|")}`
      )
      .reply(200, { items: {} });

    expect((await getCredentials(monitorPlans)).data).toEqual({ items: {} });
  });

  it("getPermissions", async () => {
    const userId = 1;
    mock
      .onGet(
        `${config.services.authApi.uri}/permissions?userId=${userId}`
      )
      .reply(200, []);

    expect((await getPermissions(userId)).data).toEqual([]);
  });

  it("validate", async () => {
    const payload = {
      userId: "testUser",
      items: [{ monPlanId: 1 }],
    };
  
    mock
      .onPost(`${config.services.authApi.uri}/sign/validate`)
      .reply(200, { status: "success" });
  
    const response = await validate({});
  
    expect(response.data.status).toEqual("success");
  });

  it("createActivity method should post payload and return response", async () => {
    const payload = {
      userId: "testUser",
    };
  
    mock
      .onPost(`${config.services.authApi.uri}/sign/create-activity`)
      .reply(200, { activityId: 123 });
  
    const response = await createActivity({});
  
    expect(response.data.activityId).toEqual(123);
  });
 
  it("refreshLastActivity", async () => {

    mock
      .onPost(`${config.services.authApi.uri}/authentication/update-last-activity`)
      .reply(500, "some error");

    await refreshLastActivity();
    expect(displayAppError).toHaveBeenCalled();

  });

});
