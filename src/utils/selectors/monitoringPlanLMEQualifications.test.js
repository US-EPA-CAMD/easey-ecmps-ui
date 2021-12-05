import * as fs from "./monitoringPlanLMEQualifications";

describe("testing monitoring plan fuel data selectors", () => {
  let selectedData;
  let monitoringDataTableRecods;

  beforeAll(() => {
    selectedData = [
      {
        id: "NJCHQ7LAPA-AA1A78CFAA3641AA9AC5E6E7C20258D8",
        qualificationId: "NJCHQ7LAPA-FFD7C257EC904898B2CE3FF73CC7DC97",
        qualificationDataYear: "2013",
        operatingHours: "8",
        so2Tons: null,
        noxTons: "0.9",
        userId: "PYOUGH",
        addDate: "2014-07-09",
        updateDate: null,
      },
      {
        id: "NJCHQ7LAPA-21B2AFC8406F4F48B3AF89087213F947",
        qualificationId: "NJCHQ7LAPA-FFD7C257EC904898B2CE3FF73CC7DC97",
        qualificationDataYear: "2011",
        operatingHours: "10",
        so2Tons: null,
        noxTons: "1.2",
        userId: "PYOUGH",
        addDate: "2014-07-09",
        updateDate: null,
      },
      {
        id: "NJCHQ7LAPA-43DDE92E4B9E4E8BB12F04DB35F2F3B5",
        qualificationId: "NJCHQ7LAPA-FFD7C257EC904898B2CE3FF73CC7DC97",
        qualificationDataYear: "2012",
        operatingHours: "15",
        so2Tons: null,
        noxTons: "1.3",
        userId: "PYOUGH",
        addDate: "2014-07-09",
        updateDate: null,
      },
    ];
    monitoringDataTableRecods = [
      {
        col1: "2013",
        col2: "8",
        col3: null,
        col4: "0.9",
        col5: "NJCHQ7LAPA-AA1A78CFAA3641AA9AC5E6E7C20258D8",
      },
      {
        col1: "2011",
        col2: "10",
        col3: null,
        col4: "1.2",
        col5: "NJCHQ7LAPA-21B2AFC8406F4F48B3AF89087213F947",
      },
      {
        col1: "2012",
        col2: "15",
        col3: null,
        col4: "1.3",
        col5: "NJCHQ7LAPA-43DDE92E4B9E4E8BB12F04DB35F2F3B5",
      },
    ];
  });
  test("should generate table records for data table", () => {
    expect(fs.getMonitoringPlansLMEQualifications(selectedData)).toEqual(
      monitoringDataTableRecods
    );
  });
});
