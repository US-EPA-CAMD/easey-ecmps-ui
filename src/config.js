const config = {
  services: {
    facilities: {
      uri: process.env.REACT_APP_FACILITIES_API || 'https://easey-dev.app.cloud.gov/api/facility-mgmt',
    },
    monitorPlans: {
      uri: process.env.REACT_APP_MONITOR_PLAN_API || 'https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt',
    },
  },
};

export default config;
