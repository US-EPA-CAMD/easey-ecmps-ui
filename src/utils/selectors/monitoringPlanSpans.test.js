import * as fs from "./monitoringPlanSpans";

describe("testing monitoring plan fuel data selectors", () => {
  let selectedData;
  let monitoringDataTableRecods;

  beforeAll(() => {
    selectedData = [
      {
        id: "TWCORNEL5-61DC7F93F3D84DD2B9A7CE94C5A9C185",
        locationId: "5",
        componentTypeCode: "NOX",
        spanScaleCode: "H",
        spanMethodCode: "HD",
        mecValue: "46.0",
        mpcValue: "64.0",
        mpfValue: null,
        spanValue: "80.000",
        fullScaleRange: "80.000",
        spanUnitsOfMeasureCode: "PPM",
        scaleTransitionPoint: null,
        defaultHighRange: null,
        flowSpanValue: null,
        flowFullScaleRange: null,
        beginDate: "2017-09-20",
        beginHour: "13",
        endDate: "2017-09-20",
        endHour: "13",
        userid: "bvick",
        addDate: "2017-10-23",
        updateDate: null,
        active: true,
      },
      {
        id: "TWCORNEL5-88E25998894F4859B9D03C49E8CBD66D",
        locationId: "5",
        componentTypeCode: "CO2",
        spanScaleCode: "H",
        spanMethodCode: "HD",
        mecValue: null,
        mpcValue: "8.0",
        mpfValue: null,
        spanValue: "10.000",
        fullScaleRange: "10.000",
        spanUnitsOfMeasureCode: "PCT",
        scaleTransitionPoint: null,
        defaultHighRange: null,
        flowSpanValue: null,
        flowFullScaleRange: null,
        beginDate: null,
        beginHour: null,
        endDate: null,
        endHour: null,
        userid: "bvick",
        addDate: "2017-10-23",
        updateDate: null,
        active: true,
      },
    ];

    monitoringDataTableRecods = [
      {
        col1: "NOX",
        col2: "H",
        col3: "HD",
        col4: "PPM",
        col5: "2017/09/20 13",
        col6: "2017/09/20 13",
        col7: "TWCORNEL5-61DC7F93F3D84DD2B9A7CE94C5A9C185",
      },
      {
        col1: "CO2",
        col2: "H",
        col3: "HD",
        col4: "PCT",
        col5: "",
        col6: "",
        col7: "TWCORNEL5-88E25998894F4859B9D03C49E8CBD66D",
      },
    ];
  });
  test("should generate table records for data table", () => {
    expect(fs.getMonitoringPlansSpansTableRecords(selectedData)).toEqual(
      monitoringDataTableRecods
    );
  });
});
