import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { displayAppError } from "../../additional-functions/app-error";
import config from "../../config";

import { clientTokenAxios } from "./clientTokenAxios";
import { getApiUrl } from "./monitoringPlansApi";
jest.mock("axios");
jest.mock("../../additional-functions/app-error.js", () => ({
  displayAppError: jest.fn(),
}));

describe("testing clientTokenAxios", () => {
  afterAll(() => {
    jest.restoreAllMocks();
    const mock = new MockAdapter(axios);
    jest.mock("axios");
  });
  it("clientTokenAxios no client token", async () => {
    sessionStorage.setItem(
      "client_token_expiration",
      JSON.stringify("11-21-3022")
    );

    await clientTokenAxios({
      method: "POST",
      url: "testurl",
      data: {
        errorMessage: "test msg",
      },
    });
    expect(sessionStorage.getItem("cdx_user")).toBe(null);
  });
  it("clientTokenAxios", async () => {
    sessionStorage.setItem("client_token", JSON.stringify("11-21-2022"));
    sessionStorage.setItem(
      "client_token_expiration",
      JSON.stringify("11-21-2022")
    );

    await clientTokenAxios({
      method: "POST",
      url: "testurl",
      data: {
        errorMessage: "test msg",
      },
    });
    expect(sessionStorage.getItem("cdx_user")).toBe(null);
  });

  it("clientTokenAxios future date", async () => {
    sessionStorage.setItem("client_token", JSON.stringify("11-21-3022"));
    sessionStorage.setItem(
      "client_token_expiration",
      JSON.stringify("11-21-3022")
    );

    await clientTokenAxios({
      method: "POST",
      url: "testurl",
      data: {
        errorMessage: "test msg",
      },
    });
    expect(sessionStorage.getItem("cdx_user")).toBe(null);
  });
});
