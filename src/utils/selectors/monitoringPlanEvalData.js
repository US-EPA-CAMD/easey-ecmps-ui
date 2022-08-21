import React from "react";

export const getQAEvalData = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    records.push({
      col1: el.unitStackInformation,
      col2: el.testTypeCode,
      col3: el.testNumber,
      col4: el.beginPeriod,
      col5: el.endPeriod,
      col6: el.componentId,
      col7: el.systemId,
      col8: el.severityCode,
      col9: formatCategoryDescription(el.categoryCodeDescription),
      col10: (
        <span className="text-informational">
          <u>{el.checkCode}</u>
        </span>
      ),
      col11: el.resultMessage,
    });
  });

  return records;
};

export const getMonitoringPlansEvalData = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    records.push({
      col1: el.unitStackInformation,
      col2: el.severityCode,
      col3: formatCategoryDescription(el.categoryCodeDescription),
      col4: (
        <span className="text-informational">
          <u>{el.checkCode}</u>
        </span>
      ),
      col5: el.resultMessage,
    });
  });

  return records;
};

//REMOVED leading - and spaces that may come from the DB
const formatCategoryDescription = (str) => {
  while (str.indexOf("-") === 0 || str.indexOf(" ") === 0) {
    str = str.substring(1);
  }
  return str;
};
