export const getMockExportTablesContainerProps = () => {
  const props = {
    selectionData: { beginDate: "1/1/11", endDate: "1/1/11" },
    selectedConfig: {
      locations: [{ unitId: "51", type: "unitId", stackPipeId: null }],
    },
    exportState: {},
    setExportState: jest.fn(),
    workspaceSection: "workspacesection",
    orisCode: "3776",
    dataRef: {},
    tableTitle: "Test Summary",
    dataKey: "testSummaryData",
  };
  return props;
}
