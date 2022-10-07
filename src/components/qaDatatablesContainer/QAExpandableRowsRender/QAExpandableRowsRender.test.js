import React from "react";
import {
  render,
  waitForElement,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import QAExpandableRowsRender from "./QAExpandableRowsRender";
import config from "../../../config";
import {
  qaFlowRataRunProps,
} from "../../../additional-functions/qa-dataTable-props";


const mock = new MockAdapter(axios);

const qaCertBaseUrl = config.services.qaCertification.uri
const locId = 'locId'
const testSumId = 'testSumId'
const rataId = 'rataId'
const rataSumId = 'rataSumId'
const rataRunId = 'rataRunId'
const id = 'id'

const idRegex = '[\\w\\-]+'

describe('RATA Flow data', () => {
  const rataFlowData = [
    {
      "id": "string",
      "rataRunId": "string",
      "calculatedDryMolecularWeight": 0,
      "calculatedWetMolecularWeight": 0,
      "calculatedAverageVelocityWithoutWallEffects": 0,
      "calculatedAverageVelocityWithWallEffects": 0,
      "calculatedCalculatedWAF": 0,
      "userId": "string",
      "addDate": "2022-10-06T21:10:16.300Z",
      "updateDate": "2022-10-06T21:10:16.300Z",
      "numberOfTraversePoints": 0,
      "barometricPressure": 0,
      "staticStackPressure": 0,
      "percentCO2": 0,
      "percentO2": 0,
      "percentMoisture": 0,
      "dryMolecularWeight": 0,
      "wetMolecularWeight": 0,
      "averageVelocityWithoutWallEffects": 0,
      "averageVelocityWithWallEffects": 0,
      "calculatedWAF": 0,
      "averageStackFlowRate": 0
    },
    {
      "id": "string",
      "rataRunId": "string",
      "calculatedDryMolecularWeight": 0,
      "calculatedWetMolecularWeight": 0,
      "calculatedAverageVelocityWithoutWallEffects": 0,
      "calculatedAverageVelocityWithWallEffects": 0,
      "calculatedCalculatedWAF": 0,
      "userId": "string",
      "addDate": "2022-10-06T21:10:16.300Z",
      "updateDate": "2022-10-06T21:10:16.300Z",
      "numberOfTraversePoints": 0,
      "barometricPressure": 0,
      "staticStackPressure": 0,
      "percentCO2": 0,
      "percentO2": 0,
      "percentMoisture": 0,
      "dryMolecularWeight": 0,
      "wetMolecularWeight": 0,
      "averageVelocityWithoutWallEffects": 0,
      "averageVelocityWithWallEffects": 0,
      "calculatedWAF": 0,
      "averageStackFlowRate": 0
    },
  ]

  const renderComponent = (getProps) => {
    const props = getProps()
    const flowIdArray = [locId, testSumId, rataId, rataSumId, rataRunId, id]
    const data = { locationId: locId, id }
    return render(
      <QAExpandableRowsRender
        payload={props["payload"]}
        dropdownArray={props["dropdownArray"]}
        columns={props["columnNames"]}
        controlInputs={props["controlInputs"]}
        controlDatePickerInputs={props["controlDatePickerInputs"]}
        dataTableName={props["dataTableName"]}
        extraControls={props["extraControls"]}
        radioBtnPayload={props["radioBtnPayload"]}
        expandable
        extraIDs={flowIdArray}
        data={data}
        user={'user'}
        isCheckedOut={true}
      />
    )
  }

  const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${id}/flow-rata-runs`;
  const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${id}/flow-rata-runs`;
  const deleteUrl = new RegExp(`${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${idRegex}`)

  mock.onGet(getUrl).reply(200, rataFlowData)
  mock.onPost(postUrl).reply(200, 'created')
  mock.onDelete(deleteUrl).reply(200, 'deleted')

  test('renders RATA Flow data rows and create/save/delete', async () => {
    await waitForElement(() => renderComponent(qaFlowRataRunProps))

    // renders rows
    const rows = await screen.findAllByRole('row')

    expect(mock.history.get.length).not.toBe(0)
    expect(rows).toHaveLength(rataFlowData.length + 1)

    // add row
    const addBtn = screen.getByRole('button', { name: /Add/i })
    userEvent.click(addBtn)
    let saveAndCloseBtn = screen.getByRole('button', { name: /Click to save/i })
    userEvent.click(saveAndCloseBtn)
    let confirmBtns = screen.getAllByRole('button', { name: /Yes/i })
    userEvent.click(confirmBtns[1])
    expect(mock.history.post.length).toBe(1)

    // edit row
    const editBtns = screen.getAllByRole('button', { name: /Edit/i })
    expect(editBtns).toHaveLength(rataFlowData.length)
    userEvent.click(editBtns[0])
    saveAndCloseBtn = screen.getByRole('button', { name: /Click to save/i })
    userEvent.click(saveAndCloseBtn)
    confirmBtns = screen.getAllByRole('button', { name: /Yes/i })
    userEvent.click(confirmBtns[1])
    // expect(mock.history.put.length).toBe(1)

    // remove row
    const deleteBtns = await screen.getAllByRole('button', { name: /Remove/i })
    expect(deleteBtns).toHaveLength(rataFlowData.length)
    const secondDeleteBtn = deleteBtns[1]
    userEvent.click(secondDeleteBtn)
    confirmBtns = screen.getAllByRole('button', { name: /Yes/i })
    userEvent.click(confirmBtns[1])
    // expect(mock.history.delete.length).toBe(1)
  })
})