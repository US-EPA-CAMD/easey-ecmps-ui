import React from "react";

const TableBody = ({ getTableBodyProps, rows, page, prepareRow, bodyRef }) => (


<tbody {...getTableBodyProps()}>
{page.map((row, i) => {
    prepareRow(row)
    return (
        <tr {...row.getRowProps()}>
            {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
            })}
        </tr>
    )
})}
</tbody>
);

export default TableBody;
