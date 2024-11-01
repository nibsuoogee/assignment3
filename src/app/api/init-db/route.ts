import { NextResponse } from "next/server";
import { initDB } from "../../../database/database";
import { getErrorMessage } from "../../../utility/errorUtils";

export async function POST() {
  try {
    await initDB();
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
