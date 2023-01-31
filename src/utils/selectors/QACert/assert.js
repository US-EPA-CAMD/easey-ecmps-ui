import * as qaApi from "../../api/qaCertificationsAPI";

// Selectors that normalize api data to fit the columns in UI datatable
import * as selector from "./TestSummary";
import * as injectionSelector from "./LinearityInjection";
import * as cycleTimeInjections from "./CycleTimeInjection";
// Table Names
const proGas = "Protocol Gas";
const lineTest = "Linearity Test";
const lineInjection = "Linearity Injection";
const rataData = "RATA Data";
const rataRunData = "RATA Run Data";
const rataSummary = "RATA Summary";
const rataTraverseData = "RATA Traverse Data";
const airEmissions = "Air Emissions";
const flowRataRun = "Flow";
const testQualification = "Test Qualification";
const fuelFlowToLoad = "Fuel Flow to Load";
const fuelFlowToLoadBaseline = "Fuel Flow to Load Baseline";
const appendixECorrTestRun = "Appendix E Correlation Run";
const appendixECorrelationSummary = "Appendix E Correlation Summary";
const appendixECorrHeatInputOil = "Appendix E Correlation Heat Input from Oil";
const appendixECorrHeatInputGas = "Appendix E Correlation Heat Input from Gas";
const flowToLoadCheck = "Flow To Load Check";
const onlineOfflineCalibration = "Online Offline Calibration";
const calibrationInjections = "Calibration Injection";
const fuelFlowmeterAccuracyData = "Fuel Flowmeter Accuracy Data";
const cycleTimeSummary = "Cycle Time Summary";
const cycleTimeInjection = "Cycle Time Injection";
const transmitterTransducerAccuracyData =
  "Transmitter Transducer Accuracy Data";
