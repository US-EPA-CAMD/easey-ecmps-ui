import React from "react";
import { render, waitForElement } from "@testing-library/react";
import ReportGenerator, { ErrorMessage } from "./ReportGenerator";
import * as camdApi from "../../utils/api/camdServices";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../config";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useLocation: () => ({
    pathname: "localhost:3000/example/path",
  }),
}));

const reportData = {
  title: "string",
  facilityId: "number",
  orisCode: "number",
  facilityName: "string",
  stateCode: "string",
  countyName: "string",
  unitStackInfo: "string",
  templateCode: "DTLRPT",
  noResultsMessage: "string",
  details: [
    {
      position: "number",
      title: "string",
      sqlStatement: "string",
      noResultsMessage: "string",
      columns: [
        {
          position: "number",
          name: "string",
          displayName: "string",
        },
      ],
      parameters: [
        {
          position: "number",
          name: "string",
          defaultValue: "any",
        },
      ],
      results: [],
    },
  ],
};

const mock = new MockAdapter(axios);
const getReportUrl = `${config.services.camd.uri}/reports?reportCode=null`;
mock.onGet(getReportUrl).reply(200, reportData);
jest.mock("../../utils/api/camdServices", () => {
  return {
    getReport: jest.fn().mockResolvedValue({
      data: {
        report: {},
      },
    }),
  };
});
const userProp = { user: true };

describe("ReportGenerator", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders login component when auth is required and user is not provided", async () => {
    const { getAllByText } = render(<ReportGenerator requireAuth={true} />);
    const login = await waitForElement(() => getAllByText("Log In")[0]);
    expect(login).toBeInTheDocument();
  });

  test("renders component if auth is not required", async () => {
    render(<ReportGenerator requireAuth={false} />);
    expect(camdApi.getReport).toHaveBeenCalled();
  });
  test("renders component if user is logged in", async () => {
    render(<ReportGenerator requireAuth={true} user={userProp} />);
    expect(camdApi.getReport).toHaveBeenCalled();
  });
});

describe("ErrorMessage", () => {
  it("renders component", () => {
    const { getByText } = render(<ErrorMessage />);
    expect(
      getByText(/An error occurred while generating the report/i)
    ).toBeInTheDocument();
  });
});
