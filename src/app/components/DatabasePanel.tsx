"use client";

import { Button, Switch } from "@mui/joy";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { useSnackbar } from "../contexts/SnackbarContext";
import { getErrorMessage } from "../../utility/errorUtils";
import DatabaseGetterWindow from "./DatabaseGetterWindow";
import { useDataContext } from "../contexts/DataContext";

const databases = ["europe", "north-america", "asia"];

export default function DatabasePanel() {
  const { showSnackbar } = useSnackbar();
  const { assignmentChecked, setAssignmentChecked } = useDataContext();

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
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Typography level="body-md">Assignment 3</Typography>

          <Switch
            checked={assignmentChecked}
            onChange={(event) => setAssignmentChecked(event.target.checked)}
          />
          <Typography level="body-md">Assignment 4</Typography>
        </Stack>

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
            {assignmentChecked ? (
              <>
                <DatabaseGetterWindow
                  databaseName="sqlite"
                  variant="soft"
                  color="primary"
                />
                <DatabaseGetterWindow
                  databaseName="mongo"
                  variant="soft"
                  color="success"
                />
              </>
            ) : (
              <>
                {databases.map((databaseName) => (
                  <DatabaseGetterWindow
                    key={databaseName}
                    databaseName={databaseName}
                    variant="outlined"
                  />
                ))}
              </>
            )}
          </Box>
        </Box>
      </Stack>
    </div>
  );
}
