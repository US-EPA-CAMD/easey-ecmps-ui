import React from "react";
import { render, screen } from "@testing-library/react";
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
  qaAppendixECorrelationSummaryTestProps,
  qaFlowToLoadCheckProps,
  qaFuelFlowToLoadBaselineProps,
  qaAppendixECorrelationSummaryHeatInputOilProps,
  qaProtocalGasProps,
  qaAppendixECorrelationSummaryHeatInputGasProps,
  qaCalibrationInjectionProps,
  qaOnOffCalibrationProps,
  qaCycleTimeSummaryProps,
  qaCycleTimeInjectionProps,
  qaFlowToLoadReferenceProps,
  qaUnitDefaultTestDataProps,
  qaHgSummaryDataProps,
  qaUnitDefaultTestRunDataProps,
  qaHgInjectionDataProps,
} from "../../../additional-functions/qa-dataTable-props";
import { secureAxios } from "../../../utils/api/easeyAuthApi";

const mock = new MockAdapter(axios);

const qaCertBaseUrl = config.services.qaCertification.uri;
const locId = "locId";
const testSumId = "testSumId";
const rataId = "rataId";
const rataSumId = "rataSumId";
const rataRunId = "rataRunId";
const flowRataRunId = "flowRataRunId";
const appECorrTestSumId = "appECorrTestSumId";
const appECorrTestRunId = "appECorrTestRunId";
const cycleTimeSumId = "cycleTimeSumId";
const id = "id";

const idRegex = "[\\w\\-]+";

// MDM mocks
const probeTypeCodesUrl = `${config.services.mdm.uri}/probe-type-codes`;
const pressureMeasureCodesUrl = `${config.services.mdm.uri}/pressure-measure-codes`;
const runStatusCodesUrl = `${config.services.mdm.uri}/run-status-codes`;
const testBasisCodes = `${config.services.mdm.uri}/test-basis-codes`;
const mdmCodes = new RegExp(`${config.services.mdm.uri}/${idRegex}`);

const monitorPlanSystems = new RegExp(
  `${config.services.monitorPlans.uri}/locations/${idRegex}/systems`
);

mock.onGet(probeTypeCodesUrl).reply(200, []);
mock.onGet(pressureMeasureCodesUrl).reply(200, []);
mock.onGet(runStatusCodesUrl).reply(200, []);
mock.onGet(testBasisCodes).reply(200, []);
mock.onGet(mdmCodes).reply(200, []);

mock.onGet(monitorPlanSystems).reply(200, []);

jest.mock("../../../utils/api/easeyAuthApi");
//secureAxios.mockImplementation((options) => axios(options));

const renderComponent = (props, idArray, data) => {
  return render(
    <QAExpandableRowsRender
      payload={props?.payload}
      dropdownArray={props?.dropdownArray}
      mdmProps={props?.mdmProps}
      columns={props?.columnNames}
      controlInputs={props?.controlInputs}
      controlDatePickerInputs={props?.controlDatePickerInputs}
      dataTableName={props?.dataTableName}
      extraControls={props?.extraControls}
      radioBtnPayload={props?.radioBtnPayload}
      expandable
      extraIDs={idArray}
      data={data}
      user={"user"}
      isCheckedOut={true}
    />
  );
};

