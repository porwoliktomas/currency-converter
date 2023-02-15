import sqlite3 from "sqlite3";

export const initDB = () => {
  const db = new sqlite3.Database(process.env.DB_FILE!);

  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS destination_currency_counts (
        currency TEXT PRIMARY KEY,
        count INT
      )`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS stats (
        key TEXT PRIMARY KEY,
        value REAL
      )`
    );
  });

  db.close();
};

export default initDB;
