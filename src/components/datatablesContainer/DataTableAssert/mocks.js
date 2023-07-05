import { getMockMonitoringSpans } from "../../../mocks/functions";

export const getDataTableAssertProps = () => {
  return {
    mdmData: {
      testCode: [],
    },
    loadDropdownsData: jest.fn(),

    locationSelectValue: "6", //before
    user: "testuser",
    checkout: false,

    inactive: false,
    settingInactiveCheckBox: jest.fn(), //before
    revertedState: false,
    setRevertedState: jest.fn(), //before
    pagination: false,
    filter: false,
    // tabs comes from redux initial state
    tabs: [ // before
      {
        openedFacilityTabs: [],
        inactive: [true],
      },
    ],
    currentTabIndex: 0, // before

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

    setUpdateRelatedTables: jest.fn(), //before

    updateRelatedTables: false,
  };
}

export const getMockBothActiveAndInactiveRecords = () => {
  const records = getMockMonitoringSpans()
  records[0].active = false
  return records
}

export const getMockOnlyInactiveRecords = () => {
  const records = getMockMonitoringSpans();
  const onlyInactive = records.map(span => {
    span.active = false
    return span
  })
  return onlyInactive
}

export const getMockMonitoringPlansUnitControlRecords = () => {
  const records = [
    {
      controlCode: "SNCR",
      originalCode: "0",
      installDate: "2005-01-01",
      optimizationDate: "2006-06-01",
      seasonalControlsIndicator: "0",
      retireDate: null,
      id: "1",
      unitId: 734,
      userId: "abcde",
      addDate: "2009-02-20",
      updateDate: "2009-02-20",
      active: true,
      parameterCode: "string"
    },
    {
      controlCode: "SNCR",
      originalCode: "0",
      installDate: "2005-01-01",
      optimizationDate: "2006-06-01",
      seasonalControlsIndicator: "0",
      retireDate: null,
      id: "2",
      unitId: 734,
      userId: "abcde",
      addDate: "2009-02-20",
      updateDate: "2009-02-20",
      active: true,
      parameterCode: "string"
    }
  ]
  return [...records]
}

export const getMockMonitoringPlansFuelDataRecords = () => {
  const records = [
    {
      fuelCode: "C",
      indicatorCode: "P",
      ozoneSeasonIndicator: 0,
      demGCV: "GGC",
      demSO2: "SGC",
      beginDate: "1995-01-01",
      endDate: "2015-03-30",
      id: "EXPCH0876-C97319A3E96540BF92077C58DB9E2A17",
      unitId: 91233,
      actualOrProjectCode: "",
      sulfurContent: "",
      userId: "abcde",
      addDate: "2009-02-20",
      updateDate: "2015-04-16",
      active: true
    },
    {
      fuelCode: "C",
      indicatorCode: "P",
      ozoneSeasonIndicator: 0,
      demGCV: "GGC",
      demSO2: "SGC",
      beginDate: "1995-01-01",
      endDate: "2015-03-30",
      id: "2",
      unitId: 91233,
      actualOrProjectCode: "",
      sulfurContent: "",
      userId: "abcde",
      addDate: "2009-02-20",
      updateDate: "2015-04-16",
      active: true
    }
  ]
  return [...records]
}

export const getMockUnitCapacity = () => {
  const records = [
    {
      maximumHourlyHeatInputCapacity: 2322.1,
      beginDate: "2009-01-01",
      endDate: null,
      id: "1",
      unitId: 4705,
      commercialOperationDate: "1977-04-01",
      date: "2019-01-01",
      userId: "abcde",
      addDate: "2009-02-20",
      updateDate: "2009-02-20",
      active: true,
      boilerTurbineType: "string"
    },
    {
      maximumHourlyHeatInputCapacity: 2322.1,
      beginDate: "2009-01-01",
      endDate: null,
      id: "2",
      unitId: 4705,
      commercialOperationDate: "1977-04-01",
      date: "2019-01-01",
      userId: "abcde",
      addDate: "2009-02-20",
      updateDate: "2009-02-20",
      active: true,
      boilerTurbineType: "string"
    },
  ]
  return [...records]
}

export const getMockLocationAttributes = () => {
  const records = [
    {
      ductIndicator: 1,
      bypassIndicator: 1,
      groundElevation: 40,
      stackHeight: 400,
      materialCode: "OTHER",
      shapeCode: "ROUND",
      crossAreaFlow: 306,
      crossAreaStackExit: 306,
      beginDate: "2008-01-01",
      endDate: null,
      id: "MELISSAMAT-E496678DE19E4827ADE4D541B18B5756",
      locationId: "5770",
      userId: "abcde",
      addDate: "2009-02-20",
      updateDate: "2009-02-20",
      active: true
    },
    {
      ductIndicator: 1,
      bypassIndicator: 1,
      groundElevation: 40,
      stackHeight: 400,
      materialCode: "OTHER",
      shapeCode: "ROUND",
      crossAreaFlow: 306,
      crossAreaStackExit: 306,
      beginDate: "2008-01-01",
      endDate: null,
      id: "MELISSAMAT-E496678DE19E4827ADE4D541B18B5756",
      locationId: "5770",
      userId: "abcde",
      addDate: "2009-02-20",
      updateDate: "2009-02-20",
      active: true
    },
  ]
  return [...records]
}
