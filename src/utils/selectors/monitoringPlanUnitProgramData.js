import { validateDate } from "../functions";

export const getMonitoringPlansUnitProgramDataRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {

    records.push({
      col1: el.programCode,
      col2: el.classCode,
      col3: validateDate(el.unitMonitorCertBeginDate),
      col4: validateDate(el.unitMonitorCertDeadline),
      col5: validateDate(el.emissionsRecordingBeginDate),
      col6: validateDate(el.endDate),
      col7: el.id,
    });
  });

  return records;
};
