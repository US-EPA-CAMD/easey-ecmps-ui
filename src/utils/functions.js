import { at, isNumber } from "lodash";
import React from "react";

import config from "../config";
import {
  getQACertEventReviewSubmit,
  getQATeeReviewSubmit,
  getQATestSummaryReviewSubmit,
} from "./api/qaCertificationsAPI";
import { getMonitoringPlans } from "./api/monitoringPlansApi";
import { getEmissionsReviewSubmit } from "./api/emissionsApi";
import log from "loglevel";
import { displayAppError } from "../additional-functions/app-error";

export const getUser = () => {
  const ecmpsUser = localStorage.getItem("ecmps_user")
    ? JSON.parse(localStorage.getItem("ecmps_user"))
    : null;

  return ecmpsUser && ecmpsUser.firstName ? ecmpsUser : null;
};

export const dateToEstString = (value) => {
  let date = new Date();

  if (value) {
    if (typeof value !== typeof Date) {
      date = new Date(value);
    }
  }

  return date.toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
};

export const currentDateTime = () => {
  return new Date(dateToEstString(new Date()));
};

export const formatDate = (dateString, delim = "-") => {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const fullDateString = `${month}${delim}${day}${delim}${year}`;
  return fullDateString;
};

// Returns date in yyyy-mm-dd
export const formatDateToISO = (date) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const getReportingPeriods = (minYear = 2009) => {
  const quarters = [4, 3, 2, 1];
  const maxYear = new Date().getFullYear();
  const reportingPeriods = [];

  const currentYearQuarter = parseInt(`${maxYear}${getQuarter()}`);

  for (let year = maxYear; year >= minYear; year--) {
    for (const quarter of quarters) {
      if (parseInt(`${year}${quarter}`) <= currentYearQuarter)
        reportingPeriods.push(`${year} Q${quarter}`);
    }
  }

  return reportingPeriods;
};

/**
 * Sorts reporting periods in descending chronological order (most recent first)
 * @param {Array} reportingPeriods - Array of reporting period objects with calendarYear and quarter properties
 * @returns {Array} Sorted array of reporting periods
 */
export const sortReportingPeriodsDescending = (reportingPeriods) => {
  if (!Array.isArray(reportingPeriods) || reportingPeriods.length === 0) {
    return reportingPeriods;
  }

  return [...reportingPeriods].sort((a, b) => {
    // Sort by year descending first
    if (a.calendarYear !== b.calendarYear) {
      return b.calendarYear - a.calendarYear;
    }
    // If years are equal, sort by quarter descending
    return b.quarter - a.quarter;
  });
};

//** review and submit utility functions
export const isLocationUserCheckedOut = (
  checkedOutLocationsMap,
  monPlanId,
  userId
) => {
  if (checkedOutLocationsMap.get(monPlanId)?.checkedOutBy === userId) {
    return true;
  }
  return false;
};

export const updateCheckedOutLocationsOnTable = (
  tableRef,
  updateState,
  checkedOutLocationsMPIdsMap,
  userId
) => {
  let changeInCheckedOutLocations = 0;
  tableRef.current.forEach((tableRow) => {
    const isLocationCheckedOut = checkedOutLocationsMPIdsMap.has(
      tableRow.monPlanId
    );
    if (tableRow.checkedOut !== isLocationCheckedOut) {
      changeInCheckedOutLocations += 1;
    }
    tableRow.checkedOut = isLocationCheckedOut;
    if (isLocationCheckedOut) {
      tableRow.userCheckedOut = isLocationUserCheckedOut(
        checkedOutLocationsMPIdsMap,
        tableRow.monPlanId,
        userId
      );
    }
    if (!isLocationUserCheckedOut) {
      tableRow.userCheckedOut = false;
    }
    if (isLocationCheckedOut && !tableRow.userCheckedOut) {
      tableRow.selected = false;
    }
  });
  if (changeInCheckedOutLocations) {
    updateState([...tableRef.current]);
  }
};

export const evalStatusStyle = (status, severityCode) => {
  switch (status) {
    case "ERR":
    case "EVAL":
      return "usa-alert--warning";
    case "INFO":
      if(['CRIT1','CRIT2','CRIT3','FATAL'].includes(severityCode))
        return "usa-alert--warning";
      else
        return "usa-alert--success";
    case "PASS":
      return "usa-alert--success";
    case "INQ":
    case "WIP":
      return "usa-alert--info";
    default:
      break;
  }
  return "";
};

