import * as mpApi from "../utils/api/monitoringPlansApi";

// Takes a direction to check a record in or out,the configID, and a dispatcher to the redux store
export const checkoutAPI = (
  direction,
  configID,
  monitorPlanId,
  setCheckout
) => {
  const user = JSON.parse(sessionStorage.getItem("cdx_user"));

  console.log("direction", direction);
  if (!direction) {
    return mpApi
      .deleteCheckInMonitoringPlanConfiguration(monitorPlanId)
      .then((res) => {
        // console.log('RES',res)
        if (setCheckout !== undefined) {
          setCheckout(false, configID);
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
          setCheckout(true, configID);
        }
        if (res === undefined) {
          console.log("this configuration is already checked out ");
        }
      });
  }
};
