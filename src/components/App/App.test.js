import React from 'react';
import App from './App';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import config from '../../config';
import userEvent from '@testing-library/user-event';

jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});
jest.useFakeTimers();
jest.spyOn(global, 'setInterval');
jest.spyOn(global, 'setTimeout');
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
  connect: (mapStateToProps, mapDispatchToProps) => (ReactComponent) => ({
    mapStateToProps,
    mapDispatchToProps,
    ReactComponent,
  }),
}));

const mockTagManger = jest.fn();
jest.mock('react-gtm-module', () => ({ initialize: () => mockTagManger() }));
const mockApiCall = jest.fn().mockResolvedValue({
  data: [],
});
jest.mock('../../utils/api/monitoringPlansApi', () => ({
  getCheckedOutLocations: () => mockApiCall(),
}));

describe('App tests', () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    jest.advanceTimersByTime(10000);
    const loginButton = screen.getAllByText(/Log In/i)[0];
    expect(loginButton).toBeInTheDocument();
  });

  it('does not call tag manager if google analytics is not enabled', () => {
    config.app.googleAnalyticsEnabled = false;
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(mockTagManger).not.toHaveBeenCalled();
  });

  it('calls tag manager if google analytics is enabled', () => {
    config.app.googleAnalyticsEnabled = true;
    config.app.googleAnalyticsPublicContainerId = '123';
    config.app.googleAnalyticsAuthenticatedContainerId = '123';
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    jest.advanceTimersByTime(10000);
    expect(mockTagManger).toHaveBeenCalled();
  });
});
