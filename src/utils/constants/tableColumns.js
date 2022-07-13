export const qaTestSummaryCols = [
  {
    name: "Unit or StackPipe ID",
    selector: (row) => (row.unitId ? row.unitId : row.stackPipeId),
    sortable: true,
  },
  {
    name: "Component ID",
    selector: (row) => row.componentID,
    sortable: true,
  },
  {
    name: "Test Number",
    selector: (row) => row.testNumber,
    sortable: true,
  },
  {
    name: "Test Result Code",
    selector: (row) => row.testResultCode,
    sortable: true,
  },
  {
    name: "Begin Date",
    selector: (row) => row.beginDate,
    sortable: true,
  },
  {
    name: "Begin Hour",
    selector: (row) =>
      row.beginHour && row.beginMinute
        ? `${row.beginHour}:${row.beginMinute}`
        : "",
    sortable: true,
  },
  {
    name: "End Date",
    selector: (row) => row.endDate,
    sortable: true,
  },
  {
    name: "End Hour",
    selector: (row) =>
      row.endHour && row.endMinute ? `${row.endHour}:${row.endMinute}` : "",
    sortable: true,
  },
];
