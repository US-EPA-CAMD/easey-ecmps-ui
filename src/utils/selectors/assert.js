import * as mpApi from "../api/monitoringPlansApi";

// selectors that normalize api data to fit the columns in UI datatable
import * as loadSelector from "./monitoringPlanLoads";
import * as wafSelector from "./monitoringPlanRectangularDucts";
import * as spanSelector from "./monitoringPlanSpans";
import * as formulaSelector from "./monitoringPlanFormulas";
import * as defaultSelector from "./monitoringPlanDefaults";
import * as unitFuelSelector from "./monitoringPlanFuelData";
import * as unitControlSelector from "./monitoringPlanUnitControls";
import * as unitCapacitySelector from "./monitoringPlanUnitCapacity";

export const getDataTableApis = async (name, location, selectedLocation) => {
  if (name === "Load") {
    return mpApi.getMonitoringLoads(location);
  } else if (name === "Rectangular Duct WAF") {
    return mpApi.getMonitoringRectangularDucts(location);
  } else if (name === "Span") {
    return mpApi.getMonitoringSpans(location);
  } else if (name === "Formula") {
    return mpApi.getMonitoringFormulas(location);
  } else if (name === "Default") {
    return mpApi.getMonitoringDefaults(location);
  } else if (name === "Unit Fuel") {
    return mpApi.getMonitoringPlansFuelDataRecords(
      selectedLocation ? selectedLocation : location
    );
  } else if (name === "Unit Control") {
    return mpApi.getMonitoringPlansUnitControlRecords(
      selectedLocation ? selectedLocation : location
    );
  } else if (name === "Unit Capacity") {
    return mpApi.getUnitCapacity(
      selectedLocation ? selectedLocation : location
    );
  }
};

export const getDataTableRecords = (dataIn, name) => {
  switch (name) {
    case "Load":
      return loadSelector.getMonitoringPlansLoadsTableRecords(dataIn);
    case "Rectangular Duct WAF":
      return wafSelector.getMonitoringPlansRectangularDuctsTableRecords(dataIn);
    case "Span":
      return spanSelector.getMonitoringPlansSpansTableRecords(dataIn);
    case "Formula":
      return formulaSelector.getMonitoringPlansFormulasTableRecords(dataIn);
    case "Default":
      return defaultSelector.getMonitoringPlansDefaultsTableRecords(dataIn);
    case "Unit Fuel":
      return unitFuelSelector.getMonitoringPlansFuelDataRecords(dataIn);

    case "Unit Control":
      return unitControlSelector.getMonitoringPlansUnitControlRecords(dataIn);

    case "Unit Capacity":
      return unitCapacitySelector.getMonitoringPlansUnitCapacityRecords(dataIn);
    default:
      break;
  }
};

export const saveDataSwitch = (
  userInput,
  dataTableName,
  locationSelectValue,
  urlParameters
) => {
  switch (dataTableName) {
    case "Load":
      mpApi
        .saveMonitoringLoads(userInput)
        .then((result) => {
          console.log(result, " was saved");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;
    case "Rectangular Duct WAF":
      mpApi
        .saveMonitoringDuct(userInput)

        .catch((error) => {
          console.log("error is", error);
        });
      break;
    case "Span":
      mpApi
        .saveMonitoringSpans(userInput)
        .then((result) => {
          console.log(result, " was saved");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;
    case "Formula":
      mpApi
        .saveMonitoringFormulas(userInput, locationSelectValue)
        .then((result) => {
          console.log(result, " was saved");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;
    case "Default":
      mpApi
        .saveMonitoringDefaults(userInput, locationSelectValue)
        .then((result) => {
          console.log(result, " was saved");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;
    case "Unit Fuel":
      mpApi
        .saveMonitoringPlansFuelData(userInput)
        .then((result) => {
          console.log(result, " was saved");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;
    case "Unit Control":
      mpApi
        .saveUnitControl(userInput, urlParameters ? urlParameters : null)
        .then((result) => {
          console.log(result, " was saved");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;

    case "Unit Capacity":
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

export const createDataSwitch = (
  userInput,
  dataTableName,
  locationSelectValue,
  urlParameters
) => {
  switch (dataTableName) {
    case "Load":
      mpApi
        .createMonitoringLoads(userInput)
        .then((result) => {
          console.log(result, " was created");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;
    case "Rectangular Duct WAF":
      mpApi.createMonitoringDuct(userInput).catch((error) => {
        console.log("error is", error);
      });
      break;

    case "Span":
      mpApi
        .createMonitoringSpans(userInput)
        .then((result) => {
          console.log(result, " was created");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;
    case "Formula":
      mpApi
        .createMonitoringFormulas(userInput, locationSelectValue)
        .then((result) => {
          console.log(result, " was created");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;

    case "Default":
      mpApi
        .createMonitoringDefaults(userInput, locationSelectValue)
        .then((result) => {
          console.log(result, " was created");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;

    case "Unit Fuel":
      mpApi
        .createFuelData(userInput, locationSelectValue)
        .then((result) => {
          console.log(result, " was created");
        })
        .catch((error) => {
          console.log("error is", error);
        });
      break;

    case "Unit Control":
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
