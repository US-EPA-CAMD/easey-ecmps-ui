import * as fs from "./monitoringPlanUnitControls";

describe("testing unit controls data selectors", () => {
  let selectedUnitControls;
  let unitControlsTableRecords;
  beforeAll(() => {
    selectedUnitControls = [
      {
        parameterCode: "NOX",
        controlCode: "SNCR",
        originalCode: "0",
        installDate: "2006-05-01",
        optimizationDate: undefined,
        seasonalControlsIndicator: "0",
        retireDate: undefined,
        id: "CAMD-9FC097418E8D4A7D8841478FDFA6C46A",
      },
      {
        parameterCode: "NOX",
        controlCode: "LNC1",
        originalCode: "0",
        installDate: "2002-11-08",
        optimizationDate: undefined,
        seasonalControlsIndicator: "0",
        retireDate: undefined,
        id: "CAMD-9FC097418E8D4A7D8841478FDFA6C46B",
      },
    ];

    unitControlsTableRecords = [
      {
        col1: "NOX",
        col2: "SNCR",
        col3: "No",
        col4: "05/01/2006",
        col5: "",
        col6: "No",
        col7: "",
        col8: "CAMD-9FC097418E8D4A7D8841478FDFA6C46A",
      },
      {
        col1: "NOX",
        col2: "LNC1",
        col3: "No",
        col4: "11/08/2002",
        col5: "",
        col6: "No",
        col7: "",
        col8: "CAMD-9FC097418E8D4A7D8841478FDFA6C46B",
      },
    ];
  });

  test("should generate data table records for unit controls", () => {
    expect(
      fs.getMonitoringPlansUnitControlRecords(selectedUnitControls)
    ).toEqual(unitControlsTableRecords);
  });
});
