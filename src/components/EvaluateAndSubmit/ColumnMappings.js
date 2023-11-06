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
  return `${date.getFullYear()}-${(date
    .getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
};

// Eval Status cannot be wrapped in jsx as this will cause the cell to lose the Alert-like look.
export const monPlanColumns = [
  {
    name: "Eval Status",
    selector: (row) => row.evalStatusCodeDescription,
    sortable: true,
  },
  {
    name: <span>{"Submission Status"}</span>,
    selector: (row) => row.submissionAvailabilityCodeDescription,
    sortable: true,
  },
  {
    name: <span>{"ORIS Code"}</span>,
    selector: (row) => row.orisCode,
    sortable: true,
  },
  {
    name: <span>{"Facility Name"}</span>,
    selector: (row) => row.facilityName,
    sortable: true,
  },
  {
    name: <span>{"Configuration"}</span>,
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: <span>{"Last Modified By"}</span>,
    selector: (row) => row.userId,
    sortable: true,
  },
  {
    name: <span>{"Last Modified Date/Time"}</span>,
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
    name: <span>{"Submission Status"}</span>,
    selector: (row) => row.submissionCodeDescription,
    sortable: true,
    wrap: true,
  },
  {
    name: <span>{"ORIS Code"}</span>,
    selector: (row) => row.orisCode,
    sortable: true,
  },
  {
    name: <span>{"Facility Name"}</span>,
    selector: (row) => row.facilityName,
    sortable: true,
  },
  {
    name: <span>{"Location Info"}</span>,
    selector: (row) => row.locationInfo,
    sortable: true,
  },
  {
    name: <span>{"System/Component ID"}</span>,
    selector: (row) => row.systemComponentId,
    sortable: true,
  },
  {
    name: <span>{"Test Type"}</span>,
    selector: (row) => row.testTypeCode,
    sortable: true,
  },
  {
    name: <span>{"Test Number"}</span>,
    selector: (row) => row.testNum,
    sortable: true,
  },
  {
    name: <span>{"Year/Quarter"}</span>,
    selector: (row) => row.periodAbbreviation,
    sortFunction: sortByPeriodAbbreviation,
    sortable: true,
  },
  {
    name: <span>{"Begin Date/Time"}</span>,
    selector: (row) => row.beginDate,
    sortable: true,
    // sortFunction: sortByBeginDate,
    wrap: true,
  },
  {
    name: <span>{"End Date/Time"}</span>,
    selector: (row) => row.endDate,
    sortable: true,
    // sortFunction: sortByEndDate,
    wrap: true,
  },
  {
    name: <span>{"Last Modified By"}</span>,
    selector: (row) => row.userId,
    sortable: true,
  },
  {
    name: <span>{"Last Modified Date/Time"}</span>,
    selector: (row) => formatTimeStamp(row.updateDate),
    sortable: true,
    // sortFunction: sortByUpdateDate,
  },
];

export const matsBulkFilesColumns = [
  {
    name: <span>{"ORIS Code"}</span>,
    selector: (row) => row.orisCode,
    sortable: true,
  },
  {
    name: <span>{"Facility Name"}</span>,
    selector: (row) => row.facilityName,
    sortable: true,
  },
  {
    name: <span>{"Configuration"}</span>,
    selector: (row) => row.location,
    sortable: true,
  },
  {
    name: <span>{"Test Type Code"}</span>,
    selector: (row) => row.testTypeCodeDescription,
    sortable: true,
  },
  {
    name: <span>{"Test Number"}</span>,
    selector: (row) => row.testNumber,
    sortable: true,
  },
  {
    name: <span>{"File Name"}</span>,
    selector: (row) => row.filename,
    sortable: true,
  },
  {
    name: <span>{"Last Modified By"}</span>,
    selector: (row) => row.userid,
    sortable: true,
  },
  {
    name: <span>{"Last Modified Date/Time"}</span>,
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
    name: <span>{"Submission Status"}</span>,
    selector: (row) => row.submissionAvailabilityDescription,
    sortable: true,
    wrap: true,
  },
  {
    name: <span>{"ORIS Code"}</span>,
    selector: (row) => row.orisCode,
    sortable: true,
  },
  {
    name: <span>{"Facility Name"}</span>,
    selector: (row) => row.facilityName,
    sortable: true,
  },
  {
    name: <span>{"Location Info"}</span>,
    selector: (row) => row.locationInfo,
    sortable: true,
  },
  {
    name: <span>{"System/Component ID"}</span>,
    selector: (row) => row.systemComponentIdentifier,
    sortable: true,
  },
  {
    name: <span>{"Event Code"}</span>,
    selector: (row) => row.qaCertEventCode,
    sortable: true,
  },
  {
    name: <span>{"Event Date/Time"}</span>,
    selector: (row) => row.eventDate,
    sortable: true,
    // sortFunction: sortByEventDate,
    wrap: true,
  },
  {
    name: <span>{"Required Test Code"}</span>,
    selector: (row) => row.requiredTestCode,
    sortable: true,
  },
  {
    name: <span>{"Conditional Date/Time"}</span>,
    selector: (row) => row.conditionDate,
    sortable: true,
    wrap: true,
    // sortFunction: sortByConditionDateHour,
  },
  {
    name: <span>{"Completion Date/Time"}</span>,
    selector: (row) => row.lastCompletion,
    sortable: true,
    wrap: true,
    // sortFunction: sortByCompletionDateHour,
  },
  {
    name: <span>{"Last Modified By"}</span>,
    selector: (row) => row.userid,
    sortable: true,
  },
  {
    name: <span>{"Last Modified Date/Time"}</span>,
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
    name: <span>{"Submission Status"}</span>,
    selector: (row) => row.submissionAvailabilityCodeDescription,
    sortable: true,
    wrap: true,
  },
  {
    name: <span>{"ORIS Code"}</span>,
    selector: (row) => row.orisCode,
    sortable: true,
  },
  {
    name: <span>{"Facility Name"}</span>,
    selector: (row) => row.facilityName,
    sortable: true,
  },
  {
    name: <span>{"Location Info"}</span>,
    selector: (row) => row.locationInfo,
    sortable: true,
  },
  {
    name: <span>{"System/Component ID"}</span>,
    selector: (row) => row.systemComponentIdentifier,
    sortable: true,
  },
  {
    name: <span>{"Year/Quarter"}</span>,
    selector: (row) => row.periodAbbreviation,
    sortFunction: sortByPeriodAbbreviation,
    sortable: true,
  },
  {
    name: <span>{"Fuel Code"}</span>,
    selector: (row) => row.fuelCd,
    sortable: true,
  },
  {
    name: <span>{"Extension/ Exemption Code"}</span>,
    selector: (row) => row.extensExemptCode,
    sortable: true,
  },
  {
    name: <span>{"Hours Used"}</span>,
    selector: (row) => row.hoursUsed,
    sortable: true,
  },
  {
    name: <span>{"Span Scale Code"}</span>,
    selector: (row) => row.spanScaleCode,
    sortable: true,
  },
  {
    name: <span>{"Last Modified By"}</span>,
    selector: (row) => row.userid,
    sortable: true,
  },
  {
    name: <span>{"Last Modified Date/Time"}</span>,
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
    name: <span>{"Submission Status"}</span>,
    selector: (row) => row.submissionAvailabilityCodeDescription,
    sortable: true,
  },
  {
    name: <span>{"Submission Window"}</span>,
    selector: (row) => formatSubmissionWindow(row.windowStatus),
    sortable: true,
  },
  {
    name: <span>{"ORIS Code"}</span>,
    selector: (row) => row.orisCode,
    sortable: true,
  },
  {
    name: <span>{"Facility Name"}</span>,
    selector: (row) => row.facilityName,
    sortable: true,
  },
  {
    name: <span>{"Configuration"}</span>,
    selector: (row) => row.configuration,
    sortable: true,
  },
  {
    name: <span>{"Year/Quarter"}</span>,
    selector: (row) => row.periodAbbreviation,
    sortFunction: sortByPeriodAbbreviation,
    sortable: true,
  },
  {
    name: <span>{"Last Modified By"}</span>,
    selector: (row) => row.userid,
    sortable: true,
  },
  {
    name: <span>{"Last Modified Date/Time"}</span>,
    selector: (row) => formatTimeStamp(row.updateDate),
    sortable: true,
    wrap: true,
    // sortFunction: sortByUpdateDate,
  },
];
