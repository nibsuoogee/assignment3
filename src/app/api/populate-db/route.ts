import { NextResponse } from "next/server";
import { getErrorMessage, reportError } from "../../../utility/errorUtils";
import sampleDataOriginal from "../../../database/sampleData.json";
import { TableData } from "../../../types";
import { addRowsDB } from "../../../database/database";

export async function POST() {
  try {
    const sampleData: { [key: string]: TableData<string> } = sampleDataOriginal;
    const tableNames = Object.keys(sampleData);
    await Promise.all(
      tableNames.map(async (name) => {
        const tableData: TableData<string> = sampleData[name];
        await addRowsDB(tableData.columnNames, tableData.rows, name);
      })
    );
    return NextResponse.json({ message: "Database populated successfully" });
  } catch (err) {
    reportError({
      message: "Error initializing database:" + getErrorMessage(err),
    });
    return NextResponse.json(
      { message: "Error initializing database" },
      { status: 500 }
    );
  }
}
