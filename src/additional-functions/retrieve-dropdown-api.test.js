import { useRetrieveDropdownApi } from "./retrieve-dropdown-api";
import React from "react";
import * as dmApi from "../utils/api/dataManagementApi";
const axios = require("axios");
jest.mock("axios");

afterAll(() => {
  jest.restoreAllMocks();
});

const data = {};
test("tests parameterCode", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const dataReturned = await dmApi.getAllParameterCodes();
  expect(dataReturned.data).toEqual(data);

  let func = useRetrieveDropdownApi(["parameterCode"]);
  expect(func).toEqual(data);
});

test("tests systemFuelFlowUOMCode", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const dataReturned = await dmApi.getAllUnitsOfMeasureCodes();
  expect(dataReturned.data).toEqual(data);
  let func = useRetrieveDropdownApi(["systemFuelFlowUOMCode"]);
  expect(func).toEqual(data);
});

test("tests maximumFuelFlowRateSourceCode", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);
  const dataReturned = await dmApi.getAllMaxRateSourceCodes();
  expect(dataReturned.data).toEqual(data);
  let func = useRetrieveDropdownApi(["maximumFuelFlowRateSourceCode"]);
  expect(func).toEqual(data);
});
test("tests analyzerRangeCode", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);
  const dataReturned = await dmApi.getAllRangeCodes();
  expect(dataReturned.data).toEqual(data);
  let func = useRetrieveDropdownApi(["analyzerRangeCode"]);
  expect(func).toEqual(data);
});
test("tests substituteDataCode", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);
  const dataReturned = await dmApi.getAllSubstituteDataCodes();
  expect(dataReturned.data).toEqual(data);
  let func = useRetrieveDropdownApi(["substituteDataCode"]);

  expect(func).toEqual(data);
});
test("tests bypassApproachCode", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);
  const dataReturned = await dmApi.getAllBypassApproachCodes();
  expect(dataReturned.data).toEqual(data);
  let func = useRetrieveDropdownApi(["bypassApproachCode"]);
  expect(func).toEqual(data);
});

test("tests mats getAllMatsParameterCodes", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);
  const dataReturned = await dmApi.getAllMatsParameterCodes();
  expect(dataReturned.data).toEqual(data);
  let func = useRetrieveDropdownApi(["parameterCode"], true);
  expect(func).toEqual(data);
});
test("tests mats getAllMatsMethodCodes", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);
  const dataReturned = await dmApi.getAllMatsMethodCodes();
  expect(dataReturned.data).toEqual(data);
  let func = useRetrieveDropdownApi(["monitoringMethodCode"], true);
  expect(func).toEqual(data);
});

test("tests  empty ", () => {
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);
  let func = useRetrieveDropdownApi([""]);
  expect(func).toEqual(data);
});

test("tests getAllFormulaCodes", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const dataReturned = await dmApi.getAllFormulaCodes();
  expect(dataReturned.data).toEqual(data);

  let func = useRetrieveDropdownApi(["formulaCode"]);
  expect(func).toEqual(data);
});

test("tests getAllFuelCodes", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const dataReturned = await dmApi.getAllFuelCodes();
  expect(dataReturned.data).toEqual(data);

  let func = useRetrieveDropdownApi(["fuelCode"]);
  expect(func).toEqual(data);
});

test("tests getAllFuelTypes", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const dataReturned = await dmApi.getAllFuelTypes();
  expect(dataReturned.data).toEqual(data);

  let func = useRetrieveDropdownApi(["fuelType"]);
  expect(func).toEqual(data);
});

test("tests getAllFuelIndicatorCodes", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const dataReturned = await dmApi.getAllFuelIndicatorCodes();
  expect(dataReturned.data).toEqual(data);

  let func = useRetrieveDropdownApi(["fuelIndicatorCode"]);
  expect(func).toEqual(data);
});

test("tests getAllDemonstrationMethodCodes", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const dataReturned = await dmApi.getAllDemonstrationMethodCodes();
  expect(dataReturned.data).toEqual(data);

  let func = useRetrieveDropdownApi(["demMethodCode"]);
  expect(func).toEqual(data);
});

test("tests getAllQualificationTypeCodes", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const dataReturned = await dmApi.getAllQualificationTypeCodes();
  expect(dataReturned.data).toEqual(data);

  let func = useRetrieveDropdownApi(["qualificationTypeCode"]);
  expect(func).toEqual(data);
});