const flowToLoadReference = "Flow To Load Reference";
const unitDefualtTest = "Unit Default Test";
const unitDefaultTestRun = "Unit Default Test Run";
const hgSummary = "Hg Summary";
const hgInjection = "Hg Injection";
const qaCertEvent = "QA Certification Event";
const qaExeptions = "Test Extension Exemption";
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
        .getFlowRunData(
          extraIdsArr[0],
          extraIdsArr[1],
          extraIdsArr[2],
          extraIdsArr[3],
          id
        )
        .catch((error) => {
          console.log("error", error);
        });
    case rataTraverseData:
      return qaApi
        .getRataTraverseData(
          extraIdsArr[0],
          extraIdsArr[1],
          extraIdsArr[2],
          extraIdsArr[3],
          extraIdsArr[4],
          id
        )
        .catch((error) =>
          console.log("error fetching rata traverse data", error)
        );
    case testQualification:
      return qaApi.getTestQualification(location, id).catch((error) => {
        console.log("error", error);
      });
    case appendixECorrelationSummary:
      return qaApi
        .getAppendixECorrelationSummaryRecords(location, id)
        .catch((error) => {
          console.log("error", error);
        });
    case fuelFlowToLoad:
      return qaApi
        .getFuelFlowToLoadData(location, id)
        .catch((error) =>
          console.log("error fetching fuel flow to load data", error)
        );
    case fuelFlowToLoadBaseline:
      return qaApi
        .getFuelFlowToLoadBaseline(location, id)
        .catch((error) =>
          console.log("error fetching fuel flow to load baseline data", error)
        );
    case appendixECorrTestRun:
      return qaApi
        .getAppendixERunData(extraIdsArr[0], extraIdsArr[1], id)
        .catch((error) =>
          console.log("error fetching appendix E test run data", error)
        );
    case appendixECorrHeatInputGas:
      return qaApi
        .getAppendixEHeatInputGasData(
          extraIdsArr[0],
          extraIdsArr[1],
          extraIdsArr[2],
          id
        )
        .catch((error) =>
          console.log(
            "error fetching appendix E heat input from gas data",
            error
          )
        );
    case appendixECorrHeatInputOil:
      return qaApi
        .getAppendixEHeatInputOilData(
          extraIdsArr[0],
          extraIdsArr[1],
          extraIdsArr[2],
          id
        )
        .catch((error) =>
          console.log(
            "error fetching appendix E heat input from oil data",
            error
          )
        );
    case flowToLoadCheck:
      return qaApi.getFlowToLoadCheckRecords(location, id).catch((error) => {
        console.log("error", error);
      });
    case onlineOfflineCalibration:
      return qaApi
        .getOnlineOfflineCalibration(location, id)
        .catch((error) =>
          console.log("error fetching online offline calibration", error)
        );
    case calibrationInjections:
      return qaApi
        .getCalibrationInjectionRecords(location, id)
        .catch((error) => {
          console.log("error", error);
        });
    case fuelFlowmeterAccuracyData:
      return qaApi
        .getFuelFlowmeterAccuracyDataRecords(location, id)
        .catch((error) => {
          console.log("error", error);
        });
    case cycleTimeSummary:
      return qaApi.getCycleTimeSummary(location, id).catch((error) => {
        console.log("error", error);
      });
    case cycleTimeInjection:
      return qaApi
        .getCycleTimeInjection(extraIdsArr[0], extraIdsArr[1], id)
        .catch((error) => {
          console.log("error", error);
        });
    case transmitterTransducerAccuracyData:
      return qaApi
        .getTransmitterTransducerAccuracyDataRecords(location, id)
        .catch((error) => {
          console.log("error", error);
        });
    case flowToLoadReference:
      return qaApi
        .getFlowToLoadReference(location, id)
        .catch((error) =>
          console.log("error fetching flow to load reference", error)
        );
    case unitDefualtTest:
      return qaApi.getUnitDefaultTest(location, id).catch((error) => {
        console.log("error fetching unit default test data", error);
      });
    case unitDefaultTestRun:
      return qaApi
        .getUnitDefaultTestRun(extraIdsArr[0], extraIdsArr[1], id)
        .catch((error) => {
          console.log("error fetching unit default test run data", error);
        });
    case hgSummary:
      return qaApi.getHgSummary(location, id).catch((error) => {
        console.log("error", error);
      });
    case hgInjection:
      return qaApi
        .getHgInjection(extraIdsArr[0], extraIdsArr[1], id)
        .catch((error) =>
          console.log("error fetching hg injection data", error)
        );
    case qaCertEvent:
      return qaApi
        .getQaCertEvents(location)
        .catch((error) =>
          console.log("error fetching hg injection data", error)
        );

    case qaExeptions:
      return qaApi
        .getTestExtension(location)
        .catch((error) =>
          console.log("error fetching hg injection data", error)
        );
    default:
      throw new Error(`getDataTableApis case not implemented for ${name}`);
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
      return selector.mapRataTraverseToRows(dataIn);
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
    case fuelFlowToLoadBaseline:
      return selector.mapFuelFlowToLoadBaselineToRows(dataIn);
    case appendixECorrTestRun:
      return selector.mapAppendixECorrTestRunsToRows(dataIn);
    case appendixECorrHeatInputGas:
      return selector.mapAppendixECorrHeatInputGasToRows(dataIn);
    case appendixECorrHeatInputOil:
      return selector.mapAppendixECorrHeatInputOilToRows(dataIn);
    case flowToLoadCheck:
      return selector.mapFlowToLoadCheckToRows(dataIn);
    case onlineOfflineCalibration:
      return selector.mapOnOffCalToRows(dataIn);
    case calibrationInjections:
      return selector.mapCalibrationInjectionsToRows(dataIn);
    case fuelFlowmeterAccuracyData:
      return selector.mapFuelFlowmeterAccuracyDataToRows(dataIn);
    case cycleTimeSummary:
      return selector.mapCycleTimeSummariesToRows(dataIn);
    case cycleTimeInjection:
      return cycleTimeInjections.mapCycleTimeInjectionsToRows(dataIn);
    case transmitterTransducerAccuracyData:
      return selector.mapTransmitterTransducerAccuracyDataToRows(dataIn);
    case flowToLoadReference:
      return selector.mapFlowToLoadReferenceToRows(dataIn);
    case unitDefualtTest:
      return selector.mapUnitDefaultTestDataToRows(dataIn);
    case unitDefaultTestRun:
      return selector.mapUnitDefaultTestRunDataToRows(dataIn);
    case hgSummary:
      return selector.mapHgSummaryDataToRows(dataIn);
    case hgInjection:
      return selector.mapHgInjectionDataToRows(dataIn);
    default:
      throw new Error(`getDataTableRecords case not implemented for ${name}`);
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

    case testQualification:
      return qaApi
        .deleteTestQualification(locationId, id, row.id)
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
          row.id
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
    case fuelFlowToLoad:
      return qaApi
        .deleteFuelFlowToLoadData(locationId, id, row.id)
        .catch((error) => {
          console.log("error", error);
        });
    case fuelFlowToLoadBaseline:
      return qaApi
        .deleteFuelFlowToLoadBaseline(locationId, id, row.id)
        .catch((error) =>
          console.log("error deleting fuel flow to load baseline", error)
        );
    case appendixECorrelationSummary:
      return qaApi
        .deleteAppendixECorrelationSummaryRecord(locationId, id, row.id)
        .catch((error) => {
          console.log("error", error);
        });
    case appendixECorrHeatInputGas:
      return qaApi
        .deleteAppendixECorrelationHeatInputGas(
          extraIdsArr[0],
          extraIdsArr[1],
          extraIdsArr[2],
          id,
          row.id
        )
        .catch((error) => {
          console.log("error", error);
        });
    case appendixECorrHeatInputOil:
      return qaApi
        .deleteAppendixECorrelationHeatInputOil(
          extraIdsArr[0],
          extraIdsArr[1],
          extraIdsArr[2],
          id,
          row.id
        )
        .catch((error) => {
          console.log("error", error);
        });
    case appendixECorrTestRun:
      return qaApi
        .deleteAppendixERun(extraIdsArr[0], extraIdsArr[1], id, row.id)
        .catch((error) => {
          console.log("error", error);
        });
    case flowToLoadCheck:
      return qaApi
        .deleteFlowToLoadCheckRecord(locationId, id, row.id)
        .catch((error) => console.log("error", error));
    case calibrationInjections:
      return qaApi
        .deleteCalibrationInjectionRecord(locationId, id, row.id)
        .catch((error) => console.log("error", error));
    case onlineOfflineCalibration:
      return qaApi
        .deleteOnlineOfflineCalibration(locationId, id, row.id)
        .catch((error) =>
          console.log("error deleting online offline calibration", error)
        );
    case fuelFlowmeterAccuracyData:
      return qaApi
        .deleteFuelFlowmeterAccuracyDataRecord(locationId, id, row.id)
        .catch((error) => console.log("error", error));
    case cycleTimeSummary:
      return qaApi
        .deleteCycleTimeSummary(locationId, id, row.id)
        .catch((error) => console.log("error", error));
    case cycleTimeInjection:
      return qaApi
        .deleteCycleTimeInjection(extraIdsArr[0], extraIdsArr[1], id, row.id)
        .catch((error) => {
          console.log("error", error);
        });
    case transmitterTransducerAccuracyData:
      return qaApi
        .deleteTransmitterTransducerAccuracyDataRecord(locationId, id, row.id)
        .catch((error) => console.log("error", error));
    case flowToLoadReference:
      return qaApi
        .deleteFlowToLoadReference(locationId, id, row.id)
        .catch((error) =>
          console.log("error deleting flow to load reference", error)
        );
    case unitDefualtTest:
      return qaApi
        .deleteUnitDefaultTest(locationId, id, row.id)
        .catch((error) => console.log("error", error));
    case hgSummary:
      return qaApi
        .deleteHgSummary(locationId, id, row.id)
        .catch((error) => console.log("error", error));
    case hgInjection:
      return qaApi
        .deleteHgInjection(extraIdsArr[0], extraIdsArr[1], id, row.id)
        .catch((error) => console.log("error", error));
    case unitDefaultTestRun:
      return qaApi
        .deleteUnitDefaultTestRun(extraIdsArr[0], extraIdsArr[1], id, row.id)
        .catch((error) => console.log("error", error));

    case qaCertEvent:
      return qaApi
        .deleteQaCertEvents(locationId, row.id)
        .catch((error) => console.log("error deleting QA cert events", error));
    case qaExeptions:
      return qaApi
        .deleteTestExtension(locationId, row.id)
        .catch((error) =>
          console.log("error deleting QA TEST EXCEPTIONS", error)
        );
    default:
      throw new Error(`removeDataSwitch case not implemented for ${name}`);
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
        .updateRataTraverseData(
          extraIdsArr[0],
          extraIdsArr[1],
          extraIdsArr[2],
          extraIdsArr[3],
          extraIdsArr[4],
          id,
          userInput.id,
          userInput
        )
        .catch((error) =>
          console.log("error updating rata traverse data", error)
        );
    case testQualification:
      return qaApi.updateTestQualification(
        location,
        id,
        userInput.id,
        userInput
      );
    case appendixECorrelationSummary:
      return qaApi
        .updateAppendixECorrelationSummaryRecord(
          location,
          id,
          userInput.id,
          userInput
        )
        .catch((error) => {
          console.log("error", error);
        });
    case fuelFlowToLoad:
      return qaApi.updateFuelFlowToLoad(location, id, userInput.id, userInput);
    case fuelFlowToLoadBaseline:
      return qaApi
        .updateFuelFlowToLoadBaseline(location, id, userInput.id, userInput)
        .catch((error) =>
          console.log("error updating fuel flow to load baseline", error)
        );
    case appendixECorrTestRun:
      return qaApi
        .updateAppendixERun(
          extraIdsArr[0],
          extraIdsArr[1],
          id,
          userInput.id,
          userInput
        )
        .catch((error) => {
          console.log("error", error);
        });
    case appendixECorrHeatInputGas:
      return qaApi
        .updateAppendixECorrelationHeatInputGas(
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
    case appendixECorrHeatInputOil:
      return qaApi
        .updateAppendixECorrelationHeatInputOil(
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
    case flowToLoadCheck:
      return qaApi
        .updateFlowToLoadCheckRecord(location, id, userInput.id, userInput)
        .catch((error) => console.log("error", error));
    case calibrationInjections:
      return qaApi
        .updateCalibrationInjectionRecord(location, id, userInput.id, userInput)
        .catch((err) => console.error(err));
    case onlineOfflineCalibration:
      return qaApi
        .updateOnlineOfflineCalibration(location, id, userInput.id, userInput)
        .catch((error) =>
          console.log("error updating online offline calibration", error)
        );
    case fuelFlowmeterAccuracyData:
      return qaApi
        .updateFuelFlowmeterAccuracyDataRecord(
          location,
          id,
          userInput.id,
          userInput
        )
        .catch((err) => console.error(err));
    case cycleTimeSummary:
      return qaApi
        .updateCycleTimeSummary(location, id, userInput.id, userInput)
        .catch((err) => console.error(err));
    case cycleTimeInjection:
      return qaApi
        .updateCycleTimeInjection(
          extraIdsArr[0],
          extraIdsArr[1],
          id,
          userInput.id,
          userInput
        )
        .catch((error) => {
          console.log("error", error);
        });
    case transmitterTransducerAccuracyData:
      return qaApi
        .updateTransmitterTransducerAccuracyDataRecord(
          location,
          id,
          userInput.id,
          userInput
        )
        .catch((err) => console.error(err));
    case flowToLoadReference:
      return qaApi
        .updateFlowToLoadReference(location, id, userInput.id, userInput)
        .catch((error) =>
          console.log("error updating flow to load reference", error)
        );
    case unitDefualtTest:
      return qaApi
        .updateUnitDefaultTest(location, id, userInput.id, userInput)
        .catch((err) => console.error(err));
    case unitDefaultTestRun:
      return qaApi
        .updateUnitDefaultTestRun(
          extraIdsArr[0],
          extraIdsArr[1],
          id,
          userInput.id,
          userInput
        )
        .catch((error) =>
          console.log("error updating unit default test run data", error)
        );
    case hgSummary:
      return qaApi
        .updateHgSummary(location, id, userInput.id, userInput)
        .catch((err) => console.error(err));
    case hgInjection:
      return qaApi
        .updateHgInjection(
          extraIdsArr[0],
          extraIdsArr[1],
          id,
          userInput.id,
          userInput
        )
        .catch((error) => console.log("error updating hg injection", error));

    // for some reason, id and userinput. id are identical in the url
    case qaCertEvent:
      return qaApi
        .updateQaCertEvents(id, userInput.id, userInput)
        .catch((error) => console.log("error updating QA cert events", error));
    case qaExeptions:
      return qaApi
        .updateTestExtension(id, userInput.id, userInput)
        .catch((error) =>
          console.log("error updating QA TEST EXCEPTIONS", error)
        );

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
        .createRataTraverse(
          extraIdsArr[0],
          extraIdsArr[1],
          extraIdsArr[2],
          extraIdsArr[3],
          extraIdsArr[4],
          id,
          userInput
        )
        .catch((error) =>
          console.log("error creating rata traverse data", error)
        );

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
      return qaApi.createAppendixECorrelationSummaryRecord(
        location,
        id,
        userInput
      );
    case fuelFlowToLoad:
      return qaApi
        .createFuelFlowToLoad(location, id, userInput)
        .catch((error) =>
          console.log("error creating fuel flow to load data", error)
        );
    case fuelFlowToLoadBaseline:
      return qaApi
        .createFuelFlowToLoadBaseline(location, id, userInput)
        .catch((error) =>
          console.log("error creating fuel flow to load baseline data", error)
        );
    case appendixECorrTestRun:
      return qaApi
        .createAppendixERun(extraIdsArr[0], extraIdsArr[1], id, userInput)
        .catch((error) => {
          console.log("error creating appendix e correlation test run", error);
        });
    case appendixECorrHeatInputGas:
      return qaApi
        .createAppendixEHeatInputGas(
          extraIdsArr[0],
          extraIdsArr[1],
          extraIdsArr[2],
          id,
          userInput
        )
        .catch((error) => {
          console.log(
            "error creating appendix e correlation heat input from gas",
            error
          );
        });
    case appendixECorrHeatInputOil:
      return qaApi
        .createAppendixEHeatInputOil(
          extraIdsArr[0],
          extraIdsArr[1],
          extraIdsArr[2],
          id,
          userInput
        )
        .catch((error) => {
          console.log(
            "error creating appendix e correlation heat input from oil",
            error
          );
        });
    case cycleTimeInjection:
      return qaApi.createCycleTimeInjection(
        extraIdsArr[0],
        extraIdsArr[1],
        id,
        userInput
      );
    case flowToLoadCheck:
      return qaApi.createFlowToLoadCheckRecord(location, id, userInput);
    case onlineOfflineCalibration:
      return qaApi.createOnlineOfflineCalibration(location, id, userInput);
    case calibrationInjections:
      return qaApi.createCalibrationInjectionRecord(location, id, userInput);
    case fuelFlowmeterAccuracyData:
      return qaApi.createFuelFlowmeterAccuracyDataRecord(
        location,
        id,
        userInput
      );
    case cycleTimeSummary:
      return qaApi.createCycleTimeSummary(location, id, userInput);
    case transmitterTransducerAccuracyData:
      return qaApi.createTransmitterTransducerAccuracyDataRecord(
        location,
        id,
        userInput
      );
    case flowToLoadReference:
      return qaApi.createFlowToLoadReference(location, id, userInput);
    case unitDefualtTest:
      return qaApi.createUnitDefaultTest(location, id, userInput);
    case unitDefaultTestRun:
      return qaApi.createUnitDefaultTestRun(
        extraIdsArr[0],
        extraIdsArr[1],
        id,
        userInput
      );
    case hgSummary:
      return qaApi.createHgSummary(location, id, userInput);
    case hgInjection:
      return qaApi.createHgInjection(
        extraIdsArr[0],
        extraIdsArr[1],
        id,
        userInput
      );
    case qaCertEvent:
      return qaApi.createQaCertEvents(location, userInput);
    case qaExeptions:
      return qaApi.createTestExtension(location, userInput);
    default:
      throw new Error(`createDataSwitch case not implemented for ${name}`);
  }
};
