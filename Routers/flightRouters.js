const express = require("express");
const { addFlight } = require("../controllers/flightsController");
const { findFlight } = require("../controllers/flightsController");
const { flightupdate } = require("../controllers/flightsController");
const { flightremove } = require("../controllers/flightsController");

const flightRouter = express.Router();
flightRouter.post("/",addFlight).get("/",findFlight).put("/",flightupdate).delete("/",flightremove);

module.exports = {flightRouter}