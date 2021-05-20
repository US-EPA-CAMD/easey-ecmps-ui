export default {
  facilities: [],
  monitoringPlans: [],
  monitoringMethods:{
    matsMethods:[],
    methods:[]
  },
  monitoringSystems:{
    systems:[],
    components:[]
  },
  apiCallsInProgress: {
    facilities: false,
    monitoringPlans: false,
    monitoringMethods: false,
    monitoringSystems: false,
    monitoringMatsMethods: false,
    monitoringSystemsComponents :false,
  },
  openedFacilityTabs: [],
  activeTab:[0],
};
