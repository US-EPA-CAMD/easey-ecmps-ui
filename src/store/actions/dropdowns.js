import { beginMdmApiCall } from "./apiStatusActions";
import * as types from "./actionTypes";
import { UseRetrieveDropdownApi } from "../../additional-functions/retrieve-dropdown-api";

export function getDropdownList(section) {
  let list = [];
  switch (section) {
    case "methods":
      list = [
        "parameterCode",
        "monitoringMethodCode",
        "substituteDataCode",
        "bypassApproachCode",
      ];
      break;
    default:
      break;
  }

  return list;
}

export function loadDropdownsSuccess(dropdowns, section) {
  return {
    type: types.LOAD_DROPDOWNS_SUCCESS,
    dropdowns: dropdowns,
    section: section,
  };
}

export function loadDropdowns(section) {
  return (dispatch) => {
    dispatch(beginMdmApiCall(section));
    return UseRetrieveDropdownApi(getDropdownList(section)).then(
      (dropdowns) => {
        dispatch(loadDropdownsSuccess(dropdowns, section));
      }
    );
  };
}
