export const second = 1000;
export const minute = 60 * second;

const activityEvents = [];
activityEvents.push("click");
activityEvents.push("keydown");

const title = "EPA Easey";

export const config = {
  app: {
    activityEvents,
    activityPollingFrequency:
      process.env.REACT_APP_EASEY_UI_ACTIVITY_POLLING_FREQUENCY || second,
    countdownDuration:
      process.env.REACT_APP_EASEY_UI_ACTIVITY_COUNTDOWN_DURATION || 30 * second,
    env: process.env.REACT_APP_EASEY_UI_PORTAL_ENV || "local-dev",
    inactivityDuration:
      process.env.REACT_APP_EASEY_UI_INACTIVITY_DURATION || minute,
    published: process.env.REACT_APP_EASEY_UI_PORTAL_PUBLISHED || "local",
    version: process.env.REACT_APP_EASEY_UI_PORTAL_VERSION || "v0.0.0",
    title,
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
