export const getLinearitySummary = (totalData) => {
//   const data = totalData;
  const records = [];
  let data = [1,2];
  data.forEach((el) => {
    // const beginDate = el.beginDate
    //   ? formatStringToDate(el.beginDate.toString())
    //   : "";
    // const beginHour = el.beginHour ? el.beginHour.toString() : "";
    // const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : "";
    // const endHour = el.endHour ? el.endHour.toString() : "";
    records.push({
      col1: "Result",
      col2: "Result",
      col3: "Result",
      col4: "Result",
      col5: "Result",
      col6: "Result",
      col7: "Result",
    });
  });
  return records;
};

// year - month - day to  month / day/ year
const formatStringToDate = (date) => {
  const parts = date.split("-");

  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};
