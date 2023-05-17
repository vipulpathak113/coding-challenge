import React from "react";
import { useTable } from "react-table";

export default function Table({ apidata, showCountries }) {
  const showData = showCountries;
  const rowData =
    apidata &&
    apidata.map((item) => {
      const obj = {
        col1: item.name,
        col2: item.abbreviation,
        col3: item.capital,
        col4: item.phone,
        col5: item.population,
        col6: (
          <img
            src={item.media.flag}
            style={{ height: "50px", width: "100px" }}
            alt={item.abbreviation}
          />
        ),
        col7: (
          <img
            src={item.media.emblem}
            style={{ height: "50px", width: "100px" }}
            alt={item.abbreviation}
          />
        ),
      };
      return obj;
    });

  const data = React.useMemo(
    () => (showData ? rowData : [{ col1: "" }]),
    [rowData, showData]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Country Name",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Code",
        accessor: "col2",
      },
      {
        Header: "Capital",
        accessor: "col3",
      },
      {
        Header: "Ph Code",
        accessor: "col4",
      },
      {
        Header: "Population",
        accessor: "col5",
      },
      {
        Header: "Flag",
        accessor: "col6",
      },
      {
        Header: "Emblem",
        accessor: "col7",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table
      {...getTableProps()}
      style={{ border: "solid 1px gray", width: "100%" }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderRight: "1px solid gray",
                  borderBottom: "1px solid gray",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                      borderStyle: "none",
                      borderRight: "1px solid gray",
                      borderBottom: "1px solid gray",
                    }}
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
