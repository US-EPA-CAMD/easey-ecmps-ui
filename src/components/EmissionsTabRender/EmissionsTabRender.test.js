import React from "react";
import { render, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "../../store/configureStore.dev";
import { EmissionsTabRender } from "./EmissionsTabRender";
import { mockEmissionsTabRenderProps } from "./mocks";

const store = configureStore(mockEmissionsTabRenderProps);

it("renders EmissionsTabRender", async () => {
  window.scrollTo = jest.fn();
  const { container } = await act(async () =>
    render(
      <Provider store={store}>
        <EmissionsTabRender {...mockEmissionsTabRenderProps} />
      </Provider>
    )
  );

  expect(container).toBeDefined();
});
