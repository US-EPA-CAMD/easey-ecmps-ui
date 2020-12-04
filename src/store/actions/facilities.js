import * as facilitiesApi from "../../utils/api/facilityApi";
import {
  beginFacilitiesApiCall,
  beginMonitoringPlansApiCall,
} from "./apiStatusActions";
import * as types from "./actionTypes";
import log from "loglevel";

export function loadFacilitiesSuccess(facilities) {
  return {
    type: types.LOAD_FACILITIES_SUCCESS,
    facilities,
  };
}

export function loadMonitoringPlansSuccess(monitoringPlans) {
  return {
    type: types.LOAD_MONITORING_PLANS_SUCCESS,
    monitoringPlans,
  };
}

export function loadFacilities() {
  return (dispatch) => {
    dispatch(beginFacilitiesApiCall());
    return facilitiesApi
      .getAllFacilities()
      .then((res) => {
        debugger;
        //dispatch(loadFacilitiesSuccess(res.data.data));
        dispatch(loadFacilitiesSuccess(mockFacilitiesResponse.data));
      })
      .catch((err) => {
        log(err);
      });
  };
}

export function loadMonitoringPlans() {
  return (dispatch) => {
    dispatch(beginMonitoringPlansApiCall());
    return facilitiesApi
      .getMonitoringPlans()
      .then((res) => {
        //dispatch(loadFacilitiesSuccess(res.data.data));
        dispatch(loadMonitoringPlansSuccess(mockMonitoringPlansResponse.data));
      })
      .catch((err) => {
        log(err);
      });
  };
}

const mockMonitoringPlansResponse = {
  headers: {},
  data: [
    {
      id: "MDC-DSF87364AD9879A8FDS7G",
      name: "1, 2, CS0AAN",
      locations: [
        {
          id: "BZ5461",
          name: "1",
          type: "Unit",
        },
        {
          id: "CZ5461",
          name: "2",
          type: "Unit",
        },
        {
          id: "DA5461",
          name: "CS0AAN",
          type: "StackPipe",
        },
      ],
    },
  ],
};

const mockFacilitiesResponse = {
  headers: {
    "Content-Type": "application/json",
    link:
      "</facilities?page=1&per-page=3;rel=previous>, </facilities?page=2&per-page=3;rel=next>, </facilities?page=10&per-page=3;rel=last>",
    "X-Total-Count": "245",
  },
  data: [
    {
      orisCode: "3",
      name: "Barry",
      state: "Alabama",
      epaRegion: "4",
      county: "Mobile County",
      links: [
        {
          rel: "self",
          href: "/facilities/3",
        },
        {
          rel: "monitor-plans",
          href: "facilities/3/monitor-plans",
        },
      ],
    },
    {
      orisCode: "5",
      name: "Chickasaw",
      state: "Alabama",
      epaRegion: "4",
      county: "Mobile County",
      links: [
        {
          rel: "self",
          href: "/facilities/5",
        },
        {
          rel: "monitor-plans",
          href: "facilities/5/monitor-plans",
        },
      ],
    },
    {
      orisCode: "9",
      name: "Copper Station",
      state: "Texas",
      epaRegion: "6",
      county: "El Paso County",
      links: [
        {
          rel: "self",
          href: "/facilities/9",
        },
        {
          rel: "monitor-plans",
          href: "facilities/9/monitor-plans",
        },
      ],
    },
  ],
};
