import * as fs from "./monitoringPlanDefaults";

describe("testing monitoring plan data selectors", () => {
  let selectedMonitoringDefaults;
  let monitoringDefaultsTableRecods;

  beforeAll(() => {
    selectedMonitoringDefaults = [
      {
        id: "TWCORNEL5-7C3E827D67CF418E84CC948BEB75B3A2",
        locationId: "5",
        parameterCode: "CO2N",
        defaultValue: "5.0000",
        defaultUnitsOfMeasureCode: "PCT",
        defaultPurposeCode: "DC",
        fuelCode: "NFS",
        operatingConditionCode: "A",
        defaultSourceCode: "DEF",
        groupId: null,
        beginDate: "1995-01-01",
        beginHour: "0",
        endDate: "1995-01-01",
        endHour:  "0",
        userId: "elachut",
        addDate: "2009-03-23",
        updateDate: null,
        active: true,
      },
      {
        id: "CAMD-E86CD02DFD9F417D8F8CA029A11DEE0B",
        locationId: "5",
        parameterCode: "NORX",
        defaultValue: "1.6900",
        defaultUnitsOfMeasureCode: "LBMMBTU",
        defaultPurposeCode: "MD",
        fuelCode: "NFS",
        operatingConditionCode: "A",
        defaultSourceCode: "DATA",
        groupId: null,
        beginDate: "2001-02-26",
        beginHour: "16",
        endDate: null,
        endHour: null,
        userId: "PQA09Q1",
        addDate: "2009-02-20",
        updateDate: null,
        active: true,
      },
      {
        id: "CAMD-E86CD02DFD9F417D8F8CA029A11DEE0B",
        locationId: "5",
        parameterCode: "NORX",
        defaultValue: "1.6900",
        defaultUnitsOfMeasureCode: "LBMMBTU",
        defaultPurposeCode: "MD",
        fuelCode: "NFS",
        operatingConditionCode: "A",
        defaultSourceCode: "DATA",
        groupId: null,
        beginDate: null,
        beginHour: null,
        endDate: "2001-02-26",
        endHour:  "16",
        userId: "PQA09Q1",
        addDate: "2009-02-20",
        updateDate: null,
        active: true,
      },
    ];

    monitoringDefaultsTableRecods = [
      {
        col1: "CO2N",
        col2: "PCT",
        col3: "DC",
        col4: "NFS",
        col5: "A",
        col6: "DEF",
        col7: "01/01/1995 0",
        col8: "01/01/1995 0",
        col9: "TWCORNEL5-7C3E827D67CF418E84CC948BEB75B3A2",
      },
      {
        col1: "NORX",
        col2: "LBMMBTU",
        col3: "MD",
        col4: "NFS",
        col5: "A",
        col6: "DATA",
        col7: "02/26/2001 16",
        col8: " ",
        col9: "CAMD-E86CD02DFD9F417D8F8CA029A11DEE0B",
      },
      {
        col1: "NORX",
        col2: "LBMMBTU",
        col3: "MD",
        col4: "NFS",
        col5: "A",
        col6: "DATA",
        col7: " ",
        col8: "02/26/2001 16",
        col9: "CAMD-E86CD02DFD9F417D8F8CA029A11DEE0B",
      },
    ];
  });
  test("should generate data table records for monitoring defaults", () => {
    expect(
      fs.getMonitoringPlansDefaultsTableRecords(selectedMonitoringDefaults)
    ).toEqual(monitoringDefaultsTableRecods);
  });
});
