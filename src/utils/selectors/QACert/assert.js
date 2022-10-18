import * as qaApi from "../../api/qaCertificationsAPI";

// Selectors that normalize api data to fit the columns in UI datatable
import * as selector from "./TestSummary";
import * as injectionSelector from "./LinearityInjection";
// Table Names
const proGas = "Protocol Gas";
const lineTest = "Linearity Test";
const lineInjection = "Linearity Injection";
const rataData = "RATA Data";
const rataRunData = "RATA Run Data";
const rataSummary = "RATA Summary";
const rataTraverseData = "RATA Traverse Data"
const airEmissions = "Air Emissions";
const flowRataRun = "Flow";
const testQualification = "Test Qualification";
const fuelFlowToLoad = "Fuel Flow to Load";
const appendixECorrTestRun = "Run";
const appendixECorrelationSummary= "Appendix E Correlation Summary";

// Getting records from API
export const getDataTableApis = async (name, location, id, extraIdsArr) => {
  switch (name) {
    case lineTest:
      return qaApi.getQALinearitySummary(location, id).catch((error) => {
        console.log("error", error);
      });
    case proGas:
      return qaApi.getProtocolGas(location, id).catch((error) => {
        console.log("error", error);
      });
    case lineInjection:
      return qaApi
        .getQALinearityInjection(extraIdsArr[0], extraIdsArr[1], id)
        .catch((error) => {
          console.log("error", error);
        });
    case rataData:
      return qaApi.getRataData(location, id).catch((error) => {
        console.log("error", error);
      });

    case rataRunData:
      return qaApi
        .getRataRunData(extraIdsArr[0], extraIdsArr[1], extraIdsArr[2], id)
        .catch((error) => {
          console.log("error", error);
        });

    case rataSummary:
      return qaApi
        .getRataSummary(extraIdsArr[0], extraIdsArr[1], id)
        .catch((error) => {
          console.log("error", error);
        });
    case airEmissions:
      return qaApi.getAirEmissions(extraIdsArr[0], id).catch((error) => {
        console.log("error", error);
      });
    case flowRataRun:
      return qaApi
        .getFlowRunData(extraIdsArr[0], extraIdsArr[1], extraIdsArr[2], extraIdsArr[3], id)
        .catch((error) => {
          console.log("error", error);
        });
    case rataTraverseData:
      return qaApi
        .getRataTraverseData(extraIdsArr[0], extraIdsArr[1], extraIdsArr[2], extraIdsArr[3], extraIdsArr[4], id)
        .catch(error => console.log('error fetching rata traverse data', error))
    case testQualification:
      return qaApi.getTestQualification(location, id).catch((error) => {
        console.log("error", error);
      });
    case appendixECorrelationSummary:
      return qaApi.getAppendixECorrelationSummaryRecords(location, id).catch((error) => {
        console.log("error", error);
      });
    case fuelFlowToLoad:
      return qaApi
        .getFuelFlowToLoadData(location, id)
        .catch(error => console.log('error fetching fuel flow to load data', error))
    case appendixECorrTestRun:
      return qaApi
        .getAppendixERunData(location, id, extraIdsArr[0])
        .catch(error => console.log('error fetching appendix E test run data', error));
    default:
      throw new Error(`getDataTableApis case not implemented for ${name}`)
  }
};

