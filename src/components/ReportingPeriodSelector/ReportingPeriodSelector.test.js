import React from "react";
import { render, screen } from "@testing-library/react";

import ReportingPeriodSelector from "./ReportingPeriodSelector"
import * as qaCertificationsAPI from "../../utils/api/qaCertificationsAPI";

const props = {
  getInitSelection: jest.fn(),
  setLoading: jest.fn()
}

const response = {
  data: [
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
      "id": 2,
      "calendarYear": 1993,
      "quarter": 2,
      "beginDate": "1993-04-01",
      "endDate": "1993-06-30",
      "periodDescription": "1993 QTR 2",
      "periodAbbreviation": "1993 Q2",
      "archiveInd": 0,
      "selected": false
    },
  ]
}

test('renders Year', async () => {
  // Arrange, Act, Assert
  qaCertificationsAPI.getReportingPeriod = jest.fn().mockReturnValueOnce(response)
  render(<ReportingPeriodSelector {...props} />)

  const yearLabel = await screen.findByText(/year/i)

  expect(yearLabel).toBeInTheDocument()
})