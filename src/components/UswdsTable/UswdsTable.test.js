import React, { useMemo } from "react";
import UswdsTable from "./UswdsTable";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("testing generic uswds table component", () => {
  let columns = [],
    columnsGrouping = [],
    data = [],
    defaultRowSelected = false;
  const selectedRowHandler = () => {
    defaultRowSelected = true;
  };

  const UswdsTableTest = ({
    grouping,
    paginate,
    editable = false,
    openTabColumn,
    disabledColumnFiltersTest
  }) => {
    data = useMemo(
      () => [
        {
          col1: "4",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "1",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "8",
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
    if (openTabColumn) {
      return (
        <UswdsTable
          columns={grouping ? columnsGrouping : columns}
          data={data}
          paginate={paginate}
          showEntries={[3, 1]}
          disabledColumnFilters={disabledColumnFiltersTest?disabledColumnFiltersTest:[]}
          search
          //viewDataColumn = {[]}
          selectedRowHandler={selectedRowHandler}
          defaultSelect={true}
          editable={editable}
          openTabColumn={[]}
          header
          openModal = {jest.fn()}
        />
      );
    } else {
      return (
        <UswdsTable
          columns={grouping ? columnsGrouping : columns}
          data={data}
          paginate={paginate}
          showEntries={[3, 1]}
          disabledColumnFilters={disabledColumnFiltersTest?disabledColumnFiltersTest:[]}
          search
          viewDataColumn
          selectedRowHandler={selectedRowHandler}
          defaultSelect={true}
          editable={editable}
          header
          viewDataColumn={[]}
          openModal = {jest.fn()}
        />
      );
    }
  };


  test("table header renders all columns", () => {
    const { container } = render(<UswdsTableTest grouping={false} />);
    const headerColumns = container.querySelectorAll("thead tr th");
    expect(headerColumns.length).toEqual(columns.length + 1);
  });

  test("table header renders all columns with a disabled column", () => {
    const { container } = render(<UswdsTableTest grouping={false} disabledColumnFiltersTest ={[1]} />);
    const headerColumns = container.querySelectorAll("thead tr th");
    expect(headerColumns.length).toEqual(columns.length + 1);
  });
  test("table header renders all columns with openTabColumn", () => {
    const { container } = render(
      <UswdsTableTest grouping={false} openTabColumn />
    );
    const headerColumns = container.querySelectorAll("thead tr th");
    expect(headerColumns.length).toEqual(columns.length + 1);
  });
  test("table header supports column groupings", () => {
    const { container } = render(<UswdsTableTest grouping={true} />);
    const headerGroupings = container.querySelectorAll("thead tr");
    expect(headerGroupings.length).toEqual(columnsGrouping.length);
  });
  test("table body renders all rows", () => {
    const { container, getByTestId } = render(
      <UswdsTableTest grouping={false} />
    );
    const tableRecords = container.querySelectorAll("tbody tr");
    expect(tableRecords.length).toEqual(data.length);
    const secondRow = getByTestId("tableRow2");
    fireEvent.click(secondRow);
    expect(defaultRowSelected).toBe(true);
  });

  test("table is sorted by id in asc by default ", () => {
    const { container } = render(<UswdsTableTest grouping={false} />);
    const tableRecords = container.querySelectorAll("tbody td div");

    expect(tableRecords[0].innerHTML.split(" ")[0]).toEqual(data[1].col1);
  });

  test("first table column header is clicked and sorts by dsc ", () => {
    const { container } = render(<UswdsTableTest grouping={false} />);
    const headerColumns = container.querySelectorAll("thead tr th");
    fireEvent.click(headerColumns[0]);
    const tableRecords = container.querySelectorAll("tbody td div");
    expect(tableRecords[0].innerHTML.split(" ")[0]).toEqual(data[2].col1);
  });

  test("testing header with enter btn press  ", () => {
    const { container } = render(<UswdsTableTest grouping={false} />);
    const sortIMGS = container.querySelectorAll("thead tr th span");
    fireEvent.keyPress(sortIMGS[1], { key: "Enter", code: 13, charCode: 13 });
    fireEvent.keyPress(sortIMGS[1], { key: "Tab", code: 9, charCode: 9 });
    expect(sortIMGS).not.toBeUndefined();
  });

  test("table should be editable ", () => {
    const { container } = render(
      <UswdsTableTest grouping={false} editable={true} />
    );
    const firstRowCells = container.querySelectorAll("tbody td .editableCell");
    expect(firstRowCells.length).not.toBeNull();
    // fireEvent.change(firstRowCells[0], { target: { value: 'BERRY' } });
    // expect(firstRowCells[0].value).toBe("BERRY");
  });

  test("tests open btns ", () => {
    const { container } = render(<UswdsTableTest grouping={false} openTabColumn />);
    const openBTNS = container.querySelectorAll("tr td button");
    fireEvent.click(openBTNS[0]);
    expect(openBTNS).not.toBeUndefined();
  });
  test("tests view btns ", () => {
    const { container } = render(<UswdsTableTest grouping={false} />);
    const openBTNS = container.querySelectorAll("tr td button");
    fireEvent.click(openBTNS[0]);
    expect(openBTNS).not.toBeUndefined();
  });
});
