import { checkoutAPI } from "./checkout";

JSON.parse = jest.fn().mockReturnValue({
  userId: "testuser",
});

describe("testing checkout function", () => {
  const configID = "MDC-0046E2E41EE8478DA4F57A4760C3AF97";
  const monitorPlanId = "1";
  const setCheckout = (state, config) => {};
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("conditional for undefined data returned for post call", async () => {
    jest.mock("../utils/api/monitoringPlansApi", () => {
      return {
        postCheckoutMonitoringPlanConfiguration: jest.fn(() =>
          Promise.resolve(undefined)
        ),
      };
    });
    await checkoutAPI(true, "1", "1", jest.fn());
  });

  it("conditional for undefined data returned for delete call", async () => {
    jest.clearAllMocks();
    jest.mock("../utils/api/monitoringPlansApi", () => {
      return {
        deleteCheckInMonitoringPlanConfiguration: jest.fn(() =>
          Promise.resolve(undefined)
        ),
      };
    });
    await checkoutAPI(false, "1", "1", jest.fn());
  });

  it("conditional testing for props", async () => {
    jest.clearAllMocks();
    await checkoutAPI(false, "1", "1", undefined);
    await checkoutAPI(true, "1", "1", undefined);
  });

  it("returns an array of the inactive Data", async () => {
    await checkoutAPI(false, "1", "1", setCheckout);
    await checkoutAPI(true, "1", "1", setCheckout);
  });
});
