import log from "loglevel";

import * as mpApi from "../utils/api/monitoringPlansApi";
import { MONITORING_PLAN_STORE_NAME } from "../additional-functions/workspace-section-and-store-names";
import { setCheckedOutLocations } from "../store/actions/checkedOutLocations";
import { setCheckoutState, } from "../store/actions/dynamicFacilityTab";

// Takes a direction to check a record in or out,the configID, and a dispatcher to the redux store
export const checkoutAPI = (direction, monitorPlanId, setCheckout) => {
  if (!direction) {
    return mpApi
      .deleteCheckInMonitoringPlanConfiguration(monitorPlanId)
      .then((res) => {
        if (setCheckout !== undefined) {
          setCheckout(false, monitorPlanId, MONITORING_PLAN_STORE_NAME);
        }
        if (res === undefined) {
          log.log("error");
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
          log.log("this configuration is already checked out");
        }
      });
  }
};

export const checkPlanOut = (dispatch) => async (monitorPlanId) => {
  try {
    await mpApi.postCheckoutMonitoringPlanConfiguration(monitorPlanId);
    dispatch(setCheckoutState(true, monitorPlanId, MONITORING_PLAN_STORE_NAME));
  } catch (err) {
    log.error(err);
  } finally {
    const res = await mpApi.getCheckedOutLocations();
    const checkedOutLocations = res.data?.items ?? [];
    dispatch(setCheckedOutLocations(checkedOutLocations));
  }
};

export const checkPlanIn = (dispatch) => async (monitorPlanId) => {
  try {
    await mpApi.deleteCheckInMonitoringPlanConfiguration(monitorPlanId);
    dispatch(setCheckoutState(false, monitorPlanId, MONITORING_PLAN_STORE_NAME));
  } catch (err) {
    log.error(err);
  } finally {
    const res = await mpApi.getCheckedOutLocations();
    const checkedOutLocations = res.data?.items ?? [];
    dispatch(setCheckedOutLocations(checkedOutLocations));
  }
};
