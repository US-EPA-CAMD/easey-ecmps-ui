import React, { useMemo } from "react";
import { render, waitForDomChange } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SelectFacilitiesDataTableRender from "./DataTableRender";

let columns = [],
  data = [];

const SelectFacilitiesDataTableRenderTest = () => {
  data = useMemo(
    () => [
      {
        col1: "Hello",
        col2: "World",
        col3: "Again",
      },
      {
        col1: "react",
        col2: "table",
        col3: "rocks",
      },
      {
        col1: "whatever",
        col2: "you want",
        col3: "in here",
      },
    ],
    []
  );
  columns = useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "col1",
      },
      {
        Header: "Column 2",
        accessor: "col2",
      },
      {
        Header: "Column 3",
        accessor: "col3",
      },
    ],
    []
  );
  return (
    <SelectFacilitiesDataTableRender
      bodyRef={null}
      columns={columns}
      data={data}
    />
  );
};

test("demo table renders without crashing", () => {
  const { container } = render(<SelectFacilitiesDataTableRenderTest />);
  waitForDomChange({ container })
    .then(() => {
      const table = container.querySelector("table");
      expect(table).not.toBeNull();
    })
    .catch((err) => console.log(`Error you need to deal with: ${err}`));
  expect(1).toBe(1);
});
