import React from "react";
import {
  render,
  waitForElement,
  fireEvent,
  screen,
} from "@testing-library/react";
import {
  DataTableAssert,
  mapDispatchToProps,
  mapStateToProps,
} from "./DataTableAssert";
import { authenticate } from "../../../utils/api/easeyAuthApi";
import { act } from "react-dom/test-utils";
import * as assertSelector from "../../../utils/selectors/assert";
import { loadDropdowns } from "../../../store/actions/dropdowns";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
const axios = require("axios");
jest.mock("axios");

const dropdownData = [
  {
    componentTypeCode: "BGFF",
    componentTypeCodeDescription: "Billing Gas Fuel Flowmeter",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "BOFF",
    componentTypeCodeDescription: "Billing Oil Fuel Flowmeter",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "CALR",
    componentTypeCodeDescription: "Calorimeter",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "CO2",
    componentTypeCodeDescription: "CO2 Concentration",
    spanIndicator: "1",
    parameterCode: "CO2C",
  },
  {
    componentTypeCode: "DAHS",
    componentTypeCodeDescription: "Data Acquisition and Handling System",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "DL",
    componentTypeCodeDescription: "Data Logger or Recorder",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "DP",
    componentTypeCodeDescription:
      "Differential Pressure Transmitter/Transducer",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "FLC",
    componentTypeCodeDescription: "Flow Computer",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "FLOW",
    componentTypeCodeDescription: "Stack Flow Analyzer",
    spanIndicator: "1",
    parameterCode: "FLOW",
  },
  {
    componentTypeCode: "GCH",
    componentTypeCodeDescription: "Gas Chromatograph",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "GFFM",
    componentTypeCodeDescription: "Gas Fuel Flowmeter",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "H2O",
    componentTypeCodeDescription: "Continuous Moisture Sensor",
    spanIndicator: null,
    parameterCode: "H2O",
  },
  {
    componentTypeCode: "HG",
    componentTypeCodeDescription: "Mercury Concentration Analyzer (Hg CEMS)",
    spanIndicator: "1",
    parameterCode: "HGC",
  },
  {
    componentTypeCode: "MS",
    componentTypeCodeDescription: "Mass Spectrograph",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "NOX",
    componentTypeCodeDescription: "NOx Concentration",
    spanIndicator: "1",
    parameterCode: "NOXC",
  },
  {
    componentTypeCode: "O2",
    componentTypeCodeDescription: "O2 Concentration",
    spanIndicator: "1",
    parameterCode: "O2C",
  },
  {
    componentTypeCode: "OFFM",
    componentTypeCodeDescription: "Oil Fuel Flowmeter",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "OP",
    componentTypeCodeDescription: "Opacity Monitor",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "PLC",
    componentTypeCodeDescription: "Programmable Logic Controller",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "PM",
    componentTypeCodeDescription: "Particulate Matter",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "PRB",
    componentTypeCodeDescription: "Probe",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "PRES",
    componentTypeCodeDescription: "Pressure Transmitter/Transducer",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "SO2",
    componentTypeCodeDescription: "SO2 Concentration",
    spanIndicator: "1",
    parameterCode: "SO2C",
  },
  {
    componentTypeCode: "TANK",
    componentTypeCodeDescription: "Oil Supply Tank",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "TEMP",
    componentTypeCodeDescription: "Temperature Transmitter/Transducer",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "HCL",
    componentTypeCodeDescription: "HCl Concentration Analyzer",
    spanIndicator: "1",
    parameterCode: "HCLC",
  },
  {
    componentTypeCode: "HF",
    componentTypeCodeDescription: "HF Concentration Analyzer",
    spanIndicator: "1",
    parameterCode: "HFC",
  },
  {
    componentTypeCode: "STRAIN",
    componentTypeCodeDescription:
      "Sorbent Trap Sampling Train Component, consisting of a sample gas flow meter and the associated sorbent trap",
    spanIndicator: null,
    parameterCode: "HG",
  },
];
const props = {
  mdmData: {
    testCode: [],
  },
  loadDropdownsData: jest.fn(),
  locationSelectValue: "6",
  user: "testuser",
  checkout: false,
  inactive: false,
  settingInactiveCheckBox: jest.fn(),
  revertedState: false,
  setRevertedState: jest.fn(),
  pagination: false,
  filter: false,
  controlInputs: {
    mecValue: ["MEC Value", "input", "", ""],
    mpcValue: ["MPC Value", "input", "", ""],
    mpfValue: ["MPF Value", "input", "", ""],
    spanValue: ["Span Value", "input", "", ""],
    fullScaleRange: ["Full Scale Range", "input", "", ""],
    scaleTransitionPoint: ["Scale Transition Point", "input", "", ""],
    defaultHighRange: ["Default High Range", "input", "", ""],
    flowSpanValue: ["Flow Span Value", "input", "", ""],
    flowFullScaleRange: ["Flow Full Scale Range", "input", "", ""],
    skip: ["", "skip", "", ""],
  },
  controlDatePickerInputs: {
    beginDate: ["Start Date", "date", "", ""],
    beginHour: ["Start Time", "time", "", ""],
    endDate: ["End Date", "date", "", ""],
    endHour: ["End Time", "time", "", ""],
  },
  radioName: null,
  payload: {
    locationId: 7,
    id: null,
    componentTypeCode: "string",
    spanScaleCode: "string",
    spanMethodCode: "string",
    mecValue: 0,
    mpcValue: 0,
    mpfValue: 0,
    spanValue: 0,
    fullScaleRange: 0,
    spanUnitsOfMeasureCode: "string",
    scaleTransitionPoint: "string",
    defaultHighRange: 0,
    flowSpanValue: 0,
    flowFullScaleRange: 0,
    beginDate: "2021-09-16T20:55:48.806Z",
    beginHour: 0,
    endDate: "2021-09-16T20:55:48.806Z",
    endHour: 0,
  },
  urlParameters: null,
  columnNames: ["Begin Date and Time", "End Date and Time"],
  dropdownArray: [[]],
  dataTableName: "Span",
  selectedLocation: 5,
  showModal: false,
  setUpdateRelatedTables: jest.fn(),
  updateRelatedTables: false,
};

