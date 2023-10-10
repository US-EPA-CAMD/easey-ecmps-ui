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
  return `${date.getFullYear()}-${date
    .getMonth()
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
};

export const monPlanColumns = [
  {
    name: "Eval Status",
    selector: (row) => row.evalStatusCodeDescription,
    sortable: true,
  },
  {
    name: "Submission Status",
    selector: (row) => row.submissionAvailabilityCodeDescription,
    sortable: true,
  },
  {
    name: "ORIS Code",
    selector: (row) => row.orisCode,
    sortable: true,
  },
  {
    name: "Facility Name",
    selector: (row) => row.facilityName,
    sortable: true,
  },
  {
    name: "Configuration",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Last Modified By",
    selector: (row) => row.userId,
    sortable: true,
  },
  {
    name: "Last Modified Date/Time",
    selector: (row) => formatTimeStamp(row.updateDate),
    sortable: true,
    wrap: true,
    // sortFunction: sortByUpdateDate,
  },
];

export const qaTestSummaryColumns = [
  {
    name: "Eval Status",
    selector: (row) => row.evalStatusCodeDescription,
    sortable: true,
  },
  {
    name: "Submission Status",
    selector: (row) => row.submissionCodeDescription,
    sortable: true,
    wrap: true,
  },
  {
    name: "ORIS Code",
    selector: (row) => row.orisCode,
    sortable: true,
  },
  {
    name: "Facility Name",
    selector: (row) => row.facilityName,
    sortable: true,
  },
  {
    name: "Location Info",
    selector: (row) => row.locationInfo,
    sortable: true,
  },
  {
    name: "System/Component ID",
    selector: (row) => row.systemComponentId,
    sortable: true,
  },
  {
    name: "Test Type",
    selector: (row) => row.testTypeCode,
    sortable: true,
  },
  {
    name: "Test Number",
    selector: (row) => row.testNum,
    sortable: true,
  },
  {
    name: "Year/Quarter",
    selector: (row) => row.periodAbbreviation,
    sortFunction: sortByPeriodAbbreviation,
    sortable: true,
  },
  {
    name: "Begin Date/Time",
    selector: (row) => row.beginDate,
    sortable: true,
    // sortFunction: sortByBeginDate,
    wrap: true,
  },
  {
    name: "End Date/Time",
    selector: (row) => row.endDate,
    sortable: true,
    // sortFunction: sortByEndDate,
    wrap: true,
  },
  {
    name: "Last Modified By",
    selector: (row) => row.userId,
    sortable: true,
  },
  {
    name: "Last Modified Date/Time",
    selector: (row) => formatTimeStamp(row.updateDate),
    sortable: true,
    // sortFunction: sortByUpdateDate,
  },
];

export const matsBulkFilesColumns = [
  {
    name: "ORIS Code",
    selector: (row) => row.orisCode,
    sortable: true,
  },
  {
    name: "Facility Name",
    selector: (row) => row.facilityName,
    sortable: true,
  },
  {
    name: "Configuration",
    selector: (row) => row.location,
    sortable: true,
  },
  {
    name: "Test Type Code",
    selector: (row) => row.testTypeCodeDescription,
    sortable: true,
  },
  {
    name: "Test Number",
    selector: (row) => row.testNumber,
    sortable: true,
  },
  {
    name: "File Name",
    selector: (row) => row.filename,
    sortable: true,
  },
  {
    name: "Last Modified By",
    selector: (row) => row.userid,
    sortable: true,
  },
  {
    name: "Last Modified Date/Time",
    selector: (row) => formatTimeStamp(row.addDate),
    sortable: true,
    wrap: true,
    // sortFunction: sortByUpdateDate,
  },
];

export const qaCertEventColumns = [
  {
    name: "Eval Status",
    selector: (row) => row.evalStatusCodeDescription,
    sortable: true,
  },
  {
    name: "Submission Status",
    selector: (row) => row.submissionAvailabilityDescription,
    sortable: true,
    wrap: true,
  },
  {
    name: "ORIS Code",
    selector: (row) => row.orisCode,
    sortable: true,
  },
  {
    name: "Facility Name",
    selector: (row) => row.facilityName,
    sortable: true,
  },
  {
    name: "Location Info",
    selector: (row) => row.locationInfo,
    sortable: true,
  },
  {
    name: "System/Component ID",
    selector: (row) => row.systemComponentIdentifier,
    sortable: true,
  },
  {
    name: "Event Code",
    selector: (row) => row.qaCertEventCode,
    sortable: true,
  },
  {
    name: "Event Date/Time",
    selector: (row) => row.eventDate,
    sortable: true,
    // sortFunction: sortByEventDate,
    wrap: true,
  },
  {
    name: "Required Test Code",
    selector: (row) => row.requiredTestCode,
    sortable: true,
  },
  {
    name: "Conditional Date/Time",
    selector: (row) => row.conditionDate,
    sortable: true,
    wrap: true,
    // sortFunction: sortByConditionDateHour,
  },
  {
    name: "Completion Date/Time",
    selector: (row) => row.lastCompletion,
    sortable: true,
    wrap: true,
    // sortFunction: sortByCompletionDateHour,
  },
  {
    name: "Last Modified By",
    selector: (row) => row.userid,
    sortable: true,
  },
  {
    name: "Last Modified Date/Time",
    selector: (row) => formatTimeStamp(row.updateDate),
    sortable: true,
    wrap: true,
    // sortFunction: sortByUpdateDate,
  },
];

export const qaTeeColumns = [
  {
    name: "Eval Status",
    selector: (row) => row.evalStatusCodeDescription,
    sortable: true,
  },
  {
    name: "Submission Status",
    selector: (row) => row.submissionAvailabilityCodeDescription,
    sortable: true,
    wrap: true,
  },
  {
    name: "ORIS Code",
    selector: (row) => row.orisCode,
    sortable: true,
  },
  {
    name: "Facility Name",
    selector: (row) => row.facilityName,
    sortable: true,
  },
  {
    name: "Location Info",
    selector: (row) => row.locationInfo,
    sortable: true,
  },
  {
    name: "System/Component ID",
    selector: (row) => row.systemComponentIdentifier,
    sortable: true,
  },
  {
    name: "Year/Quarter",
    selector: (row) => row.periodAbbreviation,
    sortFunction: sortByPeriodAbbreviation,
    sortable: true,
  },
  {
    name: "Fuel Code",
    selector: (row) => row.fuelCd,
    sortable: true,
  },
  {
    name: "Extension/ Exemption Code",
    selector: (row) => row.extensExemptCode,
    sortable: true,
  },
  {
    name: "Hours Used",
    selector: (row) => row.hoursUsed,
    sortable: true,
  },
  {
    name: "Span Scale Code",
    selector: (row) => row.spanScaleCode,
    sortable: true,
  },
  {
    name: "Last Modified By",
    selector: (row) => row.userid,
    sortable: true,
  },
  {
    name: "Last Modified Date/Time",
    selector: (row) => formatTimeStamp(row.updateDate),
    sortable: true,
    wrap: true,
    // sortFunction: sortByUpdateDate,
  },
];

export const emissionsColumns = [
  {
    name: "Eval Status",
    selector: (row) => row.evalStatusCodeDescription,
    sortable: true,
  },
  {
    name: "Submission Status",
    selector: (row) => row.submissionAvailabilityCodeDescription,
    sortable: true,
  },
  {
    name: "Submission Window",
    selector: (row) => formatSubmissionWindow(row.windowStatus),
    sortable: true,
  },
  {
    name: "ORIS Code",
    selector: (row) => row.orisCode,
    sortable: true,
  },
  {
    name: "Facility Name",
    selector: (row) => row.facilityName,
    sortable: true,
  },
  {
    name: "Configuration",
    selector: (row) => row.configuration,
    sortable: true,
  },
  {
    name: "Year/Quarter",
    selector: (row) => row.periodAbbreviation,
    sortFunction: sortByPeriodAbbreviation,
    sortable: true,
  },
  {
    name: "Last Modified By",
    selector: (row) => row.userid,
    sortable: true,
  },
  {
    name: "Last Modified Date/Time",
    selector: (row) => formatTimeStamp(row.updateDate),
    sortable: true,
    wrap: true,
    // sortFunction: sortByUpdateDate,
  },
];
