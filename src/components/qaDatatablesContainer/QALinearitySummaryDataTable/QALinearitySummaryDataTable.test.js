import React from "react";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import  QALinearitySummaryDataTable  from "./QALinearitySummaryDataTable";
import { Provider } from 'react-redux';
import * as qaApi from "../../../utils/api/qaCertificationsAPI";
import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
const axios = require("axios");

jest.mock("axios");

const testSummary = [
  {
    id: "TWCORNEL5",
    stackPipeId: null,
    unitId: "1",
    testTypeCode: "FFA",
    monitoringSystemId: null,
    componentId: "AFA",
    spanScaleCode: null,
    testNumber: "20201CEM5F",
    testReasonCode: "QA",
    testDescription: null,
    testResultCode: "PASSED",
    calculatedTestResultCode: "PASSED",
    beginDate: null,
    beginHour: null,
    beginMinute: null,
    endDate: "2020-02-26",
    endHour: 20,
    endMinute: 3,
    gracePeriodIndicator: null,
    calculatedGracePeriodIndicator: null,
    year: null,
    quarter: null,
    testComment: null,
    injectionProtocolCode: null,
    calculatedSpanValue: null,
    evalStatusCode: null,
    userId: "bvick",
    addDate: "2020-04-23",
    updateDate: null,
    reportPeriodId: null,
  },
];
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
const componentRenderer = (location) => {
  const props = {
    user: { firstName: "test" },
    locationSelectValue: location,
    selectedTestCode: "LINE",
    mdmData: {
      "gasLevelCode" : [
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
    <QALinearitySummaryDataTable {...props} />
  </Provider>);
};
function componentRendererNoData(args) {
  const defualtProps = {
    locationSelectValue: "0",
    selectedTestCode: "LINE",
  };

  const props = { ...defualtProps, ...args };
  return render(
    <Provider store={store}>
      <QALinearitySummaryDataTable {...props} />
    </Provider>);
}

test("tests a test summary", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: testSummary })
  );
  const title = await qaApi.getQATestSummary(3);
  expect(title.data).toEqual(testSummary);
  let { container } = await waitForElement(() => componentRenderer(3));
  expect(container).toBeDefined();
});

test("tests a test summary NO USER/NO DATA", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: [] })
  );
  const title = await qaApi.getQATestSummary(3);
  expect(title.data).toEqual([]);
  let { container } = await waitForElement(() => componentRendererNoData(3));
  expect(container).toBeDefined();
});

test("tests updating test summary data", async () => {
  axios.get.mockResolvedValue({ status: 200, data: testSummary });
  const payload = {
    stackPipeId: testSummary.stackPipeId,
    unitId: testSummary.unitId,
    testTypeCode: testSummary.testTypeCode,
    componentID: testSummary.componentID,
    spanScaleCode: testSummary.spanScaleCode,
    testNumber: "A05-Q4-2011-20",
    testReasonCode: testSummary.testReasonCode,
    testResultCode: testSummary.testResultCode,
    beginDate: testSummary.beginDate,
    beginHour: testSummary.beginHour,
    beginMinute: testSummary.beginMinute,
    endDate: testSummary.endDate,
    endHour: testSummary.endHour,
    endMinute: testSummary.endMinute,
    gracePeriodIndicator: testSummary.gracePeriodIndicator,
    testComment: "dev testing",
  };
  axios.mockResolvedValueOnce(Promise.resolve({ status: 200, data: payload }));
  const title = await qaApi.updateQALinearityTestSummary(
    1873,
    "f6e4056f-c779-4a61-b265-2932898a9033",
    payload
  );
  expect(title.data).toEqual(payload);
  let { container } = await waitForElement(() => componentRenderer(1873));
  expect(container).toBeDefined();
});
