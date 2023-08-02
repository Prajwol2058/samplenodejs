const express = require("express");
const { stockupdate, stockFind, stockremove, createStocks } = require("../controllers/stocksController");

const stockRouter = express.Router();
stockRouter.post("/",createStocks).get("/",stockFind).put("/",stockupdate).delete("/",stockremove);

module.exports = {stockRouter}