import React from 'react';
import { render, act } from '@testing-library/react';

import DataTables from './DataTables';
import userEvent from '@testing-library/user-event';

let mockRowState = {
  submissionAvailabilityCode: 'REQUIRE',
  checkedOut: false,
  userCheckedOut: false,
  evalStatusCode: 'PASS',
  orisCode: 1,
};

jest.mock('../TableRender/TableRender', () => {
  const { forwardRef } = jest.requireActual('react'); //Need this to mock a forwardRef
  return {
    __esModule: true,
    default: forwardRef(({ getRowState, updateMonPlanRow, type }, mockRef) => (
      <div>
        <button>{`${type}:${getRowState(mockRowState, 'MP')}`}</button>
        <button
          onClick={() => {
            updateMonPlanRow('testId', true);
          }}
        >
          {`${type}:SELECT MON PLAN ROW`}
        </button>
      </div>
    )),
  };
});

describe('Review and Submit Tables component', () => {
  it('expect initial loading state to be correct for submission', async () => {
    let query = render(
      <DataTables
        monPlanState={[]}
        setMonPlanState={jest.fn()}
        monPlanRef={{
          current: [
            {
              selected: false,
              userCheckedOut: false,
              monPlanId: 'testId',
              orisCode: 1,
            },
          ],
        }}
        permissions={{ current: { 1: ['DSMP'] } }}
        updateFilesSelected={jest.fn()}
        componentType="Submission"
        checkedOutLocationsMap={[]}
      />
    );

    const { getByText } = query;
    expect(getByText('MP:Checkbox')).toBeInTheDocument();
    expect(getByText('MP:SELECT MON PLAN ROW')).toBeInTheDocument();
  });

  it('expect lock to be shown if record is checked out', async () => {
    mockRowState = {
      submissionAvailabilityCode: 'REQUIRE',
      checkedOut: true,
      userCheckedOut: false,
      evalStatusCode: 'PASS',
      orisCode: 1,
    };

    let { getByText } = render(
      <DataTables
        monPlanState={[]}
        setMonPlanState={jest.fn()}
        monPlanRef={{
          current: [
            {
              selected: false,
              userCheckedOut: false,
              monPlanId: 'testId',
              orisCode: 1,
            },
          ],
        }}
        permissions={{ current: { 1: ['DSMP'] } }}
        updateFilesSelected={jest.fn()}
        componentType="Submission"
        checkedOutLocationsMap={[]}
      />
    );

    expect(getByText('MP:Lock')).toBeInTheDocument();
  });

  it('expect view button to show if record is open but does not require submissions', async () => {
    mockRowState = {
      submissionAvailabilityCode: 'UPDATED',
      checkedOut: false,
      userCheckedOut: false,
      evalStatusCode: 'PASS',
      orisCode: 1,
    };

    let { getByText } = render(
      <DataTables
        monPlanState={[]}
        setMonPlanState={jest.fn()}
        monPlanRef={{
          current: [
            {
              selected: false,
              userCheckedOut: false,
              monPlanId: 'testId',
              orisCode: 1,
            },
          ],
        }}
        permissions={{ current: { 1: ['DSMP'] } }}
        updateFilesSelected={jest.fn()}
        componentType="Submission"
        checkedOutLocationsMap={[]}
      />
    );

    expect(getByText('MP:View')).toBeInTheDocument();
  });

  it('expect selection of a monitor plan row to work', async () => {
    mockRowState = {
      submissionAvailabilityCode: 'REQUIRE',
      checkedOut: false,
      userCheckedOut: false,
      evalStatusCode: 'PASS',
      orisCode: 1,
    };

    const currentRef = {
      current: [
        {
          selected: false,
          userCheckedOut: false,
          monPlanId: 'testId',
          orisCode: 1,
          evalStatusCode: 'PASS',
        },
      ],
    };

    let { getByText } = render(
      <DataTables
        monPlanState={[]}
        setMonPlanState={jest.fn()}
        monPlanRef={currentRef}
        permissions={{ current: { 1: ['DSMP'] } }}
        updateFilesSelected={jest.fn()}
        componentType="Submission"
        checkedOutLocationsMap={[]}
      />
    );

    await act(async () => {
      getByText('MP:SELECT MON PLAN ROW').click();
    });

    expect(currentRef.current[0].selected).toBe(true);
  });

  it('expect initial loading state to be correct for evaluate checkbox', async () => {
    mockRowState = {
      submissionAvailabilityCode: 'REQUIRE',
      checkedOut: false,
      userCheckedOut: false,
      evalStatusCode: 'EVAL',
      orisCode: 1,
    };

    let query = render(
      <DataTables
        monPlanState={[]}
        setMonPlanState={jest.fn()}
        monPlanRef={{
          current: [
            {
              selected: false,
              userCheckedOut: false,
              monPlanId: 'testId',
              orisCode: 1,
            },
          ],
        }}
        permissions={{ current: { 1: ['DSMP'] } }}
        updateFilesSelected={jest.fn()}
        componentType="Evaluate"
        checkedOutLocationsMap={[]}
      />
    );

    const { getByText } = query;
    expect(getByText('MP:Checkbox')).toBeInTheDocument();
    expect(getByText('MP:SELECT MON PLAN ROW')).toBeInTheDocument();
  });

  it('expect initial loading state to be correct for evaluate lock', async () => {
    mockRowState = {
      submissionAvailabilityCode: 'REQUIRE',
      checkedOut: true,
      userCheckedOut: false,
      evalStatusCode: 'EVAL',
      orisCode: 1,
    };

    let query = render(
      <DataTables
        monPlanState={[]}
        setMonPlanState={jest.fn()}
        monPlanRef={{
          current: [
            {
              selected: false,
              userCheckedOut: false,
              monPlanId: 'testId',
              orisCode: 1,
            },
          ],
        }}
        permissions={{ current: { 1: ['DSMP'] } }}
        updateFilesSelected={jest.fn()}
        componentType="Evaluate"
        checkedOutLocationsMap={[]}
      />
    );

    const { getByText } = query;
    expect(getByText('MP:Lock')).toBeInTheDocument();
    expect(getByText('MP:SELECT MON PLAN ROW')).toBeInTheDocument();
  });

  it('expect initial loading state to be correct for evaluate view button', async () => {
    mockRowState = {
      submissionAvailabilityCode: 'REQUIRE',
      checkedOut: false,
      userCheckedOut: false,
      evalStatusCode: 'PASS',
      orisCode: 1,
    };

    let query = render(
      <DataTables
        monPlanState={[]}
        setMonPlanState={jest.fn()}
        monPlanRef={{
          current: [
            {
              selected: false,
              userCheckedOut: false,
              monPlanId: 'testId',
              orisCode: 1,
            },
          ],
        }}
        permissions={{ current: { 1: ['DSMP'] } }}
        updateFilesSelected={jest.fn()}
        componentType="Evaluate"
        checkedOutLocationsMap={[]}
      />
    );

    const { getByText } = query;
    expect(getByText('MP:View')).toBeInTheDocument();
    expect(getByText('MP:SELECT MON PLAN ROW')).toBeInTheDocument();
  });
});

describe('ShowOrHideTable Test', () => {
  it('Shows and hides tables properly', async () => {
    let query = render(
      <DataTables
        monPlanState={[]}
        setMonPlanState={jest.fn()}
        monPlanRef={{
          current: [
            {
              selected: false,
              userCheckedOut: false,
              monPlanId: 'testId',
              orisCode: 1,
            },
          ],
        }}
        permissions={{ current: { 1: ['DSMP'] } }}
        updateFilesSelected={jest.fn()}
        componentType="Submission"
        checkedOutLocationsMap={[]}
      />
    );
    const showOrHideTableIcon =
      query.container.querySelectorAll(`.fa-chevron-up`)[0];
    await act(async () => await userEvent.click(showOrHideTableIcon));
    await act(async () => await userEvent.click(showOrHideTableIcon));
  });
});
