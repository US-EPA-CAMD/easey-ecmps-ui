import { getAllFacilities, getFacilityById } from "./facilityApi";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import config from "../../config";

describe("testing facilities data fetching APIs", () => {
  let mock;
  let mockResponse;

  beforeAll(() => {
    mock = new MockAdapter(axios);
    mockResponse = {
      facilities: [
        { orisCode: 3, name: "Barry" },
        { orisCode: 8, name: "Gorgas" },
        { orisCode: 9, name: "Copper Station" },
      ],
    };
  });

  it("Should fetch list of facilities from FACT API", async () => {
    mock.onGet(`${config.services.facilities.uri}/workspace/facilities`).reply(200, mockResponse);

    delete window.location;
    window.location = new URL(`https://test.com/workspace/monitoring-plans`);

    const result = await getAllFacilities();

    expect(result["data"].facilities).toEqual(mockResponse.facilities);
  });

  it("Should get facility data from a specific facility ID", async () => {
    delete window.location;
    window.location = new URL(`https://test.com/monitoring-plans`);

    const id = 1;
    mock.onGet(`${config.services.facilities.uri}/facilities/${id}`).reply(200, mockResponse);

    const result = await getFacilityById(id);
    expect(result.data.facilities).toEqual(mockResponse.facilities);
  });
});
