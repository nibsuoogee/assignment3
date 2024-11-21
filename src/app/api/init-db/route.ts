import { NextRequest, NextResponse } from "next/server";
import { initDB } from "../../../database/database";
import { getErrorMessage } from "../../../utility/errorUtils";
import { dropCollections } from "../../../database/databaseMongo";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const databaseName = searchParams.get("databaseName");

    await initDB(databaseName as string);
    dropCollections();
    return NextResponse.json({ message: "Database initialized successfully" });
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
