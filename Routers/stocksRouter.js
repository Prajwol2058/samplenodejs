const express = require("express");
const { stockupdate, stockFind, stockremove, createStocks } = require("../controllers/stocksController");
const { abcd } = require("../middlewares/sampleMiddleWare");
const { requestTimer } = require("../middlewares/requestTimer,js");
const { check } = require("../middlewares/enoughPrice");

const stockRouter = express.Router();
stockRouter.post("/",createStocks).get("/",check,stockFind).put("/",stockupdate).delete("/",stockremove);

module.exports = {stockRouter}