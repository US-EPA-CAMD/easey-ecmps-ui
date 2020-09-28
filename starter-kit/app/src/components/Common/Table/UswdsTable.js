import React from "react";
import { useTable, useSortBy } from "react-table";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const UswdsTable = ({ columns, data, bordered = false, caption, bodyRef }) => {
  // Use the state and functions returned from useTable to build UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    disableSortRemove:true,
    initialState: {
      sortBy: [
          {
              id: 'col1',
              desc: false
          }
      ]
  }
  }, useSortBy);

  const variant = bordered ? "usa-table" : "usa-table usa-table--borderless";

  return (
    <table className={variant} {...getTableProps()}>
      <caption>{caption}</caption>
      <TableHeader headerGroups={headerGroups} />
      <TableBody
        bodyRef={bodyRef}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        rows={rows}
        prepareRow={prepareRow}
      />
    </table>
  );
};

export default UswdsTable;
