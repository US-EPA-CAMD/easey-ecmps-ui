import React from 'react';
import { render } from '@testing-library/react';
import {
  QACertEventTab,
  mapStateToProps,
  mapDispatchToProps,
} from './QACertEventTab';
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore.dev';
import { convertSectionToStoreName } from '../../additional-functions/workspace-section-and-store-names';
import * as actions from '../../store/actions/dynamicFacilityTab';
const store = configureStore();
const axios = require('axios');
jest.mock('axios');
jest.mock('../../store/actions/dynamicFacilityTab');

jest.mock('../QACertEventTabRender/QACertEventTabRender', () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
  };
});

const selectedConfig = {
  id: 'MDC',
  name: '1',
  locations: [
    {
      id: '65',
      name: '110',
      type: 'Unit',
      active: false,
      retireDate: null,
    },
  ],
};
const props = {
  title: ' ( test ) ',
  user: { firstName: 'test' },
  locations: selectedConfig.locations,
  selectedConfig: selectedConfig,
  setSectionSelect: jest.fn(),
  setLocationSelect: jest.fn(),
  sectionSelect: [3, 'Methods'],
  locationSelect: [0, '65'],
  orisCode: '5',
  tabs: [{ selectedConfig: selectedConfig, location: 0, section: 0 }],
  configID: selectedConfig.id,
  activeTab: 0,
  setSection: jest.fn(),
  setLocation: jest.fn(),
};
test('tests QACertEventTab', async () => {
  const { container } = render(
    <Provider store={store}>
      <QACertEventTab {...props} />{' '}
    </Provider>
  );

  expect(container).not.toBeUndefined();
});

test('tests QACertEventTab with conditionals ', async () => {
  const condProps = {
    title: ' ( test ) ',
    user: { firstName: 'test' },
    locations: selectedConfig.locations,
    selectedConfig: selectedConfig,
    setSectionSelect: jest.fn(),
    setLocationSelect: jest.fn(),
    sectionSelect: [3, 'Methods'],
    locationSelect: [0, '65'],
    orisCode: '5',
    configID: selectedConfig.id,
    activeTab: 0,
    setSection: jest.fn(),
    setLocation: jest.fn(),
    tabs: {
      find: jest.fn().mockResolvedValue({
        section: 'SECTION',
        location: selectedConfig.locations[0],
      }),
    },
  };

  const { container } = render(
    <Provider store={store}>
      <QACertEventTab {...condProps} />{' '}
    </Provider>
  );

  expect(container).not.toBeUndefined();
});

describe('workspace store names', () => {
  const QA_CERT_EVENT_STORE_NAME = 'qaCertEvent';

  it('should test with valid input', () => {
    expect(convertSectionToStoreName(QA_CERT_EVENT_STORE_NAME)).toBe(
      'qaCertEvent'
    );
  });
});
test('mapDispatchToProps calls the appropriate action', async () => {
  const QA_CERT_EVENT_STORE_NAME = 'qaCertEvent';
  // mock the 'dispatch' object
  const dispatch = jest.fn();
  const actionProps = mapDispatchToProps(dispatch);
  const state = {
    openedFacilityTabs: [convertSectionToStoreName(QA_CERT_EVENT_STORE_NAME)],
  };

  // verify the appropriate action was called
  actionProps.setLocation();
  expect(actions.setLocationSelectionState).toHaveBeenCalled();
  actionProps.setSection();
  expect(actions.setSectionSelectionState).toHaveBeenCalled();
  actionProps.updateTestTypeCodes();
  actionProps.setCheckout();
  expect(state).toBeDefined();
});

test('mapStateToProps calls the appropriate state', async () => {
  const QA_CERT_EVENT_STORE_NAME = 'qaCertEvent';
  // mock the 'dispatch' object
  const dispatch = jest.fn();
  const state = {
    openedFacilityTabs: [convertSectionToStoreName(QA_CERT_EVENT_STORE_NAME)],
  };
  const stateProps = mapStateToProps(state, true);
});
