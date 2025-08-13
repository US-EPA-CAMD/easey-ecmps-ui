export const getMonitoringPlansCommentsTableRecords = (data) => {
  const records = [];

  data.forEach((el) => {
    records.push({
      col1: el?.monitoringPlanComment,
      col2: el?.beginDate,
      col3: el?.endDate,
      col4: el?.id
    });
  });

  return records;
};
