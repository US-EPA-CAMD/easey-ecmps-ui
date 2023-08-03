import React from "react";
import { useSuppressionFiltersStore } from "./error-suppression-context";
import { render } from "@testing-library/react";

const getHookValue = () => {
  const returnVal = {};

  const TestComponent = () => {
    Object.assign(returnVal, useSuppressionFiltersStore());
    return null;
  };

  render(<TestComponent />);

  return returnVal;
};

describe("useSuppressionFiltersStore hook", () => {
  it("has the correct number of fields", () => {
    const filters = getHookValue();
    expect(Object.keys(filters).length).toBe(24);
  });
});
