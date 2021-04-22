import React from "react";

const TableHeader = ({ headerGroups, viewDataColumn, openTabColumn }) => (
  <thead>
    {headerGroups.map((headerGroup) => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
          <th
            width={column.width}
            {...column.getHeaderProps(column.getSortByToggleProps())}
            onKeyPress={(event) => {
              if (column.sortable !== false && event.key === "Enter") {
                column.toggleSortBy();
              }
            }}
          >
            {/* need to make this dynamic. react is not recognizing the new update aria labels  */}
            {column.render("Header")}
            {/* Add a sort direction indicator */}
            <span
              tabIndex={0}
              aria-label={
                column.isSorted
                  ? column.isSortedDesc
                    ? "ascending order"
                    : "descending order"
                  : "Select a sort order"
              }
            >
              {column.isSorted ? (
                column.isSortedDesc ? (
                  <img
                    src="https://www.epa.gov/sites/all/libraries/js/datatables/media/images/sort_asc.png"
                    alt="ascend"
                  />
                ) : (
                  <img
                    src="https://www.epa.gov/sites/all/libraries/js/datatables/media/images/sort_desc.png"
                    alt="descend"
                  />
                )
              ) : (
                <img
                  src="https://www.epa.gov/sites/all/libraries/js/datatables/media/images/sort_both.png"
                  alt="sort"
                />
              )}
            </span>
          </th>
        ))}
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
