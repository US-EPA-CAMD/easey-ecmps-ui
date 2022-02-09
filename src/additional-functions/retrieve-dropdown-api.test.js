import { UseRetrieveDropdownApi } from "./retrieve-dropdown-api";
import React from "react";
import * as dmApi from "../utils/api/dataManagementApi";
import axios from "axios";
jest.mock("axios");

afterAll(() => {
  jest.restoreAllMocks();
});

test("tests parameterCode for non-MATS", async () => {
  const expectedApiResponse = {
    status: 201,
    data: [{ parameterCode: "", parameterCodeDescription: "" }],
  };
  const expectedDropdownOptions = {
    parameterCode: [
      { code: "", name: "-- Select a value --" },
      { code: "", name: "" },
    ],
  };
  axios.get.mockImplementation(() => Promise.resolve(expectedApiResponse));
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const apiResponse = await dmApi.getAllParameterCodes();
  expect(apiResponse.data).toEqual(expectedApiResponse.data);

  UseRetrieveDropdownApi(["parameterCode"], false).then((dropdownOptions) => {
    expect(dropdownOptions).toEqual(expectedDropdownOptions);
  });
});

test("tests parameterCode for MATS", async () => {
  const expectedApiResponse = {
    status: 201,
    data: [{ matsMethodParamCode: "", matsMethodParamCodeDescription: "" }],
  };
  const expectedDropdownOptions = {
    supplementalMATSParameterCode: [
      { code: "", name: "-- Select a value --" },
      { code: "", name: "" },
    ],
  };
  axios.get.mockImplementation(() => Promise.resolve(expectedApiResponse));
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const apiResponse = await dmApi.getAllMatsParameterCodes();
  expect(apiResponse.data).toEqual(expectedApiResponse.data);

  UseRetrieveDropdownApi(["parameterCode"], true).then((dropdownOptions) => {
    expect(dropdownOptions).toEqual(expectedDropdownOptions);
  });
});

test("tests controlEquipParamCode", async () => {
  const expectedApiResponse = {
    status: 201,
    data: [{ controlEquipParamCode: "", controlEquipParamDescription: "" }],
  };
  const expectedDropdownOptions = {
    parameterCode: [
      { code: "", name: "-- Select a value --" },
      { code: "", name: "" },
    ],
  };
  axios.get.mockImplementation(() => Promise.resolve(expectedApiResponse));
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const apiResponse = await dmApi.getAllControlEquipmentParameterCodes();
  expect(apiResponse.data).toEqual(expectedApiResponse.data);

  UseRetrieveDropdownApi(["controlEquipParamCode"]).then((dropdownOptions) => {
    expect(dropdownOptions).toEqual(expectedDropdownOptions);
  });
});

test("tests monitoringMethodCode for non-MATS", async () => {
  const expectedApiResponse = {
    status: 201,
    data: [{ matsMethodCode: "", matsMethodCodeDescription: "" }],
  };
  const expectedDropdownOptions = {
    supplementalMATSMonitoringMethodCode: [
      { code: "", name: "-- Select a value --" },
      { code: "", name: "" },
    ],
  };
  axios.get.mockImplementation(() => Promise.resolve(expectedApiResponse));
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const apiResponse = await dmApi.getAllMethodCodes();
  expect(apiResponse.data).toEqual(expectedApiResponse.data);

  UseRetrieveDropdownApi(["monitoringMethodCode"], true).then(
    (dropdownOptions) => {
      expect(dropdownOptions).toEqual(expectedDropdownOptions);
    }
  );
});

test("tests monitoringMethodCode for MATS", async () => {
  const expectedApiResponse = {
    status: 201,
    data: [{ matsMethodCode: "", matsMethodCodeDescription: "" }],
  };
  const expectedDropdownOptions = {
    supplementalMATSMonitoringMethodCode: [
      { code: "", name: "-- Select a value --" },
      { code: "", name: "" },
    ],
  };
  axios.get.mockImplementation(() => Promise.resolve(expectedApiResponse));
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const apiResponse = await dmApi.getAllMatsMethodCodes();
  expect(apiResponse.data).toEqual(expectedApiResponse.data);

  UseRetrieveDropdownApi(["monitoringMethodCode"], true).then(
    (dropdownOptions) => {
      expect(dropdownOptions).toEqual(expectedDropdownOptions);
    }
  );
});

test("tests substituteDataCode", async () => {
  const expectedApiResponse = {
    status: 201,
    data: [{ subDataCode: "", subDataCodeDescription: "" }],
  };
  const expectedDropdownOptions = {
    substituteDataCode: [
      { code: "", name: "-- Select a value --" },
      { code: "", name: "" },
    ],
  };
  axios.get.mockImplementation(() => Promise.resolve(expectedApiResponse));
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const apiResponse = await dmApi.getAllSubstituteDataCodes();
  expect(apiResponse.data).toEqual(expectedApiResponse.data);

  UseRetrieveDropdownApi(["substituteDataCode"]).then((dropdownOptions) => {
    expect(dropdownOptions).toEqual(expectedDropdownOptions);
  });
});

