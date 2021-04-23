import React from "react";
import Details from "./Details";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, fireEvent } from "@testing-library/react";

let data = [];
beforeAll(() => {
  const myInitialState = null;
  React.useState = jest.fn().mockReturnValue([myInitialState, {}]);
  data = [
    { header: "System ID", value: "AF1" },
    { header: "System Type", value: "GAS" },
    { header: "System Designation", value: "P" },
    { header: "Fuel Type", value: "PNG" },
    { header: "Begin Date and Time", value: "07/01/2019 0" },
    { header: "End Date and Time", value: " " },
  ];
});

describe("testing the creation of a modal", () => {
  test("testing clicking and tabbing between btns ", () => {
    const stateSetter = jest.fn()
    jest
      .spyOn(React, "useState")
      .mockImplementation((stateValue) => [(stateValue =null), stateSetter]);
    const { getByText } = render(<Details modalData={data} />);
  });
});
