// import React from "react";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import SummaryReport from "./Report";

// const reportData = {
//   title: 'string',
//   facilityId: 'number',
//   orisCode: 'number',
//   facilityName: 'string',
//   stateCode: 'string',
//   countyName: 'string',
//   unitStackInfo: 'string',
//   templateCode: 'string',
//   noResultsMessage: 'string',
//   details: [
//     {
//       position: 'number',
//       title: 'string',
//       sqlStatement: 'string',
//       noResultsMessage: 'string',
//       columns: [
//         {
//           position: 1,
//           name: 'Code',
//           displayName: 'columnDisplayName',
//         },
//       ],
//       parameters: [
//         {
//           position: 'number',
//           name: 'string',
//           defaultValue: 'any',
//         }
//       ],
//       results: [
//         {
//           Code: 'code',
//           CodeDescription: 'codeDescription'
//         }
//       ],
//     }
//   ],
// }

// window.close = jest.fn()
// window.print = jest.fn()

// test('renders SummaryReport', () => {
//   render(<SummaryReport reportData={reportData} dataLoaded={true} />)
//   const facDetails = screen.getByText(/Facility Details/i)
//   expect(facDetails).toBeInTheDocument()
// })

// test('when user clicks button to close then report is closed', () => {
//   // Arrange
//   render(<SummaryReport reportData={reportData} dataLoaded={true} />)

//   // Act
//   const closeBtn = screen.getByRole('button', { name: `Close ${reportData.title}` })
//   userEvent.click(closeBtn)

//   // Assert
//   expect(window.close).toHaveBeenCalled()
// })

// test('when user clicks button to print then report is printed, line 103', () => {
//   // Arrange
//   render(<SummaryReport reportData={reportData} dataLoaded={true} />)

//   // Act
//   const printBtn = screen.getByRole('button', { name: `Print ${reportData.title}` })
//   userEvent.click(printBtn)

//   // Assert
//   expect(window.print).toHaveBeenCalled()
// })