export const alertStyle = (evalStatus, severityCode ) =>
  `usa-alert usa-alert--slim usa-alert--no-icon ${evalStatusStyle(evalStatus, severityCode )}`;

export const reportWindowParams = [
  // eslint-disable-next-line no-restricted-globals
  `height=${screen.height}`,
  // eslint-disable-next-line no-restricted-globals
  `width=${screen.width}`,
  //`fullscreen=yes`,
].join(",");

export const formatReportUrl = (params, service) => {
  const urlParams = params.map(([key, value]) => {
    return `${key}=${[value]}`;
  });

  const basePath = config.app.path.replace(/\/$/, '');
  const url = `/${service}?${urlParams.join("&")}`;

  if (window.location.href.includes("/workspace")) {
    return url.replace(`/${service}`, `${basePath}/workspace/${service}`);
  }

  return `${basePath}${url}`;
};

export const displayReport = (params) => {
  const basePath = config.app.path.replace(/\/$/, '');
  const url = `${basePath}/workspace/reports?reportCode=MP_EVAL&facilityId=${params.facilityId}&monitorPlanId=${params.monitorPlanId}`;
  window.open(url, "Monitoring Plan Evaluation Report", reportWindowParams); //eslint-disable-next-line react-hooks/exhaustive-deps
};

export const displayEmissionsReport = (
  orisCode,
  mpId,
  year,
  quarter,
  dateHr
) => {
  const basePath = config.app.path.replace(/\/$/, '');
  const ws = window.location.href.includes("/workspace") ? "/workspace" : "";

  const url = `${basePath}${ws}/reports?reportCode=EM_ERR&facilityId=${orisCode}&monitorPlanId=${mpId}&year=${year}&quarter=${quarter}&date=${formatDateToISO(
    dateHr
  )}&hour=${new Date(dateHr).getHours()}`;
  window.open(url, "Emissions Evaluation Report", reportWindowParams); //eslint-disable-next-line react-hooks/exhaustive-deps
};

export const evalStatusesWithLinks = new Set(["PASS"]);
export const otherStatusesWithLinks = new Set(["INFO","ERR"]);
export const addEvalStatusCell = (columns, callback) =>
  columns.map((col) => {
    if (col.name === "Eval Status") {
      col.cell = (row) => (
        <div className={alertStyle(row.evalStatusCode, row?.severityCode)}>
          {evalStatusesWithLinks.has(row.evalStatusCode) ? (
            <button
              className={"hyperlink-btn cursor-pointer"}
              aria-label="open evaluation report in a new tab"
              onClick={() => {
                callback(row, false);
              }}
            >
              {row.evalStatusCodeDescription}
            </button>
          ) : otherStatusesWithLinks.has(row.evalStatusCode) && row?.severityDescription  ? (
            <button
              className={"hyperlink-btn cursor-pointer"}
              aria-label="open evaluation report in a new tab"
              onClick={() => {
                callback(row, false);
              }}
            >
              {row.severityDescription}
            </button>
          ) : otherStatusesWithLinks.has(row.evalStatusCode) ? ( // if no chk session is present
            <button
              className={"hyperlink-btn cursor-pointer"}
              aria-label="open evaluation report in a new tab"
              onClick={() => {
                callback(row, false);
              }}
            >
              {row.evalStatusCodeDescription}
            </button>
          ) : (
            <button className={"unstyled-btn"}>
              {row.evalStatusCodeDescription}
            </button>
          )}
        </div>
      );
    }
    return col;
  });

export const isoToYearQuarter = (dateString) => {
  if (!dateString) return;
  const date = new Date(dateString);

  const year = date.getUTCFullYear();
  const quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

  return `${year} Q${quarter}`;
};

export const getIdentfierAndIds = (type, id) => {
  let ids, identifier;
  switch (type) {
    case "teeId":
      ids = [];
      identifier = "testExtensionExemptionIdentifier";
      break;
    case "testId":
      ids = [];
      identifier = "testSumId";
      break;
    case "qceId":
      ids = [];
      identifier = "qaCertEventIdentifier";
      break;
    case "emissions":
      ids = [id];
      identifier = "monPlanId";
      break;
    default:
      ids = [id];
      identifier = null;
  }
  return { ids, identifier };
};

