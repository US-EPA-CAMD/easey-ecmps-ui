export const oneSecond = 1000;
export const oneMinute = 60 * oneSecond;

const activityEvents = [];
activityEvents.push("click");
activityEvents.push("keydown");

export const config = {
  app: {
    activityEvents,
    apiKey: process.env.REACT_APP_ECMPS_API_KEY || "",
    googleAnalyticsEnabled:
      process.env.REACT_APP_GOOGLE_ANALYTICS_ENABLED || "false",
    googleAnalyticsPublicContainerId:
      process.env.REACT_APP_GOOGLE_ANALYTICS_PUBLIC_CONTAINER_ID || "",
    googleAnalyticsAuthenticatedContainerId:
      process.env.REACT_APP_GOOGLE_ANALYTICS_AUTHENTICATED_CONTAINER_ID || "",
    refreshTokenRate:
      process.env.REACT_APP_EASEY_ECMPS_UI_REFRESH_TOKEN_RATE_MINUTES *
        oneMinute || 1 * oneMinute, // Change ME
    inactivityDuration:
      process.env
        .REACT_APP_EASEY_ECMPS_UI_INACTIVITY_DURATION_CHECKOUT_MINUTES *
        oneMinute || 200 * oneMinute, //Change ME
    inactivityLogoutDuration:
      process.env.REACT_APP_EASEY_ECMPS_UI_INACTIVITY_DURATION_LOGOUT_MINUTES *
        oneMinute || 200 * oneMinute, //Change ME
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
    path: process.env.REACT_APP_EASEY_ECMPS_UI_PATH || "/ecmps/",
    env: process.env.REACT_APP_EASEY_ECMPS_UI_ENV || "local-dev",
    published: process.env.REACT_APP_EASEY_ECMPS_UI_PUBLISHED || "local",
    version: process.env.REACT_APP_EASEY_ECMPS_UI_VERSION || "v0.0.0",
    title: process.env.REACT_APP_EASEY_ECMPS_UI_TITLE || "ECMPS",
    email:
      process.env.REACT_APP_EASEY_ECMPS_UI_SUPPORT_EMAIL ||
      "ecmps-beta@camdsupport.com",
    refreshEvalStatusRate:
      process.env.REACT_APP_EASEY_ECMPS_UI_REFRESH_EVAL_STATUS_RATE_SECONDS *
        oneSecond || 5 * oneSecond,
    refreshEvalStatusTimeout:
      process.env.REACT_APP_EASEY_ECMPS_UI_REFRESH_EVAL_STATUS_TIMEOUT_MINUTES *
        oneMinute || 15 * oneMinute,
    cbsBaseUrl:
      process.env.REACT_APP_EASEY_ECMPS_UI_CBS_BASE_URL ||
      "https://camd.epa.gov",
    cbsManageDelegationsPath:
      process.env.REACT_APP_EASEY_ECMPS_UI_CBS_MANAGE_DELEGATIONS_PATH ||
      "/CBS/login/auth",
    cdxBaseUrl:
      process.env.REACT_APP_EASEY_ECMPS_UI_CDX_BASE_URL ||
      "https://dev.epacdx.net",
    cdxForgotUserIdPath:
      process.env.REACT_APP_EASEY_ECMPS_UI_CDX_FORGOT_USERID_PATH ||
      "/AccountRecovery/ForgotUserId",
    cdxForgotPasswordPath:
      process.env.REACT_APP_EASEY_ECMPS_UI_CDX_REGISTER_PATH ||
      "/PasswordReset/GetResetCode",
    cdxRegisterPath:
      process.env.REACT_APP_EASEY_ECMPS_UI_CDX_FORGOT_PASSWORD_PATH ||
      "/Registration/Terms",
    enableManageDelegations:
      process.env.REACT_APP_EASEY_ECMPS_UI_ENABLE_MANAGE_DELEGATIONS || "false",
  },
  services: {
    mdm: {
      uri:
        process.env.REACT_APP_EASEY_MDM_API ||
        "https://api-easey-dev.app.cloud.gov/master-data-mgmt",
    },
    rules: {
      uri:
        process.env.REACT_APP_EASEY_RULES_API ||
        "https://api-easey-dev.app.cloud.gov/rules-mgmt",
    },
    facilities: {
      uri:
        process.env.REACT_APP_EASEY_FACILITIES_API ||
        "https://api-easey-dev.app.cloud.gov/facilities-mgmt",
    },
    emissions: {
      uri:
        process.env.REACT_APP_EASEY_EMISSIONS_API ||
        "https://api-easey-dev.app.cloud.gov/emissions-mgmt",
    },
    monitorPlans: {
      uri:
        process.env.REACT_APP_EASEY_MONITOR_PLAN_API ||
        "https://api-easey-dev.app.cloud.gov/monitor-plan-mgmt",
    },
    authApi: {
      uri:
        process.env.REACT_APP_EASEY_AUTH_API ||
        "https://api-easey-dev.app.cloud.gov/auth-mgmt",
    },
    quartz: {
      uri:
        process.env.REACT_APP_EASEY_QUARTZ_API ||
        "https://easey-dev.app.cloud.gov/quartz/api",
    },
  },
};

export default config;
