import { IconButton, Sheet, Table } from "@mui/joy";
import React from "react";
import { DataWindowType } from "../../types";
import ClearIcon from "@mui/icons-material/Clear";
import { getErrorMessage } from "../../utility/errorUtils";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useDataContext } from "../contexts/DataContext";

interface TableProps {
  dataWindow: DataWindowType;
}

const DatabaseTable: React.FC<TableProps> = ({ dataWindow }) => {
  const { showSnackbar } = useSnackbar();
  const { setDataRows } = useDataContext();
  const rows = dataWindow.rows ?? [];
  const databaseName = dataWindow.databaseName;
  const tableName = dataWindow.tableName;
  // Get the keys from the first object in the array to use as the header
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

  async function deleteRow(rowId: string) {
    try {
      const response = await fetch(
        `/api/delete-row?tableName=${tableName}&rowId=${rowId}&databaseName=${databaseName}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();

      if (response.ok) {
        const dataWindow: DataWindowType = {
          databaseName: databaseName,
          tableName: tableName,
          rows: data.data,
        };
        setDataRows(dataWindow);
      } else {
        showSnackbar("Failed to delete row");
      }
    } catch (err) {
      showSnackbar("Error deleting row:" + getErrorMessage(err));
    }
  }

  return (
    <Sheet sx={{ height: 300, overflow: "auto" }}>
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th style={{ padding: "8px", textAlign: "center" }}></th>
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
              <td style={{ padding: "8px", textAlign: "center" }}>
                <IconButton
                  variant="plain"
                  onClick={() => deleteRow(row["id"])}
                >
                  <ClearIcon />
                </IconButton>
              </td>
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
