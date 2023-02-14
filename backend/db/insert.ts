import sqlite3 from "sqlite3";

export const insertStats = (currency: string, amountInUSD: number) => {
  const db = new sqlite3.Database(process.env.DB_FILE!);

  db.serialize(() => {
    db.run(
      `INSERT INTO destination_currency_counts (currency, count)
      VALUES (?, 1)
      ON CONFLICT (currency) DO UPDATE
        SET count = count + 1
        WHERE currency = excluded.currency`,
      currency
    );

    db.run(
      `INSERT INTO stats (key, value)
      VALUES ("conversion_requests_count", 1)
      ON CONFLICT (key) DO UPDATE
        SET value = value + 1
        WHERE key = excluded.key`
    );

    db.run(
      `INSERT INTO stats (key, value)
      VALUES ("total_converted_usd", ?)
      ON CONFLICT (key) DO UPDATE
        SET value = value + excluded.value
        WHERE key = excluded.key`,
      amountInUSD
    );
  });

  db.close();
};

export default insertStats;
