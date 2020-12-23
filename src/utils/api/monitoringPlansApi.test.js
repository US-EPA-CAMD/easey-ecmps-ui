import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getMonitoringMethods } from "./monitoringPlansApi";
import config from "../../config";

const monitoringMethods = [
    {
    id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
    parameter: "co2",
    methodology: "ad",
    subsitituteDataApproach: "spts",
    byPassApproach: "null",
    beginDate: "1995-01-01 00",
    endTime: "1995-01-01 00",
    },
    {
    id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
    parameter: "co2",
    methodology: "ad",
    subsitituteDataApproach: "spts",
    byPassApproach: "null",
    beginDate: "1995-01-01 00",
    endTime: "1995-01-01 00",
    },
    {
    id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
    parameter: "co2",
    methodology: "ad",
    subsitituteDataApproach: "spts",
    byPassApproach: "null",
    beginDate: "1995-01-01 00",
    endTime: "1995-01-01 00",
    }
];
const monitoringPlans = [
  {
    "id": "MDC-DSF87364AD9879A8FDS7G",
    "name": "1, 2, 3, CS0AAN",
    "locations": [
      {
        "id": "BZ5461...",
        "name": "1",
        "type": "Unit",
        "links": [
          {
            "rel": "self",
            "href": "/monitor-locations/BZ5461..."
          },
          {
            "rel": "methods",
            "href": "/monitor-locations/BZ5461.../methods"
          },
          {
            "rel": "systems",
            "href": "/monitor-locations/BZ5461.../systems"
          },
          {
            "rel": "spans",
            "href": "/monitor-locations/BZ5461.../spans"
          }
        ]
      },
    ]
  },
  {
    "id": "M3DC-DSF87364AD9879A8FDS7G",
    "name": "1, 2, 3, CS0AAN",
    "locations": [
      {
        "id": "BZ5461",
        "name": "CS0AAN",
        "type": "stackPipe",
        "links": [
          {
            "rel": "self",
            "href": "/monitor-locations/BZ5461..."
          },
          {
            "rel": "methods",
            "href": "/monitor-locations/BZ5461.../methods"
          },
          {
            "rel": "systems",
            "href": "/monitor-locations/BZ5461.../systems"
          },
          {
            "rel": "spans",
            "href": "/monitor-locations/BZ5461.../spans"
          }
        ]
      },
    ]
  }];


test("Should fetch list of monitoring plans from EASY API", async () => {
  const mock = new MockAdapter(axios);
  const orisCode = "3";
  mock.onGet(`${config.services.monitorPlans.uri}/monitor-plans/${orisCode}/configurations`).reply(200, {
    monitoringPlans: monitoringPlans,
  });

  const result = await getMonitoringPlans();
  expect(result['data'].monitoringPlans).toEqual(monitoringPlans);
});

test("Should fetch list of monitoring methods from EASY API", async () => {
  const mock = new MockAdapter(axios);
  const locationId = "6";
  mock.onGet(`${config.services.monitorPlans.uri}/monitor-locations/${locationId}/methods`).reply(200, {
    monitoringMethods: monitoringMethods,
  });

  const result = await getMonitoringMethods();
  expect(result['data'].monitoringMethods).toEqual(monitoringMethods);
});
