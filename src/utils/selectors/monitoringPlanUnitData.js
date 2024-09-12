import { validateDate } from "../functions";

export const getMonitoringPlansUnitDataRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    const nonLoadBasedIndicator = (el.nonLoadBasedIndicator === 1 || el.nonLoadBasedIndicator === "1") ? "Yes" : "No";

    records.push({
      col1: el.id,
      col2: `${nonLoadBasedIndicator}`,
      col3: el.sourceCategoryCd,
      col4: validateDate(el.commOpDate),
      col5: validateDate(el.comrOpDate),
      col6: el.unitTypeCd,
      col7: el.opStatusCd,
      col8: validateDate(el.statusBeginDate),
      col9: el.id,
    });
  });

  return records;
};
