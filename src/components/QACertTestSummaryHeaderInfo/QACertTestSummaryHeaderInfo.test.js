// import React from "react";
// import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
// import axios from "axios";
// import QACertTestSummaryHeaderInfo from "./QACertTestSummaryHeaderInfo";

// jest.mock("axios");

// jest.mock('../../utils/api/dataManagementApi', () => ({
//   getAllTestTypeCodes: jest.fn(() => Promise.resolve({data: [{
//     "testTypeCode": "DAYCAL",
//     "testTypeDescription": "Daily Calibration",
//     "testTypeGroupCode": null
//   }]})),
//   getAllTestTypeGroupCodes: jest.fn(() => Promise.resolve({data: [{
//     "testTypeGroupCode": "PEI",
//     "testTypeGroupDescription": "Primary Element Inspection",
//     "childDepth": "1"
//   }]}))
// }));

// jest.mock('../../utils/api/monitoringPlansApi', () => ({
//   getCheckedOutLocations: jest.fn(() => Promise.resolve({data: []})),
//   getRefreshInfo: jest.fn(() => Promise.resolve({data:[]}))
// }));

// const testTypeDropdownLabel = /Test Type Group/i
// const testTypeDropdownData = [
//   { name:"name1", testTypeGroupDescription: 'Test Type Group option 1' },
//   { name:"name2", testTypeGroupDescription: 'Test Type Group option 2' },
//   { name:"name3", testTypeGroupDescription: 'Test Type Group option 3' },
// ]

// // mocking JavaScript built-in window functions
// window.open = jest.fn().mockReturnValue({ close: jest.fn() });
// window.scrollTo = jest.fn();

// const oneMin = 60000;
// jest.setTimeout(oneMin);

// function timeout(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// beforeEach(() => {
//   axios.get.mockResolvedValueOnce({ status: 200, data: testTypeDropdownData })
// })

// test("testing QACertTestSummaryHeaderInfo component", async () => {
//   const { container } = await waitFor(() => render(<QACertTestSummaryHeaderInfo {...props} />));
//   expect(container).toBeDefined();
// });

// test("testing QACertTestSummaryHeaderInfo component and opening selection modal import", async () => {
//   const { container } = await waitFor(() => render(<QACertTestSummaryHeaderInfo {...props} />));
//   const openBtn = container.querySelector("#importSelectionQAModal");

//   fireEvent.click(openBtn);
//   expect(container).toBeDefined();
// });

// test('test type dropdown selection renders with options', async () => {
//   // Arrange
//   await waitFor(() => render(<QACertTestSummaryHeaderInfo {...props} />))
//   const testTypeDropdown = screen.getByLabelText(testTypeDropdownLabel)
//   const options = within(testTypeDropdown).getAllByRole('option')

//   // Assert
//   expect(testTypeDropdown).toBeInTheDocument()
//   expect(options).toHaveLength(1)
// })

// test('renders buttons for "Import Test Data", "Test Data Report", "Test History Report"', async () => {
//   // Arrange
//   const {container } = await waitFor(() => render(<QACertTestSummaryHeaderInfo {...props} />))

//   const importTestDataBtn = container.querySelector("#importSelectionQAModal")

//   fireEvent.click(importTestDataBtn)

//   // Assert
//   expect(importTestDataBtn).toBeDefined()
// })

// test('when import test data button is clicked then a modal is rendered', async () => {
//   // Arrange
//  const { container } = await waitFor(() => render(<QACertTestSummaryHeaderInfo {...props} />))
//   const importTestDataBtn = container.querySelector("#importSelectionQAModal")

//   // Act
//   fireEvent.click(importTestDataBtn)

//   const importText = screen.getByText(/Import Historical Data/i)

//   // Assert
//   expect(container).toBeDefined()
// })
import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  act,
  getByText,
  screen,
} from "@testing-library/react";
import QACertTestSummaryHeaderInfo from "./QACertTestSummaryHeaderInfo";
// Import any other required dependencies and mock them if necessary.

const date = new Date();
const dateString = date.toString();

const selectedConfig = {
  id: "testConfigId",
  userId: "testUserId",
  updateDate: dateString,
  addDate: dateString,
  active: true,
};

const props = {
  facility: "Test (1, 2, 3)",
  selectedConfig: selectedConfig,
  orisCode: "testOrisCode",
  sectionSelect: [0, "Methods"],
  setSectionSelect: jest.fn(),
  setLocationSelect: jest.fn(),
  locationSelect: [0, "testLocName"],
  locations: [
    { id: "testLocId", name: "Test Facility", type: "testType", active: true },
  ],
  user: { firstName: "test" },

  configID: "testConfigId",
  setSelectedTestCode: jest.fn(),
};
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
      render(<QACertTestSummaryHeaderInfo {...props} checkoutState={true} />);
    });
  });

  test("displays the facility main name", () => {
    act(() => {
      render(<QACertTestSummaryHeaderInfo {...props} checkoutState={true} />);
    });
    expect(screen.getByText("Test Facility")).toBeInTheDocument();
  });

  test("shows the import button when user is checked out", () => {
    act(() => {
      render(<QACertTestSummaryHeaderInfo {...props} checkoutState={true} />);
    });
    expect(screen.getByText("Import Data")).toBeInTheDocument();
  });

  test("does not show the import button when user is not checked out and shows checkout button", () => {
    act(() => {
      render(<QACertTestSummaryHeaderInfo {...props} checkoutState={false} />);
    });
    expect(screen.getByText("Check Out")).toBeInTheDocument();
  });
});
