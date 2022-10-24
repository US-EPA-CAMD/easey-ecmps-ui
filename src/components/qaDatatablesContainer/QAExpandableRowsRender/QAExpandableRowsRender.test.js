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
  qaFuelFlowToLoadProps,
  qaAppendixECorrTestRunProps,
  qaRataRunDataProps,
  qaRataSummaryProps,
  qaRataTraverseProps,
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
const mdmCodes = new RegExp(`${config.services.mdm.uri}/${idRegex}`)

mock.onGet(probeTypeCodesUrl).reply(200, [])
mock.onGet(pressureMeasureCodesUrl).reply(200, [])
mock.onGet(runStatusCodesUrl).reply(200, [])
mock.onGet(testBasisCodes).reply(200, [])
mock.onGet(mdmCodes).reply(200, [])

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

describe('RATA Summary data', () => {
  const rataSummaryData = [
    {
      "operatingLevelCode": "string",
      "averageGrossUnitLoad": 71,
      "referenceMethodCode": "string",
      "meanCEMValue": 0,
      "meanRATAReferenceValue": 0,
      "meanDifference": 0,
      "standardDeviationDifference": 0,
      "confidenceCoefficient": 0,
      "tValue": 0,
      "apsIndicator": 0,
      "apsCode": "PS15",
      "relativeAccuracy": 0,
      "biasAdjustmentFactor": 0,
      "co2OrO2ReferenceMethodCode": "string",
      "stackDiameter": 0,
      "stackArea": 0,
      "numberOfTraversePoints": 0,
      "calculatedWAF": 0,
      "defaultWAF": 0,
      "id": "id1",
      "rataId": "string",
      "calculatedAverageGrossUnitLoad": 0,
      "calculatedMeanCEMValue": 0,
      "calculatedMeanRATAReferenceValue": 0,
      "calculatedMeanDifference": 0,
      "calculatedStandardDeviationDifference": 0,
      "calculatedConfidenceCoefficient": 0,
      "calculatedTValue": 0,
      "calculatedApsIndicator": 0,
      "calculatedRelativeAccuracy": 0,
      "calculatedBiasAdjustmentFactor": 0,
      "calculatedStackArea": 0,
      "calculatedCalculatedWAF": 0,
      "userId": "string",
      "addDate": "string",
      "updateDate": "string"
    },
    {
      "operatingLevelCode": "string",
      "averageGrossUnitLoad": 71,
      "referenceMethodCode": "string",
      "meanCEMValue": 0,
      "meanRATAReferenceValue": 0,
      "meanDifference": 0,
      "standardDeviationDifference": 0,
      "confidenceCoefficient": 0,
      "tValue": 0,
      "apsIndicator": 0,
      "apsCode": "PS15",
      "relativeAccuracy": 0,
      "biasAdjustmentFactor": 0,
      "co2OrO2ReferenceMethodCode": "string",
      "stackDiameter": 0,
      "stackArea": 0,
      "numberOfTraversePoints": 0,
      "calculatedWAF": 0,
      "defaultWAF": 0,
      "id": "id2",
      "rataId": "string",
      "calculatedAverageGrossUnitLoad": 0,
      "calculatedMeanCEMValue": 0,
      "calculatedMeanRATAReferenceValue": 0,
      "calculatedMeanDifference": 0,
      "calculatedStandardDeviationDifference": 0,
      "calculatedConfidenceCoefficient": 0,
      "calculatedTValue": 0,
      "calculatedApsIndicator": 0,
      "calculatedRelativeAccuracy": 0,
      "calculatedBiasAdjustmentFactor": 0,
      "calculatedStackArea": 0,
      "calculatedCalculatedWAF": 0,
      "userId": "string",
      "addDate": "string",
      "updateDate": "string"
    }
  ]

  const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries`;
  const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries`;
  const putUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${idRegex}`;
  const deleteUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${idRegex}`;

  mock.onGet(getUrl).reply(200, rataSummaryData)
  mock.onPost(postUrl).reply(200, 'created')
  mock.onPut(putUrl).reply(200, 'updated')
  mock.onDelete(deleteUrl).reply(200, 'deleted')

  test('renders RATA Summary data rows and create/save/delete', async () => {
    const props = qaRataSummaryProps()
    const idArray = [locId, testSumId, rataId, rataSumId, rataRunId, flowRataRunId, id]
    const data = { locationId: locId, id: rataId }
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

    console.log('rows length', rows.length);

    // add row
    const addBtn = screen.getByRole('button', { name: /Add/i })
    userEvent.click(addBtn)
    let saveAndCloseBtn = screen.getByRole('button', { name: /Click to save/i })
    userEvent.click(saveAndCloseBtn)
    setTimeout(() => expect(mock.history.post.length).toBe(1), 1000)

    // edit row
    const editBtns = screen.getAllByRole('button', { name: /Edit/i })
    expect(editBtns).toHaveLength(rataSummaryData.length)
    userEvent.click(editBtns[0])
    saveAndCloseBtn = screen.getByRole('button', { name: /Click to save/i })
    userEvent.click(saveAndCloseBtn)
    setTimeout(() => expect(mock.history.put.length).toBe(1), 1000)

    // remove row
    const deleteBtns = await screen.getAllByRole('button', { name: /Remove/i })
    expect(deleteBtns).toHaveLength(rataSummaryData.length)
    const secondDeleteBtn = deleteBtns[1]
    userEvent.click(secondDeleteBtn)
    const confirmBtns = screen.getAllByRole('button', { name: /Yes/i })
    userEvent.click(confirmBtns[1])
  })
})

