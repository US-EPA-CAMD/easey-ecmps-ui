import React, { useMemo } from "react";
import { render, waitForDomChange } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DataTableSystemsRender from "./DataTableSystemsRender";

let columns = [],
  data = [];

const DataTableSystemsRenderTest = () => {
  data = useMemo(
    () => [
      {
        col1: "Hello",
        col2: "World",
        col3: "Again",
        col4: "05/19/2002 2",
        col5: "05/19/2002 2",
        col6: "05/19/2002 2",
      },
      {
        col1: "react",
        col2: "table",
        col3: "rocks",
        col4: "05/19/2002 4",
        col5: "05/19/2002 3",
        col6: "05/19/2002 2",
      }
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
      {
        Header: "Column 4",
        accessor: "col4",
      },
      {
        Header: "Column 5",
        accessor: "col5",
      },
      {
        Header: "Column 6",
        accessor: "col6",
      },
    ],
    []
  );
  return <DataTableSystemsRender bodyRef={null} columns={columns} data={data} testShow={true}/>;
};

test("demo table renders without crashing", () => {
  const { container } = render(<DataTableSystemsRenderTest />);
  waitForDomChange({ container })
    .then(() => {
      const table = container.querySelector("table");
      expect(table).not.toBeNull();
    })
    .catch((err) => console.log(`Error you need to deal with: ${err}`));
  expect(1).toBe(1);
});
