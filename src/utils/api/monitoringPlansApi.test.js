import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getMonitoringPlans, getMonitoringMethods, getMonitoringMatsMethods,getMonitoringSystems } from "./monitoringPlansApi";
import config from "../../config";

const selectedFacilityOrisCode = "3";
const mockConfigurations = [
    {
      "id": "MDC-0AD77532C61345C6B50CBC80ADA1A3E1",
      "name": "1, 2, 3, CS0AAN",
      "locations": [
        {
          "id": "6",
          "name": "1",
          "type": "Unit",
          "links": [
            {
              "rel": "self",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6"
            },
            {
              "rel": "methods",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/methods"
            },
            {
              "rel": "systems",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/systems"
            },
            {
              "rel": "spans",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/spans"
            }
          ]
        },
        {
          "id": "7",
          "name": "2",
          "type": "Unit",
          "links": [
            {
              "rel": "self",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7"
            },
            {
              "rel": "methods",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/methods"
            },
            {
              "rel": "systems",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/systems"
            },
            {
              "rel": "spans",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/spans"
            }
          ]
        },
        {
          "id": "8",
          "name": "3",
          "type": "Unit",
          "links": [
            {
              "rel": "self",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/8"
            },
            {
              "rel": "methods",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/8/methods"
            },
            {
              "rel": "systems",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/8/systems"
            },
            {
              "rel": "spans",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/8/spans"
            }
          ]
        },
        {
          "id": "5",
          "name": "CS0AAN",
          "type": "Stack",
          "links": [
            {
              "rel": "self",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5"
            },
            {
              "rel": "methods",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/methods"
            },
            {
              "rel": "systems",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/systems"
            },
            {
              "rel": "spans",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/spans"
            }
          ]
        }
      ],
      "links": [
        {
          "rel": "self",
          "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/MDC-0AD77532C61345C6B50CBC80ADA1A3E1"
        }
      ]
    },
    {
      "id": "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
      "name": "1, 2, CS0AAN",
      "locations": [
        {
          "id": "6",
          "name": "1",
          "type": "Unit",
          "links": [
            {
              "rel": "self",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6"
            },
            {
              "rel": "methods",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/methods"
            },
            {
              "rel": "systems",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/systems"
            },
            {
              "rel": "spans",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/spans"
            }
          ]
        },
        {
          "id": "7",
          "name": "2",
          "type": "Unit",
          "links": [
            {
              "rel": "self",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7"
            },
            {
              "rel": "methods",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/methods"
            },
            {
              "rel": "systems",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/systems"
            },
            {
              "rel": "spans",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/spans"
            }
          ]
        },
        {
          "id": "5",
          "name": "CS0AAN",
          "type": "Stack",
          "links": [
            {
              "rel": "self",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5"
            },
            {
              "rel": "methods",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/methods"
            },
            {
              "rel": "systems",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/systems"
            },
            {
              "rel": "spans",
              "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/spans"
            }
          ]
        }
      ],
      "links": [
        {
          "rel": "self",
          "href": "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A"
        }
      ]
    }
];

const monitoringLocationId = "6";
const mockMonitoringMethds = [
    {
      "id": "TWCORNEL5-E87023808E5C43F18BD84AC8A9DCF332",
      "parameterCode": "HI",
      "methodCode": "AD",
      "subDataCode": "SPTS",
      "bypassApproachCode": null,
      "beginDate": "2019-07-01",
      "beginHour": "0",
      "endDate": null,
      "endHour": null
    },
    {
      "id": "TWCORNEL5-F5C722306BC647C0A89728805EC65491",
      "parameterCode": "CO2",
      "methodCode": "AD",
      "subDataCode": "SPTS",
      "bypassApproachCode": null,
      "beginDate": "2019-07-01",
      "beginHour": "0",
      "endDate": null,
      "endHour": null
    },
    {
      "id": "TWCORNEL5-0242C84984624A19842495426796A5AF",
      "parameterCode": "SO2",
      "methodCode": "AD",
      "subDataCode": "SPTS",
      "bypassApproachCode": null,
      "beginDate": "2019-07-01",
      "beginHour": "0",
      "endDate": null,
      "endHour": null
    },
    {
      "id": "CAMD-EA417194893A42698910FB88A89A050A",
      "parameterCode": "HI",
      "methodCode": "CALC",
      "subDataCode": null,
      "bypassApproachCode": null,
      "beginDate": "1995-01-01",
      "beginHour": "0",
      "endDate": "2019-06-30",
      "endHour": "23"
    },
    {
      "id": "TWCORNEL5-3FA65FADD48D4CF88F26328FEF7B5237",
      "parameterCode": "OP",
      "methodCode": "EXP",
      "subDataCode": null,
      "bypassApproachCode": null,
      "beginDate": "2018-10-03",
      "beginHour": "0",
      "endDate": null,
      "endHour": null
    }
  ];