const getYearQuarter = (type, paramsArray) => {
  if (type === "emissions") {
    return [paramsArray.find((el) => el[0] === "yearQuarter")[1]];
  }
  const yearQuarter = paramsArray.length > 3 && paramsArray[3][1];
  let yearQuarterVal;
  switch (type) {
    case "teeId":
      yearQuarterVal = [yearQuarter];
      break;
    case "testId":
      yearQuarterVal = [yearQuarter];
      break;
    case "qceId":
      yearQuarterVal = [yearQuarter];
      break;
    case "emissions":
      yearQuarterVal = [yearQuarter];
      break;
    default:
      yearQuarterVal = null;
  }
  return yearQuarterVal;
};
const tableRowApi = {
  teeId: getQATeeReviewSubmit,
  monitorPlanId: getMonitoringPlans,
  qceId: getQACertEventReviewSubmit,
  testId: getQATestSummaryReviewSubmit,
  emissions: getEmissionsReviewSubmit,
};
export const getEvalStatus = async (paramsArray) => {
  const orisCode = paramsArray[1][1],
    isEmissions = paramsArray[0][1] === "EM_EVAL",
    id = paramsArray[2][1],
    type = isEmissions ? "emissions" : paramsArray[2][0];
  if(!tableRowApi.hasOwnProperty(type) || typeof tableRowApi[type] !== 'function')
  {
    return;
  }
  const api = tableRowApi[type];
  if (!api) return;
  const { ids, identifier } = getIdentfierAndIds(type, id);
  const response = await api(
    [orisCode],
    ids,
    getYearQuarter(type, paramsArray)
  );

  let dataList = response.data?.items ?? response.data;

  const items = dataList.filter((el) => el[identifier] === id);
  if (!dataList.length) return;
  if (identifier) return items[0].evalStatusCode;
  return dataList[0]?.evalStatusCode;
};

export const getEvalResultMessage = (reportData, paramsObject, evalStatus) => {
  if (!evalStatus) return;

  const reportCode = paramsObject.current[0][1];
  let message;
  if (reportCode.includes("EVAL")) {
    const isPassing = evalStatus === "PASS";
    if (isPassing) {
      message = "Evaluation has passed without errors";
    } else if (reportData.details.length < 2) {
      message =
        "Evaluation is old or expired and error data is no longer available";
    }
    return message;
  }
};

export const getYearQuarterParams = (row) => {
  const evaluatedDate = isoToYearQuarter(row.lastEvaluatedDate);
  const abbreviation = row.periodAbbreviation;

  if (evaluatedDate) {
    return `&yearQuarter=${evaluatedDate}`;
  } else if (abbreviation) {
    return `&yearQuarter=${abbreviation}`;
  } else {
    return "";
  }
};

// Returns the previously fully submitted quarter (reporting period).
// For the first month of every quarter, the previusly submitted reporting period is actually two quarters ago.
// For every month in between it is the previous quarter.
// The following function implements this logic
export const getPreviouslyFullSubmitedQuarter = (dateString = null) => {
  // WARNING - be weary of the date string and the wonkiness of JS dates.
  // If you pass in a date that is in format yyyy-mm-dd, javascript creates it in the previous day. For example,
  // new Date('2020-01-01') is created as '2019-12-31 11:59PM'. However, a date string of dd/mm/yyyy creates
  // the date object as expected

  let date;

  if (date === null) date = new Date();
  else date = new Date(dateString);

  const month = date.getMonth();
  let previouslyCompletedQuarter = "";
  let year = date.getFullYear();

  if (month >= 1 && month <= 3) {
    year = date.getFullYear() - 1;
    previouslyCompletedQuarter = "Q4";
  } else if (month >= 4 && month <= 6) previouslyCompletedQuarter = "Q1";
  else if (month >= 7 && month <= 9) previouslyCompletedQuarter = "Q2";
  else if (month >= 10 && month <= 11) previouslyCompletedQuarter = "Q3";
  else {
    // if month === 0 aka january
    previouslyCompletedQuarter = "Q3";
    year = date.getFullYear() - 1;
  }

  return `${year} ${previouslyCompletedQuarter}`;
};

