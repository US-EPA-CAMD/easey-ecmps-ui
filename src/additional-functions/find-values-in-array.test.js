import { findValue, adjustDate } from "./find-values-in-array";

describe("findValue functions", () => {
  it("finds value in an array", () => {
    expect(findValue([{ code: "test1", name: "test2" }], "test1", "name")).toBe(
      "test2"
    );
  });

  it("finds value in an array with null paraeter", () => {
    expect(findValue([{ code: "test1", name: "test2" }], null, "name")).toBe(
      ""
    );
  });

  it("returns first option if nothing was found", () => {
    expect(findValue([{ code: "test1", name: "test2" }], "test3", "name")).toBe(
      "test2"
    );
  });
});

describe("adjustDate functions", () => {
  const date = "1111-01-01";
  it("mm/dd/yyyy", () => {
    expect(adjustDate("mm/dd/yyyy", date)).toBe("1/1/1111");
  });

  it("dd/mm/yyyy", () => {
    expect(adjustDate("dd/mm/yyyy", date)).toBe("01/01/1111");
  });

  it("yyyy/mm/dd", () => {
    expect(adjustDate("yyyy/mm/dd", date)).toBe("1111/01/01");
  });
  it("yyyy/dd/mm", () => {
    expect(adjustDate("yyyy/dd/mm", date)).toBe("1111/01/01");
  });
  it("mm-dd-yyyy", () => {
    expect(adjustDate("mm-dd-yyyy", date)).toBe("01-01-1111");
  });

  it("dd-mm-yyyy", () => {
    expect(adjustDate("dd-mm-yyyy", date)).toBe("01-01-1111");
  });

  it("yyyy-mm-dd", () => {
    expect(adjustDate("yyyy-mm-dd", date)).toBe("1111-01-01");
  });
  it("yyyy-dd-mm", () => {
    expect(adjustDate("yyyy-dd-mm", date)).toBe("1111-01-01");
  });
  it("default switch", () => {
    expect(adjustDate("skip", date)).toBe(date);
  });

  it("null", () => {
    expect(adjustDate("skip", null)).toBe("");
  });
});
