import { renderHook } from '@testing-library/react-hooks';
import useGetCheckedOutLocations, { obtainCheckedOutLocations } from './useGetCheckedOutLocations';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

const data = [
  {
    facId: 946,
    monPlanId: 'MDC-A176443524F0445CA3FDB90DB059D5A5',
    checkedOutOn: '2022-12-08T14:54:31.881Z',
    checkedOutBy: 'rboehme-dp',
    lastActivity: '2022-12-08T14:54:31.881Z',
  },
]

const mockApiCall = jest.fn().mockResolvedValue({ data });

jest.mock('../utils/api/monitoringPlansApi', () => ({
  getCheckedOutLocations: () => mockApiCall(),
}));

describe('useGetCheckedOutLocations', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');
    mockApiCall.mockClear();
    mockDispatch.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should make an API call upon execution', () => {
    renderHook(useGetCheckedOutLocations);
    expect(mockApiCall).toHaveBeenCalled();
  });

  it('should update redux state with new data after the specified time interval', () => {
    renderHook(useGetCheckedOutLocations);
    jest.advanceTimersByTime(10000);
    expect(mockDispatch).toHaveBeenCalled();
    expect(global.setInterval).toHaveBeenCalledTimes(1);
  });
});

describe('obtainCheckedOutLocations', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockApiCall.mockClear();
  })

  it('does not call dispatch if no dispatch is provided', async () => {
    await obtainCheckedOutLocations({});
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('calls dispatch and returns checked out locations if dispatch is provided', async () => {
    const result = await obtainCheckedOutLocations({ dispatch: mockDispatch });
    expect(result).toEqual(data);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
