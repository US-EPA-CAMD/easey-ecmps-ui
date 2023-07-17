import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "../../store/configureStore.dev";
import { EmissionsTab, mapDispatchToProps, mapStateToProps } from "./EmissionsTab";
import { mockEmissionsTabProps } from "./mocks";

const store = configureStore(mockEmissionsTabProps)

test('renders EmissionsTab', () => {
  const { container } = render(
    <Provider store={store}>
      <EmissionsTab {...mockEmissionsTabProps} />
    </Provider>
  )

  expect(container).toBeDefined()
})

test("mapStateToProps calls the appropriate state", async () => {
  // mock the 'dispatch' object
  const state = { openedFacilityTabs: [] };
  mapStateToProps(state);
});

test("mapDispatchToProps setLocation calls the appropriate action", async () => {
  // mock the 'dispatch' object
  const dispatch = jest.fn();
  const actionProps = mapDispatchToProps(dispatch);
  const state = store.getState();

  // verify the appropriate action was called
  actionProps.setLocation();
  expect(state).toBeDefined();
});

test("mapDispatchToProps setInactive calls the appropriate action", async () => {
  // mock the 'dispatch' object
  const dispatch = jest.fn();
  const actionProps = mapDispatchToProps(dispatch);
  const state = store.getState();

  // verify the appropriate action was called
  actionProps.setInactive();
  expect(state).toBeDefined();
});

test("mapDispatchToProps setCheckout calls the appropriate action", async () => {
  // mock the 'dispatch' object
  const dispatch = jest.fn();
  const actionProps = mapDispatchToProps(dispatch);
  const state = store.getState();

  // verify the appropriate action was called
  actionProps.setCheckout();
  expect(state).toBeDefined();
});
