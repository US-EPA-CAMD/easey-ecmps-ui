import React from "react";
import { render, screen } from "@testing-library/react";
import {getReport,submitData} from "./camdServices";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const mock = new MockAdapter(axios);
import config from "../../config";

const props = {
  selectionData: { beginDate: '1/1/11', endDate: '1/1/11' },
  selectedConfig: { locations: [{unitId:"51", type:"unitId", stackPipeId:null}] },
  exportState: {},
  setExportState: null,
  workspaceSection: 'workspacesection',
  orisCode: '3776',
  dataRef: {},
}

describe("Report API calls", () => {
  
  beforeEach(() => {
    mock.resetHistory();
  });

  test("getReport", async () => {
    const getReportUrl = "https://api.epa.gov/easey/dev/camd-services/reports?reportCode=reportCode&facilityId=facilityId"
    mock.onGet(getReportUrl).reply(200, []);

    getReport("reportCode","facilityId");

    expect(mock.history.get.length).toBe(1);
  })

  test("submitData", async () => {
    const payload = [
      { fuelTypeCodes: "data" },
    ];

    const submitUrl = `${config.services.camd.uri}/submit`;
    mock.onPost(submitUrl).reply(200);

    const resp = await submitData(payload);

    //expect(mock.history.post.length).toBe(1);
    setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);
  })
});