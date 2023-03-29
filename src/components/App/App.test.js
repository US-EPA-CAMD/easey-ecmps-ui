import React from 'react';
import App from './App';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});
jest.useFakeTimers();
jest.spyOn(global, 'setInterval');
jest.spyOn(global, 'setTimeout');
const mockDispatch = jest.fn();

jest.mock("@us-epa-camd/easey-design-system", () => ({
  ...jest.requireActual("@us-epa-camd/easey-design-system"),
  Header: () => <></>,
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
  connect: (mapStateToProps, mapDispatchToProps) => (ReactComponent) => ({
    mapStateToProps,
    mapDispatchToProps,
    ReactComponent,
  }),
}));
const mockApiCall = jest.fn().mockResolvedValue({
  data: [],
});
jest.mock('../../utils/api/monitoringPlansApi', () => ({
  getCheckedOutLocations: () => mockApiCall(),
}));
it('renders without crashing', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  jest.advanceTimersByTime(10000);
  screen.debug();
});
