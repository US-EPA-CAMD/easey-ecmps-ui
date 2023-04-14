import * as fs from "./monitoringPlanQualifications";

describe("testing monitoring plan data selectors", () => {
  let selectedMonitoringQualifications;
  let monitoringQualificationsTableRecods;

  beforeAll(() => {
    selectedMonitoringQualifications = [
      {
        id: "CAMD-543ABF5EB72647E5A693F99BF24D2FB9",
        locationId: "60",
        qualificationTypeCode: "PK",
        beginDate: "2006-01-01",
        endDate: null,
        userId: "PQA09Q1",
        addDate: "2009-02-20",
        updateDate: null,
        active: true,
        leeQualifications: null,
        lmeQualifications: null,
        pctQualifications: null,
      },
      {
        id: "EP-CONTROL-3AC36B6D87C34A01A07097FC611F020C",
        locationId: "60",
        qualificationTypeCode: "GF",
        beginDate: null,
        endDate: "2009-01-01",
        userId: "RHamerni",
        addDate: "2009-09-21",
        updateDate: null,
        active: true,
        leeQualifications: null,
        lmeQualifications: null,
        pctQualifications: null,
      },
      {
        id: "EP-CONTROL-F9384183CDDF4104AEDEB1855D375ECD",
        locationId: "60",
        qualificationTypeCode: "PK",
        beginDate: "2000-01-01",
        endDate: "2005-12-31",
        userId: "RHamerni",
        addDate: "2009-09-21",
        updateDate: null,
        active: false,
        leeQualifications: null,
        lmeQualifications: null,
        pctQualifications: null,
      },
    ];

    monitoringQualificationsTableRecods = [
      {
        col1: "PK",
        col2: "2006-01-01",
        col3: "",
        col4: "CAMD-543ABF5EB72647E5A693F99BF24D2FB9",
      },
      {
        col1: "GF",
        col2: "",
        col3: "2009-01-01",
        col4: "EP-CONTROL-3AC36B6D87C34A01A07097FC611F020C",
      },
      {
        col1: "PK",
        col2: "2000-01-01",
        col3: "2005-12-31",
        col4: "EP-CONTROL-F9384183CDDF4104AEDEB1855D375ECD",
      },
    ];
  });
  test("should generate data table records for monitoring formulas", () => {
    expect(
      fs.getMonitoringPlansQualifications(selectedMonitoringQualifications)
    ).toEqual(monitoringQualificationsTableRecods);
  });
});
