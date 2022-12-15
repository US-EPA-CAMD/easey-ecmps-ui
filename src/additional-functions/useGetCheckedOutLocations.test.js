import { renderHook } from '@testing-library/react-hooks';
import useGetCheckedOutLocations from './useGetCheckedOutLocations';

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

const mockApiCall = jest.fn().mockResolvedValue({
  data: [
    {
      facId: 946,
      monPlanId: 'MDC-A176443524F0445CA3FDB90DB059D5A5',
      checkedOutOn: '2022-12-08T14:54:31.881Z',
      checkedOutBy: 'rboehme-dp',
      lastActivity: '2022-12-08T14:54:31.881Z',
    },
  ],
});
jest.mock('../utils/api/monitoringPlansApi', () => ({
  getCheckedOutLocations: () => mockApiCall(),
}));

describe('useGetCheckedOutLocations', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it('should make api call', () => {
    renderHook(useGetCheckedOutLocations);
    expect(mockApiCall).toHaveBeenCalled();
  });
  it('should should update redux state if new data is received', () => {
    renderHook(useGetCheckedOutLocations);
    jest.advanceTimersByTime(10000);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
