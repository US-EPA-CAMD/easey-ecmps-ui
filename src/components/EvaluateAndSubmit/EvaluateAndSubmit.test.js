import React from "react";
import { render, act } from "@testing-library/react";
import MockPermissions from "./MockPermissions";
import EvaluateAndSubmit from "./EvaluateAndSubmit";
import configureStore from "../../store/configureStore.dev";
import { Provider } from "react-redux";

sessionStorage.setItem(
  "cdx_user",
  '{ "firstName": "mock", "lastName": "mock" }'
);

window.scrollTo = jest.fn();
window.location.reload = jest.fn();

jest.mock("../../utils/api/camdServices", () => ({
  submitData: jest.fn().mockReturnValue({
    then: jest.fn().mockReturnValue({ catch: jest.fn() }),
  }),
}));

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
  "./FilterForm/FilterForm",
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
  "./DataTables/DataTables",
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
  let query, user;
  beforeEach(async () => {
    user = { userId: "mock", firstName: "mock", lastName: "mock" };
    await act(async () => {
      query = render(
        <Provider store={store}>
          <EvaluateAndSubmit user={user} />
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
    const { getByText, queryByText, getAllByText } = query;

    await act(async () => {
      getAllByText("SUBMIT")[0].click();
    });

    await act(async () => {
      getByText("SUBMIT MODAL").click();
    });

    expect(queryByText("SUBMIT")).not.toBeInTheDocument();
  });

  it("mock the final submission process", async () => {
    const { getByText, getAllByText } = query;

    await act(async () => {
      getAllByText("SUBMIT")[0].click();
    });

    await act(async () => {
      getByText("SUBMIT MODAL").click();
    });

    await act(async () => {
      getAllByText("Submit")[0].click();
    });
    expect(getAllByText("Submit")[0]).toBeInTheDocument();
  });

  it("mock an evaluation component instead of submission", async () => {
    let query;

    user = { userId: "mock", firstName: "mock", lastName: "mock" };
    await act(async () => {
      query = render(
        <Provider store={store}>
          <EvaluateAndSubmit user={user} componentType="Evaluate" />
        </Provider>
      );
    });

    const { getByText, getAllByText } = query;

    expect(getAllByText("Evaluate")[0]).toBeInTheDocument();
  });
});
