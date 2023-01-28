import React from "react";

export const debugLog = (message, object = null) => {
  if (getConfigValueBoolean("REACT_APP_EASEY_ECMPS_UI_ENABLE_DEBUG")) {
    if (object) {
      console.log(message, object);
    } else {
      console.log(message);
    }
  }
};

export const getUser = () => {
  const cdxUser = sessionStorage.getItem("cdx_user")
    ? JSON.parse(sessionStorage.getItem("cdx_user"))
    : null;

  return cdxUser && cdxUser.firstName ? cdxUser : null;
};

export const parseBool = (value, defaultValue = false) => {
  if (typeof value == "number" || value instanceof Number) {
    return value > 0;
  }

  if (typeof value == "boolean" || value instanceof Boolean) {
    return Boolean(value);
  }

  if (typeof value == "string" || value instanceof String) {
    value = value.trim().toLowerCase();
    if (value === "true" || value === "false") {
      return value === "true";
    }
  }

  return defaultValue;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const fullDateString = `${month}-${day}-${year}`;
  return fullDateString;
};

export const getConfigValue = (key, defaultValue = "") => {
  let returnValue;

  if (window._env_ && window._env_[key]) {
    returnValue = window._env_[key];
  } else if (!returnValue && process.env[key]) {
    returnValue = process.env[key];
  }

  return returnValue || defaultValue;
};

export const getConfigValueNumber = (key, defaultValue = "") => {
  return Number(getConfigValue(key, defaultValue));
};

export const getConfigValueBoolean = (key, defaultValue = "") => {
  return parseBool(getConfigValue(key, defaultValue));
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
  `padding-1 usa-alert usa-alert--no-icon text-center ${evalStatusStyle(
    evalStatus
  )} margin-y-0 maintainBorder`;
export const reportWindowParams = [
  // eslint-disable-next-line no-restricted-globals
  `height=${screen.height}`,
  // eslint-disable-next-line no-restricted-globals
  `width=${screen.width}`,
  //`fullscreen=yes`,
].join(",");

export const formatReportUrl = (
  reportCode,
  facilityId,
  monPlanId = null,
  testId = null,
  qceId = null,
  teeId = null,
) => {
  const tee = teeId ? `&teeId=${teeId}` : "";
  const qce = qceId ? `&qceId=${qceId}` : "";  
  const test = testId ? `&testId=${testId}` : "";
  const facility = facilityId ? `&facilityId=${facilityId}` : "";
  const monitorPlan = monPlanId ? `&monitorPlanId=${monPlanId}` : "";
  let url = `/reports?reportCode=${reportCode}${facility}${monitorPlan}${test}${qce}${tee}`;

  if (window.location.href.includes('/workspace')) {
    return url.replace('/reports', '/workspace/reports');
  }

  return url;
}

export const displayReport = (
  reportCode,
  facilityId,
  monPlanId = null,
  testId = null,
  qceId = null,
  teeId = null,
) => {
  let reportTitle;

  switch (reportCode) {
    case "QCE":
      reportTitle = "QA/Cert Events Printout";
      break;
    case "TEE":
      reportTitle = "Test Extensions and Exemptions Printout";
      break;
    case "MPP":
      reportTitle = "Monitoring Plan Printout";
      break;
    case "MP_EVAL":
      reportTitle = "Monitoring Plan Evaluation";
      break;
    case "TEST_DETAIL":
      reportTitle = "QA/Cert Test Detail";
      break;
    default:
      reportTitle = "Not a valid Report";
      break;
  }

  const url = formatReportUrl(
    reportCode, facilityId, monPlanId, testId, qceId, teeId
  );
  window.open(url, `ECMPS ${reportTitle} Report`, reportWindowParams);
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
              onClick={() => callback(row, false)}
            >
              {row.evalStatusCode}
            </button>
          ) : (
            <button className={"unstyled-btn"}>{row.evalStatusCode}</button>
          )}
        </div>
      );
    }
    return col;
  });

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
