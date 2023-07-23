const bodyParser = require("body-parser");
const { configDotenv } = require("dotenv");
const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

// respond with "hello world" when a GET request is made to the homepage
configDotenv();
app.use(bodyParser.json());
app.use("/files", express.static("screenshots"));

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/abc", (req, res) => {
  console.log(req.body);
  const a = new Date();

  const capture = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(req.body.name);
    await page.screenshot({
      path: `./screenshots/${a.getTime()}.png`,
    });

    await browser.close();
  };

  capture();

  //res.send(`http://localhost:3000/files/${a.getTime()}.png`);
  // res.sendFile(`C:\Users\Sameer\Desktop\newexp\screenshots\${a.getTime()}.png`);
  res.send(`${a.getTime()}.png`);
});

app.get("/about", (req, res) => {
  console.log(req);
  res.send("about this app");
});
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening.....${PORT}`));
