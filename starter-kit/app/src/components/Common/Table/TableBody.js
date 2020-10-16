import React from "react";

const TableBody = ({
  getTableBodyProps,
  rows,
  page,
  prepareRow,
  selectedRowHandler,
}) => (
  <tbody {...getTableBodyProps()}>
    {page.map((row, i) => {
      prepareRow(row);
      return (
        <tr {...row.getRowProps()} onClick={() => selectedRowHandler(3)}>
          {row.cells.map((cell) => {
            return (
              <td width={cell.column.width} {...cell.getCellProps()}>
                {cell.render("Cell")}
              </td>
            );
          })}
        </tr>
      );
    })}
  </tbody>
);

export default TableBody;
