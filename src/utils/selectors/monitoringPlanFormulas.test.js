import * as fs from "./monitoringPlanFormulas";

describe("testing monitoring plan data selectors", () => {
  let selectedMonitoringFormulas;
  let monitoringFormulasTableRecods;

  beforeAll(() => {
    selectedMonitoringFormulas = [
      {
        id: "TWCORNEL5-2B4684083C004FF1B34820C795A55464",
        locationId: "6",
        parameterCode: "HI",
        formulaCode: "F-20",
        formulaId: "AZG",
        beginDate: "2019-07-01",
        beginHour: "0",
        endDate: "2019-07-01",
        endHour: "0",
        formulaText: null,
        userId: "bvick",
        addDate: "2019-10-07",
        updateDate: null,
        active: true,
      },
      {
        id: "TWCORNEL5-80F48AB52FC948A08E99030D307B6A26",
        locationId: "6",
        parameterCode: "SO2",
        formulaCode: "D-5",
        formulaId: "AZH",
        beginDate: null,
        beginHour: null,
        endDate: null,
        endHour: null,
        formulaText: null,
        userId: "bvick",
        addDate: "2019-10-07",
        updateDate: null,
        active: true,
      },
    ];

    monitoringFormulasTableRecods = [
      {
        col1: "AZG",
        col2: "HI",
        col3: "F-20",
        col4: null,
        col5: "2019/07/01 00",
        col6: "2019/07/01 00",
        col7: "TWCORNEL5-2B4684083C004FF1B34820C795A55464",
      },
      {
        col1: "AZH",
        col2: "SO2",
        col3: "D-5",
        col4: null,
        col5: "",
        col6: "",
        col7: "TWCORNEL5-80F48AB52FC948A08E99030D307B6A26",
      },
    ];
  });
  test("should generate data table records for monitoring formulas", () => {
    expect(
      fs.getMonitoringPlansFormulasTableRecords(selectedMonitoringFormulas)
    ).toEqual(monitoringFormulasTableRecods);
  });
});
