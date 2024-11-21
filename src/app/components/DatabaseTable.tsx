import { Sheet, Table } from "@mui/joy";
import React from "react";
import { DataWindowType } from "../../types";

interface TableProps {
  dataWindow: DataWindowType;
}

const DatabaseTable: React.FC<TableProps> = ({ dataWindow }) => {
  const rows = dataWindow.rows;
  // Get the keys from the first object in the array to use as the header
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <Sheet sx={{ height: 300, overflow: "auto" }}>
      <Table aria-label="basic table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} style={{ padding: "8px", textAlign: "left" }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header) => (
                <td key={header} style={{ padding: "8px", textAlign: "left" }}>
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default DatabaseTable;
