import { IconButton, Sheet, Stack, Table, Textarea } from "@mui/joy";
import React, { useState } from "react";
import { DataWindowType } from "../../types";
import ClearIcon from "@mui/icons-material/Clear";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import { getErrorMessage } from "../../utility/errorUtils";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useDataContext } from "../contexts/DataContext";

interface TableProps {
  dataWindow: DataWindowType;
}

const DatabaseTable: React.FC<TableProps> = ({ dataWindow }) => {
  const { showSnackbar } = useSnackbar();
  const { setDataRows, clearDataRows } = useDataContext();
  const rows = dataWindow.rows ?? [];
  const databaseName = dataWindow.databaseName;
  const tableName = dataWindow.tableName;
  // Get the keys from the first object in the array to use as the header
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];
  const [newRow, setNewRow] = useState<any>({});

  async function handleNewRow(newValue: any, newValueKey: string) {
    setNewRow((prevRow: any) => {
      return { ...prevRow, [newValueKey]: newValue };
    });
  }

  async function setRowAsNew(row: any) {
    setNewRow(row);
  }

  async function addRow() {
    try {
      const response = await fetch(
        `/api/add-row?tableName=${tableName}&databaseName=${databaseName}`,
        {
          method: "POST",
          body: JSON.stringify({
            columnNames: headers,
            row: Object.values(newRow),
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        const dataWindow: DataWindowType = {
          databaseName: databaseName,
          tableName: tableName,
          rows: data.data,
        };
        clearDataRows();
        setDataRows(dataWindow);
      } else {
        showSnackbar("Failed to add row");
      }
    } catch (err) {
      showSnackbar("Error adding row:" + getErrorMessage(err));
    }
  }

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
        clearDataRows();
        setDataRows(dataWindow);
      } else {
        showSnackbar("Failed to delete row");
      }
    } catch (err) {
      showSnackbar("Error deleting row:" + getErrorMessage(err));
    }
  }

  async function modifyRow(rowId: string) {
    const rowToEdit = rows.find((row) => row.id === rowId);
    console.log("rowToEdit", rowToEdit);
    console.log("rowId", rowId);
    setRowAsNew(rowToEdit);
  }

  return (
    <Sheet sx={{ height: 300, overflow: "auto" }}>
      <Table aria-label="basic table" stickyHeader stickyFooter>
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
                <Stack direction="row" spacing={1} alignItems={"center"}>
                  <IconButton
                    variant="plain"
                    onClick={() => deleteRow(row["id"])}
                  >
                    <ClearIcon />
                  </IconButton>
                  <IconButton
                    variant="plain"
                    onClick={() => modifyRow(row["id"])}
                  >
                    <EditIcon />
                  </IconButton>
                </Stack>
              </td>
              {headers.map((header) => (
                <td key={header} style={{ padding: "8px", textAlign: "left" }}>
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td style={{ padding: "8px", textAlign: "center" }}>
              <IconButton variant="plain" onClick={() => addRow()}>
                <AddBoxIcon />
              </IconButton>
            </td>
            {headers.map((header) => (
              <td key={header} style={{ padding: "8px", textAlign: "left" }}>
                <Textarea
                  name="Outlined"
                  value={newRow[header] || ""}
                  variant="outlined"
                  maxRows={1}
                  onChange={(e) => handleNewRow(e.target.value, header)}
                />
              </td>
            ))}
          </tr>
        </tfoot>
      </Table>
    </Sheet>
  );
};

export default DatabaseTable;
