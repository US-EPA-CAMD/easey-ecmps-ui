import React, { useEffect } from "react";
import "./TableBody.css";
const TableBody = ({
  getTableBodyProps,
  rows,
  page,
  prepareRow,
  selectedRowHandler,
  defaultSelect,
  viewDataColumn,
}) => {
  // just turns on react-table row selected to handle future css
  const defaultSelector = () => {
    const selected = page.find((r) => r.isSelected);
    if (!selected && defaultSelect && page.length > 0) {
      page[0].isSelected = true;
      selectedRowHandler(page[0].original.col1);
    }
  };
  useEffect(() => {
    defaultSelector();
  }, []);

  const rowSelection = (row) => {
    const selected = page.find((r) => r.isSelected);
    if (selected) {
      selected.isSelected = false;
    }
    row.isSelected = true;
  };
  const handleDataSelector = (data) => {
    if (!selectedRowHandler) {
      return false;
    }

    return selectedRowHandler(data);
  };
  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      console.log("enter was pressed");
    }
  };
  return (
    <tbody {...getTableBodyProps()}>
      {(page.length > 0 &&
        page.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              data-testid={"tableRow" + i}
              tabIndex={1}
              key={row.id}
              {...row.getRowProps()}
              onClick={() => {
                rowSelection(row);
                handleDataSelector(row.cells);
              }}
              onKeyDown={onKeyDownHandler}
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
              {/* additional cell for viewing ( not related to incoming data) */}
              {viewDataColumn ? (
                <td
                  width={row.cells[0].column.width}
                  className={`${
                    row.isSelected ? "selected hovered" : "hovered"
                  }`}
                >
                  {" "}
                  <button
                    disabled={
                      viewDataColumn.includes(row.cells[1].value) ? true : false
                    }
                    className="tableButton"
                    // onClick={() => handleDataSelector(row.cells)}
                  >
                    {" "}
                    <img
                      src={require("./images/openTab.jpg")}
                      className={
                        viewDataColumn.includes(row.cells[1].value)
                          ? "hide"
                          : "show"
                      }
                    />
                    Open
                  </button>
                </td>
              ) : null}
            </tr>
          );
        })) || (
        <tr className="centerBox">
          <td>
            No results match that search criteria. Please change the criteria
            and try again.
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
