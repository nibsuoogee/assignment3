import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage, reportError } from "../../../utility/errorUtils";
import { getAllDB } from "../../../database/database";
import { findAllDocuments } from "../../../database/databaseMongo";
import { ModelsDictionary } from "../../../types";
import { createUserArrays } from "../../../database/dataConversion";

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

    let data: any = null;
    switch (databaseName) {
      case "mongo":
        let mongoResult = [];
        const modelMappings: { [key: string]: keyof ModelsDictionary } = {
          users: "userModel",
          inventories: "inventoryModel",
          skills: "skillModel",
          achievements: "achievementModel",
        };
        if (tableName in modelMappings) {
          mongoResult = await findAllDocuments(
            modelMappings[tableName as keyof typeof modelMappings]
          );
          data = createUserArrays(mongoResult);
          console.log(data);
        } else {
          throw new Error(`Invalid table name: ${tableName}`);
        }
        break;
      default:
        console.log(data);
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
