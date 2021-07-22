import { getActiveData, getInactiveData } from "./filter-data";

describe("filter-data functions", () => {
  const data = [{ active: false }, { active: true }];
  let createNew = false;
  it("returns an array of the active Data", () => {
    expect(getActiveData(data).length).toBe(1);
  });
  it("returns an array of the inactive Data", () => {
    expect(getInactiveData(data).length).toBe(1);
  });
});
