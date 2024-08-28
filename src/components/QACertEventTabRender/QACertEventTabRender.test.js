import React from "react";
import { Provider } from "react-redux";
import configureStore from "../../store/configureStore.dev";
import { render } from "@testing-library/react";
import QACertEventTabRender from "./QACertEventTabRender";

const selectedConfig = {
  id: "TWCORNEL5-488E42008B434177BC7D7BFF138D18EF",
  facId: 1,
  facilityName: "Barry",
  configTypeCode: null,
  lastUpdated: null,
  updatedStatusFlag: "Y",
  needsEvalFlag: null,
  checkSessionId: null,
  orisCode: 3,
  name: "5",
  beginReportPeriodId: 108,
  endReportPeriodId: null,
  active: true,
  pendingStatusCode: null,
  evalStatusCode: null,
  unitStackConfigurations: [],
  monitoringLocationData: [
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
    {
      id: "11",
      unitRecordId: 5,
      unitId: "5",
      stackPipeRecordId: null,
      stackPipeId: null,
      name: "5",
      type: "unit",
      active: true,
      activeDate: null,
      retireDate: null,
      nonLoadBasedIndicator: 0,
    },
  ],
  userId: "bvick",
  addDate: "2019-10-28T10:11:00.000Z",
  updateDate: "2022-07-26T12:10:00.000Z",
  submissionId: 1527678,
  submissionAvailabilityCode: "UPDATED",
  lastEvaluatedDate: "2022-10-25T15:45:00.000Z",
};

const store = configureStore({
  monitoringPlans: {
    [selectedConfig.orisCode]: [selectedConfig],
  },
});

jest.mock("../QACertEventHeaderInfo/QACertEventHeaderInfo", () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
  };
});
jest.mock(
  "../qaDatatablesContainer/QACertEventTestExmpDataTable/QACertEventTestExmpDataTable",
  () => {
    return {
      __esModule: true,
      default: () => {
        return <div />;
      },
    };
  }
);

describe("QACertEventTabRender", () => {
  test("renders without errors", () => {
    const { container } = render(
      <Provider store={store}>
        <QACertEventTabRender
          title={"Barry (5)"}
          locationSelect={[0, "6"]}
          selectedConfigId={selectedConfig.id}
          orisCode={3}
          setCheckout={jest.fn()}
          workspaceSection={"qaCertEvent"}
          setSectionSelect={jest.fn()}
          sectionSelect={[0, "QA Certification Event"]}
          setSelectedTestCode={jest.fn()}
          selectedTestCode={3}
          selectionSelect={[0, "QA Certification Event"]}
        />
      </Provider>
    );
    expect(container).toBeDefined();
  });
});
