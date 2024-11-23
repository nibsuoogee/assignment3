import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage, reportError } from "../../../utility/errorUtils";
import sampleDataOriginal from "../../../database/sampleData.json";
import { TableData } from "../../../types";
import { addRowsDB } from "../../../database/database";
import { addDataToModel } from "../../../database/databaseMongo";
import {
  createAchievementObjects,
  createInventoryObjects,
  createSkillObjects,
  createUserObjects,
} from "../../../database/dataConversion";

async function populateDBAssignment4(
  tableNames: string[],
  databaseTables: {
    [key: string]: TableData<string>;
  },
  databaseIndex: number
) {
  tableNames.map(async (tableName) => {
    const tableData: TableData<string> = databaseTables[tableName];
    const rows = tableData.rows;
    if (databaseIndex == 0) {
      let objects: any[] = [];
      switch (tableName) {
        case "users":
          objects = createUserObjects(rows as any);
          await addDataToModel("userModel", objects);
          break;
        case "inventories":
          objects = createInventoryObjects(rows as any);
          await addDataToModel("inventoryModel", objects);
          break;
        case "skills":
          objects = createSkillObjects(rows as any);
          await addDataToModel("skillModel", objects);
          break;
        case "achievements":
          objects = createAchievementObjects(rows as any);
          await addDataToModel("achievementModel", objects);
          break;
        default:
          break;
      }
    } else if (databaseIndex == 1) {
      await addRowsDB(tableData.columnNames, rows, tableName, "sqlite");
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const useReplicationParameter = searchParams.get("useReplication");
    const useReplication = useReplicationParameter === "true" ? true : false;

    const sampleData: { [key: string]: { [key: string]: TableData<string> } } =
      sampleDataOriginal;
    const databaseNames = Object.keys(sampleData);

    await Promise.all(
      databaseNames.map(async (databaseName, index) => {
        // The most naive replication strategy known to man.
        // Perform row additions to one database and the next
        // one, looping at the last database.
        const backUpDatabaseName =
          databaseNames[(index + 1) % databaseNames.length];

        const databaseTables = sampleData[databaseName];
        const tableNames = Object.keys(databaseTables);

        tableNames.map(async (tableName) => {
          const tableData: TableData<string> = databaseTables[tableName];
          const rows = tableData.rows;
          await addRowsDB(tableData.columnNames, rows, tableName, databaseName);
        });
        if (useReplication) {
          tableNames.map(async (tableName) => {
            const tableData: TableData<string> = databaseTables[tableName];
            await addRowsDB(
              tableData.columnNames,
              tableData.rows,
              tableName,
              backUpDatabaseName
            );
          });
        }

        populateDBAssignment4(tableNames, databaseTables, index);
      })
    );

    return NextResponse.json({ message: "Databases populated successfully" });
  } catch (err) {
    reportError({
      message: "Error populating databases:" + getErrorMessage(err),
    });
    return NextResponse.json(
      { message: "Error populating databases" },
      { status: 500 }
    );
  }
}
