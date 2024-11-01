import sqlite3 from "sqlite3";
import path from "path";
import { getErrorMessage, reportError } from "../utility/errorUtils";

// Database connection
function _openDB(): Promise<sqlite3.Database> {
  const dbPath = path.join("database", "database.db");
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
  operation: (db: sqlite3.Database) => Promise<any>
): Promise<any> {
  try {
    const db = await _openDB();
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
export async function getAllDB(table: string): Promise<any> {
  return _execOperationDB((db: sqlite3.Database) => {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.all(`SELECT * FROM ${table}`, (err, rows) => {
          if (err) {
            reportError({
              message: "Error in _getAllDB():" + getErrorMessage(err),
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
  });
}

// Database initialization
export async function initDB(): Promise<string> {
  return _execOperationDB(async (db: sqlite3.Database) => {
    const initQueries: Array<string> = [
      `CREATE TABLE IF NOT EXISTS assignments (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        tags TEXT,
        module INTEGER,
        position TEXT NOT NULL,
        level INTEGER,
        isExpanding INTEGER NOT NULL,
        path TEXT NOT NULL);`,
      `CREATE TABLE IF NOT EXISTS modules (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        tags TEXT,
        assignments INTEGER,
        subjects TEXT,
        letters TEXT,
        instructions TEXT);`,
      `CREATE TABLE IF NOT EXISTS tags (
        name TEXT PRIMARY KEY,
        assignments TEXT NOT NULL);`,
      `CREATE TABLE IF NOT EXISTS moduleTags (
        name TEXT PRIMARY KEY,
        modules TEXT NOT NULL);`,
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
  });
}
