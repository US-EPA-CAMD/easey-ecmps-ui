const config = {
  app: {
    env: process.env.REACT_APP_EASEY_UI_PORTAL_ENV || "local-dev",
    version: process.env.REACT_APP_EASEY_UI_PORTAL_VERSION || "v0.0.0",
    published: process.env.REACT_APP_EASEY_UI_PORTAL_PUBLISHED || "local",
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
