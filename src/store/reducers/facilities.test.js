import facilitiesReducer from "./facilities";
import * as actions from "../actions/facilities";

it("should update state with list of facilities when passed LOAD_FACILITIES_SUCCESS", () => {
  // arrange
  const initialState = {
    facilities: [],
  };

  const facilities = [
    { orisCode: 3, name: "Barry" },
    { orisCode: 8, name: "Gorgas" },
    { orisCode: 9, name: "Copper Station" },
  ];

  const action = actions.loadFacilitiesSuccess(facilities);

  // act
  const newState = facilitiesReducer(initialState, action);
  // assert
  expect(newState.length).toEqual(3);
  expect(newState[0].name).toEqual("Barry");
});

it("passing in no action.type for default case", () => {
  const initialState = {
    facilities: [],
  };
  const newState = facilitiesReducer(initialState.apiCallsInProgress, {
    type: "",
  });
  expect(newState.length).toBe(0);
});

it("passing in no state", () => {
  const newState = facilitiesReducer(null, {
    type: "",
  });
  expect(newState.length).toBe(0);
});
