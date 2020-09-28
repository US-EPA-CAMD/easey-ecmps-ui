import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getAllFacilities } from "./facilityApi";

const facilities = [
  { orisCode: 3, name: "Barry" },
  { orisCode: 8, name: "Gorgas" },
  { orisCode: 9, name: "Copper Station" },
];
const FACT_API_URL =
  "https://api.epa.gov/FACT/1.0/facilities?api_key=05h6CAooxu0vZpfPnAgGzsbB4nCRqdWKCkfo95rG";

test("Should fetch list of facilities from FACT API", async () => {
  const mock = new MockAdapter(axios);

  mock.onGet(FACT_API_URL).reply(200, {
    facilities: facilities,
  });

  const result = await getAllFacilities();
  expect(result.data.facilities).toEqual(facilities);
});
