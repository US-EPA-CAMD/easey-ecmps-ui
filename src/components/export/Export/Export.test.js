import React from "react";
import {
  render,
  waitForElement,
  screen,
  fireEvent,
} from "@testing-library/react";

import Export from "./Export";
import { Provider } from "react-redux";
import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";

initialState.openedFacilityTabs.export = [
  {
    orisCode: 3,
    checkout: false,
    name: "Barry (1, 2, CS0AAN) ",
    location: [0, "6"],
    section: [4, "Methods"],
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
    exportState: {
      checkedDataTypes: ["monitoring-plan"],
      reportingPeriodId: 118,
    },
  },
];
let store = configureStore(initialState);
//testing redux connected component to mimic props passed as argument
const componentRenderer = () => {
  const props = {
    orisCode: 51,
    selectedConfig: initialState.openedFacilityTabs.export[0].selectedConfig,
    title: "Barry (1, 2, CS0AAN)",
  };
  return render(
    <Provider store={store}>
      <Export {...props} />
    </Provider>
  );
};

test("testing Export component renders with no errors", async () => {
  let { container } = await waitForElement(() => componentRenderer());
  expect(container).toBeDefined();
});
