import { loadFacilities, loadFacilitiesSuccess } from "./facilities";
import * as types from "./actionTypes";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { getFacilitiesFromMDM } from "../../mocks/functions";
import * as facilitiesApi from "../../utils/api/facilityApi";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Facility Async Actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should create BEGIN_FACILITIES_API_CALL and LOAD_FACILITIES_SUCCESS when loading facilities", () => {
    const mockFacilities = getFacilitiesFromMDM();
    const mockFacilitiesResponse = jest
      .fn()
      .mockResolvedValue({ data: mockFacilities });
    jest
      .spyOn(facilitiesApi, "getAllFacilities")
      .mockImplementation(mockFacilitiesResponse);
    const expectedActions = [
      { type: types.BEGIN_FACILITIES_API_CALL },
      { type: types.LOAD_FACILITIES_SUCCESS, facilities: mockFacilities },
    ];

    const store = mockStore({ facilities: [] });
    return loadFacilities(store.dispatch).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should create a LOAD FACILITIES SUCCESS action", () => {
    const mockFacilities = getFacilitiesFromMDM();
    const expectedAction = {
      type: types.LOAD_FACILITIES_SUCCESS,
      facilities: mockFacilities,
    };

    const action = loadFacilitiesSuccess(mockFacilities);
    expect(action).toEqual(expectedAction);
  });
});
