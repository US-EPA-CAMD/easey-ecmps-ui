export const oneSecond = 1000;
export const oneMinute = 60 * oneSecond;

const activityEvents = [];
activityEvents.push("click");
activityEvents.push("keydown");

export const config = {
  app: {
    activityEvents,
    activityRefreshApiCallInterval:
      process.env.REACT_APP_EASEY_ECMPS_UI_ACTIVITY_REFRESH_API_CALL_INTERVAL ||
      30 * oneSecond,
    inactivityDuration:
      process.env.REACT_APP_EASEY_ECMPS_UI_INACTIVITY_DURATION_MINUTES * oneMinute ||
      oneMinute,
    activityPollingFrequency:
      process.env.REACT_APP_EASEY_ECMPS_UI_ACTIVITY_POLLING_FREQUENCY_SECONDS *
        oneSecond || oneSecond,
    countdownDuration:
      process.env.REACT_APP_EASEY_ECMPS_UI_ACTIVITY_COUNTDOWN_DURATION_SECONDS *
        oneSecond || 30 * oneSecond,
    paginationPerPage:
      process.env.REACT_APP_EASEY_ECMPS_UI_PAGINATION_PER_PAGE || 100,
    paginationPerPageOptions: [100, 200, 500],
    paginationRangeSeparatorText: "out of",
    path: process.env.REACT_APP_EASEY_ECMPS_UI_PATH || "/",
    env: process.env.REACT_APP_EASEY_ECMPS_UI_ENV || "local-dev",
    published: process.env.REACT_APP_EASEY_ECMPS_UI_PUBLISHED || "local",
    version: process.env.REACT_APP_EASEY_ECMPS_UI_VERSION || "v0.0.0",
    title: process.env.REACT_APP_EASEY_ECMPS_UI_TITLE || "ECMPS",
  },
  services: {
    mdm: {
      uri:
        process.env.REACT_APP_EASEY_MDM_API ||
        "https://easey-dev.app.cloud.gov/api/master-data-mgmt",
    },
    rules: {
      uri:
        process.env.REACT_APP_EASEY_RULES_API ||
        "https://easey-dev.app.cloud.gov/api/rules-mgmt",
    },
    facilities: {
      uri:
        process.env.REACT_APP_EASEY_FACILITIES_API ||
        "https://easey-dev.app.cloud.gov/api/facility-mgmt",
    },
    emissions: {
      uri:
        process.env.REACT_APP_EASEY_EMISSIONS_API ||
        "https://easey-dev.app.cloud.gov/api/emissions-mgmt",
    },
    monitorPlans: {
      uri:
        process.env.REACT_APP_EASEY_MONITOR_PLAN_API ||
        "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt",
    },
    authApi: {
      uri:
        process.env.REACT_APP_EASEY_AUTH_API ||
        "https://easey-dev.app.cloud.gov/api/auth-mgmt",
    },
  },
};

export default config;
