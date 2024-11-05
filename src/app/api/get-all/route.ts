import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage, reportError } from "../../../utility/errorUtils";
import { getAllDB } from "../../../database/database";

export async function POST(request: NextRequest) {
  try {
    // Get the table name from the query parameters
    const { searchParams } = new URL(request.url);
    const tableName = searchParams.get("tableName");

    if (!tableName) {
      return NextResponse.json(
        { message: "Table name is required" },
        { status: 400 }
      );
    }

    // Now you can use the tableName variable
    const data = await getAllDB(tableName);

    return NextResponse.json({ message: "Data retrieved successfully", data });
  } catch (err) {
    reportError({
      message: "Error getting data: " + getErrorMessage(err),
    });
    return NextResponse.json(
      { message: "Error getting data" },
      { status: 500 }
    );
  }
}
