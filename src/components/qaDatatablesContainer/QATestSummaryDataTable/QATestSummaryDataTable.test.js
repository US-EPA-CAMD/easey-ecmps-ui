import React from "react";
import { render, screen, waitForElement } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import QATestSummaryDataTable from "./QATestSummaryDataTable";
import configureStore from "../../../store/configureStore.dev";
import config from "../../../config";

const mock = new MockAdapter(axios);

const idRegex = "[\\w\\-]+";
const locId = "locId";

const getUrl = `${config.services.qaCertification.uri}/locations/${locId}/test-summary?testTypeCodes=UNITDEF`;
const postUrl = new RegExp(
  `${config.services.qaCertification.uri}/workspace/locations/${idRegex}/test-summary`
);
const putUrl = new RegExp(
  `${config.services.qaCertification.uri}/workspace/locations/${idRegex}/test-summary/${idRegex}`
);
const deleteUrl = new RegExp(
  `${config.services.qaCertification.uri}/workspace/locations/${idRegex}/test-summary/${idRegex}`
);

const testTypeCodesUrl = new RegExp(
  `${config.services.mdm.uri}/test-type-codes`
);
const spanScaleCodesUrl = new RegExp(
  `${config.services.mdm.uri}/span-scale-codes`
);
const testReasonCodesUrl = new RegExp(
  `${config.services.mdm.uri}/test-reason-codes`
);
const testResultCodesUrl = new RegExp(
  `${config.services.mdm.uri}/test-result-codes`
);
const prefilterTestSummariesUrl = new RegExp(
  `${config.services.mdm.uri}/relationships/test-summaries`
);
const getMonitoringComponentsUrl = new RegExp(
  `${config.services.monitorPlans.uri}/locations/${locId}/components`
);
const getMonitoringSystemssUrl = new RegExp(
  `${config.services.monitorPlans.uri}/locations/${locId}/systems`
);

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

mock.onGet(getUrl).reply(200, testSummary);
mock.onPost(postUrl).reply(200, "created");
mock.onPut(putUrl).reply(200, "updated");
mock.onDelete(deleteUrl).reply(200, "deleted");

mock.onGet(testTypeCodesUrl).reply(200, []);
mock.onGet(spanScaleCodesUrl).reply(200, []);
mock.onGet(testReasonCodesUrl).reply(200, []);
mock.onGet(testResultCodesUrl).reply(200, []);
mock.onGet(prefilterTestSummariesUrl).reply(200, []);
mock.onGet(getMonitoringComponentsUrl).reply(200, []);
mock.onGet(getMonitoringSystemssUrl).reply(200, []);

