import { beginMdmApiCall } from "./apiStatusActions";
import * as types from "./actionTypes";
import { UseRetrieveDropdownApi } from "../../additional-functions/retrieve-dropdown-api";
import { UNIT_CONTROLS_STORE_NAME } from "../../additional-functions/data-table-section-and-store-names.js";

export function loadDropdownsSuccess(dropdowns, section) {
  return {
    type: types.LOAD_DROPDOWNS_SUCCESS,
    dropdowns: dropdowns,
    section: section,
  };
}

export function loadDropdowns(section, dropdownArray) {
  let equipmentControlParameterFlag = false;
  if (section === UNIT_CONTROLS_STORE_NAME) {
    equipmentControlParameterFlag = true;
  }
  return (dispatch) => {
    dispatch(beginMdmApiCall(section));
    return UseRetrieveDropdownApi(
      dropdownArray[0],
      dropdownArray.length > 1 ? dropdownArray[1] : null,
      equipmentControlParameterFlag
    ).then((dropdowns) => {
      dispatch(loadDropdownsSuccess(dropdowns, section));
    });
  };
}
