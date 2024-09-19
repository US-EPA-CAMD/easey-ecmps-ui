import React from "react";
import { Provider } from "react-redux";
import configureStore from "../../store/configureStore.dev";
import { render } from "@testing-library/react";
import QACertTestSummaryTabRender from "./QACertTestSummaryTabRender";

jest.mock("../QACertTestSummaryHeaderInfo/QACertTestSummaryHeaderInfo", () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
  };
});
jest.mock(
  "../qaDatatablesContainer/QATestSummaryDataTable/QATestSummaryDataTable",
  () => {
    return {
      __esModule: true,
      default: () => {
        return <div />;
      },
    };
  }
);

const selectedConfig = {
  id: "MDC-7C15B3D1B20542C3B54DD57F03A516E5",
  name: "110",
  monitoringLocationData: [
    {
      id: "655",
      name: "110",
      type: "Unit",
      active: false,
      retireDate: null,
    },
  ],
  orisCode: 5,
};

const store = configureStore({
  monitoringPlans: {
    [selectedConfig.orisCode]: [selectedConfig],
  },
});

const props = {
  title: " ( test ) ",
  user: { firstName: "test" },
  locations: selectedConfig.locations,
  selectedConfigId: selectedConfig.id,
  setSectionSelect: jest.fn(),
  setLocationSelect: jest.fn(),
  sectionSelect: [3, "Methods"],
  locationSelect: [0, "655"],
  orisCode: 5,
  checkoutState: true,
  currentTab: {
    name: 'Test Tab'
  }
};
test("tests QACertTestSummaryTabRender", () => {
  jest.useFakeTimers();
  const { container } = render(
    <Provider store={store}>
      <QACertTestSummaryTabRender {...props} />
    </Provider>
  );

  jest.runAllTimers();
  expect(container).not.toBeUndefined();
});
