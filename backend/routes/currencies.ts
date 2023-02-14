import express from "express";
import axios from "axios";

const router = express.Router();

type CurrenciesResponse = {
  rates: { [currency: string]: string };
};

router.get("/", async (_req, res) => {
  const apiKey = process.env.OPENEXCHANGERATES_API_KEY;
  const data = await axios.get<CurrenciesResponse>(
    `https://openexchangerates.org/api/currencies.json?app_id=${apiKey}`
  );

  if (data.data) {
    res.send({ currencies: data.data });
  } else {
    res.status(500).send("Error getting exchange rates");
  }
});

export default router;
