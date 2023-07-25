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

export const mockMonitoringSpans = [
  {
    componentTypeCode: "SO2",
    spanScaleCode: "H",
    spanMethodCode: "HD",
    mecValue: 156.9,
    mpcValue: 177.2,
    mpfValue: 8563000,
    spanValue: 200,
    fullScaleRange: 200,
    spanUnitsOfMeasureCode: "PPM",
    defaultHighRange: null,
    flowSpanValue: null,
    flowFullScaleRange: null,
    beginDate: "2018-05-17",
    beginHour: 14,
    endDate: null,
    endHour: null,
    id: "MRHODES16-A5DBB8DF4F1D4D3A95AD2553008EB554",
    locationId: "5770",
    userid: "abcde",
    addDate: "2009-02-20",
    updateDate: "2009-02-20",
    active: true,
    scaleTransitionPoint: 0
  },
  {
    componentTypeCode: "SO2",
    spanScaleCode: "H",
    spanMethodCode: "HD",
    mecValue: 156.9,
    mpcValue: 177.2,
    mpfValue: 8563000,
    spanValue: 200,
    fullScaleRange: 200,
    spanUnitsOfMeasureCode: "PPM",
    defaultHighRange: null,
    flowSpanValue: null,
    flowFullScaleRange: null,
    beginDate: "2018-05-17",
    beginHour: 14,
    endDate: null,
    endHour: null,
    id: "2",
    locationId: "5770",
    userid: "abcde",
    addDate: "2009-02-20",
    updateDate: "2009-02-20",
    active: true,
    scaleTransitionPoint: 0
  }
]
export const mockMonitoringAnalyzerRanges = [
  {
    active: false,
    addDate: "2009-02-20",
    analyzerRangeCode: "H",
    beginDate: "1993-10-01",
    beginHour: "0",
    componentRecordId: "CAMD-60A6D62FDAB14840BFCF67E049B4B4C5",
    dualRangeIndicator: "0",
    endDate: "2019-11-06",
    endHour: "14",
    id: "CAMD-A39804B8C17A4478970F7B2CCBF429B6",
    updateDate: "2020-01-23",
    userId: "bvick",
  },
]

export const mockFacilities = [
  [
    {
      orisCode: "3",
      name: "Barry",
      state: "Alabama",
      epaRegion: "4",
      county: "Mobile County",
      links: [
        {
          rel: "self",
          href: "/facilities/3",
        },
        {
          rel: "monitor-plans",
          href: "facilities/3/monitor-plans",
        },
      ],
    },
    {
      orisCode: "5",
      name: "Chickasaw",
      state: "Alabama",
      epaRegion: "4",
      county: "Mobile County",
      links: [
        {
          rel: "self",
          href: "/facilities/5",
        },
        {
          rel: "monitor-plans",
          href: "facilities/5/monitor-plans",
        },
      ],
    },
    {
      orisCode: "9",
      name: "Copper Station",
      state: "Texas",
      epaRegion: "6",
      county: "El Paso County",
      links: [
        {
          rel: "self",
          href: "/facilities/9",
        },
        {
          rel: "monitor-plans",
          href: "facilities/9/monitor-plans",
        },
      ],
    },
  ],
];