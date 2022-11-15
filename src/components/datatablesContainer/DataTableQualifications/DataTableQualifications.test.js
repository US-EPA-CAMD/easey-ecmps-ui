import React from "react";
import { render, screen } from "@testing-library/react";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import {
  DataTableQualifications,
  mapDispatchToProps,
  mapStateToProps,
} from "./DataTableQualifications";
import config from "../../../config";
import userEvent from "@testing-library/user-event";
import configureStore from "../../../store/configureStore.dev";
import { Provider } from "react-redux";

const locId = '6';
const store = configureStore()

const qualifications = [
  {
    "qualificationTypeCode": "LMES",
    "beginDate": "2018-05-01",
    "endDate": null,
    "id": "NJCHQLAPA3-82CD1A0A9D2A48BFB5203F82D390183E",
    "locationId": "4168",
    "userId": "abcde",
    "addDate": "2018-07-20",
    "updateDate": "2018-07-20",
    "active": true,
    "leeQualifications": [
      {
        "qualificationTestDate": "2018-07-15",
        "parameterCode": "HG",
        "qualificationTestType": "INITIAL",
        "potentialAnnualMassEmissions": 10.2,
        "applicableEmissionStandard": 29,
        "unitsOfStandard": "LBGWH",
        "percentageOfEmissionStandard": 72.8
      }
    ],
    "lmeQualifications": [
      {
        "qualificationDataYear": 2015,
        "operatingHours": 105,
        "so2Tons": 0.9,
        "noxTons": 6.4
      }
    ],
    "pctQualifications": [
      {
        "qualificationYear": 2020,
        "averagePercentValue": 100,
        "yr1QualificationDataYear": 2018,
        "yr1QualificationDataTypeCode": "A",
        "yr1PercentageValue": 100,
        "yr2QualificationDataYear": 2019,
        "yr2QualificationDataTypeCode": "A",
        "yr2PercentageValue": 100,
        "yr3QualificationDataYear": 2020,
        "yr3QualificationDataTypeCode": "A",
        "yr3PercentageValue": 100
      }
    ]
  },
]

const idRegex = '[\\w\\-]+'

const mpBaseUrl = config.services.monitorPlans.uri

const mock = new MockAdapter(axios);
const getQualificationsUrl = new RegExp(`${mpBaseUrl}/locations/${idRegex}/qualifications`)
const getPCTQualificationsUrl = new RegExp(`${mpBaseUrl}/locations/${idRegex}/qualifications/${idRegex}/pct-qualifications`)
const getLEEQualificationsUrl = new RegExp(`${mpBaseUrl}/locations/${idRegex}/qualifications/${idRegex}/lee-qualifications`)
const getLMEQualificationsUrl = new RegExp(`${mpBaseUrl}/locations/${idRegex}/qualifications/${idRegex}/lme-qualifications`)

// mdm codes
const getQualificationDataTypeCodes = `${config.services.mdm.uri}/qualification-data-type-codes`
const getParameterCodes = `${config.services.mdm.uri}/parameter-codes`
const mdmCodes = new RegExp(`${config.services.mdm.uri}/${idRegex}`)

mock.onGet(getQualificationsUrl).reply(200, qualifications)
mock.onGet(getPCTQualificationsUrl).reply(200, [])
mock.onGet(getLEEQualificationsUrl).reply(200, [])
mock.onGet(getLMEQualificationsUrl).reply(200, [])
mock.onGet(mdmCodes).reply(200, [])

mock.onGet(getQualificationDataTypeCodes).reply(200,
  [
    {
      "qualificationDataTypeCode": "A",
      "qualificationDataTypeDescription": "Actual"
    },
    {
      "qualificationDataTypeCode": "D",
      "qualificationDataTypeDescription": "Demonstration"
    },
    {
      "qualificationDataTypeCode": "P",
      "qualificationDataTypeDescription": "Projected"
    }
  ]
)
mock.onGet(getParameterCodes).reply(200, [])

