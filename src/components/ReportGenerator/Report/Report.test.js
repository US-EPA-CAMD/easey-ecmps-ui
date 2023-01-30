import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryReport from "./Report";
import { act } from "react-test-renderer";

const reportData = {
    "displayName": "Monitoring Plan Evaluation Report",
    "details": [
        {
            "displayName": "Evaluation Results",
            "templateCode": "EVAL",
            "templateType": "DEFAULT",
            "results": [
                {
                    "unitStack": "5",
                    "severityCode": "NONE",
                    "categoryDescription": "Unit Program Parameter Evaluation",
                    "checkCode": "PROGRAM-11-D",
                    "resultMessage": "Although Unit ID 5 is a ARP affected unit, monitoring method(s) for OP have not been reported for the unit, for a common stack or pipe linked to the unit, or for all multiple stacks or pipes linked to the unit for the entire evaluation period.  If you believe that this error is incorrect, and has been caused by an inaccurate date in the Unit Program record, please contact ECMPS Support at ecmps-support@camdsupport.com."
                }
            ]
        }
    ],
    "columns": [
        {
            "code": "EVAL",
            "values": [
                {
                    "name": "unitStack",
                    "displayName": "Unit/Stack"
                },
                {
                    "name": "severityCode",
                    "displayName": "Severity"
                },
                {
                    "name": "categoryDescription",
                    "displayName": "Category"
                },
                {
                    "name": "checkCode",
                    "displayName": "Check Code"
                },
                {
                    "name": "resultMessage",
                    "displayName": "Result Message"
                }
            ]
        }
    ]
}


window.close = jest.fn()
window.print = jest.fn()

test('renders SummaryReport', () => {
  render(<SummaryReport reportData={reportData} dataLoaded={true} />)
  const reportTitle = screen.getByText(/Monitoring Plan Evaluation Report/i)
  expect(reportTitle).toBeInTheDocument()
})

test('when user clicks button to close then report is closed', async() => {
  // Arrange
  render(<SummaryReport reportData={reportData} dataLoaded={true} />)

  // Act
  const closeBtn = screen.getByRole('button', { name: `Close ${reportData.title}` })
  await act(async() => await userEvent.click(closeBtn))

  // Assert
  expect(window.close).toHaveBeenCalled()
})
  
test('when user clicks button to print then report is printed, line 103', async() => {
  // Arrange
  render(<SummaryReport reportData={reportData} dataLoaded={true} />)

  // Act
  const printBtn = screen.getByRole('button', { name: `Print ${reportData.title}` })
  await act(async() => await userEvent.click(printBtn))

  // Assert
  expect(window.print).toHaveBeenCalled()
})
