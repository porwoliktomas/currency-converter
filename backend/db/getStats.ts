import sqlite3 from "sqlite3";

type Stats = {
  mostPopularDestinationCurrencies: string[];
  totalAmountConvertedInUsd: number;
  totalRequests: number;
};

export const getStats = async () => {
  const db = new sqlite3.Database(process.env.DB_FILE!);

  const mostPopularDestinationCurrencies = await new Promise<string[]>(
    (resolve, _reject) => {
      db.all(
        `SELECT currency
      FROM destination_currency_counts
      WHERE count = (SELECT MAX(count) FROM destination_currency_counts)
      ORDER BY currency`,
        (_err, rows) => {
          resolve(rows.map((row) => row.currency));
        }
      );
    }
  );

  const totalAmountConvertedInUsd = await new Promise<number>(
    (resolve, _reject) => {
      db.get(
        `SELECT value
      FROM stats
      WHERE key = "total_converted_usd"`,
        (_err, row) => {
          resolve(row ? row.value : 0);
        }
      );
    }
  );

  const totalRequests = await new Promise<number>((resolve, _reject) => {
    db.get(
      `SELECT value
      FROM stats
      WHERE key = "conversion_requests_count"`,
      (_err, row) => {
        resolve(row ? row.value : 0);
      }
    );
  });

  db.close();

  return {
    mostPopularDestinationCurrencies,
    totalAmountConvertedInUsd,
    totalRequests,
  } as Stats;
};

export default getStats;
