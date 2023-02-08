import axios from "axios";
import { getAllFacilities, getFacilityById } from "./facilityApi";

const facilities = [
  { orisCode: 3, name: "Barry" },
  { orisCode: 8, name: "Gorgas" },
  { orisCode: 9, name: "Copper Station" },
];

jest.mock("axios");

test("Should fetch list of facilities from FACT API", async () => {
  axios.mockImplementation(() =>
    Promise.resolve({ status: 200, data: { facilities: facilities } })
  );

  const result = await getAllFacilities();

  expect(result["data"].facilities).toEqual(facilities);
});

test("Should get facility data from a specific facility ID", async () => {
  const facData = { data: { orisCode: 3, name: "Barry" } };
  const id = 1;

  axios.mockImplementation(() =>
    Promise.resolve({ status: 200, data: facData })
  );

  const result = await getFacilityById(id);
  expect(result.data).toEqual(facData);
});
