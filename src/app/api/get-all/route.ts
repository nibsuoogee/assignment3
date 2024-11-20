import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage, reportError } from "../../../utility/errorUtils";
import { getAllDB } from "../../../database/database";
import { findAllDocuments } from "../../../database/databaseMongo";

async function getAllMongo() {}

export async function POST(request: NextRequest) {
  try {
    // Get the table name from the query parameters
    const { searchParams } = new URL(request.url);
    const tableName = searchParams.get("tableName");
    const databaseName = searchParams.get("databaseName");

    if (!tableName) {
      return NextResponse.json(
        { message: "Table name is required" },
        { status: 400 }
      );
    }

    // Now you can use the tableName variable
    let data: any = null;
    switch (databaseName) {
      case "mongo":
        const mongoResult = await findAllDocuments("userModel");
        console.log("mongoResult: ", mongoResult);
        break;
      default:
        data = await getAllDB(tableName, databaseName as string);
        break;
    }

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
