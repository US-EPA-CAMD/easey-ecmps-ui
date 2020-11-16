import React from "react";
import { render } from "@testing-library/react";
import { DataTable } from "./DataTable";

//testing redux connected component to mimic props passed as argument
function componentRenderer(args) {
  const defualtProps = {
    facilities: [
      { orisCode: 3, name: "Barry", state: { name: "Alabama" } },
      { orisCode: 8, name: "Gorgas", state: { name: "Alabama" } },
      { orisCode: 9, name: "Copper Station", state: { name: "Washington" } },
    ],
    loadFacilitiesData: jest.fn(),
    loading: false,
  };

  const props = { ...defualtProps, ...args };
  return render(<DataTable {...props} />);
}

test("testing redux connected data-table component renders all columns", () => {
  const { container } = componentRenderer();
  const headerColumns = container.querySelectorAll("thead tr th");
  expect(headerColumns.length).toEqual(3);
});
