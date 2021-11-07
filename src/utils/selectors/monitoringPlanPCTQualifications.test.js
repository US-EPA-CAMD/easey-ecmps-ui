import * as fs from "./monitoringPlanPCTQualifications";

describe("testing monitoring plan data selectors", () => {
  let selectedMonitoringPCTQualifications;
  let monitoringPCTQualificationRecords;

  beforeAll(() => {
    selectedMonitoringPCTQualifications = [
      {
        id: "DPGLISSO9-635AF13C866142E6A5CF72782D274618",
        qualificationId: "DPGLISSO9-EB4EDE87B8294FBC86FED070BA25E9E8",
        qualificationYear: "2013",
        averagePercentValue: "0.9",
        yr1QualificationDataYear: "2010",
        yr1QualificationDataTypeCode: "A",
        yr1PercentageValue: "1.1",
        yr2QualificationDataYear: "2011",
        yr2QualificationDataTypeCode: "A",
        yr2PercentageValue: "1.6",
        yr3QualificationDataYear: "2012",
        yr3QualificationDataTypeCode: "A",
        yr3PercentageValue: "0.0",
        userId: "phh",
        addDate: "2013-04-16",
        updateDate: null,
      },
    ];

    monitoringPCTQualificationRecords = [
      {
        col1: "2013",
        col2: "0.9",
        col3: "2010",
        col4: "2011",
        col5: "2012",
        col6: "DPGLISSO9-635AF13C866142E6A5CF72782D274618",
      },
    ];
  });
  test("should generate data table records for monitoring formulas", () => {
    expect(
      fs.getMonitoringPlansPCTQualifications(
        selectedMonitoringPCTQualifications
      )
    ).toEqual(monitoringPCTQualificationRecords);
  });
});
