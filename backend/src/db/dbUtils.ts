import { Database } from "sqlite3";

export const selectAll = <T>(db: Database, query: string) => {
  return new Promise<T[]>((resolve, _reject) => {
    db.all(query, (_err, rows) => {
      resolve(rows);
    });
  });
};

export const selectOne = <T>(db: Database, query: string) => {
  return new Promise<T | undefined>((resolve, _reject) => {
    db.get(query, (_err, row) => {
      resolve(row);
    });
  });
};
