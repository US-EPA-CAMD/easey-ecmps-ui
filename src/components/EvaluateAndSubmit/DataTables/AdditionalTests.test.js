import React, { useRef, useState } from 'react';
import { render, act } from '@testing-library/react';

import DataTables from './DataTables';
import _ from 'lodash';
import userEvent from '@testing-library/user-event';

const mockRows = [
  {
    selected: false,
    checkedOut: true,
    userCheckedOut: true,
    viewOnly: false,
    id: 'TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A',
    facId: 1,
    facilityName: 'Barry',
    configTypeCode: null,
    lastUpdated: null,
    updatedStatusFlag: 'Y',
    needsEvalFlag: 'N',
    checkSessionId: '6ca7c536-53a3-3f5d-55bd-74df45c97f15',
    orisCode: 3,
    name: '1, 2, CS0AAN',
    beginReportPeriodId: 92,
    endReportPeriodId: null,
    active: true,
    pendingStatusCode: 'NOTSUB',
    evalStatusCode: 'PASS',
    unitStackConfigurations: [
      {
        id: 'CAMD-18DD175CE7EF4256B78469865D84F576',
        unitId: '1',
        stackPipeId: 'CS0AAN',
        unitRecordId: 1,
        stackPipeRecordId: 'MDC-CCB8D6D0D4E34D24A99C01DCD14078DF',
        beginDate: '1995-01-01',
        endDate: null,
        userId: 'PQA09Q1',
        addDate: '2009-02-20T14:57:04.000Z',
        updateDate: null,
        active: true,
      },
      {
        id: 'CAMD-BCB0E6D124C947418397A19FD7B4FB77',
        unitId: '2',
        stackPipeId: 'CS0AAN',
        unitRecordId: 2,
        stackPipeRecordId: 'MDC-CCB8D6D0D4E34D24A99C01DCD14078DF',
        beginDate: '1995-01-01',
        endDate: null,
        userId: 'PQA09Q1',
        addDate: '2009-02-20T14:57:04.000Z',
        updateDate: null,
        active: true,
      },
    ],
    locations: [
      {
        id: '6',
        unitRecordId: 1,
        unitId: '1',
        stackPipeRecordId: null,
        stackPipeId: null,
        name: '1',
        type: 'unit',
        active: true,
        activeDate: null,
        retireDate: null,
        nonLoadBasedIndicator: 0,
      },
      {
        id: '7',
        unitRecordId: 2,
        unitId: '2',
        stackPipeRecordId: null,
        stackPipeId: null,
        name: '2',
        type: 'unit',
        active: true,
        activeDate: null,
        retireDate: null,
        nonLoadBasedIndicator: 0,
      },
      {
        id: '5',
        unitRecordId: null,
        unitId: null,
        stackPipeRecordId: 'MDC-CCB8D6D0D4E34D24A99C01DCD14078DF',
        stackPipeId: 'CS0AAN',
        name: 'CS0AAN',
        type: 'stack',
        active: true,
        activeDate: '1995-01-01',
        retireDate: null,
        nonLoadBasedIndicator: null,
      },
    ],
    userId: 'sdhawan-db',
    addDate: '2015-10-26T10:49:28.000Z',
    updateDate: '2023-01-06T19:37:20.362Z',
    submissionId: 1551444,
    submissionAvailabilityCode: 'UPDATED',
    lastEvaluatedDate: '2023-01-05T16:48:04.638Z',
    monPlanId: 'TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A',
  },
  {
    selected: false,
    checkedOut: true,
    userCheckedOut: false,
    viewOnly: false,
    id: 'TWCORNEL5-F4E3DAADF24B4E1C8F2BEDD2DE59B436',
    facId: 1,
    facilityName: 'Barry',
    configTypeCode: null,
    lastUpdated: null,
    updatedStatusFlag: 'Y',
    needsEvalFlag: 'N',
    checkSessionId: 'dfe66ca0-9a3d-08c3-9c5d-28d9b402d47a',
    orisCode: 3,
    name: '4',
    beginReportPeriodId: 88,
    endReportPeriodId: null,
    active: true,
    pendingStatusCode: 'NOTSUB',
    evalStatusCode: 'ERR',
    unitStackConfigurations: [],
    locations: [
      {
        id: '4',
        unitRecordId: 4,
        unitId: '4',
        stackPipeRecordId: null,
        stackPipeId: null,
        name: '4',
        type: 'unit',
        active: true,
        activeDate: null,
        retireDate: null,
        nonLoadBasedIndicator: 0,
      },
    ],
    userId: 'kherceg-ds',
    addDate: '2014-10-21T16:58:39.000Z',
    updateDate: '2023-01-05T20:42:29.281Z',
    submissionId: 1551410,
    submissionAvailabilityCode: 'REQUIRE',
    lastEvaluatedDate: '2023-01-05T16:49:06.194Z',
    monPlanId: 'TWCORNEL5-F4E3DAADF24B4E1C8F2BEDD2DE59B436',
  },
  {
    selected: false,
    checkedOut: false,
    userCheckedOut: false,
    viewOnly: false,
    id: 'TWCORNEL5-488E42008B434177BC7D7BFF138D18EF',
    facId: 1,
    facilityName: 'Barry',
    configTypeCode: null,
    lastUpdated: null,
    updatedStatusFlag: 'Y',
    needsEvalFlag: 'N',
    checkSessionId: '22e8795e-34a5-6957-c54f-3331f711bb95',
    orisCode: 3,
    name: '5',
    beginReportPeriodId: 108,
    endReportPeriodId: null,
    active: true,
    pendingStatusCode: 'NOTSUB',
    evalStatusCode: 'ERR',
    unitStackConfigurations: [],
    locations: [
      {
        id: '11',
        unitRecordId: 5,
        unitId: '5',
        stackPipeRecordId: null,
        stackPipeId: null,
        name: '5',
        type: 'unit',
        active: true,
        activeDate: null,
        retireDate: null,
        nonLoadBasedIndicator: 0,
      },
    ],
    userId: 'kherceg-ds',
    addDate: '2019-10-28T10:11:00.000Z',
    updateDate: '2023-01-05T20:42:30.971Z',
    submissionId: 1527678,
    submissionAvailabilityCode: 'REQUIRE',
    lastEvaluatedDate: '2023-01-05T16:49:06.320Z',
    monPlanId: 'TWCORNEL5-488E42008B434177BC7D7BFF138D18EF',
  },
  {
    selected: false,
    checkedOut: false,
    userCheckedOut: false,
    viewOnly: false,
    id: 'MDC-68FF9CD5F0C2464E85FD2A3C15D5A670',
    facId: 1,
    facilityName: 'Barry',
    configTypeCode: null,
    lastUpdated: '2009-02-20T15:09:02.000Z',
    updatedStatusFlag: 'Y',
    needsEvalFlag: 'N',
    checkSessionId: 'a5f58872-ccd7-8c5b-f533-526d5013361f',
    orisCode: 3,
    name: '6A',
    beginReportPeriodId: 30,
    endReportPeriodId: null,
    active: true,
    pendingStatusCode: 'NOTSUB',
    evalStatusCode: 'PASS',
    unitStackConfigurations: [],
    locations: [
      {
        id: '2706',
        unitRecordId: 6,
        unitId: '6A',
        stackPipeRecordId: null,
        stackPipeId: null,
        name: '6A',
        type: 'unit',
        active: true,
        activeDate: null,
        retireDate: null,
        nonLoadBasedIndicator: 0,
      },
    ],
    userId: 'kherceg-ds',
    addDate: '2009-02-20T11:53:06.000Z',
    updateDate: '2023-01-05T20:42:32.674Z',
    submissionId: 1507847,
    submissionAvailabilityCode: 'REQUIRE',
    lastEvaluatedDate: '2023-01-05T16:49:05.932Z',
    monPlanId: 'MDC-68FF9CD5F0C2464E85FD2A3C15D5A670',
  },
  {
    selected: false,
    checkedOut: false,
    userCheckedOut: false,
    viewOnly: false,
    id: 'MDC-A89416B9A1414C1CADE050800574A24C',
    facId: 1,
    facilityName: 'Barry',
    configTypeCode: null,
    lastUpdated: '2009-02-20T15:09:02.000Z',
    updatedStatusFlag: 'Y',
    needsEvalFlag: 'N',
    checkSessionId: 'a2b39c09-48f1-279c-0b2e-874ff2017639',
    orisCode: 3,
    name: '6B',
    beginReportPeriodId: 30,
    endReportPeriodId: null,
    active: true,
    pendingStatusCode: 'NOTSUB',
    evalStatusCode: 'PASS',
    unitStackConfigurations: [],
    locations: [
      {
        id: '2707',
        unitRecordId: 7,
        unitId: '6B',
        stackPipeRecordId: null,
        stackPipeId: null,
        name: '6B',
        type: 'unit',
        active: true,
        activeDate: null,
        retireDate: null,
        nonLoadBasedIndicator: 0,
      },
    ],
    userId: 'kherceg-ds',
    addDate: '2009-02-20T11:53:06.000Z',
    updateDate: '2023-01-05T20:42:30.424Z',
    submissionId: 1507864,
    submissionAvailabilityCode: 'REQUIRE',
    lastEvaluatedDate: '2023-01-05T16:51:04.233Z',
    monPlanId: 'MDC-A89416B9A1414C1CADE050800574A24C',
  },
  {
    selected: false,
    checkedOut: false,
    userCheckedOut: false,
    viewOnly: false,
    id: 'MDC-78E54EA179FA4C12B3640D3EA96110EC',
    facId: 1,
    facilityName: 'Barry',
    configTypeCode: null,
    lastUpdated: '2009-02-20T15:09:02.000Z',
    updatedStatusFlag: 'Y',
    needsEvalFlag: 'N',
    checkSessionId: '624fc10e-0841-cfb2-1787-1fc4de39cf88',
    orisCode: 3,
    name: '7A',
    beginReportPeriodId: 34,
    endReportPeriodId: null,
    active: true,
    pendingStatusCode: 'NOTSUB',
    evalStatusCode: 'EVAL',
    unitStackConfigurations: [],
    locations: [
      {
        id: '2708',
        unitRecordId: 8,
        unitId: '7A',
        stackPipeRecordId: null,
        stackPipeId: null,
        name: '7A',
        type: 'unit',
        active: true,
        activeDate: null,
        retireDate: null,
        nonLoadBasedIndicator: 0,
      },
    ],
    userId: 'kherceg-ds',
    addDate: '2009-02-20T11:53:05.000Z',
    updateDate: '2023-01-05T20:42:32.113Z',
    submissionId: 1551434,
    submissionAvailabilityCode: 'REQUIRE',
    lastEvaluatedDate: '2023-01-05T16:45:04.425Z',
    monPlanId: 'MDC-78E54EA179FA4C12B3640D3EA96110EC',
  },
  {
    selected: false,
    checkedOut: false,
    userCheckedOut: false,
    viewOnly: true,
    id: 'MDC-ABF4B69D22C04494A78DA1667DFE9DE6',
    facId: 1,
    facilityName: 'Barry',
    configTypeCode: null,
    lastUpdated: '2009-02-20T15:09:02.000Z',
    updatedStatusFlag: 'Y',
    needsEvalFlag: 'N',
    checkSessionId: '380f1d8e-8023-50af-2ade-648906cd6d6e',
    orisCode: 3,
    name: '7B',
    beginReportPeriodId: 34,
    endReportPeriodId: null,
    active: true,
    pendingStatusCode: 'NOTSUB',
    evalStatusCode: 'EVAL',
    unitStackConfigurations: [],
    locations: [
      {
        id: '2709',
        unitRecordId: 9,
        unitId: '7B',
        stackPipeRecordId: null,
        stackPipeId: null,
        name: '7B',
        type: 'unit',
        active: true,
        activeDate: null,
        retireDate: null,
        nonLoadBasedIndicator: 0,
      },
    ],
    userId: 'kherceg-ds',
    addDate: '2009-02-20T11:53:06.000Z',
    updateDate: '2023-01-05T20:42:29.841Z',
    submissionId: 1507883,
    submissionAvailabilityCode: 'REQUIRE',
    lastEvaluatedDate: '2023-01-05T16:46:04.287Z',
    monPlanId: 'MDC-ABF4B69D22C04494A78DA1667DFE9DE6',
  },
];

