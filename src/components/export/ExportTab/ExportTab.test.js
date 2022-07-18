import React from "react";
import { render, screen, waitForElement } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ExportTab from "./ExportTab";
import * as monitoringPlansApi from "../../../utils/api/monitoringPlansApi";

const axios = require("axios");
jest.mock("axios");

const mpCheckboxName = /Monitoring Plan/i
const qaCheckboxName = /QA & Certification/i
const emCheckboxName = /Emissions/i

const facName = 'Barry (1, 2, CS0AAN)'
const selectedConfig = {
  id: 'TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A'
}
const orisCode = 3
const workspaceSection = 'export'

const props = {
  facility: facName,
  selectedConfig,
  orisCode,
  setExportState: jest.fn(),
  workspaceSection
}

beforeEach(() => {
  const rp = [{
    "id": 1,
    "calendarYear": 1993,
    "quarter": 1,
    "beginDate": "1993-01-01",
    "endDate": "1993-03-31",
    "periodDescription": "1993 QTR 1",
    "periodAbbreviation": "1993 Q1",
    "archiveInd": 0,
    "selected": false
  }]
  axios.get.mockResolvedValueOnce({ status: 200, data: rp })
})

test('renders title', async () => {
  // Arrange
  await waitForElement(() => render(<ExportTab {...props} />))

  const facilityName = screen.getByRole('heading', { name: /barry/i })

  // Assert
  expect(facilityName).toBeInTheDocument()
})

test('renders three checkboxes for Monitoring Plan, QA & Certification, and Emissions', () => {
  // Arrange
  render(<ExportTab {...props} />)

  const mpcheckbox = screen.getByRole('checkbox', { name: mpCheckboxName })
  const qaCheckbox = screen.getByRole('checkbox', { name: qaCheckboxName })
  const emCheckbox = screen.getByRole('checkbox', { name: emCheckboxName })

  // Assert
  expect(mpcheckbox).toBeInTheDocument()
  expect(qaCheckbox).toBeInTheDocument()
  expect(emCheckbox).toBeInTheDocument()
})

test('renders two dropdowns for reporting period selection ', async () => {
  // Arrange
  await waitForElement(() => render(<ExportTab {...props} />))

  const dropdowns = screen.getAllByRole('combobox')

  // Assert
  expect(dropdowns).toHaveLength(2)
})

test('renders buttons for preview and export', async () => {
  // Arrange
  await waitForElement(() => render(<ExportTab {...props} />))

  const previewBtn = screen.getByRole('button', { name: /Preview/i })
  const exportBtn = screen.getByRole('button', { name: /Export/i })

  // Assert
  expect(previewBtn).toBeInTheDocument()
  expect(exportBtn).toBeInTheDocument()
})

test('when only monitoring plan is checked then the preview button is disabled', async () => {
  // Arrange
  await waitForElement(() => render(<ExportTab {...props} />))

  const mpcheckbox = screen.getByRole('checkbox', { name: mpCheckboxName })
  const previewBtn = screen.getByRole('button', { name: /Preview/i })

  // Act
  userEvent.click(mpcheckbox)

  // Assert
  expect(previewBtn).toHaveAttribute('disabled')
})

test('when monitoring plan is checked then the export button is enabled', async () => {
  // Arrange
  await waitForElement(() => render(<ExportTab {...props} />))

  const mpcheckbox = screen.getByRole('checkbox', { name: mpCheckboxName })
  const exportBtn = screen.getByRole('button', { name: /Export/i })

  // Act
  userEvent.click(mpcheckbox)

  // Assert
  expect(exportBtn).not.toHaveAttribute('disabled')
})

test('given monitoring plan is checked when export button is clicked then monitoring plan is downloaded', async () => {
  // Arrange
  monitoringPlansApi.exportMonitoringPlanDownload = jest.fn()
  await waitForElement(() => render(<ExportTab {...props} />))
  const mpcheckbox = screen.getByRole('checkbox', { name: mpCheckboxName })
  const exportBtn = screen.getByRole('button', { name: /Export/i })

  // Act
  userEvent.click(mpcheckbox)
  userEvent.click(exportBtn)

  // Assert
  expect(monitoringPlansApi.exportMonitoringPlanDownload).toHaveBeenCalled()
})

test.skip('given QA & Certifications is checked when export button is clicked then QA is downloaded', async () => {
  // Arrange
  await waitForElement(() => render(<ExportTab {...props} />))
  const qaCheckbox = screen.getByRole('checkbox', { name: qaCheckboxName })
  const exportBtn = screen.getByRole('button', { name: /Export/i })

  // Act
  userEvent.click(qaCheckbox)
  userEvent.click(exportBtn)

  // Assert
  expect(monitoringPlansApi.exportMonitoringPlanDownload).toHaveBeenCalled()
})

test.skip('when preview button is clicked then a table of data is displayed', async () => {
  
})