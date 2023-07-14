

const mockPCTQualifications = [
  {
    qualificationYear: 2020,
    averagePercentValue: 100,
    yr1QualificationDataYear: 2018,
    yr1QualificationDataTypeCode: "A",
    yr1PercentageValue: 100,
    yr2QualificationDataYear: 2019,
    yr2QualificationDataTypeCode: "A",
    yr2PercentageValue: 100,
    yr3QualificationDataYear: 2020,
    yr3QualificationDataTypeCode: "A",
    yr3PercentageValue: 100,
    id: "02227-BSGR-56EB0D4D400642A4860D6402698BBE16",
    qualificationId: "02022-614W-608B84AEDB8148C7B3935EE935AB835F",
    userId: "abcde",
    addDate: "2021-04-01",
    updateDate: "2021-04-01"
  }
]

export const getMockDataTablePCTQualMdmData = () => {
  return {
    qualificationYear: [
      {
        code: "",
        name: "-- Select a value --"
      },
      {
        code: "2000",
        name: "2000"
      },
    ],
    yr1QualificationDataYear: [
      {
        code: "",
        name: "-- Select a value --"
      },
      {
        code: "2000",
        name: "2000"
      },
    ],
    yr2QualificationDataYear: [
      {
        code: "",
        name: "-- Select a value --"
      },
      {
        code: "2000",
        name: "2000"
      },
    ],
    yr3QualificationDataYear: [
      {
        code: "",
        name: "-- Select a value --"
      },
      {
        code: "2000",
        name: "2000"
      },
    ],
    yr1QualificationDataTypeCode: [
      {
        code: "",
        name: "-- Select a value --"
      },
      {
        code: "A",
        name: "Actual"
      },
    ],
    yr2QualificationDataTypeCode: [
      {
        code: "",
        name: "-- Select a value --"
      },
      {
        code: "A",
        name: "Actual"
      },
    ],
    yr3QualificationDataTypeCode: [
      {
        code: "",
        name: "-- Select a value --"
      },
      {
        code: "A",
        name: "Actual"
      },
      {
        code: "D",
        name: "Demonstration"
      },
      {
        code: "P",
        name: "Projected"
      }
    ]
  }
}

export const getMockDataTablePCTQualificationsProps = () => {
  return {
    loadDropdownsData: jest.fn(),
    locationSelectValue: "60",
    qualSelectValue: "60",
    user: "testUser",
    checkout: true,
    inactive: [false],
    settingInactiveCheckBox: jest.fn(),
    revertedState: false,
    setRevertedState: jest.fn(),
    setOpenPCT: jest.fn(),
    openPCT: false,
    setUpdatePCT: jest.fn(),
    updatePCT: false,
    setCreatingChild: jest.fn(),
  };
}

export const getMockPCTQualifications = () => {
  return JSON.parse(JSON.stringify(mockPCTQualifications))
}