import React from "react";
import { render, screen, waitForElement, within, queryByAttribute  } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ReportingPeriodSelector from "./ReportingPeriodSelector"

const axios = require("axios");
jest.mock("axios");

const props = {
  getInitSelection: jest.fn(),
  setLoading: jest.fn(),
  reportingPeriodSelectionHandler: jest.fn(),
}

const reportingPeriods = [
  {
    "id": 1,
    "calendarYear": 1993,
    "quarter": 1,
    "beginDate": "1993-01-01",
    "endDate": "1993-03-31",
    "periodDescription": "1993 QTR 1",
    "periodAbbreviation": "1993 Q1",
    "archiveInd": 0,
    "selected": false
  },
  {
    "id": 5,
    "calendarYear": 1994,
    "quarter": 1,
    "beginDate": "1994-01-01",
    "endDate": "1994-03-31",
    "periodDescription": "1994 QTR 1",
    "periodAbbreviation": "1994 Q1",
    "archiveInd": 0,
    "selected": false
  },
  {
    "id": 6,
    "calendarYear": 1994,
    "quarter": 2,
    "beginDate": "1994-04-01",
    "endDate": "1994-06-30",
    "periodDescription": "1994 QTR 2",
    "periodAbbreviation": "1994 Q2",
    "archiveInd": 0,
    "selected": false
  },
]

const yearLabelText = /year/i
const quarterLabelText = /quarter/i

axios.get.mockResolvedValue({ status: 200, data: reportingPeriods })

test('renders year/quarter/reporting period labels', async () => {
  // Arrange
  render(<ReportingPeriodSelector {...props} />)
  const yearLabel = await screen.findByLabelText(/year/i)
  const quarterLabel = screen.getByLabelText(/quarter/i)
  const rpLabel = screen.getByLabelText(/reporting period/i)

  // Assert
  expect(yearLabel).toBeInTheDocument()
  expect(quarterLabel).toBeInTheDocument()
  expect(rpLabel).toBeInTheDocument()
})

test('renders correct number of options for year dropdown', async () => {
  // Arrange
  const numYearOptions = new Set(reportingPeriods.map(rp => rp.calendarYear))
  await waitForElement(() => render(<ReportingPeriodSelector {...props} />))
  const yearDropdown = screen.getByLabelText(yearLabelText)
  const yearOptions = within(yearDropdown).getAllByRole('option')

  // Assert
  expect(yearOptions).toHaveLength(numYearOptions.size)
})

test('renders correct number of options for quarter dropdown', async () => {
  // Arrange
  const singleYearData = reportingPeriods.filter(rp => rp.calendarYear === 1994)
  const numQuarterOptions = new Set(singleYearData.map(rp => rp.quarter))
  await waitForElement(() => render(<ReportingPeriodSelector {...props} />))
  const quarterDropdown = screen.getByLabelText(quarterLabelText)
  const quarterOptions = within(quarterDropdown).getAllByRole('option')

  // Assert
  expect(quarterOptions).toHaveLength(numQuarterOptions.size)
})

test('when a user selects a year from the dropdown then that element\'s selected value is truthy', async () => {
  // Arrange
  await waitForElement(() => render(<ReportingPeriodSelector {...props} />))
  const yearDropdown = screen.getByLabelText(yearLabelText)
  const selectedOption = screen.getByRole('option', { name: /1994/i })
  const unselectedOption = screen.getByRole('option', { name: /1994/i })

  // Act
  // select earlier year, year option defaults to most recent year
  userEvent.selectOptions(yearDropdown, '1993');

  // Assert
  expect(selectedOption.selected).toBeFalsy()
  expect(unselectedOption.selected).toBeFalsy();
})

test('when a user selects a quarter from the dropdown then that element\'s selected value is truthy', async () => {
  // Arrange
  await waitForElement(() => render(<ReportingPeriodSelector {...props} />));
  const quarterDropdown = screen.getByLabelText(quarterLabelText)
  const selectedOption = within(quarterDropdown).getByRole('option', { name: /Q1/i })
  const unselectedOption = within(quarterDropdown).getByRole('option', { name: /Q2/i })
  

  // Act
  // select earlier quarter, quarter option defaults to most recent quarter
  userEvent.selectOptions(quarterDropdown, '1');

  // Assert
  expect(selectedOption.selected).toBeTruthy()
  expect(unselectedOption.selected).toBeFalsy();
})

test('when a user selects a year from the dropdown then begin/end date reflect that change', async () => {
  // Arrange
  const selectedYear = '1993'
  const selectedDataObj = reportingPeriods.find(reportingPeriod => reportingPeriod.calendarYear === parseInt(selectedYear))
  await waitForElement(() => render(<ReportingPeriodSelector {...props} />))
  const yearDropdown = screen.getByLabelText(yearLabelText)

  // Act
  // select a previous year, init selection is most recent year/quarter
  userEvent.selectOptions(yearDropdown, selectedYear);

  const beginDate = screen.getByText(selectedDataObj.beginDate)
  const endDate = screen.getByText(selectedDataObj.endDate)

  // Assert
  expect(beginDate).toBeInTheDocument()
  expect(endDate).toBeInTheDocument()
})

test('when a user selects a quarter from the dropdown then begin/end date reflect that change', async () => {
  // Arrange
  const dataForSingleYear = reportingPeriods.filter(rp => rp.calendarYear === 1994)
  const selectedQuarter = '1'
  const selectedDataObj = dataForSingleYear.find(reportingPeriod => reportingPeriod.quarter === parseInt(selectedQuarter))
  await waitForElement(() => render(<ReportingPeriodSelector {...props} />))
  const quarterDropdown = screen.getByLabelText(quarterLabelText)

  // Act
  // select a previous quarter, init selection is most recent year/quarter
  userEvent.selectOptions(quarterDropdown, selectedQuarter);

  const beginDate = screen.getByText(selectedDataObj.beginDate)
  const endDate = screen.getByText(selectedDataObj.endDate)

  // Assert
  expect(beginDate).toBeInTheDocument()
  expect(endDate).toBeInTheDocument()
})

test('given an export state with reportingPeriodId exists then year/quarter dropdowns init with that reporting period selected', async () => {
  // Arrange
  const exportState = { reportingPeriodId: 1 } // selected year: 1993, quarter: Q1
  await waitForElement(() => render(<ReportingPeriodSelector {...{ ...props, exportState }} />))
  const yearDropdown = screen.getByLabelText(yearLabelText)
  const quarterDropdown = screen.getByLabelText(quarterLabelText)
  const selectedYear = within(yearDropdown).getByRole('option', { name: /1993/i })
  const selectedQuarter = within(quarterDropdown).getByRole('option', { name: /Q1/i })

  // Assert
  expect(selectedYear.selected).toBeTruthy()
  expect(selectedQuarter.selected).toBeTruthy();
})

test('when only monitoring plan is checked then dropdowns are disabled', async () => {
  // Arrange
  const mpName = 'monitoring-plan'
  const dataTypes = [{ label: "Monitoring Plan", name: mpName, checked: true, }]
  const isExport = true;
  await waitForElement(() => render(<ReportingPeriodSelector {...{ ...props, isExport, dataTypes }} />))
  const yearDropdown = screen.getByLabelText(yearLabelText)
  const quarterDropdown = screen.getByLabelText(quarterLabelText)

  // Assert
  expect(yearDropdown).toHaveAttribute('disabled')
  expect(quarterDropdown).toHaveAttribute('disabled')
})
