import React from "react";
import {
  render,
  waitForElement,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import QACertEventTestExmpDataTable from "./QACertEventTestExmpDataTable";
import config from "../../../config";

const mock = new MockAdapter(axios);

const qaCertBaseUrl = config.services.qaCertification.uri;
const locId="locId";

const renderComponent = (props) => {
  return render(
    <QACertEventTestExmpDataTable
    locationSelectValue={props.locationSelectValue}
    user={'user'}
    nonEditable = {false}
    showModal = {false}
    selectedTestCode={null}
    isCheckedOut={props.isCheckedOut}
    sectionSelect={props.sectionSelect}
    selectedLocation={props.selectedLocation}
    locations={[]}
    />
  );
};

describe('Test cases for QACertEventTestExmpDataTable', () => {
  test('renders Qa Cert Events data rows and create/save/delete', async () => {
    const qaCertsEventsData = [
      {
        "id": "id1",
        "stackPipeId": "string",
        "unitId": "string",
        "monitoringSystemID": "string",
        "componentID": "string",
        "qaCertEventCode": "string",
        "qaCertEventDate": "2023-01-25T19:16:06.399Z",
        "qaCertEventHour": 0,
        "requiredTestCode": "string",
        "conditionalBeginDate": "2023-01-25T19:16:06.399Z",
        "conditionalBeginHour": 0,
        "completionTestDate": "2023-01-25T19:16:06.399Z",
        "completionTestHour": 0
      },
      {
        "id": "id2",
        "stackPipeId": "string",
        "unitId": "string",
        "monitoringSystemID": "string",
        "componentID": "string",
        "qaCertEventCode": "string",
        "qaCertEventDate": "2023-01-25T19:16:06.399Z",
        "qaCertEventHour": 0,
        "requiredTestCode": "string",
        "conditionalBeginDate": "2023-01-25T19:16:06.399Z",
        "conditionalBeginHour": 0,
        "completionTestDate": "2023-01-25T19:16:06.399Z",
        "completionTestHour": 0
      }
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

    mock.onGet(getMonitoringComponentsUrl).reply(200, []);
    mock.onGet(getMonitoringSystemssUrl).reply(200, []);
    mock.onGet(getQaCertEventCodesUrl).reply(200, []);
    mock.onGet(getQaRequiredTestCodesUrl).reply(200, []);
    mock.onGet(getQaCertEventsUrl).reply(200, qaCertsEventsData);
    mock.onPost(createQaCertEventsUrl).reply(200, 'created');

    renderComponent({
      locationSelectValue: "6",
      isCheckedOut: true,
      sectionSelect:[0, 'QA Certification Event'],
      selectedLocation:{
        name:"1",
        stackPipeId: null,
        unitId: "1"
      }
    });

    // renders rows
    const rows = await screen.findAllByRole('row')
    expect(mock.history.get.length).not.toBe(0)
    expect(rows).toHaveLength(qaCertsEventsData.length)

    // add row
    const addBtn = screen.getByRole('button', { name: /Add/i })
    userEvent.click(addBtn)
    let saveAndCloseBtn = screen.getByRole('button', { name: /Click to save/i })
    userEvent.click(saveAndCloseBtn)
    setTimeout(() => expect(mock.history.post.length).toBe(1), 1000)
  });
});