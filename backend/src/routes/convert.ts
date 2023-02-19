import express from "express";
import insertStats from "../db/insert";
import getRates, { RatesResponse } from "../externalAPI/getRates";
import getCurrencies, {
  CurrenciesResponse,
} from "../externalAPI/getCurrencies";

const router = express.Router();

router.get("/", async (req, res) => {
  const fromCurrency = req.query.from;
  const toCurrency = req.query.to;
  const amountStr = req.query.amount;

  if (
    typeof fromCurrency !== "string" ||
    typeof toCurrency !== "string" ||
    typeof amountStr !== "string"
  ) {
    res
      .status(400)
      .send(
        'There must be exactly one parameter "from", one parameter "to" and one parameter "amount"!'
      );
    return;
  }

  const amount = parseFloat(amountStr);
  if (isNaN(amount)) {
    res.status(400).send('Parameter "amount" must be a float number!');
    return;
  }

  let currencies: CurrenciesResponse;
  try {
    currencies = await getCurrencies();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting currencies from the external API!");
    return;
  }

  if (!(fromCurrency in currencies) || !(toCurrency in currencies)) {
    res
      .status(400)
      .send(
        'Parameters "from" and "to" must be one of the currencies returned by the "/currencies" endpoint!'
      );
    return;
  }

  let rates: RatesResponse;
  try {
    rates = await getRates();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting exchange rates from the external API!");
    return;
  }

  const rateFrom = rates.rates[fromCurrency];
  const rateTo = rates.rates[toCurrency];
  const resultUSD = amount / rateFrom;
  const result = resultUSD * rateTo;

  try {
    await insertStats(toCurrency, resultUSD);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error - cannot save stats!");
    return;
  }

  res.send({
    query: {
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
    },
    result,
  });
});

export default router;
