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
import { unsavedDataMessage } from "../../../additional-functions/prompt-to-save-unsaved-changes";

import { authenticate } from "../../../utils/api/easeyAuthApi";
import { act } from "react-dom/test-utils";
import * as assertSelector from "../../../utils/selectors/assert";
import { loadDropdowns } from "../../../store/actions/dropdowns";
import {
  getMonitoringSpans,
  getLocationAttributes,
} from "../../../utils/api/monitoringPlansApi";
import * as auth from "../../../utils/api/easeyAuthApi";

// UseRetrieveDropdownApi()
jest.mock("../../../additional-functions/retrieve-dropdown-api", () => ({
  ...jest.requireActual("../../../additional-functions/retrieve-dropdown-api"),
  useRetrieveDropdownApi: jest.fn().mockResolvedValue({}),
}));

jest.mock("../../../utils/api/monitoringPlansApi", () => ({
  getMonitoringSpans: jest.fn(),
  getMonitoringSystems: jest.fn(),
  getLocationAttributes: jest.fn(),
  saveSystems: jest.fn(),
  createSystems: jest.fn(),
  saveAnalyzerRanges: jest.fn(),
  createAnalyzerRanges: jest.fn(),
  saveSystemsFuelFlows: jest.fn(),
  createSystemsFuelFlows: jest.fn(),
  createSystemsComponents: jest.fn(),
  saveSystemsComponents: jest.fn(),
}));
jest.mock("", () => ({
  getDataTableApis: jest.fn(),
  getDataTableRecords: jest.fn(),
  saveDataSwitch: jest.fn(),
  createDataSwitch: jest.fn(),
}));
jest.mock("../../../utils/api/easeyAuthApi", () => ({
  authenticate: jest.fn(),
}));
const dropdownData = [
  {
    componentTypeCode: "BGFF",
    componentTypeDescription: "Billing Gas Fuel Flowmeter",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "BOFF",
    componentTypeDescription: "Billing Oil Fuel Flowmeter",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "CALR",
    componentTypeDescription: "Calorimeter",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "CO2",
    componentTypeDescription: "CO2 Concentration",
    spanIndicator: "1",
    parameterCode: "CO2C",
  },
  {
    componentTypeCode: "DAHS",
    componentTypeDescription: "Data Acquisition and Handling System",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "DL",
    componentTypeDescription: "Data Logger or Recorder",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "DP",
    componentTypeDescription: "Differential Pressure Transmitter/Transducer",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "FLC",
    componentTypeDescription: "Flow Computer",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "FLOW",
    componentTypeDescription: "Stack Flow Analyzer",
    spanIndicator: "1",
    parameterCode: "FLOW",
  },
  {
    componentTypeCode: "GCH",
    componentTypeDescription: "Gas Chromatograph",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "GFFM",
    componentTypeDescription: "Gas Fuel Flowmeter",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "H2O",
    componentTypeDescription: "Continuous Moisture Sensor",
    spanIndicator: null,
    parameterCode: "H2O",
  },
  {
    componentTypeCode: "HG",
    componentTypeDescription: "Mercury Concentration Analyzer (Hg CEMS)",
    spanIndicator: "1",
    parameterCode: "HGC",
  },
  {
    componentTypeCode: "MS",
    componentTypeDescription: "Mass Spectrograph",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "NOX",
    componentTypeDescription: "NOx Concentration",
    spanIndicator: "1",
    parameterCode: "NOXC",
  },
  {
    componentTypeCode: "O2",
    componentTypeDescription: "O2 Concentration",
    spanIndicator: "1",
    parameterCode: "O2C",
  },
  {
    componentTypeCode: "OFFM",
    componentTypeDescription: "Oil Fuel Flowmeter",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "OP",
    componentTypeDescription: "Opacity Monitor",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "PLC",
    componentTypeDescription: "Programmable Logic Controller",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "PM",
    componentTypeDescription: "Particulate Matter",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "PRB",
    componentTypeDescription: "Probe",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "PRES",
    componentTypeDescription: "Pressure Transmitter/Transducer",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "SO2",
    componentTypeDescription: "SO2 Concentration",
    spanIndicator: "1",
    parameterCode: "SO2C",
  },
  {
    componentTypeCode: "TANK",
    componentTypeDescription: "Oil Supply Tank",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "TEMP",
    componentTypeDescription: "Temperature Transmitter/Transducer",
    spanIndicator: null,
    parameterCode: null,
  },
  {
    componentTypeCode: "HCL",
    componentTypeDescription: "HCl Concentration Analyzer",
    spanIndicator: "1",
    parameterCode: "HCLC",
  },
  {
    componentTypeCode: "HF",
    componentTypeDescription: "HF Concentration Analyzer",
    spanIndicator: "1",
    parameterCode: "HFC",
  },
  {
    componentTypeCode: "STRAIN",
    componentTypeDescription:
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
  tabs: [
    {
      openedFacilityTabs: [],
      inactive: [true],
    },
  ],
  currentTabIndex: 0,
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
    beginHour: ["Start Time", "hourDropdown", "", ""],
    endDate: ["End Date", "date", "", ""],
    endHour: ["End Time", "hourDropdown", "", ""],
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
  columnNames: ["Begin Date/Time", "End Date/Time"],
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

const conditionalProps = {
  mdmData: {
    testCode: [{ code: "test", name: "empty" }], // different
  },
  loadDropdownsData: jest.fn(),
  locationSelectValue: "6",
  user: "testuser",
  checkout: false,
  inactive: false,
  settingInactiveCheckBox: jest.fn(),
  revertedState: false,
  showModal: true,
  setRevertedState: jest.fn(),
  pagination: false,
  filter: false,
  tabs: [
    {
      openedFacilityTabs: [],
      inactive: [true],
    },
  ],
  currentTabIndex: 0,
  controlInputs: {
    skip: ["", "skip", "", ""],
  },
  controlDatePickerInputs: {
    beginDate: ["Start Date", "date", "", ""],
  },
  radioName: ["test"], // different
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
  columnNames: ["Begin Date/Time", "End Date/Time"],
  dropdownArray: [[]],
  dataTableName: "Location Attribute", // different
  selectedLocation: 5,
  showModal: false,
  setUpdateRelatedTables: jest.fn(),
  updateRelatedTables: false,
};
describe("DataTableAssert", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  //   test("run without error", () => {
  //     // expect(true);
  //     render(<DataTableAssert {...props} />)
  // });

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

    const mockGetMonitoringSpans = jest
      .fn()
      .mockResolvedValue({ data: spanData });
    getMonitoringSpans.mockImplementation(() => mockGetMonitoringSpans());

    const spanDataReturned = await getMonitoringSpans(6);
    expect(spanDataReturned.data).toEqual(spanData);

    let { container } = await waitForElement(() =>
      render(<DataTableAssert {...props} />)
    );
    const btns = screen.getAllByText("View");
    authenticate.mockImplementation(() =>
      localStorage.setItem("ecmps_user", JSON.stringify({}))
    );
    await authenticate({});
    expect(localStorage.getItem("ecmps_user")).toBe("{}");
    window.isDataChanged = true;
    window.confirm(unsavedDataMessage);
    fireEvent.click(container.querySelector("#testingBtn2"));
    window.isDataChanged = false;
    fireEvent.click(container.querySelector("#testingBtn2"));
    // const val = 1;
    // expect(val === 1);
  });

  /*
  test("conditional rendering of datatable asserts", async () => {
    const locationAttrData = [
      {
        id: "MDC-B8C0FC059D434C1FB0878FF68505C406",
        locationId: "5",
        ductIndicator: 1,
        bypassIndicator: null,
        groundElevation: 21,
        stackHeight: 600,
        materialCode: "OTHER",
        shapeCode: "RECT",
        crossAreaFlow: 600,
        crossAreaStackExit: 517,
        beginDate: "1995-01-01",
        endDate: null,
        userId: "elachut",
        addDate: "2009-02-20",
        updateDate: "2009-03-23",
        active: true,
      },
    ];

    const mockGetLocationAttributes = jest.fn().mockResolvedValue({data: locationAttrData})
    getLocationAttributes.mockImplementation(() => mockGetLocationAttributes())
    const locationAttrDataReturned = await getLocationAttributes(5);
    expect(locationAttrDataReturned.data).toEqual(locationAttrData);

    let { container } = await waitForElement(() =>
      render(<DataTableAssert {...conditionalProps} />)
    );
    const btns = screen.queryAllByText("View");
    // fireEvent.click(btns[0]);
    authenticate.mockImplementation(()=>localStorage.setItem("ecmps_user", JSON.stringify({})));
    await authenticate({});
    expect(localStorage.getItem("ecmps_user")).toBe("{}");

    const val = 1;
    expect(val === 1);
  });
  test("mapStateToProps calls the appropriate state", async () => {
    // mock the 'dispatch' object
    const dispatch = jest.fn();
    const state = { dropdowns: [1], openedFacilityTabs: ["monitoringPlans"] };
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

*/
});
