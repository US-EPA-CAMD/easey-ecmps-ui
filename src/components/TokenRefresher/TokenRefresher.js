import React from "react";
import { config } from "../../config";
import { useInterval } from "../../additional-functions/use-interval";
import { refreshToken } from "../../utils/api/easeyAuthApi";

export const TokenRefresher = () => {
  const currentSessionValue = sessionStorage.getItem("refreshTokenTimer");
  if (
    currentSessionValue === undefined ||
    isNaN(currentSessionValue) ||
    currentSessionValue == null
  )
    sessionStorage.setItem("refreshTokenTimer", 0);

  useInterval(() => {
    const currentInterval = parseInt(
      sessionStorage.getItem("refreshTokenTimer")
    );

    sessionStorage.setItem(
      "refreshTokenTimer",
      currentInterval + config.app.activityPollingFrequency / 1000
    );

    if (
      parseInt(sessionStorage.getItem("refreshTokenTimer")) >=
      config.app.refreshTokenRate / 1000
    ) {
      sessionStorage.setItem("refreshTokenTimer", 0);
      // console.log("Refreshing Token Now");
      refreshToken();
    }
  }, config.app.activityPollingFrequency);

  return <div></div>;
};
