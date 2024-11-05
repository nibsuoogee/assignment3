import { NextResponse } from "next/server";
import { getErrorMessage, reportError } from "../../../utility/errorUtils";
import sampleDataOriginal from "../../../database/sampleData.json";
import { TableData } from "../../../types";
import { addRowsDB } from "../../../database/database";

export async function POST() {
  try {
    const sampleData: { [key: string]: { [key: string]: TableData<string> } } =
      sampleDataOriginal;
    const databaseNames = Object.keys(sampleData);

    await Promise.all(
      databaseNames.map(async (databaseName) => {
        const databaseTables = sampleData[databaseName];
        const tableNames = Object.keys(databaseTables);

        tableNames.map(async (tableName) => {
          const tableData: TableData<string> = databaseTables[tableName];
          await addRowsDB(
            tableData.columnNames,
            tableData.rows,
            tableName,
            databaseName
          );
        });
      })
    );
    return NextResponse.json({ message: "Databases populated successfully" });
  } catch (err) {
    reportError({
      message: "Error populating databases:" + getErrorMessage(err),
    });
    return NextResponse.json(
      { message: "Error populating databases" },
      { status: 500 }
    );
  }
}
