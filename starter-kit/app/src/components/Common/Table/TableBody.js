import React from "react";
import "./TableBody.css";
const TableBody = ({
  getTableBodyProps,
  rows,
  page,
  prepareRow,
  selectedRowHandler,
  dataSelector,
  toggleRowSelected,
}) => {
  // just turns on react-table row selected to handle future css
  const rowSelection = (row) => {
    toggleRowSelected(row.id, true);
  };
  const handleDataSelector = (data) => {
    if (!selectedRowHandler) return;
    if (!dataSelector) {
      return selectedRowHandler(data[0].value);
    }
    data.forEach((element) => {
      if (element.column.Header == dataSelector) {
        return selectedRowHandler(element.value);
      }
    });
  };
  return (
    <tbody {...getTableBodyProps()}>
      {page.map((row, i) => {
        prepareRow(row);
        return (
          <tr
            key={row.id}
            {...row.getRowProps()}
            onClick={() => {
              rowSelection(row);
              handleDataSelector(row.cells);
            }}
          >
            {row.cells.map((cell) => {
              return (
                <td
                  width={cell.column.width}
                  {...cell.getCellProps()}
                  className={`${
                    row.isSelected ? "selected hovered" : "hovered"
                  }`}
                >
                  {cell.render("Cell")}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
