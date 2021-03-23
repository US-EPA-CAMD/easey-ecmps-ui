import React from "react";

const TableHeader = ({ headerGroups, viewDataColumn, openTabColumn }) => (
  <thead>
    {headerGroups.map((headerGroup) => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
          <th
            width={column.width}
            {...column.getHeaderProps(column.getSortByToggleProps())}
          >
            {column.render("Header")}
            {/* Add a sort direction indicator */}
            <span>
              {column.isSorted ? (
                column.isSortedDesc ? (
                  <img src="https://www.epa.gov/sites/all/libraries/js/datatables/media/images/sort_asc.png" />
                ) : (
                  <img src="https://www.epa.gov/sites/all/libraries/js/datatables/media/images/sort_desc.png" />
                )
              ) : (
                <img src="https://www.epa.gov/sites/all/libraries/js/datatables/media/images/sort_both.png" />
              )}
            </span>
          </th>
        ))}{" "}
        {openTabColumn ? (
          <th width={headerGroups[0].headers[0].width}>Actions</th>
        ) : null}
        {viewDataColumn ? (
          <th width={headerGroups[0].headers[0].width}>Actions</th>
        ) : null}
      </tr>
    ))}
  </thead>
);

export default TableHeader;
