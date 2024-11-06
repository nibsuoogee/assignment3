"use client";

import { useDataContext } from "../contexts/DataContext";
import Typography from "@mui/joy/Typography";
import DatabaseTable from "./DatabaseTable";
import Grid from "@mui/joy/Grid";
import { Button, Card, Stack, Table } from "@mui/joy";

export default function DatabaseResults() {
  const { dataRows, clearDataRows } = useDataContext();

  return (
    <Stack
      spacing={2}
      sx={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Typography level="h1">Data</Typography>

      <Button
        onClick={clearDataRows}
        size="md"
        variant={"outlined"}
        color="neutral"
      >
        Clear results
      </Button>

      <Table aria-label="css formatting table"></Table>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {dataRows
          ? dataRows.map((dataRow, index) => {
              return (
                <Grid key={index} xs={12} md={6}>
                  <Card variant="outlined">
                    <Typography
                      level="body-sm"
                      sx={{ textAlign: "center", mb: 2 }}
                    >
                      {dataRow.title}
                    </Typography>
                    <DatabaseTable dataWindow={dataRow} />
                  </Card>
                </Grid>
              );
            })
          : ""}
      </Grid>
    </Stack>
  );
}
