const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT;
const {
  dbInsertQuote,
  dbGetQuoteList,
  dbDeleteQuote,
} = require("./db/scripts/dbFunctions");

app.use("/public", express.static("assets"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/savedQuotes", async (req, res) => {
  const response = await dbGetQuoteList();
  res.json({ payload: response });
});

app.post("/newQuotes", async (req, res) => {
  await dbInsertQuote(req.body);
  res.json({ success: "ok" });
});

app.delete("/deleteQuote", async (req, res) => {
  await dbDeleteQuote(req.body.dbIdToDelete, req.body.liCount);
});

app.listen(port, () => {
  console.log("Quote server running...");
});
