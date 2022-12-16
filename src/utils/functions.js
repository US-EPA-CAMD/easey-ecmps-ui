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
export const isLocationUserCheckedOut = (checkedOutLocationsMap, monPlanId, userId) => {
  if (checkedOutLocationsMap.get(monPlanId)?.checkedOutBy === userId) {
    return true;
  }
  return false;
}

export const updateCheckedOutLocationsOnTable = (tableRef, updateState, checkedOutLocationsMPIdsMap, userId) => {
  let changeInCheckedOutLocations = 0;
  tableRef.current.forEach((tableRow) => {
    const isLocationCheckedOut = checkedOutLocationsMPIdsMap.has(tableRow.monPlanId);
    if (tableRow.checkedOut !== isLocationCheckedOut) {
      changeInCheckedOutLocations+=1;
    }
    tableRow.checkedOut = isLocationCheckedOut;
    if (isLocationCheckedOut) {
      tableRow.userCheckedOut = isLocationUserCheckedOut(checkedOutLocationsMPIdsMap, tableRow.monPlanId, userId);
    }
    if (isLocationCheckedOut && !tableRow.userCheckedOut) {
      tableRow.selected = false;
    }
  })
  if (changeInCheckedOutLocations){
    updateState([...tableRef.current]);
  }
}

export const updateCheckedOutLocationsOnTables = (checkedOutLocationsMPIdsMap, tablesObj, userId) => {
  for (const table in tablesObj) {
    const {ref, setState} = tablesObj[table];
    updateCheckedOutLocationsOnTable(ref, setState, checkedOutLocationsMPIdsMap, userId)
  }
}

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
  return isLocationUserCheckedOut(checkedOutLocationsMap, monPlanId, userId)
};