const initialState = {
  facilities: [],
  monitoringPlans: [
    [
      3,
      [
        {
          id: "MDC-0AD77532C61345C6B50CBC80ADA1A3E1",
          facId: 1,
          orisCode: 3,
          name: "1, 2, 3, CS0AAN",
          beginReportPeriodId: 9,
          endReportPeriodId: 91,
          active: false,
          reportingFrequencies: [],
          locations: [
            {
              id: "6",
              unitRecordId: 1,
              unitId: "1",
              stackPipeRecordId: null,
              stackPipeId: null,
              name: "1",
              type: "unit",
              active: true,
              activeDate: null,
              retireDate: null,
              nonLoadBasedIndicator: 0,
            },
            {
              id: "7",
              unitRecordId: 2,
              unitId: "2",
              stackPipeRecordId: null,
              stackPipeId: null,
              name: "2",
              type: "unit",
              active: true,
              activeDate: null,
              retireDate: null,
              nonLoadBasedIndicator: 0,
            },
            {
              id: "8",
              unitRecordId: 3,
              unitId: "3",
              stackPipeRecordId: null,
              stackPipeId: null,
              name: "3",
              type: "unit",
              active: false,
              activeDate: null,
              retireDate: null,
              nonLoadBasedIndicator: 0,
            },
            {
              id: "5",
              unitRecordId: null,
              unitId: null,
              stackPipeRecordId: "MDC-CCB8D6D0D4E34D24A99C01DCD14078DF",
              stackPipeId: "CS0AAN",
              name: "CS0AAN",
              type: "stack",
              active: true,
              activeDate: "1995-01-01",
              retireDate: null,
              nonLoadBasedIndicator: null,
            },
          ],
          evalStatusCode: "Y",
          userId: "bvick",
          addDate: "2009-02-20T11:53:06.000Z",
          updateDate: "2015-10-22T14:39:00.000Z",
        },
      ],
    ],
  ],
  openedFacilityTabs: {
    qaCertTestSummary: [
      {
        orisCode: 3,
        checkout: false,
        name: "Barry (1, 2, CS0AAN) ",
        location: [0, "6"],
        section: [15, "Transmitter Transducer Accuracy"],
        selectedConfig: {
          id: "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
          facId: 1,
          orisCode: 3,
          name: "1, 2, CS0AAN",
          beginReportPeriodId: 92,
          endReportPeriodId: null,
          active: true,
          reportingFrequencies: [],
          locations: [
            {
              id: "6",
              unitRecordId: 1,
              unitId: "1",
              stackPipeRecordId: null,
              stackPipeId: null,
              name: "1",
              type: "unit",
              active: true,
              activeDate: null,
              retireDate: null,
              nonLoadBasedIndicator: 0,
            },
            {
              id: "7",
              unitRecordId: 2,
              unitId: "2",
              stackPipeRecordId: null,
              stackPipeId: null,
              name: "2",
              type: "unit",
              active: true,
              activeDate: null,
              retireDate: null,
              nonLoadBasedIndicator: 0,
            },
            {
              id: "5",
              unitRecordId: null,
              unitId: null,
              stackPipeRecordId: "MDC-CCB8D6D0D4E34D24A99C01DCD14078DF",
              stackPipeId: "CS0AAN",
              name: "CS0AAN",
              type: "stack",
              active: true,
              activeDate: "1995-01-01",
              retireDate: null,
              nonLoadBasedIndicator: null,
            },
          ],
          evalStatusCode: null,
          userId: "bvick",
          addDate: "2015-10-26T10:49:28.000Z",
          updateDate: "2021-07-26T11:26:00.000Z",
        },
        inactive: [false, false],
      },
    ],
  },
  activeTab: {
    monitoringPlans: [0],
    qaCertTestSummary: [0],
    export: [0],
  },
  dropdowns: {
    defaults: [],
    formulas: [],
    loads: [],
    locationAttributesAndRelationships: [],
    methods: [],
    qualifications: [],
    lmeQualifications: [],
    leeQualifications: [],
    pctQualifications: [],
    rectangularDuctWafs: [],
    spans: [],
    systems: [],
    unitFuels: [],
    unitControls: [],
    unitCapacities: [],
    fuelFlows: [],
    systemComponents: [],
    analyzerRanges: [],
    matsMethods: [],
    lineTestSummary: {
      spanScaleCode: [
        {
          code: "",
          name: "-- Select a value --",
        },
        {
          code: "H",
          name: "High",
        },
        {
          code: "L",
          name: "Low",
        },
      ],
      testTypeCode: [
        {
          code: "",
          name: "-- Select a value --",
        },
        {
          code: "DAYCAL",
          name: "Daily Calibration",
        },
        {
          code: "INTCHK",
          name: "Flow Interference Check",
        },
        {
          code: "PEMSCAL",
          name: "Daily PEMS Calibration",
        },
        {
          code: "AF2LCHK",
          name: "Abbreviated Flow-to-Load Check",
        },
        {
          code: "HGSI1",
          name: "One-Point Hg System Integrity Check",
        },
        {
          code: "7DAY",
          name: "7-Day Calibration",
        },
        {
          code: "CYCLE",
          name: "Cycle Time Test",
        },
        {
          code: "LINE",
          name: "Linearity Check",
        },
        {
          code: "RATA",
          name: "Relative Accuracy Test",
        },
        {
          code: "APPESUM",
          name: "Apendix E Correlation Summary Test",
        },
        {
          code: "F2LREF",
          name: "Flow-to-Load or GHR Reference Data",
        },
        {
          code: "F2LCHK",
          name: "Flow-to-Load Ratio or GHR Test",
        },
        {
          code: "ONOFF",
          name: "On-Line/Off-Line Calibration",
        },
        {
          code: "APPE",
          name: "Appendix E NOx Rate Test",
        },
        {
          code: "FFACC",
          name: "Fuel Flowmeter Accuracy Test",
        },
        {
          code: "FFACCTT",
          name: "Transmitter Transducer Test",
        },
        {
          code: "FF2LBAS",
          name: "Fuel Flow-to-Load Baseline Data",
        },
        {
          code: "FF2LTST",
          name: "Fuel Flow-to-Load Test",
        },
        {
          code: "UNITDEF",
          name: "Unit-Specific Default NOx Rate Test",
        },
        {
          code: "PEI",
          name: "Primary Element Inspection",
        },
        {
          code: "HGLINE",
          name: "Mercury Linearity",
        },
        {
          code: "HGSI3",
          name: "Three-Point Hg System Integrity Check",
        },
        {
          code: "DAHS",
          name: "DAHS Verification",
        },
        {
          code: "LEAK",
          name: "Leak Check",
        },
        {
          code: "OTHER",
          name: "Other Test",
        },
        {
          code: "PEMSACC",
          name: "PEMS Accuracy Check",
        },
        {
          code: "DGFMCAL",
          name: "Dry Gas Meter Calibration (Sorbent Trap Monitoring System)",
        },
        {
          code: "MFMCAL",
          name: "Mass Flow Meter Calibration (Sorbent Trap Monitoring System)",
        },
        {
          code: "BCAL",
          name: "Barometer calibration (sorbent trap monitoring systems)",
        },
        {
          code: "QGA",
          name: "Quarterly Gas Audit (HCl and HF monitoring systems)",
        },
        {
          code: "TSCAL",
          name: "Temperature sensor calibration (sorbent trap monitoring systems)",
        },
      ],
      testReasonCode: [
        {
          code: "",
          name: "-- Select a value --",
        },
        {
          code: "DIAG",
          name: "Diagnostic",
        },
        {
          code: "INITIAL",
          name: "Initial Certification",
        },
        {
          code: "QA",
          name: "Quality Assurance",
        },
        {
          code: "RECERT",
          name: "Recertification",
        },
      ],
      testResultCode: [
        {
          code: "",
          name: "-- Select a value --",
        },
        {
          code: "IGNORED",
          name: "Does Not Fulfill Testing Requirement",
        },
        {
          code: "ABORTED",
          name: "Test Aborted",
        },
        {
          code: "EXC168H",
          name: "Fewer than 168 Hours after Exclusions",
        },
        {
          code: "FAILED",
          name: "Test Failed",
        },
        {
          code: "FEW168H",
          name: "Fewer than 168 QA Operating Hours",
        },
        {
          code: "INC",
          name: "Incomplete Test",
        },
        {
          code: "INPROG",
          name: "Baseline Data Collection In Progress",
        },
        {
          code: "INVALID",
          name: "Invalid Test",
        },
        {
          code: "PASSAPS",
          name: "Test Passed Alt Spec",
        },
        {
          code: "PASSED",
          name: "Test Passed",
        },
      ],
    },
    linearitySummaryTestSecondLevel: [],
  },
};

