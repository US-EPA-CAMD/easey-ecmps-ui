const config = {
  services: {
    facilities: {
      uri: process.env.REACT_APP_FACILITIES_API,
    },
    monitorPlans: {
      uri: process.env.REACT_APP_MONITOR_PLAN_API,
    },
  },
};

export default config;
