import React from "react";
export function getMonitoringPlansSystemsTableRecords(data) {
  const records = [];
  data.forEach((el) => {
    const beginDate = el.beginDate
      ? formateStringToDate(el.beginDate.toString())
      : "";
    const beginHour = el.beginHour ? el.beginHour.toString() : "";
    const endDate = el.endDate
      ? formateStringToDate(el.endDate.toString())
      : "";
    const endHour = el.endHour ? el.endHour.toString() : "";
    records.push({
      col1: el.systemIdentifier,
      col2: el.systemType,
      col3: el.systemDesignationCode,
      col4: el.fuelCode,
      col5: `${beginDate} ${beginHour}`,
      col6: `${endDate} ${endHour}`,
    });
  });
  return records;
}
// year - month - day to  month / day/ year
function formateStringToDate(date) {
  var parts = date.split("-");
  return parts[1] + "/" + parts[2] + "/" + parts[0];
}

export function getMonitoringPlansSystemsComponentsTableRecords(data) {
  const records = [];
  data.forEach((el) => {
    const beginDate = el.beginDate
      ? formateStringToDate(el.beginDate.toString())
      : "";
    const beginHour = el.beginHour ? el.beginHour.toString() : "";
    const endDate = el.endDate
      ? formateStringToDate(el.endDate.toString())
      : "";
    const endHour = el.endHour ? el.endHour.toString() : "";
    let present = false;
    if (endDate === "" || endDate === null) {
      present = "Present";
    } else {
      present = endDate + ": " + endHour;
    }
    records.push({
      col1: el.componentIdentifier,
      col2: el.componentTypeCode,
      col3: `${beginDate}: ${beginHour}` + " → " + `${present}`,
    });
  });
  return records;
}
const test = [
  {
    id: "TWCORNEL5-B3F1638CE0F340DDB9420113175A366C",
    monLocId: "5",
    componentTypeCode: "PRB",
    basisCode: null,
    modelVersion: "797 SAMPLER",
    manufacturer: "EPM",
    serialNumber: "P897",
    hgConverterInd: null,
    acquisitionMethodCode: "DIN",
    componentIdentifier: "PRB",
    beginDate: "2011-01-06",
    beginHour: "11",
    endDate: "2019-06-30",
    endHour: "23",
  },
  {
    id: "CAMD-D4D4D52C2C804279941E5520DFB78005",
    monLocId: "5",
    componentTypeCode: "SO2",
    basisCode: "W",
    modelVersion: "43I",
    manufacturer: "TECO",
    serialNumber: "613916835",
    hgConverterInd: null,
    acquisitionMethodCode: "DIN",
    componentIdentifier: "AA6",
    beginDate: "1993-10-01",
    beginHour: "0",
    endDate: "2019-06-30",
    endHour: "23",
  },
  {
    id: "CAMD-92272E148CCE4F3196C6A4D98B41F345",
    monLocId: "5",
    componentTypeCode: "PRB",
    basisCode: null,
    modelVersion: "797 SAMPLER",
    manufacturer: "EPM",
    serialNumber: "N404",
    hgConverterInd: null,
    acquisitionMethodCode: "DIN",
    componentIdentifier: "AAU",
    beginDate: "1993-10-01",
    beginHour: "0",
    endDate: "2011-01-06",
    endHour: "10",
  },
  {
    id: "CAMD-CA3D46E8801A474B93B0DA759EC18291",
    monLocId: "5",
    componentTypeCode: "DAHS",
    basisCode: null,
    modelVersion: "CEMS",
    manufacturer: "APCO",
    serialNumber: "101/201",
    hgConverterInd: null,
    acquisitionMethodCode: null,
    componentIdentifier: "XX2",
    beginDate: "1993-10-01",
    beginHour: "0",
    endDate: "2003-03-31",
    endHour: "23",
  },
  {
    id: "CAMD-F2A07EFA22274BC8B19A4F6EA641E881",
    monLocId: "5",
    componentTypeCode: "DAHS",
    basisCode: null,
    modelVersion: "CEMS",
    manufacturer: "APCO",
    serialNumber: null,
    hgConverterInd: null,
    acquisitionMethodCode: null,
    componentIdentifier: "XX4",
    beginDate: "2003-01-01",
    beginHour: "0",
    endDate: "2019-06-30",
    endHour: "23",
  },
];
