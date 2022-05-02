import * as fs from "./monitoringPlanLEEQualifications";

describe("testing monitoring plan fuel data selectors", () => {
  let selectedData;
  let monitoringDataTableRecods;

  beforeAll(() => {
    selectedData = [
      {
        id: "MIKE-DELL-CFEDE4EB21124391BE13E7FB5A56081C",
        qualificationId: "MIKE-DELL-E4CE3931A24E4C1395B3C81457B300CC",
        qualificationTestDate: "2018-07-15",
        parameterCode: "HG",
        qualificationTestType: "INITIAL",
        potentialAnnualMassEmissions: "1",
        applicableEmissionStandard: "29.0000",
        unitsOfStandard: "LBGWH",
        percentageOfEmissionStandard: "72.8",
        userId: "moconnel",
        addDate: "2018-10-25",
        updateDate: null,
      },
      {
        id: "MIKE-DELL-CFEDE4EB21124391BE13E7FB5A56081C",
        qualificationId: null,
        qualificationTestDate: null,
        parameterCode: null,
        qualificationTestType: null,
        potentialAnnualMassEmissions: null,
        applicableEmissionStandard: null,
        unitsOfStandard: null,
        percentageOfEmissionStandard: null,
        userId: null,
        addDate: "2018-10-25",
        updateDate: null,
      },
    ];
    monitoringDataTableRecods = [
      {
        col1: "07/15/2018",
        col2: "HG",
        col3: "INITIAL",
        col4: "1",
        col5: "29.0000",
        col6: "LBGWH",
        col7: "72.8",
        col8: "MIKE-DELL-CFEDE4EB21124391BE13E7FB5A56081C",
      },
      {
        col1: "",
        col2: "",
        col3: "",
        col4: "",
        col5: "",
        col6: "",
        col7: "",
        col8: "MIKE-DELL-CFEDE4EB21124391BE13E7FB5A56081C",
      },
    ];
  });
  test("should generate table records for data table", () => {
    expect(fs.getMonitoringPlansLEEQualifications(selectedData)).toEqual(
      monitoringDataTableRecods
    );
  });
});
