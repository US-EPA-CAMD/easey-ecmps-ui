export const getMockDataTableMatsMdmData = () => {
  return {
    supplementalMATSParameterCode: [
      {
        code: "",
        name: "-- Select a value --"
      },
      {
        code: "HCL",
        name: "Hydrogen Chloride"
      },
      {
        code: "HF",
        name: "Hydrogen Fluoride"
      },
      {
        code: "HG",
        name: "Mercury"
      },
      {
        code: "IM",
        name: "Individual HAP Metals (Including Hg)"
      },
      {
        code: "INHGM",
        name: "Individual non-Hg HAP Metals"
      },
      {
        code: "LU",
        name: "Limited-Use Oil-Fired Unit"
      },
      {
        code: "TM",
        name: "Total HAP Metals (Including Hg)"
      },
      {
        code: "TNHGM",
        name: "Total non-Hg HAP Metals"
      }
    ],
    supplementalMATSMonitoringMethodCode: [
      {
        code: "",
        name: "-- Select a value --"
      },
      {
        code: "CEMS",
        name: "Continuous Emission Monitoring System (Requires Administrative Approval under 40 CFR 63.7(f))"
      },
      {
        code: "LEE",
        name: "Low Emitting EGU for Total HAP metals , including Hg"
      },
      {
        code: "LEST",
        name: "Low Emitting EGU for some of the non-Hg HAP metals and Quarterly Stack Testing for the rest"
      },
      {
        code: "NA",
        name: "No Applicable Method"
      },
      {
        code: "PMCEMS",
        name: "Particulate Matter Continuous Monitoring System"
      },
      {
        code: "PMCPMS",
        name: "Particulate Matter Continuous Parametric Monitoring System"
      },
      {
        code: "PMO",
        name: "Percent Moisture in the Oil (Oil-fired EGUs, only)"
      },
      {
        code: "PMQST",
        name: "Quarterly Stack Testing for Particulate Matter"
      },
      {
        code: "QST",
        name: "Quarterly Stack Testing"
      }
    ],
    prefilteredMatsMethods: [
      {
        code: "",
        name: "-- Select a value --"
      },
      {
        supplementalMATSParameterCode: "HG",
        supplementalMATSMonitoringMethodCode: [
          "LEE"
        ]
      },
      {
        supplementalMATSParameterCode: "HF",
        supplementalMATSMonitoringMethodCode: [
          "LEE",
          "QST",
          "PMO"
        ]
      },
      {
        supplementalMATSParameterCode: "TM",
        supplementalMATSMonitoringMethodCode: [
          "LEE",
          "QST",
          "PMQST",
          "PMCEMS",
          "PMCPMS",
          "CEMS"
        ]
      },
      {
        supplementalMATSParameterCode: "HCL",
        supplementalMATSMonitoringMethodCode: [
          "LEE",
          "QST",
          "PMO"
        ]
      },
      {
        supplementalMATSParameterCode: "TNHGM",
        supplementalMATSMonitoringMethodCode: [
          "LEE",
          "QST",
          "PMQST",
          "PMCEMS",
          "PMCPMS",
          "CEMS"
        ]
      },
      {
        supplementalMATSParameterCode: "IM",
        supplementalMATSMonitoringMethodCode: [
          "LEE",
          "QST",
          "LEST",
          "CEMS"
        ]
      },
      {
        supplementalMATSParameterCode: "INHGM",
        supplementalMATSMonitoringMethodCode: [
          "LEE",
          "QST",
          "LEST",
          "CEMS"
        ]
      },
      {
        supplementalMATSParameterCode: "LU",
        supplementalMATSMonitoringMethodCode: [
          "NA"
        ]
      }
    ]
  }
}

