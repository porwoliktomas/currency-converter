import express from "express";
import insertStats from "../db/insert";
import cachedAxios from "../cache/cachedAxios";

const router = express.Router();

type LatestResponse = {
  rates: { [currency: string]: number };
};

router.get("/:from/:to/:amount", async (req, res) => {
  const apiKey = process.env.OPENEXCHANGERATES_API_KEY;
  const data = await cachedAxios.get<LatestResponse>(
    `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`,
    { cache: { ttl: 1000 * 60 * 60 } } // 1 hour
  );

  if (data.data) {
    const rateFrom = data.data.rates[req.params.from];
    const rateTo = data.data.rates[req.params.to];
    const resultUSD = parseFloat(req.params.amount) / rateFrom;
    const result = resultUSD * rateTo;

    insertStats(req.params.to, resultUSD);

    res.send({ result });
  } else {
    res.status(500).send("Error getting exchange rates");
  }
});

export default router;
