
const mockQualifications = [
  {
    qualificationTypeCode: "LMES",
    beginDate: "2018-05-01",
    endDate: null,
    id: "NJCHQLAPA3-82CD1A0A9D2A48BFB5203F82D390183E",
    locationId: "4168",
    userId: "abcde",
    addDate: "2018-07-20",
    updateDate: "2018-07-20",
    active: true,
    leeQualifications: [
      {
        qualificationTestDate: "2018-07-15",
        parameterCode: "HG",
        qualificationTestType: "INITIAL",
        potentialAnnualHgMassEmissions: 10.2,
        applicableEmissionStandard: 29,
        unitsOfStandard: "LBGWH",
        percentageOfEmissionStandard: 72.8,
      },
    ],
    lmeQualifications: [
      {
        qualificationDataYear: 2015,
        operatingHours: 105,
        so2Tons: 0.9,
        noxTons: 6.4,
      },
    ],
    pctQualifications: [
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
      },
    ],
  },
];

export const getMockDataTableQualProps = () => {
  return {
    loadDropdownsData: jest.fn(),
    locationSelectValue: 'locId',
    user: true,
    checkout: true,
    inactive: [false],
    settingInactiveCheckBox: jest.fn(),
    revertedState: false,
    setRevertedState: jest.fn(),
    selectedLocation: "50",
    currentTabIndex: 0,
  }
}

export const getMockDataTableQualMdmData = () => {
  return {
    "qualificationTypeCode": [
      {
        code: "",
        name: "-- Select a value --"
      },
      {
        code: "COMPLEX",
        name: "Flow-to-Load Test Exemption due to Complex Stack Configuration (Petition Approved)"
      },
      {
        code: "GF",
        name: "Gas-Fired Unit"
      },
      {
        code: "LOWSULF",
        name: "RATA Exemption for Using Only Very Low Sulfur Fuel"
      },
      {
        code: "PK",
        name: "Year-Round Peaking Unit"
      },
      {
        code: "PRATA1",
        name: "Single-Level RATA (Petition Approved)"
      },
      {
        code: "PRATA2",
        name: "Two-Level RATA (Petition Approved)"
      },
      {
        code: "SK",
        name: "Ozone-Season Peaking Unit"
      },
      {
        code: "HGAVG",
        name: "MATS Hg Averaging Group"
      },
      {
        code: "LEE",
        name: "LEE qualification"
      },
      {
        code: "LMEA",
        name: "Annual LME Unit"
      },
      {
        code: "LMES",
        name: "Ozone-Season LME Unit"
      }
    ]
  }
}

export const getMockQualifications = () => {
  return JSON.parse(JSON.stringify(mockQualifications))
}