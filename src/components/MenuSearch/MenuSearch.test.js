import React from "react";
import MenuSearch from "./MenuSearch";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("testing menu search bar ", () => {
  test("should open a new window ", () => {
    const { getByTestId } = render(<MenuSearch />);
    const searchBox = getByTestId("input-search");
    fireEvent.change(searchBox, { target: { value: "test" } });
    window.open = jest.fn();

    fireEvent.click(getByTestId("input-button-search"));
    expect(window.open).toBeCalled();
  });
});