const store = configureStore(initialState);

const componentRender = (show, testTypeGroupCodeValue) => {
  return render(
    <QATestSummaryDataTable
      locationSelectValue={locId}
      user={"user"}
      nonEditable={false}
      showModal={show}
      selectedTestCode={{
        testTypeCodes: ["UNITDEF"],
        testTypeGroupCode: testTypeGroupCodeValue,
      }}
      isCheckedOut={true}
      selectedLocation={"66"}
      locations={[
        {
          id: "66",
          unitRecordId: 11,
          unitId: "1",
          stackPipeRecordId: null,
          stackPipeId: null,
          name: "1",
          type: "unit",
          active: true,
          activeDate: null,
          retireDate: null,
          nonLoadBasedIndicator: 0,
        },
      ]}
    />
  );
};

test("testing component renders properly and functionlity for add/edit/remove", async () => {
  const { container } = await waitForElement(() =>
    componentRender(true, "LINSUM")
  );
  expect(container).toBeDefined();

  // Add
  const addBtn = screen.getAllByRole("button", { name: /Add/i });
  userEvent.click(addBtn[0]);
  const addSaveBtn = screen.getByRole("button", { name: /Click to Save/i });
  userEvent.click(addSaveBtn);
  setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);

  // Edit
  const editBtn = screen.getAllByRole("button", { name: /Edit/i })[0];
  userEvent.click(editBtn);
  const editSaveBtn = screen.getByRole("button", { name: /Click to Save/i });
  userEvent.click(editSaveBtn);
  setTimeout(() => expect(mock.history.put.length).toBe(1), 1000);

  // Remove
  const removeBtn = screen.getByRole("button", { name: /Remove/i });
  userEvent.click(removeBtn);
  const confirmBtn = screen.getByRole("button", { name: /Yes/i });
  userEvent.click(confirmBtn);
  setTimeout(() => expect(mock.history.delete.length).toBe(1), 1000);


});

