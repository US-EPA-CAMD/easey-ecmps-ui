export const mockFacilityList = [
  {
    facId: 1,
    orisCode: 3,
    permissions: ["DPEM", "DPMP", "DPQA"],
  },
  {
    facId: 2,
    orisCode: 5,
    permissions: ["DPEM", "DPMP", "DPQA"],
  },
  {
    facId: 3,
    orisCode: 7,
    permissions: ["DPEM", "DPMP", "DPQA"],
  },
  {
    facId: 4,
    orisCode: 8,
    permissions: ["DPEM", "DPMP", "DPQA"],
  },
];

export const mockDropdownFacilityList = [
  {
    id: 3,
    facilityName: "Barry",
  },
];

export const mockReportingPeriods = [
  {
    periodAbbreviation: "2022 Q4",
  },
  {
    periodAbbreviation: "2022 Q3",
  },
  {
    periodAbbreviation: "2022 Q2",
  },
  {
    periodAbbreviation: "2022 Q1",
  },
];

export const mockMonitorPlanConfigurations = [
  {
    id: "MDC-0AD77532C61345C6B50CBC80ADA1A3E1",
    facId: 1,
    facilityName: "Barry",
    configTypeCode: null,
    lastUpdated: "2009-02-20T20:09:02.000Z",
    updatedStatusFlag: "Y",
    needsEvalFlag: "Y",
    checkSessionId: null,
    orisCode: 3,
    name: "1, 2, 3, CS0AAN",
    beginReportPeriodId: 9,
    endReportPeriodId: 91,
    active: false,
    pendingStatusCode: null,
    evalStatusCode: null,
    unitStackConfigurations: [],
    locations: [],
    userId: "GNPINV",
    addDate: "2009-02-20T16:53:06.000Z",
    updateDate: "2023-03-21T13:13:32.000Z",
    submissionId: 916280,
    submissionAvailabilityCode: "REQUIRE",
    lastEvaluatedDate: null,
  },
  {
    id: "MDC-0AD77532C61345C6B50CBC80ADA1A3E2",
    facId: 1,
    facilityName: "Barry",
    configTypeCode: null,
    lastUpdated: "2009-02-20T20:09:02.000Z",
    updatedStatusFlag: "Y",
    needsEvalFlag: "Y",
    checkSessionId: null,
    orisCode: 3,
    name: "1, 2, CS0AAN",
    beginReportPeriodId: 9,
    endReportPeriodId: 91,
    active: true,
    pendingStatusCode: null,
    evalStatusCode: "EVAL",
    unitStackConfigurations: [],
    locations: [],
    userId: "GNPINV",
    addDate: "2009-02-20T16:53:06.000Z",
    updateDate: "2023-03-21T13:13:32.000Z",
    submissionId: 916280,
    submissionAvailabilityCode: "REQUIRE",
    lastEvaluatedDate: null,
  },
];
