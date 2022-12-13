import { formatDate } from "../../../utils/functions";

export const sortByUpdateDate = (a, b) => {
  return new Date(a.updateDate) - new Date(b.updateDate);
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

export const formatSubmissionWindow = (window) => {
  if (window === "REQUIRE" || window === "GRANTED") {
    return "Open";
  }

  return "Closed";
};

export const monPlanColumns = [
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
    selector: "name",
    sortable: true,
  },
  {
    name: "Last Modified By",
    selector: "userId",
    sortable: true,
  },
  {
    name: "Last Modified Date",
    selector: (row) => formatDate(row.updateDate),
    sortable: true,
    sortFunction: sortByUpdateDate,
  },
  {
    name: "Eval Status",
    selector: "evalStatusCode",
    sortable: true,
  },
  {
    name: "Submission Status",
    selector: "submissionAvailabilityCode",
    sortable: true,
  },
];

export const qaTestSummaryColumns = [
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
    name: "Location Info",
    selector: "locationInfo",
    sortable: true,
  },
  {
    name: "System / Component ID",
    selector: "testInfo",
    sortable: true,
    width: "400px",
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
    width: "200px",
  },
  {
    name: "Begin Date/Hr/Min",
    selector: "beginDate",
    sortable: true,
    sortFunction: sortByBeginDate,
  },
  {
    name: "End Date/Hr/Min",
    selector: "endDate",
    sortable: true,
    sortFunction: sortByEndDate,
  },
  {
    name: "Last Modified By",
    selector: "userId",
    sortable: true,
  },
  {
    name: "Last Modified Date",
    selector: (row) => formatDate(row.updateDate),
    sortable: true,
    sortFunction: sortByUpdateDate,
  },
  {
    name: "Eval Status",
    selector: "evalStatusCode",
    sortable: true,
  },
  {
    name: "Submission Status",
    selector: "submissionCode",
    sortable: true,
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
    name: "Year / Quarter",
    selector: "periodAbbreviation",
    sortable: true,
  },
  {
    name: "Last Modified By",
    selector: "userid",
    sortable: true,
  },
  {
    name: "Last Modified Date",
    selector: (row) => formatDate(row.updateDate),
    sortable: true,
    sortFunction: sortByUpdateDate,
  },
  {
    name: "Eval Status",
    selector: "evalStatusCode",
    sortable: true,
  },
  {
    name: "Submission Status",
    selector: "submissionAvailabilityCode",
    sortable: true,
  },
  {
    name: "Submission Window",
    selector: (row) => formatSubmissionWindow(row.windowStatus),
    sortable: true,
  },
];
