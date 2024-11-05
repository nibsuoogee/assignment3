import { NextResponse } from "next/server";
import { getErrorMessage, reportError } from "../../../utility/errorUtils";
import sampleDataOriginal from "../../../database/sampleData.json";
import { TableData } from "../../../types";
import { dropTableDB } from "../../../database/database";

export async function POST() {
  try {
    const sampleData: { [key: string]: { [key: string]: TableData<string> } } =
      sampleDataOriginal;

    const databaseNames = Object.keys(sampleData);

    await Promise.all(
      databaseNames.map(async (databaseName) => {
        const databaseTables = sampleData[databaseName];
        const tableNames = Object.keys(databaseTables);

        await Promise.all(
          tableNames.map(async (name) => {
            await dropTableDB(name, databaseName);
          })
        );
      })
    );
    return NextResponse.json({ message: "Tables dropped successfully" });
  } catch (err) {
    reportError({
      message: "Error dropping tables:" + getErrorMessage(err),
    });
    return NextResponse.json(
      { message: "Error dropping tables" },
      { status: 500 }
    );
  }
}