test("tests bypassApproachCode", async () => {
  const expectedApiResponse = {
    status: 201,
    data: [{ bypassApproachCode: "", bypassApproachCodeDescription: "" }],
  };
  const expectedDropdownOptions = {
    bypassApproachCode: [
      { code: "", name: "-- Select a value --" },
      { code: "", name: "" },
    ],
  };
  axios.get.mockImplementation(() => Promise.resolve(expectedApiResponse));
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const apiResponse = await dmApi.getAllBypassApproachCodes();
  expect(apiResponse.data).toEqual(expectedApiResponse.data);

  UseRetrieveDropdownApi(["bypassApproachCode"]).then((dropdownOptions) => {
    expect(dropdownOptions).toEqual(expectedDropdownOptions);
  });
});

test("tests analyzerRangeCode", async () => {
  const expectedApiResponse = {
    status: 201,
    data: [{ analyzerRangeCode: "", analyzerRangeCodeDescription: "" }],
  };
  const expectedDropdownOptions = {
    analyzerRangeCode: [
      { code: "", name: "-- Select a value --" },
      { code: "", name: "" },
    ],
  };
  axios.get.mockImplementation(() => Promise.resolve(expectedApiResponse));
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const apiResponse = await dmApi.getAllRangeCodes();
  expect(apiResponse.data).toEqual(expectedApiResponse.data);

  UseRetrieveDropdownApi(["analyzerRangeCode"]).then((dropdownOptions) => {
    expect(dropdownOptions).toEqual(expectedDropdownOptions);
  });
});

test("tests maximumFuelFlowRateSourceCode", async () => {
  const expectedApiResponse = {
    status: 201,
    data: [{ maxRateSourceCode: "", maxRateSourceCodeDescription: "" }],
  };
  const expectedDropdownOptions = {
    maximumFuelFlowRateSourceCode: [
      { code: "", name: "-- Select a value --" },
      { code: "", name: "" },
    ],
  };
  axios.get.mockImplementation(() => Promise.resolve(expectedApiResponse));
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const apiResponse = await dmApi.getAllMaxRateSourceCodes();
  expect(apiResponse.data).toEqual(expectedApiResponse.data);

  UseRetrieveDropdownApi(["maximumFuelFlowRateSourceCode"]).then(
    (dropdownOptions) => {
      expect(dropdownOptions).toEqual(expectedDropdownOptions);
    }
  );
});

test("tests defaultUnitsOfMeasureCode", async () => {
  const expectedApiResponse = {
    status: 201,
    data: [{ unitsOfMeasureCode: "", unitsOfMeasureCodeDescription: "" }],
  };
  const expectedDropdownOptions = {
    defaultUnitsOfMeasureCode: [
      { code: "", name: "-- Select a value --" },
      { code: "", name: "" },
    ],
  };
  axios.get.mockImplementation(() => Promise.resolve(expectedApiResponse));
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const apiResponse = await dmApi.getAllUnitsOfMeasureCodes();
  expect(apiResponse.data).toEqual(expectedApiResponse.data);

  UseRetrieveDropdownApi(["defaultUnitsOfMeasureCode"]).then(
    (dropdownOptions) => {
      expect(dropdownOptions).toEqual(expectedDropdownOptions);
    }
  );
});

test("tests spanUnitsOfMeasureCode", async () => {
  const expectedApiResponse = {
    status: 201,
    data: [{ unitsOfMeasureCode: "", unitsOfMeasureCodeDescription: "" }],
  };
  const expectedDropdownOptions = {
    spanUnitsOfMeasureCode: [
      { code: "", name: "-- Select a value --" },
      { code: "", name: "" },
    ],
  };
  axios.get.mockImplementation(() => Promise.resolve(expectedApiResponse));
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const apiResponse = await dmApi.getAllUnitsOfMeasureCodes();
  expect(apiResponse.data).toEqual(expectedApiResponse.data);

  UseRetrieveDropdownApi(["spanUnitsOfMeasureCode"]).then((dropdownOptions) => {
    expect(dropdownOptions).toEqual(expectedDropdownOptions);
  });
});

test("tests maximumLoadUnitsOfMeasureCode", async () => {
  const expectedApiResponse = {
    status: 201,
    data: [{ unitsOfMeasureCode: "", unitsOfMeasureCodeDescription: "" }],
  };
  const expectedDropdownOptions = {
    maximumLoadUnitsOfMeasureCode: [
      { code: "", name: "-- Select a value --" },
      { code: "", name: "" },
    ],
  };
  axios.get.mockImplementation(() => Promise.resolve(expectedApiResponse));
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const apiResponse = await dmApi.getAllUnitsOfMeasureCodes();
  expect(apiResponse.data).toEqual(expectedApiResponse.data);

  UseRetrieveDropdownApi(["maximumLoadUnitsOfMeasureCode"]).then(
    (dropdownOptions) => {
      expect(dropdownOptions).toEqual(expectedDropdownOptions);
    }
  );
});

