import React from "react";
import {
  getQACertEventReviewSubmit,
  getQATeeReviewSubmit,
  getQATestSummaryReviewSubmit,
} from "./api/qaCertificationsAPI";
import { getMonitoringPlans } from "./api/monitoringPlansApi";
import { getEmissionsReviewSubmit } from "./api/emissionsApi";

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
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
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

export const evalStatusStyle = (status) => {
  switch (status) {
    case "ERR":
    case "EVAL":
      return "usa-alert--warning";
    case "INFO":
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

export const alertStyle = (evalStatus) =>
  `usa-alert usa-alert--slim usa-alert--no-icon ${evalStatusStyle(evalStatus)}`;

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

  const url = `/${service}?${urlParams.join("&")}`;

  if (window.location.href.includes("/workspace")) {
    return url.replace(`/${service}`, `/workspace/${service}`);
  }

  return url;
};

export const displayReport = (params) => {
  const url = `/workspace/reports?reportCode=MP_EVAL&facilityId=${params.facilityId}&monitorPlanId=${params.monitorPlanId}`;
  window.open(url, "Monitoring Plan Evaluation Report", reportWindowParams); //eslint-disable-next-line react-hooks/exhaustive-deps
};

export const displayEmissionsReport = (
  orisCode,
  mpId,
  year,
  quarter,
  dateHr
) => {
  const ws = window.location.href.includes("/workspace") ? "/workspace" : "";

  const url = `${ws}/reports?reportCode=EM_ERR&facilityId=${orisCode}&monitorPlanId=${mpId}&year=${year}&quarter=${quarter}&date=${formatDateToISO(
    dateHr
  )}&hour=${new Date(dateHr).getHours()}`;
  window.open(url, "Emissions Evaluation Report", reportWindowParams); //eslint-disable-next-line react-hooks/exhaustive-deps
};

export const evalStatusesWithLinks = new Set(["PASS", "INFO", "ERR"]);
export const addEvalStatusCell = (columns, callback) =>
  columns.map((col) => {
    if (col.name === "Eval Status") {
      col.cell = (row) => (
        <div className={alertStyle(row.evalStatusCode)}>
          {evalStatusesWithLinks.has(row.evalStatusCode) ? (
            <button
              className={"hyperlink-btn cursor-pointer"}
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
    type = isEmissions ? "emissions" : paramsArray[2][0],
    api = tableRowApi[type];
  if (!api) return;
  const { ids, identifier } = getIdentfierAndIds(type, id);
  const response = await api(
    [orisCode],
    ids,
    getYearQuarter(type, paramsArray)
  );
  const items = response?.data.filter((el) => el[identifier] === id);
  if (!response?.data?.length) return;
  if (identifier) return items[0].evalStatusCode;
  return response.data[0]?.evalStatusCode;
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

/**
 * Formats errored response into list of strings
 * @param {*} errorResp
 * @returns
 */
export const formatErrorResponse = (errorResp) => {
  const errorMsgs = Array.isArray(errorResp)
    ? errorResp
    : [JSON.stringify(errorResp)];
  return errorMsgs;
};

// Returns the amount of seconds until the users front-end session expires
export const currentSecondsTilInactive = () => {
  return (
    (new Date(localStorage.getItem("ecmps_session_expiration")) -
      currentDateTime()) /
    1000
  );
};
