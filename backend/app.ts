import dotenv from "dotenv";
import express from "express";
import convertRouter from "./routes/convert";

dotenv.config();

const app = express();

app.head("/", (_req, res) => {
  res.status(200);
});

app.use("/convert", convertRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
