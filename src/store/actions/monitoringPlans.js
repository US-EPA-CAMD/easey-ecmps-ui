import * as mpApi from "../../utils/api/monitoringPlansApi";
import { beginMonitoringPlansApiCall } from "./apiStatusActions";
import * as types from "./actionTypes";

export function loadMonitoringPlansSuccess(monitoringPlans) {
  return {
    type: types.LOAD_MONITORING_PLANS_SUCCESS,
    monitoringPlans,
  };
}

export function loadMonitoringPlansArraySuccess(monitoringPlans, orisCode) {
  return {
    type: types.LOAD_MONITORING_PLANS_ARRAY_SUCCESS,
    monitoringPlans,
    orisCode,
  };
}
export function loadMonitoringPlans(orisCode) {
  return (dispatch) => {
    dispatch(beginMonitoringPlansApiCall());
    return mpApi
      .getMonitoringPlans(orisCode)
      .then((res) => {
        if (res) {
          dispatch(loadMonitoringPlansSuccess(res.data));
        }
      })
      .catch((error) => console.log("getMonitoringPlans failed", error));
  };
}

export function loadMonitoringPlansArray(orisCode) {
  return async (dispatch) => {
    dispatch(beginMonitoringPlansApiCall());
    await mpApi
      .getMonitoringPlans(orisCode)
      .then((res) => {
        if (res) {
          dispatch(loadMonitoringPlansArraySuccess(res.data, orisCode));
        }
      })
      .catch((error) => console.log("getMonitoringPlans failed", error));
  };
}

// export const loadMonitoringPlansArray = (id, callback) => {
//   console.log('huh')
//   return async (dispatch) => {
//     try {
//       const response = await fetch(`https://api.example.com/data/${id}`);
//       const data = await response.json();
// console.log('DATA',data)
// callback(true);
//       // Handle the response data
//       dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });

//       // Invoke the callback if it is a function
//       if (typeof callback === 'function') {
//         callback();
//       }
//     } catch (error) {
//       // Handle the error
//       dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
//     }
//   };
// };
