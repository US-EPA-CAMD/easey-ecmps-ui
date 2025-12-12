import log from "loglevel";
import {
  getConfigValue,
  getConfigValueNumber,
  getConfigValueBoolean,
} from "./utils/configFunctions";

export const oneSecond = 1000;
export const fiveSeconds = 5000;
export const oneMinute = 60 * oneSecond;

const activityEvents = [];
activityEvents.push("click");
activityEvents.push("keydown");

export const config = {
  app: {
    activityEvents,
    paginationRangeSeparatorText: "out of",
    paginationPerPageOptions: [100, 200, 500],
    apiKey: getConfigValue("VITE_EASEY_ECMPS_UI_API_KEY"),
    host: getConfigValue(
      "VITE_EASEY_ECMPS_UI_HOST",
      "ecmps-dev.app.cloud.gov"
    ),
    tokenRefreshThresholdSeconds:
      getConfigValueNumber("VITE_TOKEN_REFRESH_THRESHOLD_SECONDS", 3) *
      oneSecond,
    googleAnalyticsEnabled: getConfigValueBoolean(
      "VITE_GOOGLE_ANALYTICS_ENABLED"
    ),
    googleAnalyticsPublicContainerId: getConfigValue(
      "VITE_GOOGLE_ANALYTICS_PUBLIC_CONTAINER_ID"
    ),
    googleAnalyticsAuthenticatedContainerId: getConfigValue(
      "VITE_GOOGLE_ANALYTICS_AUTHENTICATED_CONTAINER_ID"
    ),
    inactivityDuration:
      getConfigValueNumber(
        "VITE_EASEY_ECMPS_UI_INACTIVITY_DURATION_MINUTES",
        30
      ) * oneMinute,
    activityPollingFrequency:
      getConfigValueNumber(
        "VITE_EASEY_ECMPS_UI_ACTIVITY_POLLING_FREQUENCY_SECONDS",
        5
      ) * oneSecond,
    paginationPerPage: getConfigValueNumber(
      "VITE_EASEY_ECMPS_UI_PAGINATION_PER_PAGE",
      100
    ),
    path: getConfigValue("VITE_EASEY_ECMPS_UI_PATH", "/"),
    env: getConfigValue("VITE_EASEY_ECMPS_UI_ENV", "local-dev"),
    version: getConfigValue("VITE_EASEY_ECMPS_UI_VERSION", "v0.0.0"),
    published: getConfigValue("VITE_EASEY_ECMPS_UI_PUBLISHED", "local"),
    title: getConfigValue("VITE_EASEY_ECMPS_UI_TITLE", "ECMPS"),
    email: getConfigValue(
      "VITE_EASEY_ECMPS_UI_SUPPORT_EMAIL",
      "ecmps-beta@camdsupport.com"
    ),
    refreshEvalStatusRate:
      getConfigValueNumber(
        "VITE_EASEY_ECMPS_UI_REFRESH_EVAL_STATUS_RATE_SECONDS",
        5
      ) * oneSecond,
    refreshEvalStatusTimeout:
      getConfigValueNumber(
        "VITE_EASEY_ECMPS_UI_REFRESH_EVAL_STATUS_TIMEOUT_MINUTES",
        15
      ) * oneMinute,

    refreshLastActivityInterval:
      getConfigValueNumber(
        "VITE_EASEY_ECMPS_UI_REFRESH_LAST_ACTIVITY_INTERVAL_MINUTES",
        1
      ) * oneMinute,
    cbsBaseUrl: getConfigValue(
      "VITE_EASEY_ECMPS_UI_CBS_BASE_URL",
      "https://camd.epa.gov"
    ),
    cbsManageDelegationsPath: getConfigValue(
      "VITE_EASEY_ECMPS_UI_CBS_MANAGE_DELEGATIONS_PATH",
      "/CBS/login/auth"
    ),
    cdxBaseUrl: getConfigValue(
      "VITE_EASEY_ECMPS_UI_CDX_BASE_URL",
      "https://dev.epacdx.net"
    ),
    cdxForgotUserIdPath: getConfigValue(
      "VITE_EASEY_ECMPS_UI_CDX_FORGOT_USERID_PATH",
      "/AccountRecovery/ForgotUserId"
    ),
    cdxHowToGetAccessPath: getConfigValue(
        "VITE_EASEY_ECMPS_UI_CDX_HOW_TO_GET_ACCESS_PATH",
        "https://www.epa.gov/airmarkets/camd-business-system-cbs-faqs"
    ),
    cdxForgotPasswordPath: getConfigValue(
      "VITE_EASEY_ECMPS_UI_CDX_FORGOT_PASSWORD_PATH",
      "/PasswordReset/GetResetCode"
    ),
    cdxRegisterPath: getConfigValue(
      "VITE_EASEY_ECMPS_UI_CDX_REGISTER_PATH",
      "/Registration/Terms"
    ),
    enableManageDelegations: getConfigValue(
      "VITE_EASEY_ECMPS_UI_ENABLE_MANAGE_DELEGATIONS"
    ),
    enableSystemAdminModule: getConfigValueBoolean(
      "VITE_EASEY_ECMPS_UI_ENABLE_SYSTEM_ADMINISTRATION_MODULE",
      true
    ),
    camApiPortalPath: getConfigValue(
      "VITE_EASEY_ECMPS_UI_CAM_API_PORTAL_PATH",
      "https://www.epa.gov/power-sector/cam-api-portal"
    ),


    oidcClientId: getConfigValue("VITE_EASEY_ECMPS_UI_OIDC_CLIENT_ID"),
    oidcAuthEndpoint: getConfigValue("VITE_EASEY_ECMPS_UI_OIDC_AUTH_ENDPOINT"),
    oidcAuthResponseType: getConfigValue("VITE_EASEY_ECMPS_UI_OIDC_AUTH_RESPONSE_TYPE"),
    oidcAuthResponseMode: getConfigValue("VITE_EASEY_ECMPS_UI_OIDC_AUTH_RESPONSE_MODE"),
    oidcAuthScopes: getConfigValue("VITE_EASEY_ECMPS_UI_OIDC_AUTH_SCOPES"),
    cdxUserSignupMigrateUrl: getConfigValue("VITE_EASEY_ECMPS_UI_CDX_SIGNUP_MIGRATE_URL"),
    appIdentifier: getConfigValue("VITE_EASEY_ECMPS_UI_APP_IDENTIFIER", "ecmps-ui"),
    enableDebug: getConfigValueBoolean("VITE_EASEY_ECMPS_UI_ENABLE_DEBUG"),
    sponsorRole: getConfigValue("EASEY_AUTH_API_SPONSOR_ROLE", "Sponsor"),
    submitterRole: getConfigValue("EASEY_AUTH_API_SUBMITTER_ROLE", "Submitter"),
    preparerRole: getConfigValue("EASEY_AUTH_API_PREPARER_ROLE", "Preparer"),
    analystRole: getConfigValue("EASEY_AUTH_API_ANALYST_ROLE", "ECMPS Analyst"),
    adminRole: getConfigValue("EASEY_AUTH_API_ADMIN_ROLE", "ECMPS Admin"),
    initialAuthorizerRole: getConfigValue("EASEY_AUTH_API_INITIAL_AUTHORIZER_ROLE", "Initial Authorizer"),
  },
  services: {
    mdm: {
      uri: getConfigValue(
        "VITE_EASEY_MDM_API",
        "https://api.epa.gov/easey/dev/master-data-mgmt"
      ),
    },
    facilities: {
      uri: getConfigValue(
        "VITE_EASEY_FACILITIES_API",
        "https://api.epa.gov/easey/dev/facilities-mgmt"
      ),
    },
    emissions: {
      uri: getConfigValue(
        "VITE_EASEY_EMISSIONS_API",
        "https://api.epa.gov/easey/dev/emissions-mgmt"
      ),
    },
    monitorPlans: {
      uri: getConfigValue(
        "VITE_EASEY_MONITOR_PLAN_API",
        "https://api.epa.gov/easey/dev/monitor-plan-mgmt"
      ),
    },
    qaCertification: {
      uri: getConfigValue(
        "VITE_EASEY_QA_CERTIFICATION_API",
        "https://api.epa.gov/easey/dev/qa-certification-mgmt"
      ),
    },
    authApi: {
      uri: getConfigValue(
        "VITE_EASEY_AUTH_API",
        "https://api.epa.gov/easey/dev/auth-mgmt"
      ),
    },
    content: {
      uri: getConfigValue(
        "VITE_EASEY_CONTENT_API",
        "https://api.epa.gov/easey/dev/content-mgmt"
      ),
    },
    camd: {
      uri: getConfigValue(
        "VITE_EASEY_CAMD_SERVICES",
        "https://api.epa.gov/easey/dev/camd-services"
      ),
    },
  },
};

if (config.app.enableDebug) {
  log.log("config: ", config);
}

if (config.app.env === "production") {
  log.setLevel(log.levels.ERROR);
} else {
  log.setLevel(log.levels.TRACE);
}

export default config;
