import { validateDate } from "../functions";

export const getMonitoringPlansCPMSQualifications = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    records.push({
      col1: validateDate(el.qualificationTestDate),
      col2: el.stackTestNumber ? el.stackTestNumber : "",
      col3: el.operatingLimit ? el.operatingLimit : "",

      col8: el.id,
    });
  });
  return records;
};