// Selectors
export const getDataTableRecords = (dataIn, name) => {
  switch (name) {
    case lineTest:
      return selector.getLinearitySummaryRecords(dataIn);
    case proGas:
      return selector.getProtocolGasRecords(dataIn);
    case lineInjection:
      return injectionSelector.getLinearityInjection(dataIn);
    case rataData:
      return selector.getRataDataRecords(dataIn);
    case rataRunData:
      return selector.getRataRunDataRecords(dataIn);
    case rataSummary:
      return selector.mapRataSummaryToRows(dataIn);
    case rataTraverseData:
      return selector.mapRataTraverseToRows(dataIn)
    case airEmissions:
      return selector.getAirEmissionsRecords(dataIn);
    case flowRataRun:
      return selector.getFlowRunRecords(dataIn);
    case testQualification:
      return selector.mapTestQualificationToRows(dataIn);
    case appendixECorrelationSummary:
      return selector.getAppendixECorrelationSummaryRecords(dataIn);
    case fuelFlowToLoad:
      return selector.mapFuelFlowToLoadToRows(dataIn);
    case appendixECorrTestRun:
      return selector.mapAppendixECorrTestRunsToRows(dataIn);
    default:
      throw new Error(`getDataTableRecords case not implemented for ${name}`)
  }
};

export const removeDataSwitch = async (
  row,
  name,
  locationId,
  id,
  extraIdsArr
) => {
  switch (name) {
    case lineTest:
      return qaApi
        .deleteQALinearitySummary(locationId, id, row.id)
        .catch((error) => {
          console.log("error", error);
        });
    case proGas:
      return qaApi
        .deleteProtocolGas(locationId, id, row.id)
        .catch((error) => console.log("error", error));

    case airEmissions:
      return qaApi
        .deleteAirEmissions(locationId, id, row.id)
        .catch((error) => console.log("error", error));

    case lineInjection:
      return qaApi
        .deleteQALinearityInjection(extraIdsArr[0], extraIdsArr[1], id, row.id)
        .catch((error) => {
          console.log("error", error);
        });

    case rataData:
      return qaApi
        .deleteRataData(locationId, id, row.id)
        .catch((error) => {
          console.log("error", error);
        })
        .catch((error) => {
          console.log("error", error);
        });

    case rataRunData:
      return qaApi
        .deleteRataRunData(
          extraIdsArr[0],
          extraIdsArr[1],
          extraIdsArr[3],
          id,
          row.id
        )
        .catch((error) => {
          console.log("error", error);
        });

    case rataSummary:
      return qaApi
        .deleteRataSummary(
          locationId,
          id,
          extraIdsArr[0],
          extraIdsArr[1],
          id,
          row.id
        )
        .catch((error) => {
          console.log("error", error);
        });
    case flowRataRun:
      return qaApi
        .deleteFlowRunData(
          extraIdsArr[0],
          extraIdsArr[1],
          extraIdsArr[2],
          extraIdsArr[3],
          extraIdsArr[4],
          row.id,
        )
        .catch((error) => {
          console.log("error", error);
        });
    case rataTraverseData:
      return qaApi
        .deleteRataTraverseData(
          extraIdsArr[0],
          extraIdsArr[1],
          extraIdsArr[2],
          extraIdsArr[3],
          extraIdsArr[4],
          id,
          row.id
        )
        .catch((error) => {
          console.log("error", error);
        });

    default:
      throw new Error(`removeDataSwitch case not implemented for ${name}`)
  }
};

