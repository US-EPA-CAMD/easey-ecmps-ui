import * as mpApi from "../utils/api/monitoringPlansApi";

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
        console.log(res, "checked back in ");
        if (setCheckout !== undefined) setCheckout(false, configID);
        if (res === undefined) {
          console.log("error");
        }
      });
  } else {
    return mpApi
      .postCheckoutMonitoringPlanConfiguration(monitorPlanId, user.userId)
      .then((res) => {
        setCheckout(true, configID);
        if (res === undefined) {
          console.log("this configuration is already checked out ");
        }
      });
  }
};
