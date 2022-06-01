import { handleResponse, handleError, handleImportError } from "./apiUtils";

let globalMsg = "";

jest.mock("../../additional-functions/app-error", () => {
  return {
    displayAppError: jest.fn((msg) => {
      globalMsg = msg;
    }),
  };
});

describe("test response and error handler functions", () => {
  test("test response handler", async () => {
    const res1 = { status: 200, data: [] };
    const res2 = { status: 201, data: [] };
    const res3 = { status: 400, data: [] };
    let res;

    res = await handleResponse(res1);
    expect(res).toBe(res1);

    res = await handleResponse(res2);
    expect(res).toBe(res2);

    try {
      res = await handleResponse(res3);
      expect(res).toBe(res3);
    } catch (e) {
      const errorName = "Error";
      const errorMsg = "failed";
      expect(e.name).toBe(errorName);
      expect(e.message).toBe(errorMsg);
    }
  });

  test("test error handler", () => {
    const errorName = "Test Error:";
    const firstErrorMsg = "Response contains status, data, and headers.";
    const apiErrorMsg = "API Communication error";
    const lastErrorMsg = "Error received only contains this message";
    const err1 = {
      response: {
        status: 400,
        data: { error: errorName, message: firstErrorMsg },
        headers: [],
      },
    };
    const err2 = {
      request: true,
    };
    const err3 = {
      message: lastErrorMsg,
    };
    const err4 = { message: "" };

    handleError(err1);
    expect(globalMsg).toBe(`${errorName} ${firstErrorMsg}`);

    handleError(err2);
    expect(globalMsg).toBe(apiErrorMsg);

    handleError(err3);
    expect(globalMsg).toBe(lastErrorMsg);

    handleImportError(err1);

    handleImportError(err2);

    handleImportError(err3);
    expect(globalMsg).toBe(lastErrorMsg);

    handleError(err4);
  });
});
