import {
    act,
    screen
} from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import * as dataManagementApi from "../../utils/api/dataManagementApi";
import * as monitorPlanApi from "../../utils/api/monitoringPlansApi";
import configureStore from '../../store/configureStore.dev';
import { getMockCheckedOutLocations, getMockTestTypeCodes, getMockTestTypeGroupCodes } from '../../mocks/functions';
import render from "../../mocks/render";
import QACertEventHeaderInfo from './QACertEventHeaderInfo';

const dateString = new Date().toISOString();

const selectedConfig = {
  id: 'id',
  userId: 'testUserId',
  updateDate: dateString,
  addDate: dateString,
  active: true,
  orisCode: 'testOrisCode',
  monitoringLocationData: [
    { id: 'testLocId', name: 'testLocName', type: 'testType', active: true },
  ],
};

const props = {
  facility: 'Test (1, 2, 3)',
  selectedConfigId: selectedConfig.id,
  orisCode: selectedConfig.orisCode,
  sectionSelect: [4, 'Methods'],
  setSectionSelect: jest.fn(),
  setLocationSelect: jest.fn(),
  locationSelect: [0, 'testLocName'],
  user: 'user',
  setSelectedTestCode: jest.fn(),
  checkoutState: true,
};

const store = configureStore({
    monitoringPlans: {
      [selectedConfig.orisCode]: [selectedConfig],
    },
  });

const testTypeDropdownLabel = /Test Data/i;
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

// mocking JavaScript built-in window functions
window.open = jest.fn().mockReturnValue({ close: jest.fn() });
window.scrollTo = jest.fn();

const oneMin = 60000;
jest.setTimeout(oneMin);

test('testing QACertEventHeaderInfo component', async () => {
  await render(
    <Provider store={store}>
      <QACertEventHeaderInfo {...props} />
    </Provider>
  )

  const facilityNameHeader = screen.getByTestId('facility-name-header')
  expect(facilityNameHeader).toBeDefined()
});

test('testing QACertEventHeaderInfo component and opening selection modal import', async () => {
  await render(
    <Provider store={store}>
      <QACertEventHeaderInfo {...props} />
    </Provider>
  )

  const importTestDataBtn = screen.getByRole('button', { name: /Import Data/i })
  await act(async () => importTestDataBtn.click())

  const modal = screen.getByTestId('selection-type-import-modal')
  expect(modal).toBeInTheDocument()
});

test('test type dropdown selection renders', async () => {
  // Arrange
  await render(
    <Provider store={store}>
      <QACertEventHeaderInfo {...props} />
    </Provider>
  )
  const testTypeDropdown = screen.getByLabelText(testTypeDropdownLabel);

  // Assert
  expect(testTypeDropdown).toBeInTheDocument();
});

test('renders buttons for "Import Test Data", "Test Data Report", "Test History Report"', async () => {
  // Arrange
  await render(
    <Provider store={store}>
      <QACertEventHeaderInfo {...props} />
    </Provider>
  )

  const importTestDataBtn = screen.getByRole('button', { name: /Import Data/i })

  // Assert
  expect(importTestDataBtn).toBeInTheDocument();
});
