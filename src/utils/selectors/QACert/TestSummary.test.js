import * as fs from "./TestSummary";

describe("testing LinearityInjection data selectors", () => {
  let selectedData;
  let tableRecords;

  beforeAll(() => {
    selectedData = [
      {
        id: "ab681a06-0fd9-4d30-a208-421bcd62a554",
        linSumId: "668a63e8-6491-4d13-9594-e0e4ad830b82",
        injectionDate: "2022-08-01",
        injectionHour: 9,
        injectionMinute: 9,
        measuredValue: 1.001,
        referenceValue: 1,
      },
    ];

    tableRecords = [
      { col1: "08/01/2022", col2: 7, col3: 7, col4: 1.1, col5: 1 },
    ];
  });
  test("should generate data table records", () => {
    expect(fs.getLinearityInjection(selectedData)).toEqual(tableRecords);
  });
});