test("tests systemFuelFlowUOMCode", async () => {
  const expectedApiResponse = {
    status: 201,
    data: [{ unitsOfMeasureCode: "", unitsOfMeasureCodeDescription: "" }],
  };
  const expectedDropdownOptions = {
    systemFuelFlowUOMCode: [
      { code: "", name: "-- Select a value --" },
      { code: "", name: "" },
    ],
  };
  axios.get.mockImplementation(() => Promise.resolve(expectedApiResponse));
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const apiResponse = await dmApi.getAllUnitsOfMeasureCodes();
  expect(apiResponse.data).toEqual(expectedApiResponse.data);

  UseRetrieveDropdownApi(["systemFuelFlowUOMCode"]).then((dropdownOptions) => {
    expect(dropdownOptions).toEqual(expectedDropdownOptions);
  });
});

test("tests unitsOfStandard", async () => {
  const expectedApiResponse = {
    status: 201,
    data: [{ unitsOfMeasureCode: "", unitsOfMeasureCodeDescription: "" }],
  };
  const expectedDropdownOptions = {
    unitsOfStandard: [
      { code: "", name: "-- Select a value --" },
      { code: "", name: "" },
    ],
  };
  axios.get.mockImplementation(() => Promise.resolve(expectedApiResponse));
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const apiResponse = await dmApi.getAllUnitsOfMeasureCodes();
  expect(apiResponse.data).toEqual(expectedApiResponse.data);

  UseRetrieveDropdownApi(["unitsOfStandard"]).then((dropdownOptions) => {
    expect(dropdownOptions).toEqual(expectedDropdownOptions);
  });
});

test("tests fuelType", async () => {
  const expectedApiResponse = {
    status: 201,
    data: [{ fuelTypeCode: "", fuelTypeDescription: "" }],
  };
  const expectedDropdownOptions = {
    fuelCode: [
      { code: "", name: "-- Select a value --" },
      { code: "", name: "" },
    ],
  };
  axios.get.mockImplementation(() => Promise.resolve(expectedApiResponse));
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const apiResponse = await dmApi.getAllFuelTypes();
  expect(apiResponse.data).toEqual(expectedApiResponse.data);

  UseRetrieveDropdownApi(["fuelType"]).then((dropdownOptions) => {
    expect(dropdownOptions).toEqual(expectedDropdownOptions);
  });
});

test("tests fuelCode", async () => {
  const expectedApiResponse = {
    status: 201,
    data: [{ fuelCode: "", fuelCodeDescription: "" }],
  };
  const expectedDropdownOptions = {
    fuelCode: [
      { code: "", name: "-- Select a value --" },
      { code: "", name: "" },
    ],
  };
  axios.get.mockImplementation(() => Promise.resolve(expectedApiResponse));
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const apiResponse = await dmApi.getAllFuelCodes();
  expect(apiResponse.data).toEqual(expectedApiResponse.data);

  UseRetrieveDropdownApi(["fuelCode"]).then((dropdownOptions) => {
    expect(dropdownOptions).toEqual(expectedDropdownOptions);
  });
});

test("tests indicatorCode", async () => {
  const expectedApiResponse = {
    status: 201,
    data: [{ fuelIndicatorCode: "", fuelIndicatorCodeDescription: "" }],
  };
  const expectedDropdownOptions = {
    indicatorCode: [
      { code: "", name: "-- Select a value --" },
      { code: "", name: "" },
    ],
  };
  axios.get.mockImplementation(() => Promise.resolve(expectedApiResponse));
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const apiResponse = await dmApi.getAllFuelIndicatorCodes();
  expect(apiResponse.data).toEqual(expectedApiResponse.data);

  UseRetrieveDropdownApi(["indicatorCode"]).then((dropdownOptions) => {
    expect(dropdownOptions).toEqual(expectedDropdownOptions);
  });
});

test("tests demGCV", async () => {
  const expectedApiResponse = {
    status: 201,
    data: [{ demMethodCode: "", demMethodCodeDescription: "" }],
  };
  const expectedDropdownOptions = {
    demGCV: [
      { code: "", name: "-- Select a value --" },
      { code: "", name: "" },
    ],
  };
  axios.get.mockImplementation(() => Promise.resolve(expectedApiResponse));
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const apiResponse = await dmApi.getAllDemonstrationMethodCodes();
  expect(apiResponse.data).toEqual(expectedApiResponse.data);

  UseRetrieveDropdownApi(["demGCV"]).then((dropdownOptions) => {
    expect(dropdownOptions).toEqual(expectedDropdownOptions);
  });
});

test("tests demSO2", async () => {
  const expectedApiResponse = {
    status: 201,
    data: [{ demMethodCode: "", demMethodCodeDescription: "" }],
  };
  const expectedDropdownOptions = {
    demSO2: [
      { code: "", name: "-- Select a value --" },
      { code: "", name: "" },
    ],
  };
  axios.get.mockImplementation(() => Promise.resolve(expectedApiResponse));
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const apiResponse = await dmApi.getAllDemonstrationMethodCodes();
  expect(apiResponse.data).toEqual(expectedApiResponse.data);

  UseRetrieveDropdownApi(["demSO2"]).then((dropdownOptions) => {
    expect(dropdownOptions).toEqual(expectedDropdownOptions);
  });
});
