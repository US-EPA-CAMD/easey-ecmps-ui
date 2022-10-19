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
  qaFlowRataRunProps, qaFuelFlowToLoadProps,
} from "../../../additional-functions/qa-dataTable-props";


const mock = new MockAdapter(axios);

const qaCertBaseUrl = config.services.qaCertification.uri
const locId = 'locId'
const testSumId = 'testSumId'
const rataId = 'rataId'
const rataSumId = 'rataSumId'
const rataRunId = 'rataRunId'
const flowRataRunId = 'flowRataRunId'
const id = 'id'

const idRegex = '[\\w\\-]+'

// MDM mocks
const probeTypeCodesUrl = `${config.services.mdm.uri}/probe-type-codes`
const pressureMeasureCodesUrl = `${config.services.mdm.uri}/pressure-measure-codes`
const runStatusCodesUrl = `${config.services.mdm.uri}/run-status-codes`
const testBasisCodes = `${config.services.mdm.uri}/test-basis-codes`

mock.onGet(probeTypeCodesUrl).reply(200, [])
mock.onGet(pressureMeasureCodesUrl).reply(200, [])
mock.onGet(runStatusCodesUrl).reply(200, [])
mock.onGet(testBasisCodes).reply(200, [])

const renderComponent = (getProps, rightmostIdInUrl = id) => {
  const props = getProps()
  const idArray = [locId, testSumId, rataId, rataSumId, rataRunId, flowRataRunId, id]
  const data = { locationId: locId, id: rightmostIdInUrl }
  return render(
    <QAExpandableRowsRender
      payload={props["payload"]}
      dropdownArray={props["dropdownArray"]}
      mdmProps={props["mdmProps"]}
      columns={props["columnNames"]}
      controlInputs={props["controlInputs"]}
      controlDatePickerInputs={props["controlDatePickerInputs"]}
      dataTableName={props["dataTableName"]}
      extraControls={props["extraControls"]}
      radioBtnPayload={props["radioBtnPayload"]}
      expandable
      extraIDs={idArray}
      data={data}
      user={'user'}
      isCheckedOut={true}
    />
  )
}

beforeEach(() => {
  mock.resetHistory()
})

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

  const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs`;
  const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs`;
  const deleteUrl = new RegExp(`${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${idRegex}`)

  mock.onGet(getUrl).reply(200, rataFlowData)
  mock.onPost(postUrl).reply(200, 'created')
  mock.onDelete(deleteUrl).reply(200, 'deleted')

  test('renders RATA Flow data rows and create/save/delete', async () => {
    await waitForElement(() => renderComponent(qaFlowRataRunProps, rataRunId))

    // renders rows
    const rows = await screen.findAllByRole('row')
    expect(mock.history.get.length).not.toBe(0)
    expect(rows).not.toHaveLength(0)

    // add row
    const addBtn = screen.getByRole('button', { name: /Add/i })
    userEvent.click(addBtn)
    let saveAndCloseBtn = screen.getByRole('button', { name: /Click to save/i })
    userEvent.click(saveAndCloseBtn)
    setTimeout(() => expect(mock.history.post.length).toBe(1), 1000)

    // edit row
    const editBtns = screen.getAllByRole('button', { name: /Edit/i })
    expect(editBtns).toHaveLength(rataFlowData.length)
    userEvent.click(editBtns[0])
    saveAndCloseBtn = screen.getByRole('button', { name: /Click to save/i })
    userEvent.click(saveAndCloseBtn)
    setTimeout(() => expect(mock.history.put.length).toBe(1), 1000)

    // remove row
    const deleteBtns = await screen.getAllByRole('button', { name: /Remove/i })
    expect(deleteBtns).toHaveLength(rataFlowData.length)
    const secondDeleteBtn = deleteBtns[1]
    userEvent.click(secondDeleteBtn)
    const confirmBtns = screen.getAllByRole('button', { name: /Yes/i })
    userEvent.click(confirmBtns[1])
  })
})

describe('Fuel Flow to Load data', () => {
  const fuelFlowToLoadData = [
    {
      "id": "id1",
      "testSumId": "testSumId1",
      "userId": "string",
      "addDate": "string",
      "updateDate": "string",
      "testBasisCode": "string",
      "averageDifference": 1,
      "numberOfHoursUsed": 2,
      "numberOfHoursExcludedCofiring": 3,
      "numberOfHoursExcludedRamping": 4,
      "numberOfHoursExcludedLowRange": 5
    },
    {
      "id": "id2",
      "testSumId": "testSumId2",
      "userId": "string",
      "addDate": "string",
      "updateDate": "string",
      "testBasisCode": "string",
      "averageDifference": 10,
      "numberOfHoursUsed": 20,
      "numberOfHoursExcludedCofiring": 30,
      "numberOfHoursExcludedRamping": 40,
      "numberOfHoursExcludedLowRange": 50
    }
  ]

  const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/fuel-flow-to-load-tests`;
  const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/fuel-flow-to-load-tests`;
  const putUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/fuel-flow-to-load-tests/${idRegex}`;

  mock.onGet(getUrl).reply(200, fuelFlowToLoadData)
  mock.onPost(postUrl).reply(200, 'created')
  mock.onPut(putUrl).reply(200, 'updated')

  test('renders Fuel Flow to Load data rows and create/save/delete', async () => {
    const props = qaFuelFlowToLoadProps()
    const idArray = [locId, testSumId, rataId, rataSumId, rataRunId, flowRataRunId, id]
    const data = { locationId: locId, id: testSumId }
    render(
      <QAExpandableRowsRender
        payload={props["payload"]}
        dropdownArray={props["dropdownArray"]}
        mdmProps={props["mdmProps"]}
        columns={props["columnNames"]}
        controlInputs={props["controlInputs"]}
        controlDatePickerInputs={props["controlDatePickerInputs"]}
        dataTableName={props["dataTableName"]}
        extraControls={props["extraControls"]}
        radioBtnPayload={props["radioBtnPayload"]}
        expandable
        extraIDs={idArray}
        data={data}
        user={'user'}
        isCheckedOut={true}
      />
    )

    // renders rows
    const rows = await screen.findAllByRole('row')
    expect(mock.history.get.length).not.toBe(0)
    expect(rows).not.toHaveLength(0)

    // add row
    const addBtn = screen.getByRole('button', { name: /Add/i })
    userEvent.click(addBtn)
    let saveAndCloseBtn = screen.getByRole('button', { name: /Click to save/i })
    userEvent.click(saveAndCloseBtn)
    setTimeout(() => expect(mock.history.post.length).toBe(1), 1000)

    // edit row
    const editBtns = screen.getAllByRole('button', { name: /Edit/i })
    expect(editBtns).toHaveLength(fuelFlowToLoadData.length)
    userEvent.click(editBtns[0])
    saveAndCloseBtn = screen.getByRole('button', { name: /Click to save/i })
    userEvent.click(saveAndCloseBtn)
    setTimeout(() => expect(mock.history.put.length).toBe(1), 1000)
  })
})
