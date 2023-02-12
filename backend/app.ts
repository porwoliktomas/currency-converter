import express from "express";

const app = express();
const port = 3001;

app.head("/", (_req, res) => {
  res.status(200);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
