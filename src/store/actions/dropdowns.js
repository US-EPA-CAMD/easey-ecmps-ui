import { beginMdmApiCall } from "./apiStatusActions";
import * as types from "./actionTypes";
import { UseRetrieveDropdownApi } from "../../additional-functions/retrieve-dropdown-api";

export function loadDropdownsSuccess(dropdowns, section, resolve) {
  return {
    type: types.LOAD_DROPDOWNS_SUCCESS,
    dropdowns: dropdowns,
    section: section,
    resolve: resolve,
  };
}

export function loadDropdowns(section, dropdownArray, resolve) {
  return (dispatch) => {
    dispatch(beginMdmApiCall(section));
    return UseRetrieveDropdownApi(
      dropdownArray[0],
      dropdownArray.length > 1 ? dropdownArray[1] : null
    ).then((dropdowns) => {
      dispatch(loadDropdownsSuccess(dropdowns, section, resolve));
    });
  };
}
