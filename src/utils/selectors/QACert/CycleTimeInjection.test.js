import * as fs from "./CycleTimeInjection"

describe("testing Cycle Time Injection data selectors", () => {
  let selectedData;
  let tableRecords;

  beforeAll(() => {
    selectedData = [
      {
        id: "ab681a06-0fd9-4d30-a208-421bcd62a554",
        gasLevelCode: "HIGH",
        calibrationGasValue: 1.000,
        beginDate: "2008/10/14",
        beginHour: 4,
        beginMinute: 6,
        endDate: "2008/10/14",
        endHour: 8,
        endMinute: 10,
        injectionCycleTime: 12,
        beginMonitorValue: 0.000,
        endMonitorValue: 400.678
      },
    ];

    tableRecords = [
      { id: 'ab681a06-0fd9-4d30-a208-421bcd62a554', col1: "HIGH", col2: 1.000, col3: "10/14/2008", col4: 4, col5: 6, col6: "10/14/2008", col7: 8, col8: 10, col9: 12, col10: 0.000, col11: 400.678,},
    ];
  });
  test("should generate data table records", () => {
    expect(fs.mapCycleTimeInjectionsToRows(selectedData)).toEqual(tableRecords);
  });
});