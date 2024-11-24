"use client";

import { Button, Card, Stack, Typography } from "@mui/joy";
import { DataWindowType } from "../../types";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useDataContext } from "../contexts/DataContext";
import { getErrorMessage } from "../../utility/errorUtils";

export default function DatabaseGetterWindow({
  databaseName,
  variant,
  color,
}: {
  databaseName: string;
  variant: string;
  color?: string;
}) {
  const { showSnackbar } = useSnackbar();
  const { setDataRows } = useDataContext();

  const handleGetAllRows = async (tableName: string, databaseName: string) => {
    try {
      const response = await fetch(
        `/api/get-all?tableName=${tableName}&databaseName=${databaseName}`,
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
        showSnackbar("Failed to get data");
      }
    } catch (err) {
      showSnackbar("Error getting data():" + getErrorMessage(err));
    }
  };

  return (
    <Card variant={variant as any} color={color as any}>
      <Typography level="title-lg">{databaseName}</Typography>
      <Stack spacing={1}>
        <Button
          onClick={() => handleGetAllRows("users", databaseName)}
          size="md"
          variant={"outlined"}
          color="neutral"
        >
          users
        </Button>
        <Button
          onClick={() => handleGetAllRows("inventories", databaseName)}
          size="md"
          variant={"outlined"}
          color="neutral"
        >
          inventories
        </Button>
        <Button
          onClick={() => handleGetAllRows("skills", databaseName)}
          size="md"
          variant={"outlined"}
          color="neutral"
        >
          skills
        </Button>
        <Button
          onClick={() => handleGetAllRows("achievements", databaseName)}
          size="md"
          variant={"outlined"}
          color="neutral"
        >
          achievements
        </Button>
      </Stack>
    </Card>
  );
}
