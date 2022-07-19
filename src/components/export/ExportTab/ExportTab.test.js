import React from "react";
import { render, screen, waitForElement } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import download from "downloadjs";

import ExportTab from "./ExportTab";
import * as qaCertificationsAPI from "../../../utils/api/qaCertificationsAPI";
import * as monitoringPlansApi from "../../../utils/api/monitoringPlansApi";

const axios = require("axios");
jest.mock("axios");

jest.mock('downloadjs')

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

const previewResp = {
  data: {
    orisCode: 3,
    testSummaryData: [
      { id: "EPA-250DCA42B886527F86DC36246117F257" },
      { id: "EPA-521DD042253347A19CA6947185AA0805" }
    ]
  }
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

test.skip('given QA is checked when preview button is clicked then a table of data is displayed', async () => {
  // Arrange
  await waitForElement(() => render(<ExportTab {...props} />))
  const qaCheckbox = screen.getByRole('checkbox', { name: qaCheckboxName })
  const previewBtn = screen.getByRole('button', { name: /Preview/i })
  // qaCertificationsAPI.exportQA = jest.fn().mockResolvedValueOnce(previewResp)
  axios.get.mockResolvedValueOnce({ status: 200, data: previewResp })
  // exportQA which above line is trying to mock uses secureAxios, may be the issue

  // Act
  userEvent.click(qaCheckbox)
  // userEvent.click(previewBtn)


  // Assert
  const rows = screen.findAllByRole('row')
  expect(rows).toHaveLength(3)
})

test('given monitoring plan is checked when export button is clicked then monitoring plan is downloaded', async () => {
  // Arrange
  await waitForElement(() => render(<ExportTab {...props} />))
  const mpcheckbox = screen.getByRole('checkbox', { name: mpCheckboxName })
  const exportBtn = screen.getByRole('button', { name: /Export/i })
  monitoringPlansApi.exportMonitoringPlanDownload = jest.fn()

  // Act
  userEvent.click(mpcheckbox)
  userEvent.click(exportBtn)

  // Assert
  expect(monitoringPlansApi.exportMonitoringPlanDownload).toHaveBeenCalled()
})

test.skip('given QA & Certifications is checked and a row is selected when export button is clicked then QA is downloaded', async () => {
  // Arrange
  await waitForElement(() => render(<ExportTab {...props} />))
  const qaCheckbox = screen.getByRole('checkbox', { name: qaCheckboxName })
  const exportBtn = screen.getByRole('button', { name: /Export/i })

  // Act
  userEvent.click(qaCheckbox)
  userEvent.click(exportBtn)

  // Assert
  expect(download).toHaveBeenCalled()
})
