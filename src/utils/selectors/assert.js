import * as mpApi from "../api/monitoringPlansApi";

// Selectors that normalize api data to fit the columns in UI datatable
import * as loadSelector from "./monitoringPlanLoads";
import * as wafSelector from "./monitoringPlanRectangularDucts";
import * as spanSelector from "./monitoringPlanSpans";
import * as formulaSelector from "./monitoringPlanFormulas";
import * as defaultSelector from "./monitoringPlanDefaults";
import * as unitFuelSelector from "./monitoringPlanFuelData";
import * as unitControlSelector from "./monitoringPlanUnitControls";
import * as unitCapacitySelector from "./monitoringPlanUnitCapacity";

// Table Names
const load = "Load";
const span = "Span";
const def = "Default";
const form = "Formula";
const rectDuctWaf = "Rectangular Duct WAF";
const unitCon = "Unit Control";
const unitCap = "Unit Capacity";
const unitFuel = "Unit Fuel";

// Getting records from API
export const getDataTableApis = async (name, location, selectedLocation) => {
  if (name === load) {
    return mpApi.getMonitoringLoads(location);
  } else if (name === rectDuctWaf) {
    return mpApi.getMonitoringRectangularDucts(location);
  } else if (name === span) {
    return mpApi.getMonitoringSpans(location);
  } else if (name === form) {
    return mpApi.getMonitoringFormulas(location);
  } else if (name === def) {
    return mpApi.getMonitoringDefaults(location);
  } else if (name === unitFuel) {
    return mpApi.getMonitoringPlansFuelDataRecords(
      selectedLocation ? selectedLocation : location
    );
  } else if (name === unitCon) {
    return mpApi.getMonitoringPlansUnitControlRecords(
      selectedLocation ? selectedLocation : location
    );
  } else if (name === unitCap) {
    return mpApi.getUnitCapacity(
      selectedLocation ? selectedLocation : location
    );
  }
  return { data: [] };
};

// Selectors
export const getDataTableRecords = (dataIn, name) => {
  switch (name) {
    case load:
      return loadSelector.getMonitoringPlansLoadsTableRecords(dataIn);
    case rectDuctWaf:
      return wafSelector.getMonitoringPlansRectangularDuctsTableRecords(dataIn);
    case span:
      return spanSelector.getMonitoringPlansSpansTableRecords(dataIn);
    case form:
      return formulaSelector.getMonitoringPlansFormulasTableRecords(dataIn);
    case def:
      return defaultSelector.getMonitoringPlansDefaultsTableRecords(dataIn);
    case unitFuel:
      return unitFuelSelector.getMonitoringPlansFuelDataRecords(dataIn);

    case unitCon:
      return unitControlSelector.getMonitoringPlansUnitControlRecords(dataIn);

    case unitCap:
      return unitCapacitySelector.getMonitoringPlansUnitCapacityRecords(dataIn);
    default:
      break;
  }
  return [];
};

// Save (PUT) endpoints for API
export const saveDataSwitch = (
  userInput,
  dataTableName,
  locationSelectValue,
  urlParameters
) => {
  switch (dataTableName) {
    case load:
      // mpApi
      //   .saveMonitoringLoads(userInput)
      //   .then((result) => {
      //     console.log(result, " was saved");
      //   })
      //   .catch((error) => {
      //     console.log("error is", error);
      //   });
      return mpApi.saveMonitoringLoads(userInput);
      break;
    case rectDuctWaf:
      mpApi
        .saveMonitoringDuct(userInput)

        .catch((error) => {
          console.log("error is", error);
        });
      break;
    case span:
      mpApi
        .saveMonitoringSpans(userInput)
        .then((result) => {
          console.log(result, " was saved");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;
    case form:
      mpApi
        .saveMonitoringFormulas(userInput, locationSelectValue)
        .then((result) => {
          console.log(result, " was saved");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;
    case def:
      mpApi
        .saveMonitoringDefaults(userInput, locationSelectValue)
        .then((result) => {
          console.log(result, " was saved");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;
    case unitFuel:
      mpApi
        .saveMonitoringPlansFuelData(userInput)
        .then((result) => {
          console.log(result, " was saved");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;
    case unitCon:
      mpApi
        .saveUnitControl(userInput, urlParameters ? urlParameters : null)
        .then((result) => {
          console.log(result, " was saved");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;

    case unitCap:
      mpApi
        .saveUnitCapacity(userInput, urlParameters ? urlParameters : null)
        .then((result) => {
          console.log(result, " was saved");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;
    default:
      break;
  }
};

// Create (POST) endpoints for API
export const createDataSwitch = (
  userInput,
  dataTableName,
  locationSelectValue,
  urlParameters
) => {
  switch (dataTableName) {
    case load:
      mpApi
        .createMonitoringLoads(userInput)
        .then((result) => {
          console.log(result, " was created");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;
    case rectDuctWaf:
      mpApi.createMonitoringDuct(userInput).catch((error) => {
        console.log("error is", error);
      });
      break;

    case span:
      mpApi
        .createMonitoringSpans(userInput)
        .then((result) => {
          console.log(result, " was created");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;
    case form:
      mpApi
        .createMonitoringFormulas(userInput, locationSelectValue)
        .then((result) => {
          console.log(result, " was created");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;

    case def:
      mpApi
        .createMonitoringDefaults(userInput, locationSelectValue)
        .then((result) => {
          console.log(result, " was created");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;

    case unitFuel:
      mpApi
        .createFuelData(userInput, locationSelectValue)
        .then((result) => {
          console.log(result, " was created");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;

    case unitCon:
      mpApi
        .createUnitControl(userInput, urlParameters ? urlParameters : null)
        .then((result) => {
          console.log(result, " was created");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;
    default:
      break;
  }
};
