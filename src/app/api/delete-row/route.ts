import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage, reportError } from "../../../utility/errorUtils";
import { deleteRowsDB } from "../../../database/database";
import {
  deleteFromModelById,
  modelMappings,
} from "../../../database/databaseMongo";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tableName = searchParams.get("tableName") as string;
    const rowId = searchParams.get("rowId") as string;
    const databaseName = searchParams.get("databaseName") as string;

    switch (databaseName) {
      case "mongo":
        const tableNameModel =
          modelMappings[tableName as keyof typeof modelMappings];
        await deleteFromModelById(tableNameModel, rowId);
        break;
      default:
        await deleteRowsDB([rowId], tableName, databaseName);
        break;
    }

    return NextResponse.json({ message: "Tables cleared successfully" });
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
