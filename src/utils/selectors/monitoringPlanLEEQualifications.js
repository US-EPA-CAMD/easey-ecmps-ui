export const getMonitoringPlansLEEQualifications = (totalData) => {
    const data = totalData;
    const records = [];
   
    data.forEach((el) => {
      const testDate = el.qualificationTestDate ? formatStringToDate(el.qualificationTestDate.toString()) : "";
      records.push({ 
        col1: testDate,
        col2: el.parameterCode  ? el.parameterCode : "",
        col4: el.qualificationTestType  ? el.qualificationTestType : "",
        col3: el.potentialAnnualHgMassEmissions  ? el.potentialAnnualHgMassEmissions : "",
        col5: el.applicableEmissionStandard  ? el.applicableEmissionStandard : "",
        col6: el.unitsOfStandard ? el.unitsOfStandard : "",
        col7: el.percentageOfEmissionStandard ? el.percentageOfEmissionStandard : "",
        col8: el.id,
      });
    });
  
    return records;
  };
  // year - month - day to  month / day/ year
const formatStringToDate = (date) => {
  const parts = date.split("-");

  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};