const mockMatsMethods = [
    {
      "id": "TAG182357-8F800321D1384A86BA068C39281AF76F",
      "matsMethodParameterCode": "HCL",
      "matsMethodCode": "QST",
      "beginDate": "2016-04-16",
      "beginHour": "0",
      "endDate": null,
      "endHour": null
    },
    {
      "id": "TAG182357-469B30C4F64947F383E3B8D8C36DA910",
      "matsMethodParameterCode": "TNHGM",
      "matsMethodCode": "PMQST",
      "beginDate": "2016-04-16",
      "beginHour": "0",
      "endDate": null,
      "endHour": null
    }
  ];

  const mockSystems = [
    {
      "id": "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
      "monLocId": "6",
      "systemType": "GAS",
      "systemDesignationCode": "P",
      "systemIdentifier": "AF1",
      "fuelCode": "PNG",
      "beginDate": "2019-07-01",
      "endDate": null,
      "beginHour": "0",
      "endHour": null
    },
    {
      "id": "TWCORNEL5-10B54DDC6DBF4DF3B309251288E83E12",
      "monLocId": "6",
      "systemType": "GAS",
      "systemDesignationCode": "P",
      "systemIdentifier": "AF2",
      "fuelCode": "PNG",
      "beginDate": "2019-07-01",
      "endDate": null,
      "beginHour": "0",
      "endHour": null
    }
  ];
describe("testing montiring plans data fetching APIs", () => {

    test("Should fetch list of monitoring configurations for a selected facility", async () => {
        const mock = new MockAdapter(axios);

        mock.onGet(`${config.services.monitorPlans.uri}/monitor-plans/${selectedFacilityOrisCode}/configurations`).reply(200, {
            configurations: mockConfigurations,
        });

        const result = await getMonitoringPlans(selectedFacilityOrisCode);
        expect(result['data'].configurations).toEqual(mockConfigurations);
    });

    test("Should fetch list of monitoring methods for a selected monitoring location", async () => {
        const mock = new MockAdapter(axios);
        mock.onGet(`${config.services.monitorPlans.uri}/monitor-locations/${monitoringLocationId}/methods`).reply(200, {
            methods: mockMonitoringMethds,
        });
        const result = await getMonitoringMethods(monitoringLocationId);
        expect(result['data'].methods).toEqual(mockMonitoringMethds);
    });

    test("Should fetch list of monitoring Mats methods for a selected monitoring location", async () => {
        const mock = new MockAdapter(axios);
        mock.onGet(`${config.services.monitorPlans.uri}/monitor-locations/${monitoringLocationId}/Supplemental-methods`).reply(200, {
            matsMethods: mockMatsMethods,
        });
        const result = await getMonitoringMatsMethods(monitoringLocationId);
        expect(result['data'].matsMethods).toEqual(mockMatsMethods);
    });
    test("Should fetch list of monitoring systems for a selected monitoring location", async () => {
      const mock = new MockAdapter(axios);
      mock.onGet(`${config.services.monitorPlans.uri}/monitor-locations/${monitoringLocationId}/systems`).reply(200, {
          monitoringSystems: mockSystems,
      });
      const result = await getMonitoringSystems(monitoringLocationId);
      expect(result['data'].monitoringSystems).toEqual(mockSystems);
  });
});
