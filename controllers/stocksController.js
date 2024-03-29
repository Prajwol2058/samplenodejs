const expressAsyncHandler = require('express-async-handler');
const { Stock } = require('../models/stocks');

const createStocks =  expressAsyncHandler(async(req,res)=>{
    try{console.log(req.body)
    const stock= new Stock( req.body);
    await stock.save().then(() => console.log('stock added'));
    res.send(stock);
    }catch(err){
        console.log(err);
        res.send(err);
    }
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

const stockremove = expressAsyncHandler (async(req,res)=>{
    try{
    const id = req.params.id;
    const result = await Stock.findByIdAndDelete(id);
    res.send(result);}
    catch(err){
      console.log(err);
      res.send({message: "error deleting stocks",err});
    }
  });

const stockupdate = expressAsyncHandler (async(req,res)=>{
    try{
    const {_id, ...rest} = req.body;
    const result = await Stock.findByIdAndUpdate(_id,rest);
    res.send(result);}
    catch(err){
      console.log(err);
      res.send({message: "error updating stocks",err});
    }
  });

  module.exports = { createStocks,stockFind, stockremove,stockupdate };

