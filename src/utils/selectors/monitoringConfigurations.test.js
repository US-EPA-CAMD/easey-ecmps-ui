import * as fs from "./monitoringConfigurations";

describe("testing monitoring plan data selectors", () => {
  let selectedConfigurations;
  let configurationsTableRecods;

  beforeAll(() => {
    selectedConfigurations = [
      {
        id: "MDC-7C15B3D1B20542C3B54DD57F03A516E5",
        name: "110",
        locations: [{ id: "65", name: "110", type: "Unit", active: true }],
        active: false,
      },
      {
        id: "MDC-7C15B3D1B20542C3B54DD57F03A516E5",
        name: "110",
        locations: [{ id: "65", name: "110", type: "Unit", active: true }],
        active: true,
      },
    ];

    configurationsTableRecods = [
      {
        col1: "110",
        col2: "Inactive",
        col3: "MDC-7C15B3D1B20542C3B54DD57F03A516E5",
      },
      {
        col1: "110",
        col2: "Active",
        col3: "MDC-7C15B3D1B20542C3B54DD57F03A516E5",
      },
    ];
  });
  test("should generate data table records for monitoring configurations", () => {
    expect(fs.getConfigurationNames(selectedConfigurations)).toEqual(
      configurationsTableRecods
    );
  });
});
