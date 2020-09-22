import React from "react";

const TableBody = ({ getTableBodyProps, rows, prepareRow, bodyRef }) => (
  <tbody ref={bodyRef} {...getTableBodyProps()}>
    {rows.map((row, i) => {
      prepareRow(row);
      return (
        <tr {...row.getRowProps()}>
          {row.cells.map((cell) => {
            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
          })}
        </tr>
      );
    })}
  </tbody>
);

export default TableBody;
