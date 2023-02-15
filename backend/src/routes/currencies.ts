import express from "express";
import getCurrencies from "../externalAPI/getCurrencies";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const currencies = await getCurrencies();

    res.send({ currencies });
  } catch (err) {
    res.status(500).send("Error getting currencies from the external API!");
  }
});

export default router;
