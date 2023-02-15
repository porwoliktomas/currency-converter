import express from "express";
import cachedAxios from "../cache/cachedAxios";
import insertStats from "../db/insert";

const router = express.Router();

type LatestResponse = {
  rates: { [currency: string]: number };
};

router.get("/", async (req, res) => {
  const apiKey = process.env.OPENEXCHANGERATES_API_KEY;
  const data = await cachedAxios.get<LatestResponse>(
    `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`,
    { cache: { ttl: 1000 * 60 * 60 } } // 1 hour
  );

  const fromCurrency = req.query.from as string;
  const toCurrency = req.query.to as string;
  const amount = parseFloat(req.query.amount as string);

  if (data.data) {
    const rateFrom = data.data.rates[fromCurrency];
    const rateTo = data.data.rates[toCurrency];
    const resultUSD = amount / rateFrom;
    const result = resultUSD * rateTo;

    insertStats(toCurrency, resultUSD);

    res.send({ result });
  } else {
    res.status(500).send("Error getting exchange rates");
  }
});

export default router;
