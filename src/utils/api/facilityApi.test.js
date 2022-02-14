import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getAllFacilities, getFacilityById } from "./facilityApi";
import config from "../../config";

const facilities = [
  { orisCode: 3, name: "Barry" },
  { orisCode: 8, name: "Gorgas" },
  { orisCode: 9, name: "Copper Station" },
];

test("Should fetch list of facilities from FACT API", async () => {
  const mock = new MockAdapter(axios);

  mock.onGet(`${config.services.facilities.uri}/facilities`).reply(200, {
    facilities: facilities,
  });

  const result = await getAllFacilities();
  expect(result["data"].facilities).toEqual(facilities);
});

test("Should get facility data from a specific facility ID", async () => {
  const mock = new MockAdapter(axios);
  const facData = { data: { orisCode: 3, name: "Barry" } };
  const id = 1;

  mock.onGet(`${config.services.facilities.uri}/facilities/${id}`).reply(200, {
    data: { orisCode: 3, name: "Barry" },
  });

  const result = await getFacilityById(id);
  expect(result.data).toEqual(facData);
});
