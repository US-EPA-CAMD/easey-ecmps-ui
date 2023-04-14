import { validateDate } from "../functions";

export const getMonitoringPlansLEEQualifications = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    records.push({
      col1: validateDate(el.qualificationTestDate),
      col2: el.parameterCode ? el.parameterCode : "",
      col3: el.qualificationTestType ? el.qualificationTestType : "",
      col4: el.potentialAnnualMassEmissions
        ? el.potentialAnnualMassEmissions
        : "",
      col5: el.applicableEmissionStandard ? el.applicableEmissionStandard : "",
      col6: el.unitsOfStandard ? el.unitsOfStandard : "",
      col7: el.percentageOfEmissionStandard
        ? el.percentageOfEmissionStandard
        : "",
      col8: el.id,
    });
  });
  return records;
};
