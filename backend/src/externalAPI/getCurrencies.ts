import cachedAxios from "../cache/cachedAxios";

export type CurrenciesResponse = {
  [currency: string]: string;
};

export const getCurrencies = async () => {
  const apiKey = process.env.OPENEXCHANGERATES_API_KEY!;
  const data = await cachedAxios
    .get<CurrenciesResponse>(
      `https://openexchangerates.org/api/currencies.json?app_id=${apiKey}`,
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

export default getCurrencies;
