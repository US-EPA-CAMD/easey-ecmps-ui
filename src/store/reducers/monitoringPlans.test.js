import monitoringPlansReducer from "./monitoringPlans";
import * as actions from "../actions/monitoringPlans";

describe("Monitoring plans Reducer State Update", () => {
  it("should update state with list of monitoring plans when passed LOAD_MONITORING_PLANS_SUCCESS", async () => {
    const initialState = {
      monitoringPlans: {},
    };
    const monitoringPlans = [
      {
        id: "MDC-0AD77532C61345C6B50CBC80ADA1A3E1",
        name: "1, 2, 3, CS0AAN",
        locations: [
          {
            id: "6",
            name: "1",
            type: "Unit",
            links: [
              {
                rel: "self",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6",
              },
              {
                rel: "methods",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/methods",
              },
              {
                rel: "systems",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/systems",
              },
              {
                rel: "spans",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/spans",
              },
            ],
          },
          {
            id: "7",
            name: "2",
            type: "Unit",
            links: [
              {
                rel: "self",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7",
              },
              {
                rel: "methods",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/methods",
              },
              {
                rel: "systems",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/systems",
              },
              {
                rel: "spans",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/spans",
              },
            ],
          },
          {
            id: "8",
            name: "3",
            type: "Unit",
            links: [
              {
                rel: "self",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/8",
              },
              {
                rel: "methods",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/8/methods",
              },
              {
                rel: "systems",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/8/systems",
              },
              {
                rel: "spans",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/8/spans",
              },
            ],
          },
          {
            id: "5",
            name: "CS0AAN",
            type: "Stack",
            links: [
              {
                rel: "self",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5",
              },
              {
                rel: "methods",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/methods",
              },
              {
                rel: "systems",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/systems",
              },
              {
                rel: "spans",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/spans",
              },
            ],
          },
        ],
        links: [
          {
            rel: "self",
            href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/MDC-0AD77532C61345C6B50CBC80ADA1A3E1",
          },
        ],
      },
      {
        id: "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
        name: "1, 2, CS0AAN",
        locations: [
          {
            id: "6",
            name: "1",
            type: "Unit",
            links: [
              {
                rel: "self",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6",
              },
              {
                rel: "methods",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/methods",
              },
              {
                rel: "systems",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/systems",
              },
              {
                rel: "spans",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/spans",
              },
            ],
          },
          {
            id: "7",
            name: "2",
            type: "Unit",
            links: [
              {
                rel: "self",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7",
              },
              {
                rel: "methods",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/methods",
              },
              {
                rel: "systems",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/systems",
              },
              {
                rel: "spans",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/spans",
              },
            ],
          },
          {
            id: "5",
            name: "CS0AAN",
            type: "Stack",
            links: [
              {
                rel: "self",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5",
              },
              {
                rel: "methods",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/methods",
              },
              {
                rel: "systems",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/systems",
              },
              {
                rel: "spans",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/spans",
              },
            ],
          },
        ],
        links: [
          {
            rel: "self",
            href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
          },
        ],
      },
    ];

    const action = actions.loadMonitoringPlansSuccess(3, monitoringPlans);
    const newState = monitoringPlansReducer(
      initialState.monitoringPlans,
      action
    );
    expect(newState[3].length).toEqual(2);
  });
  it("should update single monitoring plan in state when passed LOAD_SINGLE_MONITORING_PLAN_SUCCESS", async () => {
    const initialState = {
      monitoringPlans: {},
    };
    const monitoringPlan = {
        id: "MDC-0AD77532C61345C6B50CBC80ADA1A3E1",
        name: "1, 2, 3, CS0AAN",
        locations: [
          {
            id: "6",
            name: "1",
            type: "Unit",
            links: [
              {
                rel: "self",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6",
              },
              {
                rel: "methods",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/methods",
              },
              {
                rel: "systems",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/systems",
              },
              {
                rel: "spans",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/6/spans",
              },
            ],
          },
          {
            id: "7",
            name: "2",
            type: "Unit",
            links: [
              {
                rel: "self",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7",
              },
              {
                rel: "methods",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/methods",
              },
              {
                rel: "systems",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/systems",
              },
              {
                rel: "spans",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/7/spans",
              },
            ],
          },
          {
            id: "8",
            name: "3",
            type: "Unit",
            links: [
              {
                rel: "self",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/8",
              },
              {
                rel: "methods",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/8/methods",
              },
              {
                rel: "systems",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/8/systems",
              },
              {
                rel: "spans",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/8/spans",
              },
            ],
          },
          {
            id: "5",
            name: "CS0AAN",
            type: "Stack",
            links: [
              {
                rel: "self",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5",
              },
              {
                rel: "methods",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/methods",
              },
              {
                rel: "systems",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/systems",
              },
              {
                rel: "spans",
                href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-locations/5/spans",
              },
            ],
          },
        ],
        links: [
          {
            rel: "self",
            href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/MDC-0AD77532C61345C6B50CBC80ADA1A3E1",
          },
        ],
      };

    const action = actions.loadSingleMonitoringPlanSuccess(3, monitoringPlan);
    const newState = monitoringPlansReducer(
      initialState.monitoringPlans,
      action
    );
    expect(newState[3].length).toEqual(1);
  });
});
describe("checking false conditions", () => {
  const initialState = {
    monitoringPlans: [],
  };
  const monitoringPlans = [];
  it("passing in no action.type for default case", async () => {
    const newState = monitoringPlansReducer(initialState.monitoringPlans, {
      type: "",
    });
    expect(Object.values(newState).length).toBe(0);
  });

  it("passing in no state", async () => {
    const newState = monitoringPlansReducer(null, {
      type: "",
    });
    expect(Object.values(newState).length).toBe(0);
  });
});
