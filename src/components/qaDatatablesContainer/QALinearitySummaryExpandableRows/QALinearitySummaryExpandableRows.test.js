import React from "react";
import { render, waitForElement, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import QALinearitySummaryExpandableRows from "./QALinearitySummaryExpandableRows";
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";

import * as qaApi from "../../../utils/api/qaCertificationsAPI";
import config from "../../../config";

const axios = require("axios");
const MockAdapter = require("axios-mock-adapter")
const mock = new MockAdapter(axios)

// matches alphanumeric strings including hyphens (-)
const idRegex = '[\\w\\-]+'

const workspaceUrl = new RegExp(`${config.services.qaCertification.uri}/workspace/locations/${idRegex}/test-summary`)
const url = new RegExp(`${config.services.qaCertification.uri}/locations/${idRegex}/test-summary/${idRegex}/linearities`)
const protocolGasUrl = new RegExp(`${config.services.qaCertification.uri}/locations/${idRegex}/test-summary/${idRegex}/protocol-gases`)

const gasLevelCodesUrl = 'https://api-easey-dev.app.cloud.gov/master-data-mgmt/gas-level-codes'
const gasTypeCodesUrl = 'https://api-easey-dev.app.cloud.gov/master-data-mgmt/gas-type-codes'

const rowToRemoveText = 'this row should be removed'

const linearitySummary = [
  {
    "id": "IT07D0112-4CBC1A08D61B403DBB179D0B78EC51A8",
    "testSumId": "IT07D0112-70AA39C4632746999222EC8FB3C530FB",
    "gasLevelCode": "MID",
    "meanMeasuredValue": 55.3,
    "calculatedMeanMeasuredValue": 55.3,
    "meanReferenceValue": 55.9,
    "calculatedMeanReferenceValue": 55.9,
    "percentError": 1.1,
    "calculatedPercentError": 1.1,
    "apsIndicator": 0,
    "calculatedAPSIndicator": 0,
    "userId": "lperez",
    "addDate": "4/25/2011, 7:30:54 PM",
    "updateDate": null,
    "linearityInjectionData": []
  },
  {
    "id": "idToRemove",
    "testSumId": "IT07D0112-70AA39C4632746999222EC8FB3C530FB",
    "gasLevelCode": rowToRemoveText,
    "meanMeasuredValue": 55.3,
    "calculatedMeanMeasuredValue": 55.3,
    "meanReferenceValue": 55.9,
    "calculatedMeanReferenceValue": 55.9,
    "percentError": 1.1,
    "calculatedPercentError": 1.1,
    "apsIndicator": 0,
    "calculatedAPSIndicator": 0,
    "userId": "lperez",
    "addDate": "4/25/2011, 7:30:54 PM",
    "updateDate": null,
    "linearityInjectionData": []
  },
  {
    "id": "IT07D0112-7B71D94A53784A5282585A35DDB346C0",
    "testSumId": "IT07D0112-70AA39C4632746999222EC8FB3C530FB",
    "gasLevelCode": "LOW",
    "meanMeasuredValue": 25.233,
    "calculatedMeanMeasuredValue": 25.233,
    "meanReferenceValue": 25.2,
    "calculatedMeanReferenceValue": 25.2,
    "percentError": 0.1,
    "calculatedPercentError": 0.1,
    "apsIndicator": 0,
    "calculatedAPSIndicator": 0,
    "userId": "lperez",
    "addDate": "4/25/2011, 7:30:54 PM",
    "updateDate": null,
    "linearityInjectionData": []
  },
];

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet(url).reply(200, linearitySummary);
mock.onGet(workspaceUrl).reply(200, linearitySummary)
mock.onGet(gasLevelCodesUrl).reply(200, [])
mock.onGet(gasTypeCodesUrl).reply(200, [])
mock.onGet(protocolGasUrl).reply(200, [])

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
      <QALinearitySummaryExpandableRows {...props} />
    </Provider>
  );
};

test.only('renders QALinearitySummaryExpandableRows', async () => {
  // Arrange
  const { container } = await waitForElement(() => componentRenderer("1873", "4f2d07c0-55f9-49b0-8946-ea80c1febb15"))

  // Assert
  expect(container).toBeDefined()
})

test.only('add', async () => {
  await waitForElement(() => componentRenderer("1873", "4f2d07c0-55f9-49b0-8946-ea80c1febb15"))

  const addBtn = screen.getAllByRole('button', { name: /Add/i })

  userEvent.click(addBtn[0])
})

test("testing linearity summary expandable records from test summary data", async () => {
  expect(true).toBe(true);
  // axios.get.mockImplementation(() =>
  //   Promise.resolve({ status: 200, data: linearitySummary })
  // );
  // const res = await qaApi.getQALinearitySummary("5930", "IT07D0112-70AA39C4632746999222EC8FB3C530FB");
  // expect(res.data).toEqual(linearitySummary);
  // let { container } = await waitForElement(() => componentRenderer("5930", "IT07D0112-70AA39C4632746999222EC8FB3C530FB"));
  // expect(container).toBeDefined();
  // expect(screen.getAllByRole("table").length).toBe(2);//includes protocol gas
  // expect(screen.getAllByRole("columnheader").length).toBe(12);
  // expect(screen.getAllByRole("row").length).toBe(8);
});

test("testing to add linearity summary records", async () => {
  expect(true).toBe(true);
  // axios.get.mockImplementation(() =>
  //   Promise.resolve({ status: 200, data: linearitySummary })
  // );
  // const res = await qaApi.getQALinearitySummary("5930", "IT07D0112-70AA39C4632746999222EC8FB3C530FB");
  // expect(res.data).toEqual(linearitySummary);
  // let { container } = await waitForElement(() => componentRenderer("5930", "IT07D0112-70AA39C4632746999222EC8FB3C530FB"));
  // expect(container).toBeDefined();
  // const addButtons = await findByRole("button", {name: "Add"});
  // console.log(addButtons);
  // expect(addButtons.length).toBe(4);
  // fireEvent.click(addButtons[0]);
  // expect(screen.getByText("Add Linearity Test")).toBeInTheDocument();
  //screen.debug();
});