// Save (PUT) endpoints for API
export const saveDataSwitch = (userInput, name, location, id, extraIdsArr) => {
  switch (name) {
    case lineTest:
      return qaApi
        .updateQALinearitySummaryTestSecondLevel(
          location,
          id,
          userInput.id,
          userInput
        )
        .catch((error) => {
          console.log("error", error);
        });

    case proGas:
      return qaApi
        .updateProtocolGas(location, id, userInput.id, userInput)
        .catch((error) => {
          console.log("error", error);
        });

    case airEmissions:
      return qaApi
        .updateAirEmissions(location, id, userInput.id, userInput)
        .catch((error) => {
          console.log("error", error);
        });

    case lineInjection:
      return qaApi
        .editQALinearityInjection(
          extraIdsArr[0],
          extraIdsArr[1],
          id,
          userInput.id,
          userInput
        )
        .catch((error) => {
          console.log("error", error);
        });

    case rataData:
      return qaApi
        .updateRataData(userInput.id, location, id, userInput)
        .catch((error) => {
          console.log("error", error);
        });

    case rataRunData:
      return qaApi
        .updateRataRunData(
          extraIdsArr[0],
          extraIdsArr[1],
          extraIdsArr[3],
          id,
          userInput.id,
          userInput
        )
        .catch((error) => {
          console.log("error", error);
        });

    case rataSummary:
      return qaApi
        .updateRataSummary(
          extraIdsArr[0],
          extraIdsArr[1],
          extraIdsArr[2],
          id,
          userInput.id,
          userInput
        )
        .catch((error) => {
          console.log("error", error);
        });

    case flowRataRun:
      return qaApi
        .updateFlowRunData(
          extraIdsArr[0],
          extraIdsArr[1],
          extraIdsArr[2],
          extraIdsArr[3],
          id,
          userInput.id,
          userInput
        )
        .catch((error) => {
          console.log("error", error);
        });
    case rataTraverseData:
      return qaApi
        .updateRataTraverseData(extraIdsArr[0], extraIdsArr[1], extraIdsArr[2], extraIdsArr[3], extraIdsArr[4], id, userInput.id, userInput)
        .catch(error => console.log('error updating rata traverse data', error))
    case testQualification:
      return qaApi.updateTestQualification(location, id, userInput.id, userInput);
    default:
      break;
  }
  return [];
};

//create endpoints for API
export const createDataSwitch = async (
  userInput,
  name,
  location,
  id,
  extraIdsArr
) => {
  switch (name) {
    case lineTest:
      return qaApi
        .createQALinearitySummaryTestSecondLevel(location, id, userInput)
        .catch((error) => {
          console.log("error", error);
        });

    case proGas:
      return qaApi.createProtocolGas(location, id, userInput);
    case lineInjection:
      return qaApi
        .createQALinearityInjection(
          extraIdsArr[0],
          extraIdsArr[1],
          id,
          userInput
        )
        .catch((error) => {
          console.log("error", error);
        });

    case rataData:
      return qaApi.createRataData(location, id, userInput).catch((error) => {
        console.log("error", error);
      });

    case rataRunData:
      return qaApi
        .createRataRunData(
          extraIdsArr[0],
          extraIdsArr[1],
          extraIdsArr[3],
          id,
          userInput
        )
        .catch((error) => {
          console.log("error", error);
        });

    case rataSummary:
      return qaApi
        .createRataSummary(extraIdsArr[0], extraIdsArr[1], id, userInput)
        .catch((error) => {
          console.log("error", error);
        });
    case rataTraverseData:
      return qaApi
        .createRataTraverse(extraIdsArr[0], extraIdsArr[1], extraIdsArr[2], extraIdsArr[3], extraIdsArr[4], id, userInput)
        .catch(error => console.log('error creating rata traverse data', error))

    case airEmissions:
      return qaApi
        .createAirEmissions(location, id, userInput)
        .catch((error) => {
          console.log("error", error);
        });
    case flowRataRun:
      return qaApi
        .createFlowRunData(
          extraIdsArr[0],
          extraIdsArr[1],
          extraIdsArr[2],
          extraIdsArr[3],
          id,
          userInput
        )
        .catch((error) => {
          console.log("error", error);
        });
    case testQualification:
      return qaApi.createTestQualification(location, id, userInput);
    case appendixECorrelationSummary:
      return qaApi.createAppendixECorrelationSummaryRecord(location, id, userInput);
    case fuelFlowToLoad:
      return qaApi
        .createFuelFlowToLoad(location, id, userInput)
        .catch(error => console.log('error creating fuel flow to load data', error))
    case appendixECorrTestRun:
      return qaApi
        .createAppendixERun(location, id, userInput.id, userInput)
        .catch((error) => {
          console.log("error creating appendix e correlation test run", error);
        });
    default:
      throw new Error(`createDataSwitch case not implemented for ${name}`)
  }
};
