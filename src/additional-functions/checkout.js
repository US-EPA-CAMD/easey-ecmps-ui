import * as mpApi from "../utils/api/monitoringPlansApi";
import { MONITORING_PLAN_STORE_NAME } from "../additional-functions/workspace-section-and-store-names";
// Takes a direction to check a record in or out,the configID, and a dispatcher to the redux store
export const checkoutAPI = (direction, monitorPlanId, setCheckout) => {
  const user = JSON.parse(localStorage.getItem("ecmps_user"));

  if (!direction) {
    return mpApi
      .deleteCheckInMonitoringPlanConfiguration(monitorPlanId)
      .then((res) => {
        if (setCheckout !== undefined) {
          setCheckout(false, monitorPlanId, MONITORING_PLAN_STORE_NAME);
        }
        if (res === undefined) {
          console.log("error");
        }
      });
  } else {
    return mpApi
      .postCheckoutMonitoringPlanConfiguration(monitorPlanId)
      .then((res) => {
        if (setCheckout !== undefined) {
          setCheckout(true, monitorPlanId, MONITORING_PLAN_STORE_NAME);
        }
        if (res === undefined) {
          console.log("this configuration is already checked out");
        }
      });
  }
};
