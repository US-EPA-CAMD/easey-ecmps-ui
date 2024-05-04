import React from "react";
import {
  DynamicTabs,
  mapDispatchToProps,
} from "./DynamicTabs";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";

import * as actions from "../../store/actions/dynamicFacilityTab";
import configureStore from "../../store/configureStore.dev";
import { getMockDynamicTabsProps } from "./mocks";

jest.mock("../../store/actions/dynamicFacilityTab");

const store = configureStore();

describe("testing a reusable Dynamic Tabs component", () => {

  test("renders the inital tab and its content", async () => {
    const dynamicTabs = <DynamicTabs {...getMockDynamicTabsProps()} />

    await act(async () => {
      render(
        <Provider store={store}>
          {dynamicTabs}
        </Provider>
      );
    })

    const tabs = screen.getAllByRole("button");
    const initTabContent = screen.getByText("Hello, Addis");
    expect(tabs).toHaveLength(4);
    expect(initTabContent).not.toBeUndefined();
  });

  test("mapDispatchToProps calls the appropriate action", async () => {
    // mock the 'dispatch' object
    const dispatch = jest.fn();
    const actionProps = mapDispatchToProps(dispatch);
    const formData = [];
    // verify the appropriate action was called
    actionProps.addFacility();
    expect(actions.addFacilityTab).toHaveBeenCalled();

    actionProps.removeFacility();
    expect(actions.removeFacilityTab).toHaveBeenCalled();

    actionProps.setActive();
    expect(actions.setActiveTab).toHaveBeenCalled();
  });
});
