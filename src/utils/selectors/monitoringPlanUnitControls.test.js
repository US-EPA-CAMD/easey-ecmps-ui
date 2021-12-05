import * as fs from "./monitoringPlanUnitControls";

describe("testing unit controls data selectors", () => {
  let selectedUnitControls;
  let unitControlsTableRecords;
  beforeAll(() => {
    selectedUnitControls = [
      {
        id: "15829",
        unitId: "1",
        parameterCode: "NOX",
        controlCode: "SNCR",
        originalCode: "1",
        installDate: "2006-05-01",
        optimizationDate: "2006-05-01",
        seasonalControlsIndicator: "1",
        retireDate: "2006-05-01",
        userId: "PQA09Q1",
        addDate: "2009-02-20",
        updateDate: null,
        active: true,
      },
      {
        id: "15829",
        unitId: "1",
        parameterCode: "NOX",
        controlCode: "SNCR",
        originalCode: "0",
        installDate: null,
        optimizationDate: null,
        seasonalControlsIndicator: "0",
        retireDate: null,
        userId: "PQA09Q1",
        addDate: "2009-02-20",
        updateDate: null,
        active: true,
      },
    ];

    unitControlsTableRecords = [
      {
        col1: "NOX",
        col2: "SNCR",
        col3: "Yes",
        col4: "05/01/2006",
        col5: "05/01/2006",
        col6: "Yes",
        col7: "05/01/2006",
        col8: "15829",
      },
      {
        col1: "NOX",
        col2: "SNCR",
        col3: "No",
        col4: "",
        col5: "",
        col6: "No",
        col7: "",
        col8: "15829",
      },
    ];
  });

  test("should generate data table records for unit controls", () => {
    expect(
      fs.getMonitoringPlansUnitControlRecords(selectedUnitControls)
    ).toEqual(unitControlsTableRecords);
  });
});
