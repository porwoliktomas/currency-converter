import express from "express";
import cachedAxios from "../cache/cachedAxios";

const router = express.Router();

type CurrenciesResponse = {
  rates: { [currency: string]: string };
};

router.get("/", async (_req, res) => {
  const apiKey = process.env.OPENEXCHANGERATES_API_KEY;
  const data = await cachedAxios.get<CurrenciesResponse>(
    `https://openexchangerates.org/api/currencies.json?app_id=${apiKey}`,
    { cache: { ttl: 1000 * 60 * 60 } } // 1 hour
  );

  if (data.data) {
    res.send({ currencies: data.data });
  } else {
    res.status(500).send("Error getting exchange rates");
  }
});

export default router;
