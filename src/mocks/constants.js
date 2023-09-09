const mockReportingPeriodId = 'reportingPeriodId'

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
    id: mockReportingPeriodId,
    calendarYear: 2022,
    quarter: 4,
    beginDate: "2022-10-01",
    endDate: "2022-12-31",
    periodDescription: "2022 Q4",
    periodAbbreviation: "2022 Q4",
    archiveInd: 0,
    selected: false,
  },
  {
    id: 2,
    calendarYear: 2022,
    quarter: 3,
    beginDate: "2022-07-01",
    endDate: "2022-09-31",
    periodDescription: "2022 Q3",
    periodAbbreviation: "2022 Q3",
    archiveInd: 0,
    selected: false,
  },
  {
    id: 3,
    calendarYear: 2022,
    quarter: 2,
    beginDate: "2022-04-01",
    endDate: "2022-06-31",
    periodDescription: "2022 Q2",
    periodAbbreviation: "2022 Q2",
    archiveInd: 0,
    selected: false,
  },
  {
    id: 4,
    calendarYear: 2022,
    quarter: 1,
    beginDate: "2022-01-01",
    endDate: "2022-03-31",
    periodDescription: "2022 Q1",
    periodAbbreviation: "2022 Q1",
    archiveInd: 0,
    selected: false,
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

export const EXPORT_TAB_TEST_EXPORT_STATE = {
  checkedDataTypes: [
    'monitoring-plan'
  ],
  reportingPeriodId: mockReportingPeriodId
}

export const mockExportQa = {
  orisCode: 3776,
  testSummaryData: [
    {
      id: "TWCORNEL5-5438209079BE4E7C83507AFC1D8DA532",
      locationId: "5",
      stackPipeId: "CS0AAN",
      unitId: null,
      testTypeCode: "F2LCHK",
      monitoringSystemId: "AA4",
      componentID: null,
      spanScaleCode: null,
      testNumber: "201904010000AA4",
      testReasonCode: "QA",
      testDescription: null,
      testResultCode: "FEW168H",
      calculatedTestResultCode: "FEW168H",
      beginDate: null,
      beginHour: null,
      beginMinute: null,
      endDate: null,
      endHour: null,
      endMinute: null,
      gracePeriodIndicator: null,
      calculatedGracePeriodIndicator: null,
      year: 2019,
      quarter: 1,
      testComment: null,
      injectionProtocolCode: null,
      calculatedSpanValue: null,
      evalStatusCode: null,
      userId: "bvick",
      addDate: "4/24/2019, 5:27:06 PM",
      updateDate: null,
      reportPeriodId: 105,
      calibrationInjectionData: [],
      linearitySummaryData: [],
    }
  ],
  certificationEventData: [
    {
      id: "TWCORNEL5-5438209079BE4E7C83507AFC1D8DA532",
      locationId: "string",
      lastUpdated: "2023-02-17T20:37:37.814Z",
      updatedStatusFlag: "string",
      needsEvalFlag: "string",
      checkSessionId: "string",
      submissionId: 0,
      submissionAvailabilityCode: "string",
      pendingStatusCode: "string",
      evalStatusCode: "string",
      userId: "string",
      addDate: "string",
      updateDate: "string",
      stackPipeId: "string",
      unitId: "string",
      monitoringSystemID: "string",
      componentID: "string",
      qaCertEventCode: "string",
      qaCertEventDate: "2023-02-17T20:37:37.814Z",
      qaCertEventHour: 0,
      requiredTestCode: "string",
      conditionalBeginDate: "2023-02-17T20:37:37.814Z",
      conditionalBeginHour: 0,
      completionTestDate: "2023-02-17T20:37:37.814Z",
      completionTestHour: 0
    }
  ],
  testExtensionExemptionData: [
    {
      stackPipeId: "string",
      unitId: "string",
      year: 0,
      quarter: 0,
      monitoringSystemID: "string",
      componentID: "string",
      spanScaleCode: "string",
      id: "TWCORNEL5-5438209079BE4E7C83507AFC1D8DA532",
      locationId: "string",
      reportPeriodId: 0,
      checkSessionId: "string",
      submissionId: "string",
      submissionAvailabilityCode: "string",
      pendingStatusCode: "string",
      evalStatusCode: "string",
      userId: "string",
      addDate: "string",
      updateDate: "string",
      hoursUsed: 0,
      fuelCode: "string",
      extensionOrExemptionCode: "string"
    }
  ]
}

export const mockSelectedConfig = {
  id: "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
  facId: 1,
  configTypeCode: null,
  lastUpdated: null,
  updatedStatusFlag: "Y",
  needsEvalFlag: null,
  checkSessionId: null,
  orisCode: 3,
  name: "1, 2, CS0AAN",
  beginReportPeriodId: 92,
  endReportPeriodId: null,
  active: true,
  pendingStatusCode: null,
  evalStatusCode: null,
  unitStackConfigurations: [
    {
      id: "CAMD-18DD175CE7EF4256B78469865D84F576",
      unitId: "1",
      stackPipeId: "CS0AAN",
      unitRecordId: 1,
      stackPipeRecordId: "MDC-CCB8D6D0D4E34D24A99C01DCD14078DF",
      beginDate: "1995-01-01",
      endDate: null,
      userId: "PQA09Q1",
      addDate: "2009-02-20T14:57:04.000Z",
      updateDate: null,
      active: true,
    },
    {
      id: "CAMD-BCB0E6D124C947418397A19FD7B4FB77",
      unitId: "2",
      stackPipeId: "CS0AAN",
      unitRecordId: 2,
      stackPipeRecordId: "MDC-CCB8D6D0D4E34D24A99C01DCD14078DF",
      beginDate: "1995-01-01",
      endDate: null,
      userId: "PQA09Q1",
      addDate: "2009-02-20T14:57:04.000Z",
      updateDate: null,
      active: true,
    },
  ],
  locations: [
    {
      id: "6",
      unitRecordId: 1,
      unitId: "1",
      stackPipeRecordId: null,
      stackPipeId: null,
      name: "1",
      type: "unit",
      active: true,
      activeDate: null,
      retireDate: null,
      nonLoadBasedIndicator: 0,
    },
    {
      id: "7",
      unitRecordId: 2,
      unitId: "2",
      stackPipeRecordId: null,
      stackPipeId: null,
      name: "2",
      type: "unit",
      active: true,
      activeDate: null,
      retireDate: null,
      nonLoadBasedIndicator: 0,
    },
    {
      id: "5",
      unitRecordId: null,
      unitId: null,
      stackPipeRecordId: "MDC-CCB8D6D0D4E34D24A99C01DCD14078DF",
      stackPipeId: "CS0AAN",
      name: "CS0AAN",
      type: "stack",
      active: true,
      activeDate: "1995-01-01",
      retireDate: null,
      nonLoadBasedIndicator: null,
    },
  ],
  userId: "bvick",
  addDate: "2015-10-26T10:49:28.000Z",
  updateDate: "2021-07-26T11:26:00.000Z",
  submissionId: 1441000,
  submissionAvailabilityCode: "UPDATED",
  lastEvaluatedDate: "2022-04-25T13:59:00.000Z",
};

export const mockTestTypeCodes = [
  {
    testTypeCode: "RATA",
    testTypeDescription: "Relative Accuracy Test",
    testTypeGroupCode: "RELACC"
  },
  {
    testTypeCode: "APPE",
    testTypeDescription: "Appendix E NOx Rate Test",
    testTypeGroupCode: "APPESUM"
  },
  {
    testTypeCode: 'DAYCAL',
    testTypeDescription: 'Daily Calibration',
    testTypeGroupCode: null,
  },
]

export const mockTestTypeGroupCodes = [
  {
    testTypeGroupCode: "LINSUM",
    testTypeGroupDescription: "Linearity Summary",
    childDepth: "3"
  },
  {
    testTypeGroupCode: "RELACC",
    testTypeGroupDescription: "Relative Accuracy",
    childDepth: "6"
  },
  {
    testTypeGroupCode: 'PEI',
    testTypeGroupDescription: 'Primary Element Inspection',
    childDepth: '1',
  },
]

export const mockSpanScaleCodes = [
  {
    spanScaleCode: "H",
    spanScaleDescription: "High"
  },
  {
    spanScaleCode: "L",
    spanScaleDescription: "Low"
  }
]

export const mockTestReasonCodes = [
  {
    testReasonCode: "DIAG",
    testReasonDescription: "Diagnostic"
  },
  {
    testReasonCode: "INITIAL",
    testReasonDescription: "Initial Certification"
  },
  {
    testReasonCode: "QA",
    testReasonDescription: "Quality Assurance"
  },
  {
    testReasonCode: "RECERT",
    testReasonDescription: "Recertification"
  }
]

export const mockTestResultCodes = [
  {
    testResultCode: "PASSED",
    testResultDescription: "Test Passed"
  },
  {
    testResultCode: "FAILED",
    testResultDescription: "Test Failed"
  },
]

export const mockCheckedOutLocations = [
  {
    facilityId: 3,
    date: "2019-01-01",
    id: "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
    checkedOutBy: "user"
  }
]

export const mockQATestSummary = [
  {
    id: "TWCORNEL5",
    stackPipeId: null,
    unitId: "1",
    testTypeCode: "FFA",
    monitoringSystemId: null,
    componentId: "AFA",
    spanScaleCode: null,
    testNumber: "20201CEM5F",
    testReasonCode: "QA",
    testDescription: null,
    testResultCode: "PASSED",
    calculatedTestResultCode: "PASSED",
    beginDate: null,
    beginHour: null,
    beginMinute: null,
    endDate: "2020-02-26",
    endHour: 20,
    endMinute: 3,
    gracePeriodIndicator: null,
    calculatedGracePeriodIndicator: null,
    year: null,
    quarter: null,
    testComment: null,
    injectionProtocolCode: null,
    calculatedSpanValue: null,
    evalStatusCode: null,
    userId: "bvick",
    addDate: "2020-04-23",
    updateDate: null,
    reportPeriodId: null,
  },
]

export const mockMonitoringComponents = [
  {
    componentId: "027",
    componentTypeCode: "SO2",
    sampleAcquisitionMethodCode: "DOU",
    basisCode: "W",
    manufacturer: "TECO",
    modelVersion: "43I",
    serialNumber: "631819420",
    hgConverterIndicator: 1,
    id: "CAMD-646D15E327E1480D814D48286DA7F073",
    locationId: "5770",
    userId: "abcde",
    addDate: "2009-02-20",
    updateDate: "2009-02-20",
    analyzerRanges: [
      {
        analyzerRangeCode: "A",
        dualRangeIndicator: 1,
        beginDate: "2008-05-17",
        beginHour: 14,
        endDate: null,
        endHour: null
      }
    ]
  }
]

export const mockMonitoringSystems = [
  {
    monitoringSystemId: "C42",
    systemTypeCode: "FLOW",
    systemDesignationCode: "P",
    fuelCode: "NFS",
    beginDate: "2007-11-28",
    endDate: null,
    beginHour: 17,
    endHour: null,
    id: "CAMD-4B0DC37051224A7AA9D8CA1E5BE6B4D4",
    locationId: "5770",
    userId: "abcde",
    addDate: "2009-02-20",
    updateDate: "2009-02-20",
    active: true,
    components: [
      {
        componentId: "027",
        componentTypeCode: "SO2",
        sampleAcquisitionMethodCode: "DOU",
        basisCode: "W",
        manufacturer: "TECO",
        modelVersion: "43I",
        serialNumber: "631819420",
        hgConverterIndicator: 1,
        beginDate: "2008-12-31",
        beginHour: 23,
        endDate: null,
        endHour: null
      }
    ],
    fuelFlows: [
      {
        maximumFuelFlowRate: 30667,
        systemFuelFlowUOMCode: "HSCF",
        maximumFuelFlowRateSourceCode: "URV",
        beginDate: "2010-08-01",
        beginHour: 12,
        endDate: null,
        endHour: null
      }
    ]
  }
]
export const mockReportData = {
  title: "string",
  facilityId: "number",
  orisCode: "number",
  facilityName: "string",
  stateCode: "string",
  countyName: "string",
  unitStackInfo: "string",
  templateCode: "DTLRPT",
  noResultsMessage: "string",
  displayName:"Monitoring Plan Evaluation Report",
  columns: [
    {
        "code": "EVAL",
        "values": [
            {
                "name": "unitStack",
                "displayName": "Unit/Stack"
            },
            {
                "name": "severityCode",
                "displayName": "Severity"
            },
            {
                "name": "categoryDescription",
                "displayName": "Category"
            },
            {
                "name": "checkCode",
                "displayName": "Check Code"
            },
            {
                "name": "resultMessage",
                "displayName": "Result Message"
            }
        ]
    }
],
  // details: [
  //   {
  //     position: "number",
  //     title: "string",
  //     sqlStatement: "string",
  //     noResultsMessage: "string",
  //     columns: [
  //       {
  //         position: "number",
  //         name: "string",
  //         displayName: "string",
  //       },
  //     ],
  //     parameters: [
  //       {
  //         position: "number",
  //         name: "string",
  //         defaultValue: "any",
  //       },
  //     ],
  //     results: [],
  //   },
  // ],
  "details": [
    {
        "displayName": "Evaluation Results",
        "templateCode": "EVAL",
        "templateType": "DEFAULT",
        "results": [
            {
                "unitStack": "5",
                "severityCode": "NONE",
                "categoryDescription": "Unit Program Parameter Evaluation",
                "checkCode": "PROGRAM-11-D",
                "resultMessage": "Although Unit ID 5 is a ARP affected unit, monitoring method(s) for OP have not been reported for the unit, for a common stack or pipe linked to the unit, or for all multiple stacks or pipes linked to the unit for the entire evaluation period.  If you believe that this error is incorrect, and has been caused by an inaccurate date in the Unit Program record, please contact ECMPS Support at ecmps-support@camdsupport.com."
            }
        ]
    }
],
};
