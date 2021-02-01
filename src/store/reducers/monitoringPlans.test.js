import monitoringPlansReducer from "./monitoringPlans";
import * as actions from "../actions/monitoringPlans";


describe("Monitoring plans Reducer State Update", () => {
  it("should update state with list of monitoring plans when passed LOAD_MONITORING_PLANS_SUCCESS", () => {
    const initialState = {
        monitoringPlans:[]
    };
    const monitoringPlans = [
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

    const action = actions.loadMonitoringPlansSuccess(monitoringPlans);
    const newState = monitoringPlansReducer(initialState.monitoringPlans, action);
    expect(newState.length).toEqual(2);
  });
});
