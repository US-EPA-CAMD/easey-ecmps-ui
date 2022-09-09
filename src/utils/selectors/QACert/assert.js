import * as qaApi from "../../api/qaCertificationsAPI";

// Selectors that normalize api data to fit the columns in UI datatable
import * as selector from "./TestSummary";

// Table Names
const proGas = "Protocol Gas";
const lineTest = "Linearity Test";
const lineInjection = "Linearity Injection";

// Getting records from API
export const getDataTableApis = async (name, location, id) => {
  switch (name) {
    case lineTest:
      return qaApi.getQALinearitySummary(location, id);

    case proGas:
    case lineInjection:
    default:
      break;
  }
};

// Selectors
export const getDataTableRecords = (dataIn, name) => {
  switch (name) {
    case lineTest:
      console.log("datain", dataIn);
      return selector.getLinearitySummaryRecords(dataIn);
    case proGas:
    case lineInjection:
    default:
      break;
  }
};

// // Save (PUT) endpoints for API
// export const saveDataSwitch = (
//   userInput,
//   dataTableName,
//   locationSelectValue,
//   urlParameters = null
// ) => {
//   switch (dataTableName) {
//     case load:
//       return mpApi.saveMonitoringLoads(userInput, locationSelectValue);
//     case rectDuctWaf:
//       return mpApi.saveMonitoringDuct(userInput);
//     case span:
//       return mpApi.saveMonitoringSpans(userInput);
//     case form:
//       return mpApi.saveMonitoringFormulas(userInput, locationSelectValue);
//     case def:
//       return mpApi.saveMonitoringDefaults(userInput, locationSelectValue);
//     case unitFuel:
//       return mpApi.saveMonitoringPlansFuelData(userInput);
//     case unitCon:
//       return mpApi.saveUnitControl(
//         userInput,
//         urlParameters ? urlParameters : null
//       );
//     case unitCap:
//       return mpApi.saveUnitCapacity(
//         userInput,
//         urlParameters ? urlParameters : null
//       );

//     case locationAttribute:
//       return mpApi.saveLocationAttribute(userInput, locationSelectValue);
//     default:
//       break;
//   }
//   return [];
// };

// // Create (POST) endpoints for API
// export const createDataSwitch = (
//   userInput,
//   dataTableName,
//   locationSelectValue,
//   urlParameters = null
// ) => {
//   switch (dataTableName) {
//     case load:
//       return mpApi.createMonitoringLoads(userInput, locationSelectValue);
//     case rectDuctWaf:
//       return mpApi.createMonitoringDuct(userInput);
//     case span:
//       return mpApi.createMonitoringSpans(userInput);
//     case form:
//       return mpApi.createMonitoringFormulas(userInput, locationSelectValue);
//     case def:
//       return mpApi.createMonitoringDefaults(userInput, locationSelectValue);
//     case unitFuel:
//       return mpApi.createFuelData(userInput, locationSelectValue);
//     case unitCon:
//       return mpApi.createUnitControl(
//         userInput,
//         urlParameters ? urlParameters : null
//       );
//     case unitCap:
//       return mpApi.createUnitCapacity(
//         userInput,
//         urlParameters ? urlParameters : null
//       );
//     case locationAttribute:
//       return mpApi.createLocationAttribute(userInput, locationSelectValue);
//     default:
//       break;
//   }
//   return [];
// };
