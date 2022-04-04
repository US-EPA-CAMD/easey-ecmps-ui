import React from "react";
import { render, fireEvent,waitForElement } from "@testing-library/react";
import { MonitoringPlanHome, mapStateToProps } from "./MonitoringPlanHome";
import { Provider } from "react-redux";
import configureStore from "../../store/configureStore.dev";
const openFac = [
  {
    orisCode: "3",
    checkout: false,
    name: "Barry (1, 2, CS0AAN) ",
    location: [0, "6"],
    section: [3, "Methods"],
    selectedConfig: {
      id: "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
      name: "1, 2, CS0AAN",
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
        {
          id: "7",
          name: "2",
          type: "Unit",
          active: true,
          retireDate: null,
          links: [
            {
              rel: "self",
              href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/7",
            },
            {
              rel: "methods",
              href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/7/methods",
            },
            {
              rel: "systems",
              href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/7/systems",
            },
            {
              rel: "spans",
              href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/7/spans",
            },
          ],
        },
        {
          id: "5",
          name: "CS0AAN",
          type: "Stack",
          active: true,
          retireDate: null,
          links: [
            {
              rel: "self",
              href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/5",
            },
            {
              rel: "methods",
              href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/5/methods",
            },
            {
              rel: "systems",
              href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/5/systems",
            },
            {
              rel: "spans",
              href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/5/spans",
            },
          ],
        },
      ],
      endReportPeriodId: null,
      active: true,
      links: [
        {
          rel: "self",
          href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
        },
      ],
    },
    inactive: [false, false],
  },
];

const store = configureStore();
test("renders monitoring plan home with redux", async () => {
  const state = jest.fn();
  const stateProps = mapStateToProps(state);

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

  const { container, getAllByText, getByText } = await waitForElement(() =>
    render(
      <Provider store={store}>
        <MonitoringPlanHome
          user={{ firstName: "test" }}
          openedFacilityTabs={openFac}
          resetTimer={jest.fn()}
          setExpired={jest.fn()}
          resetTimerFlag={jest.fn()}
          callApiFlag={jest.fn()}
        />
      </Provider>
    )
  );

  fireEvent.click(container.querySelector("#testingBtn2"));
  const renderedComponent = container.querySelector(".home-container");
  expect(renderedComponent).not.toBeUndefined();
});
