export const debugLog = (message, object = null) => {
  if (getConfigValueBoolean("REACT_APP_EASEY_ECMPS_UI_ENABLE_DEBUG")) {
    if (object) {
      console.log(message, object);
    } else {
      console.log(message);
    }
  }
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
