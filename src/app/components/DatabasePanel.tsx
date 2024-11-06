"use client";

import { Button } from "@mui/joy";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { Card } from "@mui/joy";
import { useSnackbar } from "../contexts/SnackbarContext";
import { getErrorMessage } from "../../utility/errorUtils";
import { useDataContext } from "../contexts/DataContext";
import { DataWindowType } from "../../types";

const databases = ["europe", "north-america", "asia"];

export default function DatabasePanel() {
  const { showSnackbar } = useSnackbar();
  const { setDataRows } = useDataContext();

  const handleInitDB = async () => {
    try {
      const result = await new Promise((resolve, reject) => {
        databases.map(async (databaseName) => {
          const response = await fetch(
            `/api/init-db?databaseName=${databaseName}`,
            { method: "POST" }
          );
          //const data = await response.json();

          if (!response.ok) {
            reject("Failed to initialize databases");
          }
        });
        resolve("Databases initialized successfully");
      });
      showSnackbar(result as string);
    } catch (err) {
      showSnackbar("Error initializing databases:" + getErrorMessage(err));
    }
  };

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
          title: databaseName + " " + tableName,
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

  const handlePopulate = async (useReplication: string) => {
    try {
      const response = await fetch(
        `/api/populate-db?useReplication=${useReplication}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();

      if (response.ok) {
        showSnackbar(data.message);
      } else {
        showSnackbar("Failed to populate database");
      }
    } catch (err) {
      showSnackbar("Error populating database:" + getErrorMessage(err));
    }
  };

  const handleDropTables = async () => {
    try {
      const response = await fetch(`/api/drop-tables`, {
        method: "POST",
      });
      const data = await response.json();

      if (response.ok) {
        showSnackbar(data.message);
      } else {
        showSnackbar("Failed to drop tables");
      }
    } catch (err) {
      showSnackbar("Error dropping tables:" + getErrorMessage(err));
    }
  };

  return (
    <div>
      <Stack
        spacing={2}
        sx={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Typography level="h1">Actions</Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(80px, 1fr))",
            gap: 1,
          }}
        >
          <Button
            onClick={handleInitDB}
            size="md"
            variant={"outlined"}
            color="neutral"
          >
            Initialize databases
          </Button>
          <Button
            onClick={() => handlePopulate("false")}
            size="md"
            variant={"outlined"}
            color="neutral"
          >
            Populate all
          </Button>
          <Button
            onClick={() => handlePopulate("true")}
            size="md"
            variant={"outlined"}
            color="neutral"
          >
            Populate replicated
          </Button>
          <Button
            onClick={handleDropTables}
            size="md"
            variant={"outlined"}
            color="neutral"
          >
            Clear all tables
          </Button>
        </Box>

        <Typography level="h1">Databases</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(80px, 1fr))",
              gap: 1,
            }}
          >
            <Card variant="outlined">
              <Typography level="title-lg">Europe</Typography>
              <Stack spacing={1}>
                <Button
                  onClick={() => handleGetAllRows("users", "europe")}
                  size="md"
                  variant={"outlined"}
                  color="neutral"
                >
                  users
                </Button>
                <Button
                  onClick={() => handleGetAllRows("inventories", "europe")}
                  size="md"
                  variant={"outlined"}
                  color="neutral"
                >
                  inventories
                </Button>
                <Button
                  onClick={() => handleGetAllRows("skills", "europe")}
                  size="md"
                  variant={"outlined"}
                  color="neutral"
                >
                  skills
                </Button>
                <Button
                  onClick={() => handleGetAllRows("achievements", "europe")}
                  size="md"
                  variant={"outlined"}
                  color="neutral"
                >
                  achievements
                </Button>
              </Stack>
            </Card>
            <Card variant="outlined">
              <Typography level="title-lg"> North America</Typography>
              <Stack spacing={1}>
                <Button
                  onClick={() => handleGetAllRows("users", "north-america")}
                  size="md"
                  variant={"outlined"}
                  color="neutral"
                >
                  users
                </Button>
                <Button
                  onClick={() =>
                    handleGetAllRows("inventories", "north-america")
                  }
                  size="md"
                  variant={"outlined"}
                  color="neutral"
                >
                  inventories
                </Button>
                <Button
                  onClick={() => handleGetAllRows("skills", "north-america")}
                  size="md"
                  variant={"outlined"}
                  color="neutral"
                >
                  skills
                </Button>
                <Button
                  onClick={() =>
                    handleGetAllRows("achievements", "north-america")
                  }
                  size="md"
                  variant={"outlined"}
                  color="neutral"
                >
                  achievements
                </Button>
              </Stack>
            </Card>
            <Card variant="outlined">
              <Typography level="title-lg">Asia</Typography>
              <Stack spacing={1}>
                <Button
                  onClick={() => handleGetAllRows("users", "asia")}
                  size="md"
                  variant={"outlined"}
                  color="neutral"
                >
                  users
                </Button>
                <Button
                  onClick={() => handleGetAllRows("inventories", "asia")}
                  size="md"
                  variant={"outlined"}
                  color="neutral"
                >
                  inventories
                </Button>
                <Button
                  onClick={() => handleGetAllRows("skills", "asia")}
                  size="md"
                  variant={"outlined"}
                  color="neutral"
                >
                  skills
                </Button>
                <Button
                  onClick={() => handleGetAllRows("achievements", "asia")}
                  size="md"
                  variant={"outlined"}
                  color="neutral"
                >
                  achievements
                </Button>
              </Stack>
            </Card>
          </Box>
        </Box>
      </Stack>
    </div>
  );
}
