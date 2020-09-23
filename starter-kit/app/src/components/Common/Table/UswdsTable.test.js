import React, { useMemo } from "react";
import UswdsTable from "./UswdsTable";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("testing generic uswds table component", () => {
  let columns = [],
    columnsGrouping = [],
    data = [];

  const UswdsTableTest = ({ grouping }) => {
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
    columnsGrouping = useMemo(
      () => [
        {
          Header: "Column 1",
          accessor: "col1",
        },
        {
          Header: "Column 2",
          columns: [
            {
              Header: "Column 2:1",
              accessor: "col2",
            },
            {
              Header: "Column 2:2",
              accessor: "col3",
            },
          ],
        },
      ],
      []
    );
    return (
      <UswdsTable columns={grouping ? columnsGrouping : columns} data={data} />
    );
  };

  test("table header renders all columns", () => {
    const { container } = render(<UswdsTableTest grouping={false} />);
    const headerColumns = container.querySelectorAll("thead tr th");
    expect(headerColumns.length).toEqual(columns.length);
  });
  test("table header supports column groupings", () => {
    const { container } = render(<UswdsTableTest grouping={true} />);
    const headerGroupings = container.querySelectorAll("thead tr");
    expect(headerGroupings.length).toEqual(columnsGrouping.length);
  });
  test("table body renders all rows", () => {
    const { container } = render(<UswdsTableTest grouping={false} />);
    const tableRecords = container.querySelectorAll("tbody tr");
    expect(tableRecords.length).toEqual(data.length);
  });
});
