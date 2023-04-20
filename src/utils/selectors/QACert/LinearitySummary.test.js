import * as fs from "./LinearitySummary";

describe("testing getLinearitySummary data selectors", () => {
  let selectedData;
  let tableRecords;

  test("getQAColsByTestCode", () => {
    const APPESUMCols = [
      "Test Type Code",
      "Unit or Stack Pipe ID",
      "Monitoring System ID",
      "Test Number",
      "Test Reason Code",
      "End Date/Time",
      // "End Hour",
      // "End Minute",
    ];

    expect(fs.getQAColsByTestCode("APPESUM")).toEqual(APPESUMCols);

    const CALINJCols = [
      "Test Type Code",
      "Unit or Stack Pipe ID",
      "Component ID",
      "Test Number",
      "Test Reason Code",
      "Test Result Code",
      "End Date/Time",
      // "End Hour",
      // "End Minute",
    ];

    expect(fs.getQAColsByTestCode("CALINJ")).toEqual(CALINJCols);
    expect(fs.getQAColsByTestCode("CYCSUM")).toEqual(CALINJCols);
    expect(fs.getQAColsByTestCode("FFACC")).toEqual(CALINJCols);
    expect(fs.getQAColsByTestCode("HGL3LS")).toEqual(CALINJCols);
    expect(fs.getQAColsByTestCode("LINSUM")).toEqual(CALINJCols);
    expect(fs.getQAColsByTestCode("PEI")).toEqual(CALINJCols);
    expect(fs.getQAColsByTestCode("TTACC")).toEqual(CALINJCols);

    const FLCCols = [
      "Test Type Code",
      "Unit or Stack Pipe ID",
      "Monitoring System ID",
      "Test Number",
      "Test Reason Code",
      "Test Result Code",
      "Year",
      "Quarter",
    ];

    expect(fs.getQAColsByTestCode("FLC")).toEqual(FLCCols);
    expect(fs.getQAColsByTestCode("FFL")).toEqual(FLCCols);

    const FLRCols = [
      "Test Type Code",
      "Unit or Stack Pipe ID",
      "Monitoring System ID",
      "Test Number",
      "End Date/Time",
      // "End Hour",
      // "End Minute",
    ];

    expect(fs.getQAColsByTestCode("FLR")).toEqual(FLRCols);

    const FFLBCols = [
      "Test Type Code",
      "Unit or Stack Pipe ID",
      "Monitoring System ID",
      "Test Number",
      "End Date/Time",
      //"End Hour",
    ];

    expect(fs.getQAColsByTestCode("FFLB")).toEqual(FFLBCols);

    const OLOLCALCols = [
      "Test Type Code",
      "Unit or Stack Pipe ID",
      "Component ID",
      "Test Number",
      "Test Reason Code",
      "Test Result Code",
      "End Date/Time",
      //"End Hour",
    ];

    expect(fs.getQAColsByTestCode("OLOLCAL")).toEqual(OLOLCALCols);

    const RELACCCols = [
      "Test Type Code",
      "Unit or Stack Pipe ID",
      "Monitoring System ID",
      "Test Number",
      "Test Reason Code",
      "Test Result Code",
      "End Date/Time",
      // "End Hour",
      // "End Minute",
    ];

    expect(fs.getQAColsByTestCode("RELACC")).toEqual(RELACCCols);

    const LMECols = [
      "Test Type Code",
      "Unit or Stack Pipe ID",
      "Test Number",
      "Test Reason Code",
      "End Date/Time",
      // "End Hour",
      // "End Minute",
    ];

    expect(fs.getQAColsByTestCode("LME")).toEqual(LMECols);

    const MISC = [
      "Test Type Code",
      "Unit or Stack Pipe ID",
      "Monitoring System ID",
      "Component ID",
      "Test Number",
      "Test Reason Code",
      "Test Result Code",
      "End Date/Time",
      // "End Hour",
      // "End Minute",
    ];

    expect(fs.getQAColsByTestCode("MISC")).toEqual(MISC);

    const empty = [
      "Test Type Code",
      "Unit or Stack Pipe ID",
      "Component ID",
      "Test Number",
      "Test Reason Code",
      "Test Result Code",
      "End Date/Time",
      // "End Hour",
      // "End Minute",
    ];
    expect(fs.getQAColsByTestCode(" ")).toEqual(empty);
  });

  test("getQAModalDetailsByTestCode", () => {
    // const unitId = ["Unit or Stack Pipe ID", "nonFilteredDropdown", "", ""]
    const testTypeCode = ["Test Type Code", "mainDropdown", "mainDropdown", ""];
    const monitoringSystemID = ["Monitoring System ID", "nonFilteredDropdown", "", ""];
    const componentID = ["Component ID", "nonFilteredDropdown", "", ""];
    const spanScaleCode = ["Span Scale Code", "nonFilteredDropdown", "", ""];
    const testNumber = ["Test Number", "input", "", ""];
    const testReasonCode = ["Test Reason Code", "dropdown", "", ""];
    const testResultCode = ["Test Result Code", "dropdown", "", ""];
    // const gasLevelCode = ["Gas Level Code Code", "nonFilteredDropdown", "", ""]
    const testDescription = ["Test Description", "input", "", ""];
    const gracePeriodIndicator = ["Grace Period Indicator", "radio", "", ""];
    const injectionProtocolCode = [
      "Injection Protocol Code",
      "nonFilteredDropdown",
      "",
      "",
    ];
    const unitId = [
      "Unit or Stack Pipe ID",
      "input",
      "",
      "",
    ];
    // extra control inputs
    const testComment = ["Test Comment", "input", "", ""];

    // control date picker inputs
    const beginDate = ["Begin Date", "date", "", ""];
    const beginHour = ["Begin Hour", "hourDropdown", "dropdown", ""];
    const beginMinute = ["Begin Minute", "minuteDropdown", "dropdown", ""];
    const endDate = ["End Date", "date", "", ""];
    const endHour = ["End Hour", "hourDropdown", "dropdown", ""];
    const endMinute = ["End Minute", "minuteDropdown", "dropdown", ""];

    const year = ["Year", "input", "", ""];
    const quarter = ["Quarter", "input", "", ""];

    let modalDetails = {
      controlInputs: {
        testTypeCode,
        monitoringSystemID,
        componentID,
        spanScaleCode,
        testNumber,
        testReasonCode,
        testResultCode,
      },
      extraControlInputs: {
        gracePeriodIndicator,
        testComment,
      },
      controlDatePickerInputs: {
        beginDate,
        beginHour,
        beginMinute,
        endDate,
        endHour,
        endMinute,
      },
    };

    expect(fs.getQAModalDetailsByTestCode("APPESUM", { unitId: 1 })).toEqual({
      controlInputs: {
        unitId,
        testTypeCode,
        monitoringSystemID,
        testNumber,
        testReasonCode,
      },
      extraControlInputs: {
        testComment,
      },
      controlDatePickerInputs: {
        beginDate,
        beginHour,
        beginMinute,
        endDate,
        endHour,
        endMinute,
      },
    });

    const CALINJCols = {
      controlInputs: {
        testTypeCode,
        componentID,
        spanScaleCode,
        testNumber,
        testReasonCode,
        testResultCode,unitId
      },
      extraControlInputs: {
        //injectionProtocolCode,
        testComment,
      },
      controlDatePickerInputs: {
        beginDate,
        beginHour,
        beginMinute,
        endDate,
        endHour,
        endMinute,
      },
    };

    expect(fs.getQAModalDetailsByTestCode("CALINJ", { unitId: 1 })).toEqual(
      CALINJCols
    );
    expect(fs.getQAModalDetailsByTestCode("CYCSUM", { unitId: 1 })).toEqual(
      CALINJCols
    );

    const FFACC = {
        controlInputs: {
          testTypeCode,
          componentID,
          testNumber,
          testReasonCode,
          testResultCode,unitId
        },
        extraControlInputs: {
          testComment
        },
        controlDatePickerInputs: {
          endDate,
          endHour,
          endMinute
        }
      }
    expect(fs.getQAModalDetailsByTestCode("FFACC", { unitId: 1 })).toEqual(
        FFACC
    );

    const HGL3LS ={
        controlInputs: {
          testTypeCode,
          componentID,
          spanScaleCode,
          testNumber,
          testReasonCode,
          testResultCode,unitId
        },
        extraControlInputs: {
          gracePeriodIndicator,
          testComment
        },
        controlDatePickerInputs: {
          beginDate,
          beginHour,
          beginMinute,
          endDate,
          endHour,
          endMinute
        }
      }

    expect(fs.getQAModalDetailsByTestCode("HGL3LS", { unitId: 1 })).toEqual(
        HGL3LS
    );
    expect(fs.getQAModalDetailsByTestCode("LINSUM", { unitId: 1 })).toEqual(
        HGL3LS
    );

    const PEI = {
        controlInputs: {
          testTypeCode,
          componentID,
          testNumber,
          testReasonCode,
          testResultCode,
          testDescription,unitId
        },
        extraControlInputs: {
          gracePeriodIndicator,
          testComment
        },
        controlDatePickerInputs: {
          endDate,
          endHour,
          endMinute
        }
      }

    expect(fs.getQAModalDetailsByTestCode("PEI", { unitId: 1 })).toEqual(
        PEI
    );

    const TTACC =  {
        controlInputs: {
          testTypeCode,
          componentID,
          testNumber,
          testReasonCode,
          testResultCode,unitId
        },
        extraControlInputs: {
          testComment
        },
        controlDatePickerInputs: {
          endDate,
          endHour,
          endMinute
        }
      }
    expect(fs.getQAModalDetailsByTestCode("TTACC", { unitId: 1 })).toEqual(
        TTACC
    );

    const FLCCols = {
        controlInputs: {
          testTypeCode,
          monitoringSystemID,
          testNumber,
          testReasonCode,
          testResultCode,
          year,
          quarter,unitId
        },
        extraControlInputs: {
          testComment
        },
      }

    expect(fs.getQAModalDetailsByTestCode("FLC", { unitId: 1 })).toEqual(
      FLCCols
    );
    expect(fs.getQAModalDetailsByTestCode("FFL", { unitId: 1 })).toEqual(
      FLCCols
    );

    const FLRCols = {
      controlInputs: {
        testTypeCode,
        monitoringSystemID,
        testNumber,unitId
      },
      extraControlInputs: {
        testComment,
      },
      controlDatePickerInputs: {
        endDate,
        endHour,
        endMinute,
      },
    };

    expect(fs.getQAModalDetailsByTestCode("FLR", { unitId: 1 })).toEqual(
      FLRCols
    );

    const FFLBCols = {
      controlInputs: {
        testTypeCode,
        monitoringSystemID,
        testNumber,unitId
      },
      extraControlInputs: {
        testComment,
      },
      controlDatePickerInputs: {
        beginDate,
        beginHour,
        endDate,
        endHour,
      },
    };

    expect(fs.getQAModalDetailsByTestCode("FFLB", { unitId: 1 })).toEqual(
      FFLBCols
    );

    const OLOLCALCols = {
      controlInputs: {
        testTypeCode,
        componentID,
        spanScaleCode,
        testNumber,
        testReasonCode,
        testResultCode,unitId
      },
      extraControlInputs: {
        testComment,
      },
      controlDatePickerInputs: {
        beginDate,
        beginHour,
        endDate,
        endHour,
      },
    };

    expect(fs.getQAModalDetailsByTestCode("OLOLCAL", { unitId: 1 })).toEqual(
      OLOLCALCols
    );

    const RELACCCols = {
      controlInputs: {
        testTypeCode,
        monitoringSystemID,
        testNumber,
        testReasonCode,
        testResultCode,unitId
      },
      extraControlInputs: {
        gracePeriodIndicator,
        testComment,
      },
      controlDatePickerInputs: {
        beginDate,
        beginHour,
        beginMinute,
        endDate,
        endHour,
        endMinute,
      },
    };

    expect(fs.getQAModalDetailsByTestCode("RELACC", { unitId: 1 })).toEqual(
      RELACCCols
    );

    const LMECols = {
      controlInputs: {
        testTypeCode,
        testNumber,
        testReasonCode,unitId
      },
      extraControlInputs: {
        testComment,
      },
      controlDatePickerInputs: {
        beginDate,
        beginHour,
        beginMinute,
        endDate,
        endHour,
        endMinute,
      },
    };

    expect(fs.getQAModalDetailsByTestCode("LME", { unitId: 1 })).toEqual(
      LMECols
    );

    const MISC = {
      controlInputs: {
        testTypeCode,
        monitoringSystemID,
        componentID,
        testNumber,
        testReasonCode,
        testResultCode,
        testDescription,unitId
      },
      extraControlInputs: {
        gracePeriodIndicator,
        testComment,
      },
      controlDatePickerInputs: {
        endDate,
        endHour,
        endMinute,
      },
    };

    expect(fs.getQAModalDetailsByTestCode("MISC", { unitId: 1 })).toEqual(MISC);

    const empty = {
        controlInputs: {
          testTypeCode,
          monitoringSystemID,
          componentID,
          spanScaleCode,
          testNumber,
          testReasonCode,
          testResultCode,
        },
        extraControlInputs: {
          gracePeriodIndicator,
          testComment
        },
        controlDatePickerInputs: {
          beginDate,
          beginHour,
          beginMinute,
          endDate,
          endHour,
          endMinute
        }
      }
    expect(fs.getQAModalDetailsByTestCode(" ", { unitId: 1 })).toEqual(empty);
  });
});
