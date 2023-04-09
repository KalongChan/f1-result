import {useTable} from "react-table";

function Table({columns, data, type}) {
  // Use the state and functions returned from useTable to build your UI
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers.map((column, j) => (
              <th
                {...column.getHeaderProps()}
                key={j}
                className={`${type}-${
                  column.Header.toLowerCase().split("/")[0]
                }`}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={i}>
              {row.cells.map((cell, j) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    key={j}
                    className={`${type}-${
                      cell.column.Header.toLowerCase().split("/")[0]
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
    </table>
  );
}
export default Table;
