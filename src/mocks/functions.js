import config from "../config";
import {
  mockFacilityList,
  mockMonitorPlanConfigurations,
  mockReportingPeriods,
  mockDropdownFacilityList,
  mockMonitoringSpans,
  mockMonitoringAnalyzerRanges,
} from "./constants";

export const getMockEcmpsUser = () => {
  //We need to export a function rather than a constant because objects are mutable, and this provides the ability to make non-mutable changes that can run on a test per test basis
  return {
    email: "",
    facilities: [...mockFacilityList], //Once again this is a mutable reference, so we need to spread it into a new object
    firstName: "mockUserFirst",
    lastName: "mockUserLast",
    roles: [
      config.app.sponsorRole,
      config.app.submitterRole,
      config.app.preparerRole,
      config.app.adminRole,
      config.app.analystRole,
    ],
    token: "",
    tokenExpiration: "",
    userId: "mock-user",
  };
};

export const getMockReportingPeriods = () => {
  return [...mockReportingPeriods];
};

export const getMockMonitorPlanConfigurations = () => {
  return [...mockMonitorPlanConfigurations];
};

export const getMockFacilityDropwdownList = () => {
  return [...mockDropdownFacilityList];
};

export const getMockMonitoringSpans = () => {
  return [...mockMonitoringSpans];
}
export const getMockMonitoringAnalyzerRanges = () => {
  return [...mockMonitoringAnalyzerRanges];
}