const Wrapper = ({ rows, checkedOutLocationsMap, componentType }) => {
  const [monPlanState, setMonPlanState] = useState(_.cloneDeep(rows));
  const [qaTestSummaryState, setQaTestSummaryState] = useState(
    _.cloneDeep(rows)
  );
  const [emissionsState, setEmissionsState] = useState(_.cloneDeep(rows));
  const permissions = [
    ['DSMP', 'DSQA', 'DSEM'],
    null,
    [],
    ['DSMP', 'DSQA', 'DSEM'],
    null,
    ['DSMP', 'DSQA', 'DSEM'],
    ['DSMP', 'DSQA', 'DSEM'],
  ];
  const monPlanRef = useRef(_.cloneDeep(rows));
  const qaTestSumRef = useRef(_.cloneDeep(rows));
  const emissionsRef = useRef(_.cloneDeep(rows));
  const checkedOutLocationsInCurrentSessionRef = useRef([]);
  const idToPermissionsMap = useRef(permissions);
  return (
    <DataTables
      monPlanState={monPlanState}
      setMonPlanState={setMonPlanState}
      monPlanRef={monPlanRef}
      qaTestSumState={qaTestSummaryState}
      setQaTestSumState={setQaTestSummaryState}
      qaTestSumRef={qaTestSumRef}
      emissionsState={emissionsState}
      setEmissionsState={setEmissionsState}
      emissionsRef={emissionsRef}
      permissions={idToPermissionsMap}
      updateFilesSelected={jest.fn()}
      checkedOutLocationsMap={checkedOutLocationsMap || new Map()}
      componentType={componentType}
      checkedOutLocationsInCurrentSessionRef={
        checkedOutLocationsInCurrentSessionRef
      }
    />
  );
};
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Additional DataTables Tests', () => {
  it('shows and hide properly', () => {
    let query = render(
      <Wrapper rows={_.cloneDeep(mockRows)} componentType="Submission" />
    );
    const showOrHideTableIcon =
      query.container.querySelectorAll(`.fa-chevron-up`)[0];
    act(() => userEvent.click(showOrHideTableIcon));
    act(() => userEvent.click(showOrHideTableIcon));
  });
  it('selects and unselects evaluation rows properly', () => {
    let query = render(
      <Wrapper rows={_.cloneDeep(mockRows)} componentType="Evaluation" />
    );
    const checkboxes = query.getAllByTestId('Checkbox');
    act(() => userEvent.click(checkboxes[0]));
    expect(checkboxes[0].checked).toBe(true)
    act(() => userEvent.click(checkboxes[0]));
    expect(checkboxes[0].checked).toBe(false)
    act(() => userEvent.click(checkboxes[0]));
    act(() => userEvent.click(checkboxes[1]));
    act(() => userEvent.click(checkboxes[2]));
    act(() => userEvent.click(checkboxes[3]));
    act(() => userEvent.click(checkboxes[1]));
    act(() => userEvent.click(checkboxes[2]));
    act(() => userEvent.click(checkboxes[3]));
    expect(checkboxes[3].checked).toBe(false)
  });

  it('selects and unselects submission rows properly', () => {
    let query = render(
      <Wrapper rows={_.cloneDeep(mockRows)} componentType="Submission" />
    );
    const checkboxes = query.getAllByTestId('Checkbox');
    act(() => userEvent.click(checkboxes[0]));
    expect(checkboxes[0].checked).toBe(true)
    act(() => userEvent.click(checkboxes[0]));
    expect(checkboxes[0].checked).toBe(false)
    act(() => userEvent.click(checkboxes[0]));
    act(() => userEvent.click(checkboxes[1]));
    act(() => userEvent.click(checkboxes[2]));
    act(() => userEvent.click(checkboxes[3]));
    act(() => userEvent.click(checkboxes[1]));
    act(() => userEvent.click(checkboxes[2]));
    act(() => userEvent.click(checkboxes[3]));
    expect(checkboxes[3].checked).toBe(false)
    // query.debug(undefined, 30000);
  });
});
