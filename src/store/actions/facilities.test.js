import { loadFacilities, loadFacilitiesSuccess } from "./facilities";
import * as types from "./actionTypes";
import axios from "axios";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import config from "../../config";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

// Mocked facilities returned data
const facilities = [
  [
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
];

describe("Async Actions", () => {
  const mock = new MockAdapter(axios);
  afterEach(() => {
    mock.restore();
  });

  describe("Load Facilities Thunk", () => {
    it("should create BEGIN_FACILITIES_API_CALL and LOAD_FACILITIES_SUCCESS when loading facilities", () => {
      mock.onGet(config.services.facilities.uri).reply(200, facilities);
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
