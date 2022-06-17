import React from "react";
import { render } from "@testing-library/react";
import {
  QACertTestSummaryTab,
  mapStateToProps,
  mapDispatchToProps,
} from "./QACertTestSummaryTab";
import { Provider } from "react-redux";
import configureStore from "../../store/configureStore.dev";
const store = configureStore();
const axios = require("axios");
jest.mock("axios");

const selectedConfig = {
  id: "MDC",
  name: "1",
  locations: [
    {
      id: "65",
      name: "110",
      type: "Unit",
      active: false,
      retireDate: null,
    },
  ],
};
const props = {
  title: " ( test ) ",
  user: { firstName: "test" },
  locations: selectedConfig.locations,
  selectedConfig: selectedConfig,
  setSectionSelect: jest.fn(),
  setLocationSelect: jest.fn(),
  sectionSelect: [3, "Methods"],
  locationSelect: [0, "65"],
  orisCode: "5",
  tabs: [{ selectedConfig: selectedConfig, location: 0, section: 0 }],
  configID: selectedConfig.id,
  activeTab: 0,
  setSection: jest.fn(),
  setLocation: jest.fn(),
};
test("tests QACertTestSummaryTab", async () => {
  const { container } = render(
    <Provider store={store}>
      <QACertTestSummaryTab {...props} />{" "}
    </Provider>
  );

  expect(container).not.toBeUndefined();
});

test("tests QACertTestSummaryTab with conditionals ", async () => {
  const condProps = {
    title: " ( test ) ",
    user: { firstName: "test" },
    locations: selectedConfig.locations,
    selectedConfig: selectedConfig,
    setSectionSelect: jest.fn(),
    setLocationSelect: jest.fn(),
    sectionSelect: [3, "Methods"],
    locationSelect: [0, "65"],
    orisCode: "5",
    configID: selectedConfig.id,
    activeTab: 0,
    setSection: jest.fn(),
    setLocation: jest.fn(),
  };
  const { container } = render(
    <Provider store={store}>
      <QACertTestSummaryTab {...condProps} />{" "}
    </Provider>
  );

  expect(container).not.toBeUndefined();
});
test("mapDispatchToProps calls the appropriate action", async () => {
  // mock the 'dispatch' object
  const dispatch = jest.fn();
  const actionProps = mapDispatchToProps(dispatch);
  const state = store.getState();
  console.log("TEST", state);
  const stateProps = mapStateToProps(state);

  const formData = [];
  // verify the appropriate action was called
  actionProps.setLocation();
  actionProps.setSection();
  actionProps.setActiveTab();
  expect(state).toBeDefined();
});
