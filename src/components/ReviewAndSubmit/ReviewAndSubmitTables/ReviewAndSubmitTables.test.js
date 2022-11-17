import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ReviewAndSubmitTables from './ReviewAndSubmitTables';

const monPlansData = [
    {
        "id": "MDC-0046E2E41EE8478DA4F57A4760C3AF97",
        "facId": 3,
        "facilityName": "Gadsden",
        "configTypeCode": null,
        "lastUpdated": "2009-02-20T15:09:03.000Z",
        "updatedStatusFlag": "Y",
        "needsEvalFlag": "Y",
        "checkSessionId": null,
        "orisCode": 7,
        "name": "1",
        "beginReportPeriodId": 9,
        "endReportPeriodId": 64,
        "active": false,
        "pendingStatusCode": null,
        "evalStatusCode": null,
        "unitStackConfigurations": [],
        "locations": [
            {
                "id": "66",
                "unitRecordId": 11,
                "unitId": "1",
                "stackPipeRecordId": null,
                "stackPipeId": null,
                "name": "1",
                "type": "unit",
                "active": true,
                "activeDate": null,
                "retireDate": null,
                "nonLoadBasedIndicator": 0
            }
        ],
        "userId": "bvick",
        "addDate": "2009-02-20T11:53:07.000Z",
        "updateDate": "2015-07-13T13:36:00.000Z",
        "submissionId": 880655,
        "submissionAvailabilityCode": "UPDATED",
        "lastEvaluatedDate": null
    },
    {
        "id": "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
        "facId": 1,
        "facilityName": "Barry",
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
    },]
describe('Data preview component', () => {
  let query;
  beforeEach(() => {
    query = render(<ReviewAndSubmitTables monPlans={monPlansData} />);
  });

  it('renders review and submit component properly', () => {
    const dataTableWrapper = query.container.querySelector('.data-display-table');
    const checkboxes = query.getAllByRole('checkbox');
    const hideTableButton = query.container.querySelector('[data-icon="chevron-up"]')
    expect(dataTableWrapper).toBeInTheDocument()
    expect(checkboxes.length).toBe(3)
    expect(hideTableButton).toBeInTheDocument()
  });

  it('hides data table when the hide table button is clicked', () => {
    const hideTableButton = query.container.querySelector('[data-icon="chevron-up"]')
    const dataTableWrapper = query.container.querySelector('.data-display-table');
    expect(hideTableButton).toBeInTheDocument()
    expect(dataTableWrapper).toBeInTheDocument()
    fireEvent.click(hideTableButton);
    const updatedDataTableWrapper = query.container.querySelector('.data-display-table');
    expect(updatedDataTableWrapper).not.toBeInTheDocument()
    const updatedHideTableButton = query.container.querySelector('[data-icon="chevron-up"]')
    expect(updatedHideTableButton).not.toBeInTheDocument()
    const showTableButton = query.container.querySelector('[data-icon="chevron-down"]')
    expect(showTableButton).toBeInTheDocument()
  })
});
