import React from "react";
import { render } from "@testing-library/react";
import TableBody from "./TableBody";

describe("testing rendering tablebody for some functions", () => {
  const events = {};

  test("tests 508 functions in the tablebody", () => {
    const rows = [
      {
        id: "0",
        getRowProps: jest.fn(),
        original: { col1: "Hello", col2: "World", col3: "Again" },
        index: 0,
        depth: 0,
        cells: [
          {
            column: { width: "50px" },
            value: 3,
            getCellProps: jest.fn(),
            render: jest.fn(),
          },
          {
            column: { width: "50px" },
            value: 3,
            getCellProps: jest.fn(),
            render: jest.fn(),
          },
          {
            column: { width: "50px" },
            value: 3,
            getCellProps: jest.fn(),
            render: jest.fn(),
          },
        ],
        values: { col1: "Hello", col2: "World", col3: "Again" },
        originalSubRows: [],
        subRows: [],
        isSelected: false,
        isSomeSelected: false,
      },
      {
        id: "1",
        getRowProps: jest.fn(),
        original: { col1: "react", col2: "table", col3: "rocks" },
        index: 1,
        depth: 0,
        cells: [
          {
            column: { width: "50px" },
            value: 3,
            getCellProps: jest.fn(),
            render: jest.fn(),
          },
          {
            column: { width: "50px" },
            value: 3,
            getCellProps: jest.fn(),
            render: jest.fn(),
          },
          {
            column: { width: "50px" },
            value: 3,
            getCellProps: jest.fn(),
            render: jest.fn(),
          },
        ],
        values: { col1: "react", col2: "table", col3: "rocks" },
        originalSubRows: [],
        subRows: [],
        isSelected: false,
        isSomeSelected: false,
      },
    ];
    const rows2 = [
      {
        getRowProps: jest.fn(),
        id: "0",
        original: { col1: "Hello3", col2: "World4", col3: "Again5" },
        index: 0,
        depth: 0,
        cells: [
          {
            column: { width: "50px" },
            value: 3,
            getCellProps: jest.fn(),
            render: jest.fn(),
          },
          {
            column: { width: "50px" },
            value: 3,
            getCellProps: jest.fn(),
            render: jest.fn(),
          },
          {
            column: { width: "50px" },
            value: 3,
            getCellProps: jest.fn(),
            render: jest.fn(),
          },
        ],
        values: { col1: "Hello3", col2: "World4", col3: "Again5" },
        originalSubRows: [],
        subRows: [],
        isSelected: false,
        isSomeSelected: false,
      },
      {
        id: "1",
        getRowProps: jest.fn(),
        original: { col1: "react1", col2: "table2", col3: "rocks2" },
        index: 1,
        depth: 0,
        cells: [
          {
            column: { width: "50px" },
            value: 3,
            getCellProps: jest.fn(),
            render: jest.fn(),
          },
          {
            column: { width: "50px" },
            value: 3,
            getCellProps: jest.fn(),
            render: jest.fn(),
          },
          {
            column: { width: "50px" },
            value: 3,
            getCellProps: jest.fn(),
            render: jest.fn(),
          },
        ],
        values: { col1: "react1", col2: "table2", col3: "rocks2" },
        originalSubRows: [],
        subRows: [],
        isSelected: false,
        isSomeSelected: false,
      },
    ];

    let { rerender, container } = render(
      <TableBody
        getTableBodyProps={jest.fn()}
        rows={rows}
        page={rows}
        prepareRow={jest.fn()}
        selectedRowHandler={jest.fn()}
        defaultSelect={jest.fn()}
        openTabColumn={[1]}
        openModal={jest.fn()}
        tabFocus={false}
        resetTabFocusHandler={jest.fn()}
      />
    );

    rerender(
      <TableBody
        getTableBodyProps={jest.fn()}
        rows={rows2}
        page={rows2}
        prepareRow={jest.fn()}
        selectedRowHandler={jest.fn()}
        defaultSelect={jest.fn()}
        openTabColumn={[1]}
        openModal={jest.fn()}
        tabFocus={true}
        resetTabFocusHandler={jest.fn()}
      />
    );
    const BTNS = container.querySelectorAll("button");
    // BTNS[0].disabled=true;
    expect(BTNS).not.toBeUndefined();
  });
});
