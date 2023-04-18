import { getMdmData as getMatchData } from "../../../utils/api/errorSuppressionApi";
import { getMonitoringPlans } from "../../../utils/api/monitoringPlansApi";
import { getQATestSummary } from "../../../utils/api/qaCertificationsAPI";

// The mdm api returns a data that looks different for each Data Type Code.
// The below function maps the correct description and code field for a
// Data Type Code
export const getMatchDataFieldNames = (dataTypeCode) => {
  let descriptionField;
  let codeField;

  switch (dataTypeCode) {
    case "CEPARAM":
      descriptionField = "controlEquipParamDescription";
      codeField = "controlEquipParamCode";
      break;
    case "COMPTYP":
      descriptionField = "componentTypeDescription";
      codeField = "componentTypeCode";
      break;
    case "FUELTYP":
      descriptionField = "fuelTypeDescription";
      codeField = "fuelTypeCode";
      break;
    case "PROGRAM":
      descriptionField = "programDescription";
      codeField = "programCode";
      break;
    case "QUALTYP":
      descriptionField = "qualificationTypeDescription";
      codeField = "qualificationTypeCode";
      break;
    case "SYSTYP":
      descriptionField = "systemTypeDescription";
      codeField = "systemTypeCode";
      break;
    case "TESTTYP":
      descriptionField = "testTypeDescription";
      codeField = "testTypeCode";
      break;
    case "MATSPAR":
      descriptionField = "matsMethodParameterDescription";
      codeField = "matsMethodParameterCode";
      break;
    case "PARAM":
      descriptionField = "parameterDescription";
      codeField = "parameterCode";
      break;
    case "MONPLAN":
      descriptionField = "name";
      codeField = "id";
      break;
    case "TESTNUM":
      descriptionField = "testNumber";
      codeField = "testNumber";
      break;

    default:
      break;
  }

  return [codeField, descriptionField];
};

// Returns an array of objects which are used in the jsx to construct the match data type dropdowns.
// The shape of the return looks like: [{"label":"option text", "value":"option value"},...]
export const createMatchTypeDropdownLists = async (
  checkCatalogResult,
  orisCode,
  locations = []
) => {
  const { dataTypeCode, dataTypeUrl, checkTypeCode, checkNumber } =
    checkCatalogResult;

  // sanity check
  if (
    !checkCatalogResult ||
    !dataTypeUrl ||
    !dataTypeCode ||
    !checkTypeCode ||
    !checkNumber
  ) {
    return [];
  }

  const [codeField, descriptionField] = getMatchDataFieldNames(dataTypeCode);
  // sanity check
  if (!codeField || !descriptionField) return [];

  const processPromiseData = (data) => {
    if (!data) return [];
    // SPECIAL CASE - see case for PARAM in ticket 4621
    if (dataTypeCode === "PARAM") {
      data = data.filter(
        (d) =>
          d.checkTypeCode === checkTypeCode && d.checkNumber === checkNumber
      );
    }

    // The following creates a unique list of objects so something like [{label:1, value:1}, {label:1, value:1}] would become [{label:1, value:1}]
    const objStrList = data
      .map((d) => ({
        label: d[descriptionField],
        value: d[codeField],
      }))
      .map((r) => JSON.stringify(r));

    return Array.from(new Set(objStrList)).map((r) => JSON.parse(r));
  };

  // SPECIAL CASE - see case for MONPLAN in ticket 4621
  if (dataTypeCode === "MONPLAN") {
    if (!orisCode) return [];

    try {
      const { data } = await getMonitoringPlans([orisCode], [], true);
      return processPromiseData(data);
    } catch (e) {
      console.error(e);
      return [];
    }
  }
  // SPECIAL CASE - see case for TESTNUM in ticket 4621
  else if (dataTypeCode === "TESTNUM") {
    if (locations.length === 0) {
      return [];
    }

    const promiseList = [];

    locations.forEach((l) => {
      promiseList.push(getQATestSummary(l, null, null, null, true));
    });

    try {
      const responses = await Promise.all(promiseList);
      const data = responses.map(({ data }) => data).flat();
      return processPromiseData(data);
    } catch (e) {
      console.error(e);
      return [];
    }
  } else {
    const path = dataTypeUrl.split("/").slice(2).join();

    try {
      const { data } = await getMatchData(path);
      return processPromiseData(data);
    } catch (e) {
      console.error(e);
      return [];
    }
  }
};
