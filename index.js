const bodyParser = require("body-parser");
const { configDotenv } = require("dotenv");
const express = require("express");
const { config } = require("process");
const app = express();
const puppeteer = require("puppeteer");
const { connect_DB } = require("./db");
const { listdbs } = require("./db/databases");
const { list_stocks, delete_stock } = require("./db/stocks");
const mongoose = require('mongoose');
const { Cat } = require("./models/cats");
const { Stock } = require("./models/stocks");
const {Student} = require("./models/students")
const {createStocks, stockFind, stockremove, stockupdate} = require("./controllers/stocksController");
const { stockRouter } = require("./Routers/stocksRouter");
const { addFlight } = require("./controllers/flightsController");
const { findFlight } = require("./controllers/flightsController");
const { flightremove } = require("./controllers/flightsController");
const { flightupdate } = require("./controllers/flightsController");
const { flightRouter } = require("./Routers/flightRouters");
const { abcd } = require("./middlewares/sampleMiddleWare");
const { requestTimer } = require("./middlewares/requestTimer,js");
const { check } = require("./middlewares/enoughPrice");
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

app.get("/stocks", async (req, res) => {
  console.log(req);
  const client = await connect_DB();
  //  await can only be used ins async func
  const stocks = await add_stocks(client);
  res.send(stocks);
});

app.get("/stock", async (req, res) => {
  console.log(req);
  const client = await connect_DB();
  //  await can only be used ins async func
  const stocks = await delete_stock(client);
  res.send(stocks);
});


mongoose.connect('mongodb://0.0.0.0:27017/test').then(()=>{console.log("connectedmongodb")}).catch((error)=>{console.log("error")});

app.post("/addcat",async(req,res)=>{
  console.log(req.body)
  const kitty = new Cat({ name: req.body.name });
  kitty.save().then(() => console.log('meow'));
  res.send(kitty);
})

app.get("/cats",async(req,res)=>{
  try{
    const cats = await Cat.find({});
  res.send(cats);}
  catch(err){
    console.log(err);
    res.send(err);
  }
})

app.get("/addcat",async(req,res)=>{
  const kitty = new Cat({ name: 'Zildjian' });
  kitty.save().then(() => console.log('meow'));
  res.send(kitty);
})

app.get("/catsbyId",async(req,res)=>{
  console.log(req.params, "cats");
  try{
    const cats = await Cat.findById(req.query.id);
  res.send(cats);}
  catch(err){
    console.log(err);
    res.send(err);
  }
})



app.post("/student",async(req,res)=>{
  console.log(req.body)
  const student = new Student(req.body);
  student.save().then(()=>console.log("student admitted"));
  res.send(student);


})
//app.post("/stock/add", createStocks);
//app.get("/stockFind",stockFind);

//app.delete("/stock/:id",stockremove);
//app.put("/stock",stockupdate);

app.use("/stocks",check,stockRouter); 


//app.post("/flight/add", addFlight);
//app.get("/flight/find", findFlight);
//app.delete("/flight/delete/:id",flightremove);
//app.put("/flight/update",flightupdate);

app.use("/flight",flightRouter);





const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`listening......${PORT}`));