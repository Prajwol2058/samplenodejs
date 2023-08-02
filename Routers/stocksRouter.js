const express = require("express");
const { list_stocks } = require("../db/stocks");
const { stockupdate, stockFind, stockremove } = require("../controllers/stocksController");

const stockRouter = express.Router();
stockRouter.get("/",list_stocks).put("/",stockupdate).get("/:id",stockFind).delete("/",stockremove);

module.exports = {stockRouter}