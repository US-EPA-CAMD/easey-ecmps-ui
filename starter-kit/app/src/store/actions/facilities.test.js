import { loadFacilities, loadFacilitiesSuccess } from "./facilities";
import * as types from "./actionTypes";
import axios from "axios";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

// Mocked facilities returned data
const facilities = [
  { orisCode: 3, name: "Barry" },
  { orisCode: 8, name: "Gorgas" },
  { orisCode: 9, name: "Copper Station" },
];
const FACT_API_URL =
  "https://api.epa.gov/FACT/1.0/facilities?api_key=05h6CAooxu0vZpfPnAgGzsbB4nCRqdWKCkfo95rG";

describe("Async Actions", () => {
  const mock = new MockAdapter(axios);
  afterEach(() => {
    mock.restore();
  });

  describe("Load Facilities Thunk", () => {
    it("should create BEGIN_FACILITIES_API_CALL and LOAD_FACILITIES_SUCCESS when loading facilities", () => {
      mock.onGet(FACT_API_URL).reply(200, {
        data: facilities,
      });
      const expectedActions = [
        { type: types.BEGIN_FACILITIES_API_CALL },
        { type: types.LOAD_FACILITIES_SUCCESS, facilities },
      ];

      const store = mockStore({ facilities: [] });
      return store.dispatch(loadFacilities()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("load facilities success", () => {
  it("should create a LOAD FACILITIES SUCCESS action", () => {
    const expectedAction = {
      type: types.LOAD_FACILITIES_SUCCESS,
      facilities,
    };

    const action = loadFacilitiesSuccess(facilities);

    expect(action).toEqual(expectedAction);
  });
});
