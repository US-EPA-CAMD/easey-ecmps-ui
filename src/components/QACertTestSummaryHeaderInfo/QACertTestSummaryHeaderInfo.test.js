import { act, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";

import configureStore from "../../store/configureStore.dev";
import QACertTestSummaryHeaderInfo from "./QACertTestSummaryHeaderInfo";

const dateString = new Date().toISOString();

const selectedConfig = {
  id: "testConfigId",
  userId: "testUserId",
  updateDate: dateString,
  addDate: dateString,
  orisCode: "testOrisCode",
  active: true,
  monitoringLocationData: [
    { id: "testLocId", name: "Test Facility", type: "testType", active: true },
  ],
};

const props = {
  facility: "Test (1, 2, 3)",
  selectedConfigId: selectedConfig.id,
  sectionSelect: [0, "Methods"],
  orisCode: selectedConfig.orisCode,
  setSectionSelect: jest.fn(),
  setLocationSelect: jest.fn(),
  locationSelect: [0, "testLocName"],
  user: { firstName: "test" },
  setSelectedTestCode: jest.fn(),
};

const store = configureStore({
  monitoringPlans: { [selectedConfig.orisCode]: [selectedConfig] },
});

// Mock the child component, QAImportHistoricalDataPreview, by providing a simple dummy component.
jest.mock(
  "../QAImportHistoricalDataPreview/QAImportHistoricalDataPreview",
  () => {
    return () => (
      <div data-testid="qa-import-historical-data-preview-mock"></div>
    );
  }
);

describe("QACertTestSummaryHeaderInfo", () => {
  // Define your test cases here
  test("renders without crashing", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <QACertTestSummaryHeaderInfo {...props} checkoutState={true} />
        </Provider>
      );
    });
  });

  test("displays the facility main name", () => {
    act(() => {
      render(
        <Provider store={store}>
          <QACertTestSummaryHeaderInfo {...props} checkoutState={true} />
        </Provider>
      );
    });
    expect(screen.getByText("Test Facility")).toBeInTheDocument();
  });

  test("shows the import button when user is checked out", () => {
    act(() => {
      render(
        <Provider store={store}>
          <QACertTestSummaryHeaderInfo {...props} checkoutState={true} />
        </Provider>
      );
    });
    expect(screen.getByText("Import Data")).toBeInTheDocument();
  });

  test("does not show the import button when user is not checked out and shows checkout button", () => {
    act(() => {
      render(
        <Provider store={store}>
          <QACertTestSummaryHeaderInfo {...props} checkoutState={true} />
        </Provider>
      );
    });
    expect(screen.getByText("Check Out")).toBeInTheDocument();
  });
});
