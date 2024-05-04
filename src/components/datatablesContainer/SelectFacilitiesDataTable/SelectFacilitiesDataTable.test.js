import config from '../../../config';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';

import MockAdapter from 'axios-mock-adapter';
import { secureAxios } from '../../../utils/api/easeyAuthApi';

const mockStore = configureMockStore();
const store = mockStore({});

const mock = new MockAdapter(axios);

jest.mock('../../../utils/api/easeyAuthApi');
secureAxios.mockImplementation(options => axios(options));


beforeEach(() => {
  jest.setTimeout(60000);
  jest.mock('axios');
});
afterEach(() => {
  jest.clearAllMocks();
});

test('testing edge cases in add tabs function - no checkedout locations ', async () => {
  const requestHeaders = {
    'x-api-key': config.app.apiKey,
  };

  let url = config.services.facilities.uri;
  mock.onGet(url, requestHeaders).reply(200, []);
});
