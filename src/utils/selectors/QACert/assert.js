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

// Getting records from API
export const getDataTableApis = async (name, location, id, extraIdsArr) => {
  console.log("assert", name, location, id, extraIdsArr);
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
      console.log(
        "name, location, id, extraIdsArr",
        name,
        location,
        id,
        extraIdsArr
      );
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
      return qaApi.getAirEmissions(location, id).catch((error) => {
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
    default:
      throw new Error(`getDataTableApis undefined for ${name}`)
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
      return selector.getFlowRunRecords(dataIn)
    default:
      break;
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
      break;
  }
  return [];
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

    default:
      break;
  }
  return [];
};

//create endpoints for API
export const createDataSwitch = (
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

    default:
      break;
  }
  return [];
};
