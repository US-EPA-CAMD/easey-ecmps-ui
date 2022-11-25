import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import MonitoringPlanHome, { mapStateToProps } from "./MonitoringPlanHome";
import { Provider } from "react-redux";
import configureStore from "../../store/configureStore.dev";
import {
  MONITORING_PLAN_STORE_NAME,
  QA_CERT_TEST_SUMMARY_STORE_NAME,
  EMISSIONS_STORE_NAME,
  EXPORT_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";
import initialState from "../../store/reducers/initialState";

initialState.openedFacilityTabs.monitoringPlans = [
  {
    orisCode: "3",
    checkout: false,
    name: "Barry (1, 2, CS0AAN) ",
    location: [0, "6"],
    section: [3, "Methods"],
    selectedConfig: {
      id: "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
      name: "1, 2, CS0AAN",
      unitStackConfigurations: [
        {
          unitId: "1"
        }
      ],
      locations: [
        {
          id: "6",
          name: "1",
          type: "Unit",
          active: true,
          retireDate: null,
          links: [
            {
              rel: "self",
              href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/6",
            },
            {
              rel: "methods",
              href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/6/methods",
            },
            {
              rel: "systems",
              href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/6/systems",
            },
            {
              rel: "spans",
              href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/6/spans",
            },
          ],
        },
      ],
    },
    inactive: [false, false],
  },
];
const store = configureStore(initialState);
test("renders monitoring plan home with redux", async () => {

  jest.mock("../../utils/api/monitoringPlansApi", () => {
    const data = {
      data: [
        {
          facId: 1,
          monPlanId: "TWA7A",
          checkedOutOn: "2022-04-04T06:16:59.959Z",
          checkedOutBy: "test",
          lastActivity: "2022-04-04T06:16:59.959Z",
        },
        {
          facId: 1,
          monPlanId: "TWA7A",
          checkedOutOn: "2022-04-04T06:16:59.959Z",
          checkedOutBy: "",
          lastActivity: "2022-04-04T06:16:59.959Z",
        },
      ],
    };
    return {
      getCheckedOutLocations: jest.fn(() => Promise.resolve(data)),
    };
  });

  window.currentlyCheckedOutMonPlanId = 123;


  const { container } = 
    render(
      <Provider store={store}>
        <MonitoringPlanHome
          user={{ firstName: "test" }}
          resetTimer={jest.fn()}
          setExpired={jest.fn()}
          resetTimerFlag={jest.fn()}
          callApiFlag={jest.fn()}
          workspaceSection={MONITORING_PLAN_STORE_NAME}
        />
      </Provider>
    )
  ;

  fireEvent.click(container.querySelector("#testingBtn2"));
  const renderedComponent = container.querySelector(".home-container");
  expect(renderedComponent).not.toBeUndefined();
});

test("renders monitoring plan home with QA_CERT_TEST_SUMMARY_STORE_NAME", async () => {

  jest.mock("../../utils/api/monitoringPlansApi", () => {
    const data = {
      data: [
        {
          facId: 1,
          monPlanId: "TWA7A",
          checkedOutOn: "2022-04-04T06:16:59.959Z",
          checkedOutBy: "test",
          lastActivity: "2022-04-04T06:16:59.959Z",
        },
        {
          facId: 1,
          monPlanId: "TWA7A",
          checkedOutOn: "2022-04-04T06:16:59.959Z",
          checkedOutBy: "",
          lastActivity: "2022-04-04T06:16:59.959Z",
        },
      ],
    };
    return {
      getCheckedOutLocations: jest.fn(() => Promise.resolve(data)),
    };
  });

  window.currentlyCheckedOutMonPlanId = 123;


  const { container } = render(
    <Provider store={store}>
      <MonitoringPlanHome
        user={{ firstName: "test" }}
        resetTimer={jest.fn()}
        setExpired={jest.fn()}
        resetTimerFlag={jest.fn()}
        callApiFlag={jest.fn()}
        workspaceSection={QA_CERT_TEST_SUMMARY_STORE_NAME}
      />
    </Provider>
  );

  fireEvent.click(container.querySelector("#testingBtn2"));
  const renderedComponent = container.querySelector(".home-container");
  expect(renderedComponent).not.toBeUndefined();
});

test("renders monitoring plan home with EMISSIONS_STORE_NAME", async () => {

  jest.mock("../../utils/api/monitoringPlansApi", () => {
    const data = {
      data: [
        {
          facId: 1,
          monPlanId: "TWA7A",
          checkedOutOn: "2022-04-04T06:16:59.959Z",
          checkedOutBy: "test",
          lastActivity: "2022-04-04T06:16:59.959Z",
        },
        {
          facId: 1,
          monPlanId: "TWA7A",
          checkedOutOn: "2022-04-04T06:16:59.959Z",
          checkedOutBy: "",
          lastActivity: "2022-04-04T06:16:59.959Z",
        },
      ],
    };
    return {
      getCheckedOutLocations: jest.fn(() => Promise.resolve(data)),
    };
  });

  window.currentlyCheckedOutMonPlanId = 123;


  const { container } = render(
    <Provider store={store}>
      <MonitoringPlanHome
        user={{ firstName: "test" }}
        resetTimer={jest.fn()}
        setExpired={jest.fn()}
        resetTimerFlag={jest.fn()}
        callApiFlag={jest.fn()}
        workspaceSection={EMISSIONS_STORE_NAME}
      />
    </Provider>
  );

  fireEvent.click(container.querySelector("#testingBtn2"));
  const renderedComponent = container.querySelector(".home-container");
  expect(renderedComponent).not.toBeUndefined();
});

test("renders monitoring plan home with EXPORT_STORE_NAME", async () => {

  jest.mock("../../utils/api/monitoringPlansApi", () => {
    const data = {
      data: [
        {
          facId: 1,
          monPlanId: "TWA7A",
          checkedOutOn: "2022-04-04T06:16:59.959Z",
          checkedOutBy: "test",
          lastActivity: "2022-04-04T06:16:59.959Z",
        },
        {
          facId: 1,
          monPlanId: "TWA7A",
          checkedOutOn: "2022-04-04T06:16:59.959Z",
          checkedOutBy: "",
          lastActivity: "2022-04-04T06:16:59.959Z",
        },
      ],
    };
    return {
      getCheckedOutLocations: jest.fn(() => Promise.resolve(data)),
    };
  });

  window.currentlyCheckedOutMonPlanId = 123;


  const { container } = render(
    <Provider store={store}>
      <MonitoringPlanHome
        user={{ firstName: "test" }}
        resetTimer={jest.fn()}
        setExpired={jest.fn()}
        resetTimerFlag={jest.fn()}
        callApiFlag={jest.fn()}
        workspaceSection={EXPORT_STORE_NAME}
      />
    </Provider>
  );

  fireEvent.click(container.querySelector("#testingBtn2"));
  const renderedComponent = container.querySelector(".home-container");
  expect(renderedComponent).not.toBeUndefined();
});

test("mapStateToProps calls the appropriate action", async () => {
  // mock the 'dispatch' object
  const state = store.getState();
  const stateProps = mapStateToProps(state, true);

  expect(stateProps).toBeDefined();
});
