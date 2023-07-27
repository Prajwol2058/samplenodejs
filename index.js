const bodyParser = require("body-parser");
const { configDotenv } = require("dotenv");
const express = require("express");
const { config } = require("process");
const app = express();
const puppeteer = require("puppeteer");
const { connect_DB } = require("./db");
const { listdbs } = require("./db/databases");
const { list_stocks } = require("./db/stocks");

configDotenv();

// app.use(express.static("screenshots"));
app.use("/files", express.static("screenshots"));

// respond with "hello world" when a GET request is made to the homepage
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/about", (req, res) => {
  console.log(req);
  res.send("RAUL");
});

app.post("/screen", (req, res) => {
  console.log(req.body.name);
  res.send(req.body);
});

app.post("/scr", (req, res) => {
  const a = new Date();

  const capture = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(req.body.bro);
    // await page.screenshot({
    //   path: ./screenshots/${(Math.random() * 100000).toFixed(0)}.png,
    // });
    await page.screenshot({
      path: `./screenshots/${a.getTime()}.png`
    });
    await browser.close();
  };
  capture();
  res.send(`http://localhost:3000/PORT/${a.getTime()}.png`);
  // res.sendFile(E:/tool/screenshots/${a.getTime()}.png);
  // res.send(req.body.bro);
  // res.sendFile("E:/tool/screenshot.png");
});

app.get("/db", async (req, res) => {
  const client = await connect_DB();
  const dbs = await listdbs(client);
  //  await can only be used ins async func
  res.send(dbs);
});

app.get("/stocks", async (req, res) => {
  console.log(req);
  const client = await connect_DB();
  //  await can only be used ins async func
  const stocks = await list_stocks(client);
  res.send(stocks);
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`listening......${PORT}`));