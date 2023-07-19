import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import CustomAccordion from "./CustomAccordion";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';
describe('CustomAccordion', () => {
  const table = [
    ['Content 1', 'Section 1'],
    ['Content 2', 'Section 2'],
  ];

  it('renders the accordion with correct initial state', () => {
    render(
      <CustomAccordion
        title="Accordion Title"
        table={table}
        section="Section"
      />
    );

    expect(screen.queryAllByTestId('expandBTN')).toHaveLength(2);
    expect(screen.queryAllByTestId('collapseBTN')).toHaveLength(0);

    expect(screen.getByText('Section 1')).toBeInTheDocument();
  });

  it('toggles the accordion state on button click', () => {
    const {container} = render(
      <CustomAccordion
        title="Accordion Title"
        table={table}
        section="Section"
      />
    );

    const expandButtons =screen.queryAllByTestId('expandBTN');
    fireEvent.click(expandButtons[0]);

    expect(screen.queryAllByTestId('collapseBTN')).toHaveLength(1);

  });

  it('calls the header button click handler when clicked', () => {
    const headerButtonClickHandler = jest.fn();

    render(
      <CustomAccordion
        title="Accordion Title"
        table={table}
        section="Section"
        headerButtonText="Button Text"
        headerButtonClickHandler={headerButtonClickHandler}
      />
    );

    const button = screen.getAllByText('Button Text');
    fireEvent.click(button[0]);

    expect(headerButtonClickHandler).toHaveBeenCalledTimes(1);
  });
});
