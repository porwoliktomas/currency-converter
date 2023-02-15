import express from "express";
import getStats, { Stats } from "../db/getStats";

const router = express.Router();

router.get("/", async (_req, res) => {
  let stats: Stats;
  try {
    stats = await getStats();
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error - cannot get stats!");
    return;
  }

  res.send({ stats });
});

export default router;
