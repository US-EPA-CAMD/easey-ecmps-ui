import React from "react";
import { render, waitForElement, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { secureAxios } from "../../../utils/api/easeyAuthApi";

import QACertEventTestExmpDataTable from "./QACertEventTestExmpDataTable";
import config from "../../../config";

const mock = new MockAdapter(axios);
jest.mock("../../../utils/api/easeyAuthApi");
secureAxios.mockImplementation((options) => axios(options));

const qaCertBaseUrl = config.services.qaCertification.uri;
const locId = "locId";

const renderComponent = (props) => {
  return render(
    <QACertEventTestExmpDataTable
      locationSelectValue={props.locationSelectValue}
      user={props.user}
      nonEditable={false}
      showModal={false}
      selectedTestCode={null}
      isCheckedOut={props.isCheckedOut}
      sectionSelect={props.sectionSelect}
      orisCode={props.orisCode}
      selectedLocation={props.selectedLocation}
      locations={[]}
      setUpdateTable={jest.fn()}
      updateTable={true}
    />
  );
};

describe("Test cases for QACertEventTestExmpDataTable", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("renders Qa Cert Events data rows and create/save/delete", async () => {
    const qaCertsEventsData = [
      {
        id: "id1",
        stackPipeId: "string",
        unitId: "string",
        monitoringSystemId: "string",
        orisCode: "string",
        componentId: "string",
        certificationEventCode: "string",
        qaCertEventDate: "2023-01-25T19:16:06.399Z",
        qaCertEventHour: 0,
        requiredTestCode: "string",
        conditionalBeginDate: "2023-01-25T19:16:06.399Z",
        conditionalBeginHour: 0,
        completionTestDate: "2023-01-25T19:16:06.399Z",
        completionTestHour: 0,
      },
      {
        id: "id2",
        stackPipeId: "string",
        unitId: "string",
        monitoringSystemId: "string",
        orisCode: "string",
        componentId: "string",
        qaCertEventCode: "string",
        qaCertEventDate: "2023-01-25T19:16:06.399Z",
        qaCertEventHour: 0,
        requiredTestCode: "string",
        conditionalBeginDate: "2023-01-25T19:16:06.399Z",
        conditionalBeginHour: 0,
        completionTestDate: "2023-01-25T19:16:06.399Z",
        completionTestHour: 0,
      },
    ];
    const getMonitoringComponentsUrl = new RegExp(
      `${config.services.monitorPlans.uri}/locations/${locId}/components`
    );
    const getMonitoringSystemssUrl = new RegExp(
      `${config.services.monitorPlans.uri}/locations/${locId}/systems`
    );
    const getQaCertEventCodesUrl = new RegExp(
      `${config.services.mdm.uri}/qa-cert-event-codes`
    );
    const getQaRequiredTestCodesUrl = new RegExp(
      `${config.services.mdm.uri}/required-test-codes`
    );
    const getQaCertEventsUrl = new RegExp(
      `${qaCertBaseUrl}/locations/${locId}/qa-certification-events`
    );
    const createQaCertEventsUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/qa-certification-events`
    );
    const requestHeaders = {
      "x-api-key": config.app.apiKey,
    };
    mock
      .onGet(getMonitoringComponentsUrl, requestHeaders)
      .reply(200, { data: [] });
    mock
      .onGet(getMonitoringSystemssUrl, requestHeaders)
      .reply(200, { data: [] });
    mock.onGet(getQaCertEventCodesUrl, requestHeaders).reply(200, { data: [] });
    mock
      .onGet(getQaRequiredTestCodesUrl, requestHeaders)
      .reply(200, { data: [] });
    mock
      .onGet(getQaCertEventsUrl, requestHeaders)
      .reply(200, qaCertsEventsData);
    mock.onPost(createQaCertEventsUrl, requestHeaders).reply(200, "created");

    renderComponent({
      locationSelectValue: locId,
      isCheckedOut: true,
      sectionSelect: [0, "QA Certification Event"],
      selectedLocation: {
        name: "1",
        stackPipeId: null,
        unitId: "1",
      },
      user: "user",
    });

    // // renders rows
    // const rows = await screen.findAllByRole("row");
    // expect(mock.history.get.length).not.toBe(0);
    // expect(rows).toHaveLength(qaCertsEventsData.length);

    // // add row
    // const addBtn = await screen.getByRole("button", { name: /Add/i });
    // userEvent.click(addBtn);
    // let saveAndCloseBtn = await screen.getByRole("button", {
    //   name: /Save and Close/i,
    // });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);

    // // edit row
    // const editBtns = await screen.getAllByRole("button", { name: /Edit/i });
    // expect(editBtns).toHaveLength(qaCertsEventsData.length);
    // userEvent.click(editBtns[0]);
    // saveAndCloseBtn = await screen.getByRole("button", {
    //   name: /Click to save/i,
    // });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.put.length).toBe(1), 10000);

    // // remove row
    // const deleteBtns = await screen.getAllByRole("button", { name: /Remove/i });
    // expect(deleteBtns).toHaveLength(qaCertsEventsData.length);
    // const secondDeleteBtn = deleteBtns[1];
    // userEvent.click(secondDeleteBtn);
    // const confirmBtns = await screen.getAllByRole("button", { name: /Yes/i });
    // userEvent.click(confirmBtns[1]);
    // setTimeout(() => expect(mock.history.delete.length).toBe(1), 10000);
  });
  test("renders Qa Cert Events data rows and create/save/delete with 0 data coming back", async () => {
    const qaCertsEventsData = [];
    const getMonitoringComponentsUrl = new RegExp(
      `${config.services.monitorPlans.uri}/locations/${locId}/components`
    );
    const getMonitoringSystemssUrl = new RegExp(
      `${config.services.monitorPlans.uri}/locations/${locId}/systems`
    );
    const getQaCertEventCodesUrl = new RegExp(
      `${config.services.mdm.uri}/qa-cert-event-codes`
    );
    const getQaRequiredTestCodesUrl = new RegExp(
      `${config.services.mdm.uri}/required-test-codes`
    );
    const getQaCertEventsUrl = new RegExp(
      `${qaCertBaseUrl}/locations/${locId}/qa-certification-events`
    );
    const createQaCertEventsUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/qa-certification-events`
    );
    const requestHeaders = {
      "x-api-key": config.app.apiKey,
    };
    mock
      .onGet(getMonitoringComponentsUrl, requestHeaders)
      .reply(200, { data: [] });
    mock
      .onGet(getMonitoringSystemssUrl, requestHeaders)
      .reply(200, { data: [] });
    mock.onGet(getQaCertEventCodesUrl, requestHeaders).reply(200, { data: [] });
    mock
      .onGet(getQaRequiredTestCodesUrl, requestHeaders)
      .reply(200, { data: [] });
    mock
      .onGet(getQaCertEventsUrl, requestHeaders)
      .reply(200, qaCertsEventsData);
    mock.onPost(createQaCertEventsUrl, requestHeaders).reply(200, "created");

    renderComponent({
      locationSelectValue: locId,
      isCheckedOut: true,
      sectionSelect: [0, "QA Certification Event"],
      selectedLocation: {
        name: "1",
        stackPipeId: null,
        unitId: "1",
      },
      user: "user",
    });

    // renders rows
    const rows = await screen.findAllByRole("row");
    expect(mock.history.get.length).not.toBe(0);
    expect(rows).toHaveLength(2);

    // // add row
    // const addBtn = await screen.getByRole("button", { name: /Add/i });
    // userEvent.click(addBtn);
    // let saveAndCloseBtn = screen.getByRole("button", {
    //   name: /Click to save/i,
    // });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);
  });

  test("renders Qa test exempt data rows and create/save/delete", async () => {
    const qaTestExemptsData = [
      {
        id: "id",
        locationId: "loc",
        stackPipeId: null,
        unitId: "1",
        year: 2022,
        quarter: 1,
        monitoringSystemId: "AF1",
        componentId: "AFA",
        hoursUsed: 0,
        spanScaleCode: "L",
        fuelCode: "ANT",
        extensionOrExemptionCode: "NONQADB",
        reportPeriodId: 117,
        checkSessionId: null,
        submissionId: null,
        submissionAvailabilityCode: null,
        pendingStatusCode: "PENDING",
        evalStatusCode: "EVAL",
      },

      {
        id: "id",
        locationId: "loc",
        stackPipeId: null,
        unitId: "1",
        year: 2022,
        quarter: 1,
        monitoringSystemId: "AF1",
        componentId: "AFA",
        hoursUsed: 0,
        spanScaleCode: "L",
        fuelCode: "ANT",
        extensionOrExemptionCode: "NONQADB",
        reportPeriodId: 117,
        checkSessionId: null,
        submissionId: null,
        submissionAvailabilityCode: null,
        pendingStatusCode: "PENDING",
        evalStatusCode: "EVAL",
      },
    ];
    const getMonitoringComponentsUrl = new RegExp(
      `${config.services.monitorPlans.uri}/locations/${locId}/components`
    );
    const getMonitoringSystemssUrl = new RegExp(
      `${config.services.monitorPlans.uri}/locations/${locId}/systems`
    );
    const getAllSpanScaleCodesUrl = new RegExp(
      `${config.services.mdm.uri}/span-scale-codes`
    );
    const getAllFuelCodesUrl = new RegExp(
      `${config.services.mdm.uri}/fuel-codes`
    );
    const getMdmDataByCodeTable = new RegExp(
      `${config.services.mdm.uri}/extension-exemption-codes`
    );
    const getQaTestExemptUrl = new RegExp(
      `${qaCertBaseUrl}/locations/${locId}/test-extension-exemptions`
    );
    const createQaTestExemptUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-extension-exemptions`
    );
    const requestHeaders = {
      "x-api-key": config.app.apiKey,
    };
    mock
      .onGet(getMonitoringComponentsUrl, requestHeaders)
      .reply(200, { data: [] });
    mock
      .onGet(getMonitoringSystemssUrl, requestHeaders)
      .reply(200, { data: [] });
    mock
      .onGet(getAllSpanScaleCodesUrl, requestHeaders)
      .reply(200, { data: [] });
    mock.onGet(getAllFuelCodesUrl, requestHeaders).reply(200, { data: [] });

    mock.onGet(getMdmDataByCodeTable, requestHeaders).reply(200, { data: [] });
    mock
      .onGet(getQaTestExemptUrl, requestHeaders)
      .reply(200, qaTestExemptsData);
    mock.onPost(createQaTestExemptUrl, requestHeaders).reply(200, "created");

    renderComponent({
      locationSelectValue: locId,
      isCheckedOut: true,
      sectionSelect: [1, "Test Extension Exemption"],
      selectedLocation: {
        name: "1",
        stackPipeId: null,
        unitId: "1",
      },
      user: "user",
    });

    // renders rows
    const rows = await screen.findAllByRole("row");
    expect(mock.history.get.length).not.toBe(0);
    expect(rows).toHaveLength(qaTestExemptsData.length + 1);
  });

  test("renders Qa with no valid section ( for switch default case) ", async () => {
    renderComponent({
      locationSelectValue: locId,
      isCheckedOut: true,
      sectionSelect: [2, "test"],
      selectedLocation: {
        name: "1",
        stackPipeId: null,
        unitId: "1",
      },
      user: "user",
    });

    // renders rows
    const rows = await screen.findAllByRole("row");
    expect(rows).toHaveLength(2);
  });
});

