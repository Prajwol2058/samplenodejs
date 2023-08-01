const expressAsyncHandler = require('express-async-handler');
const { Stock } = require('../models/stocks');

const createStocks =  expressAsyncHandler(async(req,res)=>{
    console.log(req.body)
    const stock= new Stock( req.body);
    stock.save().then(() => console.log('stock added'));
    res.send(stock);
  });



const stockFind = expressAsyncHandler (async(req,res)=>{
    try{
        console.log(req.body)
      const stock = await Stock.find({});
    res.send(stock);}
    catch(err){
      console.log(err);
      res.send(err);
    }
  });

  module.exports = { createStocks,stockFind };

