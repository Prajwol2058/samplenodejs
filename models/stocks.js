const mongoose = require('mongoose');
const { Schema } = mongoose;

const stockSchema = new Schema({
  securityId: String, // String is shorthand for {type: String}
  securityName: String,
  symbol: String,
  indexId: Number,
  totalTradeQuantity: Number,
  lastTradedPrice : Number,
  percentageChange : Number,
  lastUpdatedDateTime : Date,
  previousClose : Number,
}, {timestamps: true} );

const Stock = mongoose.model('Stock', stockSchema);

module.exports = { Stock};


