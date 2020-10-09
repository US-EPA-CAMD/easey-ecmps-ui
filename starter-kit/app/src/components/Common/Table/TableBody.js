import React from "react";

const TableBody = ({ getTableBodyProps, rows, page, prepareRow }) => (
  <tbody {...getTableBodyProps()}>
    {page.map((row, i) => {
      prepareRow(row);
      return (
        <tr {...row.getRowProps()}>
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
