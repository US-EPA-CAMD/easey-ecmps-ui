import React from 'react';
import { render, screen } from '@testing-library/react';
import GenericTable from './GenericTable';

describe('GenericTable', () => {
  const mockData = [
    {
      column1: 'test1',
      column2: 'test2',
      expandable: '+',
    },
  ];

  test('renders without crashing', () => {
    render(<GenericTable data1={mockData} expandable={true} />);
  });

  test('renders title correctly', () => {
    render(
      <GenericTable data1={mockData} expandable={true} title="Table Title" />,
    );
    const titleElement = screen.getByText(/Table Title/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders additionalTitle correctly', () => {
    render(
      <GenericTable
        data1={mockData}
        expandable={true}
        additionalTitle="Additional Title"
      />,
    );
    const additionalTitleElement = screen.getByText(/Additional Title/i);
    expect(additionalTitleElement).toBeInTheDocument();
  });

  test('renders table headers correctly', () => {
    render(<GenericTable data1={mockData} expandable={true} />);
    const header1 = screen.getByText(/column1/i);
    const header2 = screen.getByText(/column2/i);
    expect(header1).toBeInTheDocument();
    expect(header2).toBeInTheDocument();
  });
});
