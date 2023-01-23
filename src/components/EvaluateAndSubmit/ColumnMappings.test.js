import { formatDate } from "../../utils/functions";
import {
  sortByBeginDate,
  sortByUpdateDate,
  sortByEndDate,
  monPlanColumns,
  qaTestSummaryColumns,
  qaCertEventColumns,
  emissionsColumns,
  sortByPeriodAbbreviation,
  formatSubmissionWindow,
} from "./ColumnMappings";

describe("Test the sort functions of Column Mappings", () => {
  it("expect column mappings to be defined", () => {
    expect(monPlanColumns).toBeDefined();
    expect(qaTestSummaryColumns).toBeDefined();
    expect(qaCertEventColumns).toBeDefined();
    expect(emissionsColumns).toBeDefined();
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

  it("sortByPeriodAbbreviation", () => {
    let b = { periodAbbreviation: "2021 Q1" };
    let a = { periodAbbreviation: "2022 Q2" };
    expect(sortByPeriodAbbreviation(a, b) > 0).toBe(true);
  });

  it("sortByPeriodAbbreviation", () => {
    let b = { periodAbbreviation: "2021 Q2" };
    let a = { periodAbbreviation: "2020 Q1" };
    expect(sortByPeriodAbbreviation(a, b) > 0).toBe(false);
  });

  it("sortByPeriodAbbreviation", () => {
    let b = { periodAbbreviation: "2021 Q2" };
    let a = { periodAbbreviation: "2021 Q3" };
    expect(sortByPeriodAbbreviation(a, b) > 0).toBe(true);
  });
});

describe("format date", () => {
  it("should format date", () => {
    const dateString = "2022-10-25T12:14:29.997Z";
    const formattedDateString = "10-25-2022";
    const result = formatDate(dateString);
    expect(result).toEqual(formattedDateString);
  });
});

describe("Submission Window", () => {
  it('should return open if "REQUIRE"', () => {
    const window = "REQUIRE";
    const result = formatSubmissionWindow(window);
    expect(result).toEqual("Open");
  });
  it('should return open if "GRANTED"', () => {
    const window = "GRANTED";
    const result = formatSubmissionWindow(window);
    expect(result).toEqual("Open");
  });

  it("should return Closed", () => {
    const window = " ";
    const result = formatSubmissionWindow(window);
    expect(result).toEqual("Closed");
  });
});