const mockMonitorMatsMethods = [
  {
    id: "MELISSARHO-FD768B60E4D343158F7AD52EFD704D0E",
    supplementalMATSParameterCode: "TNHGM",
    supplementalMATSMonitoringMethodCode: "QST",
    beginDate: "2016-04-16",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: "MELISSARHO-CDF765BC7BF849EE9C23608B95540200",
    supplementalMATSParameterCode: "HG",
    supplementalMATSMonitoringMethodCode: "LEE",
    beginDate: "2016-04-16",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
];

const mockMonitoringMethods = [
  {
    parameterCode: "SO2",
    monitoringMethodCode: "CEM",
    substituteDataCode: "SPTS",
    bypassApproachCode: "BYMAX",
    beginDate: "2007-11-27",
    beginHour: 17,
    endDate: null,
    endHour: null,
    id: "MELISSAMAT-7BA7D94FDB4F4D4A8E1161E4B46150F6",
    locationId: "5770",
    userId: "abcde",
    addDate: "2009-02-20",
    updateDate: "2009-02-20",
    active: true,
  },
  {
    parameterCode: "SO2",
    monitoringMethodCode: "CEM",
    substituteDataCode: "SPTS",
    bypassApproachCode: "BYMAX",
    beginDate: "2007-11-27",
    beginHour: 17,
    endDate: null,
    endHour: null,
    id: "MELISSAMAT-7BA7D94FDB4F4D4A8E1161E4B46150F6",
    locationId: "5770",
    userId: "abcde",
    addDate: "2009-02-20",
    updateDate: "2009-02-20",
    active: true,
  },
]

export const getMockDataTableMatsProps = () => {
  return {
    user: { firstName: "test" },
    checkout: true,
    setRevertedState: jest.fn(),
    locationSelectValue: 'location',
    mdmData: {
      supplementalMATSParameterCode: [
        {
          code: "",
          name: "-- Select a value --",
        },
        {
          code: "HCL",
          name: "Hydrogen Chloride",
        },
        {
          code: "HF",
          name: "Hydrogen Fluoride",
        },
        {
          code: "HG",
          name: "Mercury",
        },
        {
          code: "IM",
          name: "Individual HAP Metals (Including Hg)",
        },
        {
          code: "INHGM",
          name: "Individual non-Hg HAP Metals",
        },
        {
          code: "LU",
          name: "Limited-Use Oil-Fired Unit",
        },
        {
          code: "TM",
          name: "Total HAP Metals (Including Hg)",
        },
        {
          code: "TNHGM",
          name: "Total non-Hg HAP Metals",
        },
      ],
      supplementalMATSMonitoringMethodCode: [
        {
          code: "",
          name: "-- Select a value --",
        },
        {
          code: "CEMS",
          name: "Continuous Emission Monitoring System (Requires Administrative Approval under 40 CFR 63.7(f))",
        },
        {
          code: "LEE",
          name: "Low Emitting EGU for Total HAP metals , including Hg",
        },
        {
          code: "LEST",
          name: "Low Emitting EGU for some of the non-Hg HAP metals and Quarterly Stack Testing for the rest",
        },
        {
          code: "NA",
          name: "No Applicable Method",
        },
        {
          code: "PMCEMS",
          name: "Particulate Matter Continuous Monitoring System",
        },
        {
          code: "PMCPMS",
          name: "Particulate Matter Continuous Parametric Monitoring System",
        },
        {
          code: "PMO",
          name: "Percent Moisture in the Oil (Oil-fired EGUs, only)",
        },
        {
          code: "PMQST",
          name: "Quarterly Stack Testing for Particulate Matter",
        },
        {
          code: "QST",
          name: "Quarterly Stack Testing",
        },
      ],
      prefilteredMatsMethods: [],
    },
    loadDropdownsData: jest.fn(),
    settingInactiveCheckBox: jest.fn(),
    setUpdateRelatedTables: jest.fn(),
    updateRelatedTables: false,
    currentTabIndex: 0,
    tabs: [{ inactive: [{}] }],
  }
}

export const getMockMonitoringMatsMethods = () => {
  return [...mockMonitorMatsMethods]
}

export const getMockMonitoringMethods = () => {
  return [...mockMonitoringMethods]
}