describe("Test cases for QAExpandableRowsRender", () => {
  beforeEach(() => {
    mock.resetHistory();
  });

  afterEach(() => {
  })

  test("renders Protocol Gas data rows and create/save/delete", async () => {
    const protocolGasData = [
      {
        id: "id1",
        testSumId: "testSumId",
        userId: "string",
        addDate: "string",
        updateDate: "string",
        gasLevelCode: "string",
        gasTypeCode: "string",
        vendorIdentifier: "string",
        cylinderIdentifier: "string",
        expirationDate: "2022-11-07",
      },
      {
        id: "id2",
        testSumId: "testSumId",
        userId: "string",
        addDate: "string",
        updateDate: "string",
        gasLevelCode: "string",
        gasTypeCode: "string",
        vendorIdentifier: "string",
        cylinderIdentifier: "string",
        expirationDate: "2022-11-07",
      },
    ];

    const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/protocol-gases`;
    const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/protocol-gases`;
    const putUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/protocol-gases/${idRegex}`
    );
    const deleteUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/protocol-gases/${idRegex}`
    );

    mock.onGet(getUrl).reply(200, protocolGasData);
    mock.onPost(postUrl).reply(200, "created");
    mock.onPut(putUrl).reply(200, "updated");
    mock.onDelete(deleteUrl).reply(200, "deleted");
    const props = qaProtocalGasProps({ gasLevelCode: "gasLevelCode" });
    const idArray = [
      locId,
      testSumId,
      rataId,
      rataSumId,
      rataRunId,
      flowRataRunId,
      id,
    ];
    const data = { locationId: locId, id: testSumId };
    renderComponent(props, idArray, data);

    // renders rows
    const rows = await screen.findAllByRole("row");
    expect(mock.history.get.length).not.toBe(0);
    expect(rows).toHaveLength(protocolGasData.length);

    // add row
    const addBtn = screen.getByRole("button", { name: /Add/i });
    await userEvent.click(addBtn);
    // let saveAndCloseBtn = screen.getByRole("button", {
    //   name: /Save and Close/i,
    // });
    // await userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);

    // edit row
    // const editBtns = screen.getAllByTestId(/Edit/i);
    // expect(editBtns).toHaveLength(protocolGasData.length);
    // userEvent.click(editBtns[0]);
    // saveAndCloseBtn = screen.getByRole("button", { name: /Click to save/i });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.put.length).toBe(1), 1000);

    // remove row
    // const deleteBtns = screen.getAllByTestId(/Remove/i);
    // expect(deleteBtns).toHaveLength(protocolGasData.length);
    // const secondDeleteBtn = deleteBtns[1];
    // userEvent.click(secondDeleteBtn);
    // const confirmBtns = screen.getAllByRole("button", { name: /Yes/i });
    // userEvent.click(confirmBtns[1]);
  });

  test("renders RATA Summary data rows and create/save/delete", async () => {
    const rataSummaryData = [
      {
        operatingLevelCode: "string",
        averageGrossUnitLoad: 71,
        referenceMethodCode: "string",
        meanCEMValue: 0,
        meanRATAReferenceValue: 0,
        meanDifference: 0,
        standardDeviationDifference: 0,
        confidenceCoefficient: 0,
        tValue: 0,
        apsIndicator: 0,
        apsCode: "PS15",
        relativeAccuracy: 0,
        biasAdjustmentFactor: 0,
        co2OrO2ReferenceMethodCode: "string",
        stackDiameter: 0,
        stackArea: 0,
        numberOfTraversePoints: 0,
        calculatedWAF: 0,
        defaultWAF: 0,
        id: "id1",
        rataId: "string",
        calculatedAverageGrossUnitLoad: 0,
        calculatedMeanCEMValue: 0,
        calculatedMeanRATAReferenceValue: 0,
        calculatedMeanDifference: 0,
        calculatedStandardDeviationDifference: 0,
        calculatedConfidenceCoefficient: 0,
        calculatedTValue: 0,
        calculatedApsIndicator: 0,
        calculatedRelativeAccuracy: 0,
        calculatedBiasAdjustmentFactor: 0,
        calculatedStackArea: 0,
        calculatedCalculatedWAF: 0,
        userId: "string",
        addDate: "string",
        updateDate: "string",
      },
      {
        operatingLevelCode: "string",
        averageGrossUnitLoad: 71,
        referenceMethodCode: "string",
        meanCEMValue: 0,
        meanRATAReferenceValue: 0,
        meanDifference: 0,
        standardDeviationDifference: 0,
        confidenceCoefficient: 0,
        tValue: 0,
        apsIndicator: 0,
        apsCode: "PS15",
        relativeAccuracy: 0,
        biasAdjustmentFactor: 0,
        co2OrO2ReferenceMethodCode: "string",
        stackDiameter: 0,
        stackArea: 0,
        numberOfTraversePoints: 0,
        calculatedWAF: 0,
        defaultWAF: 0,
        id: "id2",
        rataId: "string",
        calculatedAverageGrossUnitLoad: 0,
        calculatedMeanCEMValue: 0,
        calculatedMeanRATAReferenceValue: 0,
        calculatedMeanDifference: 0,
        calculatedStandardDeviationDifference: 0,
        calculatedConfidenceCoefficient: 0,
        calculatedTValue: 0,
        calculatedApsIndicator: 0,
        calculatedRelativeAccuracy: 0,
        calculatedBiasAdjustmentFactor: 0,
        calculatedStackArea: 0,
        calculatedCalculatedWAF: 0,
        userId: "string",
        addDate: "string",
        updateDate: "string",
      },
    ];

    const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries`;
    const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries`;
    const putUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${idRegex}`
    );
    const deleteUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${idRegex}`
    );

    mock.onGet(getUrl).reply(200, rataSummaryData);
    mock.onPost(postUrl).reply(200, "created");
    mock.onPut(putUrl).reply(200, "updated");
    mock.onDelete(deleteUrl).reply(200, "deleted");
    const props = qaRataSummaryProps();
    const idArray = [
      locId,
      testSumId,
      rataId,
      rataSumId,
      rataRunId,
      flowRataRunId,
      id,
    ];
    const data = { locationId: locId, id: rataId };
    renderComponent(props, idArray, data);

    // renders rows
    // const rows = await screen.findAllByRole("row");
    // expect(mock.history.get.length).not.toBe(0);
    // expect(rows).toHaveLength(rataSummaryData.length);

    // add row
    // const addBtn = screen.getByRole("button", { name: /Add/i });
    // await userEvent.click(addBtn);
    // let saveAndCloseBtn = screen.getByRole("button", {
    //   name: /Save and Close/i,
    // });
    // await userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);

    // edit row
    // const editBtns = screen.getAllByTestId(/Edit/i);
    // expect(editBtns).toHaveLength(rataSummaryData.length);
    // userEvent.click(editBtns[0]);
    // saveAndCloseBtn = screen.getByRole("button", { name: /Click to save/i });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.put.length).toBe(1), 1000);

    // remove row
    // const deleteBtns = screen.getAllByTestId(/Remove/i);
    // expect(deleteBtns).toHaveLength(rataSummaryData.length);
    // const secondDeleteBtn = deleteBtns[1];
    // userEvent.click(secondDeleteBtn);
    // const confirmBtns = screen.getAllByRole("button", { name: /Yes/i });
    // userEvent.click(confirmBtns[1]);
  });

  test("renders RATA Run data rows and create/save/delete", async () => {
    const rataRunData = [
      {
        id: "id1",
        rataSumId: "string",
        calculatedRataReferenceValue: 0,
        userId: "string",
        addDate: "string",
        updateDate: "string",
        runNumber: 0,
        beginDate: "2022-10-21T19:17:13.290Z",
        beginHour: 0,
        beginMinute: 0,
        endDate: "2022-10-21T19:17:13.290Z",
        endHour: 0,
        endMinute: 0,
        cemValue: 0,
        rataReferenceValue: 0,
        grossUnitLoad: 0,
        runStatusCode: "string",
      },
      {
        id: "id2",
        rataSumId: "string",
        calculatedRataReferenceValue: 0,
        userId: "string",
        addDate: "string",
        updateDate: "string",
        runNumber: 0,
        beginDate: "2022-10-21T19:17:13.290Z",
        beginHour: 0,
        beginMinute: 0,
        endDate: "2022-10-21T19:17:13.290Z",
        endHour: 0,
        endMinute: 0,
        cemValue: 0,
        rataReferenceValue: 0,
        grossUnitLoad: 0,
        runStatusCode: "string",
      },
    ];

    const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs`;
    const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs`;
    const putUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${idRegex}`
    );
    const deleteUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${idRegex}`
    );

    mock.onGet(getUrl).reply(200, rataRunData);
    mock.onPost(postUrl).reply(200, "created");
    mock.onPut(putUrl).reply(200, "updated");
    mock.onDelete(deleteUrl).reply(200, "deleted");

    const props = qaRataRunDataProps();
    const idArray = [
      locId,
      testSumId,
      rataId,
      rataSumId,
      rataRunId,
      flowRataRunId,
      id,
    ];
    const data = { locationId: locId, id: rataSumId };
    renderComponent(props, idArray, data);

    // renders rows
    // const rows = await screen.findAllByRole("row");
    // expect(mock.history.get.length).not.toBe(0);
    // expect(rows).toHaveLength(rataRunData.length);

    // add row
    // const addBtn = screen.getByRole("button", { name: /Add/i });
    // userEvent.click(addBtn);
    // let saveAndCloseBtn = screen.getByRole("button", {
    //   name: /Click to save/i,
    // });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);

    // edit row
    // const editBtns = screen.getAllByTestId(/Edit/i);
    // expect(editBtns).toHaveLength(rataRunData.length);
    // userEvent.click(editBtns[0]);
    // saveAndCloseBtn = screen.getByRole("button", { name: /Click to save/i });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.put.length).toBe(1), 1000);

    // remove row
    // const deleteBtns = screen.getAllByTestId(/Remove/i);
    // expect(deleteBtns).toHaveLength(rataRunData.length);
    // const secondDeleteBtn = deleteBtns[1];
    // userEvent.click(secondDeleteBtn);
    // const confirmBtns = screen.getAllByRole("button", { name: /Yes/i });
    // userEvent.click(confirmBtns[1]);
  });

  test("renders RATA Flow data rows and create/save/delete", async () => {
    const rataFlowData = [
      {
        id: "string",
        rataRunId: "string",
        calculatedDryMolecularWeight: 0,
        calculatedWetMolecularWeight: 0,
        calculatedAverageVelocityWithoutWallEffects: 0,
        calculatedAverageVelocityWithWallEffects: 0,
        calculatedCalculatedWAF: 0,
        userId: "string",
        addDate: "2022-10-06T21:10:16.300Z",
        updateDate: "2022-10-06T21:10:16.300Z",
        numberOfTraversePoints: 0,
        barometricPressure: 0,
        staticStackPressure: 0,
        percentCO2: 0,
        percentO2: 0,
        percentMoisture: 0,
        dryMolecularWeight: 0,
        wetMolecularWeight: 0,
        averageVelocityWithoutWallEffects: 0,
        averageVelocityWithWallEffects: 0,
        calculatedWAF: 0,
        averageStackFlowRate: 0,
      },
      {
        id: "string",
        rataRunId: "string",
        calculatedDryMolecularWeight: 0,
        calculatedWetMolecularWeight: 0,
        calculatedAverageVelocityWithoutWallEffects: 0,
        calculatedAverageVelocityWithWallEffects: 0,
        calculatedCalculatedWAF: 0,
        userId: "string",
        addDate: "2022-10-06T21:10:16.300Z",
        updateDate: "2022-10-06T21:10:16.300Z",
        numberOfTraversePoints: 0,
        barometricPressure: 0,
        staticStackPressure: 0,
        percentCO2: 0,
        percentO2: 0,
        percentMoisture: 0,
        dryMolecularWeight: 0,
        wetMolecularWeight: 0,
        averageVelocityWithoutWallEffects: 0,
        averageVelocityWithWallEffects: 0,
        calculatedWAF: 0,
        averageStackFlowRate: 0,
      },
    ];

    const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs`;
    const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs`;
    const putUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${idRegex}`
    );
    const deleteUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${idRegex}`
    );

    mock.onGet(getUrl).reply(200, rataFlowData);
    mock.onPost(postUrl).reply(200, "created");
    mock.onPut(putUrl).reply(200, "updated");
    mock.onDelete(deleteUrl).reply(200, "deleted");

    const props = qaFlowRataRunProps();
    const idArray = [
      locId,
      testSumId,
      rataId,
      rataSumId,
      rataRunId,
      flowRataRunId,
      id,
    ];
    const data = { locationId: locId, id: rataRunId };
    renderComponent(props, idArray, data);

    // renders rows
    // const rows = await screen.findAllByRole("row");
    // expect(mock.history.get.length).not.toBe(0);
    // expect(rows).toHaveLength(rataFlowData.length);

    // add row
    // const addBtn = screen.getByRole("button", { name: /Add/i });
    // userEvent.click(addBtn);
    // let saveAndCloseBtn = screen.getByRole("button", {
    //   name: /Click to save/i,
    // });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);

    // edit row
    // const editBtns = screen.getAllByTestId(/Edit/i);
    // expect(editBtns).toHaveLength(rataFlowData.length);
    // userEvent.click(editBtns[0]);
    // saveAndCloseBtn = screen.getByRole("button", { name: /Click to save/i });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.put.length).toBe(1), 1000);

    // remove row
    // const deleteBtns = screen.getAllByTestId(/Remove/i);
    // expect(deleteBtns).toHaveLength(rataFlowData.length);
    // const secondDeleteBtn = deleteBtns[1];
    // userEvent.click(secondDeleteBtn);
    // const confirmBtns = screen.getAllByRole("button", { name: /Yes/i });
    // userEvent.click(confirmBtns[1]);
  });

  test("renders RATA Traverse data rows and create/save/delete", async () => {
    const rataTraverseData = [
      {
        id: "id1",
        flowRataRunId: "string",
        calculatedCalculatedVelocity: 0,
        userId: "string",
        addDate: "string",
        updateDate: "string",
        probeId: "string",
        probeTypeCode: "string",
        pressureMeasureCode: "string",
        methodTraversePointId: "string",
        velocityCalibrationCoefficient: 0,
        lastProbeDate: "2022-10-21T19:31:34.885Z",
        avgVelDiffPressure: 0,
        avgSquareVelDiffPressure: 0,
        tStackTemperature: 0,
        pointUsedIndicator: 0,
        numberWallEffectsPoints: 0,
        yawAngle: 0,
        pitchAngle: 0,
        calculatedVelocity: 0,
        replacementVelocity: 0,
      },
      {
        id: "id2",
        flowRataRunId: "string",
        calculatedCalculatedVelocity: 0,
        userId: "string",
        addDate: "string",
        updateDate: "string",
        probeId: "string",
        probeTypeCode: "string",
        pressureMeasureCode: "string",
        methodTraversePointId: "string",
        velocityCalibrationCoefficient: 0,
        lastProbeDate: "2022-10-21T19:31:34.885Z",
        avgVelDiffPressure: 0,
        avgSquareVelDiffPressure: 0,
        tStackTemperature: 0,
        pointUsedIndicator: 0,
        numberWallEffectsPoints: 0,
        yawAngle: 0,
        pitchAngle: 0,
        calculatedVelocity: 0,
        replacementVelocity: 0,
      },
    ];

    const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${flowRataRunId}/rata-traverses`;
    const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${flowRataRunId}/rata-traverses`;
    const putUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${flowRataRunId}/rata-traverses/${idRegex}`
    );
    const deleteUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${flowRataRunId}/rata-traverses/${idRegex}`
    );

    mock.onGet(getUrl).reply(200, rataTraverseData);
    mock.onPost(postUrl).reply(200, "created");
    mock.onPut(putUrl).reply(200, "updated");
    mock.onDelete(deleteUrl).reply(200, "deleted");

    const props = qaRataTraverseProps();
    const idArray = [
      locId,
      testSumId,
      rataId,
      rataSumId,
      rataRunId,
      flowRataRunId,
      id,
    ];
    const data = { locationId: locId, id: flowRataRunId };
    renderComponent(props, idArray, data);

    // renders rows
    // const rows = await screen.findAllByRole("row");
    // expect(mock.history.get.length).not.toBe(0);
    // expect(rows).toHaveLength(rataTraverseData.length);

    // add row
    // const addBtn = screen.getByRole("button", { name: /Add/i });
    // userEvent.click(addBtn);
    // let saveAndCloseBtn = screen.getByRole("button", {
    //   name: /Click to save/i,
    // });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);

    // edit row
    // const editBtns = screen.getAllByTestId(/Edit/i);
    // expect(editBtns).toHaveLength(rataTraverseData.length);
    // userEvent.click(editBtns[0]);
    // saveAndCloseBtn = screen.getByRole("button", { name: /Click to save/i });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.put.length).toBe(1), 1000);

    // remove row
    // const deleteBtns = screen.getAllByTestId(/Remove/i);
    // expect(deleteBtns).toHaveLength(rataTraverseData.length);
    // const secondDeleteBtn = deleteBtns[1];
    // userEvent.click(secondDeleteBtn);
    // const confirmBtns = screen.getAllByRole("button", { name: /Yes/i });
    // userEvent.click(confirmBtns[1]);
  });

  test("renders Fuel Flow to Load data rows and create/save/delete", async () => {
    const fuelFlowToLoadData = [
      {
        id: "id1",
        testSumId: "testSumId",
        userId: "string",
        addDate: "string",
        updateDate: "string",
        testBasisCode: "string",
        averageDifference: 1,
        numberOfHoursUsed: 2,
        numberOfHoursExcludedCofiring: 3,
        numberOfHoursExcludedRamping: 4,
        numberOfHoursExcludedLowRange: 5,
      },
      {
        id: "id2",
        testSumId: "testSumId",
        userId: "string",
        addDate: "string",
        updateDate: "string",
        testBasisCode: "string",
        averageDifference: 10,
        numberOfHoursUsed: 20,
        numberOfHoursExcludedCofiring: 30,
        numberOfHoursExcludedRamping: 40,
        numberOfHoursExcludedLowRange: 50,
      },
    ];

    const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/fuel-flow-to-load-tests`;
    const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/fuel-flow-to-load-tests`;
    const putUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/fuel-flow-to-load-tests/${idRegex}`
    );
    const deleteUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/fuel-flow-to-load-tests/${idRegex}`
    );

    mock.onGet(getUrl).reply(200, fuelFlowToLoadData);
    mock.onPost(postUrl).reply(200, "created");
    mock.onPut(putUrl).reply(200, "updated");
    mock.onDelete(deleteUrl).reply(200, "deleted");

    const props = qaFuelFlowToLoadProps();
    const idArray = [
      locId,
      testSumId,
      rataId,
      rataSumId,
      rataRunId,
      flowRataRunId,
      id,
    ];
    const data = { locationId: locId, id: testSumId };
    renderComponent(props, idArray, data);

    // renders rows
    // const rows = await screen.findAllByRole("row");
    // expect(mock.history.get.length).not.toBe(0);
    // expect(rows).toHaveLength(fuelFlowToLoadData.length);

    // add row
    // const addBtn = screen.getByRole("button", { name: /Add/i });
    // userEvent.click(addBtn);
    // let saveAndCloseBtn = screen.getByRole("button", {
    //   name: /Click to save/i,
    // });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);

    // edit row
    // const editBtns = screen.getAllByTestId(/Edit/i);
    // expect(editBtns).toHaveLength(fuelFlowToLoadData.length);
    // userEvent.click(editBtns[0]);
    // saveAndCloseBtn = screen.getByRole("button", { name: /Click to save/i });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.put.length).toBe(1), 1000);

    // remove row
    // const deleteBtns = screen.getAllByTestId(/Remove/i);
    // expect(deleteBtns).toHaveLength(fuelFlowToLoadData.length);
    // const secondDeleteBtn = deleteBtns[1];
    // userEvent.click(secondDeleteBtn);
    // const confirmBtns = screen.getAllByRole("button", { name: /Yes/i });
    // userEvent.click(confirmBtns[1]);
  });

  test("renders Appendix E Correlation test Summary data rows and create/save/delete", async () => {
    const appendixECorrTestSumData = [
      {
        id: "id1",
        testSumId: "testSumId",
        userId: "string",
        operatingLevelForRun: 1,
        meanReferenceValue: 1,
        calculatedMeanReferenceValue: 1,
        averageHourlyHeatInputRate: 1,
        calculatedAverageHourlyHeatInputRate: 1,
        fFactor: 1,
        addDate: "string",
        updateDate: "string",
      },
      {
        id: "id2",
        testSumId: "testSumId",
        userId: "string",
        operatingLevelForRun: 1,
        meanReferenceValue: 1,
        calculatedMeanReferenceValue: 1,
        averageHourlyHeatInputRate: 1,
        calculatedAverageHourlyHeatInputRate: 1,
        fFactor: 1,
        addDate: "string",
        updateDate: "string",
      },
    ];

    const protocolGasData = [
      {
        id: "id1",
        testSumId: "testSumId",
        userId: "string",
        addDate: "string",
        updateDate: "string",
        gasLevelCode: "string",
        gasTypeCode: "string",
        vendorIdentifier: "string",
        cylinderIdentifier: "string",
        expirationDate: "2022-11-07",
      },
      {
        id: "id2",
        testSumId: "testSumId",
        userId: "string",
        addDate: "string",
        updateDate: "string",
        gasLevelCode: "string",
        gasTypeCode: "string",
        vendorIdentifier: "string",
        cylinderIdentifier: "string",
        expirationDate: "2022-11-07",
      },
    ];

    const airEmissionsData = [
      {
        id: "id1",
        testSumId: "testSumId",
        userId: "string",
        addDate: "string",
        updateDate: "string",
        qiLastName: "string",
        qiFirstName: "string",
        qiMiddleInitial: "string",
        aetbName: "string",
        aetbPhoneNumber: "string",
        aetbEmail: "string",
        examDate: "string",
        providerName: "string",
        providerEmail: "string",
      },
      {
        id: "id2",
        testSumId: "testSumId",
        userId: "string",
        addDate: "string",
        updateDate: "string",
        qiLastName: "string",
        qiFirstName: "string",
        qiMiddleInitial: "string",
        aetbName: "string",
        aetbPhoneNumber: "string",
        aetbEmail: "string",
        examDate: "string",
        providerName: "string",
        providerEmail: "string",
      },
    ];

    const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries`;
    const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries`;
    const putUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${idRegex}`
    );
    const deleteUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${idRegex}`
    );
    const getProtocolGasUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/protocol-gases`;
    const getAirEmissionUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/air-emission-testings`;

    mock.onGet(getProtocolGasUrl).reply(200, protocolGasData);
    mock.onGet(getAirEmissionUrl).reply(200, airEmissionsData);

    mock.onGet(getUrl).reply(200, appendixECorrTestSumData);
    mock.onPost(postUrl).reply(200, "created");
    mock.onPut(putUrl).reply(200, "updated");
    mock.onDelete(deleteUrl).reply(200, "deleted");

    const props = qaAppendixECorrelationSummaryTestProps();
    const idArray = [locId, testSumId, testSumId, id];
    const data = { locationId: locId, id: testSumId };
    renderComponent(props, idArray, data);

    // renders rows
    // const rows = await screen.findAllByRole("row");
    // expect(mock.history.get.length).not.toBe(0);
    // expect(rows).not.toHaveLength(0);

    // add row
    // const addBtn = screen.getAllByRole("button", { name: /Add/i });
    // userEvent.click(addBtn[0]);
    // let saveAndCloseBtn = screen.getAllByRole("button", {
    //   name: /Click to save/i,
    // });
    // userEvent.click(saveAndCloseBtn[0]);
    // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);
    /*
    // edit row
    const editBtns = screen.getAllByTestId(/Edit/i);
    expect(editBtns).toHaveLength(appendixECorrTestSumData.length + protocolGasData.length + airEmissionsData.length)
    userEvent.click(editBtns[0])
    saveAndCloseBtn = screen.getAllByRole('button', { name: /Click to save/i })
    userEvent.click(saveAndCloseBtn[0])
    setTimeout(() => expect(mock.history.put.length).toBe(1), 1000)
*/
    // remove row
    // const deleteBtns = screen.getAllByTestId(/Remove/i);
    // expect(deleteBtns).toHaveLength(
    //   appendixECorrTestSumData.length +
    //     protocolGasData.length +
    //     airEmissionsData.length
    // );
    // const secondDeleteBtn = deleteBtns[1];
    // userEvent.click(secondDeleteBtn);
    // const confirmBtns = screen.getAllByRole("button", { name: /Yes/i });
    // userEvent.click(confirmBtns[1]);
  });

  test("renders Appendix E Correlation test Run data rows and create/save/delete", async () => {
    const appendixECorrTestRunData = [
      {
        id: "id1",
        appECorrTestSumId: "appECorrTestSumId",
        runNumber: 1,
        referenceValue: 1,
        hourlyHeatInputRate: 1,
        calculatedHourlyHeatInputRate: 1,
        totalHeatInput: 1,
        calculatedTotalHeatInput: 1,
        responseTime: 1,
        beginDate: "string",
        beginHour: 1,
        beginMinute: 1,
        endDate: "string",
        endHour: 1,
        endMinute: 1,
        userId: "string",
        addDate: "string",
        updateDate: "string",
      },
      {
        id: "id2",
        appECorrTestSumId: "appECorrTestSumId",
        runNumber: 1,
        referenceValue: 1,
        hourlyHeatInputRate: 1,
        calculatedHourlyHeatInputRate: 1,
        totalHeatInput: 1,
        calculatedTotalHeatInput: 1,
        responseTime: 1,
        beginDate: "string",
        beginHour: 1,
        beginMinute: 1,
        endDate: "string",
        endHour: 1,
        endMinute: 1,
        userId: "string",
        addDate: "string",
        updateDate: "string",
      },
    ];

    const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs`;
    const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs`;
    const putUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${idRegex}`
    );
    const deleteUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${idRegex}`
    );

    mock.onGet(getUrl).reply(200, appendixECorrTestRunData);
    mock.onPost(postUrl).reply(200, "created");
    mock.onPut(putUrl).reply(200, "updated");
    mock.onDelete(deleteUrl).reply(200, "deleted");

    const props = qaAppendixECorrTestRunProps();
    const idArray = [locId, testSumId, testSumId, appECorrTestSumId, id];
    const data = { locationId: locId, id: appECorrTestSumId };
    renderComponent(props, idArray, data);

    // renders rows
    // const rows = await screen.findAllByRole("row");
    // expect(mock.history.get.length).not.toBe(0);
    // expect(rows).not.toHaveLength(0);

    // add row
    // const addBtn = screen.getByRole("button", { name: /Add/i });
    // userEvent.click(addBtn);
    // let saveAndCloseBtn = screen.getByRole("button", {
    //   name: /Click to save/i,
    // });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);

    // edit row
    // const editBtns = screen.getAllByTestId(/Edit/i);
    // expect(editBtns).toHaveLength(appendixECorrTestRunData.length);
    // userEvent.click(editBtns[0]);
    // saveAndCloseBtn = screen.getByRole("button", { name: /Click to save/i });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.put.length).toBe(1), 1000);

    // remove row
    // const deleteBtns = screen.getAllByTestId(/Remove/i);
    // expect(deleteBtns).toHaveLength(appendixECorrTestRunData.length);
    // const secondDeleteBtn = deleteBtns[1];
    // userEvent.click(secondDeleteBtn);
    // const confirmBtns = screen.getAllByRole("button", { name: /Yes/i });
    // userEvent.click(confirmBtns[1]);
  });

  test("renders Appendix E Correlation Heat Input Gas data rows and create/save/delete", async () => {
    const appendixECorrelationSummaryHeatInputGasData = [
      {
        id: "id1",
        appECorrTestRunId: "appECorrTestRunId",
        monitoringSystemId: "monitoringSystemId",
        gasVolume: 1,
        gasGCV: 1,
        gasHeatInput: 1,
        calculatedGasHeatInput: 1,
        userId: "string",
        addDate: "string",
        updateDate: "string",
      },
      {
        id: "id2",
        appECorrTestRunId: "appECorrTestRunId",
        monitoringSystemId: "monitoringSystemId",
        gasVolume: 1,
        gasGCV: 1,
        gasHeatInput: 1,
        calculatedGasHeatInput: 1,
        userId: "string",
        addDate: "string",
        updateDate: "string",
      },
    ];

    const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-gases`;
    const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-gases`;
    const putUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-gases/${idRegex}`
    );
    const deleteUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-gases/${idRegex}`
    );

    mock.onGet(getUrl).reply(200, appendixECorrelationSummaryHeatInputGasData);
    mock.onPost(postUrl).reply(200, "created");
    mock.onPut(putUrl).reply(200, "updated");
    mock.onDelete(deleteUrl).reply(200, "deleted");

    mock
      .onGet(
        `https://api.epa.gov/easey/dev/qa-certification-mgmt/locations/${locId}/test-summary/${testSumId}`
      )
      .reply(200, [
        {
          id: "L3FY866-950F544520244336B5ED7E3824642F9E",
          locationId: "2286",
          stackPipeId: null,
          unitId: "1",
          testTypeCode: "APPE",
          monitoringSystemID: "400",
          componentID: null,
          spanScaleCode: null,
          testNumber: "01NOX2021-2",
          testReasonCode: "QA",
          testDescription: null,
          testResultCode: null,
          calculatedTestResultCode: null,
          beginDate: "2021-02-05",
          beginHour: 8,
          beginMinute: 0,
          endDate: "2021-02-05",
          endHour: 15,
          endMinute: 26,
          gracePeriodIndicator: null,
          calculatedGracePeriodIndicator: null,
          year: null,
          quarter: null,
          testComment: null,
          injectionProtocolCode: null,
          calculatedSpanValue: null,
          evalStatusCode: "EVAL",
          userId: "rboehme-dp",
          addDate: "4/7/2021, 7:34:01 AM",
          updateDate: "11/9/2022, 3:05:01 PM",
          reportPeriodId: null,
        },
      ]);

    const props = qaAppendixECorrelationSummaryHeatInputGasProps();
    const idArray = [
      locId,
      testSumId,
      appECorrTestSumId,
      appECorrTestRunId,
      id,
    ];
    const data = { locationId: locId, id: appECorrTestRunId };
    renderComponent(props, idArray, data);

    // renders rows
    // const rows = await screen.findAllByRole("row");
    // expect(mock.history.get.length).not.toBe(0);
    // expect(rows).not.toHaveLength(0);

    // add row
    /*const addBtn = screen.getAllByRole('button', { name: /Add/i })
    userEvent.click(addBtn[0])
    let saveAndCloseBtn = screen.getByRole('button', { name: /Click to save/i })
    userEvent.click(saveAndCloseBtn)
    setTimeout(() => expect(mock.history.post.length).toBe(1), 1000)
*/
    // edit row
    // const editBtns = screen.getAllByTestId(/Edit/i);
    // expect(editBtns).toHaveLength(
    //   appendixECorrelationSummaryHeatInputGasData.length
    // );
    // userEvent.click(editBtns[0]);
    // let saveAndCloseBtn = screen.getByRole("button", {
    //   name: /Click to save/i,
    // });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.put.length).toBe(1), 1000);

    // remove row
    // const deleteBtns = screen.getAllByTestId(/Remove/i);
    // expect(deleteBtns).toHaveLength(
    //   appendixECorrelationSummaryHeatInputGasData.length
    // );
    // const secondDeleteBtn = deleteBtns[1];
    // userEvent.click(secondDeleteBtn);
    // const confirmBtns = screen.getAllByRole("button", { name: /Yes/i });
    // userEvent.click(confirmBtns[1]);
  });

  test("renders Fuel Flow to Load Baseline data rows and create/save/delete", async () => {
    const fuelFlowToLoadBaselineData = [
      {
        id: "id1",
        testSumId: "testSumId",
        userId: "string",
        addDate: "string",
        updateDate: "string",
        accuracyTestNumber: 0,
        peiTestNumber: 0,
        averageFuelFlowRate: 0,
        averageLoad: 0,
        baselineFuelFlowToLoadRatio: 0,
        fuelFlowToLoadUOMCode: "string",
        averageHourlyHeatInputRate: 0,
        baselineGHR: 0,
        ghrUnitsOfMeasureCode: "string",
        numberOfHoursExcludedCofiring: 0,
        numberOfHoursExcludedRamping: 0,
        numberOfHoursExcludedLowRange: 0,
      },
      {
        id: "id2",
        testSumId: "testSumId",
        userId: "string",
        addDate: "string",
        updateDate: "string",
        accuracyTestNumber: 0,
        peiTestNumber: 0,
        averageFuelFlowRate: 0,
        averageLoad: 0,
        baselineFuelFlowToLoadRatio: 0,
        fuelFlowToLoadUOMCode: "string",
        averageHourlyHeatInputRate: 0,
        baselineGHR: 0,
        ghrUnitsOfMeasureCode: "string",
        numberOfHoursExcludedCofiring: 0,
        numberOfHoursExcludedRamping: 0,
        numberOfHoursExcludedLowRange: 0,
      },
    ];

    const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/fuel-flow-to-load-baselines`;
    const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/fuel-flow-to-load-baselines`;
    const putUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/fuel-flow-to-load-baselines/${idRegex}`
    );

    mock.onGet(getUrl).reply(200, fuelFlowToLoadBaselineData);
    mock.onPost(postUrl).reply(200, "created");
    mock.onPut(putUrl).reply(200, "updated");

    const props = qaFuelFlowToLoadBaselineProps();
    const idArray = [
      locId,
      testSumId,
      rataId,
      rataSumId,
      rataRunId,
      flowRataRunId,
      id,
    ];
    const data = { locationId: locId, id: testSumId };
    renderComponent(props, idArray, data);

    // renders rows
    // const rows = await screen.findAllByRole("row");
    // expect(mock.history.get.length).not.toBe(0);
    // expect(rows).toHaveLength(fuelFlowToLoadBaselineData.length);

    // add row
    // const addBtn = screen.getByRole("button", { name: /Add/i });
    // userEvent.click(addBtn);
    // let saveAndCloseBtn = screen.getByRole("button", {
    //   name: /Click to save/i,
    // });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);

    // edit row
    // const editBtns = screen.getAllByTestId(/Edit/i);
    // expect(editBtns).toHaveLength(fuelFlowToLoadBaselineData.length);
    // userEvent.click(editBtns[0]);
    // saveAndCloseBtn = screen.getByRole("button", { name: /Click to save/i });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.put.length).toBe(1), 1000);
    //
    // const deleteBtns = screen.getAllByTestId(/Remove/i);
    // expect(deleteBtns).toHaveLength(fuelFlowToLoadBaselineData.length);
    // const secondDeleteBtn = deleteBtns[1];
    // userEvent.click(secondDeleteBtn);
    // const confirmBtns = screen.getAllByRole("button", { name: /Yes/i });
    // userEvent.click(confirmBtns[1]);
  });

  test("renders Cycle Time Summary rows and crud funtionality", async () => {
    const qaCycleTimeSummaryData = [
      {
        id: "id1",
        testSumId: "testSumId",
        userId: "string",
        totalTime: "string",
      },
      {
        id: "id2",
        testSumId: "testSumId",
        userId: "string",
        totalTime: "string",
      },
    ];

    const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries`;
    const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries`;
    const putUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries/${idRegex}`
    );
    const deleteUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries/${idRegex}`
    );

    mock.onGet(getUrl).reply(200, qaCycleTimeSummaryData);
    mock.onPost(postUrl).reply(200, "created");
    mock.onPut(putUrl).reply(200, "updated");
    mock.onDelete(deleteUrl).reply(200, "deleted");

    const props = qaCycleTimeSummaryProps();
    const idArray = [locId, testSumId, id];
    const data = { locationId: locId, id: testSumId };
    renderComponent(props, idArray, data);

    // renders rows
    // const rows = await screen.findAllByRole("row");
    // expect(mock.history.get.length).not.toBe(0);
    // expect(rows).toHaveLength(qaCycleTimeSummaryData.length);

    // add row
    // const addBtn = screen.getByRole("button", { name: /Add/i });
    // userEvent.click(addBtn);
    // let saveAndCloseBtn = screen.getByRole("button", {
    //   name: /Click to save/i,
    // });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);

    // edit row
    // const editBtns = screen.getAllByTestId(/Edit/i);
    // expect(editBtns).toHaveLength(qaCycleTimeSummaryData.length);
    // userEvent.click(editBtns[0]);
    // saveAndCloseBtn = screen.getByRole("button", { name: /Click to save/i });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.put.length).toBe(1), 1000);

    // remove row
    // const deleteBtns = screen.getAllByTestId(/Remove/i);
    // expect(deleteBtns).toHaveLength(qaCycleTimeSummaryData.length);
    // const secondDeleteBtn = deleteBtns[1];
    // userEvent.click(secondDeleteBtn);
    // const confirmBtns = screen.getAllByRole("button", { name: /Yes/i });
    // userEvent.click(confirmBtns[1]);
  });

  test("renders calibration injection data rows and create/save/delete", async () => {
    const cycleInjectionData = [
      {
        id: "string",
        onlineOfflineIndicator: 0,
        upscaleGasLevelCode: "string",
        zeroInjectionDate: "2022-11-10T21:03:31.847Z",
        zeroInjectionHour: 0,
        zeroInjectionMinute: 0,
        upscaleInjectionDate: "2022-11-10T21:03:31.847Z",
        upscaleInjectionHour: 0,
        upscaleInjectionMinute: 0,
        zeroMeasuredValue: 0,
        upscaleMeasuredValue: 0,
        zeroAPSIndicator: 0,
        upscaleAPSIndicator: 0,
        zeroCalibrationError: 0,
        upscaleCalibrationError: 0,
        zeroReferenceValue: 0,
        upscaleReferenceValue: 0,
      },
      {
        id: "string2",
        onlineOfflineIndicator: 0,
        upscaleGasLevelCode: "string",
        zeroInjectionDate: "2022-11-10T21:03:31.847Z",
        zeroInjectionHour: 0,
        zeroInjectionMinute: 0,
        upscaleInjectionDate: "2022-11-10T21:03:31.847Z",
        upscaleInjectionHour: 0,
        upscaleInjectionMinute: 0,
        zeroMeasuredValue: 0,
        upscaleMeasuredValue: 0,
        zeroAPSIndicator: 0,
        upscaleAPSIndicator: 0,
        zeroCalibrationError: 0,
        upscaleCalibrationError: 0,
        zeroReferenceValue: 0,
        upscaleReferenceValue: 0,
      },
    ];

    const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/calibration-injections`;
    const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/calibration-injections`;
    const putUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/calibration-injections/${idRegex}`
    );

    mock.onGet(getUrl).reply(200, cycleInjectionData);
    mock.onPost(postUrl).reply(200, "created");
    mock.onPut(putUrl).reply(200, "updated");

    const props = qaCalibrationInjectionProps();
    const idArray = null;
    const data = { locationId: locId, id: testSumId };
    renderComponent(props, idArray, data);

    // renders rows
    // const rows = await screen.findAllByRole("row");
    // expect(mock.history.get.length).not.toBe(0);
    // expect(rows).toHaveLength(cycleInjectionData.length);

    // add row
    // const addBtn = screen.getByRole("button", { name: /Add/i });
    // userEvent.click(addBtn);
    // let saveAndCloseBtn = screen.getByRole("button", {
    //   name: /Click to save/i,
    // });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);

    // // edit row
    // const editBtns = screen.getAllByTestId(/Edit/i);
    // expect(editBtns).toHaveLength(cycleInjectionData.length);
    // userEvent.click(editBtns[0]);
    // saveAndCloseBtn = screen.getByRole("button", { name: /Click to save/i });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.put.length).toBe(1), 1000);
    //
    // const deleteBtns = screen.getAllByTestId(/Remove/i);
    // expect(deleteBtns).toHaveLength(cycleInjectionData.length);
    // const secondDeleteBtn = deleteBtns[1];
    // userEvent.click(secondDeleteBtn);
    // const confirmBtns = screen.getAllByRole("button", { name: /Yes/i });
    // userEvent.click(confirmBtns[1]);
  });

  test("renders Online Offline Calibration data rows and create/save/delete", async () => {
    const onlineOfflineCalibrationData = [
      {
        id: "id1",
        testSumId: "testSumId",
        userId: "string",
        addDate: "string",
        updateDate: "string",
        onlineZeroInjectionDate: "string",
        onlineZeroInjectionHour: 0,
        onlineZeroCalibrationError: 0,
        onlineZeroAPSIndicator: 0,
        onlineZeroMeasuredValue: 0,
        onlineZeroReferenceValue: 0,
        onlineUpscaleCalibrationError: 0,
        onlineUpscaleAPSIndicator: 0,
        onlineUpscaleInjectionDate: "string",
        onlineUpscaleInjectionHour: 0,
        onlineUpscaleMeasuredValue: 0,
        onlineUpscaleReferenceValue: 0,
        offlineZeroCalibrationError: 0,
        offlineZeroAPSIndicator: 0,
        offlineZeroInjectionDate: "string",
        offlineZeroInjectionHour: 0,
        offlineZeroMeasuredValue: 0,
        offlineZeroReferenceValue: 0,
        offlineUpscaleCalibrationError: 0,
        offlineUpscaleAPSIndicator: 0,
        offlineUpscaleInjectionDate: "string",
        offlineUpscaleInjectionHour: 0,
        offlineUpscaleMeasuredValue: 0,
        offlineUpscaleReferenceValue: 0,
        upscaleGasLevelCode: "string",
      },
      {
        id: "id2",
        testSumId: "testSumId",
        userId: "string",
        addDate: "string",
        updateDate: "string",
        onlineZeroInjectionDate: "string",
        onlineZeroInjectionHour: 0,
        onlineZeroCalibrationError: 0,
        onlineZeroAPSIndicator: 0,
        onlineZeroMeasuredValue: 0,
        onlineZeroReferenceValue: 0,
        onlineUpscaleCalibrationError: 0,
        onlineUpscaleAPSIndicator: 0,
        onlineUpscaleInjectionDate: "string",
        onlineUpscaleInjectionHour: 0,
        onlineUpscaleMeasuredValue: 0,
        onlineUpscaleReferenceValue: 0,
        offlineZeroCalibrationError: 0,
        offlineZeroAPSIndicator: 0,
        offlineZeroInjectionDate: "string",
        offlineZeroInjectionHour: 0,
        offlineZeroMeasuredValue: 0,
        offlineZeroReferenceValue: 0,
        offlineUpscaleCalibrationError: 0,
        offlineUpscaleAPSIndicator: 0,
        offlineUpscaleInjectionDate: "string",
        offlineUpscaleInjectionHour: 0,
        offlineUpscaleMeasuredValue: 0,
        offlineUpscaleReferenceValue: 0,
        upscaleGasLevelCode: "string",
      },
    ];

    const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/online-offline-calibration`;
    const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/online-offline-calibration`;
    const putUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/online-offline-calibration/${idRegex}`
    );
    const deleteUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/online-offline-calibration/${idRegex}`
    );

    mock.onGet(getUrl).reply(200, onlineOfflineCalibrationData);
    mock.onPost(postUrl).reply(200, "created");
    mock.onPut(putUrl).reply(200, "updated");
    mock.onDelete(deleteUrl).reply(200, "deleted");

    const props = qaOnOffCalibrationProps();
    const idArray = [
      locId,
      testSumId,
      rataId,
      rataSumId,
      rataRunId,
      flowRataRunId,
      id,
    ];
    const data = { locationId: locId, id: testSumId };
    renderComponent(props, idArray, data);

    // renders rows
    // const rows = await screen.findAllByRole("row");
    // expect(mock.history.get.length).not.toBe(0);
    // expect(rows).toHaveLength(onlineOfflineCalibrationData.length);

    // add row
    // const addBtn = screen.getByRole("button", { name: /Add/i });
    // userEvent.click(addBtn);
    // let saveAndCloseBtn = screen.getByRole("button", {
    //   name: /Click to save/i,
    // });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);

    // edit row
    // const editBtns = screen.getAllByTestId(/Edit/i);
    // expect(editBtns).toHaveLength(onlineOfflineCalibrationData.length);
    // userEvent.click(editBtns[0]);
    // saveAndCloseBtn = screen.getByRole("button", { name: /Click to save/i });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.put.length).toBe(1), 1000);
    //
    // const deleteBtns = screen.getAllByTestId(/Remove/i);
    // expect(deleteBtns).toHaveLength(onlineOfflineCalibrationData.length);
    // const secondDeleteBtn = deleteBtns[1];
    // userEvent.click(secondDeleteBtn);
    // const confirmBtns = screen.getAllByRole("button", { name: /Yes/i });
    // userEvent.click(confirmBtns[1]);
  });

  test("renders Flow to Load Reference data rows and create/save/delete", async () => {
    const flowToLoadReferenceData = [
      {
        id: "id1",
        testSumId: "testSumId1",
        calculatedAverageGrossUnitLoad: 0,
        calculatedAverageReferenceMethodFlow: 0,
        calculatedReferenceFlowToLoadRatio: 0,
        calculatedReferenceGrossHeatRate: 0,
        userId: "string",
        addDate: "string",
        updateDate: "string",
        rataTestNumber: "string",
        operatingLevelCode: "string",
        averageGrossUnitLoad: 0,
        averageReferenceMethodFlow: 0,
        referenceFlowLoadRatio: 0,
        averageHourlyHeatInputRate: 0,
        referenceGrossHeatRate: 0,
        calcSeparateReferenceIndicator: 0,
      },
      {
        id: "id2",
        testSumId: "testSumId2",
        calculatedAverageGrossUnitLoad: 0,
        calculatedAverageReferenceMethodFlow: 0,
        calculatedReferenceFlowToLoadRatio: 0,
        calculatedReferenceGrossHeatRate: 0,
        userId: "string",
        addDate: "string",
        updateDate: "string",
        rataTestNumber: "string",
        operatingLevelCode: "string",
        averageGrossUnitLoad: 0,
        averageReferenceMethodFlow: 0,
        referenceFlowLoadRatio: 0,
        averageHourlyHeatInputRate: 0,
        referenceGrossHeatRate: 0,
        calcSeparateReferenceIndicator: 0,
      },
    ];

    const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/flow-to-load-references`;
    const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/flow-to-load-references`;
    const putUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/flow-to-load-references/${idRegex}`
    );

    const rataTestNumberUrl =
      "https://api.epa.gov/easey/dev/qa-certification-mgmt/locations/locId/test-summary?testTypeCodes=RATA&systemTypeCodes=FLOW";
    const rataTestNumberWorkspaceUrl =
      "https://api.epa.gov/easey/dev/qa-certification-mgmt/workspace/locations/locId/test-summary?testTypeCodes=RATA&systemTypeCodes=FLOW";

    mock.onGet(getUrl).reply(200, flowToLoadReferenceData);
    mock.onPost(postUrl).reply(200, "created");
    mock.onPut(putUrl).reply(200, "updated");

    mock.onGet(rataTestNumberUrl).reply(200, []);
    mock.onGet(rataTestNumberWorkspaceUrl).reply(200, []);

    const props = qaFlowToLoadReferenceProps();
    const idArray = [
      locId,
      testSumId,
      rataId,
      rataSumId,
      rataRunId,
      flowRataRunId,
      id,
    ];
    const data = { locationId: locId, id: testSumId };
    renderComponent(props, idArray, data);

    // renders rows
    // const rows = await screen.findAllByRole("row");
    // expect(mock.history.get.length).not.toBe(0);
    // expect(rows).toHaveLength(flowToLoadReferenceData.length);

    // add row
    // const addBtn = screen.getByRole("button", { name: /Add/i });
    // userEvent.click(addBtn);
    // let saveAndCloseBtn = screen.getByRole("button", {
    //   name: /Click to save/i,
    // });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);

    // edit row
    // const editBtns = screen.getAllByTestId(/Edit/i);
    // expect(editBtns).toHaveLength(flowToLoadReferenceData.length);
    // userEvent.click(editBtns[0]);
    // saveAndCloseBtn = screen.getByRole("button", { name: /Click to save/i });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.put.length).toBe(1), 1000);

    // remove row
    // const deleteBtns = screen.getAllByTestId(/Remove/i);
    // expect(deleteBtns).toHaveLength(flowToLoadReferenceData.length);
    // const secondDeleteBtn = deleteBtns[1];
    // userEvent.click(secondDeleteBtn);
    // const confirmBtns = screen.getAllByRole("button", { name: /Yes/i });
    // userEvent.click(confirmBtns[1]);
  });

  test("renders Unit default test data rows and add functionality", async () => {
    const unitDefaultTestData = [
      {
        id: "id1",
        testSumId: "testSumId1",
        fuelCode: "string",
        noxDefaultRate: 0,
        operatingConditionCode: "string",
        groupID: "string",
        numberOfUnitsInGroup: 0,
        numberOfTestsForGroup: 0,
      },
      {
        id: "id2",
        testSumId: "testSumId2",
        fuelCode: "string2",
        noxDefaultRate: 2,
        operatingConditionCode: "string2",
        groupID: "string2",
        numberOfUnitsInGroup: 2,
        numberOfTestsForGroup: 2,
      },
    ];

    const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/unit-default-tests`;
    const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/unit-default-tests`;
    //const putUrl = new RegExp(`${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/flow-to-load-references/${idRegex}`);

    const fuelCodesURl =
      "https://api.epa.gov/easey/dev/master-data-mgmt/fuel-codes";
    const operatingCondCodesUrl =
      "https://api.epa.gov/easey/dev/master-data-mgmt/operating-condition-codes";

    mock.onGet(getUrl).reply(200, unitDefaultTestData);
    mock.onPost(postUrl).reply(200, "created");
    //mock.onPut(putUrl).reply(200, 'updated')

    mock.onGet(fuelCodesURl).reply(200, []);
    mock.onGet(operatingCondCodesUrl).reply(200, []);

    const props = qaUnitDefaultTestDataProps();
    const idArray = [locId, testSumId];
    const data = { locationId: locId, id: testSumId };
    renderComponent(props, idArray, data);

    // renders rows
    // const rows = await screen.findAllByRole("row");
    // expect(mock.history.get.length).not.toBe(0);
    // expect(rows).toHaveLength(unitDefaultTestData.length)
    // expect(rows).toHaveLength(6);
  });

  test("renders Unit default test run rows and create/save/delete", async () => {
    const unitDefaultTestRun = [
      {
        id: "1",
        unitDefaultTestSumId: "efa0789c-8731-4255-a48a-767f3b3ddfea",
        operatingLevelForRun: 1,
        runNumber: 2,
        beginDate: "2022-12-05",
        beginHour: 12,
        beginMinute: 15,
        endDate: "2022-12-21",
        endHour: 2,
        endMinute: 12,
        responseTime: 3,
        referenceValue: 4,
        runUsedIndicator: 0,
        userId: "agebremichael-dp",
        addDate: "1/6/2023, 3:42:55 PM",
        updateDate: "1/6/2023, 3:42:55 PM",
      },
      {
        id: "2",
        unitDefaultTestSumId: "efa0789c-8731-4255-a48a-767f3b3ddfea",
        operatingLevelForRun: 1,
        runNumber: 2,
        beginDate: "2022-12-05",
        beginHour: 12,
        beginMinute: 15,
        endDate: "2022-12-21",
        endHour: 2,
        endMinute: 12,
        responseTime: 3,
        referenceValue: 4,
        runUsedIndicator: 0,
        userId: "agebremichael-dp",
        addDate: "1/6/2023, 3:42:55 PM",
        updateDate: "1/6/2023, 3:42:55 PM",
      },
    ];

    const getUrl = new RegExp(
      `${qaCertBaseUrl}/locations/${idRegex}/test-summary/${idRegex}/unit-default-tests/${idRegex}/unit-default-test-runs`
    );
    const postUrl = new RegExp(
      `${qaCertBaseUrl}/locations/${idRegex}/test-summary/${idRegex}/unit-default-tests/${idRegex}/unit-default-test-runs`
    );
    // const putUrl = new RegExp(`${qaCertBaseUrl}/locations/${idRegex}/test-summary/${idRegex}/unit-default-tests/${idRegex}/hg-injections/${idRegex}`);
    // const deleteUrl = new RegExp(`${qaCertBaseUrl}/locations/${idRegex}/test-summary/${idRegex}/unit-default-tests/${idRegex}/hg-injections/${idRegex}`);

    mock.onGet(getUrl).reply(200, unitDefaultTestRun);
    mock.onPost(postUrl).reply(200, "created");
    // mock.onPut(putUrl).reply(200, 'updated')
    // mock.onDelete(deleteUrl).reply(200, 'deleted')

    const props = qaUnitDefaultTestRunDataProps();
    const idArray = [locId, testSumId];
    const data = { locationId: locId, id: appECorrTestSumId };
    renderComponent(props, idArray, data);

    // renders rows
    // const rows = await screen.findAllByRole("row");
    // expect(mock.history.get.length).not.toBe(0);
    // expect(rows).toHaveLength(unitDefaultTestRun.length);

    // add row
    // const addBtn = screen.getByRole("button", { name: /Add/i });
    // userEvent.click(addBtn);
    // let saveAndCloseBtn = screen.getByRole("button", {
    //   name: /Click to save/i,
    // });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);
    // edit row
    // const editBtns = screen.getAllByTestId(/Edit/i);
    // expect(editBtns).toHaveLength(unitDefaultTestRun.length);
    // userEvent.click(editBtns[0]);
    // saveAndCloseBtn = screen.getByRole("button", { name: /Click to save/i });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.put.length).toBe(1), 1000);
  });

  test("renders Hg Summary data rows and create/save/delete", async () => {
    const hgSummaryData = [
      {
        id: "id1",
        testSumId: "testSumId1",
        gasLevelCode: "Mid",
        meanMeasuredValue: 1,
        meanReferenceValue: 1,
        percentError: 1,
        apsIndicator: 1,
      },
      {
        id: "id2",
        testSumId: "testSumId2",
        gasLevelCode: "High",
        meanMeasuredValue: 2,
        meanReferenceValue: 2,
        percentError: 2,
        apsIndicator: 2,
      },
    ];

    const getUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/hg-summaries`;
    const postUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/hg-summaries`;
    const putUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/hg-summaries/${idRegex}`
    );
    const deleteUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/hg-summaries/${idRegex}`
    );

    const gasLevelCodesURl =
      "https://api.epa.gov/easey/dev/master-data-mgmt/gas-level-codes";
    mock.onGet(gasLevelCodesURl).reply(200, []);

    mock.onGet(getUrl).reply(200, hgSummaryData);
    mock.onPost(postUrl).reply(200, "created");
    mock.onPut(putUrl).reply(200, "updated");
    mock.onDelete(deleteUrl).reply(200, "deleted");

    const props = qaHgSummaryDataProps();
    const idArray = [locId, testSumId];
    const data = { locationId: locId, id: testSumId };
    renderComponent(props, idArray, data);

    // renders rows
    // const rows = await screen.findAllByRole("row");
    // expect(mock.history.get.length).not.toBe(0);
    // expect(rows).toHaveLength(hgSummaryData.length);

    // add row
    // const addBtn = screen.getByRole("button", { name: /Add/i });
    // userEvent.click(addBtn);
    // let saveAndCloseBtn = screen.getByRole("button", {
    //   name: /Click to save/i,
    // });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);

    // edit row
    // const editBtns = screen.getAllByTestId(/Edit/i);
    // expect(editBtns).toHaveLength(hgSummaryData.length);
    // userEvent.click(editBtns[0]);
    // saveAndCloseBtn = screen.getByRole("button", { name: /Click to save/i });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.put.length).toBe(1), 1000);
    //
    // const deleteBtns = screen.getAllByTestId(/Remove/i);
    // expect(deleteBtns).toHaveLength(hgSummaryData.length);
    // const secondDeleteBtn = deleteBtns[1];
    // userEvent.click(secondDeleteBtn);
    // const confirmBtns = screen.getAllByRole("button", { name: /Yes/i });
    // userEvent.click(confirmBtns[1]);
  });

  test("renders Hg Injection rows and create/save/delete", async () => {
    const hgInjectionData = [
      {
        id: "id1",
        hgTestSumId: "hgTestSumId1",
        userId: "userId1",
        addDate: "string",
        updateDate: "string",
        injectionDate: "2023-01-05T19:30:16.230Z",
        injectionHour: 1,
        injectionMinute: 2,
        measuredValue: 3,
        referenceValue: 4,
      },
      {
        id: "id2",
        hgTestSumId: "hgTestSumId2",
        userId: "userId2",
        addDate: "string",
        updateDate: "string",
        injectionDate: "2023-01-05T19:30:16.230Z",
        injectionHour: 9,
        injectionMinute: 8,
        measuredValue: 7,
        referenceValue: 6,
      },
    ];

    const getUrl = new RegExp(
      `${qaCertBaseUrl}/locations/${idRegex}/test-summary/${idRegex}/hg-summaries/${idRegex}/hg-injections`
    );
    const postUrl = new RegExp(
      `${qaCertBaseUrl}/locations/${idRegex}/test-summary/${idRegex}/hg-summaries/${idRegex}/hg-injections`
    );
    const putUrl = new RegExp(
      `${qaCertBaseUrl}/locations/${idRegex}/test-summary/${idRegex}/hg-summaries/${idRegex}/hg-injections/${idRegex}`
    );
    const deleteUrl = new RegExp(
      `${qaCertBaseUrl}/locations/${idRegex}/test-summary/${idRegex}/hg-summaries/${idRegex}/hg-injections/${idRegex}`
    );

    mock.onGet(getUrl).reply(200, hgInjectionData);
    mock.onPost(postUrl).reply(200, "created");
    mock.onPut(putUrl).reply(200, "updated");
    mock.onDelete(deleteUrl).reply(200, "deleted");

    const props = qaHgInjectionDataProps();
    const idArray = [locId, testSumId];
    const data = { locationId: locId, id: appECorrTestSumId };
    renderComponent(props, idArray, data);

    // renders rows
    // const rows = await screen.findAllByRole("row");
    // expect(mock.history.get.length).not.toBe(0);
    // expect(rows).toHaveLength(hgInjectionData.length);

    // add row
    // const addBtn = screen.getByRole("button", { name: /Add/i });
    // userEvent.click(addBtn);
    // let saveAndCloseBtn = screen.getByRole("button", {
    //   name: /Click to save/i,
    // });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);

    // edit row
    // const editBtns = screen.getAllByTestId(/Edit/i);
    // expect(editBtns).toHaveLength(hgInjectionData.length);
    // userEvent.click(editBtns[0]);
    // saveAndCloseBtn = screen.getByRole("button", { name: /Click to save/i });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.put.length).toBe(1), 1000);

    // remove row
    // const deleteBtns = screen.getAllByTestId(/Remove/i);
    // expect(deleteBtns).toHaveLength(hgInjectionData.length);
    // const secondDeleteBtn = deleteBtns[1];
    // userEvent.click(secondDeleteBtn);
    // const confirmBtns = screen.getAllByRole("button", { name: /Yes/i });
    // userEvent.click(confirmBtns[1]);
  });

  test("renders Appendix E Correlation Heat Input from Oil rows and create/save/delete", async () => {
    const appECorrHeatInputOilData = [
      {
        id: "id1",
        appECorrTestRunId: "appECorrTestRunId1",
        calculatedOilMass: 0,
        calculatedOilHeatInput: 0,
        userId: "string",
        addDate: "string",
        updateDate: "string",
        monitoringSystemID: "string",
        oilMass: 0,
        oilGCV: 0,
        oilGCVUnitsOfMeasureCode: "string",
        oilHeatInput: 0,
        oilVolume: 0,
        oilVolumeUnitsOfMeasureCode: "string",
        oilDensity: 0,
        oilDensityUnitsOfMeasureCode: "string",
      },
      {
        id: "id2",
        appECorrTestRunId: "appECorrTestRunId2",
        calculatedOilMass: 0,
        calculatedOilHeatInput: 0,
        userId: "string",
        addDate: "string",
        updateDate: "string",
        monitoringSystemID: "string",
        oilMass: 0,
        oilGCV: 0,
        oilGCVUnitsOfMeasureCode: "string",
        oilHeatInput: 0,
        oilVolume: 0,
        oilVolumeUnitsOfMeasureCode: "string",
        oilDensity: 0,
        oilDensityUnitsOfMeasureCode: "string",
      },
    ];

    const getUrl = new RegExp(
      `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${idRegex}/appendix-e-correlation-test-runs/${idRegex}/appendix-e-heat-input-from-oils`
    );
    const postUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${idRegex}/appendix-e-correlation-test-runs/${idRegex}/appendix-e-heat-input-from-oils`
    );
    const putUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${idRegex}/appendix-e-correlation-test-runs/${idRegex}/appendix-e-heat-input-from-oils/${idRegex}`
    );
    const deleteUrl = new RegExp(
      `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${idRegex}/appendix-e-correlation-test-runs/${idRegex}/appendix-e-heat-input-from-oils/${idRegex}`
    );

    mock.onGet(getUrl).reply(200, appECorrHeatInputOilData);
    mock.onPost(postUrl).reply(200, "created");
    mock.onPut(putUrl).reply(200, "updated");
    mock.onDelete(deleteUrl).reply(200, "deleted");

    const props = qaAppendixECorrelationSummaryHeatInputOilProps();
    const idArray = [locId, testSumId];
    const data = { locationId: locId, id: appECorrTestSumId };
    renderComponent(props, idArray, data);

    // renders rows
    // const rows = await screen.findAllByRole("row");
    // expect(mock.history.get.length).not.toBe(0);
    // expect(rows).toHaveLength(appECorrHeatInputOilData.length);

    // add row
    // const addBtn = screen.getByRole("button", { name: /Add/i });
    // userEvent.click(addBtn);
    // let saveAndCloseBtn = screen.getByRole("button", {
    //   name: /Click to save/i,
    // });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);

    // edit row
    // const editBtns = screen.getAllByTestId(/Edit/i);
    // expect(editBtns).toHaveLength(appECorrHeatInputOilData.length);
    // userEvent.click(editBtns[0]);
    // saveAndCloseBtn = screen.getByRole("button", { name: /Click to save/i });
    // userEvent.click(saveAndCloseBtn);
    // setTimeout(() => expect(mock.history.put.length).toBe(1), 1000);

    // remove row
    // const deleteBtns = screen.getAllByTestId(/Remove/i);
    // expect(deleteBtns).toHaveLength(appECorrHeatInputOilData.length);
    // const secondDeleteBtn = deleteBtns[1];
    // userEvent.click(secondDeleteBtn);
    // const confirmBtns = screen.getAllByRole("button", { name: /Yes/i });
    // userEvent.click(confirmBtns[1]);
  });
});
