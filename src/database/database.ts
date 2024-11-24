import sqlite3 from "sqlite3";
import path from "path";
import { getErrorMessage, reportError } from "../utility/errorUtils";

// Database connection
function _openDB(databaseName: string): Promise<sqlite3.Database> {
  const databaseFile = databaseName + ".db";
  const dbPath = path.join("database", databaseFile);
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        reportError({ message: "Error in _openDB():" + getErrorMessage(err) });
        reject(err);
      } else {
        //console.info("Connected to the database.");
        resolve(db);
      }
    });
  });
}

async function _closeDB(db: sqlite3.Database): Promise<string> {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reportError({ message: "Error in _closeDB():" + getErrorMessage(err) });
        reject(err);
      }
      //console.info("Closed the database connection.");
      resolve("Closed the database connection.");
    });
  });
}

/**
 * A wrapper for all db operations. Opens the db, performs
 * the supplied function, and finally closes the db.
 */
async function _execOperationDB(
  operation: (db: sqlite3.Database) => Promise<any>,
  databaseName: string
): Promise<any> {
  try {
    const db = await _openDB(databaseName);
    const result = await operation(db);
    await _closeDB(db);

    return result;
  } catch (err) {
    reportError({
      message: "Error in _execOperationDB():" + getErrorMessage(err),
    });
    throw err;
  }
}

/**
 * Performs 'select * from' for the supplied table, returning the content.
 */
export async function getAllDB(
  table: string,
  databaseName: string
): Promise<any> {
  return _execOperationDB((db: sqlite3.Database) => {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        console.log("`SELECT * FROM ${table}`: ", `SELECT * FROM ${table}`);
        db.all(`SELECT * FROM ${table}`, (err, rows) => {
          if (err) {
            reportError({
              message: "Error in getAllDB():" + getErrorMessage(err),
            });
            reject(err);
          } else if (rows) {
            const content = rows;
            resolve(content);
          } else {
            reject(new Error(`Could not find items in table ${table}.`));
          }
        });
      });
    });
  }, databaseName);
}

// Database initialization
export async function initDB(databaseName: string): Promise<string> {
  return _execOperationDB(async (db: sqlite3.Database) => {
    const initQueries: Array<string> = [
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        level INTEGER,
        creationDate TEXT,
        nationality TEXT
    );`,
      `CREATE TABLE IF NOT EXISTS inventories (
        id INTEGER PRIMARY KEY,
        user_id TEXT,
        slot1 TEXT,
        slot2 TEXT,
        slot3 TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id)
          ON DELETE CASCADE ON UPDATE NO ACTION
    );`,
      `CREATE TABLE IF NOT EXISTS skills (
        name TEXT,
        user_id TEXT PRIMARY KEY,
        skill1 TEXT,
        skill2 TEXT,
        skill3 TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id)
          ON DELETE CASCADE ON UPDATE NO ACTION
    );`,
      `CREATE TABLE IF NOT EXISTS achievements (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        name TEXT NOT NULL,
        experience INTEGER,
        dateCompleted TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id)
          ON DELETE CASCADE ON UPDATE NO ACTION
    );`,
    ];
    try {
      await Promise.all(
        initQueries.map((query) =>
          db.serialize(() => {
            db.run(query, (err: Error) => {
              if (err) {
                reportError({
                  message: "Error in initDB():" + getErrorMessage(err),
                });
                throw err;
              }
            });
          })
        )
      );

      return "Tables created successfully";
    } catch (err) {
      reportError({
        message: "Error in initDB():" + getErrorMessage(err),
      });
      throw err;
    }
  }, databaseName);
}

/**
 * Add a row of data to a table.
 * @param columnNames Names of the table columns
 * @param columns The data for each column
 * @param table The table name
 * @returns
 */
export async function addRowsDB(
  columnNames: string[],
  rows: Array<Array<unknown>>,
  table: string,
  databaseName: string
): Promise<string> {
  return _execOperationDB(async (db: sqlite3.Database) => {
    try {
      const columnNamesJoined = columnNames.join(",");
      // generate a string of question marks separated by commas
      // for the query
      const placeholders = columnNames.map(() => "?").join(",");

      const result = await new Promise((resolve, reject) => {
        db.serialize(() => {
          rows.forEach((row) => {
            db.run(
              `INSERT INTO ${table}(${columnNamesJoined}) VALUES(${placeholders})`,
              row,
              (err) => {
                if (err) {
                  reject(err);
                }
              }
            );
          });
        });
      });
      return result;
    } catch (err) {
      reportError({
        message: "Error in addRowsDB():" + getErrorMessage(err),
      });
      throw err;
    }
  }, databaseName);
}

export async function deleteRowsDB(
  ids: string[],
  table: string,
  databaseName: string
): Promise<string> {
  return _execOperationDB(async (db: sqlite3.Database) => {
    try {
      const placeholders = ids.map(() => "?").join(",");

      const result = await new Promise((resolve, reject) => {
        db.serialize(() => {
          db.run(
            `DELETE FROM ${table} WHERE id IN (${placeholders})`,
            ids,
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(`Deleted rows from ${table}`);
              }
            }
          );
        });
      });

      return result;
    } catch (err) {
      reportError({
        message: "Error in deleteRowsDB():" + getErrorMessage(err),
      });
      throw err;
    }
  }, databaseName);
}

export async function dropTableDB(tableName: string, databaseName: string) {
  return _execOperationDB(async (db: sqlite3.Database) => {
    try {
      const result = await new Promise((resolve, reject) => {
        db.serialize(() => {
          db.run(`DELETE FROM ${tableName}`, (err) => {
            if (err) {
              reject(err);
            }
          });
        });
        resolve("Tables cleared successfully");
      });
      return result;
    } catch (err) {
      reportError({
        message: "Error in dropTablesDB():" + getErrorMessage(err),
      });
      throw err;
    }
  }, databaseName);
}
