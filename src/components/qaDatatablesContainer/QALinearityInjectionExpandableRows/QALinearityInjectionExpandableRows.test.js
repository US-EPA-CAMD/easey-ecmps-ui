import React from "react";
import { render, waitForElement, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import QALinearityInjectionExpandableRows from "./QALinearityInjectionExpandableRows";
import { Provider } from 'react-redux';
import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";

import * as qaApi from "../../../utils/api/qaCertificationsAPI";
import config from "../../../config";

const axios = require("axios");
const MockAdapter = require("axios-mock-adapter")
const mock = new MockAdapter(axios)

// matches alphanumeric strings including hyphens (-)
const idRegex = '[\\w\\-]+'

const url = new RegExp(`${config.services.qaCertification.uri}/locations/${idRegex}/test-summary/${idRegex}/linearities/${idRegex}/injections`)
const deleteUrl = new RegExp(`${config.services.qaCertification.uri}/workspace/locations/${idRegex}/test-summary/${idRegex}/linearities/${idRegex}/injections/${idRegex}`)
const gasLevelCodesUrl = 'https://api-easey-dev.app.cloud.gov/master-data-mgmt/gas-level-codes'
const testSummaryUrl = 'https://api-easey-dev.app.cloud.gov/master-data-mgmt/relationships/test-summaries'

const linearityInjection = [
  {
    injectionDate: "2022-08-30T19:31:28.214Z",
    injectionHour: 0,
    injectionMinute: 0,
    measuredValue: 0,
    referenceValue: 0,
    id: 'id1',
    linSumId: 'linSumId1',
    userId: 'userId1',
    addDate: "2022-08-30T19:31:28.214Z",
    updateDate: "2022-08-30T19:31:28.214Z"
  },
  {
    injectionDate: "2022-08-30T19:31:28.214Z",
    injectionHour: 0,
    injectionMinute: 0,
    measuredValue: 0,
    referenceValue: 0,
    id: 'id2',
    linSumId: 'linSumId2',
    userId: 'userId2',
    addDate: "2022-08-30T19:31:28.214Z",
    updateDate: "2022-08-30T19:31:28.214Z"
  },
]

mock.onGet(url).reply(200, linearityInjection);
mock.onDelete(deleteUrl).reply(200, 'deleted')
mock.onGet(gasLevelCodesUrl).reply(200, [])
mock.onGet(testSummaryUrl).reply(200, [])

initialState.dropdowns.lineTestSummary = {
  spanScaleCode: [
    {
      code: '',
      name: '-- Select a value --'
    },
    {
      code: 'H',
      name: 'High'
    },
    {
      code: 'L',
      name: 'Low'
    }
  ],
  testTypeCode: [
    {
      code: '',
      name: '-- Select a value --'
    },
    {
      code: 'DAYCAL',
      name: 'Daily Calibration'
    },
    {
      code: 'INTCHK',
      name: 'Flow Interference Check'
    },
    {
      code: 'PEMSCAL',
      name: 'Daily PEMS Calibration'
    },
    {
      code: 'AF2LCHK',
      name: 'Abbreviated Flow-to-Load Check'
    },
    {
      code: 'HGSI1',
      name: 'One-Point Hg System Integrity Check'
    },
    {
      code: '7DAY',
      name: '7-Day Calibration'
    },
    {
      code: 'CYCLE',
      name: 'Cycle Time Test'
    },
    {
      code: 'LINE',
      name: 'Linearity Check'
    },
    {
      code: 'RATA',
      name: 'Relative Accuracy Test'
    },
    {
      code: 'F2LREF',
      name: 'Flow-to-Load or GHR Reference Data'
    },
    {
      code: 'F2LCHK',
      name: 'Flow-to-Load Ratio or GHR Test'
    },
    {
      code: 'ONOFF',
      name: 'On-Line/Off-Line Calibration'
    },
    {
      code: 'APPE',
      name: 'Appendix E NOx Rate Test'
    },
    {
      code: 'FFACC',
      name: 'Fuel Flowmeter Accuracy Test'
    },
    {
      code: 'FFACCTT',
      name: 'Transmitter Transducer Test'
    },
    {
      code: 'FF2LBAS',
      name: 'Fuel Flow-to-Load Baseline Data'
    },
    {
      code: 'FF2LTST',
      name: 'Fuel Flow-to-Load Test'
    },
    {
      code: 'UNITDEF',
      name: 'Unit-Specific Default NOx Rate Test'
    },
    {
      code: 'PEI',
      name: 'Primary Element Inspection'
    },
    {
      code: 'HGLINE',
      name: 'Mercury Linearity'
    },
    {
      code: 'HGSI3',
      name: 'Three-Point Hg System Integrity Check'
    },
    {
      code: 'DAHS',
      name: 'DAHS Verification'
    },
    {
      code: 'LEAK',
      name: 'Leak Check'
    },
    {
      code: 'OTHER',
      name: 'Other Test'
    },
    {
      code: 'PEMSACC',
      name: 'PEMS Accuracy Check'
    },
    {
      code: 'DGFMCAL',
      name: 'Dry Gas Meter Calibration (Sorbent Trap Monitoring System)'
    },
    {
      code: 'MFMCAL',
      name: 'Mass Flow Meter Calibration (Sorbent Trap Monitoring System)'
    },
    {
      code: 'BCAL',
      name: 'Barometer calibration (sorbent trap monitoring systems)'
    },
    {
      code: 'QGA',
      name: 'Quarterly Gas Audit (HCl and HF monitoring systems)'
    },
    {
      code: 'TSCAL',
      name: 'Temperature sensor calibration (sorbent trap monitoring systems)'
    }
  ],
  testReasonCode: [
    {
      code: '',
      name: '-- Select a value --'
    },
    {
      code: 'DIAG',
      name: 'Diagnostic'
    },
    {
      code: 'INITIAL',
      name: 'Initial Certification'
    },
    {
      code: 'QA',
      name: 'Quality Assurance'
    },
    {
      code: 'RECERT',
      name: 'Recertification'
    }
  ],
  testResultCode: [
    {
      code: '',
      name: '-- Select a value --'
    },
    {
      code: 'IGNORED',
      name: 'Does Not Fulfill Testing Requirement'
    },
    {
      code: 'ABORTED',
      name: 'Test Aborted'
    },
    {
      code: 'EXC168H',
      name: 'Fewer than 168 Hours after Exclusions'
    },
    {
      code: 'FAILED',
      name: 'Test Failed'
    },
    {
      code: 'FEW168H',
      name: 'Fewer than 168 QA Operating Hours'
    },
    {
      code: 'INC',
      name: 'Incomplete Test'
    },
    {
      code: 'INPROG',
      name: 'Baseline Data Collection In Progress'
    },
    {
      code: 'INVALID',
      name: 'Invalid Test'
    },
    {
      code: 'PASSAPS',
      name: 'Test Passed Alt Spec'
    },
    {
      code: 'PASSED',
      name: 'Test Passed'
    }
  ]
};

let store = configureStore(initialState);
//testing redux connected component to mimic props passed as argument
const componentRenderer = (locId, testSummaryId) => {
  const props = {
    user: { firstName: "test" },
    data: {
      locationId: locId,
      id: testSummaryId
    },
    mdmData: {
      "gasLevelCode": [
        {
          code: "",
          name: " --- select ---"
        },
        {
          code: "HIGH",
          name: "high"
        },
        {
          code: "MID",
          name: "mid"
        },
        {
          code: "LOW",
          name: "low"
        },
      ]
    }
  };
  return render(
    <Provider store={store}>
      <QALinearityInjectionExpandableRows {...props} />
    </Provider>
  );
};

test.skip("testing linearity summary expandable records from test summary data", async () => {
  expect(true).toBe(true);
  const res = await qaApi.getQALinearityInjection("5930", "IT07D0112-70AA39C4632746999222EC8FB3C530FB", "IT07D0112-70AA39C4632746999222EC8FB3C530FB");
  expect(res.data).toEqual(linearityInjection);
  let { container } = await waitForElement(() => componentRenderer("5930", "IT07D0112-70AA39C4632746999222EC8FB3C530FB", "IT07D0112-70AA39C4632746999222EC8FB3C530FB"));
  expect(container).toBeDefined();
  expect(screen.getByRole("table")).toBeDefined();
  expect(screen.getAllByRole("columnheader").length).toBe(6);
  expect(screen.getAllByRole("row").length).toBe(linearityInjection.length + 1);
});

test('renders QALinearityInectionExpandableRows', async () => {
  // Arrange
  const { container } = await waitForElement(() => componentRenderer("5930", "IT07D0112-70AA39C4632746999222EC8FB3C530FB"))

  // Assert
  expect(container).toBeDefined()
})

test('given a user then user can add new data', async () => {
  // Assert
  await waitForElement(() => componentRenderer("5930", "IT07D0112-70AA39C4632746999222EC8FB3C530FB"))

  const addBtn = screen.getAllByRole('button', { name: /Add/i })

  // Act
  userEvent.click(addBtn[0])

  // Assert
  expect(addBtn).toBeDefined()
})

test('given a user when "Delete" button is clicked then a row is deleted', async () => {
  // Arrange
  await waitForElement(() => componentRenderer("5930", "IT07D0112-70AA39C4632746999222EC8FB3C530FB"))

  const deleteBtns = screen.getAllByRole('button', { name: /Remove/i })
  const firstDeleteBtn = deleteBtns[0]

  // Act
  userEvent.click(firstDeleteBtn)

  const confirmBtns = screen.getAllByRole('button', { name: /Yes/i })
  const firstConfirmBtn = confirmBtns[0]
  userEvent.click(firstConfirmBtn)

  // Assert
  expect(mock.history.delete.length).toBe(1)
})
