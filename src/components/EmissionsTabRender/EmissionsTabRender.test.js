import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "../../store/configureStore.dev";
import { EmissionsTabRender } from "./EmissionsTabRender";

const store = configureStore()

const props = {
  resetTimer: null,
  setExpire: jest.fn(),
  resetTimerFlag: null,
  callApiFlag: null,
  orisCode: 3,
  selectedConfig: {
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
  title: "Barry (1, 2, CS0AAN) ",
  user: false,
  tabs: [
    {
      "orisCode": 3,
      "checkout": false,
      "name": "Barry (1, 2, CS0AAN) ",
      "location": [
        0,
        "6"
      ],
      "section": [
        4,
        "Methods"
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
  ],
  setLocation: jest.fn(),
  setCheckout: jest.fn(),
  setInactive: jest.fn(),
  checkedOutLocations: [
    {
      "facId": 356,
      "monPlanId": "GO619-E38--25E39413591C41A0B396309D03A7A207",
      "checkedOutOn": "2022-10-25T12:35:35.337Z",
      "checkedOutBy": "fanwari-dp",
      "lastActivity": "2022-10-25T12:35:35.337Z"
    },
    {
      "facId": 725,
      "monPlanId": "MDC-E6B60B00BCE3425EB3D7FD948428494C",
      "checkedOutOn": "2022-10-25T12:45:33.167Z",
      "checkedOutBy": "mddee-dp",
      "lastActivity": "2022-10-25T12:45:33.167Z"
    }
  ],
  workspaceSection: "emissions"
}

test('renders EmissionsTabRender', () => {
  const { container } = render(
    <Provider store={store}>
      <EmissionsTabRender {...props} />
    </Provider>
  )

  expect(container).toBeDefined()
})