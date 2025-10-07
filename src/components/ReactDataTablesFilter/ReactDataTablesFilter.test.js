import React from "react";
import { render, fireEvent } from "@testing-library/react";

import FilterComponent from "./ReactDataTablesFilter";

describe("renders datatable search ", () => {
  test("clicks search btn", () => {
    const mockOnSearch = jest.fn();

    const { container } = render(
      <FilterComponent onSearch={mockOnSearch} title="test" />
    );

    const inputs = container.querySelectorAll(
      "#search-desktop-data, #search-tablet-data, #search-mobile-data"
    );

    inputs.forEach((element) => {
      fireEvent.change(element, { target: { value: "hello" } });
      fireEvent.keyDown(element, { keyCode: 13, key: "Enter" });
      fireEvent.keyDown(element, { keyCode: 9, key: "Tab" });
    });

    expect(inputs.length).toBeGreaterThan(0);
  });
});
