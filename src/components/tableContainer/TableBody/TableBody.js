import React, { useEffect } from "react";
import "./TableBody.scss";
import { GoPencil } from "react-icons/go";
const TableBody = ({
  getTableBodyProps,
  rows,
  page,
  prepareRow,
  selectedRowHandler,
  defaultSelect,
  viewDataColumn,
  openTabColumn,
  openModal,
  tabFocus,
  resetTabFocusHandler,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rowSelection = (row) => {
    const selected = page.find((r) => r.isSelected);
    if (selected) {
      selected.isSelected = false;
    }
    row.isSelected = true;
  };
  const resetScrollInsideTable = (indexTable) => {
    const tableBody = document.getElementsByClassName("tableData")[indexTable];
    tableBody.scrollTop = 0;
  };
  const resetBTNInsideTable = () => {
    const tableBody = document.getElementsByClassName("tableButton");
    if (tableBody) {
      for (const el of tableBody) {
        if (el.disabled) {
          continue;
        } else {
          el.focus();
          break;
        }
      }
    }
  };
  useEffect(() => {
    resetScrollInsideTable(0);
    if (tabFocus) {
      resetBTNInsideTable();
      resetTabFocusHandler(false);
    }
  }, [rows, tabFocus]);
  const handleDataSelector = (data) => {
    return selectedRowHandler(data);
  };
  return (
    <tbody 
    // {...getTableBodyProps()} 
    className="tableData">
      {(page.length > 0 &&
        page.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              data-testid={"tableRow" + i}
              tabIndex={-1}
              key={row.id}
              // {...row.getRowProps()}
              onClick={() => {
                rowSelection(row);
                // handleDataSelector(row.cells);
              }}
            >
              {row.cells.map((cell) => {
                return (
                  <td
                    width={cell.column.width}
                    // {...cell.getCellProps()}
                    className={`${
                      row.isSelected ? "selected hovered" : "hovered"
                    }`}
                  >
                    <span
                      className={`${
                        cell.column.Header === "Component id" ? "bold" : ""
                      }`}
                    >
                      {cell.render("Cell")}
                    </span>
                  </td>
                );
              })}
              {/* additional cell for viewing ( not related to incoming data) */}
              {openTabColumn && !viewDataColumn ? (
                <td
                  width={row.cells[0].column.width}
                  className={`${
                    row.isSelected ? "selected hovered" : "hovered"
                  }`}
                >
                  <button
                    disabled={
                      openTabColumn.includes(row.cells[1].value) ? true : false
                    }
                    className="tableButton"
                    onClick={() => handleDataSelector(row.cells)}
                    aria-label={`Open ${row.cells[1].value} facility`}
                  >
                    <img
                      src={require("../../UswdsTable/images/openTab.jpg")}
                      className={
                        openTabColumn.includes(row.cells[1].value)
                          ? "hide"
                          : "show"
                      }
                      alt={`Open ${row.cells[1].value} facility`}
                    />
                    Open
                  </button>
                </td>
              ) : null}
              {viewDataColumn ? (
                <td
                  width={row.cells[0].column.width}
                  className={`${
                    row.isSelected ? "selected hovered" : "hovered"
                  }`}
                >
                  <button
                    aria-label={`View ${row.cells[1].value} facility`}
                    onClick={() => {
                      openModal(true, row.cells);
                      handleDataSelector(row.cells);
                    }}
                    className=" tableButton"
                  >
                    <GoPencil alt={`View ${row.cells[1].value} facility`} />
                    View
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
