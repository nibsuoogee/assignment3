"use client";

import { useDataContext } from "../contexts/DataContext";
import Typography from "@mui/joy/Typography";
import DatabaseTable from "./DatabaseTable";

export default function DatabaseResults() {
  const { dataRows } = useDataContext();

  return (
    <div>
      <Typography level="h1">Data</Typography>
      <DatabaseTable data={dataRows} />
    </div>
  );
}
