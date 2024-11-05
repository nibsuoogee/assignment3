import { NextResponse } from "next/server";
import { getErrorMessage, reportError } from "../../../utility/errorUtils";
import sampleDataOriginal from "../../../database/sampleData.json";
import { TableData } from "../../../types";
import { dropTableDB } from "../../../database/database";

export async function POST() {
  try {
    const sampleData: { [key: string]: TableData<string> } = sampleDataOriginal;
    const tableNames = Object.keys(sampleData);
    await Promise.all(
      tableNames.map(async (name) => {
        await dropTableDB(name);
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
