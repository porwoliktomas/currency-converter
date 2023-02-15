import cachedAxios from "../cache/cachedAxios";

export type RatesResponse = {
  rates: { [currency: string]: number };
};

export const getRates = async () => {
  const apiKey = process.env.OPENEXCHANGERATES_API_KEY!;
  const data = await cachedAxios
    .get<RatesResponse>(
      `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`,
      { cache: { ttl: 1000 * 60 * 60 } } // 1 hour
    )
    .catch((err) => {
      throw new Error(err.message);
    });

  if (!data.data) {
    throw new Error("No data");
  }

  return data.data;
};

export default getRates;
