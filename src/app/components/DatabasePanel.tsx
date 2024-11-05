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

export default function DatabasePanel() {
  const { showSnackbar } = useSnackbar();
  const { setDataRows } = useDataContext();
  const [message, setMessage] = useState("");

  const handleInitDB = async () => {
    try {
      const response = await fetch("/api/init-db", { method: "POST" });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage("Failed to initialize database");
      }
    } catch (err) {
      setMessage("Error initializing database:" + getErrorMessage(err));
    }
    showSnackbar(message);
  };

  const handleGetAllRows = async (tableName: string) => {
    try {
      const response = await fetch(`/api/get-all?tableName=${tableName}`, {
        method: "POST",
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setDataRows(data.data);
      } else {
        setMessage("Failed to get data");
      }
    } catch (err) {
      setMessage("Error getting data():" + getErrorMessage(err));
    }
    showSnackbar(message);
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
      <Typography level="h1">Actions</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
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
          <Card
            sx={
              {
                /*backgroundColor: "#0a0a0a"*/
              }
            }
            variant="outlined"
          >
            <Typography level="title-lg">Europe</Typography>
            <Stack spacing={1}>
              <Button
                onClick={() => handleGetAllRows("users")}
                size="md"
                variant={"outlined"}
                color="neutral"
              >
                users
              </Button>
              <Button
                onClick={() => handleGetAllRows("inventories")}
                size="md"
                variant={"outlined"}
                color="neutral"
              >
                inventories
              </Button>
              <Button
                onClick={() => handleGetAllRows("skills")}
                size="md"
                variant={"outlined"}
                color="neutral"
              >
                skills
              </Button>
              <Button
                onClick={() => handleGetAllRows("achievements")}
                size="md"
                variant={"outlined"}
                color="neutral"
              >
                achievements
              </Button>
            </Stack>
          </Card>
          <Card
            sx={
              {
                /*backgroundColor: "#0a0a0a"*/
              }
            }
            variant="outlined"
          >
            <Typography level="title-lg"> North America</Typography>
            <Stack spacing={1}>
              <Button size="md" variant={"outlined"} color="neutral">
                all data
              </Button>
              <Button size="md" variant={"outlined"} color="neutral">
                users
              </Button>
              <Button size="md" variant={"outlined"} color="neutral">
                scores
              </Button>
              <Button size="md" variant={"outlined"} color="neutral">
                matches
              </Button>
            </Stack>
          </Card>
          <Card
            sx={
              {
                /*backgroundColor: "#0a0a0a"*/
              }
            }
            variant="outlined"
          >
            <Typography level="title-lg">Asia</Typography>
            <Stack spacing={1}>
              <Button size="md" variant={"outlined"} color="neutral">
                all data
              </Button>
              <Button size="md" variant={"outlined"} color="neutral">
                users
              </Button>
              <Button size="md" variant={"outlined"} color="neutral">
                scores
              </Button>
              <Button size="md" variant={"outlined"} color="neutral">
                matches
              </Button>
            </Stack>
          </Card>
        </Box>
      </Box>
    </div>
  );
}
