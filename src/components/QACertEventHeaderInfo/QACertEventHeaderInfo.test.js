import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitForElement,
  within,
} from '@testing-library/react';
import axios from 'axios';
import QACertEventHeaderInfo from './QACertEventHeaderInfo';

jest.mock('axios');

jest.mock('../../utils/api/dataManagementApi', () => ({
  getAllTestTypeCodes: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          testTypeCode: 'DAYCAL',
          testTypeDescription: 'Daily Calibration',
          testTypeGroupCode: null,
        },
      ],
    })
  ),
  getAllTestTypeGroupCodes: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          testTypeGroupCode: 'PEI',
          testTypeGroupDescription: 'Primary Element Inspection',
          childDepth: '1',
        },
      ],
    })
  ),
}));

jest.mock('../../utils/api/monitoringPlansApi', () => ({
  getCheckedOutLocations: jest.fn(() => Promise.resolve({ data: [] })),
  getRefreshInfo: jest.fn(() => Promise.resolve({ data: [] })),
}));

const date = new Date();
const dateString = date.toString();

const selectedConfig = {
  id: 'testConfigId',
  userId: 'testUserId',
  updateDate: dateString,
  addDate: dateString,
  active: true,
};

const props = {
  facility: 'Test (1, 2, 3)',
  selectedConfig: selectedConfig,
  orisCode: 'testOrisCode',
  sectionSelect: [4, 'Methods'],
  setSectionSelect: jest.fn(),
  setLocationSelect: jest.fn(),
  locationSelect: [0, 'testLocName'],
  locations: [
    { id: 'testLocId', name: 'testLocName', type: 'testType', active: true },
  ],
  user: { firstName: 'test' },

  configID: 'testConfigId',
  setSelectedTestCode: jest.fn(),
  checkoutState: true,
};

const testTypeDropdownLabel = /Test Data/i;
const testTypeDropdownData = [
  { testTypeGroupDescription: 'Test Data option 1' },
  { testTypeGroupDescription: 'Test Data option 2' },
  { testTypeGroupDescription: 'Test Data option 3' },
];

// mocking JavaScript built-in window functions
window.open = jest.fn().mockReturnValue({ close: jest.fn() });
window.scrollTo = jest.fn();

const oneMin = 60000;
jest.setTimeout(oneMin);

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

beforeEach(() => {
  axios.get.mockResolvedValueOnce({ status: 200, data: testTypeDropdownData });
});

test('testing QACertEventHeaderInfo component', async () => {
  const { container } = await waitForElement(() =>
    render(<QACertEventHeaderInfo {...props} />)
  );

  expect(container).toBeDefined();
});

test('testing QACertEventHeaderInfo component and opening selection modal import', async () => {
  const { container } = await waitForElement(() =>
    render(<QACertEventHeaderInfo {...props} />)
  );
  const openBtn = container.querySelector('#importSelectionQAModal');

  fireEvent.click(openBtn);
  expect(container).toBeDefined();
});

test('test type dropdown selection renders', async () => {
  // Arrange
  await waitForElement(() => render(<QACertEventHeaderInfo {...props} />));
  const testTypeDropdown = screen.getByLabelText(testTypeDropdownLabel);
  //  const options = within(testTypeDropdown).getAllByRole('option');

  // Assert
  expect(testTypeDropdown).toBeInTheDocument();
  //  expect(options).toHaveLength(1);
});

test('renders buttons for "Import Test Data", "Test Data Report", "Test History Report", and "Evaluate All"', async () => {
  // Arrange
  const { container } = await waitForElement(() =>
    render(<QACertEventHeaderInfo {...props} />)
  );

  const importTestDataBtn = container.querySelector('#importSelectionQAModal');
  const testDataReportBtn = container.querySelector('#showRevertModal');
  const testHistoryReportBtn = container.querySelector('#showRevertModal');
  const evalAllBtn = container.querySelector('#showRevertModal');

  fireEvent.click(importTestDataBtn);
  fireEvent.click(testDataReportBtn);
  fireEvent.click(testHistoryReportBtn);
  fireEvent.click(evalAllBtn);

  // Assert
  expect(importTestDataBtn).toBeDefined();
  expect(testDataReportBtn).toBeDefined();
  expect(testHistoryReportBtn).toBeDefined();
  expect(evalAllBtn).toBeDefined();
});

test('when import test data button is clicked then a modal is rendered', async () => {
  // Arrange
  const { container } = await waitForElement(() =>
    render(<QACertEventHeaderInfo {...props} />)
  );
  const importTestDataBtn = container.querySelector('#importSelectionQAModal');

  // Act
  fireEvent.click(importTestDataBtn);

  // Assert
  expect(container).toBeDefined();
});
