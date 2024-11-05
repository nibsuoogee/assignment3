import { Sheet, Table } from "@mui/joy";
import React from "react";

interface TableProps {
  data: Array<Record<string, any>>;
}

const DatabaseTable: React.FC<TableProps> = ({ data }) => {
  // Get the keys from the first object in the array to use as the header
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

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
          {data.map((row, rowIndex) => (
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
