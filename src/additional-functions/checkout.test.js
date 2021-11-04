import { checkoutAPI } from "./checkout";
import * as mpApi from "../utils/api/monitoringPlansApi";

JSON.parse = jest.fn().mockReturnValue({
  userId: "testuser",
});

describe("testing checkout function", () => {
  const configID = "MDC-0046E2E41EE8478DA4F57A4760C3AF97";
  const monitorPlanId = "1";
  const setCheckout = (state, config) => {};

  it("returns an array of the inactive Data", () => {
    checkoutAPI(false, "1", "1", setCheckout);
    checkoutAPI(true, "1", "1", setCheckout);
    checkoutAPI(false, configID, monitorPlanId, null);
    checkoutAPI(true, configID, monitorPlanId, null);
  });
});