const tabsProp = [
  {
    "orisCode": 3,
    "checkout": false,
    "name": "Barry (1, 2, CS0AAN) ",
    "location": [
      0,
      "6"
    ],
    "section": [
      0,
      "Defaults"
    ],
    "selectedConfig": {
      "id": "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
      "facId": 1,
      "configTypeCode": null,
      "lastUpdated": null,
      "updatedStatusFlag": "Y",
      "needsEvalFlag": null,
      "checkSessionId": null,
      "orisCode": 3,
      "name": "1, 2, CS0AAN",
      "beginReportPeriodId": 92,
      "endReportPeriodId": null,
      "active": true,
      "pendingStatusCode": null,
      "evalStatusCode": null,
      "unitStackConfigurations": [
        {
          "id": "CAMD-18DD175CE7EF4256B78469865D84F576",
          "unitId": "1",
          "stackPipeId": "CS0AAN",
          "unitRecordId": 1,
          "stackPipeRecordId": "MDC-CCB8D6D0D4E34D24A99C01DCD14078DF",
          "beginDate": "1995-01-01",
          "endDate": null,
          "userId": "PQA09Q1",
          "addDate": "2009-02-20T14:57:04.000Z",
          "updateDate": null,
          "active": true
        },
        {
          "id": "CAMD-BCB0E6D124C947418397A19FD7B4FB77",
          "unitId": "2",
          "stackPipeId": "CS0AAN",
          "unitRecordId": 2,
          "stackPipeRecordId": "MDC-CCB8D6D0D4E34D24A99C01DCD14078DF",
          "beginDate": "1995-01-01",
          "endDate": null,
          "userId": "PQA09Q1",
          "addDate": "2009-02-20T14:57:04.000Z",
          "updateDate": null,
          "active": true
        }
      ],
      "locations": [
        {
          "id": "6",
          "unitRecordId": 1,
          "unitId": "1",
          "stackPipeRecordId": null,
          "stackPipeId": null,
          "name": "1",
          "type": "unit",
          "active": true,
          "activeDate": null,
          "retireDate": null,
          "nonLoadBasedIndicator": 0
        },
        {
          "id": "7",
          "unitRecordId": 2,
          "unitId": "2",
          "stackPipeRecordId": null,
          "stackPipeId": null,
          "name": "2",
          "type": "unit",
          "active": true,
          "activeDate": null,
          "retireDate": null,
          "nonLoadBasedIndicator": 0
        },
        {
          "id": "5",
          "unitRecordId": null,
          "unitId": null,
          "stackPipeRecordId": "MDC-CCB8D6D0D4E34D24A99C01DCD14078DF",
          "stackPipeId": "CS0AAN",
          "name": "CS0AAN",
          "type": "stack",
          "active": true,
          "activeDate": "1995-01-01",
          "retireDate": null,
          "nonLoadBasedIndicator": null
        }
      ],
      "userId": "bvick",
      "addDate": "2015-10-26T10:49:28.000Z",
      "updateDate": "2021-07-26T11:26:00.000Z",
      "submissionId": 1441000,
      "submissionAvailabilityCode": "UPDATED",
      "lastEvaluatedDate": "2022-04-25T13:59:00.000Z"
    },
    "inactive": [
      false,
      false
    ]
  }
]

const props = {
  mdmData: {
    "qualificationTypeCode": [
      {
        "code": "",
        "name": "-- Select a value --"
      },
      {
        "code": "COMPLEX",
        "name": "Flow-to-Load Test Exemption due to Complex Stack Configuration (Petition Approved)"
      },
      {
        "code": "GF",
        "name": "Gas-Fired Unit"
      },
      {
        "code": "LOWSULF",
        "name": "RATA Exemption for Using Only Very Low Sulfur Fuel"
      },
      {
        "code": "PK",
        "name": "Year-Round Peaking Unit"
      },
      {
        "code": "PRATA1",
        "name": "Single-Level RATA (Petition Approved)"
      },
      {
        "code": "PRATA2",
        "name": "Two-Level RATA (Petition Approved)"
      },
      {
        "code": "SK",
        "name": "Ozone-Season Peaking Unit"
      },
      {
        "code": "HGAVG",
        "name": "MATS Hg Averaging Group"
      },
      {
        "code": "LEE",
        "name": "LEE qualification"
      },
      {
        "code": "LMEA",
        "name": "Annual LME Unit"
      },
      {
        "code": "LMES",
        "name": "Ozone-Season LME Unit"
      }
    ]
  },
  loadDropdownsData: jest.fn(),
  locationSelectValue: locId,
  user: true,
  checkout: false,
  inactive: [false],
  settingInactiveCheckBox: jest.fn(),
  revertedState: false,
  setRevertedState: jest.fn(),
  selectedLocation: "50",
  currentTabIndex: 0,
  tabs: tabsProp
};



test('renders DataTableQualifications', () => {
  const { container } = render(
    <Provider store={store}>
      <DataTableQualifications {...props} />
    </Provider>
  )
  expect(container).toBeDefined()
})

test('given a user then they can view data', async () => {
  render(
    <Provider store={store}>
      <DataTableQualifications {...props} />
    </Provider>
  )

  const viewBtn = await screen.findByRole('button', { name: /View LMES/i })
  expect(viewBtn).toBeInTheDocument()
  userEvent.click(viewBtn)
})

test("mapStateToProps calls the appropriate state", async () => {
  // mock the 'dispatch' object
  const dispatch = jest.fn();
  const state = { dropdowns: [1], openedFacilityTabs: { monitoringPlans: [] } };
  const stateProps = mapStateToProps(state, true);
});

test("mapDispatchToProps calls the appropriate action", async () => {
  // mock the 'dispatch' object
  const dispatch = jest.fn();
  const actionProps = mapDispatchToProps(dispatch);
  const formData = [];
  // verify the appropriate action was called
  actionProps.loadDropdownsData();
});
