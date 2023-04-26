
export const sortByUpdateDate = (a, b) => {
  return new Date(a.updateDate) - new Date(b.updateDate);
};

const quarterToValue = {
  Q1: 1,
  Q2: 2,
  Q3: 3,
  Q4: 4,
};

export const sortByPeriodAbbreviation = (a, b) => {
  const periodAbrA = a.periodAbbreviation.split(" ");
  const periodAbrB = b.periodAbbreviation.split(" ");

  if (parseInt(periodAbrA[0]) > parseInt(periodAbrB[0])) {
    return 1;
  } else if (parseInt(periodAbrA[0]) < parseInt(periodAbrB[0])) {
    return -1;
  } else {
    return quarterToValue[periodAbrA[1]] - quarterToValue[periodAbrB[1]];
  }
};

export const sortByEndDate = (a, b) => {
  if (a.endDate === "N/A") {
    return -1;
  }
  if (b.endDate === "N/A") {
    return 1;
  }
  return new Date(a.endDate) - new Date(b.endDate);
};

export const sortByBeginDate = (a, b) => {
  if (a.beginDate === "N/A") {
    return -1;
  }
  if (b.beginDate === "N/A") {
    return 1;
  }
  return new Date(a.beginDate) - new Date(b.beginDate);
};

export const sortByEventDate = (a, b) => {
  if (a.eventDate === "N/A") {
    return -1;
  }
  if (b.eventDate === "N/A") {
    return 1;
  }

  const splitA = a.eventDate.split(" ");
  const splitB = b.eventDate.split(" ");

  if (new Date(splitA[0]) === new Date(splitB[0])) {
    return parseInt(splitA[1]) - parseInt(splitB[1]);
  } else {
    return new Date(splitA[0]) - new Date(splitB[0]);
  }
};

export const sortByConditionDateHour = (a, b) => {
  if (a.conditionDate === "N/A") {
    return -1;
  }
  if (b.conditionDate === "N/A") {
    return 1;
  }

  const splitA = a.conditionDate.split(" ");
  const splitB = b.conditionDate.split(" ");

  if (new Date(splitA[0]) === new Date(splitB[0])) {
    return parseInt(splitA[1]) - parseInt(splitB[1]);
  } else {
    return new Date(splitA[0]) - new Date(splitB[0]);
  }
};

export const sortByCompletionDateHour = (a, b) => {
  if (a.lastCompletion === "N/A") {
    return -1;
  }
  if (b.lastCompletion === "N/A") {
    return 1;
  }

  const splitA = a.lastCompletion.split(" ");
  const splitB = b.lastCompletion.split(" ");

  if (new Date(splitA[0]) === new Date(splitB[0])) {
    return parseInt(splitA[1]) - parseInt(splitB[1]);
  } else {
    return new Date(splitA[0]) - new Date(splitB[0]);
  }
};

export const formatSubmissionWindow = (window) => {
  if (window === "REQUIRE" || window === "GRANTED") {
    return "Open";
  }

  return "Closed";
};

export const formatTimeStamp = (timeStamp) => {
  const date = new Date(timeStamp);
  return `${date.getFullYear()}-${(date.getMonth()).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')} ${(date.getHours()).toString().padStart(2, '0')}:${(date.getMinutes()).toString().padStart(2, '0')}`
}

export const monPlanColumns = [
  {
    name: "ORIS Code",
    selector: "orisCode",
    sortable: true,
  },
  {
    name: "Facility Name",
    selector: "facilityName",
    sortable: true,
  },
  {
    name: "Configuration",
    selector: "name",
    sortable: true,
  },
  {
    name: "Last Modified By",
    selector: "userId",
    sortable: true,
  },
  {
    name: "Last Modified Date/Time",
    selector: (row) => formatTimeStamp(row.updateDate),
    sortable: true,
    wrap: true
    // sortFunction: sortByUpdateDate,
  },
];