/**
 * January 1st - March 31st  = First Quarter
 * April 1st - June 30th = Second Quarter
 * July 1st - September 30th = Third Quarter
 * October 1st - December 31st = Fourth Quarter
 */
export const getQuarter = (date = new Date(), inUtc = false) => {
  return inUtc
    ? Math.floor(date.getUTCMonth() / 3 + 1)
    : Math.floor(date.getMonth() / 3 + 1);
};

//resets focus to top of page on refresh
export const resetTabOrder = (history) => {
  if (history?.action === "POP") {
    const skipNav = document.getElementById("skipNav");
    if (skipNav) {
      skipNav.tabIndex = 0;
      skipNav.focus({ preventScroll: true });
      skipNav.tabIndex = -1;
      document.activeElement.blur();
    }
  }
};

export const validateDate = (date, hourMins) => {
  if (date) {
    return date.toString();
  } else if (hourMins || hourMins === 0) {
    return String(hourMins).padStart(2, "0");
  }
  return "";
};

export const formatDateTime = (date, hour, mins) => {
  if (date) {
    if (mins || mins === 0) {
      return `${validateDate(date, null)} ${validateDate(
        null,
        hour
      )}:${validateDate(null, mins)}`;
    } else {
      return `${validateDate(date, null)} ${validateDate(null, hour)}:00`;
    }
  } else {
    return "";
  }
};

export const formatTimeStamp = (timeStamp) => {
  if (!timeStamp) {
    return;
  }
  const date = new Date(timeStamp);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
};

/**
 * Formats errored response into list of strings
 * @param {*} errorResp
 * @returns
 */
export const formatErrorResponse = (errorResp) => {
  let errorMsgs = errorResp;
  try {
    errorMsgs = JSON.parse(errorResp);
  } catch (err) {
    if (errorResp.includes('\n')) {
      errorMsgs = errorMsgs
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    }
  }
  return Array.isArray(errorMsgs) ? errorMsgs : errorMsgs?.split("\n").filter(Boolean) ?? [];
};

// Returns the amount of seconds until the users front-end session expires
export const currentSecondsTilInactive = () => {
  return (
    (new Date(localStorage.getItem("ecmps_session_expiration")) -
      currentDateTime()) /
    1000
  );
};

export const parseBool = (str) => {
  if (isNumber(str)) {
    return str > 0;
  } else {
    return String(str).toLocaleLowerCase() == "true";
  }
};

export const exportToCSV = (data, columnMapping, fileNamePrefix, formatMatchTimeCriteriaCell) => {
  try {

    const headers = Object.keys(columnMapping);
    const csvHeaders = headers.map(key => columnMapping[key]);

    // Convert data to CSV format
    const csvRows = data.map(row =>
      headers.map(header => {
        let value = row[header];

        if (header === "active") {
          value = value ? "Active" : "Inactive";
        }

        if (header === "matchTimeTypeCode" && formatMatchTimeCriteriaCell) {
          value = formatMatchTimeCriteriaCell(row);
        }

        return value !== null && value !== undefined ? `"${value}"` : '""';
      }).join(',')
    );

    // Combine headers and data rows
    const csvString = [csvHeaders.join(','), ...csvRows].join('\n');

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Assemble file name
    let fileName = `${fileNamePrefix}_${new Date().toISOString().slice(0, 19)}.csv`;

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    displayAppError("Generate CSV file failed, please try it again!");
    log.log("generate csv file failed", error);
  }
};

export const canSubmitMats = (user, selectedConfig, checkedOutConfigs) => {
  const selectedConfigId = selectedConfig?.id;
  const selectedFacilityId = selectedConfig?.facId;
  const isCheckedOutByUser =
    checkedOutConfigs.find((config) => config["monPlanId"] === selectedConfigId)
      ?.checkedOutBy === user.userId;
  const acceptedRoles = at(config.app, [
    "sponsorRole",
    "submitterRole",
    "initialAuthorizerRole",
  ]);
  const hasRequiredRole = user.roles?.some((role) =>
    acceptedRoles.includes(role),
  );
  const hasRequiredFacilityPermission = user.facilities
    ?.find((facility) => facility.facId === selectedFacilityId)
    ?.permissions.includes("DSQA");


  return isCheckedOutByUser && hasRequiredRole && hasRequiredFacilityPermission;
}