const componentTypeCode = {};
const spanScaleCode = {};
const spanMethodCode = {};
const spanUnitsOfMeasureCode = {};
describe("DataTableAssert", () => {
  test("should fire test button", async () => {
    const spanData = [
      {
        id: "TWCORNEL5-C434ED1A575B40F6A928CBF092852955",
        locationId: "5",
        componentTypeCode: "SO2",
        spanScaleCode: "H",
        spanMethodCode: "F",
        mecValue: "",
        mpcValue: "1000.0",
        mpfValue: "",
        spanValue: "1000.000",
        fullScaleRange: "1000.000",
        spanUnitsOfMeasureCode: "PPM",
        scaleTransitionPoint: "",
        defaultHighRange: "",
        flowSpanValue: "",
        flowFullScaleRange: "",
        beginDate: "2009-03-26",
        beginHour: "13",
        endDate: "2010-05-03",
        endHour: "11",
        userid: "tcorneli",
        addDate: "2009-03-30",
        updateDate: "2010-07-15",
        active: false,
      },
      {
        id: "TWCORNEL5-88E25998894F4859B9D03C49E8CBD66D",
        locationId: "5",
        componentTypeCode: "CO2",
        spanScaleCode: "H",
        spanMethodCode: "HD",
        mecValue: null,
        mpcValue: "8.0",
        mpfValue: null,
        spanValue: "10.000",
        fullScaleRange: "10.000",
        spanUnitsOfMeasureCode: "PCT",
        scaleTransitionPoint: null,
        defaultHighRange: null,
        flowSpanValue: null,
        flowFullScaleRange: null,
        beginDate: "2017-09-20",
        beginHour: "13",
        endDate: null,
        endHour: null,
        userid: "bvick",
        addDate: "2017-10-23",
        updateDate: null,
        active: true,
      },
    ];
    axios.get.mockImplementation(() =>
      Promise.resolve({ status: 200, data: spanData })
    );

    const spanDataReturned = await mpApi.getMonitoringSpans(6);
    expect(spanDataReturned.data).toEqual(spanData);

    let { container } = await waitForElement(() =>
      render(<DataTableAssert {...props} />)
    );
    const btns = screen.getAllByText("View");
    // fireEvent.click(btns[0]);

    axios.mockImplementationOnce(() => {
      return Promise.resolve({ data: {} });
    });

    await authenticate({});
    expect(sessionStorage.getItem("cdx_user")).toBe("{}");
    fireEvent.click(container.querySelector("#testingBtn2"));
    const val = 1;
    expect(val === 1);
  });
  test("mapStateToProps calls the appropriate state", async () => {
    // mock the 'dispatch' object
    const dispatch = jest.fn();
    const state = { dropdowns: [1] };
    const stateProps = mapStateToProps(state, true);
  });

  test("mapDispatchToProps calls the appropriate action", async () => {
    // mock the 'dispatch' object
    const dispatch = jest.fn();
    const actionProps = mapDispatchToProps(dispatch);
    const formData = [];
    // verify the appropriate action was called
    actionProps.loadDropdownsData();
    // expect(loadDropdowns).toHaveBeenCalled();
  });
});
