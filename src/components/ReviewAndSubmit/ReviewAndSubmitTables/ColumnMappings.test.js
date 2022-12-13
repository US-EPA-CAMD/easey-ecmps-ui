import {
  sortByBeginDate,
  sortByUpdateDate,
  sortByEndDate,
  monPlanColumns,
  qaTestSummaryColumns,
} from "./ColumnMappings";

describe("Test the sort functions of Column Mappings", () => {
  it("expect column mappings to be defined", () => {
    expect(monPlanColumns).toBeDefined();
    expect(qaTestSummaryColumns).toBeDefined();
  });

  it("sortByUpdatenDate", () => {
    let a = { updateDate: "2021-01-01" };
    let b = { updateDate: "2020-01-01" };
    expect(sortByUpdateDate(a, b) < 0).toBe(false);
  });

  it("sortByUpdatenDate", () => {
    let a = { updateDate: "2020-01-01" };
    let b = { updateDate: "2021-01-01" };
    expect(sortByUpdateDate(a, b) < 0).toBe(true);
  });

  it("sortByEndDate", () => {
    let a = { endDate: "2020-01-01" };
    let b = { endDate: "2021-01-01" };
    expect(sortByEndDate(a, b) < 0).toBe(true);
  });

  it("sortByEndDate", () => {
    let a = { endDate: "N/A" };
    let b = { endDate: "2021-01-01" };
    expect(sortByEndDate(a, b) < 0).toBe(true);
  });

  it("sortByEndDate", () => {
    let b = { endDate: "N/A" };
    let a = { endDate: "2021-01-01" };
    expect(sortByEndDate(a, b) < 0).toBe(false);
  });

  it("sortByBeginDate", () => {
    let a = { beginDate: "2020-01-01" };
    let b = { beginDate: "2021-01-01" };
    expect(sortByBeginDate(a, b) < 0).toBe(true);
  });

  it("sortByBeginDate", () => {
    let a = { beginDate: "N/A" };
    let b = { beginDate: "2021-01-01" };
    expect(sortByBeginDate(a, b) < 0).toBe(true);
  });

  it("sortByBeginDate", () => {
    let b = { beginDate: "N/A" };
    let a = { beginDate: "2021-01-01" };
    expect(sortByBeginDate(a, b) < 0).toBe(false);
  });
});
