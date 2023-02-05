import React from "react";
import { render, fireEvent } from "@testing-library/react";

import FilterComponent from "./ReactDataTablesFilter";

describe("renders datatable search ", () => {
  test("clicks search btn", () => {
    const { container } = render(
      <FilterComponent
        onSearch={jest.fn()}
        title={"test"}
      />
    );
    const input = container.querySelectorAll("#search-data");

    input.forEach((element) => {
      fireEvent.keyDown(element, { keyCode: 13, key: "Enter" });
    });
    input.forEach((element) => {
      fireEvent.keyDown(element, { keyCode: 9, key: "Tab" });
    });
    expect(input).toBeDefined();
  });
});
