import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SelectFacilitiesDataTable } from "./DataTable";

//testing redux connected component to mimic props passed as argument
function componentRenderer(args) {
  const defualtProps = {
    facilities: [
      { orisCode: 3, name: "Barry", state: "Alabama" },
      { orisCode: 8, name: "Gorgas", state: "Alabama" },
      { orisCode: 9, name: "Copper Station", state: "Washington" },
    ],
    addTabs: jest.fn(),
    loadFacilitiesData: jest.fn(),
    loading: false,
  };

  const props = { ...defualtProps, ...args };
  return render(<SelectFacilitiesDataTable {...props} />);
}

function componentRendererNoData(args) {
  const defualtProps = {
    facilities: [],
    loadFacilitiesData: jest.fn(),
    loading: true,
  };

  const props = { ...defualtProps, ...args };
  return render(<SelectFacilitiesDataTable {...props} />);
}

test("testing redux connected data-table component renders all records", () => {
  const { container } = componentRenderer();
  const headerColumns = container.querySelectorAll("tbody tr");
  fireEvent.click(screen.getByText("Barry"));
  expect(headerColumns.length).toEqual(3);
});
test("testing redux connected data-table component renders no records", () => {
  const { container } = componentRendererNoData();
  expect(screen.getByText("Loading list of facilities...")).toBeInTheDocument();
});
