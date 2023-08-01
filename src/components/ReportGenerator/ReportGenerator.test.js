import React from "react";
import { render, act, screen } from "@testing-library/react";
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
const userProp = { user: true };

describe("ReportGenerator", () => {
  let getReportSpy;
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    getReportSpy = jest.spyOn(camdApi, "getReport").mockResolvedValue({
      data: {
        report: {},
      },
    })
  });

  test("renders login component when auth is required and user is not provided", async () => {
    const { getAllByText } = render(<ReportGenerator requireAuth={true} />);
    let login = await getAllByText("Log In")[0]
    expect(login).toBeInTheDocument();
  });

  test("renders component if auth is not required", async () => {
    render(<ReportGenerator requireAuth={false} />);
    expect(getReportSpy).toHaveBeenCalled();
  });
  test("renders component if user is logged in", async () => {
    render(<ReportGenerator requireAuth={true} user={userProp} />);
    expect(getReportSpy).toHaveBeenCalled();
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
