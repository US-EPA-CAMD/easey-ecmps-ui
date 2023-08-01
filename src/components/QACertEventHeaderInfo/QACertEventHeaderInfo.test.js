import React from 'react';
import {
  screen,
  fireEvent,
  waitForElement,
  within,
  act,
} from '@testing-library/react';
import axios from 'axios';

import * as dataManagementApi from "../../utils/api/dataManagementApi";
import * as monitorPlanApi from "../../utils/api/monitoringPlansApi";

import render from "../../mocks/render"
import QACertEventHeaderInfo from './QACertEventHeaderInfo';
import { getMockCheckedOutLocations, getMockTestTypeCodes, getMockTestTypeGroupCodes } from '../../mocks/functions';

// jest.mock('axios');

// jest.mock('../../utils/api/dataManagementApi', () => ({
//   getAllTestTypeCodes: jest.fn(() =>
//     Promise.resolve({
//       data: [
//         {
//           testTypeCode: 'DAYCAL',
//           testTypeDescription: 'Daily Calibration',
//           testTypeGroupCode: null,
//         },
//       ],
//     })
//   ),
//   getAllTestTypeGroupCodes: jest.fn(() =>
//     Promise.resolve({
//       data: [
//         {
//           testTypeGroupCode: 'PEI',
//           testTypeGroupDescription: 'Primary Element Inspection',
//           childDepth: '1',
//         },
//       ],
//     })
//   ),
// }));

// jest.mock('../../utils/api/monitoringPlansApi', () => ({
//   getCheckedOutLocations: jest.fn(() => Promise.resolve({ data: [] })),
//   getRefreshInfo: jest.fn(() => Promise.resolve({ data: [] })),
// }));

const date = new Date();
const dateString = date.toString();

beforeEach(() => {
  jest.spyOn(dataManagementApi, "getAllTestTypeCodes").mockResolvedValue({
    data: getMockTestTypeCodes(),
  });
  jest.spyOn(dataManagementApi, "getAllTestTypeGroupCodes").mockResolvedValue({
    data: getMockTestTypeGroupCodes(),
  });

  jest.spyOn(monitorPlanApi, "getCheckedOutLocations").mockResolvedValue({
    data: getMockCheckedOutLocations(),
  });
  jest.spyOn(monitorPlanApi, "getRefreshInfo").mockResolvedValue({
    data: [],
  });
})

afterEach(() => {
  jest.clearAllMocks();
})

const selectedConfig = {
  id: 'id',
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
  user: 'user',

  configID: 'testConfigId',
  setSelectedTestCode: jest.fn(),
  checkoutState: true,
};

const testTypeDropdownLabel = /Test Data/i;

// mocking JavaScript built-in window functions
window.open = jest.fn().mockReturnValue({ close: jest.fn() });
window.scrollTo = jest.fn();

const oneMin = 60000;
jest.setTimeout(oneMin);

test('testing QACertEventHeaderInfo component', async () => {
  await render(
    <QACertEventHeaderInfo {...props} />
  )

  const facilityNameHeader = screen.getByTestId('facility-name-header')
  expect(facilityNameHeader).toBeDefined()
});

test('testing QACertEventHeaderInfo component and opening selection modal import', async () => {
  await render(
    <QACertEventHeaderInfo {...props} />
  )

  const importTestDataBtn = screen.getByRole('button', { name: /Import Data/i })
  await act(async () => importTestDataBtn.click())

  const modal = screen.getByTestId('selection-type-import-modal')
  expect(modal).toBeInTheDocument()
});

test('test type dropdown selection renders', async () => {
  // Arrange
  await render(
    <QACertEventHeaderInfo {...props} />
  )
  const testTypeDropdown = screen.getByLabelText(testTypeDropdownLabel);

  // Assert
  expect(testTypeDropdown).toBeInTheDocument();
});

test('renders buttons for "Import Test Data", "Test Data Report", "Test History Report"', async () => {
  // Arrange
  await render(
    <QACertEventHeaderInfo {...props} />
  )

  const importTestDataBtn = screen.getByRole('button', { name: /Import Data/i })

  // Assert
  expect(importTestDataBtn).toBeInTheDocument();
});
