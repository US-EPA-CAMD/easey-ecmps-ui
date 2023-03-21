import { formatDateString } from "../functions";

export const getMonitoringPlansLocationAttributeRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    let ductIndicator;
    if (el.ductIndicator && el.ductIndicator === 1) {
      ductIndicator = "Yes";
    } else {
      ductIndicator = "No";
    }

    let bypassIndicator;
    if (el.bypassIndicator && el.bypassIndicator === 1) {
      bypassIndicator = "Yes";
    } else {
      bypassIndicator = "No";
    }

    const beginDate = formatDateString(el.beginDate);
    const endDate = formatDateString(el.endDate);
    records.push({
      col1: ductIndicator,
      col2: bypassIndicator,
      col3: el.groundElevation,
      col4: el.stackHeight,
      col5: el.materialCode,
      col6: el.shapeCode,
      col7: el.crossAreaFlow,
      col8: el.crossAreaStackExit,
      col9: `${beginDate}`,
      col10: `${endDate}`,
      col11: el.id,
    });
  });

  return records;
};

export const getMonitoringPlansRelationshipsDataRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    const beginDate = formatDateString(el.beginDate);
    const endDate = formatDateString(el.endDate);

    records.push({
      col1: el.stackPipeId,
      col2: el.unitId,
      col3: `${beginDate}`,
      col4: `${endDate}`,
      col5: el.id,
    });
  });
  return records;
};
