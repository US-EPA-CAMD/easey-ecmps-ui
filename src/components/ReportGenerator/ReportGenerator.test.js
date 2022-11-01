import React from "react";
import { render } from "@testing-library/react";
import ReportGenerator from "./ReportGenerator";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../config";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useLocation: () => ({
    pathname: "localhost:3000/example/path"
  })
}));

const reportData = {
  title: 'string',
  facilityId: 'number',
  orisCode: 'number',
  facilityName: 'string',
  stateCode: 'string',
  countyName: 'string',
  unitStackInfo: 'string',
  templateCode: 'DTLRPT',
  noResultsMessage: 'string',
  details: [
    {
      position: 'number',
      title: 'string',
      sqlStatement: 'string',
      noResultsMessage: 'string',
      columns: [
        {
          position: 'number',
          name: 'string',
          displayName: 'string',
        }
      ],
      parameters: [
        {
          position: 'number',
          name: 'string',
          defaultValue: 'any',
        }
      ],
      results: [],
    }
  ],
}

const mock = new MockAdapter(axios);
const getReportUrl = `${config.services.camd.uri}/reports?reportCode=null`
mock.onGet(getReportUrl).reply(200, reportData)

const userProp = { user: true }

test('renders ReportGenerator', () => {
  render(<ReportGenerator user={userProp} />)

  expect(mock.history.get.length).toBe(1)
})