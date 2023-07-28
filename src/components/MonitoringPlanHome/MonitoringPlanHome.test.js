import React from "react";
import { render,screen  } from "@testing-library/react";
import MonitoringPlanHome from "./MonitoringPlanHome";
import { Provider } from "react-redux";
import * as modules from "../../utils/constants/moduleTitles";
import {
  MONITORING_PLAN_STORE_NAME,
  QA_CERT_TEST_SUMMARY_STORE_NAME,
  EMISSIONS_STORE_NAME,
  EXPORT_STORE_NAME,
  QA_CERT_EVENT_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";
// Mock the DynamicTabs component
jest.mock("../DynamicTabs/DynamicTabs", () => () => (
  <div data-testid="mock-dynamic-tabs" />
));
import configureStore from "../../store/configureStore.dev";
const store = configureStore();

test("renders MonitoringPlanHome without rendering DynamicTabs", () => {
  const user = { firstName: "" }; 

  const { getByText, queryByTestId } = render(
    <Provider store={store}>
      {" "}
      <MonitoringPlanHome
        user={user}
        resetTimer={() => {}}
        setExpired={() => {}}
        resetTimerFlag={false}
        callApiFlag={false}
        workspaceSection={MONITORING_PLAN_STORE_NAME} 
      />
    </Provider>
  );

  const monitoringPlanHomeElement = screen.queryAllByText(modules.monitoring_plans_module); 
  expect(monitoringPlanHomeElement[0]).toBeInTheDocument();
});


test("renders MonitoringPlanHome with EMISSIONS_STORE_NAME", () => {
  const user = { firstName: "" }; 

  const { getByText, queryByTestId } = render(
    <Provider store={store}>
      {" "}
      <MonitoringPlanHome
        user={user}
        resetTimer={() => {}}
        setExpired={() => {}}
        resetTimerFlag={false}
        callApiFlag={false}
        workspaceSection={EMISSIONS_STORE_NAME} 
      />
    </Provider>
  );

  const monitoringPlanHomeElement = screen.queryAllByText(modules.emissions_module); 
  expect(monitoringPlanHomeElement[0]).toBeInTheDocument();
});

test("renders MonitoringPlanHome with EXPORT_STORE_NAME", () => {
  const user = { firstName: "" }; 

  const { getByText, queryByTestId } = render(
    <Provider store={store}>
      {" "}
      <MonitoringPlanHome
        user={user}
        resetTimer={() => {}}
        setExpired={() => {}}
        resetTimerFlag={false}
        callApiFlag={false}
        workspaceSection={EXPORT_STORE_NAME} 
      />
    </Provider>
  );

  const monitoringPlanHomeElement = screen.queryAllByText(modules.export_Module); 
  expect(monitoringPlanHomeElement[0]).toBeInTheDocument();
});

test("renders MonitoringPlanHome with QA_CERT_EVENT_STORE_NAME", () => {
  const user = { firstName: "" }; 

  const { getByText, queryByTestId } = render(
    <Provider store={store}>
      {" "}
      <MonitoringPlanHome
        user={user}
        resetTimer={() => {}}
        setExpired={() => {}}
        resetTimerFlag={false}
        callApiFlag={false}
        workspaceSection={QA_CERT_EVENT_STORE_NAME} 
      />
    </Provider>
  );

  const monitoringPlanHomeElement = screen.queryAllByText(modules.qa_Certifications_Event_Module); 
  expect(monitoringPlanHomeElement[0]).toBeInTheDocument();
});
