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
    apiKey: getConfigValue("REACT_APP_EASEY_ECMPS_UI_API_KEY"),
    host: getConfigValue(
      "REACT_APP_EASEY_ECMPS_UI_HOST",
      "ecmps-dev.app.cloud.gov"
    ),
    tokenRefreshThresholdSeconds:
      getConfigValueNumber("REACT_APP_TOKEN_REFRESH_THRESHOLD_SECONDS", 3) *
      oneSecond,
    googleAnalyticsEnabled: getConfigValueBoolean(
      "REACT_APP_GOOGLE_ANALYTICS_ENABLED"
    ),
    googleAnalyticsPublicContainerId: getConfigValue(
      "REACT_APP_GOOGLE_ANALYTICS_PUBLIC_CONTAINER_ID"
    ),
    googleAnalyticsAuthenticatedContainerId: getConfigValue(
      "REACT_APP_GOOGLE_ANALYTICS_AUTHENTICATED_CONTAINER_ID"
    ),
    inactivityDuration:
      getConfigValueNumber(
        "REACT_APP_EASEY_ECMPS_UI_INACTIVITY_DURATION_MINUTES",
        30
      ) * oneMinute,
    activityPollingFrequency:
      getConfigValueNumber(
        "REACT_APP_EASEY_ECMPS_UI_ACTIVITY_POLLING_FREQUENCY_SECONDS",
        5
      ) * oneSecond,
    paginationPerPage: getConfigValueNumber(
      "REACT_APP_EASEY_ECMPS_UI_PAGINATION_PER_PAGE",
      100
    ),
    path: getConfigValue("REACT_APP_EASEY_ECMPS_UI_PATH", "/"),
    env: getConfigValue("REACT_APP_EASEY_ECMPS_UI_ENV", "local-dev"),
    version: getConfigValue("REACT_APP_EASEY_ECMPS_UI_VERSION", "v0.0.0"),
    published: getConfigValue("REACT_APP_EASEY_ECMPS_UI_PUBLISHED", "local"),
    title: getConfigValue("REACT_APP_EASEY_ECMPS_UI_TITLE", "ECMPS"),
    email: getConfigValue(
      "REACT_APP_EASEY_ECMPS_UI_SUPPORT_EMAIL",
      "ecmps-beta@camdsupport.com"
    ),
    refreshEvalStatusRate:
      getConfigValueNumber(
        "REACT_APP_EASEY_ECMPS_UI_REFRESH_EVAL_STATUS_RATE_SECONDS",
        5
      ) * oneSecond,
    refreshEvalStatusTimeout:
      getConfigValueNumber(
        "REACT_APP_EASEY_ECMPS_UI_REFRESH_EVAL_STATUS_TIMEOUT_MINUTES",
        15
      ) * oneMinute,

    refreshLastActivityInterval:
      getConfigValueNumber(
        "REACT_APP_EASEY_ECMPS_UI_REFRESH_LAST_ACTIVITY_INTERVAL_MINUTES",
        1
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
    cdxHowToGetAccessPath: getConfigValue(
        "REACT_APP_EASEY_ECMPS_UI_CDX_HOW_TO_GET_ACCESS_PATH",
        "https://www.epa.gov/airmarkets/camd-business-system-cbs-faqs"
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
      "REACT_APP_EASEY_ECMPS_UI_ENABLE_MANAGE_DELEGATIONS"
    ),
    enableSystemAdminModule: getConfigValueBoolean(
      "REACT_APP_EASEY_ECMPS_UI_ENABLE_SYSTEM_ADMINISTRATION_MODULE",
      true
    ),
    enableConfigurationManagementModule: getConfigValueBoolean(
      "REACT_APP_EASEY_ECMPS_UI_ENABLE_CONFIGURATION_MANAGEMENT_MODULE",
      true
    ),


    oidcClientId: getConfigValue("REACT_APP_EASEY_ECMPS_UI_OIDC_CLIENT_ID"),
    oidcAuthEndpoint: getConfigValue("REACT_APP_EASEY_ECMPS_UI_OIDC_AUTH_ENDPOINT"),
    oidcAuthResponseType: getConfigValue("REACT_APP_EASEY_ECMPS_UI_OIDC_AUTH_RESPONSE_TYPE"),
    oidcAuthResponseMode: getConfigValue("REACT_APP_EASEY_ECMPS_UI_OIDC_AUTH_RESPONSE_MODE"),
    oidcAuthStateHmacSecretKey: getConfigValue("REACT_APP_EASEY_ECMPS_UI_OIDC_AUTH_STATE_HMAC_SECRET_KEY"),
    oidcAuthScopes: getConfigValue("REACT_APP_EASEY_ECMPS_UI_OIDC_AUTH_SCOPES"),
    cdxUserSignupMigrateUrl: getConfigValue("REACT_APP_EASEY_ECMPS_UI_CDX_SIGNUP_MIGRATE_URL"),

    clientId: getConfigValue("REACT_APP_EASEY_ECMPS_UI_CLIENT_ID"),
    clientSecret: getConfigValue("REACT_APP_EASEY_ECMPS_UI_CLIENT_SECRET"),
    enableDebug: getConfigValueBoolean("REACT_APP_EASEY_ECMPS_UI_ENABLE_DEBUG"),
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

if (config.app.enableDebug) {
  console.log("config: ", config);
}

if (config.app.env === "production") {
  log.setLevel(log.levels.ERROR);
} else {
  log.setLevel(log.levels.TRACE);
}

export default config;
