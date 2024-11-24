import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage, reportError } from "../../../utility/errorUtils";
import { addRowsAnyDB } from "../populate-db/route";
import { getData } from "../get-all/route";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tableName = searchParams.get("tableName") as string;
    const databaseName = searchParams.get("databaseName") as string;
    // parse the request body
    const { columnNames, row } = await request.json();

    await addRowsAnyDB(columnNames, [row], tableName, databaseName);

    const data = await getData(databaseName as string, tableName as string);

    return NextResponse.json({ message: "Rows added successfully", data });
  } catch (err) {
    reportError({
      message: "Error adding rows:" + getErrorMessage(err),
    });
    return NextResponse.json({ message: "Error adding rows" }, { status: 500 });
  }
}
