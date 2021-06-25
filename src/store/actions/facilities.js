import * as facilitiesApi from "../../utils/api/facilityApi";
import { beginFacilitiesApiCall } from "./apiStatusActions";
import * as types from "./actionTypes";

export function loadFacilitiesSuccess(facilities) {
  return {
    type: types.LOAD_FACILITIES_SUCCESS,
    facilities,
  };
}


export function loadFacilities() {
  return (dispatch) => {
    dispatch(beginFacilitiesApiCall());
    return facilitiesApi
      .getAllFacilities()
      .then((res) => {
        dispatch(loadFacilitiesSuccess(res.data));
      })
  };
}

