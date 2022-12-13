import React from "react";
import { render, act } from "@testing-library/react";
import MockPermissions from "./MockPermissions";
import ReviewAndSubmit from "./ReviewAndSubmit";
import configureStore from "../../store/configureStore.dev";
import { Provider } from "react-redux";

window.scrollTo = jest.fn();

jest.mock("../../utils/api/monitoringPlansApi", () => ({
  getMonitoringPlans: jest.fn().mockResolvedValue({
    data: [
      {
        id: "MOCK-1",
        active: true,
        facilityName: "Barry",
        name: "1",
        evalStatusCode: "PASS",
      },
      {
        id: "MOCK-2",
        active: true,
        facilityName: "Barry",
        name: "2",
        evalStatusCode: "ERR",
      },
      {
        id: "MOCK-3",
        active: false,
        facilityName: "Barry",
        name: "3",
        evalStatusCode: "PASS",
      },
    ],
  }),
}));

jest.mock("../../utils/api/qaCertificationsAPI", () => ({
  getQATestSummaryReviewSubmit: jest.fn().mockResolvedValue({
    data: [
      { id: "MOCK-1", facilityName: "Barry", name: "1" },
      { id: "MOCK-2", facilityName: "Barry", name: "2" },
      { id: "MOCK-3", facilityName: "Barry", name: "3" },
    ],
  }),
}));

jest.mock("../../utils/api/emissionsApi", () => ({
  getEmissionsReviewSubmit: jest.fn().mockResolvedValue({
    data: [
      { orisCode: "MOCK-1", facilityName: "Barry", configuration: "1" },
      { orisCode: "MOCK-2", facilityName: "Barry", configuration: "2" },
      { orisCode: "MOCK-3", facilityName: "Barry", configuration: "3" },
    ],
  }),
}));

jest.mock(
  "./ReviewAndSubmitForm/ReviewAndSubmitForm",
  () =>
    ({ showModal, queryCallback, setExcludeErrors, facilities }) => {
      return (
        <div>
          <button onClick={queryCallback}>FILTER</button>
          <button
            onClick={() => {
              showModal(true);
            }}
          >
            SUBMIT
          </button>
        </div>
      );
    }
);

jest.mock(
  "./ReviewAndSubmitTables/ReviewAndSubmitTables",
  () =>
    ({
      monPlanState,
      setMonPlanState,
      monPlanRef,
      qaTestSumState,
      setQaTestSumState,
      qaTestSumRef,
      permissions,
    }) => {
      return <div>{`MON PLAN LENGTH: ${monPlanState.length}`}</div>;
    }
);

jest.mock(
  "../SubmissionModal/SubmissionModal",
  () =>
    ({
      show,
      close,
      submissionCallback,
      monitorPlanIds,
      activityId,
      setActivityId,
    }) => {
      return (
        <div>
          <button onClick={submissionCallback}>SUBMIT MODAL</button>
        </div>
      );
    }
);
const store = configureStore();
describe("Review and Submit component", () => {
  let query;
  beforeEach(async () => {
    await act(async () => {
      query = render(
        <Provider store={store}>
          <ReviewAndSubmit />
        </Provider>
      );
    });
  });

  it("expect mock permissions to be defined", () => {
    expect(MockPermissions).toBeDefined();
  });

  it("execute mocks to call filter function, and determine if ReviewAndSubmit Table has correct data passed", async () => {
    const { getByText } = query;

    await act(async () => {
      getByText("FILTER").click();
    });

    expect(getByText("MON PLAN LENGTH: 1")).toBeInTheDocument();
  });

  it("execute mocks to call submission function, and determine if UI changes as a result", async () => {
    const { getByText, queryByText } = query;

    await act(async () => {
      getByText("SUBMIT").click();
    });

    await act(async () => {
      getByText("SUBMIT MODAL").click();
    });

    expect(queryByText("SUBMIT")).not.toBeInTheDocument();
  });
});
