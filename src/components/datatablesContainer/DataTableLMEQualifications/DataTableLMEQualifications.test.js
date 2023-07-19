import React from "react";
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "../../../store/configureStore.dev";

import * as monitorPlanApi from "../../../utils/api/monitoringPlansApi";

import { getMockLMEQualifications } from "./mocks";
import initialState from "../../../store/reducers/initialState";
import DataTableLMEQualifications from "./DataTableLMEQualifications";

const mockInitialState = JSON.parse(JSON.stringify(initialState))

mockInitialState.dropdowns.leeQualifications = [
  {
    parameterCode: "HG",
    unitsOfStandard: "LBTBTU",
    qualificationTestType: "INITIAL"
  },
]

const store = configureStore(mockInitialState);

describe("- DataTable LME Qualifications - ", () => {
  beforeEach(() => {
    jest.spyOn(monitorPlanApi, "getLMEQualifications").mockResolvedValue({ data: getMockLMEQualifications() });
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('renders rows from the data fetched', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <DataTableLMEQualifications updateLME={true} />
        </Provider>
      );
    });

    const rows = screen.getAllByRole('row');
    const numRows = getMockLMEQualifications().length + 1
    expect(rows.length).toBe(numRows);
  })
})