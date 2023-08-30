import { render as rtlRender, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

// AG: React testing component renderer. Should be used in place of actual render function from react testing library. 
const render = async (component, store, routerProps={}) =>
  store
    ? 
    await act(async () => {
      rtlRender(
        <Provider store={store}>
          <MemoryRouter {...routerProps}> {component}</MemoryRouter>
        </Provider>
      )
    })
    : 
    await act(async () => {
      rtlRender(<MemoryRouter {...routerProps}> {component}</MemoryRouter>)
    })

export default render;
