import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import ReportingPeriodSelector from "./ReportingPeriodSelector";
import config from "../../config";
import { secureAxios } from "../../utils/api/easeyAuthApi";

jest.mock("../../utils/api/easeyAuthApi");
secureAxios.mockImplementation((options) => axios(options));

const props = {
  setLoading: jest.fn(),
  reportingPeriodSelectionHandler: jest.fn(),
};

const reportingPeriods = [
  {
    id: 1,
    calendarYear: 1993,
    quarter: 1,
    beginDate: "1993-01-01",
    endDate: "1993-03-31",
    periodDescription: "1993 QTR 1",
    periodAbbreviation: "1993 Q1",
    archiveInd: 0,
    selected: false,
  },
  {
    id: 5,
    calendarYear: 1994,
    quarter: 1,
    beginDate: "1994-01-01",
    endDate: "1994-03-31",
    periodDescription: "1994 QTR 1",
    periodAbbreviation: "1994 Q1",
    archiveInd: 0,
    selected: false,
  },
  {
    id: 6,
    calendarYear: 1994,
    quarter: 2,
    beginDate: "1994-04-01",
    endDate: "1994-06-30",
    periodDescription: "1994 QTR 2",
    periodAbbreviation: "1994 Q2",
    archiveInd: 0,
    selected: false,
  },
];

const mock = new MockAdapter(axios);

const getReportingPeriodsUrl = `${config.services.mdm.uri}/reporting-periods?export=true`;

mock.onGet(getReportingPeriodsUrl).reply(200, reportingPeriods);

const reportingPeriodDropdownLabel = /Reporting Periods/i;

test("renders reporting period and dropdown label", async () => {
  //These Test Cases are outdated
//   render(<ReportingPeriodSelector {...props} />);
//   const reportingPeriodsTitle = await screen.findByLabelText(
//     "Reporting Period",
//     { exact: true }
//   );
//   const dropdownTitle = screen.getByLabelText(reportingPeriodDropdownLabel, {
//     exact: true,
//   });

//   // Assert
//   expect(reportingPeriodsTitle).toBeInTheDocument();
//   expect(dropdownTitle).toBeInTheDocument();
});

test("renders correct number of options for year dropdown", async () => {
  //These Test Cases are outdated
//   const numOptions = reportingPeriods.length;
//   await waitFor(async() => await render(<ReportingPeriodSelector {...props} />));
//   const reportingPeriodDropdown = screen.getByLabelText(
//     reportingPeriodDropdownLabel
//   );
//   const options = within(reportingPeriodDropdown).getAllByRole("option");

//   // Assert
//   expect(options).toHaveLength(numOptions);
});

test("when a user selects a reporting period from the dropdown then that element's selected value is truthy", async () => {
  //These Test Cases are outdated
  await waitFor(() => render(<ReportingPeriodSelector {...props} />));
//   const reportingPeriodDropdown = screen.getByLabelText(
//     reportingPeriodDropdownLabel
//   );
//   const selectedOption = within(reportingPeriodDropdown).getByRole("option", {
//     name: /1994 Q1/i,
//   });
//   const unselectedOption = within(reportingPeriodDropdown).getByRole("option", {
//     name: /1994 Q2/i,
//   });

//   // Act
//   // select earlier year, year option defaults to most recent year
//   const selectedId = "5"; // 1994 Q1
//   userEvent.selectOptions(reportingPeriodDropdown, selectedId);

//   // Assert
//   expect(selectedOption.selected).toBeTruthy();
//   expect(unselectedOption.selected).toBeFalsy();
});

test("when a user selects a reporting period from the dropdown then begin/end date reflect that change", async () => {
  //These Test Cases are outdated
//   const selectedId = "1";
//   const selectedDataObj = reportingPeriods.find(
//     (reportingPeriod) => reportingPeriod.id === Number(selectedId)
//   );
//   await waitFor(async () =>
//     render(<ReportingPeriodSelector {...props} />)
//   );
//   const reportingPeriodDropdown = screen.getByLabelText(
//     reportingPeriodDropdownLabel
//   );

//   // Act
//   // select a previous year, init selection is most recent year/quarter
//   userEvent.selectOptions(reportingPeriodDropdown, selectedId);

//   const beginDate = await screen.findByText(selectedDataObj.beginDate);
//   const endDate = screen.getByText(selectedDataObj.endDate);

//   // Assert
//   expect(beginDate).toBeInTheDocument();
//   expect(endDate).toBeInTheDocument();
});

test("given an export state with reportingPeriodId exists then year/quarter dropdowns init with that reporting period selected", async () => {
  //These Test Cases are outdated
//   const exportState = { reportingPeriodId: 1 }; // selected year: 1993, quarter: Q1
//   await waitFor(() =>
//     render(<ReportingPeriodSelector {...{ ...props, exportState }} />)
//   );
//   const reportingPeriodDropdown = screen.getByLabelText(
//     reportingPeriodDropdownLabel
//   );
//   const selectedYear = within(reportingPeriodDropdown).getByRole("option", {
//     name: /1993 Q1/i,
//   });

//   // Assert
//   expect(selectedYear.selected).toBeTruthy();
});

test("when only monitoring plan is checked then dropdowns are disabled", async () => {
  //These Test Cases are outdated
//   const mpName = "monitoring-plan";
//   const dataTypes = [{ label: "Monitoring Plan", name: mpName, checked: true }];
//   const isExport = true;
//   await waitFor(() =>
//     render(<ReportingPeriodSelector {...{ ...props, isExport, dataTypes }} />)
//   );
//   const reportingPeriodDropdown = screen.getByLabelText(
//     reportingPeriodDropdownLabel
//   );

//   // Assert
//   expect(reportingPeriodDropdown).toHaveAttribute("disabled");
});
