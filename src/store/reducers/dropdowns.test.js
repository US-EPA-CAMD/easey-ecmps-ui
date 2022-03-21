import dropdownsReducer from "./dropdowns";
import * as actions from "../actions/dropdowns";
import * as types from "../actions/actionTypes";
it("tests a successful load dropdown call ", () => {
  // arrange
  const initialState = {
    dropdowns: {
      defaults: [],
    },
  };

  const dropdowns = {
    parameterCode: [
      {
        code: "",
        name: "-- Select a value --",
      },
    ],
  };

  const action = actions.loadDropdownsSuccess(dropdowns, "methods");

  // act
  const newState = dropdownsReducer(initialState, action);
  // assert
  expect(newState).toBeDefined();
});

it("tests the begin mdm api call ", () => {
  // arrange
  const initialState = {
    dropdowns: {
      defaults: [],
    },
  };
  // act
  const newState = dropdownsReducer(initialState, {
    type: types.BEGIN_MDM_API_CALL,
  });
  // assert
  expect(newState).toBeDefined();
});

it("tests a false reducer case ", () => {
  // arrange
  const initialState = {
    dropdowns: {
      defaults: [],
    },
  };
  // act
  const newState = dropdownsReducer(initialState, "false");
  // assert
  expect(newState).toBeDefined();
});

it("tests a false state variable conditional", () => {
  const newState = dropdownsReducer(false, "false");
  // assert
  expect(newState).toBeDefined();
});
