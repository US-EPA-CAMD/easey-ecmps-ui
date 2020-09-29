import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getAllFacilities } from "./facilityApi";

var mock = new MockAdapter(axios);

test("Should fetch all facilities from FACT API", async () => {
  const respLength = 1760;
  mock.onGet("/facilities").reply(200, {
    facilitesLength: respLength,
  });

  const result = await getAllFacilities();

  expect(result.data.data.length).toEqual(respLength);
});
