import { Database } from "sqlite3";
import { selectAll, selectOne } from "./dbUtils";

export type Stats = {
  mostPopularDestinationCurrencies: string[];
  totalAmountConvertedInUsd: number;
  totalRequests: number;
};

export const getStats = async () => {
  const db = new Database(process.env.DB_FILE!);

  const mostPopularDestinationCurrencies = (
    await selectAll<{ currency: string }>(
      db,
      `SELECT currency
      FROM destination_currency_counts
      WHERE count = (SELECT MAX(count) FROM destination_currency_counts)
      ORDER BY currency`
    )
  ).map((row) => row.currency);

  const totalAmountConvertedInUsd =
    (
      await selectOne<{ value: number }>(
        db,
        'SELECT value FROM stats WHERE key = "total_converted_usd"'
      )
    )?.value ?? 0;

  const totalRequests =
    (
      await selectOne<{ value: number }>(
        db,
        'SELECT value FROM stats WHERE key = "conversion_requests_count"'
      )
    )?.value ?? 0;

  db.close();

  return {
    mostPopularDestinationCurrencies,
    totalAmountConvertedInUsd,
    totalRequests,
  } as Stats;
};

export default getStats;
