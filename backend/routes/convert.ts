import express from "express";
import axios from "axios";

const router = express.Router();

type LatestResponse = {
  rates: { [currency: string]: number };
};

router.get("/:from/:to/:amount", async (req, res) => {
  const apiKey = process.env.OPENEXCHANGERATES_API_KEY;
  const data = await axios.get<LatestResponse>(
    `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`
  );

  if (data.data) {
    const rateFrom = data.data.rates[req.params.from];
    const rateTo = data.data.rates[req.params.to];
    const result = (parseFloat(req.params.amount) / rateFrom) * rateTo;

    res.send({ result });
  } else {
    res.status(500).send("Error getting exchange rates");
  }
});

export default router;
