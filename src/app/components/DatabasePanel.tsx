"use client";

import { Button } from "@mui/joy";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { Card } from "@mui/joy";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useState } from "react";
import { getErrorMessage } from "../../utility/errorUtils";
import { useDataContext } from "../contexts/DataContext";
import { DataWindowType } from "../../types";

const databases = ["europe", "north-america", "asia"];

export default function DatabasePanel() {
  const { showSnackbar } = useSnackbar();
  const { setDataRows } = useDataContext();
  const [message, setMessage] = useState("");

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
      setMessage(result as string);
    } catch (err) {
      setMessage("Error initializing databases:" + getErrorMessage(err));
    }
    showSnackbar(message);
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
        setMessage("Failed to get data");
        showSnackbar(message);
      }
    } catch (err) {
      setMessage("Error getting data():" + getErrorMessage(err));
      showSnackbar(message);
    }
  };

  const handlePopulate = async () => {
    try {
      const response = await fetch(`/api/populate-db`, {
        method: "POST",
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage("Failed to populate database");
      }
    } catch (err) {
      setMessage("Error populating database:" + getErrorMessage(err));
    }
    showSnackbar(message);
  };

  const handleDropTables = async () => {
    try {
      const response = await fetch(`/api/drop-tables`, {
        method: "POST",
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage("Failed to drop tables");
      }
    } catch (err) {
      setMessage("Error dropping tables:" + getErrorMessage(err));
    }
    showSnackbar(message);
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
            onClick={handlePopulate}
            size="md"
            variant={"outlined"}
            color="neutral"
          >
            Populate all
          </Button>
          <Button
            onClick={handleDropTables}
            size="md"
            variant={"outlined"}
            color="neutral"
          >
            Drop all tables
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
