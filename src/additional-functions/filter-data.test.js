import { getActiveData, getInactiveData } from "./filter-data";

describe("filter-data functions", () => {
  const data = [
    { id: "true-1", active: true},
    { id: "false-1", active: false },
    { id: "true-2", active: true }
  ];

  it("Should return an array of the active data", () => {
    const activeData = getActiveData(data);
    expect(activeData.length).toBe(2);
    expect(activeData[0].id).toBe("true-1");
    expect(activeData[1].id).toBe("true-2");
  });

  it("Should return an array of the inactive data", () => {
    const inactiveData = getInactiveData(data)
    expect(inactiveData.length).toBe(1);
    expect(inactiveData[0].id).toBe("false-1");
  });
});
