export const getTestSummary = (data) => {
  const records = [];
  //   let data = [1, 2];
  data.forEach((el) => {
    const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : "";
    const endHour = el.endHour ? el.endHour.toString() : "";

    const endMinute = el.endMinute ? el.endMinute.toString() : "";
    records.push({
      col1:
        el.stackPipeId !== null
          ? el.stackPipeId
          : el.unitId !== null
          ? el.unitId
          : "",
      col2: el.componentId,
      col3: el.testNumber,
      col4: el.testReasonCode,
      col5: el.testResultCode,
      col6: endDate,
      col7: endHour,
      col8: endMinute,
    });
  });
  return records;
};

// year - month - day to  month / day/ year
const formatStringToDate = (date) => {
  const parts = date.split("-");

  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};
