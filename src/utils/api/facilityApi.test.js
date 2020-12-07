import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getAllFacilities } from "./facilityApi";
import config from "../../config";

const facilities = [
  { orisCode: 3, name: "Barry" },
  { orisCode: 8, name: "Gorgas" },
  { orisCode: 9, name: "Copper Station" },
];

test("Should fetch list of facilities from FACT API", async () => {
  const mock = new MockAdapter(axios);

  mock.onGet(config.services.facilities.uri).reply(200, {
    facilities: facilities,
  });

  const result = await getAllFacilities();
  expect(result.data.facilities).toEqual(facilities);
});
