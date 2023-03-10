import { renderHook } from '@testing-library/react-hooks';
import useGetContent from './useGetContent';
import { getContent } from '../../../utils/api/contentApi';

jest.mock('../../../utils/api/contentApi');

describe('useGetContent', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should get and return content', async () => {
    const data = { title: 'Test Title' };
    getContent.mockResolvedValue({ data });

    const { result, waitForNextUpdate } = renderHook(() => useGetContent('/endpoint'));

    expect(getContent).toHaveBeenCalledTimes(1);
    expect(getContent).toHaveBeenCalledWith('/endpoint');

    expect(result.current.content).toBeNull();

    await waitForNextUpdate();

    expect(result.current.content).toEqual(data);
  });

});
