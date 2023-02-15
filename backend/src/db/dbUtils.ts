import { Database } from "sqlite3";

export const runSql = (db: Database, query: string, params: any[] = []) => {
  return new Promise<void>((resolve, reject) => {
    db.run(query, params, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const selectAll = <T>(db: Database, query: string) => {
  return new Promise<T[]>((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export const selectOne = <T>(db: Database, query: string) => {
  return new Promise<T | undefined>((resolve, reject) => {
    db.get(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};
