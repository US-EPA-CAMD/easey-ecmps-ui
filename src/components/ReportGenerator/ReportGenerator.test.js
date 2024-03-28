import React from "react";
import {  screen } from "@testing-library/react";
import ReportGenerator, { ErrorMessage } from "./ReportGenerator";
import * as camdApi from "../../utils/api/camdServices";
import { getMockReportData } from "../../mocks/functions";
import render from "../../mocks/render";

// Mock Report/Login Components 
jest.mock("./Report/Report", () => () => {
  return <div data-testid="report-component"/>;
});
jest.mock("../Login/Login", () => () => {
  return <div data-testid="login-component"/>;
});
const userProp = { user: true };

describe("ReportGenerator Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it("renders login component when auth is required and user is not provided", async () => {
    const mockReportData = jest.fn().mockResolvedValue({data: getMockReportData()});
    jest
    .spyOn(camdApi, "getReport")
    .mockImplementation(mockReportData); 
    await render(<ReportGenerator requireAuth={true} />);
    expect(screen.getByTestId("login-component")).toBeInTheDocument();
    expect(mockReportData).not.toHaveBeenCalled();
  });

  it("renders component if auth is not required and user is logged in", async () => {
    const mockReportData = jest.fn().mockResolvedValue({data: getMockReportData()});
    jest
    .spyOn(camdApi, "getReport")
    .mockImplementation(mockReportData); 
    await render(<ReportGenerator user={userProp}/>);
    expect(mockReportData).toHaveBeenCalled();
    expect(screen.getByTestId("report-component")).toBeInTheDocument()    
  });
  it("renders error component properly", async () => {
    const errorMessage = "Error generating report";
    await render(<ErrorMessage error={errorMessage}/>);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    //screen.debug(null, Infinity);
  });
});

