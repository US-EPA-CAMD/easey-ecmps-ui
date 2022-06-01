import * as fs from "./monitoringPlanLocationAttributes";

describe("testing monitoring plan data selectors", () => {
  let selectedDataLocation;
  let monitoringDataTableRecodsLocation;
  let selectedDataRelationship;
  let monitoringDataTableRecodsRelationship;

  beforeAll(() => {
    selectedDataLocation = [
      {
        id: "MDC-B8C0FC059D434C1FB0878FF68505C406",
        locationId: "5",
        ductIndicator: "1",
        bypassIndicator: "1",
        groundElevation: "21",
        stackHeight: "600",
        materialCode: "OTHER",
        shapeCode: "RECT",
        crossAreaFlow: "600",
        crossAreaStackExit: "517",
        beginDate: "1995-01-01",
        endDate: "1995-01-01",
        userId: "elachut",
        addDate: "2009-02-20",
        updateDate: "2009-03-23",
        active: true,
        stackName: "test",
      },
      {
        id: "MDC-B8C0FC059D434C1FB0878FF68505C406",
        locationId: "5",
        ductIndicator: null,
        bypassIndicator: null,
        groundElevation: "21",
        stackHeight: "600",
        materialCode: "OTHER",
        shapeCode: "RECT",
        crossAreaFlow: "600",
        crossAreaStackExit: "517",
        beginDate: "",
        endDate: null,
        userId: "elachut",
        addDate: "2009-02-20",
        updateDate: "2009-03-23",
        active: true,
        stackName: "test",
      },
    ];

    monitoringDataTableRecodsLocation = [
      {
        col1: "Yes",
        col2: "Yes",
        col3: "21",
        col4: "600",
        col5: "OTHER",
        col6: "RECT",
        col7: "600",
        col8: "517",
        col9: "01/01/1995",
        col10: "01/01/1995",
        col11: "MDC-B8C0FC059D434C1FB0878FF68505C406",
      },
      {
        col1: "No",
        col2: "No",
        col3: "21",
        col4: "600",
        col5: "OTHER",
        col6: "RECT",
        col7: "600",
        col8: "517",
        col9: "",
        col10: "",
        col11: "MDC-B8C0FC059D434C1FB0878FF68505C406",
      },
    ];

    selectedDataRelationship = [
      {
        id: "CAMD-18DD175CE7EF4256B78469865D84F576",
        unitId: "1",
        stackName: "test",
        stackPipeId: "MDC-CCB8D6D0D4E34D24A99C01DCD14078DF",
        beginDate: "1995-01-01T00:00:00.000Z",
        endDate: "1995-01-01T00:00:00.000Z",
        userId: "PQA09Q1",
        addDate: "2009-02-20T14:57:04.000Z",
        updateDate: null,
        active: true,
      },
      {
        id: "CAMD-18DD175CE7EF4256B78469865D84F576",
        unitId: "1",
        stackName: "test",
        stackPipeId: "MDC-CCB8D6D0D4E34D24A99C01DCD14078DF",
        beginDate: null,
        endDate: null,
        userId: "PQA09Q1",
        addDate: "2009-02-20T14:57:04.000Z",
        updateDate: null,
        active: true,
      },
    ];
    monitoringDataTableRecodsRelationship = [
      {
        col1: "test",
        col2: "1",
        col3: "01/01/1995",
        col4: "01/01/1995",
        col5: "CAMD-18DD175CE7EF4256B78469865D84F576",
      },
      {
        col1: "test",
        col2: "1",
        col3: "",
        col4: "",
        col5: "CAMD-18DD175CE7EF4256B78469865D84F576",
      },
    ];
  });

  test("should generate table records for location data table", () => {
    expect(
      fs.getMonitoringPlansLocationAttributeRecords(selectedDataLocation)
    ).toEqual(monitoringDataTableRecodsLocation);
  });

  test("should generate table records for relationship data table", () => {
    expect(
      fs.getMonitoringPlansRelationshipsDataRecords(selectedDataRelationship)
    ).toEqual(monitoringDataTableRecodsRelationship);
  });
});