test("testing component renders properly with RELACC ", async () => {
  const { container } = await waitForElement(() =>
    componentRender(true, "RELACC")
  );
  expect(container).toBeDefined();
});
test("testing component renders properly with APPESUM ", async () => {
  const { container } = await waitForElement(() =>
    componentRender(true, "APPESUM")
  );
  expect(container).toBeDefined();
});
test("testing component renders properly with FFLB ", async () => {
  const { container } = await waitForElement(() =>
    componentRender(true, "FFLB")
  );
  expect(container).toBeDefined();
});
test("testing component renders properly with FLC ", async () => {
  jest.setTimeout(10000)
  const { container } = await waitForElement(() =>
    componentRender(true, "FLC")
  );
  expect(container).toBeDefined();
  jest.setTimeout(5000)
});
test("testing component renders properly with OLOLCAL ", async () => {
  const { container } = await waitForElement(() =>
    componentRender(true, "OLOLCAL")
  );
  expect(container).toBeDefined();
});
test("testing component renders properly with CALINJ ", async () => {
  const { container } = await waitForElement(() =>
    componentRender(true, "CALINJ")
  );
  expect(container).toBeDefined();
});
test("testing component renders properly with FFACC ", async () => {
  jest.setTimeout(10000)
  const { container } = await waitForElement(() =>
    componentRender(true, "FFACC")
  );
  expect(container).toBeDefined();
  jest.setTimeout(5000)
});
test("testing component renders properly with CYCSUM ", async () => {
  const { container } = await waitForElement(() =>
    componentRender(true, "CYCSUM")
  );
  expect(container).toBeDefined();
});
test("testing component renders properly with FFACC ", async () => {
  const { container } = await waitForElement(() =>
    componentRender(true, "FFACC")
  );
  expect(container).toBeDefined();
});
test("testing component renders properly with TTACC ", async () => {
  const { container } = await waitForElement(() =>
    componentRender(true, "TTACC")
  );
  expect(container).toBeDefined();
});
test("testing component renders properly with FLR ", async () => {
  const { container } = await waitForElement(() =>
    componentRender(true, "FLR")
  );
  expect(container).toBeDefined();
});
test("testing component renders properly with FFL ", async () => {
  const { container } = await waitForElement(() =>
    componentRender(true, "FFL")
  );
  expect(container).toBeDefined();
});
test("testing component renders properly with HGL3LS ", async () => {
  const { container } = await waitForElement(() =>
    componentRender(true, "HGL3LS")
  );
  expect(container).toBeDefined();
});
// test("testing component renders properly with default ", async () => {
//   const { container } = await waitForElement(() =>
//     componentRender(true, "default")
//   );
//   expect(container).toBeDefined();
// });
