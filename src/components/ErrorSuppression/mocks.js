export const esRecords = {
    data: [
        {
            id: 1031,
            checkCatalogResultId: 3540,
            checkTypeCode: "QUAL",
            checkNumber: 23,
            checkResultCode: "D",
            severityCode: "NONE",
            facilityId: 8331,
            orisCode: 2271,
            locations: "1A,1B",
            matchDataTypeCode: "QUALTYP",
            matchDataValue: "abc",
            matchTimeTypeCode: "HISTIND",
            matchTimeBeginValue: "",
            matchTimeEndValue: null,
            matchHistoricalIndicator: false,
            reasonCode: "BUG",
            note: "This error suppression is to allow newly affected TR LME units to submit their MP data. BZ 10246  cjw 10-25-2011.",
            active: false,
            userId: "WorleyC",
            addDate: "2011-01-25T11:26:32.000Z",
            updateDate: "2011-12-21T15:15:06.000Z",
        },
        {
            id: 1033,
            checkCatalogResultId: 3540,
            checkTypeCode: "QUAL",
            checkNumber: 23,
            checkResultCode: "D",
            severityCode: "NONE",
            facilityId: 262,
            orisCode: 1305,
            locations: "GT1,GT2,GT3",
            matchDataTypeCode: "QUALTYP",
            matchDataValue: null,
            matchTimeTypeCode: "QUARTER",
            matchTimeBeginValue: "2011-03-25T11:26:32.000Z",
            matchTimeEndValue: "2011-11-25T11:26:32.000Z",
            matchHistoricalIndicator: false,
            reasonCode: "BUG",
            note: "This error suppression is to allow newly affected TR LME units to submit their MP data. BZ 10246  cjw 10-25-2011.",
            active: false,
            userId: "WorleyC",
            addDate: "2011-01-25T11:46:37.000Z",
            updateDate: "2011-12-21T15:15:40.000Z",
        },
        {
            id: 1034,
            checkCatalogResultId: 3540,
            checkTypeCode: "QUAL",
            checkNumber: 23,
            checkResultCode: "D",
            severityCode: "NONE",
            facilityId: 262,
            orisCode: 1305,
            locations: "GT1,GT2,GT3",
            matchDataTypeCode: "QUALTYP",
            matchDataValue: null,
            matchTimeTypeCode: "DATE",
            matchTimeBeginValue: "2011-10-25T11:26:32.000Z",
            matchTimeEndValue: "2011-11-25T11:26:32.000Z",
            matchHistoricalIndicator: false,
            reasonCode: "BUG",
            note: "This error suppression is to allow newly affected TR LME units to submit their MP data. BZ 10246  cjw 10-25-2011.",
            active: false,
            userId: "WorleyC",
            addDate: "2011-01-25T11:46:37.000Z",
            updateDate: "2011-12-21T15:15:40.000Z",
        },
        {
            id: 1035,
            checkCatalogResultId: 3540,
            checkTypeCode: "QUAL",
            checkNumber: 23,
            checkResultCode: "D",
            severityCode: "NONE",
            facilityId: 262,
            orisCode: 1305,
            locations: "GT1,GT2,GT3",
            matchDataTypeCode: "QUALTYP",
            matchDataValue: null,
            matchTimeTypeCode: "HOUR",
            matchTimeBeginValue: "2011-10-25T11:26:32.000Z",
            matchTimeEndValue: "2011-11-25T11:26:32.000Z",
            matchHistoricalIndicator: false,
            reasonCode: "BUG",
            note: "This error suppression is to allow newly affected TR LME units to submit their MP data. BZ 10246  cjw 10-25-2011.",
            active: false,
            userId: "WorleyC",
            addDate: "2011-01-25T11:46:37.000Z",
            updateDate: "2011-12-21T15:15:40.000Z",
        },
    ]
};

export const esContext = {
    checkType: 1,
    checkNumber: 2,
    checkResult: 3,
}

export const esConfigurations = {
    data: [
        {
            id: "MDC-DSF87364AD9879A8FDS7G",
            name: "1, 2, CS0AAN",
            locations: [
                {
                    id: "BZ5461",
                    name: "1",
                    type: "Unit",
                    unitId: "1",
                },
                {
                    id: "CZ5461",
                    name: "2",
                    type: "Unit",
                    unitId: "2",
                },
                {
                    id: "DA5461",
                    name: "CS0AAN",
                    type: "StackPipe",
                    stackPipeId: "CS0AAN",
                },
            ],
        },
    ]
}

export const checkCatalogRecords = {
    data: [
        {
            id: "5003",
            checkTypeCode: "ADESTAT",
            checkTypeDescription: "Appendix D and E Status",
            checkNumber: "6",
            checkResult: "Accuracy Test Not Yet Evaluated",
            locationTypeCode: "LOC",
            timeTypeCode: "HOUR",
            dataTypeCode: "FUELTYP",
            dataTypeLabel: "Fuel Type",
            dataTypeUrl: "/master-data-mgmt/fuel-type-codes",
        },
    ]
}

export const esFacilities = {
    data: [
        {
            facilityRecordId: 1,
            facilityId: 3,
            facilityName: "Barry",
            stateCode: "AL",
        },
    ]
}

export const esReasonCodes = {
    data: [
        {
            errorSuppressionReasonCode: "BUG",
            errorSuppressionReasonDescription: "Application Bug",
        },
    ]
}
