import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EmissionsImportTypeModalContent } from './EmissionsImportTypeModalContent';

describe('EmissionsImportTypeModalContent', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <EmissionsImportTypeModalContent onChange={() => {}} />,
    );
    expect(getByText('Import Historical or File Data')).toBeInTheDocument();
  });

  it('calls onChange when an option is selected', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <EmissionsImportTypeModalContent onChange={onChange} />,
    );
    fireEvent.change(getByRole('combobox'), { target: { value: 'file' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('renders correct options', () => {
    const { getByText } = render(
      <EmissionsImportTypeModalContent onChange={() => {}} />,
    );
    expect(getByText('Select Data Type to Import')).toBeInTheDocument();
    expect(getByText('Import From File')).toBeInTheDocument();
    expect(getByText('Import From Historical Data')).toBeInTheDocument();
  });
});
