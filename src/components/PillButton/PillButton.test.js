import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react';

import PillButton from './PillButton';

const mockHandler = {
  onClick: jest.fn(),
  onRemove: jest.fn(),
};

describe('<PillButton/>', () => {
  let query;
  beforeEach(() => {
    query = render(
      <PillButton
        key={'key'}
        index={'index'}
        label={'label'}
        position="bottom"
        tooltip={'tooltip'}
        onClick={mockHandler.onClick}
        onRemove={mockHandler.onRemove}
      />
    );
  });

  afterEach(cleanup);

  it('handles click events with tooltips', () => {
    const { getByText } = query;
    fireEvent.click(getByText('label'));
    expect(mockHandler.onClick).toHaveBeenCalledTimes(1);
  });

  it('handles remove events', () => {
    const { getByTestId } = query;
    fireEvent.click(getByTestId('index-remove'));
    expect(mockHandler.onRemove).toHaveBeenCalledTimes(1);
  });
});
