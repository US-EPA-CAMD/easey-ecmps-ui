import * as mpApi from "../utils/api/monitoringPlansApi";

// Takes a direction to check a record in or out,the configID, and a dispatcher to the redux store
export const checkoutAPI = (
  direction,
  configID,
  selectedConfig,
  setCheckout
) => {
  const user = JSON.parse(sessionStorage.getItem("cdx_user"));

  if (!direction) {
    mpApi
      .deleteCheckInMonitoringPlanConfiguration(selectedConfig.id)
      .then((res) => {
        console.log(res, "checked back in ");
        setCheckout(false, configID);
        if (res === undefined) {
          console.log("error");
        }
      });
  } else {
    mpApi
      .postCheckoutMonitoringPlanConfiguration(
        selectedConfig.id,
        user.firstName
      )
      .then((res) => {
        setCheckout(true, configID);
        if (res === undefined) {
          console.log("this configuration is already checked out ");
        }
      });
  }
};
