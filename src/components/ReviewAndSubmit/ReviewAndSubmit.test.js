import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import ReviewAndSubmit from './ReviewAndSubmit';

describe('Review and Submit component', () => {

  jest.mock("../../utils/api/monitoringPlansApi.js", () => ({
    getMonitoringPlans: jest.fn().mockResolvedValue({
      data: [
        { id: "MOCK-1", active: true, facilityName: "Barry", name: "1" },
        { id: "MOCK-2", active: true, facilityName: "Barry", name: "2" },
        { id: "MOCK-3", active: true, facilityName: "Barry", name: "3" },
      ],
    }),
  }));
  let query;
  beforeEach(() => {
    query = render(<ReviewAndSubmit />);
  });

  it('renders review and submit component properly', () => {
    const { getByRole } = query;
    expect(getByRole('radio', {name:'Exclude Files with Critical Errors'})).toBeInTheDocument();
    expect(getByRole('radio', {name:'Include Files with Critical Errors'})).toBeInTheDocument();
    expect(getByRole('textbox', {name: 'Facilities'})).toBeInTheDocument();
    expect(getByRole('textbox', {name: 'Configurations'})).toBeInTheDocument();
    expect(getByRole('textbox', {name:'Reporting Periods'})).toBeInTheDocument();
  });

  it('apply button is disabled until facilities are selected', () => {
    const { getByRole, getByText } = query;
    const applyButton = getByRole('button', {name: /apply filter\(s\)/i});
    expect(applyButton).not.toBeEnabled();
    const facilitiesCombobox = getByRole('textbox', {name: 'Facilities'});
    fireEvent.click(facilitiesCombobox);
    const facility1 =  getByText('Barry (3)');
    fireEvent.click(facility1);
  });

  it('table is not rendered until filters are applied', async() =>{
    const { getByRole, getByText } = query;
    const dataTableWrapper = query.container.querySelector('.data-display-table');
    const applyButton = getByRole('button', {name: /apply filter\(s\)/i});
    expect(dataTableWrapper).not.toBeInTheDocument();
    const facilitiesCombobox = getByRole('textbox', {name: 'Facilities'});
    fireEvent.click(facilitiesCombobox);
    const facility1 =  getByText('Barry (3)');
    fireEvent.click(facility1);
    await fireEvent.click(applyButton);
    const updatedDataTableWrapper = await query.container.querySelector('.data-display-table');
    console.log({updatedDataTableWrapper});
    // expect(updatedDataTableWrapper).toBeInTheDocument()
    // screen.debug();
  })

  it('modal appears after submit button is clicked', () => {
    const { getByRole, queryByTestId } = query;
    const modal = queryByTestId('step-indicator');
    expect(modal).not.toBeInTheDocument();
    const submitButton = getByRole('button', {name: /submit/i});
    fireEvent.click(submitButton);
    const updatedModal = queryByTestId('step-indicator');
    expect(updatedModal).toBeInTheDocument();
  })

  it('modal closes when close button is clicked', () => {
    const { getByRole, queryByTestId } = query;
    const submitButton = getByRole('button', {name: /submit/i});
    fireEvent.click(submitButton);
    const modal = queryByTestId('step-indicator');
    const closeModalButton = queryByTestId('closeModalBtn')
    fireEvent.click(closeModalButton);
    const updatedModal = queryByTestId('step-indicator');
    expect(updatedModal).not.toBeInTheDocument();
    expect(modal).toBeInTheDocument()

  })

  //closeModalBtn
});
