const config = {
  services: {
    facilities: {
      uri: process.env.REACT_APP_FACILITY_API,
    },
    monitorPlans: {
      uri: process.env.REACT_APP_MONITOR_PLAN_API,
    },
  },
};

export default config;