describe('RATA Run data', () => {
  const rataRunData = [
    {
      "id": "id1",
      "rataSumId": "string",
      "calculatedRataReferenceValue": 0,
      "userId": "string",
      "addDate": "string",
      "updateDate": "string",
      "runNumber": 0,
      "beginDate": "2022-10-21T19:17:13.290Z",
      "beginHour": 0,
      "beginMinute": 0,
      "endDate": "2022-10-21T19:17:13.290Z",
      "endHour": 0,
      "endMinute": 0,
      "cemValue": 0,
      "rataReferenceValue": 0,
      "grossUnitLoad": 0,
      "runStatusCode": "string"
    },
    {
      "id": "id2",
      "rataSumId": "string",
      "calculatedRataReferenceValue": 0,
      "userId": "string",
      "addDate": "string",
      "updateDate": "string",
      "runNumber": 0,
      "beginDate": "2022-10-21T19:17:13.290Z",
      "beginHour": 0,
      "beginMinute": 0,
      "endDate": "2022-10-21T19:17:13.290Z",
      "endHour": 0,
      "endMinute": 0,
      "cemValue": 0,
      "rataReferenceValue": 0,
      "grossUnitLoad": 0,
      "runStatusCode": "string"
    }
  ]

  const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs`;
  const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs`;
  const putUrl = new RegExp(`${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${idRegex}`)
  const deleteUrl = new RegExp(`${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${idRegex}`)

  mock.onGet(getUrl).reply(200, rataRunData)
  mock.onPost(postUrl).reply(200, 'created')
  mock.onPut(putUrl).reply(200, 'updated')
  mock.onDelete(deleteUrl).reply(200, 'deleted')

  test('renders RATA Run data rows and create/save/delete', async () => {
    // await waitForElement(() => renderComponent(qaFlowRataRunProps, rataRunId))

    const props = qaRataRunDataProps()
    const idArray = [locId, testSumId, rataId, rataSumId, rataRunId, flowRataRunId, id]
    const data = { locationId: locId, id: rataSumId }
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
    expect(editBtns).toHaveLength(rataRunData.length)
    userEvent.click(editBtns[0])
    saveAndCloseBtn = screen.getByRole('button', { name: /Click to save/i })
    userEvent.click(saveAndCloseBtn)
    setTimeout(() => expect(mock.history.put.length).toBe(1), 1000)

    // remove row
    const deleteBtns = await screen.getAllByRole('button', { name: /Remove/i })
    expect(deleteBtns).toHaveLength(rataRunData.length)
    const secondDeleteBtn = deleteBtns[1]
    userEvent.click(secondDeleteBtn)
    const confirmBtns = screen.getAllByRole('button', { name: /Yes/i })
    userEvent.click(confirmBtns[1])
  })
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
  const putUrl = new RegExp(`${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${idRegex}`)
  const deleteUrl = new RegExp(`${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${idRegex}`)

  mock.onGet(getUrl).reply(200, rataFlowData)
  mock.onPost(postUrl).reply(200, 'created')
  mock.onPut(putUrl).reply(200, 'updated')
  mock.onDelete(deleteUrl).reply(200, 'deleted')

  test('renders RATA Flow data rows and create/save/delete', async () => {
    // await waitForElement(() => renderComponent(qaFlowRataRunProps, rataRunId))

    const props = qaFlowRataRunProps()
    const idArray = [locId, testSumId, rataId, rataSumId, rataRunId, flowRataRunId, id]
    const data = { locationId: locId, id: rataRunId }
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

describe('RATA Traverse data', () => {
  const rataTraverseData = [
    {
      "id": "id1",
      "flowRataRunId": "string",
      "calculatedCalculatedVelocity": 0,
      "userId": "string",
      "addDate": "string",
      "updateDate": "string",
      "probeId": "string",
      "probeTypeCode": "string",
      "pressureMeasureCode": "string",
      "methodTraversePointId": "string",
      "velocityCalibrationCoefficient": 0,
      "lastProbeDate": "2022-10-21T19:31:34.885Z",
      "avgVelDiffPressure": 0,
      "avgSquareVelDiffPressure": 0,
      "tStackTemperature": 0,
      "pointUsedIndicator": 0,
      "numberWallEffectsPoints": 0,
      "yawAngle": 0,
      "pitchAngle": 0,
      "calculatedVelocity": 0,
      "replacementVelocity": 0
    },
    {
      "id": "id2",
      "flowRataRunId": "string",
      "calculatedCalculatedVelocity": 0,
      "userId": "string",
      "addDate": "string",
      "updateDate": "string",
      "probeId": "string",
      "probeTypeCode": "string",
      "pressureMeasureCode": "string",
      "methodTraversePointId": "string",
      "velocityCalibrationCoefficient": 0,
      "lastProbeDate": "2022-10-21T19:31:34.885Z",
      "avgVelDiffPressure": 0,
      "avgSquareVelDiffPressure": 0,
      "tStackTemperature": 0,
      "pointUsedIndicator": 0,
      "numberWallEffectsPoints": 0,
      "yawAngle": 0,
      "pitchAngle": 0,
      "calculatedVelocity": 0,
      "replacementVelocity": 0
    }
  ]

  const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${flowRataRunId}/rata-traverses`;
  const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/flow-rata-runs/${flowRataRunId}/rata-traverses`;
  const putUrl = new RegExp(`${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${flowRataRunId}/rata-traverses${idRegex}`)
  const deleteUrl = new RegExp(`${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${flowRataRunId}/rata-traverses${idRegex}`)

  mock.onGet(getUrl).reply(200, rataTraverseData)
  mock.onPost(postUrl).reply(200, 'created')
  mock.onPut(putUrl).reply(200, 'updated')
  mock.onDelete(deleteUrl).reply(200, 'deleted')

  test('renders RATA Flow data rows and create/save/delete', async () => {
    // await waitForElement(() => renderComponent(qaFlowRataRunProps, rataRunId))

    const props = qaRataTraverseProps()
    const idArray = [locId, testSumId, rataId, rataSumId, rataRunId, flowRataRunId, id]
    const data = { locationId: locId, id: flowRataRunId }
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
    expect(editBtns).toHaveLength(rataTraverseData.length)
    userEvent.click(editBtns[0])
    saveAndCloseBtn = screen.getByRole('button', { name: /Click to save/i })
    userEvent.click(saveAndCloseBtn)
    setTimeout(() => expect(mock.history.put.length).toBe(1), 1000)

    // remove row
    const deleteBtns = await screen.getAllByRole('button', { name: /Remove/i })
    expect(deleteBtns).toHaveLength(rataTraverseData.length)
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

describe('Appendix E Correlation test Summary data', () => {
  const id = "appECorrTestSumId";
  const appendixECorrTestSumData = [
    {
      "id":"1f734d01-2513-4a91-8763-9a18fc8ffd2d",
      "testSumId":"L3FY866-950F544520244336B5ED7E3824642F9E",
      "operatingLevelForRun":1,
      "meanReferenceValue":2,
      "calculatedMeanReferenceValue":3,
      "averageHourlyHeatInputRate":4,
      "fFactor":9190,
      "calculatedAverageHourlyHeatInputRate":5,
      "userId":"string",
      "addDate":"string",
      "updateDate":"string",
    },
    {
      "id":"1f734d01-2513-4a91-8763-9a18fc8ffd2d",
      "testSumId":"L3FY866-950F544520244336B5ED7E3824642F9E",
      "operatingLevelForRun":2,
      "meanReferenceValue":3,
      "calculatedMeanReferenceValue":4,
      "averageHourlyHeatInputRate":5,
      "fFactor":9190,
      "calculatedAverageHourlyHeatInputRate":6,
      "userId":"string",
      "addDate":"string2",
      "updateDate":"string2",
    }
  ]
  
  const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries`;
  const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries`;
  const putUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${id}`;
  const deleteUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${id}`;

  mock.onGet(getUrl).reply(200, appendixECorrTestSumData)
  mock.onPost(postUrl).reply(200, 'created')
  mock.onPut(putUrl).reply(200, 'updated')
  mock.onPut(deleteUrl).reply(200, 'deleted')
  test('renders Appendix E Correlation test summary rows and create/save/delete', async () => {
    const props = qaAppendixECorrTestRunProps()
    const idArray = [locId, testSumId]
    const data = { id: appECorrTestSumId }
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
    expect(editBtns).toHaveLength(appendixECorrTestSumData.length)
    userEvent.click(editBtns[0])
    saveAndCloseBtn = screen.getByRole('button', { name: /Click to save/i })
    userEvent.click(saveAndCloseBtn)
    setTimeout(() => expect(mock.history.put.length).toBe(1), 1000)

    // remove row
    const deleteBtns = await screen.getAllByRole('button', { name: /Remove/i })
    expect(deleteBtns).toHaveLength(appendixECorrTestSumData.length)
    const secondDeleteBtn = deleteBtns[1]
    userEvent.click(secondDeleteBtn)
    const confirmBtns = screen.getAllByRole('button', { name: /Yes/i })
    userEvent.click(confirmBtns[1])
  })
})

// describe('Appendix E Correlation test run data', () => {
//   const appECorrTestSumId = "appECorrTestSumId";
//   const id ="appECorrTestRunId"
//   const appendixECorrTestData = [
//     {
//       "id":"c921213c-072a-4dbc-9688-ffc3cb7d982f",
//       "appECorrTestSumId":"4e75ad50-cd1e-4d7e-9f08-960f4026d3c3",
//       "runNumber":10,
//       "referenceValue":12,
//       "hourlyHeatInputRate":12,
//       "calculatedHourlyHeatInputRate":null,
//       "totalHeatInput":12,
//       "calculatedTotalHeatInput":null,
//       "responseTime":12,
//       "beginDate":"2022-10-04",
//       "beginHour":3,
//       "beginMinute":4,
//       "endDate":"2022-10-05",
//       "endHour":2,
//       "endMinute":1,
//     },{"id":"ff65cf9d-8487-4a61-a87d-8dcaec8a07b6","appECorrTestSumId":"4e75ad50-cd1e-4d7e-9f08-960f4026d3c3","runNumber":11,"referenceValue":11,"hourlyHeatInputRate":11,"calculatedHourlyHeatInputRate":null,"totalHeatInput":11,"calculatedTotalHeatInput":null,"responseTime":11,"beginDate":"2022-10-01","beginHour":1,"beginMinute":1,"endDate":"2022-10-02","endHour":3,"endMinute":3,}]

//   const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs`;
//   const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs`;
//   const putUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${id}`;
//   const deleteUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${id}`;

//   mock.onGet(getUrl).reply(200, appendixECorrTestData)
//   mock.onPost(postUrl).reply(200, 'created')
//   mock.onPut(putUrl).reply(200, 'updated')
//   mock.onPut(deleteUrl).reply(200, 'deleted')

//   test('renders Appendix E Correlation test run rows and create/save/delete', async () => {
//     const props = qaAppendixECorrTestRunProps()
//     const idArray = [locId, testSumId]
//     const data = { id: appECorrTestSumId }
//     render(
//       <QAExpandableRowsRender
//         payload={props["payload"]}
//         dropdownArray={props["dropdownArray"]}
//         mdmProps={props["mdmProps"]}
//         columns={props["columnNames"]}
//         controlInputs={props["controlInputs"]}
//         controlDatePickerInputs={props["controlDatePickerInputs"]}
//         dataTableName={props["dataTableName"]}
//         extraControls={props["extraControls"]}
//         radioBtnPayload={props["radioBtnPayload"]}
//         expandable
//         extraIDs={idArray}
//         data={data}
//         user={'user'}
//         isCheckedOut={true}
//       />
//     )

//     // renders rows
//     const rows = await screen.findAllByRole('row')
//     expect(mock.history.get.length).not.toBe(0)
//     expect(rows).not.toHaveLength(0)

//     // add row
//     const addBtn = screen.getByRole('button', { name: /Add/i })
//     userEvent.click(addBtn)
//     let saveAndCloseBtn = screen.getByRole('button', { name: /Click to save/i })
//     userEvent.click(saveAndCloseBtn)
//     setTimeout(() => expect(mock.history.post.length).toBe(1), 1000)

//     // edit row
//     const editBtns = screen.getAllByRole('button', { name: /Edit/i })
//     expect(editBtns).toHaveLength(appendixECorrTestData.length)
//     userEvent.click(editBtns[0])
//     saveAndCloseBtn = screen.getByRole('button', { name: /Click to save/i })
//     userEvent.click(saveAndCloseBtn)
//     setTimeout(() => expect(mock.history.put.length).toBe(1), 1000)

//         // remove row
//     const deleteBtns = await screen.getAllByRole('button', { name: /Remove/i })
//     expect(deleteBtns).toHaveLength(appendixECorrTestData.length)
//     const secondDeleteBtn = deleteBtns[1]
//     userEvent.click(secondDeleteBtn)
//     const confirmBtns = screen.getAllByRole('button', { name: /Yes/i })
//     userEvent.click(confirmBtns[1])
//   })
// })