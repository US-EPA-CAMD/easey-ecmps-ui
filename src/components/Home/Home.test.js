import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";
import { Provider } from "react-redux";
import configureStore from "../../store/configureStore.dev";

describe("testing Home component for Monitoring Plan Viewer", () => {
  const store = configureStore();
  test("renders the content of Home component", () => {
    const { container, getAllByText, getByText } = render(<Provider store={store}><Home/></Provider>);
    const renderedComponent = container.querySelector(".home-container");
    expect(renderedComponent).not.toBeUndefined();
  });
});
