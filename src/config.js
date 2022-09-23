export const oneSecond = 1000;
export const oneMinute = 60 * oneSecond;

const activityEvents = [];
activityEvents.push("click");
activityEvents.push("keydown");

const getConfigValue = (key, defaultValue = "") => {
  let returnValue;

  if (window._env_ && window._env_[key]) {
    returnValue = window._env_[key];
  } else if (!returnValue && process.env[key]) {
    returnValue = process.env[key];
  }
  return returnValue || defaultValue;
};

export const config = {
  app: {
    activityEvents,
    paginationRangeSeparatorText: "out of",
    paginationPerPageOptions: [100, 200, 500],
    apiKey: getConfigValue("REACT_APP_ECMPS_API_KEY"),
    host: getConfigValue(
      "REACT_APP_EASEY_ECMPS_UI_HOST",
      "easey-dev.app.cloud.gov"
    ),
    googleAnalyticsEnabled: getConfigValue(
      "REACT_APP_GOOGLE_ANALYTICS_ENABLED",
      "false"
    ),
    googleAnalyticsPublicContainerId: getConfigValue(
      "REACT_APP_GOOGLE_ANALYTICS_PUBLIC_CONTAINER_ID"
    ),
    googleAnalyticsAuthenticatedContainerId: getConfigValue(
      "REACT_APP_GOOGLE_ANALYTICS_AUTHENTICATED_CONTAINER_ID"
    ),
    refreshTokenRate:
      getConfigValue("REACT_APP_EASEY_ECMPS_UI_REFRESH_TOKEN_RATE_MINUTES", 1) *
      oneMinute,
    inactivityDuration:
      getConfigValue(
        "REACT_APP_EASEY_ECMPS_UI_INACTIVITY_DURATION_CHECKOUT_MINUTES",
        1
      ) * oneMinute,
    inactivityLogoutDuration:
      getConfigValue(
        "REACT_APP_EASEY_ECMPS_UI_INACTIVITY_DURATION_LOGOUT_MINUTES",
        1
      ) * oneMinute,
    activityPollingFrequency:
      getConfigValue(
        "REACT_APP_EASEY_ECMPS_UI_ACTIVITY_POLLING_FREQUENCY_SECONDS",
        1
      ) * oneSecond,
    countdownDuration:
      getConfigValue(
        "REACT_APP_EASEY_ECMPS_UI_ACTIVITY_COUNTDOWN_DURATION_SECONDS",
        30
      ) * oneSecond,
    paginationPerPage: getConfigValue(
      "REACT_APP_EASEY_ECMPS_UI_PAGINATION_PER_PAGE",
      100
    ),
    path: getConfigValue("REACT_APP_EASEY_ECMPS_UI_PATH", "/"),
    env: getConfigValue("REACT_APP_EASEY_ECMPS_UI_ENV", "local-dev"),
    published: getConfigValue("REACT_APP_EASEY_ECMPS_UI_PUBLISHED", "local"),
    version: getConfigValue("REACT_APP_EASEY_ECMPS_UI_VERSION", "v0.0.0"),
    title: getConfigValue("REACT_APP_EASEY_ECMPS_UI_TITLE", "ECMPS"),
    email: getConfigValue(
      "REACT_APP_EASEY_ECMPS_UI_SUPPORT_EMAIL",
      "ecmps-beta@camdsupport.com"
    ),
    refreshEvalStatusRate:
      getConfigValue(
        "REACT_APP_EASEY_ECMPS_UI_REFRESH_EVAL_STATUS_RATE_SECONDS",
        5
      ) * oneSecond,
    refreshEvalStatusTimeout:
      getConfigValue(
        "REACT_APP_EASEY_ECMPS_UI_REFRESH_EVAL_STATUS_TIMEOUT_MINUTES",
        15
      ) * oneMinute,
    cbsBaseUrl: getConfigValue(
      "REACT_APP_EASEY_ECMPS_UI_CBS_BASE_URL",
      "https://camd.epa.gov"
    ),
    cbsManageDelegationsPath: getConfigValue(
      "REACT_APP_EASEY_ECMPS_UI_CBS_MANAGE_DELEGATIONS_PATH",
      "/CBS/login/auth"
    ),
    cdxBaseUrl: getConfigValue(
      "REACT_APP_EASEY_ECMPS_UI_CDX_BASE_URL",
      "https://dev.epacdx.net"
    ),
    cdxForgotUserIdPath: getConfigValue(
      "REACT_APP_EASEY_ECMPS_UI_CDX_FORGOT_USERID_PATH",
      "/AccountRecovery/ForgotUserId"
    ),
    cdxForgotPasswordPath: getConfigValue(
      "REACT_APP_EASEY_ECMPS_UI_CDX_FORGOT_PASSWORD_PATH",
      "/PasswordReset/GetResetCode"
    ),
    cdxRegisterPath: getConfigValue(
      "REACT_APP_EASEY_ECMPS_UI_CDX_REGISTER_PATH",
      "/Registration/Terms"
    ),
    enableManageDelegations: getConfigValue(
      "REACT_APP_EASEY_ECMPS_UI_ENABLE_MANAGE_DELEGATIONS",
      "false"
    ),
    clientId: getConfigValue("REACT_APP_EASEY_ECMPS_UI_CLIENT_ID"),
    clientSecret: getConfigValue("REACT_APP_EASEY_ECMPS_UI_CLIENT_SECRET"),
  },
  services: {
    mdm: {
      uri: getConfigValue(
        "REACT_APP_EASEY_MDM_API",
        "https://api.epa.gov/easey/dev/master-data-mgmt"
      ),
    },
    facilities: {
      uri: getConfigValue(
        "REACT_APP_EASEY_FACILITIES_API",
        "https://api.epa.gov/easey/dev/facilities-mgmt"
      ),
    },
    emissions: {
      uri: getConfigValue(
        "REACT_APP_EASEY_EMISSIONS_API",
        "https://api.epa.gov/easey/dev/emissions-mgmt"
      ),
    },
    monitorPlans: {
      uri: getConfigValue(
        "REACT_APP_EASEY_MONITOR_PLAN_API",
        "https://api.epa.gov/easey/dev/monitor-plan-mgmt"
      ),
    },
    qaCertification: {
      uri: getConfigValue(
        "REACT_APP_EASEY_QA_CERTIFICATION_API",
        "https://api.epa.gov/easey/dev/qa-certification-mgmt"
      ),
    },
    authApi: {
      uri: getConfigValue(
        "REACT_APP_EASEY_AUTH_API",
        "https://api.epa.gov/easey/dev/auth-mgmt"
      ),
    },
    quartz: {
      uri: getConfigValue(
        "REACT_APP_EASEY_QUARTZ_API",
        "https://api.epa.gov/easey/dev/quartz-mgmt"
      ),
    },
    content: {
      uri: getConfigValue(
        "REACT_APP_EASEY_CONTENT_API",
        "https://api.epa.gov/easey/dev/content-mgmt"
      ),
    },
    camd: {
      uri: getConfigValue(
        "REACT_APP_EASEY_CAMD_SERVICES",
        "https://api.epa.gov/easey/dev/camd-services"
      ),
    },
  },
};

export default config;
