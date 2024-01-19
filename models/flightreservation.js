const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
    passengerName : String ,
    flightNumber : Number,
    airlines : String,
    departureCity : String,
    destinationCity : String,
    seatNumber : Number,
    depaurtureTime : Date,
    arrivalTime : Date,

}, {timestamps : true});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = {Flight};
