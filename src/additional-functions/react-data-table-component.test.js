import { normalizeRowObjectFormat } from "./react-data-table-component";

describe("normalizeRowObjectFormat functions", () => {
  const row = {
    col1: "Inactive",
    cells: [{ value: "Inactive", column: "Status" }],
  };

  const columns = ["Status"];

  it("finds value in an array with null paraeter", () => {
    expect(normalizeRowObjectFormat(row, columns).col1).toBe("Inactive");
  });
});
