import dotenv from "dotenv";
import express from "express";
import convertRouter from "./routes/convert";
import currenciesRouter from "./routes/currencies";
import statsRouter from "./routes/stats";
import cors from "cors";
import initDB from "./db/init";

dotenv.config();

initDB();

const app = express();
app.use(cors());

app.all("/", (_req, res) => {
  res.sendStatus(200);
});

app.use("/convert", convertRouter);
app.use("/currencies", currenciesRouter);
app.use("/stats", statsRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
