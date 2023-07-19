import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { SelectFacilitiesDataTable } from './SelectFacilitiesDataTable';
import { Provider } from 'react-redux';
import config from '../../../config';
import * as facilitiesApi from '../../../utils/api/facilityApi';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';

import MockAdapter from 'axios-mock-adapter';
import { secureAxios } from '../../../utils/api/easeyAuthApi';

const mockStore = configureMockStore();
const store = mockStore({});

const mock = new MockAdapter(axios);

jest.mock('../../../utils/api/easeyAuthApi');
secureAxios.mockImplementation(options => axios(options));

function componentRenderer(args) {
  const defualtProps = {
    user: { firstName: 'test' },
    addtabs: jest.fn(),
    openedFacilityTabs: [],
    mostRecentlyCheckedInMonitorPlanIdForTab: [],
    setMostRecentlyCheckedInMonitorPlanIdForTab: jest.fn(),
  };

  const props = { ...defualtProps, ...args };
  return render(
    <Provider store={store}>
      <SelectFacilitiesDataTable {...props} />
    </Provider>,
  );
}

function componentRendererNoData(args) {
  const defualtProps = {
    facilities: [],
    loadFacilitiesData: jest.fn(),
    loading: true,
  };

  const props = { ...defualtProps, ...args };
  return render(
    <Provider store={store}>
      <SelectFacilitiesDataTable {...props} />
    </Provider>,
  );
}

const data = [
  {
    monPlanId: 'test',
    facilityId: '3',
    facilityName: 'Barry',
    state: 'AL',
  },
  {
    monPlanId: '2',
    facilityId: '5',
    facilityName: 'Chickasaw',
    state: 'AL',
  },
];

// edgecase in addtabs function
const unmatchedData = [
  {
    monPlanId: 'testunmatched',
    facilityId: '3',
    facilityName: 'Barry',
    state: 'AL',
  },
];

beforeEach(() => {
  jest.setTimeout(60000);
  jest.mock('axios');
});
afterEach(() => {
  jest.clearAllMocks();
});

/*
test("testing redux connected data-table component renders all records", async () => {
  axios.mockImplementation(() => Promise.resolve({ status: 200, data: data }));

  const title = await facilitiesApi.getAllFacilities();
  expect(title.data).toEqual(data);

  let { container } = await waitForElement(() => componentRenderer());
  expect(container).toBeDefined();
  const headerColumns = container.querySelectorAll("tbody tr");
  let backBtns = container.querySelector("#testingBtn");
  fireEvent.click(backBtns);

  expect(headerColumns.length).toEqual(5);
});
*/

test('testing edge cases in add tabs function - unmatched id ', async () => {
  // mock.get.mockResolvedValueOnce({ status: 200, data: unmatchedData });
  const requestHeaders = {
    'x-api-key': config.app.apiKey,
  };

  let url = config.services.facilities.uri;
  mock.onGet(url, requestHeaders).reply(200, []);

  mock.onGet('/facilities').reply(200, unmatchedData);

  const title = await facilitiesApi.getAllFacilities();
  expect(title.data).toEqual(unmatchedData);

  let { container } = componentRenderer();
  // let backBtns = container.querySelector('#testingBtn');
  // fireEvent.click(backBtns);
  expect(container).toBeDefined();
});

test('testing edge cases in add tabs function - no checkedout locations ', async () => {
  const requestHeaders = {
    'x-api-key': config.app.apiKey,
  };

  let url = config.services.facilities.uri;
  mock.onGet(url, requestHeaders).reply(200, []);

  let { container } = await waitFor(() => componentRenderer());
  // let backBtns = container.querySelector('#testingBtn');
  // fireEvent.click(backBtns);
  expect(container).toBeDefined();
});
