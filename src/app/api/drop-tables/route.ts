import { NextResponse } from "next/server";
import { getErrorMessage, reportError } from "../../../utility/errorUtils";
import { dropTableDB } from "../../../database/database";
import {
  deleteAllDocuments,
  modelMappings,
} from "../../../database/databaseMongo";

const databases = ["europe", "north-america", "asia", "sqlite"];
const tableNames = ["users", "inventories", "skills", "achievements"];

export async function POST() {
  try {
    await Promise.all(
      databases.map(async (databaseName) => {
        await Promise.all(
          tableNames.map(async (name) => {
            await dropTableDB(name, databaseName);
          })
        );
      })
    );
    Object.values(modelMappings).forEach((modelName) => {
      deleteAllDocuments(modelName);
    });
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
