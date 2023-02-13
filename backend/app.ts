import dotenv from "dotenv";
import express from "express";
import convertRouter from "./routes/convert";
import currenciesRouter from "./routes/currencies";

dotenv.config();

const app = express();

app.head("/", (_req, res) => {
  res.status(200);
});

app.use("/convert", convertRouter);
app.use("/currencies", currenciesRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
