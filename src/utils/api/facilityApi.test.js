import { getAllFacilities, getFacilityById } from "./facilityApi";

jest.mock("./easeyAuthApi", () => ({
  secureAxios: jest.fn().mockResolvedValue({
    status: 200,
    data: {
      facilities: [
        { orisCode: 3, name: "Barry" },
        { orisCode: 8, name: "Gorgas" },
        { orisCode: 9, name: "Copper Station" },
      ],
    },
  }),
}));

describe("testing facilities data fetching APIs", () => {
  test("Should fetch list of facilities from FACT API", async () => {
    const result = await getAllFacilities();

    expect(result["data"].facilities).toEqual([
      { orisCode: 3, name: "Barry" },
      { orisCode: 8, name: "Gorgas" },
      { orisCode: 9, name: "Copper Station" },
    ]);
  });

  test("Should get facility data from a specific facility ID", async () => {
    const id = 1;

    const result = await getFacilityById(id);
    expect(result.data.facilities).toEqual([
      { name: "Barry", orisCode: 3 },
      { name: "Gorgas", orisCode: 8 },
      { name: "Copper Station", orisCode: 9 },
    ]);
  });
});
