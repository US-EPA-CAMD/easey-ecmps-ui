import * as mpApi from "../utils/api/monitoringPlansApi";
import { MONITORING_PLAN_STORE_NAME } from "../additional-functions/workspace-section-and-store-names";
// Takes a direction to check a record in or out,the configID, and a dispatcher to the redux store
export const checkoutAPI = (
  direction,
  configID,
  monitorPlanId,
  setCheckout
) => {
  const user = JSON.parse(sessionStorage.getItem("cdx_user"));

  if (!direction) {
    return mpApi
      .deleteCheckInMonitoringPlanConfiguration(monitorPlanId)
      .then((res) => {
        if (setCheckout !== undefined) {
          setCheckout(false, configID, MONITORING_PLAN_STORE_NAME);
        }
        if (res === undefined) {
          console.log("error");
        }
      });
  } else {
    return mpApi
      .postCheckoutMonitoringPlanConfiguration(monitorPlanId, user.userId)
      .then((res) => {
        if (setCheckout !== undefined) {
          setCheckout(true, configID, MONITORING_PLAN_STORE_NAME);
        }
        if (res === undefined) {
          console.log("this configuration is already checked out ");
        }
      });
  }
};
