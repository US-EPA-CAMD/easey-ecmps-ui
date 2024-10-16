import React from "react";
import { render } from "@testing-library/react";
import QACertTestSummaryTab from "./QACertTestSummaryTab";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

jest.mock("../QACertTestSummaryTabRender/QACertTestSummaryTabRender");

const initialState = {
  openedFacilityTabs: {
    qaCertTestSummary: [{ selectedConfig: { id: 5 } }],
  },
};

const mockStore = configureMockStore();
const store = mockStore(initialState);

describe("QACertTestSummaryTab", () => {
  test("renders without errors", () => {
    const { container } = render(
      <Provider store={store}>
        <QACertTestSummaryTab
          resetTimer={jest.fn()}
          setExpired={jest.fn()}
          resetTimerFlag={false}
          callApiFlag={false}
          orisCode={3}
          selectedConfigId={5}
          title={"test"}
          locations={[]}
          user={{ firstName: "test" }}
          isCheckedOut={false}
          activeTab={0}
          setSection={jest.fn()}
          setLocation={jest.fn()}
          checkedOutLocations={[]}
        />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });
});
