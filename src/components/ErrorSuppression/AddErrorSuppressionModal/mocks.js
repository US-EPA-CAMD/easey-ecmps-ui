export const mockParamCheckCatalogResult = {
  id: "5785",
  checkTypeCode: "WSISTAT",
  checkTypeDescription: "Weekly System Integrity Status",
  checkNumber: "4",
  checkResult: "OOC-Test Has Critical Errors",
  locationTypeCode: "LOC",
  timeTypeCode: "HOUR",
  dataTypeCode: "PARAM",
  dataTypeLabel: "Parameter",
  dataTypeUrl: "/master-data-mgmt/es-parameter-codes",
};

export const mockMonplanCheckCatalogResult = {
  id: "3168",
  checkTypeCode: "MONPLAN",
  checkTypeDescription: "Monitoring Plan",
  checkNumber: "4",
  checkResult: "A",
  locationTypeCode: null,
  timeTypeCode: "HISTIND",
  dataTypeCode: "MONPLAN",
  dataTypeLabel: "Monitor Plan",
  dataTypeUrl: "/monitor-plan-mgmt/workspace/configurations",
};

export const mockTestnumCheckCatalogResult = {
  id: "7076",
  checkTypeCode: "LINEAR",
  checkTypeDescription: "Linearity Check",
  checkNumber: "12",
  checkResult: "A",
  locationTypeCode: "LOC",
  timeTypeCode: "DATE",
  dataTypeCode: "TESTNUM",
  dataTypeLabel: "Test Number",
  dataTypeUrl: "/qa-certification-mgmt/workspace/locations/{id}/test-summary",
};

export const configurations = [
  {
    id: "MDC-B70F8B921ADD47D29C2ACEFE8C6282BE",
    name: "1SGA",
    locations: [
      {
        id: "2215",
        name: "1SGA",
        type: "unit",
      },
    ],
  },
];

export const reasonCodes = [
  {
    errorSuppressionReasonCode: "BUG",
    errorSuppressionReasonDescription: "Application Bug",
  },
];

export const facilities = [
  {
    facilityRecordId: 1,
    facilityId: 3,
    facilityName: "Barry",
    stateCode: "AL",
  },
];

export const checkCatalogResult = [
  {
    id: "715",
    checkTypeCode: "LINEAR",
    checkTypeDescription: "Linearity Check",
    checkNumber: "12",
    checkResult: "A",
    locationTypeCode: "LOC",
    timeTypeCode: "DATE",
    dataTypeCode: "PARAM",
    dataTypeLabel: "Test Number",
    dataTypeUrl: "/qa-certification-mgmt/workspace/locations/{id}/test-summary",
  },
];

export const parameterCodes = [
  {
    checkTypeCode: "WSISTAT",
    checkNumber: "4",
    parameterCode: "H2O",
    parameterDescription: "Moisture Percentage (pct)",
  },
];
