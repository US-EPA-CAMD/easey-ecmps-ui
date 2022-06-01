import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import GenericTable from "./GenericTable";

describe("testing generictable component ", () => {
  test("renders the content of generictable component", () => {
    const data = [
      { Name: "Abc", Age: 15, Location: "Bangalore" },
      {
        Name: "Def",
        Age: 43,
        Location: "Mumbaissssssssssssssssssssssssssssssssss",
      },
      { Name: "Uff", Age: 30, Location: "Chennai" },
      { Name: "Ammse", Age: 87, Location: "Delhi" },
      { Name: "Yysse", Age: 28, Location: "Hyderabad" },
    ];
    const { container, getAllByText, getByText } = render(
      <GenericTable
        title={"test"}
        data1={data}
        expandable
        additionalTitle={"test1"}
      />
    );
    const renderedComponent = container.querySelector(".genericTable");

    expect(renderedComponent).not.toBeUndefined();
  });

  test("renders the content of empty data component", () => {
    const data = [{ Name: "", Location: "" }];
    const { container, getAllByText, getByText } = render(
      <GenericTable
        // title={"test"}
        data1={data}
        // additionalTitle={"test1"}
      />
    );
    const renderedComponent = container.querySelector(".genericTable");
    expect(renderedComponent).not.toBeUndefined();
  });
});