export const qaTestSummaryColumns = [
  {
    name: "ORIS Code",
    selector: "orisCode",
    sortable: true,
  },
  {
    name: "Facility Name",
    selector: "facilityName",
    sortable: true,
  },
  {
    name: "Location Info",
    selector: "locationInfo",
    sortable: true,
  },
  {
    name: "System/ Component ID",
    selector: "systemComponentId",
    sortable: true,
  },
  {
    name: "Test Type",
    selector: "testTypeCode",
    sortable: true,
  },
  {
    name: "Test Number",
    selector: "testNum",
    sortable: true,
    width: "180px",
  },
  {
    name: "Year/Quarter",
    selector: "periodAbbreviation",
    sortFunction: sortByPeriodAbbreviation,
    sortable: true,
  },
  {
    name: "Begin Date/Time",
    selector: "beginDate",
    sortable: true,
    // sortFunction: sortByBeginDate,
    wrap: true
  },
  {
    name: "End Date/Time",
    selector: "endDate",
    sortable: true,
    wrap: true
    // sortFunction: sortByEndDate,
  },
  {
    name: "Last Modified By",
    selector: "userId",
    sortable: true,
  },
  {
    name: "Last Modified Date/Time",
    selector: (row) => formatTimeStamp(row.updateDate),
    sortable: true,
    wrap: true
    // sortFunction: sortByUpdateDate,
  },
];

export const qaCertEventColumns = [
  {
    name: "ORIS Code",
    selector: "orisCode",
    sortable: true,
  },
  {
    name: "Facility Name",
    selector: "facilityName",
    sortable: true,
  },
  {
    name: "Location Info",
    selector: "locationInfo",
    sortable: true,
  },
  {
    name: "System/ Component ID",
    selector: "systemComponentIdentifier",
    sortable: true,
  },
  {
    name: "Event Code",
    selector: "qaCertEventCode",
    sortable: true,
  },
  {
    name: "Event Date/Time",
    selector: "eventDate",
    sortable: true,
    // sortFunction: sortByEventDate,
    wrap: true
  },
  {
    name: "Required Test Code",
    selector: "requiredTestCode",
    sortable: true,
  },
  {
    name: "Conditional Date/Time",
    selector: "conditionDate",
    sortable: true,
    wrap: true
    // sortFunction: sortByConditionDateHour,
  },
  {
    name: "Completion Date/Time",
    selector: "lastCompletion",
    sortable: true,
    wrap: true
    // sortFunction: sortByCompletionDateHour,
  },
  {
    name: "Last Modified By",
    selector: "userid",
    sortable: true,
  },
  {
    name: "Last Modified Date/Time",
    selector: (row) => formatTimeStamp(row.updateDate),
    sortable: true,
    wrap: true
    // sortFunction: sortByUpdateDate,
  },
];

export const qaTeeColumns = [
  {
    name: "ORIS Code",
    selector: "orisCode",
    sortable: true,
  },
  {
    name: "Facility Name",
    selector: "facilityName",
    sortable: true,
  },
  {
    name: "Location Info",
    selector: "locationInfo",
    sortable: true,
  },
  {
    name: "System/ Component ID",
    selector: "systemComponentIdentifier",
    sortable: true,
  },
  {
    name: "Year/Quarter",
    selector: "periodAbbreviation",
    sortFunction: sortByPeriodAbbreviation,
    sortable: true,
  },
  {
    name: "Fuel Code",
    selector: "fuelCd",
    sortable: true,
  },
  {
    name: "Extension/ Exemption Code",
    selector: "extensExemptCode",
    sortable: true,
  },
  {
    name: "Hours Used",
    selector: "hoursUsed",
    sortable: true,
  },
  {
    name: "Span Scale Code",
    selector: "spanScaleCode",
    sortable: true,
  },
  {
    name: "Last Modified By",
    selector: "userid",
    sortable: true,
  },
  {
    name: "Last Modified Date/Time",
    selector: (row) => formatTimeStamp(row.updateDate),
    sortable: true,
    wrap: true
    // sortFunction: sortByUpdateDate,
  },
];

export const emissionsColumns = [
  {
    name: "ORIS Code",
    selector: "orisCode",
    sortable: true,
    maxWidth: "100px",
  },
  {
    name: "Facility Name",
    selector: "facilityName",
    sortable: true,
  },
  {
    name: "Configuration",
    selector: "configuration",
    sortable: true,
  },
  {
    name: "Year/Quarter",
    selector: "periodAbbreviation",
    sortFunction: sortByPeriodAbbreviation,
    sortable: true,
  },
  {
    name: "Last Modified By",
    selector: "userid",
    sortable: true,
  },
  {
    name: "Last Modified Date/Time",
    selector: (row) => formatTimeStamp(row.updateDate),
    sortable: true,
    wrap: true
    // sortFunction: sortByUpdateDate,
  },
  {
    name: "Submission Window",
    selector: (row) => formatSubmissionWindow(row.windowStatus),
    sortable: true,
  },
];
