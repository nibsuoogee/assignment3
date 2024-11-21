import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage, reportError } from "../../../utility/errorUtils";
import { getAllDB } from "../../../database/database";
import {
  findAllDocuments,
  modelMappings,
} from "../../../database/databaseMongo";
import {
  createAchievementObjectsFromMongo,
  createInventoryObjectsFromMongo,
  createSkillObjectsFromMongo,
  createUserObjectsFromMongo,
} from "../../../database/dataConversion";

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

        if (tableName in modelMappings) {
          mongoResult = await findAllDocuments(
            modelMappings[tableName as keyof typeof modelMappings]
          );
          switch (tableName) {
            case "users":
              data = createUserObjectsFromMongo(mongoResult);
              break;
            case "inventories":
              data = createInventoryObjectsFromMongo(mongoResult);
              break;
            case "skills":
              data = createSkillObjectsFromMongo(mongoResult);
              break;
            case "achievements":
              data = createAchievementObjectsFromMongo(mongoResult);
              break;
            default:
              break;
          }
          console.log(data);
        } else {
          throw new Error(`Invalid table name: ${tableName}`);
        }
        break;
      default:
        data = await getAllDB(tableName, databaseName as string);
        console.log(data);
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
