import React from "react";
import './TableBody.css'
const TableBody = ({
  getTableBodyProps,
  rows,
  page,
  prepareRow,
  selectedRowHandler,
  dataSelector,
  toggleRowSelected,
  toggleAllRowsSelected
}) => {
  // just turns on react-table row selected to handle future css
  const rowSelection = (row) => {
  toggleAllRowsSelected(false);
  
    
    toggleRowSelected(row.id, true);  console.log(row);
    //console.log(row.cells[0].column);
  };
  const handleDataSelector = (data) => {
    if(!dataSelector) return
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
            className={`${row.isSelected ? "selected" : ""}`}
            {...row.getRowProps()}
            onClick={() => {
              rowSelection(row);
              handleDataSelector(row.cells);
              console.log(page);
            }}
          >
            {row.cells.map((cell) => {
              //console.log('this is cell', cell.getCellProps())
              return (
                <td width={cell.column.width} {...cell.getCellProps()}  className={`${row.isSelected ? "selected" : ""}`}>
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
