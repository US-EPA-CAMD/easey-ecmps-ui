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
export const updateCheckedOutLocationsOnTable = (
  tableRef,
  updateState,
  checkedOutLocationsMPIdsMap
) => {
  let changeInCheckedOutLocations = 0;
  tableRef.current.forEach((tableRow) => {
    const isLocationCheckedOut = checkedOutLocationsMPIdsMap.has(
      tableRow.monPlanId
    );
    if (tableRow.checkedOut !== isLocationCheckedOut) {
      changeInCheckedOutLocations += 1;
    }
    tableRow.checkedOut = checkedOutLocationsMPIdsMap.has(tableRow.monPlanId);
    if (isLocationCheckedOut && !tableRow.userCheckedOut) {
      tableRow.selected = false;
    }
  });
  if (changeInCheckedOutLocations) {
    updateState([...tableRef.current]);
  }
};

export const updateCheckedOutLocationsOnTables = (
  checkedOutLocationsMPIdsMap,
  tablesObj
) => {
  for (const table in tablesObj) {
    const { ref, setState } = tablesObj[table];
    updateCheckedOutLocationsOnTable(
      ref,
      setState,
      checkedOutLocationsMPIdsMap
    );
  }
};

export const isLocationCheckedOutByUser = ({
  userId,
  checkedOutLocationsMap,
  chunk,
  isLocationCheckedOut,
}) => {
  if (!isLocationCheckedOut) {
    return false;
  }
  const { monPlanId } = chunk;
  if (checkedOutLocationsMap.get(monPlanId)?.checkedOutBy === userId) {
    return true;
  }
  return false;
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
