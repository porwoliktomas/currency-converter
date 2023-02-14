import express from "express";
import getStats from "../db/getStats";

const router = express.Router();

router.get("/", async (_req, res) => {
  res.send({ stats: await getStats() });
});

export default router;
